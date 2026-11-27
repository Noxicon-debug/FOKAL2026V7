import { createClient } from 'npm:@supabase/supabase-js@2.89.0';

const roles = new Set(['contributor','editor','administrator']);
const respond = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});

const allowedOrigins = new Set([
  'https://fokalltd.com','https://www.fokalltd.com','http://127.0.0.1:5173','http://localhost:5173',
  'http://127.0.0.1:8888','http://localhost:8888',
]);

async function cmsUsers(request: Request) {
  if (!['GET','POST'].includes(request.method)) return respond({error: 'Method not allowed'}, 405);
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const origin = 'https://fokalltd.com';
  if (!url || !key) return respond({error: 'User management is unavailable on this deployment.'}, 503);
  const token = request.headers.get('authorization')?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) return respond({error: 'Sign in first.'}, 401);
  const client = createClient(url, key, {auth: {persistSession: false, autoRefreshToken: false}});
  const {data: {user}, error: authError} = await client.auth.getUser(token);
  if (authError || !user) return respond({error: 'Sign in first.'}, 401);
  const {data: membership} = await client.from('cms_members').select('role,active').eq('user_id',user.id).maybeSingle();
  if (membership?.role !== 'administrator' || !membership.active) return respond({error: 'Administrator access required.'}, 403);

  try {
    const check = ({data, error}) => { if (error) throw error; return data; };
    if (request.method === 'GET') {
      const members = check(await client.from('cms_members').select('user_id,role,active'));
      const result = await Promise.all(members.map(async member => {
        const account = check(await client.auth.admin.getUserById(member.user_id)).user;
        return {...member, email: account.email, pending: !account.email_confirmed_at, self: member.user_id === user.id};
      }));
      return respond(result.sort((a,b) => a.email.localeCompare(b.email)));
    }

    const {action, email, role, id} = await request.json();
    const redirectTo = new URL('/reset-password', origin).href;
    if (action === 'invite') {
      if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !roles.has(role)) {
        return respond({error: 'Enter an email address and CMS role.'}, 400);
      }
      let existing;
      for (let page = 1; ; page++) {
        const {users, nextPage} = check(await client.auth.admin.listUsers({page,perPage: 100}));
        existing = users.find(account => account.email?.toLowerCase() === email.toLowerCase());
        if (existing || !nextPage) break;
      }
      if (existing) {
        const current = check(await client.from('cms_members').select('active').eq('user_id', existing.id).maybeSingle());
        if (current?.active) return respond({error: 'This account already has CMS access. Use its role control.'}, 409);
      }
      const account = existing ?? check(await client.auth.admin.inviteUserByEmail(email, {redirectTo})).user;
      check(await client.from('cms_members').upsert({user_id:account.id,role,active:true}));
    } else {
      if (!id || id === user.id) return respond({error: 'You cannot change your own access.'}, 400);
      const current = check(await client.from('cms_members').select('active').eq('user_id',id).maybeSingle());
      if (!current) return respond({error: 'CMS user not found.'}, 404);
      if (action === 'role' && roles.has(role)) {
        check(await client.from('cms_members').update({role}).eq('user_id',id));
      } else if (action === 'revoke') {
        check(await client.from('cms_members').update({active:false}).eq('user_id',id));
      } else if (action === 'resend' && current.active) {
        const account = check(await client.auth.admin.getUserById(id)).user;
        if (account.email_confirmed_at || !account.email) return respond({error: 'This account is already confirmed.'}, 409);
        check(await client.auth.admin.inviteUserByEmail(account.email, {redirectTo}));
      } else {
        return respond({error: 'Unknown user action.'}, 400);
      }
    }
    return respond({ok:true});
  } catch (error) {
    console.error('CMS user operation failed', error?.code);
    return respond({error: 'The user operation could not be completed.'}, 502);
  }
}

Deno.serve(async request => {
  const origin = request.headers.get('origin');
  if (origin && !allowedOrigins.has(origin)) return respond({error:'Origin not allowed.'},403);
  const response = request.method === 'OPTIONS' ? new Response(null,{status:204}) : await cmsUsers(request);
  const headers = new Headers(response.headers);
  if (origin) headers.set('Access-Control-Allow-Origin',origin);
  headers.set('Access-Control-Allow-Headers','authorization, x-client-info, apikey, content-type');
  headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  headers.set('Vary','Origin');
  return new Response(response.body,{status:response.status,headers});
});

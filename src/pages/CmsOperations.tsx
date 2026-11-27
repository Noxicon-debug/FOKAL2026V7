import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { readSiteStage } from '../lib/site-content';
import type { CmsRole } from '../lib/hooks/useCmsRole';

const roles = ['contributor','editor','administrator'] as const;
const statuses = ['New','In Progress','Resolved'] as const;
type Status = typeof statuses[number];
type Member = {user_id:string;email:string;role:CmsRole;active:boolean;pending:boolean;self:boolean};
const message = (error: unknown) => error && typeof error === 'object' && 'message' in error ? String(error.message) : 'The request failed.';

async function usersRequest(body?: Record<string, string>) {
  const {data,error} = await supabase.functions.invoke('cms-users', {
    method: body ? 'POST' : 'GET', body,
  });
  if (error) {
    const response = error.context;
    if (response instanceof Response) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.error || 'User management is unavailable.');
    }
    throw error;
  }
  return data;
}

export function CmsUsers({userId}: {userId:string}) {
  const queryClient = useQueryClient();
  const queryKey = ['cms-users', userId];
  const users = useQuery({queryKey, queryFn: () => usersRequest() as Promise<Member[]>, retry: false});
  const change = useMutation({mutationFn: usersRequest, onSuccess: () => queryClient.invalidateQueries({queryKey})});
  return <section className="site-editor">
    <h2>Users</h2>
    <form className="site-editor-tile" onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      change.mutate({action:'invite',email:String(data.get('email')).trim(),role:String(data.get('role'))});
    }}>
      <label>Email<input type="email" name="email" required/></label>
      <label>Role<select name="role">{roles.map(role => <option key={role}>{role}</option>)}</select></label>
      <button disabled={change.isPending}>Invite or grant access</button>
    </form>
    {users.isPending && <p role="status">Loading users…</p>}
    {(users.error || change.error) && <p role="alert">{message(change.error ?? users.error)}</p>}
    {change.isSuccess && <p role="status">CMS access updated.</p>}
    {users.data?.map(member => <article className="site-editor-tile" key={member.user_id}>
      <strong>{member.email}</strong><span>{member.active ? member.pending ? 'Invite pending' : 'Active' : 'Revoked'}</span>
      <label>Role<select value={member.role} disabled={member.self || !member.active || change.isPending}
        onChange={event => change.mutate({action:'role',id:member.user_id,role:event.target.value})}>
        {roles.map(role => <option key={role}>{role}</option>)}
      </select></label>
      {!member.self && member.active && <div className="site-editor-actions">
        {member.pending && <button disabled={change.isPending} onClick={() => change.mutate({action:'resend',id:member.user_id})}>Resend invitation</button>}
        <button disabled={change.isPending} onClick={() => {
          if (window.confirm('Revoke CMS access for this user?')) change.mutate({action:'revoke',id:member.user_id});
        }}>Revoke access</button>
      </div>}
    </article>)}
  </section>;
}

type Enquiry = {netlify_submission_id:string;form_name:string;received_at:string;name:string;email:string;phone:string|null;organisation:string|null;services:string|null;subject:string|null;message:string;status:Status;assigned_to:string|null;internal_notes:string|null};

function EnquiryRow({entry, staff, save, busy}: {entry: Enquiry; staff: {user_id:string;email:string}[]; save:(patch: Partial<Enquiry>)=>void; busy:boolean}) {
  return <details className="site-editor-section">
    <summary>{entry.subject || entry.name} · {entry.form_name} · {entry.status}</summary>
    <p>{new Date(entry.received_at).toLocaleString()} · {entry.email}{entry.phone && ' · ' + entry.phone}</p>
    {entry.organisation && <p>{entry.organisation}</p>}
    {entry.services && <p>{entry.services}</p>}
    <p className="whitespace-pre-wrap">{entry.message}</p>
    <form className="site-editor-tile" onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      save({status:data.get('status') as Status,assigned_to:String(data.get('assigned')) || null,internal_notes:String(data.get('notes')) || null});
    }}>
      <label>Status<select name="status" defaultValue={entry.status}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label>
      <label>Assigned to<select name="assigned" defaultValue={entry.assigned_to ?? ''}><option value="">Unassigned</option>
        {entry.assigned_to && !staff.some(person => person.user_id === entry.assigned_to) && <option value={entry.assigned_to}>Inactive staff member</option>}
        {staff.map(person => <option value={person.user_id} key={person.user_id}>{person.email}</option>)}</select></label>
      <label>Internal notes<textarea name="notes" defaultValue={entry.internal_notes ?? ''} rows={3}/></label>
      <button disabled={busy}>Save follow-up</button>
    </form>
  </details>;
}

export function CmsEnquiries({userId}: {userId: string}) {
  const client = useQueryClient();
  const key = ['cms-enquiries', userId];
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const enquiries = useQuery({queryKey:[...key,limit],queryFn:async () => {
    const {data,error} = await supabase.from('form_submissions').select('*').order('received_at',{ascending:false}).limit(limit);
    if (error) throw error;
    return data as Enquiry[];
  }});
  const staff = useQuery({queryKey:['cms-staff',userId],queryFn:async () => {
    const {data,error} = await supabase.rpc('cms_staff');
    if (error) throw error;
    return data as {user_id:string;email:string}[];
  }});
  const save = useMutation({mutationFn:async ({id,patch}:{id:string;patch:Partial<Enquiry>}) => {
    const {error} = await supabase.from('form_submissions').update(patch).eq('netlify_submission_id',id).select('netlify_submission_id').single();
    if (error) throw error;
  },onSuccess: () => client.invalidateQueries({queryKey:key})});
  const filtered = enquiries.data?.filter(entry => [entry.name,entry.email,entry.subject,entry.message,entry.organisation,entry.status]
    .some(value => value?.toLowerCase().includes(search.trim().toLowerCase())));
  return <section className="site-editor"><h2>Enquiries</h2>
    <label>Search loaded enquiries<input type="search" value={search} onChange={event => setSearch(event.target.value)}/></label>
    {enquiries.isPending && <p role="status">Loading enquiries…</p>}
    {(enquiries.error || staff.error || save.error) && <p role="alert">{message(enquiries.error ?? staff.error ?? save.error)}</p>}
    {save.isSuccess && <p role="status">Follow-up saved.</p>}
    {filtered?.length === 0 && <p>No matching enquiries.</p>}
    {filtered?.map(entry => <EnquiryRow key={entry.netlify_submission_id} entry={entry} staff={staff.data ?? []} busy={save.isPending}
      save={patch => save.mutate({id:entry.netlify_submission_id,patch})}/>)}
    {enquiries.data?.length === limit && <button type="button" onClick={() => setLimit(value => value + 50)}>Load older enquiries</button>}
  </section>;
}

export type HistoryVersion = {id:number;created_at:string;actor_email:string|null;operation:string;sections:string[]};
export function CmsHistory({userId,dirty}: {userId:string;dirty:boolean}) {
  const client = useQueryClient();
  const key = ['cms-history',userId];
  const history = useQuery({queryKey:key,queryFn:async () => {
    const {data,error} = await supabase.from('cms_history').select('id,created_at,actor_email,operation,sections').order('id',{ascending:false});
    if (error) throw error;
    return data as HistoryVersion[];
  }});
  const restore = useMutation({mutationFn:async (id:number) => {
    const {revision} = await readSiteStage('draft');
    const {error} = await supabase.rpc('change_site_content',{action:'restore_version',expected_revision:revision,replacement:{id}});
    if (error) throw error;
  },onSuccess:async () => {
    await Promise.all([client.invalidateQueries({queryKey:key}),client.invalidateQueries({queryKey:['site-content']}),
      client.invalidateQueries({queryKey:['site-editor-previous',userId]}), client.invalidateQueries({queryKey:['site-editor-draft',userId]})]);
  }});
  return <section className="site-editor"><h2>Publishing History</h2>
    {history.isPending && <p role="status">Loading versions…</p>}
    {(history.error || restore.error) && <p role="alert">{message(history.error ?? restore.error)}</p>}
    {restore.isSuccess && <p role="status">Version restored. The saved draft is still available.</p>}
    {history.data?.map((version,index) => <article className="site-editor-tile" key={version.id}>
      <strong>{version.operation} · {new Date(version.created_at).toLocaleString()}</strong>
      <span>{version.actor_email ?? 'System'} · {version.sections.join(', ') || 'Site snapshot'}</span>
      {index > 0 && <button disabled={restore.isPending || dirty} onClick={() => {
        if (window.confirm('Restore this version to the live site?')) restore.mutate(version.id);
      }}>Restore version</button>}
    </article>)}
  </section>;
}

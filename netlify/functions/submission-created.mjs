import { createClient } from '@supabase/supabase-js';

export default async function submissionCreated(request) {
  const { payload } = await request.json();
  const formName = payload?.form_name;
  if (formName !== 'booking' && formName !== 'contact') {
    return new Response(null, { status: 204 });
  }

  const data = payload.data;
  if (!payload.id || !data?.name || !data.email || !data.message) {
    return new Response('Missing required submission fields', { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error('Supabase form storage is missing its function environment variables.');
    return new Response('Form storage is unavailable', { status: 503 });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.from('form_submissions').upsert({
    netlify_submission_id: payload.id,
    form_name: formName,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    organisation: data.organisation || null,
    organisation_type: data['organisation-type'] || null,
    services: data.services || null,
    subject: data.subject || null,
    message: data.message,
    consent: data.consent === 'yes',
  }, { onConflict: 'netlify_submission_id', ignoreDuplicates: true });

  if (error) {
    console.error('Supabase form storage failed', { formName, code: error.code });
    return new Response('Could not store form submission', { status: 502 });
  }

  return new Response(null, { status: 204 });
}

/* ============================================
   XINRONG Tools - Supabase Client
   ============================================ */
const SUPABASE_URL = 'https://tmdlcmfqsiahqcodxcbf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZGxjbWZxc2lhaHFjb2R4Y2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MTMwNTgsImV4cCI6MjEwMDE4OTA1OH0._Y4OA5LkV0wUL3S6IKusS3F1nnQmD1WtjR4lJIGB7jc';

let supabaseClient = null;

function getSupabase() {
  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

async function submitInquiry(data) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase client not loaded');

  const { error } = await sb.from('inquiries').insert([{
    name: data.name,
    company: data.company || '',
    email: data.email,
    whatsapp: data.whatsapp || '',
    product: data.product || '',
    quantity: data.quantity || '',
    message: data.message || ''
  }]);

  if (error) throw error;

  // Trigger email notification via Edge Function (fire-and-forget)
  notifyInquiry(data).catch(err => console.warn('Notification skipped:', err));

  return true;
}

async function notifyInquiry(data) {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/notify-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(data)
    });
  } catch (e) {
    // Non-blocking — notification failure does not affect form submission
    console.warn('Email notification failed:', e);
  }
}

async function fetchInquiries() {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase client not loaded');

  const { data, error } = await sb
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

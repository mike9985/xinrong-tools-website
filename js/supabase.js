/* ============================================
   XINRONG Tools - Inquiry Storage + Email
   Stores each inquiry in Supabase and also
   delivers it to the sales inbox via Web3Forms.
   ============================================ */

const SUPABASE_URL = 'https://tmdlcmfqsiahqcodxcbf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZGxjbWZxc2lhaHFjb2R4Y2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MTMwNTgsImV4cCI6MjEwMDE4OTA1OH0._Y4OA5LkV0wUL3S6IKusS3F1nnQmD1WtjR4lJIGB7jc';

const WEB3FORMS_ACCESS_KEY = '17bf2c73-11ec-4a03-9e64-799dcfd9fa6f';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

let supabaseClient = null;

function getSupabase() {
  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

// Store the inquiry in the database AND email it to the sales inbox.
// Succeeds if at least one channel delivers.
async function submitInquiry(data) {
  let dbOk = false;
  try {
    const sb = getSupabase();
    if (sb) {
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
      dbOk = true;
    }
  } catch (e) {
    console.warn('Database store skipped:', e);
  }

  let emailOk = false;
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New Website Inquiry - ' + (data.name || 'Unknown'),
        from_name: 'Xinrong Website',
        name: data.name || '',
        company: data.company || '',
        email: data.email || '',
        whatsapp: data.whatsapp || '',
        product: data.product || '',
        quantity: data.quantity || '',
        message: data.message || ''
      })
    });
    if (res.ok) {
      let json = {};
      try { json = await res.json(); } catch (e) { /* ignore */ }
      if (!(json && json.success === false)) emailOk = true;
    }
  } catch (e) {
    console.warn('Email delivery failed:', e);
  }

  if (!dbOk && !emailOk) {
    throw new Error('Submission failed on all channels');
  }
  return true;
}

// Read inquiries for the admin dashboard.
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

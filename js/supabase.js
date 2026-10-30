/* ============================================
   XINRONG Tools - Inquiry Email Delivery
   Sends contact-form submissions to the sales
   inbox via Web3Forms (static-site friendly).
   ============================================ */

const WEB3FORMS_ACCESS_KEY = '17bf2c73-11ec-4a03-9e64-799dcfd9fa6f';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Store an inquiry and deliver it to the receiving mailbox.
async function submitInquiry(data) {
  const payload = {
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
  };

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error('Email delivery failed (' + res.status + ')');
  }

  let json = {};
  try { json = await res.json(); } catch (e) { /* ignore */ }

  if (json && json.success === false) {
    throw new Error(json.message || 'Email delivery rejected');
  }

  return true;
}

// Kept for the admin dashboard; returns an empty list if no backend is configured.
async function fetchInquiries() {
  return [];
}

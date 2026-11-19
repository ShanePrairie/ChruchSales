/** Cloudflare Pages Function: inquiry delivery via a verified Resend account.
 * Required Pages environment variables: RESEND_API_KEY, FROM_EMAIL, LEADS_TO_EMAIL.
 * Add Cloudflare WAF rate limiting and optionally Turnstile before accepting substantial traffic.
 */
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
});
const allowed = (value, max = 160) => typeof value === 'string' && value.length <= max;
const trim = (value) => String(value || '').trim();
export async function onRequestPost({request,env}) {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return json({ok:false,error:'Expected JSON'},415);
  if (Number(request.headers.get('content-length') || '0') > 16000) return json({ok:false,error:'Request too large'},413);
  let payload;
  try { payload = await request.json(); } catch { return json({ok:false,error:'Invalid message'},400); }
  if (!payload || typeof payload !== 'object') return json({ok:false,error:'Invalid message'},400);
  if (trim(payload.website)) return json({ok:true}); // honeypot: don't deliver bot spam
  const {name,email,church,package:interest,message} = payload;
  if (![name,email,church,interest,message].every((x,i)=>allowed(x,[100,160,140,90,3000][i]))) return json({ok:false,error:'Check field lengths'},400);
  if (trim(name).length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trim(email)) || trim(message).length < 10) return json({ok:false,error:'Please complete the required fields'},400);
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL || !env.LEADS_TO_EMAIL) return json({ok:false,error:'The contact form is not connected yet. Please email us.'},503);
  const content = [
    'New Modernized Ministry website inquiry',
    '', 'Name: '+trim(name), 'Email: '+trim(email), 'Church: '+trim(church),
    'Interest: '+trim(interest), '', 'Message:', trim(message),
    '', 'This person asked for a reply. They did not opt into marketing messages.'
  ].join('\n');
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method:'POST', headers:{'Authorization':'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({from:env.FROM_EMAIL,to:[env.LEADS_TO_EMAIL],reply_to:trim(email),subject:'New ministry inquiry: '+trim(church || name).slice(0,100),text:content})
    });
    if (!result.ok) return json({ok:false,error:'Message delivery is temporarily unavailable'},502);
    return json({ok:true});
  } catch { return json({ok:false,error:'Message delivery is temporarily unavailable'},502); }
}
export function onRequestGet() {return json({ok:false,error:'Method not allowed'},405)}

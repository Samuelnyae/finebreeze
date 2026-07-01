import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function base64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const msg = body.data;

    if (!msg || !msg.name || !msg.email || !msg.message) {
      return Response.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const subject = `New Inquiry: ${msg.category || 'General Info'} — Fine Breeze Hotel`;
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Inter',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#0f766e,#14b8a6);padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">New Contact Inquiry</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">Fine Breeze Hotel, Voi</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;border-radius:16px;margin:0 0 24px;">
            <tr><td style="padding:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Name</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${msg.name}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${msg.email}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${msg.phone || 'Not provided'}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Category</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${msg.category || 'General Info'}</td></tr>
              </table>
            </td></tr>
          </table>
          <h3 style="margin:0 0 8px;color:#0f766e;font-size:16px;">Message</h3>
          <p style="margin:0 0 24px;color:#52525b;font-size:15px;line-height:1.7;background-color:#f4f4f5;border-radius:12px;padding:20px;">${msg.message}</p>
          <a href="mailto:${msg.email}" style="display:inline-block;background-color:#14b8a6;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:12px;font-size:15px;font-weight:bold;">Reply to ${msg.name}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const mimeMessage = [
      `To: Fine Breeze Hotel <fynbriz@gmail.com>`,
      `From: Fine Breeze Hotel <fynbriz@gmail.com>`,
      `Subject: ${subject}`,
      `Content-Type: text/html; charset=UTF-8`,
      `MIME-Version: 1.0`,
      ``,
      html
    ].join('\r\n');

    const encodedMessage = base64UrlEncode(mimeMessage);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw: encodedMessage })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({ error: `Gmail API error: ${errorText}` }, { status: 500 });
    }

    const result = await response.json();
    return Response.json({ success: true, messageId: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
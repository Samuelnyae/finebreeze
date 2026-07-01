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
    const booking = body.data;

    if (!booking || !booking.email) {
      return Response.json({ error: 'No booking data or guest email found' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const checkIn = new Date(booking.check_in).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const checkOut = new Date(booking.check_out).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const subject = `Booking Confirmed - Fine Breeze Hotel, Voi`;
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#0f766e,#14b8a6);padding:40px 40px 32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:900;letter-spacing:-1px;">Fine Breeze Hotel</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Voi, Taita Taveta County, Kenya</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;color:#0f766e;font-size:24px;">Booking Confirmed! &#10003;</h2>
          <p style="margin:0 0 24px;color:#52525b;font-size:16px;line-height:1.6;">Dear ${booking.guest_name || 'Guest'},</p>
          <p style="margin:0 0 24px;color:#52525b;font-size:16px;line-height:1.6;">Thank you for choosing Fine Breeze Hotel. Your booking has been confirmed and we can't wait to welcome you. Here are your reservation details:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;border-radius:16px;margin:0 0 24px;">
            <tr><td style="padding:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Room</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${booking.room_name || 'N/A'} (${booking.room_type || ''})</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Check-In</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${checkIn}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Check-Out</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${checkOut}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Guests</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${booking.guests || 1}</td></tr>
                <tr><td style="padding:8px 0;color:#71717a;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Nights</td><td style="padding:8px 0;color:#18181b;font-size:15px;font-weight:bold;text-align:right;">${booking.nights || 1}</td></tr>
                ${booking.total_price ? `<tr><td style="padding:12px 0 0;border-top:1px solid #e4e4e7;color:#0f766e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Total</td><td style="padding:12px 0 0;border-top:1px solid #e4e4e7;color:#0f766e;font-size:22px;font-weight:900;text-align:right;">KES ${(booking.total_price || 0).toLocaleString()}</td></tr>` : ''}
              </table>
            </td></tr>
          </table>
          ${booking.special_requests ? `<p style="margin:0 0 24px;color:#52525b;font-size:15px;line-height:1.6;"><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
          <p style="margin:0 0 8px;color:#52525b;font-size:16px;line-height:1.6;">If you have any questions or need to make changes, feel free to reach out:</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="padding:4px 0;color:#71717a;font-size:14px;">&#9742; 0714 447 638 &nbsp;|&nbsp; 0701 734 251</td></tr>
            <tr><td style="padding:4px 0;color:#71717a;font-size:14px;">&#9993; fynbriz@gmail.com</td></tr>
          </table>
          <a href="https://wa.me/254714447638" style="display:inline-block;background-color:#14b8a6;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:12px;font-size:16px;font-weight:bold;">Chat with us on WhatsApp</a>
          <p style="margin:32px 0 0;color:#a1a1aa;font-size:13px;text-align:center;line-height:1.6;">We look forward to providing you with an unforgettable stay at Fine Breeze Hotel.<br/>Where the Fine Breeze Blows Free.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const mimeMessage = [
      `To: ${booking.guest_name || 'Guest'} <${booking.email}>`,
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
    return Response.json({ success: true, messageId: result.id, sentTo: booking.email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
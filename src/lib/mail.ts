import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.yandex.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailOptions {
  to?: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const recipient = to || process.env.NOTIFICATION_EMAIL;
  if (!recipient || !process.env.SMTP_USER) {
    console.warn("SMTP not configured, skipping email");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Efehan Yıldız Web" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      html,
    });
  } catch (err) {
    console.error("Mail send error:", err);
  }
}

export function newLeadEmailHtml({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0e27; color: #c4c9e0; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .card { background: #0c1029; border: 1px solid rgba(29,71,240,0.2); border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; background: rgba(29,71,240,0.15); color: #5b8af0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border-radius: 6px; margin-bottom: 16px; }
    h1 { color: #fff; font-size: 20px; margin: 0 0 24px; }
    .field { margin-bottom: 16px; }
    .label { color: #7a82a6; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .value { color: #fff; font-size: 14px; line-height: 1.6; }
    .message-box { background: #131836; border: 1px solid rgba(29,71,240,0.1); border-radius: 10px; padding: 16px; margin-top: 8px; }
    .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #7a82a6; }
    .btn { display: inline-block; background: #1d47f0; color: #fff !important; text-decoration: none; padding: 10px 24px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="badge">Yeni İletişim Formu</div>
      <h1>Yeni bir mesaj aldınız</h1>
      
      <div class="field">
        <div class="label">İsim</div>
        <div class="value">${name}</div>
      </div>
      
      ${email ? `<div class="field"><div class="label">E-posta</div><div class="value">${email}</div></div>` : ""}
      ${phone ? `<div class="field"><div class="label">Telefon</div><div class="value">${phone}</div></div>` : ""}
      ${subject ? `<div class="field"><div class="label">Konu</div><div class="value">${subject}</div></div>` : ""}
      
      ${message ? `
      <div class="field">
        <div class="label">Mesaj</div>
        <div class="message-box">
          <div class="value">${message.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
      ` : ""}

      <a href="https://www.efehanyildiz.com/admin/leads" class="btn">Admin Panelde Görüntüle →</a>
    </div>
    <div class="footer">efehanyildiz.com — İletişim Formu Bildirimi</div>
  </div>
</body>
</html>`;
}

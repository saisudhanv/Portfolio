import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || 'saisudhanv2004@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials (SMTP_USER and SMTP_PASS) are not configured in environment variables.");
      return NextResponse.json(
        { error: 'Mail server configuration missing. Please configure SMTP_USER and SMTP_PASS in environment variables.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Send from authenticated SMTP user to avoid SPF failures
      replyTo: email, // Reply goes to sender
      to: toEmail,
      subject: subject ? `Portfolio Contact: ${subject}` : `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #3b82f6; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message.';
    console.error('Error sending email:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

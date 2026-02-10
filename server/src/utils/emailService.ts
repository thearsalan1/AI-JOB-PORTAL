import nodemailer from 'nodemailer';

// Debug: Log email config
console.log('Email Configuration:');
console.log('HOST:', process.env.EMAIL_HOST);
console.log('PORT:', process.env.EMAIL_PORT);
console.log('USER:', process.env.EMAIL_USER);
console.log('PASS:', process.env.EMAIL_PASSWORD ? '***SET***' : 'NOT SET');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"AI Job Portal" <${process.env.EMAIL_SENDER}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent successfully: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
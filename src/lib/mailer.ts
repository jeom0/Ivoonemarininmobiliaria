import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Faltan variables de entorno SMTP_USER o SMTP_PASS.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Ivonne Marin Inmobiliaria" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Correo enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return false;
  }
};

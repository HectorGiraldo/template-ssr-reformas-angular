import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // O usa SMTP de tu proveedor
    auth: {
      user: process.env.EMAIL_USER, // Usa variables de entorno en Vercel
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email enviado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

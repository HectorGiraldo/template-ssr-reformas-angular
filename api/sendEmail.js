import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, phone } = req.body;

  // Configuración del transportador SMTP con OVH
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net", // O usa smtp.mail.ovh.net
    port: 465, // Puerto de salida seguro de OVH
    secure: true, // true para SSL/TLS (usa false si fuera STARTTLS)
    auth: {
      user: process.env.EMAIL_USER, // Correo completo
      pass: process.env.EMAIL_PASS, // Contraseña del correo
    },
  });

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Nombre + correo que envía
      to: process.env.EMAIL_RECEIVER, // Destinatario
      subject: `Mensaje de ${name}`,
      text: { message, phone },
      replyTo: email, // Para que el destinatario pueda responder al remitente
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: error.message });
  }
}

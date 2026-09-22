import nodemailer from "nodemailer";

const ALLOWED_ORIGINS = [
  "https://www.hecmarreformas.es",
  "https://hecmarreformas.es",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
};

function isAllowedOrigin(origin) {
  if (!origin) return true; // same-origin requests don't always send an Origin header
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    return new URL(origin).hostname.endsWith(".vercel.app"); // preview deployments
  } catch {
    return false;
  }
}

function sanitize(value) {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAllowedOrigin(req.headers.origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const name = sanitize(req.body?.name);
  const email = sanitize(req.body?.email);
  const phone = sanitize(req.body?.phone);
  const message = sanitize(req.body?.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "El email no es válido" });
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    message.length > MAX_LENGTHS.message
  ) {
    return res.status(400).json({ error: "Uno de los campos supera la longitud permitida" });
  }

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
      from: { name, address: process.env.EMAIL_USER }, // Nodemailer se encarga de escapar el nombre
      to: process.env.EMAIL_RECEIVER, // Destinatario
      subject: `Mensaje de ${name}`,
      text: `${message}\n\nTeléfono de contacto: ${phone}`,
      replyTo: email, // Para que el destinatario pueda responder al remitente
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res
      .status(500)
      .json({ error: "No se pudo enviar el correo. Inténtalo de nuevo más tarde." });
  }
}

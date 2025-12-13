const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SmartTasks" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    // console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendMail;

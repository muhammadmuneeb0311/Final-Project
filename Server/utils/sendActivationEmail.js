// utils/sendActivationEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("Error verifying transporter:", err);
  } else {
    console.log("Email transporter ready ✔");
  }
});

async function sendActivationEmail(email, token) {
  const link = `${process.env.FRONTEND_URL}/activate?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Team Invitation - Activate Your Account",
    html: `
      <h3>You've been invited to join a team!</h3>
      <p>Please click the link below to activate your account and set a password:</p>
      <a href="${link}">${link}</a>
      <p>If you didn’t request this, you can ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

// ✅ export correctly
// keep default export as the function but also expose transporter for debug routes/tests
module.exports = sendActivationEmail;
module.exports.transporter = transporter;

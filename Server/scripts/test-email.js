require('dotenv').config();
const crypto = require('crypto');
const sendActivationEmail = require('../utils/sendActivationEmail');

(async () => {
  try {
    const testEmail = process.env.TEST_EMAIL || process.env.EMAIL_USER;
    if (!testEmail) {
      console.error('No TEST_EMAIL or EMAIL_USER set in environment. Set TEST_EMAIL in .env for a target address.');
      process.exit(1);
    }

    console.log('Sending test activation email to:', testEmail);
    const token = crypto.randomBytes(16).toString('hex');
    const res = await sendActivationEmail(testEmail, token);
    console.log('sendActivationEmail result:', res);
    console.log('If no error above, the mail was handed to the transporter successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Test email send failed:', err);
    process.exit(2);
  }
})();

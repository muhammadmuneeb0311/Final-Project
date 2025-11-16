require('dotenv').config();
const mongoose = require('mongoose');
const TeamMember = require('../Models/TeamMember');

const MONGO = process.env.MONGODB_URI;
if (!MONGO) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const id = process.argv[2];
    if (!id) {
      console.error('Usage: node scripts/get-member.js <memberId|email>');
      process.exit(2);
    }

    let member = null;
    // try as ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      member = await TeamMember.findById(id).lean();
    }
    if (!member) {
      member = await TeamMember.findOne({ email: id }).lean();
    }

    if (!member) {
      console.log('No TeamMember found for:', id);
      process.exit(0);
    }

    console.log('TeamMember:', JSON.stringify(member, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(3);
  }
})();

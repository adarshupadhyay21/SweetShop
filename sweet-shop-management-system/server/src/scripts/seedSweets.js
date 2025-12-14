const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Sweet = require('../models/sweet.model');
const User = require('../models/user.model');

dotenv.config();

const sweets = [
  { name: 'Classic Chocolate Bar', category: 'Chocolate', price: 2.5, quantity: 50 },
  { name: 'Strawberry Cream Candy', category: 'Candy', price: 1.25, quantity: 80 },
  { name: 'Vanilla Cupcake', category: 'Pastry', price: 3.0, quantity: 40 },
  { name: 'Caramel Fudge', category: 'Chocolate', price: 2.0, quantity: 60 },
  { name: 'Mint Chocolate Chip', category: 'Chocolate', price: 2.75, quantity: 35 },
  { name: 'Honey Nougat', category: 'Candy', price: 1.75, quantity: 55 },
  { name: 'Lemon Tartlet', category: 'Pastry', price: 2.95, quantity: 30 },
  { name: 'Blueberry Muffin', category: 'Pastry', price: 2.8, quantity: 45 },
  { name: 'Cinnamon Roll', category: 'Pastry', price: 3.25, quantity: 25 },
  { name: 'Maple Pecan Candy', category: 'Candy', price: 1.9, quantity: 70 },
  { name: 'Almond Toffee', category: 'Chocolate', price: 2.2, quantity: 50 },
  { name: 'Orange Zest Bonbon', category: 'Candy', price: 1.6, quantity: 65 },
  { name: 'Rose Petal Macaron', category: 'Pastry', price: 2.4, quantity: 20 },
  { name: 'Espresso Truffle', category: 'Chocolate', price: 3.5, quantity: 15 },
  { name: 'Pistachio Biscotti', category: 'Pastry', price: 2.1, quantity: 40 }
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  try {
    // Optionally clear existing sweets
    await Sweet.deleteMany({});
    const created = await Sweet.insertMany(sweets);
    console.log(`Inserted ${created.length} sweets.`);

    // Optionally seed or promote an admin user.
    const shouldSeedAdmin = process.env.SEED_ADMIN === 'true' || process.argv.includes('--admin');
    if (shouldSeedAdmin) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      let admin = await User.findOne({ email: adminEmail });
      if (!admin) {
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        admin = new User({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' });
        await admin.save();
        console.log(`Created admin user: ${adminEmail} (password: ${adminPassword})`);
      } else {
        if (admin.role !== 'admin') {
          admin.role = 'admin';
          await admin.save();
          console.log(`Promoted existing user ${adminEmail} to admin`);
        } else {
          console.log(`Admin user ${adminEmail} already exists`);
        }
      }
    }
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  }
}

seed();

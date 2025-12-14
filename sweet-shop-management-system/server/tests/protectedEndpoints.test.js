const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user.model');
const Sweet = require('../src/models/sweet.model');

let server;

beforeAll(async () => {
    // connect to test db (use MONGO_URI_TEST if provided)
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop_test';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});
});

describe('Protected endpoints', () => {
    test('register -> login -> add sweet (protected)', async () => {
        // register
        const reg = await request(app).post('/api/auth/register').send({ name: 'Test', email: 't@example.com', password: 'pass123' });
        expect(reg.statusCode).toBe(201);
        // login
        const li = await request(app).post('/api/auth/login').send({ email: 't@example.com', password: 'pass123' });
        expect(li.statusCode).toBe(200);
        const token = li.body.token;
        // try add sweet without token
        const noAuth = await request(app).post('/api/sweets').send({ name: 'Test Sweet', category: 'Candy', price: 1, quantity: 5 });
        expect(noAuth.statusCode).toBe(401);
        // with token
        const ok = await request(app).post('/api/sweets').set('Authorization', `Bearer ${token}`).send({ name: 'Test Sweet', category: 'Candy', price: 1, quantity: 5 });
        expect(ok.statusCode).toBe(201);
    });

    test('admin delete/restock', async () => {
        // create admin user directly
        const admin = new User({ name: 'Admin', email: 'a@a.com', passwordHash: 'x', role: 'admin' });
        await admin.save();
        const login = await request(app).post('/api/auth/login').send({ email: 'a@a.com', password: 'x' });
        // login will fail because passwordHash not valid - instead create valid admin via register
        await User.deleteMany({});
        const reg = await request(app).post('/api/auth/register').send({ name: 'Admin', email: 'admin@test.com', password: 'adminpass' });
        // promote to admin in DB before login
        await User.findOneAndUpdate({ email: 'admin@test.com' }, { role: 'admin' });
        const li = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'adminpass' });
        const token = li.body.token;
        // add a sweet
        const added = await request(app).post('/api/sweets').set('Authorization', `Bearer ${token}`).send({ name: 'Del', category: 'Candy', price: 1, quantity: 10 });
        expect(added.statusCode).toBe(201);
        const id = added.body._id;
        // purchase as admin (allowed)
        const pur = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`).send({ quantity: 2 });
        expect(pur.statusCode).toBe(200);
        // restock as admin
        const rest = await request(app).post(`/api/sweets/${id}/restock`).set('Authorization', `Bearer ${token}`).send({ quantity: 5 });
        expect(rest.statusCode).toBe(200);
        // delete as admin
        const del = await request(app).delete(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`);
        expect(del.statusCode === 204 || del.statusCode === 200).toBeTruthy();
    }, 20000);
});

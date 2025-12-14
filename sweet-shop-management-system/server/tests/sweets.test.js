const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary

describe('Sweets API', () => {
    let token;
    beforeAll(async () => {
        // register and login to get a token for protected endpoints
        await request(app).post('/api/auth/register').send({ name: 'Tester', email: 'tester@sweets.test', password: 'testpass' });
        const li = await request(app).post('/api/auth/login').send({ email: 'tester@sweets.test', password: 'testpass' });
        token = li.body.token;
    });

    it('should create, retrieve, update and delete a sweet', async () => {
        // create
        const createRes = await request(app).post('/api/sweets').set('Authorization', `Bearer ${token}`).send({ name: 'Chocolate Cake', category: 'Cake', price: 15.99, quantity: 10 });
        expect(createRes.status).toBe(201);
        expect(createRes.body).toHaveProperty('name', 'Chocolate Cake');
        const id = createRes.body._id;

        // retrieve all
        const listRes = await request(app).get('/api/sweets').set('Authorization', `Bearer ${token}`);
        expect(listRes.status).toBe(200);
        expect(Array.isArray(listRes.body)).toBe(true);

        // update
        const upd = await request(app).put(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`).send({ price: 12.99 });
        expect(upd.status).toBe(200);
        expect(upd.body).toHaveProperty('price', 12.99);

        // delete
        const del = await request(app).delete(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`);
        expect(del.status === 204 || del.status === 200).toBeTruthy();

        // non-existing
        const notFound = await request(app).get(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`);
        expect(notFound.status).toBe(404);
    });
});
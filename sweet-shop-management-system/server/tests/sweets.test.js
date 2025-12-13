const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary

describe('Sweets API', () => {
    it('should create a new sweet', async () => {
        const response = await request(app)
            .post('/api/sweets')
            .send({
                name: 'Chocolate Cake',
                category: 'Cake',
                price: 15.99,
                quantity: 10
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Chocolate Cake');
    });

    it('should retrieve all sweets', async () => {
        const response = await request(app).get('/api/sweets');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a sweet', async () => {
        const sweetId = 'someSweetId'; // Replace with a valid ID
        const response = await request(app)
            .put(`/api/sweets/${sweetId}`)
            .send({
                price: 12.99
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('price', 12.99);
    });

    it('should delete a sweet', async () => {
        const sweetId = 'someSweetId'; // Replace with a valid ID
        const response = await request(app).delete(`/api/sweets/${sweetId}`);
        expect(response.status).toBe(204);
    });

    it('should return 404 for non-existing sweet', async () => {
        const sweetId = 'nonExistingId'; // Replace with a non-existing ID
        const response = await request(app).get(`/api/sweets/${sweetId}`);
        expect(response.status).toBe(404);
    });
});
const supertest = require('supertest');
const app = require('../../app');
describe('GET/api/v1/addreses-', () => {
    it('should return the array of addreses-', async () => {
        const response = await supertest(app)
            .get('/api/v1/addresses')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body.length).toBeGreaterThan(0);
    });
});
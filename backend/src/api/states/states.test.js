const supertest = require('supertest');
const states = require('../../constants/states');
const app = require('../../app');

describe('GET /api/v1/states', () => {
    it('should return an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/states')//end point tester
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('should return a state', async () => {
        const response = await supertest(app)
            .get('/api/v1/states/7')//end point tester
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body.id).toBe(7);//this test case may fail due to every time changes in the state id
    });
    it('should return a 404 file not found', async () => {
        const response = await supertest(app)
            .get('/api/v1/states/4220')//end point tester
            .expect('Content-Type', /json/)
            .expect(404)
    });
});
//here we are at end checking the array of returned length to be grater than zero
//alaways whenever we are executing the application make user all seed and migarte are runned properly
//npm run migrate 
//npm run seeds 
//npm run dev last 
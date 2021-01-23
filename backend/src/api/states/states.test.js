const supertest=require('supertest');
const states=require('../../constants/states');
const app=require('../../app');

describe('GET /api/v1/states',()=>{
    it('should return an array of states',async ()=>{
    const response= await supertest(app)
    .get('/api/v1/states')//end point tester
    .expect('Content-Type',/json/)
    .expect(200)
    expect(response.body.length).toBeGreaterThan(0);
    });
});
//here we are at end checking the array of returned length to be grater than zero
//alaways whenever we are executing the application make user all seed and migarte are runned properly
//npm run migrate 
//npm run seeds 
//npm run dev last 
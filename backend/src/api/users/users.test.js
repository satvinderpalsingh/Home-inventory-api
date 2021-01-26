const { response } = require('express');
const supertest=require('supertest');
const app=require('../../app');
describe('GET/api/v1/users-',()=>{
    it('should return the array of states-',async()=>{
        const response=await supertest(app)
        .get('/api/v1/users')
        .expect('Content-Type',/json/)
        .expect(200)

        expect(response.body.length).toBeGreaterThan(0);
    });
});
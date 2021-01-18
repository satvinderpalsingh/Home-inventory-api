const supertest = require('supertest');

const app = require('./app');

describe('GET /', () => {//jest based functionality
  it('should respond with a message', async () => {
    const response = await supertest(app)//supertest based functionality
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('🎄Home inventory App🎏');//jest based functionality
  });
});
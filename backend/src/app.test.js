const supertest = require('supertest');//without simulating the express app at port(running) we are actually testing teh application using supertest endpoint testing

const app = require('./app');
const project=require('./constants/project');
describe('GET /', () => {//jest based functionality "describe" and "it" is injected globally by jest library
  it('should respond with a message', async () => {
    const response = await supertest(app)//supertest based functionality for endpoint testing 
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(project.message);//jest based functionality
  });
});
//npm test also help to run all the files which have the .test in file name
//describe is used to group all the test case  it() is used to write the real test cases.
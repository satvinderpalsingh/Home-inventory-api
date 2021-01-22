const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const api=require('./api');//automatically the index.js file will be imported in api folder
const project=require('../src/constants/project');//as it is used many times so instead make it a reusable function

const middlewares = require('./middlewares');
const app = express();

app.use(morgan('tiny'));//requset logger
app.use(compression());//compress the incoming data efficiency manangement
app.use(helmet());//headers security
app.use(express.json());//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. and use it in put and post request to send info to server

app.get('/', (req, res) => {
  res.json({
    message:project.message,
  });
});
//we are specyfying the api/v1 becoz we can in future defines more routes without disturbing others such as api/v2 route
app.use('/api/v1',api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);//always at last
//reason we have separated the app.js and index.js is we require app in testing
module.exports = app;
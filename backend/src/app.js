const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message:"🎄Home inventory App🎏",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
//reason we have separated the app.js and index.js is we require app in testing
module.exports = app;
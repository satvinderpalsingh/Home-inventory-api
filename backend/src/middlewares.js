function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);//this function set the statusCode value
    next(error);
  }
  function errorHandler(error, req, res, next) {
    const statusCode =res.statusCode === 200 ?500 : res.statusCode;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message:error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
  }
  
  module.exports = {
    notFound,
    errorHandler,
  };  
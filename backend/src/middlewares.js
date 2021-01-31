//USING THE ERROR NAME PROPERTY 
const errorType={
  UniqueViolationError:409,//error name must be same
  ValidationError:422
};
//used to display the custome error messages 
const errorMessage={
  UniqueViolationError:'Address already exists',
};

function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);//this function set the statusCode value
    next(error);
  }
  function errorHandler(error, req, res, next) {
    const statusCode =res.statusCode === 200 ?(errorType[error.name]||500) : res.statusCode;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message:errorMessage[error.name]||error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
      errors:error.errors||undefined,
    });
  }
  
  module.exports = {
    notFound,
    errorHandler,
  };  

//diffrence b/w object.property and object[property]
//When you need to iterate over an array of strings like fields=["name","address",...] as data[fields[i]]
//When you will be compiling your code with the closure compiler (dot notations get renamed and break)
//If you want to differentiate types of variables by using one type a dot and others as bracket
//When the user/client side will be selecting what data field to use. alert(data[arguments[1]])


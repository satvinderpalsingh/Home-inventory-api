const jwt=require('jsonwebtoken');
function sign(payload){
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'1d',//we will be placing the middleware that make it essential to login agin if there is no request being made during the expire time specified in jsonwebtoken
        },(error,token)=>{
            if(error){return reject(error)};
            return  resolve(token); 
        });

    });
};
module.exports={
    sign
}
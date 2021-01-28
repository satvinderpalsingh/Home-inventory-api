const express =require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Users=require('../users/users.model');
const yup=require('yup');
const jwt=require('../../lib/jwt');//here we are importing the jwt sign func to actually genrate the token based on passed by us

const schema=yup.object().shape({
    name:yup.string().trim().required().min(2),
    email:yup.string().trim().email().required(),
    password:yup.string()
             .min(8)
             .max(200)
             .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
             .matches(/[A-Z]/, 'password must contain an uppercase letter')
             .matches(/[a-z]/, 'password must contain a lowercase letter')
             .matches(/[0-9]/, 'password must contain a number')
             .required(),
});

//we have not provided the restictions on no of the inputs yet
router.post('/signup',async (req,res,next)=>{
    const{
        name,
        email,
        password
    }=req.body;//destructuring the request body
    try {
        const createUser={
            name,
            email,
            password
        };//the user created based on input
        await schema.validate(createUser,{abortEarly: false,});//if any error ocuur validation of user input is here
        const existingUser= await Users.query().where({email}).first();//we are using the first() if not used first the querry() will return the array of objects but we need only the fisrt passed
        if(existingUser){
            const error=new Error('email in use.... try some other email');
            res.status(403);//doubt
            throw error;
        };
        const hashedPassword= await bcrypt.hash(password,12);//same level encryption as passed in seeding file of password 12
        const insertedUser=await Users.query().insert({
            name,
            email,
            password:hashedPassword
        });
        delete insertedUser.password;//deleting the property password to be displayed 
        const payload={
            id:insertedUser.id,
            name,
            email,
        };
        const token=await jwt.sign(payload)//we need to add the await because the the next line is dependent on iot before completion the next line of code has no use so we add await key
        res.json({
            user:insertedUser,
            token
        });
    }catch (error) {
        console.log(error)
        next(error)
    }
});
    
router.post('/signin',async (req,res,next)=>{
    res.json("hello harry")
});

module.exports=router
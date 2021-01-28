const express =require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Users=require('../users/users.model');
const yup=require('yup');


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


router.post('/signup',async (req,res,next)=>{
    const{
        name,
        email,
        password
    }=req.body;
    try {
        const createUser={
            name,
            email,
            password
        };
        await schema.validate(createUser,{abortEarly: false,});//if any error ocuur
        const existingUser= await Users.query().where({email}).first();
        if(existingUser){
            const error=new Error('email in use.... try some other email');
            res.status(403);
            throw error;
        };
        const hashedPassword= await bcrypt.hash(password,12);
        const insertedUser=await Users.query().insert({
            name,
            email,
            password:hashedPassword
        });
        delete insertedUser.password; 
        res.json(insertedUser);
    }catch (error) {
        console.log(error)
        next(error)
    }
});
    
router.post('/signin',async (req,res,next)=>{
    res.json("hello harry")
});

module.exports=router
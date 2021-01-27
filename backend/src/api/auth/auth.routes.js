const express =require('express');
const router=express.Router();


router.post('/signup',async (req,res,next)=>{
    res.json("hello world")
});

router.post('/signin',async (req,res,next)=>{
    res.json("hello harry")
});

module.exports=router
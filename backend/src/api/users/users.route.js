const express =require('express')
const Users=require('./users.model');
const router=express.Router();

router.get('/',async (req,res)=>{
    const users=await Users.query();
    res.json(users);
});

module.exports=router;
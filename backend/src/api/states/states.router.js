const express = require('express');
const router = express.Router();
const queries=require('./states.queries');//used to call the queries created in .queries file

router.get('/',async (req,res)=>{
    const states=await queries.find()//async await in order to complete the queries from db
    res.json(states);//know we passed that queried data.
});
module.exports=router
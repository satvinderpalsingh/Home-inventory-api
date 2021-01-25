const express=require('express');

const router=express.Router();

const states=require('./states/states.router');
const project=require('../constants/project');
const users=require('./users/users.route');
router.get('/',(req,res)=>{//here we have used the router.get because here we not router to pass now when a "api/v1" url triger then fro  app.js it came here search for / routes matching it will return its message
    res.json({
        message:project.message
    });
});
router.use('/states',states);//mounting the url in middleware
router.use('/users',users);


module.exports=router
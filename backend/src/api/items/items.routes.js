const express=require('express');
const router=express.Router();
const Item=require('./items.model');

router.get('/',async (req,res)=>{
    try {
        const items = await Item
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes
        });

        res.json(items);     
    } catch (error) {
        next(error);       
    }
});

//this will work fine we design the frontend we displays the states and for selected states we can pass the id in requested body 
router.post('/',async (req,res,next)=>{
    try {
        //TODO-> when posting item we need to take user_id from logged in user
        const item = await Item
        .query()
        .insert(req.body);

        res.json(item);     
    } catch (error) {
        next(error);       
    }
});

module.exports=router;

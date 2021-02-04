const express=require('express');
const Item_info=require('./item_infos.model');
const router = express.Router({ mergeParams: true });//this help us to mount the nested routes in router to get the req.params
router.get('/',async (req,res)=>{
    try {
        const items_info = await Item_info
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes
        });

        res.json(items_info);     
    } catch (error) {
        next(error);       
    }
});

//this will work fine we design the frontend we displays the states and for selected states we can pass the id in requested body 
router.post('/',async (req,res,next)=>{
    try {
        //TODO-> when posting item we need to take user_id from logged in user
        //using this concept we can add the properties in request body explicitly without taking input from user 
        //item_id is not taken from user_input but from the past url
        //remember to add this propertie also in schema
        req.body.item_id = Number(req.params.item_id);//item_id property is created
        const item = await Item_info
        .query()
        .insert(req.body);

        res.json(item);     
    } catch (error) {
        next(error);       
    }
});

module.exports=router;

//the date we pass as a strng is interepreted as a date 

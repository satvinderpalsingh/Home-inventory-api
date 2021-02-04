const express=require('express');
const Item_image=require('./items_image.model');
const router = express.Router({ mergeParams: true });//this help us to mount the nested passed info in req body routes in router to get the req.params
router.get('/',async (req,res,next)=>{
    try {
        const items_image = await Item_image
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes
        });

        res.json(items_image);     
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
        const item_image = await Item_image
        .query()
        .insert(req.body);

        res.json(item_image);     
    } catch (error) {
        next(error);       
    }
});

router.patch("/:id",async (req,res,next)=>{
    try {
        //Very_imp-->if we dont dont't use .patch() and use update() then we will get schema validation error becaise update update require whole object so schema validation validate the whole object but .patch() only require specific properties so it will validate only the passed properties 
        const item_image = await Item_image.query().patchAndFetchById(
            req.params.id,
            req.body
          );
          res.json(item_image);  
    } catch (error) {
        next(error);       
    }

});

module.exports=router;

//the date we pass as a strng is interepreted as a date 
//difference b/w put and patch 
//put require to update whole object
//patch require us to update only the properties need to be changed
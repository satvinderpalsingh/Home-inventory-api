const express=require('express');
const router=express.Router();
const Item=require('./items.model');
const itemInfos=require('./items_infos/item_infos.routes');


router.use('/:item_id/item_infos', itemInfos);//we shoud pass merge params in router in item_infos table
router.get('/',async (req,res,next)=>{
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

router.get('/:id',async (req,res,next)=>{
    try {
        const items = await Item
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes(permanately not deleted from db)
            id:req.params.id,
        }).withGraphFetched('item_infos').first();//withGraphFetched(arg) it is simply a querry but not a join thast is done withGraphJoin() it help us to fetch the related items to the the table (arg-> it represent the related table relation defined in model

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

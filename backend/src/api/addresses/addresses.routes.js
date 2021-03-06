const express=require('express');
const router=express.Router();
const Address=require('./addresses.model');

router.get('/',async (req,res)=>{
    try {
        const addreses = await Address
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes
        });

        res.json(addreses);     
    } catch (error) {
        next(error);       
    }
});

//this will work fine we design the frontend we displays the states and for selected states we can pass the id in requested body 
router.post('/',async (req,res,next)=>{
    try {
        [
        "street_address_1",
        "city",
        "pincode",
        "street_address_1"
        ].forEach((props)=>{
            if(req.body[props]){
            req.body[props]=req.body[props].toLowerCase().trim();
            }
        });
        const address = await Address
        .query()
        .insert(req.body);

        res.json(address);     
    } catch (error) {
        next(error);       
    }
});

module.exports=router;

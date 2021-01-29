const express=require('express');
const router=express.Router();
const Address=require('./addresses.model');

router.get('/',async (req,res)=>{
    const addreses = await Address
                    .query()
                    .where({
                        deleted_at:null,//changes to be done for soft deletes
                    });
    res.json(addreses);
});

module.exports=router;

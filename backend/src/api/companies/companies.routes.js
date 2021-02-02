const express=require('express');
const router=express.Router();
const Company=require('./company.model');

router.get('/',async (req,res)=>{
    try {
        const companies = await Company
        .query()
        .where({
            deleted_at:null,//changes to be done for soft deletes
        });

        res.json(companies);     
    } catch (error) {
        next(error);       
    }
});

module.exports=router;

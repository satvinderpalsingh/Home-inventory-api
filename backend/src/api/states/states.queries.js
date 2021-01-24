const db=require('../../db');
const tableNames=require('../../constants/tableNames');
 module.exports={
     find(){
        return db(tableNames.state).select('id','name','code');
     },
     async get(id){
         //we now that db() will retun an arrays of an item so we try to distructured it if we get one length array
        [state]=await db(tableNames.state)//async-await in order to work in consisitency
        .select('id','name','code')
        .where({//it will select only those rows where this object having id field matched
            id
        })
        return state
     }
 };
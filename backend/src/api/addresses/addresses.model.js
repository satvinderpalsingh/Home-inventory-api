const {Model}=require('objection');
const schema=require('./address.schema.json');
const tableNames=require('../../constants/tableNames');

class Address extends Model{
    static get tableName(){
        return tableNames.address;
    }
    static get jsonSchema(){
        return schema
    }

}
 module.exports=Address
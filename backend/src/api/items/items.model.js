const { Model } = require('objection');
const schema = require('./item.schema.json');
const tableNames = require('../../constants/tableNames');
const Item_info = require('./items_infos/item_infos.model');
class Item extends Model {
    static get tableName() {
        return tableNames.item;
    }
    static get jsonSchema() {
        return schema
    }
    //method used to define the relation 
    static get relationMappings() {
        return {
            //item_infos property name must be same as the string passed in withGraphFetched('item_infos') in order to fetch relatred relation
            //item_infos hold all information of constructing relation
            item_infos: {
                relation: Model.HasManyRelation,//typebof relation
                modelClass: Item_info,// the model of the table in realtion with this specicfic model
                join: {//this will define how the relation and related primary key and foreign key
                    from: `${tableNames.item}.id`,//primary key of this table
                    to: `${tableNames.item_info}.item_id`,//foreign key of related table tableName.column(foreign)
                },
            },
        };
    }

}
module.exports = Item

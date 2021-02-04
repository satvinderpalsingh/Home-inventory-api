const { Model } = require('objection');
const schema = require('./items_image.schema.json');
const tableNames = require('../../../constants/tableNames');

class Item_image extends Model {
    static get tableName() {
        return tableNames.item_image;
    }
    static get jsonSchema() {
        return schema
    }

}
module.exports = Item_image

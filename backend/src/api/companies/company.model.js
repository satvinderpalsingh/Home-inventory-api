const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');

class Companies extends Model {
    static get tableName() {
        return tableNames.company;
    }

}
module.exports = Companies
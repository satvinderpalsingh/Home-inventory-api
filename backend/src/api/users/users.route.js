const express = require('express')
const Users = require('./users.model');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await Users.query().select('id', 'name', 'email', 'created_at', 'updated_at').where('deleted_at', null);
    res.json(users);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const queries = require('./states.queries');//used to call the queries created in .queries file

router.get('/', async (req, res) => {
    const states = await queries.find()//async await in order to complete the queries from db
    res.json(states);//know we passed that queried data.
});
router.get('/:id', async (req, res, next) => {
    //we first need to check whether id paased is a no or string
    try {
        if (isNaN(req.params.id)) {
            const error = new Error('invalid ID')
            res.status(422)//422 code is for the having the interrrupted processing
            //throw will send us to catch block
            throw error
        } else {
            const state = await queries.get(req.params.id);
            if (state) {
                return res.json(state);
            }
            return next();
        }

    } catch (error) {
        next(error)
    };
});
module.exports = router
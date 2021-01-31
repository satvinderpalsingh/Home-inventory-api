const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../users/users.model');
const yup = require('yup');
const jwt = require('../../lib/jwt');//here we are importing the jwt sign func to actually genrate the token based on passed by us
const { val } = require('objection');



//defining the validation with yup doesnt means that opur json schema defined for validation will not work it will also work along with the yup library
//yup library has more features for validation thats why we have used it.

const schema = yup.object().shape({
    //trim() is for whitespace in string
    name: yup.string().trim().required().min(2),
    email: yup.string().trim().email().required(),
    password: yup.string()
        .min(8)
        .max(200)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an uppercase letter')
        .matches(/[a-z]/, 'password must contain a lowercase letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required(),
});


//we have not provided the restictions on no of the inputs yet
router.post('/signup', async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;//destructuring the request body


    try {
        const createUser = {
            name,
            email,
            password
        };//the user created based on input

        await schema.validate(createUser, { abortEarly: false, });//if any error ocuur validation of user input is here if not validated than passed to catch block for erropr 
        //objection specific querry
        const existingUser = await Users.query().where({ email }).first();//we are using the first() if not used first the querry() will return the array of objects but we need only the fisrt passed

        if (existingUser) {
            const error = new Error('email in use.... try some other email');
            res.status(403);//doubt
            throw error;
        };

        const hashedPassword = await bcrypt.hash(password, 12);//same level encryption as passed in seeding file of password 12

        const insertedUser = await Users.query().insert({
            name,
            email,
            password: hashedPassword
        });

        delete insertedUser.password;//deleting the property password to be displayed

        const payload = {
            id: insertedUser.id,
            name,
            email,
        };

        const token = await jwt.sign(payload)//we need to add the await because the the next line is dependent on iot before completion the next line of code has no use so we add await key

        res.json({
            user: payload,
            token
        });
    } catch (error) {
        next(error)
    }
});

router.post('/signin', async (req, res, next) => {

    const {//login will only contain the email and password
        email,
        password
    } = req.body;//destructuring the request body

    try {
        const validateCredentials = {
            name: 'satvinder',//dummy username added to validate the user credentials
            email,
            password
        };//the user created based on input

        await schema.validate(validateCredentials, { abortEarly: false, });//if any error ocuur validation of user input is here

        const user = await Users.query().where({ email }).first();//we are using the first() if not used first the querry() will return the array of objects but we need only the fisrt passed

        if (!user) {
            const error = new Error('invalid credentials');
            res.status(401);//doubt
            throw error;
        };
        //during comparing first arg always is the request body pass and 2nd arg is the ecrypted password in db

        const validPassword = await bcrypt.compare(password, user.password);//same level encryption as passed in seeding file of password 12

        if (!validPassword) {
            const error = new Error('invalid password');
            res.status(401);//doubt
            throw error;
        };

        const payload = {
            id: user.id,
            name: user.name,
            email,
        };

        const token = await jwt.sign(payload)//we need to add the await because the the next line is dependent on iot before completion the next line of code has no use so we add await key

        res.json({
            user: payload,
            token
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router


//we can check our generated jwt at site jwt.io
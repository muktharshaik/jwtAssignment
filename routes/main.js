const express = require('express');
const route = express.Router();


const registration = require('../controllers/authCtrl')



route.post('/api/signUp', registration.userSignUp)

route.post('/api/signIn', registration.userSignIn)

module.exports = route
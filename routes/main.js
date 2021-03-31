const express = require('express');
const route = express.Router();


const registration = require('../controllers/displayCtrl')



route.post('/api/signUp', registration.userSignUp)

module.exports = route
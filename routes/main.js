const express = require('express');
const route = express.Router();

const verifyToken = require('../utils/verifyToken')
const auth = require('../controllers/authCtrl')
const edit = require('../controllers/editCtrl')

let ifloggedIn = (req,res,next)=>{

    //Verify Token
    var token = req.headers.cookie.split('=')[1]
    const resu = verifyToken(token)
    if(resu.email){
        next()
    }else{
        res.json({
            message: "TOKEN NOT FOUND"
        })
    }
}

route.post('/api/signUp', auth.userSignUp)

route.post('/api/signIn', auth.userSignIn)

route.post('/api/edit', edit.editDetails), 

module.exports = route
const createToken = require('../utils/createToken')
const verifyToken = require('../utils/verifyToken')

const User = require('../models/user')



let userSignUp = (req,res)=>{

    if(req.body.role === "admin" || req.body.role ==="user"){
        let {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body

        User.find({email: `${email}`}).exec().then((data)=>{
            if(data.length !== 0){
                console.log(data);
                res.json({
                    message: "user Exists"
                })
            }else{
                User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    role: role
                })
                .then(()=>{
                    const token = createToken(email);
                    res.cookie("TOKEN", token, {httpOnly: true})
                    res.json({
                        message: "USER CREATED"
                    })
                }).catch((err)=>{
                    res.json({
                        message: `USER NOT CREATED ${err}`
                    })
                })


            }
        })
    }
}

let userSignIn = (req,res)=>{

    //Verify Token
    var token = req.headers.cookie.split('=')[1]
    const resu = verifyToken(token)

    
    let {
        email,
        password
    } = req.body

    if(resu.email === email){
        res.json({
            message: "ENTERED THROUGH TOKEN"
        })
    }else{
        User.findOne({email})
        .then(data=>{
            if(password === data.password){
                res.json({
                    message: "CORRECT"
                })
            }else{
                res.json({
                    message: "WRONG PASSWORD"
                })
            }
        })
        .catch((err)=>{
            res.json({
                message: "user Not Found"
            })
        })
    }
}

module.exports = {
    userSignUp,
    userSignIn
}
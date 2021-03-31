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
    
    let {
        email,
        password
    } = req.body

    
    User.findOne({email})
    .then(data=>{
        if(password === data.password){

            //created Token
            var userID = data.email
            var role = data.role
            const token = createToken(userID, role);
            res.cookie("TOKEN", token, {httpOnly: true})


            res.json({
                message: "LOGGED IN"
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

module.exports = {
    userSignUp,
    userSignIn
}
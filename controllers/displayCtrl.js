const createToken = require('../utils/createToken')

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


module.exports = {
    userSignUp,
}
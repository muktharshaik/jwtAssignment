const User = require('../models/user')
const verifyToken = require('../utils/verifyToken')

let editDetails = (req,res)=>{

    let {
        email,
        firstName
    } = req.body

    var token = req.headers.cookie.split('=')[1]
    const userDetails = verifyToken(token)

    if(userDetails.email === email){
        User.findOne({email: `${email}`}, {firstName: firstName}).then(()=>{
            res.json({
                message: "Successfully Updated"
            })
        })
    }else{
        res.json({
            message: "INVALID EMAIL"
        })
    }

}


module.exports = {
    editDetails
}
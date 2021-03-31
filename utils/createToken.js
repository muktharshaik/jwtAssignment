const jwt = require('jsonwebtoken')


function createToken(email, role){
    return jwt.sign({email, role}, "THIS IS JWT")
}

module.exports = createToken
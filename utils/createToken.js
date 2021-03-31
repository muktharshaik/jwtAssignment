const jwt = require('jsonwebtoken')


function createToken(email){
    return jwt.sign({email}, "THIS IS JWT")
}

module.exports = createToken
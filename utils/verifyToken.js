const jwt = require('jsonwebtoken')

function verifyToken(token){
    return jwt.verify(token, "THIS IS JWT")
}

module.exports = verifyToken
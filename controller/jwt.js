const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const { use } = require('../routes')
function generateToken(userDetail) {
    const token = jwt.sign(userDetail, config.secretKey, { expiresIn: 60 * 60 })
    return token
}

function verifyToken(token) {
    const userDetail = jwt.verify(token, config.secretKey)
    return userDetail
}

module.exports = { generateToken, verifyToken }
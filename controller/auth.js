const { verifyToken } = require('./jwt')
function verifyUser(req, res) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        const userDetail = verifyToken(token)
        return userDetail
    }
}

module.exports = { verifyUser }
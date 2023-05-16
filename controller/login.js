const { encrypt } = require('../common/crypto')
const { generateToken } = require('./jwt')
const config = require('../config/config.json')
async function login(req, res) {
    try {
        const data = req.body;
        const encryptPass = encrypt(data.password)
        let checkQuery = `select id as userId, username, firstname,lastname from blog_post.users where username = '${data.username}' and password = '${encryptPass}' and isDeleted = 0;`
        const userDetail = await connectDatabase(checkQuery)
        if (userDetail.dbData.length === 0) {
            return res.send({ message: "username or password not correct" })
        }
        const token = generateToken(userDetail.dbData[0])
        return res.send({ message: "login Successfully", token: token })
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports.login = login
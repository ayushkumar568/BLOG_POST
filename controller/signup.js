const { encrypt } = require('../common/crypto')
async function signup(req, res) {
    try {
        const data = req.body;
        let checkQuery = `select username from blog_post.users where username = '${data.username}';`
        const userDetail = await connectDatabase(checkQuery)
        console.log(userDetail)
        if (userDetail.dbData.length > 0) {
            return res.status(500).send("exist")
        }
        const encryptPass = encrypt(data.password)
        console.log(encryptPass)
        const saveQuery = `INSERT INTO blog_post.users (firstname,lastname,username,password) VALUES ('${data.firstname}','${data.lastname}','${data.username}','${encryptPass}')`
        await connectDatabase(saveQuery)
        return res.status(200).send({ message: "Created Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.signup = signup
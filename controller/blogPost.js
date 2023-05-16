const config = require('../config/config.json')
const moment = require('moment')
const fs = require('fs');
const { async } = require('q');
async function save(req, res) {
    try {
        const data = req.body;
        const file = req.file
        const userId = req.info.userId
        const date = new Date()
        const formatDate = moment(date).format('YYYY/MM/DD HH:mm:ss')
        const saveQuery = `INSERT INTO blog_post.blogpost (userId,title,description,imageAndThumbnail,createdBy,createdAt,isDeleted) VALUES (${userId},'${data.title}','${data.description}','${file.path}','${userId}','${formatDate}',${0});`
        await connectDatabase(saveQuery)
        return res.send({ message: "Save Successfully" })
    }
    catch (err) {
        console.log(err)
        res.send({ message: "save failed" })
    }
}

async function update(req, res) {
    try {
        const data = req.body;
        const file = req.file

        const date = new Date()
        const userId = req.info.userId
        const formatDate = moment(date).format('YYYY/MM/DD HH:mm:ss')
        let updateQuery = `UPDATE blog_post.blogpost `
        let set = 'SET '
        const key = Object.keys(data)
        for (let i = 0; i < key.length; i++) {
            if (key[i] !== 'id')
                set += `${key[i]} = '${data[key[i]]}', `;
        }
        if (file)
            set += `imageAndThumbnail = '${file.path}', `;
        set += `updatedBy = ${userId}, updatedAt = '${formatDate}' `
        const where = `WHERE id = ${data.id} and userId = ${userId}`
        updateQuery = updateQuery + set + where
        await connectDatabase(updateQuery)
        return res.status(200).send({ message: "update Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "update failed" })
    }
}

async function deletePost(req, res) {
    try {
        const data = req.body;
        const userId = req.info.userId
        const date = new Date()
        const formatDate = moment(date).format('YYYY/MM/DD HH:mm:ss')
        let deleteQry = `UPDATE blog_post.blogpost SET isDeleted = 1, `
        deleteQry += `updatedBy = ${userId}, updatedAt = '${formatDate}' `
        const where = `WHERE id = ${data.id} and userId = ${userId};`
        deleteQry += where
        await connectDatabase(deleteQry)
        return res.send({ message: "Delete Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "delete failed" })
    }
}

async function getBlogList(req, res) {
    try {
        const userId = req.info.userId
        const listQry = `SELECT id, title,description,imageAndThumbnail from blog_post.blogpost where userId = ${userId} and isDeleted = 0 and isActive = 1;`
        const list = await connectDatabase(listQry)
        return res.send({ message: "Fetched Successfully", count: list.dbData.length, blogList: list.dbData })
    }
    catch (err) {
        console.log(err)
        res.send({ message: "Fetch failed" })
    }
}

async function getBlogDetail(req, res) {
    try {
        const userId = req.info.userId
        const id = req.query.id
        const listQry = `SELECT id, title,description,imageAndThumbnail from blog_post.blogpost where userId = ${userId} and id = ${id} and isDeleted = 0 and isActive = 1;`
        let list = await connectDatabase(listQry)
        if (list.dbData.length === 0)
            return res.status(404).send({ message: "Blog not found" })

        fs.readFile(`${list.dbData[0].imageAndThumbnail}`, async function read(err, data) {
            if (err) {
                return res.status(200).send({ message: "Fetched Successfully", blogDetail: list.dbData[0] });
            }
            const base64data = new Buffer(data).toString('base64');
            console.log(base64data);
            list.dbData[0].imageAndThumbnail = await fileContent(base64data)
            return res.status(200).send({ message: "Fetched Successfully", blogDetail: list.dbData[0] })
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Fetch failed" })
    }
}
function fileContent(base64data) {
    return base64data
}

async function activeOrInactive(req, res) {
    try {
        const data = req.body;
        const userId = req.info.userId
        const date = new Date()
        const formatDate = moment(date).format('YYYY/MM/DD HH:mm:ss')
        let updateQry = `UPDATE blog_post.blogpost SET isActive = ${data.isActive}, `
        updateQry += `updatedBy = ${userId}, updatedAt = '${formatDate}' `
        const where = `WHERE id = ${data.id} and userId = ${userId};`
        updateQry += where
        await connectDatabase(updateQry)
        return res.send({ message: "Update Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Update failed" })
    }
}
module.exports.save = save
module.exports.update = update
module.exports.deletePost = deletePost
module.exports.getBlogList = getBlogList
module.exports.getBlogDetail = getBlogDetail
module.exports.activeOrInactive = activeOrInactive
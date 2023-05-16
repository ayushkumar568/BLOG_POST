const express = require('express')
const router = express.Router()
const signupController = require('../controller/signup')
const loginController = require('../controller/login')
const blogPostController = require('../controller/blogPost')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { verifyUser } = require('../controller/auth')

router.get('/blog/ping', async (req, res) => {
    res.status(200).send('pong')

})

router.post('/blog/signup', (req, res) => {
    signupController.signup(req, res);
})

router.post('/blog/login', (req, res) => {
    loginController.login(req, res);
})

router.use(function middleware(req, res, next) {
    try {
        const result = verifyUser(req, res)
        req.info = result
        next()
    }
    catch (error) {
        res.status(401).send({ message: "user is not authorised" })
    }
})

router.post('/blog/save', upload.single('imageAndThumbnail'), (req, res) => {
    blogPostController.save(req, res);
})

router.post('/blog/update', upload.single('imageAndThumbnail'), (req, res) => {
    blogPostController.update(req, res);
})

router.post('/blog/delete', (req, res) => {
    blogPostController.deletePost(req, res);
})

router.get('/blog/blogList', (req, res) => {
    blogPostController.getBlogList(req, res);
})

router.get('/blog/blogDetail', (req, res) => {
    blogPostController.getBlogDetail(req, res);
})

router.post('/blog/activeInactive', (req, res) => {
    blogPostController.activeOrInactive(req, res);
})

module.exports = router
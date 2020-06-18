const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const upload = require('../middleware/uploadImage')
const liginRequired = require('../middleware/requireLogin')


router.get('/', userController.getUsers )
router.get('/:userId', userController.getUser )
router.post('/signup', userController.addUser )
router.post('/login', userController.loginUser )
router.patch('/:userId', liginRequired, upload.single('avatar'), userController.updateUser)

module.exports = router;

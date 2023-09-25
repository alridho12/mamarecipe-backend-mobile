const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const uploadUsers = require("../middleware/uploadProfile");

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .get('/:users_id', userController.getDetailWorker)
  .post('/refreshToken', userController.refreshToken)
  .get('/', userController.getAllUser)
  .put('/:users_id',uploadUsers,userController.updateWorker)

module.exports = router

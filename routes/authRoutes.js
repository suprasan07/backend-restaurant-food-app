//register func ...
const express = require('express')
const { registerController, loginController } = require('../controllers/authController')

//router object
const router = express.Router()

//routes
//register //post
router.post('/register',registerController)//client ->send-> server 
//login
router.post('/login',loginController)
module.exports= router
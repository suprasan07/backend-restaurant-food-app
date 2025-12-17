const express = require('express')
const authMiddkeware = require('../middlewares/authMiddkeware')
const { createFoodController } = require('../controllers/foodController')
const router = express.Router()
//routes
//create
router.post('/create',authMiddkeware,createFoodController)

module.exports =router
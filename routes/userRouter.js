const express = require('express')
const { getUserController } = require('../controllers/userController')
const authMiddkeware = require('../middlewares/authMiddkeware')

const router = express.Router()

//Router
//Get user || get
router.get('/getUser',authMiddkeware,getUserController)

module.exports = router
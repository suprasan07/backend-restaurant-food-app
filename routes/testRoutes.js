const express = require('express')
const { testController } = require('../controllers/testcontroller')

//router object
const router = express.Router()

//routers //get //post //update // delete
router.get('/test-user', testController)


//export
module.exports= router
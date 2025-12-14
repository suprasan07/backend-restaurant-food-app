const express = require('express')
const authMiddkeware = require('../middlewares/authMiddkeware')
const { createResturantController, getAllResturantController, getResturantById, deleteResturantController } = require('../controllers/resturantController')

const router = express.Router()

//Router
//create
router.post('/create',authMiddkeware,createResturantController)

//get all resturants ||get
router.get('/getAll',getAllResturantController)

//get resturant by ID || get
router.get('/get/:id',getResturantById)

//delete resturant || DELETE
router.delete('/delete/:id',authMiddkeware,deleteResturantController)

module.exports = router


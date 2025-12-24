const express = require('express')
const authMiddkeware = require('../middlewares/authMiddkeware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResController, updatefoodController, deletefoodController, placeOrderController, orderStatusController } = require('../controllers/foodController')
const router = express.Router()
//routes
//create
router.post('/create',authMiddkeware,createFoodController)

//get all food
router.get('/getAll',getAllFoodController);

//get single food
router.get('/get/:id',getSingleFoodController)

//get food by res
router.get('/getByResturant/:id',getFoodByResController)

//update food
router.put('/update/:id',authMiddkeware,updatefoodController)

//delete food
router.delete('/delete/:id',authMiddkeware,deletefoodController)

//Place order
router.post('/placeOrder',authMiddkeware,placeOrderController)

//order status
router.post('/orderStatus/:id',authMiddkeware,adminMiddleware,orderStatusController)

module.exports =router
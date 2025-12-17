const express = require('express')
const authMiddkeware = require('../middlewares/authMiddkeware')
const { createCatController, getAllCategory, updateCatController, deleteCatController } = require('../controllers/categoryController')
const router = express.Router()

// routes
//create category
router.post('/create',authMiddkeware,createCatController)

//get all category
router.get('/getAll',getAllCategory)

//UPDATE
router.put('/update/:id',authMiddkeware,updateCatController)

//delete
router.delete('/delete/:id',authMiddkeware,deleteCatController)

module.exports = router
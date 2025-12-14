const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController')
const authMiddkeware = require('../middlewares/authMiddkeware')

const router = express.Router()

//Router
//Get user || get
router.get('/getUser',authMiddkeware,getUserController)

//update profile //put
router.put('/updateUser',authMiddkeware,updateUserController)

//password update 
router.post('/updatePassword',authMiddkeware,updatePasswordController)

//reset password
router.post('/resetPassword',authMiddkeware,resetPasswordController)

//delete user
router.delete('/deleteUser/:id',authMiddkeware,deleteProfileController)

module.exports = router


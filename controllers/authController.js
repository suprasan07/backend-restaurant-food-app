const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


const registerController = async (req, res) => {
    try {
        //get from the user
        const { username, email, password, phone, address } = req.body //dstructuring the data from body 
        //validation
        if (!username || !email || !password || !phone || !address) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        //check for user
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'email s already registerd please login'
            })
        }

        //hashing password 1- create salt  2-hashsync 0r hash fun
        var salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //create new user
        const user = await userModel.create({ 
            username, 
            email, 
            password:hashPassword, //key and the value
            address, 
            phone 
        })
        res.status(201).send({
            success: true,
            message: 'successfully registerd',
            user,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'error in register api',
            err
        })
    }
};

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'please provide email or password',

            })
        }
        //check user
        const user = await userModel.findOne({ email})//we write(email:email)for the separate validation logic

        if (!user) {
            return req.status(404).send({
                success: false,
                message: 'user not find',
            })
        }

        //check user password || compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).send({
                success:false,
                message:'Invalid Credentials',
            })
        }
        //token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d",})//encrept kai liya sign  verify for the decrypt
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            user,//this is the user which is hide by the token after a while
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in the login api',
            err
        })
    }
}

module.exports = { registerController, loginController }
// const userModel = require("../models/userModel")

// //Get user info
// const getUserController = async(req,res) => {
//     // res.status(200).send('user Data');
//     // console.log(req.body.id)
//     try{
//         //find user
//         const user = await userModel.findById({_id:req.body.id})//,{_id:0}    0 for not visible  //hide
//         //validation
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:'user not found'
//             })
//         }
//         //hide password
//         user.password = undefined
//         //response
//         res.status(200).send({
//             success:true,
//             message:'user get successfully',
//             user
//         })

//     }catch(err){
//         console.log(err)
//         res.send({
//             success:false,
//             message:'Error in Get User API',
//             err:err.message
//         })
//     }

// }

// //update user
// const updateUserController =async(req,res)=>{
//     try{
//         //find user
//         const user = await userModel.findById({_id:req.body.id})
//         //validation
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:'user not found'
//             })
//         }
//         //update
//         const { username,address, phone} = req.body
//         if(username) user.username = username // previous wala rakho yah new mai change kar do
//         if(address) user.address = address
//         if(phone) user.phone = phone

//         //save user
//         await user.save()
//         res.status(200).send({
//             success:true,
//             message:'user update successfully'
//         })
//     }catch(err){
//         console.log(err)
//         res.status(500).send({
//             success:false,
//             message:'error in update user api',
//             err:err.message
//         })
//     }
// }

// module.exports= {getUserController,updateUserController}

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
// Get user info
const getUserController = async (req, res) => {
  try {
    const id = req.userId || req.user?.id || req.body.id;
    if (!id) {
      return res.status(401).send({ 
        success: false, 
        message: "User id missing. Auth middleware should provide req.userId" 
    });
    }

    // use .select to hide password directly from DB
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({ 
        success: false, 
        message: "User not found" });
    }

    res.status(200).send({ 
        success: true, 
        message: "User retrieved successfully", 
        user });
  } catch (err) {
    console.error("Error in Get User API:", err);
    res.status(500).send({ 
        success: false, 
        message: "Error in Get User API", 
        error: err.message });
  }
};

// Update user (find -> mutate -> save)
const updateUserController = async (req, res) => {
  try {
    const id = req.userId || req.user?.id || req.body.id;
    if (!id) {
      return res.status(401).send({ 
        success: false, 
        message: "User id missing. Auth middleware should provide req.userId" });
    }

    // fetch user as a document
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({ 
        success: false, 
        message: "User not found" });
    }

    // Allow updating only certain fields
    const fields = ["username", "address", "phone"];
    let changed = false;

    fields.forEach((f) => {
      if (Object.prototype.hasOwnProperty.call(req.body, f)) {
        user[f] = req.body[f];
        changed = true;
      }
    });

    if (!changed) {
      return res.status(400).send({ 
        success: false, 
        message: "No updatable fields provided" 
    });
    }

    // This will trigger pre('save') hooks, validators etc.
    const saved = await user.save();

    // hide password
    saved.password = undefined;

    res.status(200).send({ success: true, message: "User updated successfully", user: saved });
  } catch (err) {
    console.error("Error in update user API:", err);
    res.status(500).send({ success: false, message: "Error in update user API", error: err.message });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    // user id from auth middleware
    const userId = req.user.id;

    // find user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password"
      });
    }

    // compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password"
      });
    }

    // hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in password update API",
      error: err.message
    });
  }
};


//reset password
const resetPasswordController= async(req,res)=>{
  try{
      const {email,newPassword, answer} = req.body
    //validation
    if(!email || !newPassword || !answer){
      return res.status(500).send({
        success:false,
        message:'please provide all fields'
      })
    }
    const user = await userModel.findOne({email,answer})
    if(!user){
      return res.status(500).send({
        success:false,
        message:'user not found or invalid answer'
      })
    }
    //hash password
    var salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hash(newPassword,salt)
    user.password = hashPassword
    await user.save()
    res.status(200).send({
      success:true,
      message:'password reset successfully'
    })
  }catch(err){
    console.log(err.message)
    res.status(500).send({
      success:false,
      message:'error im password reset api',
      err
    })
  }
}

//delete profilr account
const  deleteProfileController = async(req,res) => {
  try {
      await userModel.findByIdAndDelete(req.params.id)
      return res.status(200).send({
        success:true,
        message:'your account has been deleted'
      })    
  } catch (err) {
    console.log(err.message)
    res.status(500).send({
      success:false,
      message:'error in delete profile api',
      err
    })
  }
}



module.exports = { 
  getUserController, 
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController
};

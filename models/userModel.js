const mongoose = require('mongoose')

//schema
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is require']
    },
    email:{
        type:String,
        required:[true,'email is require'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is require']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'usertype is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXjT9coLhuSOYCNtfegZnTDfGgz5BhEQyCkQ&s'
    },
    answer:{
        type:String,
        required:[true,'Answer is required'],
    }
    
},{timestamps:true})


module.exports= mongoose.model('user',userSchema);
const mongoose = require('mongoose')

//schema
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'food title is require']
    },description:{
        type:String,
        required:[true,'food description is require']
    },
    price:{
        type: Number,
        required:[true,'food price is require']
    },
    imageUrl:{
        type:String,
        default:"https://www.shutterstock.com/shutterstock/photos/1271590297/display_1500/stock-vector-food-logo-with-smile-label-for-food-company-grocery-store-logo-vector-illustration-with-smiling-1271590297.jpg"
    },
    foodTags:{
        type:String
    },category:{
         type:String
    },code:{
        type:String
    },
    isAvailable:{
         type:Boolean,
         default:true
    },resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurant'
    },rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
   ratingCount:{
    type:String
   }
}, { timestamps: true })

module.exports = mongoose.model('food', foodSchema);  
const mongoose = require('mongoose')

//schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category tittle is required']
    },
    imageUrl:{
        type:String,
        default:"https://www.shutterstock.com/shutterstock/photos/1271590297/display_1500/stock-vector-food-logo-with-smile-label-for-food-company-grocery-store-logo-vector-illustration-with-smiling-1271590297.jpg"
    },
   
}, { timestamps: true })

module.exports = mongoose.model('Categiry', categorySchema);  
const mongoose = require('mongoose')

//function mongodb data base connection
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to the db ${mongoose.connection.host}`)
    }catch(err){
        console.log("db erroe",err)
    }
} 

module.exports = { connectDB };
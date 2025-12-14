const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')


//dotenv configuration
dotenv.config()// if it is in another folder writes its path inside confige

const { connectDB } = require('./config/db')

//db connection
connectDB()

const app = express();

//middleware
app.use(cors())//Allows frontend → backend API requests 
app.use(express.json())//client side se jo bhi data aaega hm use json format mai acess karenge
app.use(morgan('dev'))//logs each request in the console


//routes
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRouter'))
app.use('/api/v1/resturant',require('./routes/resturantRoutes'))
//main routes
app.get("/", (req,res)=>{
    return res.status(200).send("<h2>welcome to food server</h2>") 
}) 


const PORT =process.env.PORT || 8080 ;
app.listen(PORT,()=>{
    console.log(`server running... on ${PORT}`)
})

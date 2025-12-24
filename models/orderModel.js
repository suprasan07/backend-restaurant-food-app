const mongoose = require('mongoose')

//schema
const orderSchema = new mongoose.Schema(
    {
        foods:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:'food'
        }
    ],//array bcz it can be multiple
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        enum:['preparing','on the way','prepare','delivered'],
        default:'preparing',
    },

},
{timestamps:true})
module.export = mongoose.model("Orders",orderSchema)
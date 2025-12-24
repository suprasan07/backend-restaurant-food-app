const foodModel = require('../models/foodModel')
const orderModel = require('../models/orderModel')

//create
const createFoodController =  async(req,res) => {
    try {
        const {title, imageUrl,description,price,foodTags,category,code,isAvailable,resturant,ratingCount,rating} =req.body
        //validation
        if(!title || !description || !resturant || !price){
            return res.status(500).send({
                success:false,
                message:'please provide all fields',
            
            })
        }
        const newFood = new foodModel({title, imageUrl,description,price,foodTags,category,code,isAvailable,resturant,ratingCount,rating})

        await newFood.save()
        res.status(201).send({
            success:true,
            message:'new food created',
            newFood
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create food API',
            error
        })
    }
}

//get all food 
const getAllFoodController = async(req,res) =>{
    try {
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'no food items was found'
            })
        }
        res.status(200).send({
            success:true,
            totalCount :foods.length,
            foods
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get all food API',
            error
        })
    }
}
//get single food
const getSingleFoodController =async(req,res) =>{
    try{
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found with hits id'
            })
        }
        res.status(200).send({
            success:true,
            food
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get single all food API',
            error
        })
    }
}

//get food by resturant
const getFoodByResController =async(req,res) =>{
    try{
        const resturantId = req.params.id
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        
        }
        const food = await foodModel.find({resturant:resturantId})
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found with hits id'
            })
        }
        res.status(200).send({
            success:true,
            message:"food based on resturant",
            food
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get food by resturant API',
            error
        })
    }
}

//update food
const updatefoodController =async(req,res)=>{
    try{
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'no food id was found'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found'
            })
        }
        const {title, imageUrl,description,price,foodTags,category,code,isAvailable,resturant,ratingCount,rating} =req.body

        const updatedFood = await foodModel.findByIdAndUpdate(foodId,
            {title, imageUrl,description,price,foodTags,category,code,isAvailable,resturant,ratingCount,rating},
            {new:true})    
        res.status(200).send({
            success:true,
            message:'food item was updated'
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update food by resturant API',
            error
        })
    }
}
//delete food 
const deletefoodController =async(req,res) =>{
    try {
        const foodId = req.params.id
         if(!foodId){
            return res.status(404).send({
                success:false,
                message:'no food id was found'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food Found with id'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:'food item was deleted'
        });
    }catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete food by resturant API',
            error
        })
    }
}


//placeorder
const placeOrderController = async(req,res) => {
    try {
        const {cart,payment} = req.body;//add to cart , payment (or payment gatway)
        if(!cart || !payment){
            return res.status(500).send({
            success:false,
            message:'Error add to cart or payment method'
        })
        }
        let total = 0;
        //calculation
        cart.map(i=>{
            total +=i.price
        })
        const newOrder = await orderModel({
            foods:cart,
            payment:payment,
            buyer:req.body.id
        })
        res.status(200).send({
            success:true,
            message:'oder placed successfully',
            newOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Place order API',
            error
        })
    }
};

//change order status
const orderStatusController = async(req,res) =>{
    try {
        const orderId = req.prams.id
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"please provide valid order id"
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order status Updated"
        })
    } catch (err) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in order status API',
            error
        })
    }
}


module.exports ={
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByResController,
    updatefoodController,
    deletefoodController,
    placeOrderController,
    orderStatusController
}
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
            success:true,
            message:'Error in create food API',
            error
        })
    }
}

module.exports ={
    createFoodController,

}
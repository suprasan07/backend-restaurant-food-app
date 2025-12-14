const resturantModel = require("../models/resturantModel")

//create resturant
const createResturantController = async (req, res) => {
    try {
        // const resturantData = req.body
        const { 
            tittle,
            coords,
            code, 
            ratingCount, 
            rating, 
            logoUrl, 
            isOpen, 
            delivery, 
            pickup, 
            time, 
            foods, 
            imageUrl 
        } = req.body

        //validation
        if(!tittle || !coords){
            return res.status(500).send({
                success:false,
                message:'please provide tittle and address',
            })
        }
        const newResturant = await resturantModel({
            tittle,
            coords,
            code, 
            ratingCount, 
            rating, 
            logoUrl, 
            isOpen, 
            delivery, 
            pickup, 
            time, 
            foods, 
            imageUrl 
        })

            await newResturant.save()
            res.status(201).send({
                success:true,
                message:'new resturant created successfully'
            })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in create resturant api',
            err
        })
    }
}

//getall resturant
const getAllResturantController = async(req,res) => {
    try {
        const restaurants = await resturantModel.find({})
        if(!restaurants){
            return res.status(404).send({
                success:true,
                message:'no resturant available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in  Get all resturant api',
            error
        })
    }
}

//get resturant by id
const getResturantById = async(req,res) => {
    try {
        const resturantId = req.params.id        
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'please provide resturant id'
            })
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'no message found'
            })
        }
        res.status(200).send({
            success:true,
            resturant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get resturant by id api',
            error
        })
    }
}

//delete resturant 
const deleteResturantController = async(req,res) => {
    try {
        const resturantId = req.params.id
         if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'no resturant id found or please provide resturant id'
            })
        }

        await resturantModel.findByIdAndDelete(resturantId)
        res.status(200).send({
            success:true,
            message:'resturant delete successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete resturant api',
            error
        })
    }
}
module.exports = {
    createResturantController,
    getAllResturantController,
    getResturantById,
    deleteResturantController
}
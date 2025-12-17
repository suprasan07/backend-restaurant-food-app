const categoryModel = require("../models/categoryModel")

//create
const createCatController = async(req,res) => {
    try {
        const{title, imageUrl} =req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:'please provide category title or image',
            
            })
        }
        const newCategory = new categoryModel({title,imageUrl})

        await newCategory.save()
        res.status(201).send({
            success:true,
            message:'category created',
            newCategory 
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:'Error in create Category API',
            error
        })
    }
}

//get all category
const getAllCategory = async(req,res) => {
    try{
        const categories = await categoryModel.find({})
        //validation
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'no category founf'
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:'Error in get all Category API',
            error
        })
    }

}


//update 
const updateCatController = async (req,res) => {
    try {
        const {id}=req.params
        const {title, imageUrl} = req.body
        const updatedCategory =await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})//new true is mandetory

        //validation
          if(!updatedCategory){
            return res.status(400).send({
                success:false,
                message:'No category found'
            })
          }
        res.status(200).send({
            success:true,
            message:'category update successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update Category api',
            error
        })
    }
}

const deleteCatController = async(req,res) => {
    try {
        const {id} = req.param
        if(!id){
            return res.status(500).send({
                 success:false,
                 message:'please provide cat id'
            })
        }
        const category = await categoryModel.findById(id) 
        if(!category){
             return res.status(500).send({
                 success:false,
                 message:'No category found with this id'
            })
        }      
        await categoryModel.findByIdAndDelete(id)
         res.status(200).send({
            success:true,
            message:'category deleted successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete Category api',
            error
        })
    }
}
module.exports ={createCatController,
    getAllCategory,
    updateCatController,
    deleteCatController
}
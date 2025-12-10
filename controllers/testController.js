const testController =(req,res)=>{
    try {
        res.status(200).send(
            {
            success: true,
            message:'test user data api', 
        }
        // '<h2>test user data</h2>'
        )
    } catch (err) {
        console.log("error in the test api",err)
    }
}


module.exports ={testController}
const jwt=require('jsonwebtoken')
const userMiddleware=async(req,res, next )=>{



    try {
        const token=req.headers.token
        if (!token){
            res.status(400).json({msg:"you are not authorized"})
    
        }
        else {
     jwt.verify(token,process.env.JWT_token,(err,verifeyToken)=>{
        if (err){
            res.status(400).json({msg:"you are not authorized"})
        }else{
            req.body.UserID= verifeyToken.id
    next()
        }
     })
  
    }
        
    } catch (error) {
        res.status(500).json({msg:"something went wrong!"})
        
    }
   
}
module.exports=userMiddleware
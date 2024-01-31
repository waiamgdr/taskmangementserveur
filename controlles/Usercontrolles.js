const User = require("../model/UserSchema")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
 const{validationResult}=require('express-validator')



const register=async(req,res)=>{

 
try {
 
  
    const errors=validationResult(req)
    if (!errors.isEmpty()){
      res.status(400).json({msg:errors.array()})
    }
  
  else{
    const {name,age,email,password}=req.body
  const existUser=await User.findOne({email:email})
  if (existUser){
    res.status(400).json({msg:"user alredy exist pls"})  
  
  }
  else {
      const hashPW=await bcrypt.hash(password,10)
      const NewUser= await User.create({name,age,email,password:hashPW})
      const token =await jwt.sign({id:NewUser._id},process.env.JWT_token,{expiresIn:"7d"})
      res.status(201).json({msg:"registerDone!",token})
  
  }}


}catch(error){
res.status(500).json({msg:"sommething went rong"})
console.log(error)
}
}

const Login=async(req,res)=>{
  try {
    const{email,password}=req.body
    const existUser=await User.findOne({email:email})
    if (!existUser){
    res.status(400).json({msg: "Make sure to register first!"})
    }
    else {
      const verifyPw=await bcrypt.compare(password,existUser.password)
      if(!verifyPw){
        res.status(400).json({msg:"wrong password pls try again!"})

      }else{
         const token =await jwt.sign({id:existUser._id},process.env.JWT_token,{expiresIn:"7d"})
         res.status(200).json({msg:"Login Done!",token})
      }
    }
  } catch(error){res.status(500).json({msg:"something went wrong!"})

  }
}

const userdata=async(req,res)=> 
{
  try {
    const user=await User.findOne({_id:req.body.UserID})
    if (!user){
      res.status(400).json({msg:"usernot exist"})
    }else{
    res.status(200).json({msg:"get user data ",user})
    }
  } catch (error) {
    res.status(500).json({msg:"something went wrong!"})
  }
}




module.exports={register,Login,userdata}
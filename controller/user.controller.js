const User=require('../models/User')
const bcrypt=require('bcryptjs')
const joi=require('joi')
const jwt=require('jsonwebtoken')
const secretKey="meanStackInt-2021"
exports.register=async(req,res)=>{
    const authorSchema=joi.object({
        name:joi.string().required().min(3),
        email:joi.string().email().required(),
        password:joi.string().min(6).max(10)
    })
    try{
        let authorFields=await authorSchema.validateAsync(req.body)
    let user=await User.findOne({email:authorFields.email})

    if(!user){
        user=new User(authorFields)
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt)
        await user.save();
        res.status(200).json({
            message:"User registered successfully",
            user
        })
    }
    else{
        res.status(400).json({
            message:"User already exist",
        
        })
    }
}catch(err){
    res.status(400).json({
        message:"Something went wrong",
        error:err
    })
}
}

exports.login=async(req,res)=>{
    const loginSchema=joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })
    try{
        const loginFields=await loginSchema.validateAsync(req.body);
        let user1=await User.findOne({email:loginFields.email})
        console.log(user1);
        if(!user1){
            res.status(400).json({
                message:"Username/Password doesn't exist"
            })
        }else{
            const is_match=await bcrypt.compare(loginFields.password,user1.password)
            if(!is_match){
                res.status(400).json({
                    message:"Username/Password doesn't exist"
                })
            }else{
                  const payload={
                      userdata:{
                          id:user1._id
                      }
                  }
                  const token=await jwt.sign(payload,secretKey,{expiresIn:7200})
                  res.status(200).json({
                      message:"Logged In",
                      user1:{id:user1._id,name:user1.name},
                      token
                  })
            }
        }
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })

    }
}
const jwt=require('jsonwebtoken')
const secretKey="meanStackInt-2021"
const auth=async(req,res,next)=>{
    if(req.header('x-auth-token')){
        const token=req.header('x-auth-token')
        try{
            await jwt.verify(token,secretKey);
            next();
        }
        catch(err){
            res.status(401).json({
                message:"Unauthorized request !! Bad Token" 
            })
        }
    }
    else{
        res.status(401).json({
            message:"Unauthorized request !! Token Missing"
        })
    }
}

module.exports=auth
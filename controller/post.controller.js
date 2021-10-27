const Post=require('../models/Posts');
exports.listPosts=async(req,res)=>{
  try{
      let posts=await Post.find().populate('userId');
      if(!posts){
          posts=[]
      }
      res.status(200).json({
          message:"Contact fetched successfully",
          postData:posts
      })
    
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",    
            error:err
        })
    }
}

exports.createPost=async(req,res)=>{
    const postObj={
        postContName:req.body.cname,
        
        postContEmail:req.body.cemail,
        postContPhone:req.body.cph,
        postContType:req.body.cty,
        userId:req.body.pauthor,
        postDate:req.body.pdate
    }
    try{
        const post=new Post(postObj);
        await post.save()
        res.status(200).json({
            message:"Saved succesfully", 
            postData:post
        })
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.updatepost=async(req,res)=>{
    const id=req.params.id;
    const postObj={
        postContName:req.body.cname,
        postContEmail:req.body.cemail,
        postContPhone:req.body.cph,
        postContType:req.body.cty,
        userId:req.body.pauthor,
        postDate:req.body.postDate
    }

    try{
        const updatedPost=await Post.findByIdAndUpdate(id,{$set:postObj});

        if(updatedPost==null){
            res.status(400).json({
                message:"Contact didn't updated successfully/ID not found"
            })
        }else{
            res.status(200).json({
                message:"Contact Updated Successfully",
                updatedPost:updatedPost
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}
exports.deletePost=async(req,res)=>{
    const id=req.params.id
    try{
        const deletedPost=await Post.findByIdAndDelete(id);
        if(deletedPost==null){
            res.status(400).json({
                message:"Contact didn't deleted successfully/ID not found"
            })
        }else{
            res.status(200).json({
                message:"Contact Deleted Successfully",
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.getPostByID=async(req,res)=>{
    const id=req.params.id
    try{
        const post=await Post.findById(id);
        if(post){
            res.status(200).json({
                message:"Contact Fetched",
                post:post
            })
        }
        else{
            res.status(400).json({
                message:"Contact not found",
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.getPostByEmail=async(req,res)=>{
    const email=req.params.email
    console.log(email);

    try{
        const post=await Post.findOne({postEmail:email});
        if(post){
            res.status(200).json({
                message:"Post Fetched",
                post:post
            })
        }else{
            res.status(400).json({
                message:"Post not found",
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}
exports.getPostByPhone=async(req,res)=>{
    const phone=req.params.phone
    console.log(phone);

    try{
        const postphone=await Post.findOne({postPhone:phone});
        if(postphone){
            res.status(200).json({
                message:"Post Fetched",
                postphone:postphone
            })
        }else{
            res.status(400).json({
                message:"Post not found",
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.getPostByUser=async(req,res)=>{
    try{
    let posts=await Post.find({userId:req.params.userid}).populate('userId');
    if(!posts){
        posts=[]
      }
      res.status(200).json({
        message:"Contact fetched successfully",
        postData:posts
    })
     }catch(err){
        res.status(200).json({
            message:"Something went wrong",
            error:err
        })

     }
}

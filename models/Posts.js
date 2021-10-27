const mongoose=require('mongoose');
const PostSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'author'
    },
    postContName:{
        type:String,
        required:true
    },
    postContEmail:{
        type:String,
        required:true
    },
    postContPhone:{ 
        type:String,
        required:true
    },
    postContType:{
        type:String,
        required:true
    },
    postDate:{
        type:Date
    }
})
module.exports=mongoose.model('posts',PostSchema);
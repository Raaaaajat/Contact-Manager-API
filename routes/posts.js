const express=require('express');
const router=express.Router();
//const fs=require('fs');
const auth=require('../middleware/auth')
const multer=require('multer')
const upload=multer({dest:"uploads/"})
const postController=require('../controller/post.controller');
router.get('/',postController.listPosts)

router.post("/save",auth,postController.createPost)

router.put("/update/:id",auth,postController.updatepost)

router.get("/getbyid/:id",postController.getPostByID)

router.get("/getbyEmail/:email",postController.getPostByEmail)

router.get("getbyPhone/:phone",postController.getPostByPhone)

router.get("/:userid",auth,postController.getPostByUser)

router.delete("/delete/:id",auth,postController.deletePost)

router.post('/upload',upload.single('imagefile'),(req,res)=>{
    res.status(200).json({
        details:req.file 
    })
})

module.exports = router;
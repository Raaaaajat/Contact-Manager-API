const config=require('./db.config');
const mongoose=require('mongoose');

const dbCon=async()=>{
    try{
        await mongoose.connect(config.uri,{useNewUrlParser: true,useUnifiedTopology: true},()=>{
            console.log("connected to database");
        })
    }
    catch(err){
        console.log(err);
    }
}
module.exports=dbCon;
const http=require('http');
const express=require('express');
const app=express();
const logger=require('./middleware/logger');
const postRoutes=require('./routes/posts');
const userRoutes=require('./routes/author');
const cors=require('cors');
//const db=require('./config/db.con');
//const  {db}= require('./models/User');

const port=process.env.PORT || 3000
let postData=[];
const corsOption={
    "origin":"*"
}

app.use(cors(corsOption));
app.use(logger);
//const app=express.router();
const dbCon=require('./config/db.con');
app.use(express.json());  
//app.use(postRoutes);
app.use('/api/post',postRoutes)
app.use('/api/author',userRoutes)
dbCon();

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to your personal Contact Manager!"
	});
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
});
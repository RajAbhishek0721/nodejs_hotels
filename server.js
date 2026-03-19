const express=require('express')
const app=express()
const db=require('./db'); 
require('dotenv').config();
const passport=require('./auth');

const bodyParser=require('body-parser');
app.use(bodyParser.json()); // data stores in req.body
const PORT =process.env.PORT || 3000;

//MiddleWare function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] : Request Made to : ${req.originalUrl}`);
    next(); // move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.send("Welcome to my Hotel")
})


// Import the router files
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');


// use the routers
app.use('/person',localAuthMiddleware ,personRoutes);
app.use('/menu',menuItemRoutes);



app.listen(PORT,()=>{
    console.log("server is listening on port 3000");
})



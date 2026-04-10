const express =require('express')
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken} =require('./../jwt');


// CRUD operation for the  Person 

// Post route to add a person
router.post('/signup', async (req,res)=>{
    try{
    const data=req.body; // assume the req body contains the person data

    // create a new person document using the mongoose model
    const newPerson =new Person(data);

    // save the new person to the database
    const response=await newPerson.save();
    console.log('data saved');

    const payLoad={
        id:response.id,
        username:response.username
    };
    // printing payload
    console.log(JSON.stringify(payLoad));
    
    // using jwt token creation while signup
    const token=(generateToken(payLoad));
    console.log("Token is :",token);


    res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

//login router
router.post('/login',async (req,res) =>{
    try{
        // extract the username and the password
        const {username,password}=req.body;

        // find user by username
        const user=await Person.findOne({username:username});
        // if user doesn't exist and password doesn't match ,return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        // generate token
        // if user exist and password match then create a payload for the token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);

        // return token as response
        res.json({token})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
        
    }
})


//Profile routes
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user;
        console.log("User Data: ",userData);

        const userId=userData.id;
        const user= await Person.findById(userId);

        res.status(200).json({user})
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }
})


// Get method to get the person

router.get('/',jwtAuthMiddleware, async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
        
    }
})




// get the specific details of person according to workType

router.get('/:workType', async(req,res)=>{
    try{
        const workType=req.params.workType;  //extract the work type from url parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter' ){
            const response=await Person.find({work:workType});
            console.log(' response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: "Invalid work Type"})
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


// update the person details

router.put('/:objectId', async (req,res)=>{
    try{
        const personId=req.params.objectId;  //extract the person id from the url
        const updatedPersonData=req.body;   // updated data for the person
        
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            returnDocument:"after",
            runValidators:true,
        })

        if(!response){
            return res.status(404).json({error:"person not found"})
        }

        console.log('data updated');
        res.status(200).json(response);
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
        
    }
})


// delete the person with the help of objectId

router.delete('/:objectId',async (req,res)=>{
    try{
        const personId=req.params.objectId;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"person not found"})
        }

        console.log('data deleted');
        res.status(200).json({message: 'person deleted succesfully'});

    }
    catch(err){

    }
})

module.exports=router;
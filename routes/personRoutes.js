const express =require('express')
const router=express.Router();
const Person=require('./../models/Person');


// CRUD operation for the  Person 

// Post route to add a person
router.post('/', async (req,res)=>{
    try{
    const data=req.body; // assume the req body contains the person data

    // create a new person document using the mongoose model
    const newPerson =new Person(data);

    // save the new person to the database
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})


// Get method to get the person

router.get('/', async(req,res)=>{
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
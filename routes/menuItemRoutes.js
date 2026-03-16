const express =require('express')
const router=express.Router();
const MenuItem=require('./../models/MenuItem');


// store the menuItem data
router.post('/', async (req,res)=>{
    try{
    const data=req.body; // assume the req body contains the Menu data

    // create a new MenuItem document using the mongoose model
    const newMenuItem =new MenuItem(data);

    // save the new Menu to the database
    const response=await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})



// Get method to get the MenuItem from database

router.get('/',async (req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})        
    }
})


// get the menuItem according to the taste

router.get('/:taste', async (req,res)=>{
    try{
        const tastes=req.params.taste; // extract the taste from url parameter
        if(tastes=='sour'|| tastes=='spicy' || tastes=='sweet'){
            const response=await MenuItem.find({taste:tastes});
            console.log('response fetched');
            res.status(200).json(response); 
        }else{
            res.status(404).json({error:'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})        
    }

    }
)

module.exports=router;
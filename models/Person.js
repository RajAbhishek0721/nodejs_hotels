const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

// define the Person schema
const personScehma=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});


personScehma.pre('save', async function () {
    const person = this; // current document (jo DB me save hone wala hai)

    // 👉 Agar password modify nahi hua (update case), toh hashing skip karo
    if (!person.isModified('password')) return;

    try {
        // 🔐 Salt generate karte hain (random value for extra security)
        const salt = await bcrypt.genSalt(10);

        // 🔐 Plain password ko hash me convert karte hain
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // 🔁 Original password ko hashed password se replace kar do
        person.password = hashedPassword;

    } catch (err) {
        // ❌ Agar hashing me error aaye toh usse throw karo
        // Mongoose automatically handle karega
        throw err;
    }
});



personScehma.methods.comparePassword=async function(candidatePassword){
    try{
    // use bcrypt to compare candidate password to hashed password
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
    }catch(err){
        throw err;
    }

}
// create Person model
const Person=mongoose.model('Person',personScehma);
module.exports=Person;
var a=5;
console.log(a);

for(let a =0;a<5;a++){
    console.log(a);
    console.log("Raaz");
    
}

const person={
    name:"Raj Abhishek",
    age:24,
    isStudent:true,
    hobbies:["reading","singing","playing"]
}

console.log(person);
console.log(person.hobbies);

const ages=[32,40,50,10,15];

const result=ages.filter(checkAge);

function checkAge(age){
    return age<=18
}

console.log(result);


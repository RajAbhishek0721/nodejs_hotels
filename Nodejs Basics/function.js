// function add(a,b){
//     return a+b;
// }

// var add= function(a,b){
//     return a+b;
// }

// var add=(a,b)=>{
//     return a+b;
// }

// var add=(a,b)=>a+b;
// let result=add(47,15);
// console.log(result);

// (function(){
//     console.log("Raaz is added");
// })();


// function callback(){
//     console.log("raj is calling a callback function");    
// }

// const add=function(a,b,callback){
//     var result=a+b;
//     console.log('result '+result);
//     callback();
// }

// add(3,5,callback);





const add=function(a,b,raaz){
    var result=a+b;
    console.log('result '+result); // main function work is completed
    raaz();
}

// add(10,50,function(){
//     console.log("add completed");
// })

add(20,70,()=>console.log("add completed"));





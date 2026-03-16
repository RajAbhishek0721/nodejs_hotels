var fs=require('fs');
var os=require('os');

// var user=os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi Raaz '+'!\n',()=>{
//     console.log("File is created"); 
// });



// const notes=require('./notes.js');
// console.log('server file is loaded');

// var age=notes.age;
// console.log(age);

// var result=notes.addNumber(age,10);
// console.log('result is now '+result);





var _ = require('lodash');
var data=["person","person",1,1,1,12,2,3,2,3,2,1,"person","1"]
var filter=_.uniq(data);
console.log(filter);
console.log(_.isArray(data));





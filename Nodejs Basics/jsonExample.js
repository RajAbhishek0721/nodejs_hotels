const jsonString='{"name":"john","age":30,"city":"New York"}';
const jsonObject=JSON.parse(jsonString);
console.log(jsonObject);





const objectToConvert={
    name:"Raj",
    age:28
}
const jsonStringField=JSON.stringify(objectToConvert);
console.log(jsonStringField);

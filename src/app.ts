// 1. Default type - Array
const names: Array<string> = ["Ankur", "Golu"]; //string[] --both are same
// 2. Default type - Promise
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
    reject("Error!");
  }, 2000);
});

promise.then((data: string) => {
  console.log(data);
});

//extends implements type constraints
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "Ank", hobbies: ["coding"] }, { age: 26 });

//will give error because number is not an object
//const mergeObj1 = merge({ name: "Ank", hobbies: ["coding"] }, 30);
console.log(mergeObj);

//Ensure that whatever passed have a length property
interface Lengthy {
    length: number;
  }
  
  function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value";
    if (element.length > 0) {
      descriptionText = `Got ${element.length} element(s)`;
    }
    return [element, descriptionText];
  }
  
  console.log(countAndDescribe("Hi There!"));
  console.log(countAndDescribe(["Man", "Animal"]));
  
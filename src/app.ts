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

// keyof can be used as type constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "ank" }, "name"));
//throws error when key doesn't exist on object passed
//console.log(extractAndConvert({name: 'ank'}, 'name1'));

//Generic Class
class DataStorage<T extends string | boolean | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(): T[] {
    return this.data;
  }
}

const txtStorage = new DataStorage<string>();
txtStorage.addItem("Ank");
txtStorage.addItem("Gol");
//throws error - string cant store number
//txtStorage.addItem(12);
txtStorage.removeItem("Gol");
console.log(txtStorage.getItems());

const numStorage = new DataStorage<number>();
numStorage.addItem(21);
numStorage.addItem(12);
//throws error - number cant store string
//numStorage.addItem('Gol');
numStorage.removeItem(12);
console.log(numStorage.getItems());

//Generics Utilities - Provided by TypeScript for controlling the behavior
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  //Use Partial when the object property assignment is to be done lazily
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal as CourseGoal;
}

//Use Readonly when the data is to be frozen
const namesArr: Readonly<string[]> = ["Ank", "Gol"];
//Push and Pop method gives error
//namesArr.push('Gol 1');
//namesArr.pop();

//Generic vs Union
class DataStorageUnion {
  private data: (string | number | boolean)[] = [];

  addItem(item: string | number | boolean) {
    this.data.push(item);
  }

  removeItem(item: string | number | boolean) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(): (string | number | boolean)[] {
    return this.data;
  }
}

//Generics confines the type to single whereas Union allows to use mixture of types to be used
const unionStorage = new DataStorageUnion();
unionStorage.addItem("Ank");
unionStorage.addItem(true);
unionStorage.addItem(12);
unionStorage.removeItem(true);
console.log(unionStorage.getItems());
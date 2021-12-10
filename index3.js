const data = [
  { name: "sprite", id: 1, price: 50, featured: true, discount: 20 },
  { name: "pepsi", id: 2, price: 66, featured: false, discount: 10 },
  { name: "cola", id: 3, price: 70, featured: true, discount: 5 },
  { name: "fanta", id: 4, price: 80, featured: true, discount: 0 },
  { name: "marinda", id: 5, price: 44, featured: false, discount: 0 },
];

//  filterout the value using filter method filter creates a new array with tru values
// const result = data.filter((element) => element.featured);
// console.log(result);
// const sum = result.reduce((total, number) => {
//   return total + number.price;
// }, 0);

// console.log(sum);

//Write a array method that returns sum of all the prices given in that array.
// const result = data.reduce((a, b) => {
//   //   console.log(a, b);
//   return a + b.price;
// }, 0);
// console.log(result);
//Write a method that returns an array of objects, if product is featured add 10 to price otherwise print same price.
// const result = data.map((obj) => {
//   // console.log(obj.price + 10);
//   return obj.featured ? { ...obj, price: obj.price + 10 } : obj;
//   // obj.featured ? obj.price + 10 : obj;
// });
// console.log(result);
//write a method that returns sum of products, only when products are featured.
// const result = data
//   .filter((element) => element.featured)
//   .reduce((total, number) => total + number.price, 0);
// console.log(result);
// const sum = result.reduce((total, number) => {
//   //   console.log(number);
//   return total + number.price;
// }, 0);
// console.log(result);
//Write a method that returns an array of objects, the new array have a new element that calculates discount if discount is applied.
// const result = data.map((obj) => {
// let newPrice;
// newPrice = obj.price * (obj.discount / 100);
// actualValue = obj.price - newPrice;
// obj["discountedPrice"] = actualValue;
// return obj;
//   return obj.discount
//     ? {
//         ...obj,
//         discountedPrice: obj.price - obj.price * (obj.discount / 100),
//       }
//     : { ...obj, discountedPrice: obj.price };
// });
// console.log(result);

//write a array method that return names of products seprated by commas.
// const arr = ["ali", "hamza", "asd"];
// const result = arr.join(",");
// console.log(result);

// const result = data.map((item) => item.name).join(",");
// console.log(result);

//Write a array method that delete an item when we pass id of that item.
// const arr = ["1", "2", "3", "4"];

// const myfunction = (value) => {
//   return data.filter((item) => item.id != value.id);
// };
// result = myfunction({ id: 1 });
// console.log(result);

// const newArr = arr.filter((e) => e !== 1);
// console.log(index);

//write a function that receives two parameters, (id and object),it returns new array, we pass an id from parameters, it gets object based on id. update that object with object passed in parameters.

const updateData = (id, obj) => {
  const findResult = data.find((d) => d.id === id);
  // console.log((findResult.name = obj));
  // console.log({ ...findResult, ...obj });
  const result = data.map((item) => {
    return item.id == id ? { ...findResult, ...obj } : item;
    // console.log(item.id);
  });
  return result;
};
const upatedData = {
  name: "raju rocket", price: 700
}

result1 = updateData(2, upatedData);
console.log(result1);

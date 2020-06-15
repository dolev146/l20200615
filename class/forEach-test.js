let numbers = [{id: 100 , value: 1000},
      {id: 100 , value: 1000} ,
       {id: 100 , value: 1000}];

//let dup = (item) => item.value = item.value * 3
numbers.forEach( (item) => item.value = item.value * 3 )



// function duplicate( item , index , allnums ) {
//     item.value  = item.value * 2
// }


console.log(numbers);
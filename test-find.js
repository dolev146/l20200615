const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
  ];
  
  const result = inventory.find( ({ name }) => name === 'papa' );
  
  console.log(result) // { name: 'cherries', quantity: 5 }
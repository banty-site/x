
    let datsmileItems = [
      {name : "eskay para",price : 0.96},
      {name:'preg test casette',price:38.67,info:'25 in pack'},
      {name: 'MMT',price:5.7},
      {name : 'haemoglobin letap', price:5.8},
      {name: 'amlodipine 5mg teva', price:27.00}
      ];

 let shopSrc = 'datsmile.js';
 let srcInUse = sessionStorage.getItem('srcToUse');
 if(srcInUse === shopSrc){
 // Create the datalist element
let datalist = document.createElement('datalist');
datalist.setAttribute('id', 'drugs');
document.getElementById('drug-select').appendChild(datalist);

// Iterate through datsmileItems and create options
for (let i = 0; i < datsmileItems.length; i++) {
    let option = document.createElement("option");
    option.value = datsmileItems[i].name + " | " + datsmileItems[i].price; // Set option value
    datalist.appendChild(option); // Append option to datalist
 }
}
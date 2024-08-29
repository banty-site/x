let pfaItems = [
  {name: "Taabea Mix.",price: "25.77", info: ""},
  {name: "ciprolex tz", price: "40.65", info: ""},
  {name:"letamol", price:"0.98"},
  {name:"gebedol",price:"23.45",info:""},
  {name:"major nasal drops",price:"13.86",info:"6 months to expiry"}
];
      
let shopSrc = 'pfa.js'
let srcInUse = sessionStorage.getItem('srcToUse');
// Create the datalist element
let datalist = document.createElement('datalist');
datalist.setAttribute('id', 'drugs');
document.getElementById('drug-select').appendChild(datalist);

// Iterate through pfaItems and create options
for (let i = 0; i < pfaItems.length; i++) {
    let option = document.createElement("option");
    option.value = pfaItems[i].name + " | " + pfaItems[i].price; // Set option value
    option.textContent = pfaItems[i].info;
    datalist.appendChild(option);
    // Append option to datalist
}

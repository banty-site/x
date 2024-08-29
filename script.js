//TOGGLE DRUG LIST DISPLAY
   let shopSelect = document.getElementsByClassName("shop-select");
   const drugSelect = document.getElementById("drug-select");
   
   drugSelect.addEventListener('change',function(){
    document.getElementById('quantity-input').style.display = "block";
    add.style.display = 'block';
    })
    
  //SET SCRIPT IN HEAD BASED ON SELECTED SHOP
   for (let i = 0; i < shopSelect.length ; i++ ){
   shopSelect[i].addEventListener("click",function(){
    drugSelect.style.display = "block";
    
     //HIDE OPTIONS AFTER EACH CLICK
    let dropdownContent = this.parentElement;
    dropdownContent.style.display = 'none';
    
let correspondingScriptSrc = this.innerText.toLowerCase() + ".js";

// set selected shop to sessionStorage
let selectedShop = this.innerText;
sessionStorage.setItem('wholesaler',selectedShop);

// Create a new script tag and set its src attribute
let script = document.createElement("script");
script.setAttribute("src", correspondingScriptSrc);
// Append the script tag to the head
document.head.appendChild(script);


// Store the src in sessionStorage for later use
sessionStorage.setItem('srcToUse', correspondingScriptSrc);

  });
}
  
  // ADD EVENT TO RESET BUTTON
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click',()=>{
    location.reload();
  })
  
  //DELETE ROW
  const drugForm = document.getElementById('drug-form');
  const tableBody= document.getElementById("table-body");
  const add = document.getElementById('add');
  const table = document.getElementById('table');
  
    tableBody.addEventListener('click', function(event) {
    // Get correct total upon row deletion  
    const totalResult = document.getElementById('totalResults');
    const totalResults = document.getElementById('totalResults').innerHTML.split(' = ');
    let pastTotal = parseFloat(totalResults[1]);
  
    const target = event.target;
    if (target.tagName === "TD") {
        const row = target.parentNode; // Get the parent row (TR)
        const fourthCell = row.cells[3]; // Get the 4th cell (index 3)
        const valueToDelete = parseFloat(fourthCell.textContent);
        
        // Subtract valueToDelete from pastTotal
        pastTotal -= valueToDelete;
        
        // Ensure pastTotal is not negative
        if (pastTotal < 0) {
            pastTotal = 0;
        }

        // Update total display
        totalResult.textContent = pastTotal.toFixed(2);

        // Remove the row
        row.remove();
    }

    // Check the number of remaining rows
    const remainingRows = tableBody.querySelectorAll('tr').length;
    if (remainingRows === 0) {
        // If there are no rows left, set total to zero
        totalResult.textContent = "0.00";
    } else if (remainingRows === 1) {
        // If there's only one row left, set total to the value in the 4th item of the current row
        const remainingRow = tableBody.querySelector('tr');
        const fourthCell = remainingRow.cells[3]; // Get the 4th cell (index 3)
        const valueInCurrentRow = parseFloat(fourthCell.textContent);
        totalResult.textContent = valueInCurrentRow.toFixed(2);
    }
});

// MAKE SURE DATA LIST VALUE ISNT TAMPERED AFTER SELECTION

const inputField = document.getElementById("drug-select");
const dataList = document.getElementById("drugs");

inputField.addEventListener('input',handleInput);
function handleInput() {
  const inputField = document.getElementById("drug-select");
  const dataList = document.getElementById('drugs');
  const buttonHr = document.getElementById('buttonHr');
  
  // Check if the user selected an option from the list
  const selectedOption = Array.from(dataList.options).find(option => option.value === inputField.value);
  buttonHr.style.display = 'flex';
  if (selectedOption) {
    // Disable the input field to prevent editing
    inputField.setAttribute('disabled','disabled');
  }
 // else{inputField.removeAttribute('disabled')}
}


//ADD EVENT TO ADD BUTTON
   add.addEventListener('click', function (){
    event.preventDefault();
    const send = document.getElementById('Send');
    send.style.display = 'block';
  
    const getItemPrice = document.getElementById('drug-select');
    const getItemPriceValue = getItemPrice.value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // REMOVE DISABLED ATTR FROM DRUG INPUT
    inputField.removeAttribute('disabled');
    const itemPrice = getItemPriceValue.split(" | ");
    const drug = itemPrice[0];
    const price = Number(itemPrice[1]);
    sessionStorage.setItem('currentPrice',price);
    const extendendPrice =Number(
      price * quantity) ;
    const tableInfo = document.getElementById('tableInfo');
    tableInfo.style.display = 'block';
    const table = document.getElementById("table");
    table.style.display = 'block';
    let tableRow = document.createElement("TR");
    tableRow.setAttribute('class','tableRows');
    let drugCell = document.createElement("TD")
    drugCell.textContent = drug;
    let quantityCell = document.createElement("TD");
    quantityCell.textContent = quantity;
    let priceCell = document.createElement("TD");
    priceCell.textContent = price;
    let extendendPriceCell = document.createElement("TD");
    extendendPriceCell.setAttribute('class','total');
    extendendPriceCell.textContent = extendendPrice.toFixed(2);
   const currentPrice = sessionStorage.getItem('currentPrice');
  
    //CONDITIONS BE4 QUANTITY IS ACCEPTED
    if(quantity >= 1){
    // ADD ROWS
    tableBody.appendChild(tableRow);
    tableRow.appendChild(drugCell);
    tableRow.appendChild(quantityCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(extendendPriceCell);
    }else if(quantity < 1){alert('Error : quantity can not be a decimal or empty!');}
    else{
  alert ("Please make sure no field is empty !");
    }
    drugForm.reset();
    
    // CALCULATE TOTAL
    let totalResults = document.getElementById('totalResults');
    let totalCells = document.querySelectorAll('.total');
    let total = 0;

   totalCells.forEach(cell => {
    let cellValue = parseFloat(cell.textContent);
    total += cellValue; 
    totalResults.textContent = 'Total =' + ' ' + total.toFixed(2) ;
     });
     totalResults.style.display = 'block';
   })
   
   // GET USER DATA FORM DISPLAY 
const details = document.getElementById('details');
 document.addEventListener("DOMContentLoaded", function() {
    const checkbox =
      document.getElementById("userDetails");
     checkbox.addEventListener("change", function() {
        if (this.checked) {
         details.style.display = 'block';
                }
        else {
         details.style.display = 'none';
                }
            });
        });

const options = {
  weekday: 'short', 
  month: '2-digit', 
  day: '2-digit', 
  year: '2-digit',
  hour: 'numeric', 
  minute: '2-digit', 
  hour12: true 
};

const currentDateAndTime = new Date().toLocaleString('en-US', options);
const date = new Date();
const send = document.getElementById('Send');

//EVENT ON BUTTON TO SUBMIT ENTIRE FORM
send.addEventListener('click',function(){
const wholesaleShop = sessionStorage.getItem('wholesaler');
const table = document.getElementById("table");
const drugData = [];
const data = [];
let totalPrice = 0;

//CONVERT TABLE DATA TO OBJECT
for (let i = 1; i < table.rows.length; i++) { // Start from index 1 to skip the header row
    const cells = table.rows[i].cells;
    const drugName = cells[0].textContent.trim();
    const quantity = parseFloat(cells[1].textContent);
    const price = parseFloat(cells[2].textContent);
    const extendedPrice = parseFloat(cells[3].textContent); // Assuming extended price is in the 4th cell

    totalPrice += extendedPrice;

// for populating view 
    drugData.push({ 
      drug: drugName,
      quantity:quantity,
      price : price });

// This is for sending to formspark  
   data.push({
  drug:drugName,
  quantity : quantity,
});
}

const shopName = document.getElementById('shopName').value;

// Push total price,date and wholesaler as separate objects
drugData.push({ Total: totalPrice },
{date: currentDateAndTime },
{wholesaler : wholesaleShop }
);

data.push(
  {Total : totalPrice},
  {wholesaler : wholesaleShop}
  );

var parsedData ={[shopName]:drugData };
sessionStorage.setItem('order',JSON.stringify(parsedData));

fetch("https://submit-form.com/eCBGx8kbu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data) 
      })
        .then(function (response) {
          console.log(response);
          alert("Order is sent");
        location.href = 'checkorder.html';
        })
        .catch(function (error) {
          console.error(error);
       alert('Error: Check internet connection');
        });
});
 
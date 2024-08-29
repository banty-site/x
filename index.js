document.addEventListener("DOMContentLoaded",function(){
    //Function to get URL parameters
function getUrlParameter(name) {
const urlParams = new URLSearchParams(window.location.search);
return urlParams.get(name);
}
if (getUrlParameter('openModal') === 'true'){
document.getElementById('openModalButton').click();}});

const useLocationCheckbox = document.getElementById('useLocation');
useLocationCheckbox.addEventListener('change', function() {
  if (this.checked) {
    getLocation();}});
function getLocation() {
 if ("geolocation" in navigator) {
   navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
     sessionStorage.setItem('lat',latitude);
     sessionStorage.setItem('long',longitude);
    }, function(error) {
alert("Error getting location: " + error.message);});
} else {
alert("Geolocation is not supported by this browser.");
 }
}

const submitButton = document.getElementById("submit"); 
submitButton.addEventListener('click',myFunction);

function myFunction() {
const lat =  sessionStorage.getItem('lat');
const long = sessionStorage.getItem('long');
const gps = lat + ',' + long;
const shopName = document.getElementById('shopName').value;
const shopLocation = document.getElementById('location').value;
const contact = document.getElementById('contact').value;
if (shopName && shopLocation && contact) {
    const data = JSON.stringify({
        contact: contact,
        location: shopLocation,
        gps: gps
    });

    fetch("https://submit-form.com/nupeAo2NB", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: data
    })
  .then(function (response) {
        if (response.ok == true) {
            alert('Signup Successful. Thanks and welcome!');
        } else {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    });} 
else {
  alert('Please fill the form completely');
 }
}


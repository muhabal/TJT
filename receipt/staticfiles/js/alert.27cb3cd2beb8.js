//get the confirmation elements from the DOM
const showAlertButton = document.getElementById("record-order");
const customAlert = document.getElementById("payment-confirm-alert");
const confirmBtn = document.getElementById("confirm");
const denyBtn = document.getElementById("deny");

//show the alert
showAlertButton.addEventListener('click', function(){
  console.log(customAlert.style.display)
  customAlert.style.display = 'flex'
})

//remove alert
confirmBtn.addEventListener('click', function(){
  customAlert.style.display = 'none';
})

denyBtn.addEventListener('click', function(){
  customAlert.style.display = 'none'
})
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

// creating custom alert for all alerts

var invoice_container = document.getElementById("invoice-container-id")

function tjtAlert(message){
  var alert_container = document.createElement('div')
  alert_container.classList.add('custom-alert')
  
  alert_container.innerHTML = 
  ` <div class="alert-main">
      <div class="message">${message}</div>
      <div class="alert-button">
        <button class="closeAlert">close</button>
      </div>
    </div>`

  invoice_container.appendChild(alert_container)
  alert_container.style.display = 'flex'
  
  var closeButton = document.querySelector(".closeAlert")
  closeButton.addEventListener('click', ()=>{
    alert_container.style.display = 'none'
    alert_container.remove();
  })
}


// creating custom alert for all alerts
function tjtAlert(message, container){
  var alert_container = document.createElement('div')
  alert_container.classList.add('custom-alert')
  
  alert_container.innerHTML = 
  ` <div class="alert-main">
      <div class="message">${message}</div>
      <div class="alert-button">
        <button class="closeAlert">close</button>
      </div>
    </div>`

  container.appendChild(alert_container)
  alert_container.style.display = 'flex'
  
  var closeButton = document.querySelector(".closeAlert")
  closeButton.addEventListener('click', ()=>{
    alert_container.style.display = 'none'
    alert_container.remove();
  })
}


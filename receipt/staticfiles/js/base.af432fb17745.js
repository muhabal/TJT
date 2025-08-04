// set the date to be automatic
var today = new Date()
const date = document.querySelector(".date")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
today = `${today.getUTCDate()} ${months[today.getUTCMonth()]},  ${today.getUTCFullYear()}`
date.innerHTML = today

// show the details options
const details = document.querySelectorAll('.detail')
details.forEach((detail)=>{
  detail.addEventListener('click', (e)=>{
    activeDetail();
    detail.querySelector('.detail-options').classList.toggle('active')
    e.stopPropagation();
  })
})

// event listener to remove details options from display on window click
window.addEventListener('click', ()=>{
  activeDetail();
})

// function to remove the details option
function activeDetail(){
  details.forEach((selected)=>{
    var option = selected.querySelector('.detail-options')
    if (option.classList.contains('active')){
      option.classList.toggle('active'); 
    }
  })  
}
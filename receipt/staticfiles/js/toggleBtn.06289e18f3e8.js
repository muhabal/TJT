// get the order element, toggleBtn and showBtn

const toggleBtn = document.getElementById("toggleBtn")
var orderBlk = document.getElementById("order-element")
const showBtn = document.getElementById("showBtn")

toggleBtn.addEventListener('click', () => {
  showBtn.style.display = 'block'
  orderBlk.style.display = 'none'
})

showBtn.addEventListener('click', ()=>{
  orderBlk.style.display = 'block'
  showBtn.style.display ='none'
})


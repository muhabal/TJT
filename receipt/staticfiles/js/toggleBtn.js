// get the order element, toggleBtn and showBtn

// const toggleBtn = document.getElementById("toggleBtn")
// var orderBlk = document.getElementById("order-element")
// const showBtn = document.getElementById("showBtn")

// toggleBtn.addEventListener('click', () => {
//   showBtn.style.display = 'block'
//   orderBlk.style.display = 'none'
// })

// showBtn.addEventListener('click', ()=>{
//   orderBlk.style.display = 'block'
//   showBtn.style.display ='none'
// })

const enterOrder = document.getElementById('enterOrder');
const toggleBtn = document.getElementById('toggleBTN');

toggleBtn.addEventListener('click', () => {
  if (enterOrder.style.opacity === '0' || enterOrder.style.opacity === '') {
    enterOrder.style.opacity = '1';
    enterOrder.style.visibility = 'visible';
    enterOrder.style.width = '100%';
    enterOrder.style.height = '100%'    
  } else {
    enterOrder.style.opacity = '0';
    enterOrder.style.visibility = 'hidden';
    enterOrder.style.width = '0';
    enterOrder.style.height = '0';
  }
});

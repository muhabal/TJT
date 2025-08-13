// global elements
const sideMenu = document.querySelector('aside')
const menuBtn = document.querySelector('#menu-btn')
const closeBtn = document.querySelector("#close-btn")
var adminContainer = document.querySelector('.container')

// show siderbar
menuBtn.addEventListener('click', ()=> {
  sideMenu.style.display = 'block'
})

// close sidebar
closeBtn.addEventListener('click', ()=>{
  sideMenu.style.display = 'none';
})

// change theme
themeToggler.addEventListener('click', ()=>{
  themeChange()
  bodyTheme()

  // adjust the theme of th logo
  if (logo.className == 'light'){
    logo.setAttribute('src', "static/icons/tjt_logo_white.png");
    logo.className = 'dark'
    localStorage.setItem('theme', 'dark')
  }else{
    logo.setAttribute('src', "static/icons/tjt_logo_2.png")
    logo.className = 'light'
    if (true){
      localStorage.removeItem('theme')
    }
  }
})

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

// add event listener to add product link on side bar
var add_Product = document.querySelector('.addproductlink')
add_Product.addEventListener('click', ()=>{
  localStorage.setItem('product', 'add')
})

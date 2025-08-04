const sideMenu = document.querySelector('aside')
const menuBtn = document.querySelector('#menu-btn')
const closeBtn = document.querySelector("#close-btn")
var salesCirc = document.getElementById("sales")
var incomeCirc = document.getElementById("income")
var expensesCirc = document.getElementById("expenses")
var salesNum = document.querySelector(".sales .number")
var incomeNum = document.querySelector(".income .number")
var expensesNum = document.querySelector(".expenses .number")

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
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

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
// calculate percentage increase from previous 24hours

// fill orders in table

// change circle according to percentage
let sales_percentage = 81;
let income_percentage = 44;
let expenses_percentage = 62;
let circumference = 226.19;

insightVisual(sales_percentage, salesCirc, salesNum)
insightVisual(income_percentage, incomeCirc, incomeNum)
insightVisual(expenses_percentage, expensesCirc, expensesNum)

function insightVisual(percentage, insight, number){
  // animate percentage
  let counter = 0;
  let interval = 1000/percentage;
  setInterval(() => {
  if(counter == percentage){
    clearInterval()
  }else{
    counter += 1;
    number.innerHTML = counter + "%"
  }
  }, interval)

  // animate circle
  let stroke_dashoffset = circumference - (percentage/100) * circumference;
  insight.animate(
    [
      {strokeDashoffset : circumference }, {strokeDashoffset:stroke_dashoffset}
    ],
      {duration: 1000,
        easing: 'linear',
        fill: "forwards"
      }
  )

}

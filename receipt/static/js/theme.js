const themeToggler = document.querySelector(".theme-toggler")
const logo = document.querySelector(".logo img")
if (localStorage.getItem('theme') === 'dark'){
  themeChange()
  logo.setAttribute('src', "static/icons/tjt_logo_white.png");
  logo.className = 'dark'
}


function themeChange(){
  // document.body.classList.toggle('dark-theme-variables');
  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
}

function bodyTheme(){
  document.documentElement.classList.toggle('dark-theme-variables'); 
}
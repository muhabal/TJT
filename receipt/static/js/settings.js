// get users, groups info from django
const users_js = JSON.parse(document.getElementById('users_js').textContent)

const groups_js = JSON.parse(document.getElementById('groups_js').textContent)

const user_groups = JSON.parse(document.getElementById('user_groups').textContent)

const Groups = {};
for (let key in groups_js){
  const item = groups_js[key];
  Groups[`${item.id}`] = {'id':item.id, 'name':item.name}
  ;
}


const Users = {};
let counter = 0;
for (let key in users_js){
  const item = users_js[key];
  let num_id = Number(item.id) - 1
  Users[`${item.id}`] = {'id':item.id, 'name':item.username, 'email':item.email, 'password':item.password, 'group':user_groups[counter][0].name}
  ;
  counter+=1
}


// get the views for profile edit
var user_EVD = document.querySelector('.userEVD')

// show the content of a setting
var settingTab = document.querySelectorAll('.settings-tab')
settingTab.forEach((setting)=>{
  setting.addEventListener('click', ()=>{
    try{
      activeSetting()
    }catch(err){
    }
    user_EVD.style.display = 'none'
    var child = setting.querySelector('div:nth-child(2)')
    child.classList.toggle('activeSet')
    child.style.display = 'block'
    setTimeout(() => {
      child.style.opacity = '1'
      child.style.maxHeight = '100%'
    }, 0)
  })
})

const activeSetting = ()=>{
  var activeSet = document.querySelector('.activeSet')
  activeSet.style.display = 'none'
  activeSet.style.opacity = '0'
  activeSet.style.maxHeight = '0'
  activeSet.classList.toggle('activeSet')
}


// get the user list
var userList = document.querySelector('.user-list')

// get the user list
var groupList = document.querySelector('.group-list')

// create different views based on what is click
var closebtn = `<div class="close" id="close-btn">
                  <span class="material-symbols-outlined">
                  close</span>
                </div> `

// add event listener to close the profile EVD block
const profileClose = ()=>{
  var profileCloseBtn = user_EVD.querySelector('.close')
  profileCloseBtn.addEventListener('click', ()=>{
  user_EVD.style.display = 'none'
  })
}

// show user EVD
const show =()=>{user_EVD.style.display = 'block'}

// check if user is a superuser
const isSUperUser = JSON.parse(document.getElementById('superuser').textContent)

// add event listener to button
var profileBtn = userList.querySelectorAll('button')

profileBtn.forEach((button)=>{
  button.addEventListener('click', (e)=>{
    e.stopPropagation();
    var userId = button.dataset.userId
    show()
    user_EVD.innerHTML = `
      <div>
        ${closebtn} 
        <div>
          <h3>Name: </h3>
          <input name="name" type ="text" value = ${Users[userId].name}>
        </div>   
        <div>
          <h3>Email: </h3>
          <input name="email" type = "email" value = ${Users[userId].email}>
        </div>
        <div>
          <h3>Password: </h3>
          <input name="password" type='password' value= ${Users[userId].password}>
        </div>
        <div>
          <h3>Group:</h3>
          <select>
          </select>
        </div>
        <input type="hidden" name="action" value="">
        <input type="hidden" name="userId" value="">
        <input name="group" type="hidden" value="">
      </div>
    `
    // if user is a superuser show delete and add user buttons
    isSUperUser ? user_EVD.innerHTML += `
      <div data-button-id = ${userId}>
        <button data-action = 'save' type='submit'>Save</button>
        <button data-action = 'delete'>Delete User</button>
      </div>
    ` : user_EVD.innerHTML += ``
    groupOptions()
    profileClose()
    var select = user_EVD.querySelector('select')
    var options = user_EVD.querySelectorAll('option')
    options.forEach((option)=>{
      if (option.value == Users[userId].group){
        select.value = option.value
      }
    })
    
    if (isSUperUser){
      var btns = user_EVD.querySelectorAll('button')
      btns.forEach((button)=>{
        userEdit(button)
      }) 
    }

  })
})

/// function for selecting group
function groupOptions(){
  var groupOptions = user_EVD.querySelector('select')

  for (let key in Groups){
    groupOptions.innerHTML += `
      <option value="${Groups[key].name}">${Groups[key].name}</option>
    `
  }
}

const userEdit = (button)=>{
  button.addEventListener('click', ()=>{
  var action = button.dataset.action
  var userId = button.parentElement.dataset.buttonId
  var formAction = user_EVD.querySelector('[name="action"]')
  var formId = user_EVD.querySelector('[name="userId"]')
  formId.value = userId 
  if (action == 'save'){
    formAction.value = 'save'
    var formGroup = user_EVD.querySelector('[name="group"]')
    var group = user_EVD.querySelector('select').value
    formGroup.value = group   
  }
  else{
    formAction.value = 'delete'
  }   
  })
}

// add event listener to theme settings
const displaySetting = document.querySelectorAll('.admin-settings div:first-of-type div p')

displaySetting.forEach((theme)=>{
  theme.addEventListener('click', ()=>{
    var action = theme.dataset.action
    var currentTheme;
    try{
      currentTheme = localStorage.getItem('theme');
      if (currentTheme != null){
        if (action != currentTheme){
          localStorage.removeItem('theme')
          logo.setAttribute('src', 'static/icons/tjt_logo_2.png')
          logo.className = 'light'
          themeChange()
          bodyTheme()          
        }else{}
      }else{
        if (action == 'dark'){
          themeChange()
          bodyTheme()
          logo.setAttribute('src', 'static/icons/tjt_logo_white.png');
          logo.className = 'dark'
          localStorage.setItem('theme', 'dark')           
        }
      }
    }catch(err){}
  })
})


// for new users
// add event listener to add user btn

try{
    const addUser = document.getElementById('addUser')
    addUser.addEventListener('click', (e)=>{
      e.stopPropagation();
      show()
      user_EVD.innerHTML = `
        <div>
          ${closebtn}
          <div>
            <h3>Name: </h3>
            <input name="username" autocomplete="off" type='text' placeholder= 'Enter Username'>
          </div>
          <div>
            <h3>Email: </h3>
            <input name="email" autocomplete="off" type='email' placeholder= 'Enter Email'>
          </div>
          <div>
            <h3>Password: </h3>
            <input name = "password1" autocomplete="off" type='password' placeholder= 'Enter Password'>
          </div>
          <div>
            <h3>Re-enter Password: </h3>
            <input name="password2" autocomplete="off" type='password' placeholder= 'Re-enter Password'>
          </div>
          <div>
            <h3>Group: </h3>
            <select>
              <option value='0'>Select Group</option>
            </select>
          <div>
        </div>
        <input type="hidden" name="group" value="">
        <button type='submit'>Create</button>
      `
      groupOptions();
      profileClose();
      newUserBtn();
      
    })
}catch(err){}

const newUserBtn = ()=>{
  var newBtn = user_EVD.querySelector('button')
  newBtn.addEventListener('click', (e)=>{
    var formGroup = user_EVD.querySelector('[name="group"]')
    var group = user_EVD.querySelector('select').value
    formGroup.value = group
    checkParams(e, group)
  })
}

const checkParams = (e, group)=>{
  var name= user_EVD.querySelector('[name="username"]').value
  var password1 = user_EVD.querySelector('[name="password1"]').value
  var password2 = user_EVD.querySelector('[name="password2"]').value
  if (password1 !== password2 || password1 == '' || password2 == ''){
    tjtAlert('Password error, Please ensure matching passwords', adminContainer)
    e.preventDefault();
  } else if(group == '0'){
      tjtAlert('Please select a user group', adminContainer)
      e.preventDefault();
  } else if(name == ''){
    tjtAlert('Please enter a username', adminContainer)
    e.preventDefault();
  }
}



// get user 
const User = JSON.parse(document.getElementById('user').textContent)

// recent updates div
const recent_updates_div = document.querySelector(".recent-updates .updates")
// recent_updates_div.innerHTML = ''

// get the relative time for all updates
const getTimeDiff = (date)=>{
  let time_sent = new Date(date).getTime()
  let now = new Date().getTime()
  if (time_sent < now){
    // in minutes
    let diff = (now - time_sent)/60000
    diff = Math.abs(Math.round(diff))
    // in hours
    let hrDiff = diff/60
    hrDiff = Math.abs(Math.round(hrDiff))
    // in days
    let dayDiff = hrDiff/24
    dayDiff = Math.abs(Math.round(dayDiff))

    if (diff < 60){
      if (diff == '1'){
        return `1 minute ago`
      } else if (diff == '0'){
        return 'now'
      } else{
        return `${diff} minutes ago`
      }
    } else if (diff >= 60 && dayDiff == 0){
        if(hrDiff == '1'){
          return `1 hour ago`
        }else{
          return `${hrDiff} hours ago`
        }
    } else if (dayDiff>0){
        if (dayDiff == '1'){
          return `1 day ago`
        }else{
          return `${dayDiff} days ago`
        }
    }
  }
}

// add event listener to all submit buttons
try{
  const buttons = document.querySelectorAll(`[data-${page}]`)
  buttons.forEach((button)=>{
    var action = button.dataset[page]
    button.addEventListener('click', (e)=>{
      chatSocket.send(JSON.stringify({
        'User': User,
        'page': page,
        'time': new Date(),
        'action':action
      }))
      
    })
  })
}catch(err){}

// update all notifications
const updateNotes = ()=>{
  const notes = document.querySelectorAll('.update')
  notes.forEach((notification)=>{
    const time = notification.dataset.time
    var relativeTime = getTimeDiff(time)
    const timeEl = notification.querySelector('small')
    timeEl.innerHTML = relativeTime
  }) 
}

// change relative time of the updates every minute
setInterval(updateNotes, 60 *1000)

// function to add notification to recent updates
function newNotification(user, page, time, action){
        var note = Note();
        var notification;
        var page_name = page.slice(0, -1)
        if (action == 'edit'){
          notification = `
                <div class="message">
                  <p><b>${user}</b> ${page_name} info was changed</p>
                  <small class="text-muted">now</small>
                </div>`
        }else if (action == 'add'){
          notification = `
                <div class="message">
                  <p><b>${user}</b> new ${page_name} created</p>
                  <small class="text-muted">now</small>
                </div>`
        }else if (action == 'delete'){
          notification = `
                <div class="message">
                  <p><b>${user}</b> ${page_name} was deleted</p>
                  <small class="text-muted">now</small>
                </div>`
        }
        note.innerHTML += notification
        recent_updates_div.insertBefore(note,recent_updates_div.firstChild);
}

// function to send notification for user login and order creation
const customNotification = (user, message)=>{
  var note = Note();
  if (message != "created an order")
    {
      note.innerHTML += `
            <div class="message">
              <p><b>${user}</b> ${user} logged in</p>
              <small class="text-muted">now</small>
            </div>
    `
  }
  else{
    note.innerHTML += `
                <div class="message">
                  <p><b>${user}</b> ${message}</p>
                  <small class="text-muted">now</small>
                </div>
        `
  }
  recent_updates_div.insertBefore(note,recent_updates_div.firstChild);
}

// add relative time to notifications on page load
window.onload = ()=>{
  updateList();
  updateNotes();
}

// function to create update div
const Note = ()=>{
  const note = document.createElement('div')
        note.classList.add('update')
        note.setAttribute('data-time', `${new Date()}`)
        note.innerHTML = `
                  <div class="profile-photo">
                    <img style="border-radius: 50%;" src="static/icons/profile-3.jpg" alt="">
                  </div>`
  return note
}

// keep updates at 5 on the recent updates only

const updateList = ()=>{
  // get all the notifications
  const allUpdates = recent_updates_div.querySelectorAll('.update')
  // first get number of child elements in recent updates
  const noOfchildElements = recent_updates_div.childElementCount
  var listedUpdates = []

  // add all updates to the list 
  allUpdates.forEach((update)=>{
    listedUpdates.push(update.outerHTML)
  })

  let initial_no;

  recent_updates_div.innerHTML = '';
  if (noOfchildElements>= 5){
    initial_no = 5
  }else{
    initial_no = noOfchildElements
  }
  for (var i = 0; i<initial_no; i++){
    recent_updates_div.innerHTML += listedUpdates[i]
  }
}
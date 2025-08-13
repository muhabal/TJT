// get user 
const User = JSON.parse(document.getElementById('user').textContent)

// recent updates div
const recent_updates_div = document.querySelector(".recent-updates .updates")
// recent_updates_div.innerHTML = ''


const getTimeDiff = (date)=>{
  let time_sent = new Date(date).getTime()
  let now = new Date().getTime()
  if (time_sent < now){
    // in minutes
    let diff = (now - time_sent)/60000
    if (diff < 60){
      if (Math.abs(Math.round(diff)) == '1'){
        return `1 minute ago`
      }else{
        return `${Math.abs(Math.round(diff))} minutes ago`
      }
    } else if (diff > 60 && diff < (diff/60)/24 ){
      diff = diff/60
      return `${Math.abs(Math.round(diff))} hours ago`
    } else if (diff > (diff/60)/24){
      diff = (diff/60)/24
      return `${Math.abs(Math.round(diff))} days ago`
    }
  }
}

// add event listener to all submit buttons
try{
  const buttons = document.querySelectorAll(`[data-${page}]`)
  buttons.forEach((button)=>{
    var action = button.dataset[page]
    button.addEventListener('click', (e)=>{
      e.preventDefault()
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
// const updateNotes = ()=>{
//   const notes = document.querySelectorAll('.update')
//   notes.forEach((notification)=>{
//     const time = notification.dataset.time
//     var relativeTime = getTimeDiff(time)
//     const timeEl = notification.querySelector('small')
//     timeEl.innerHTML = relativeTime
//   }) 
// }

// setInterval(updateNotes, 60 *1000)

function newNotification(user, page, time, action){
  const note = document.createElement('div')
        note.classList.add('update')
        note.setAttribute('data-time', `${new Date()}`)
        note.innerHTML = `
                  <div class="profile-photo">
                    <img style="border-radius: 50%;" src="static/icons/tjt_logo.png" alt="">
                  </div>`
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

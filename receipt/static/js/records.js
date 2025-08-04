// get table body
var records_table = document.querySelector('.records_list tbody')
// get the number ofrows
let no_of_rows = records_table.rows.length
var rows = []

// add all rows to a list
records_table.querySelectorAll('tr').forEach((tr)=>{
  rows.push(tr.innerHTML)
})

let initial_no;
// append the number of rows specified by initial rows into the dom
records_table.innerHTML = '';
if (no_of_rows >= 5){
  initial_no = 5;
}else{
  initial_no = no_of_rows;
}
for (var i = 0; i<initial_no; i++){
  records_table.innerHTML += rows[i]
}

// configure show less and show more buttons
var showLessBtn = document.getElementById('showLessBtn');
var showAllBtn = document.getElementById('showAllBtn')
showAllBtn.addEventListener('click', (btn)=>{
  records_table.innerHTML = '';
  for (var i = 0; i<no_of_rows; i++){
    records_table.innerHTML += rows[i]
  }
  showAllBtn.style.display = 'none'
  showLessBtn.style.display = 'block'
})

showLessBtn.addEventListener('click', (btn)=>{
  showAllBtn.style.display = 'block'
  showLessBtn.style.display = 'none'
  records_table.innerHTML = '';
  for (var i = 0; i<initial_no; i++){
    records_table.innerHTML += rows[i]
  }
})

// function isHTMLElement(obj) {
//   return obj instanceof Element;
// }

// add event listener to download button
var download = document.querySelector('main .download')
var downloadRange = document.querySelector('.download-range')
download.addEventListener('click', ()=>{
  downloadRange.style.display = 'block'
})
var selectDate = downloadRange.querySelector('.select-date')

// add event listener to close the download range
var rangeCloseBtn = downloadRange.querySelector('.close')
rangeCloseBtn.addEventListener('click', ()=>{
  downloadRange.style.display = 'none'
}) 

// add event listner to download range download btn

var downloadFrm = document.getElementById('rangeForm')
var allCheck = document.getElementById('all')
var preDbCheck = document.getElementById('db')
var atr = document.getElementById('atr')
var pdb = document.getElementById('pdb')
const startDate = selectDate.querySelector('div:first-child input')
const endDate = selectDate.querySelector('[name="end"]')
downloadFrm.addEventListener('submit', (e)=>{
  // get the dates
  var start = startDate.value
  var end = endDate.value
  // check if admin wants all pre db records
  if (allCheck.checked){
    atr.value = 'all';
    startDate.value = '2025-07-20'
    endDate.value = '2025-07-20'
  }else{
    atr.value = 'range'
    if (preDbCheck.checked){
      pdb.value = 'predb'
    }else{
      pdb.value = 'postdb'
    }
    compareDates(start,end,e);    
  }
})

const compareDates = (d1, d2, e) => {
   if (d1 == '' || d2 == ''){
    tjtAlert('Please select a range', adminContainer)
    e.preventDefault()
  }else{
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    let date3 = new Date().getTime();
    if (date1 > date2){
      tjtAlert('Start Date must be less than end date', adminContainer)
      e.preventDefault()
    } else if(date1 > date3 || date2 > date3){
      tjtAlert('out of range', adminContainer)
      e.preventDefault()
    } 
    else{
      // downloadSheet()
    }    
  }
}


// const downloadSheet = (e)=>{
//   // console.log($(".edit_order form").html())
//   // e.preventDefault();
//   $.ajax({
//     type: 'POST',
//     url: '/records',
//     data:{
//       start: $('[name = "start"]').val(),
//       end: $('[name = "end"]').val(),
//       csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
//     },
//     success: (response)=>{
//       response
//     }
//   })
// }
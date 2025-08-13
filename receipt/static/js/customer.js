
// get client info from django
const django_clients = JSON.parse(document.getElementById('clients').textContent)
console.log(django_clients)

// parse the info to match the table row ids
const Clients = {};
for (let key in django_clients){
  const item = django_clients[key];
  Clients[`${item.id}`] = {'name':item.name, 'address':item.address, 'phone':item.mobile_no}
  ;
}

var customer_details = document.querySelector('.customer_details')
var edit_block = document.querySelector('.edit_detail')
var delete_block = document.querySelector('.delete-detail')
var addNewCustomer = document.querySelector('.add-new-customer')
// add event listener for edit and delete options
var detail_option = document.querySelectorAll('.detail-options p')
detail_option.forEach((option)=>{
  var action = option.dataset.action;
  option.addEventListener('click', (e)=>{
    const parent = option.parentElement.parentElement.dataset
    var client = Clients[parent.customerId]
    // remove details options
    activeDetail();
    customer_details.style.display = 'block'

    // add event listener to close the customer details block
    var customerCloseBtn = customer_details.querySelector('.close')
    customerCloseBtn.addEventListener('click', ()=>{
      closeCustomerDetails();
    }) 

    if (action == 'edit'){
      // set delete block to display none and show edit block
      edit_block.style.display = 'block'
      delete_block.style.display = 'none'
      addNewCustomer.style.display = 'none'

      // set the values to be same as the client's details
      edit_block.querySelector('[name = "name"]').value = client.name
      edit_block.querySelector('[name = "address"]').value = client.address
      edit_block.querySelector('[name = "phone"]').value = client.phone
      edit_block.querySelector('[name = "id"]').value = parent.customerId
    }else{
      // set edit block to display none and show delete block
      edit_block.style.display = 'none'     
      addNewCustomer.style.display = 'none'    
      delete_block.style.display = 'block'
      delete_block.querySelector('[name = "id"]').value = parent.customerId
      
      // set the delete to display a query
      delete_block.querySelector('h3').innerHTML = `Are you sure you want to delete customer ${client.name}'s details from the database?`

      //add event listener to record the answer
      var answerBtn = delete_block.querySelectorAll('button')
      answerBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          if (btn.dataset.action == 'yes'){
            // document.querySelector(`#client-${parent.customerId}`).remove()
          }else{}
          closeCustomerDetails();
        })
      })
    }
    e.stopPropagation();
  })  
})

// add event listener to close the customer details block
var customerCloseBtn = customer_details.querySelector('.close')
customerCloseBtn.addEventListener('click', ()=>{
  customer_details.style.display = 'none'
}) 

// event listener for displaying form to add new customer
const newCustomer = document.querySelector('.add-customer')
newCustomer.addEventListener( 'click',()=>{
  edit_block.style.display = 'none'
  delete_block.style.display = 'none'
  customer_details.style.display = 'block'
  addNewCustomer.style.display ='block'
})

// function to close customer details 
function closeCustomerDetails(){
  customer_details.style.display = 'none'
}

const checkCustomerParams = (name, phone, e)=>{
  if (name == '' || phone == ""){
    tjtAlert("Empty input detected, ensure to provide name and phone", adminContainer)
    e.preventDefault();
  }
}

var submitBtns = customer_details.querySelectorAll('input')
submitBtns.forEach((btn)=>{
  if (btn.type == "submit"){
    var action = btn.dataset.type
    btn.addEventListener('click', (e)=>{
      if (action == 'edit'){
        var name = edit_block.querySelector('[name = "name"]').value
        var phone = edit_block.querySelector('[name = "phone"]').value        
      }else{
        var name = addNewCustomer.querySelector('[name = "name"]').value
        var phone = addNewCustomer.querySelector('[name = "phone"]').value  
      }
      checkCustomerParams(name, phone, e)
    })
  }
})

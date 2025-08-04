function genInvoice(button){
  const client_name = document.querySelector('[name="name"]').value
  const state = document.querySelector('[name = "state"]').value
  const phone = document.querySelector('[name = "phone"]').value
  const address = document.querySelector('[name = "address"]').value
  const city = document.querySelector('[name = "city"]').value
  checkParams(client_name,state,phone,address,city);
}

function checkParams(client_name,state,phone,address,city){
  if (delivery_method === undefined){
  alert('Please Select delivery method')
  }else{
    if (delivery_method == "delivery"){
      if (address == ''){
        alert('missing client detail')
      } else if (client_name == ''){
        alert('missing client detail')
      } else if (state == ''){
        alert('missing client detail')
      } else if (phone == ''){
        alert('missing client detail')
      } else if (city == ''){
        alert('missing client detail')
      } else{
        insertVals(client_name,state,phone,address,city)
      }        
    }else if (delivery_method == "pick-up"){
      if (client_name == ''){
        alert('missing client detail')
      } else if (phone == ''){
        alert('missing client detail')
      } else{
        insertVals(client_name,state,phone,address,city)
      }
    }      
  }
}

function insertVals(client_name,state,phone,address,city){

  //display the toggle button
  const toggleBtn = document.getElementById("toggleBtn")
  toggleBtn.style.display = 'initial'

  //get the invoice and show content
  var invoice = document.querySelector(".invoice")
  invoice.classList.add('show');
  
  //get discount percentage and insert to DOM
  const percentage_discount = Number(discount)*100

  //get points of insertion on the invoice
  const applied_discount_invoice = document.querySelector(".applied-discount")
  const address_invoice = document.querySelector(".address")
  const phone_invoice = document.querySelector(".mobile-phone")
  const name_invoice = document.querySelector(".client-name")
  const total_invoice = document.querySelector(".cost-value")
  const discount_total_invoice = document.querySelector(".discounted-value")
  const date_invoice = document.querySelector(".date")
  const delivery_invoice = document.querySelector(".delivery-cost")
  const delivery_text_invoice = document.querySelector("#delivery_fee")
  let invoice_row = document.querySelector(".invoice-row")
  invoice_row.innerHTML = '';

  //get the date 
  var today = new Date()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today = `${today.getUTCDate()} ${months[today.getUTCMonth()]}, ${today.getUTCFullYear()}`

  //insert value in the DOM
  if (delivery_method == "delivery"){
    address_invoice.innerHTML = `${address}, ${city}, ${state}`
  }

  console.log(delivery_fee)

  if (delivery_fee == ''){
    delivery_text_invoice.innerHTML = ''
    delivery_invoice.innerHTML = ''
  }
  else if(delivery_fee === undefined){}
  else{
    delivery_text_invoice.innerHTML = 'DELIVERY FEE:'
    delivery_invoice.innerHTML = delivery_fee
  }
  
  name_invoice.innerHTML = `To: ${client_name}`
  phone_invoice.innerHTML = phone
  total_invoice.innerHTML = `₦${order_sum}`
  date_invoice.innerHTML = today;
  

  if (discount != "0.00"){
    applied_discount_invoice.innerHTML = `${percentage_discount}% ${String(discount_name).toUpperCase()} DISCOUNT APPLIED`
    discount_total_invoice.innerHTML = `₦${main_total}`
  } else{
    applied_discount_invoice.innerHTML = ''
    discount_total_invoice.innerHTML = ''
  }

  for (let key in summary_list){
    const item = summary_list[key]
    invoice_row.innerHTML += 
      `<tr>              
        <td class="table-content lead-content">${item.product_name}</td>
        <td class="table-content mid-content">${item.quantity}</td>
        <td class="table-content mid-content">${item.unit_price}</td>
        <td class="table-content right-content">${item.total}</td>                
      </tr>`
  }  
}
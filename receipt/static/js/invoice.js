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
  tjtAlert('Please Select delivery method')
  }else{
    if (delivery_method == "delivery"){
      if (address == '' || client_name == '' || state == ''
        || phone == '' || city == ''
      ){tjtAlert('missing client detail')
      } else{
        insertVals(client_name,state,phone,address,city)
      }        
    }else if (delivery_method == "pick-up"){
      if (client_name == '' || phone == ''){
        tjtAlert('missing client detail')
      }else{
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
  // const total_invoice = document.querySelector(".cost-value")
  // const discount_total_invoice = document.querySelector(".discounted-value")
  const date_invoice = document.querySelector(".date")
  // const delivery_invoice = document.querySelector(".delivery-cost")
  // const delivery_text_invoice = document.querySelector("#delivery_fee")
  let invoice_row = document.querySelector(".invoice-row")
  invoice_row.innerHTML = '';

  let total_row = document.querySelector(".total-tab-invoice")
  total_row.innerHTML = '';

  //get the date 
  var today = new Date()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today = `${today.getUTCDate()} ${months[today.getUTCMonth()]}, ${today.getUTCFullYear()}`

  //insert value in the DOM
  if (delivery_method == "delivery"){
    address_invoice.innerHTML = `${address}, ${city}, ${state}`
  }

  if (delivery_fee == ''){
    try{
      document.querySelector('.delivery-row').remove()
    }
    catch(err){
      console.log(delivery_fee)
    }
    
  }
  else if(delivery_fee === undefined){}
  else{
    total_row.innerHTML += 
      `<tr class="delivery-row">
        <td><p class="total-params" id="delivery_fee">DELIVERY FEE (₦):</p></td>
        <td><p class="delivery-cost total-values">${delivery_fee}</p></td>
      `
  }
  
  name_invoice.innerHTML = `To: ${client_name}`
  phone_invoice.innerHTML = phone
  // total_invoice.innerHTML = `₦${order_sum}`
  date_invoice.innerHTML = today;
  
  total_row.innerHTML += 
  `<tr>
    <td><p class="total-params applied-discount">TOTAL (₦): </p></td>
    <td><p class="cost-value total-values">${order_sum}</p></td>
  `
  console.log(total_row)

  if (discount != "0.00"){
    total_row.innerHTML += 
      `<tr class="discount-row">
        <td><p class="total-params applied-discount">${percentage_discount}% ${String(discount_name).toUpperCase()} DISCOUNT APPLIED (₦):</p></td>
        <td><p class="cost-value total-values">${main_total}</p></td>
      `
  } else{
    try{
      document.querySelector('.discount-row').remove()
    }
    catch(err){};
  }

  for (let key in summary_list){
    const item = summary_list[key]
    invoice_row.innerHTML += 
      `<tr>              
        <td class="table-content lead-content"><div class="tab-item item-name">${item.product_name}</div></td>
        <td class="table-content mid-content"><div class="tab-item item-num">${item.quantity}</div></td>
        <td class="table-content mid-content"><div class="tab-item item-num">${item.unit_price}</div></td>
        <td class="table-content right-content"><div class="tab-item item-num">${item.total}</div></td>                
      </tr>`
  }  
}
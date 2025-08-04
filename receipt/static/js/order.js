// get order info from django
const django_orders = JSON.parse(document.getElementById('orders_js').textContent)
console.log(django_orders)

// get total, customers, delivery methods, discounts info from django
const totals = JSON.parse(document.getElementById('total_js').textContent)

const Clients = JSON.parse(document.getElementById('customers_js').textContent)

const client_list = {};
for (let key in Clients){
  const item = Clients[key];
  client_list[`${item.id}`] = {'id':item.id, 'name':item.name, 'mobile_no':item.mobile_no}
  ;
}

const methods = JSON.parse(document.getElementById('delivery_methods_js').textContent)

const method_list = {}
for (let key in methods){
  const item = methods[key];
  method_list[`${item.id}`] = {'id':item.id, 'method':item.method}
  ;
}

const discounts = JSON.parse(document.getElementById('discounts_js').textContent)

const discount_list = {}
for (let key in discounts){
  const item = discounts[key];
  discount_list[`${item.id}`] = {'id':item.id, 'name':item.name, 'percentage':item.percentage}
  ;
}

// parse the info to match the table row ids
const Order_list = {};
let counter = 0;
for (let key in django_orders){
  const item = django_orders[key];
  Order_list[`${item.id}`] = {'orderid':item.order_id, 'discount':discount_list[item.discount_id].name, 'client':client_list[item.client_id].name, 'total':totals[`${counter}`], 'delivery_method':method_list[item.delivery_method_id].method}
  ;
  counter += 1;
}

// initiate edit and delete functionality
var order_option = document.querySelectorAll('.orders_list .detail-options p')
var order_details = document.querySelector('.order_details')
var order_edit_block = document.querySelector('.edit_order')
var order_delete_block = document.querySelector('.delete-order')

order_option.forEach((option)=>{
  var action = option.dataset.action;
  option.addEventListener('click', (e)=>{
    const parent = option.parentElement.parentElement.dataset
    var order = Order_list[parent.orderId]
    // remove details options
    activeDetail();
    order_details.style.display = 'block'

    // add event listener to close the customer details block
    var orderCloseBtn = order_details.querySelector('.close')
    orderCloseBtn.addEventListener('click', ()=>{
      order_details.style.display = 'none'
    }) 
  
    if (action == 'edit'){
      // set delete block to display none and show edit block
      order_edit_block.style.display = 'block'
      order_delete_block.style.display = 'none'
      activeDetail()
      // set the values of discount to be same as in order list
      var discount_select = document.querySelector('[name = "discount"]')
      var client_select = document.querySelector('[name = "client"]')
      var method_select = document.querySelector('[name = "delivery-method"]')
      var status_select = document.querySelector('[name = "status"]')
      var order_total = document.querySelector('[name = "total"]')
      var discount_options = discount_select.querySelectorAll('option')
      var client_options = client_select.querySelectorAll('option')
      var method_options = method_select.querySelectorAll('option')
      var status_options = status_select.querySelectorAll('option')
      discount_options.forEach((discount)=>{
      if (discount.value == order.discount ){
        discount_select.value = discount.value;
        }
      })
      client_options.forEach((client)=>{
      if (client.value == order.client ){
        client_select.value = client.value;
        }
      })
      method_options.forEach((method)=>{
      if (method.value == order.delivery_method ){
        method_select.value = method.value;
        }
      })
      status_options.forEach((status)=>{
      if (status.value == order.status ){
        status_select.value = status.value;
        }
      })
      order_total.innerHTML = order.total
      order_edit_block.querySelector('[name = "id"]').value = parent.orderId
    }else{
      // set edit block to display none and show delete block
      order_edit_block.style.display = 'none'    
      order_delete_block.style.display = 'block'
      order_delete_block.querySelector('[name = "id"]').value = parent.orderId

      // set the delete to display a query
      order_delete_block.querySelector('h3').innerHTML = `Are you sure you want to delete order ${order.orderid} from the database?`

      // add event listener to record the answer
      var answerBtn = order_delete_block.querySelectorAll('button')
      answerBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          if (btn.dataset.action == 'yes'){
            document.querySelector(`#order-${parent.orderId}`).remove()
          }else{}
          order_details.style.display = 'none'
        })
      })
    }
    e.stopPropagation()
  })
})

$(document).on('submit', '#editform', (e)=>{
  // console.log($(".edit_order form").html())
  e.preventDefault();
  console.log($('[name = "delivery-method"]').val())
  $.ajax({
    type: 'POST',
    url: '/orders',
    data:{
      discount: $('[name = "discount"]').val(),
      client: $('[name = "client"]').val(),
      delivery_method: $('[name = "delivery-method"]').val(),
      status:  $('[name = "status"]').val(),
      id: $('#editform [name = "id"]').val(),
      csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
    },
    success: ()=>{
      window.location.href = 'orders'
    }
  })
})
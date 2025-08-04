const order_list = [];
const summary_list = {};
const receipt_button = document.querySelector(".receipt-button")
var item_present = false;
var delivery_method;
var delivery_fee
var discount;
var discount_name;
var order_sum;
var main_total;

function additem(){
  discount = document.querySelector("#select-discount").value;
  //get product name and quantity
  const product_name = document.querySelector('.selected-product').value;
  const quantity = document.querySelector('.quantity-input').value;

  //get discount name
  document.querySelectorAll('.discount-option').forEach(function(option){
    if (option.value == discount){
      option.classList.toggle('discount-selected');
    }
  })
  discount_name =  document.querySelector('.discount-selected').dataset.name

  // check product is already in the summary list
  if (order_list.includes(product_name)){
    alert('This product has already been selected! Please update in the summary!');
  }else{

    // check for empty fields
    if (quantity === ''){
      alert('quantity field is empty');
    }else if (quantity <= 0){
      alert('please select a value greater than 0')
    }else if (product_name ==='0'){
      alert('Select a product!')
    }else if (discount === '0'){
      alert('Select discount')
    }else{

      //get product unit price and product id
      document.querySelectorAll('.product-option').forEach(function(option){
      if (option.value === product_name){
        option.classList.toggle('selected');
        }
      })
      const unit_price = document.querySelector('.selected').dataset.unitPrice;
      const product_id = document.querySelector('.selected').dataset.productId;

      //get total for a particular item
      const item_total_price = Number(unit_price)*Number(quantity);

      //add item to order list
      order_list.push(product_name);

      // create summary unit block
      var div_main = document.createElement('div');
      div_main.classList.add('summary-list', 'new-add-main');
      div_main.setAttribute('data-product-id', product_id);

      // creating name container
      var div_name_container = document.createElement('div');
      div_name_container.className = 'name-container';         

      // creating product name div
      var div_name = document.createElement('div');
      div_name.classList.add('product-summary-name') ;
      div_name.append(product_name);

      // creating img div for delete icon
      var div_delete = document.createElement('div');
      div_delete.classList.add('delete-icon-div');

      // create img element
      var delete_icon = document.createElement('img');
      delete_icon.classList.add('delete-icon');
      delete_icon.setAttribute('data-product-id', product_id);
      delete_icon.setAttribute('src',"static/icons/delete-icon.png");
      delete_icon.setAttribute('onclick', 'deleteItem(this)');

      // append img element into delete div
      div_delete.append(delete_icon);

      //append delete div an name into name container
      div_name_container.append(div_delete);
      div_name_container.append(div_name);

      //creating quantity container
      var div_quantity_container = document.createElement('div');
      div_quantity_container.className = 'quantity-container';

      //creating quantity div
      var div_quantity = document.createElement('div');
      div_quantity.classList.add('product-summary-quantity','new-add-quantity');
      div_quantity.setAttribute('data-product-id', product_id);
      div_quantity.append(quantity);

      //creating add and reduce button
      var div_add = document.createElement('div');
      var div_reduce = document.createElement('div');

      div_add.classList.add('add-item-quantity');
      div_add.setAttribute('data-product-id', product_id);
      div_add.setAttribute('onclick', 'updateSummary(this)');
      div_add.setAttribute('data-action', 'add')

      //////////////////////////////////////
      div_reduce.classList.add('reduce-item-quantity');
      div_reduce.setAttribute('data-product-id', product_id);
      div_reduce.setAttribute('onclick', 'updateSummary(this)');
      div_reduce.setAttribute('data-action', 'reduce')       
      ////////////////////////////////////

      div_add.append('+');
      div_reduce.append('-');

      // buttons container
      var div_button_container = document.createElement('div');
      div_button_container.className = 'button-container';
      div_button_container.append(div_add);
      div_button_container.append(div_reduce);

      //append quanity and button container to quantity container

      div_quantity_container.append(div_quantity);
      div_quantity_container.append(div_button_container);

      //create unit price and item total price divs

      var div_unit_price = document.createElement('div');
      div_unit_price.classList.add('product-price');
      div_unit_price.setAttribute('data-product-id', product_id);
      div_unit_price.append(unit_price);

      var div_item_total = document.createElement('div');
      div_item_total.classList.add('item-price-total','new-add-total');
      div_item_total.setAttribute('data-product-id', product_id);
      div_item_total.append(item_total_price);

      // append divs to the main list div
      div_main.append(div_name_container);
      div_main.append(div_quantity_container);
      div_main.append(div_unit_price);
      div_main.append(div_item_total);

      //append div main in to summary div
      document.querySelector('.summary').appendChild(div_main);

      //show the receipt button
      showButton()

      // assing all the properties of the product to an object
      const productid = {
        product_name: product_name,
        quantity: quantity,
        unit_price: unit_price,
        total: item_total_price,
        product_id: product_id,
        html : {
          quantity: document.querySelector('.new-add-quantity'),
          total: document.querySelector('.new-add-total'),
          main: document.querySelector('.new-add-main'),
        } 
      };

      // add the object to the summary list
      summary_list[`${product_id}`] = productid;

      //get order and insert order Total
      orderTotal(discount);

      // remove selected class and new add class from product class list and product name class respectively
      document.querySelector('.selected').classList.remove('selected');
      document.querySelector('.discount-selected').classList.remove('discount-selected');
      document.querySelector('.new-add-quantity').classList.remove('new-add-quantity');
      document.querySelector('.new-add-total').classList.remove('new-add-total');
      document.querySelector('.new-add-main').classList.remove('new-add-main');
    }
  } 
}

function orderTotal(discount){
  var order_total = []
  for (const id in summary_list){
    order_total.push(Number(summary_list[id]['total']))
  }
  order_sum = order_total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //get delivery if being delivered and delivery fee has been paid
  // delivery_fee = document.querySelector('[name="delivery"]').value
  // console.log(delivery_fee)
  // var fee;
  // if (delivery_method == 'shipping'){
  //   if(delivery_fee != ''){
  //     fee = Number(delivery_fee)
  //   }
  // }
  //check for discounts and delivery_fee
  if (discount != "0.00"){
    const total_with_discount = order_sum - Number(discount)*order_sum
    main_total = total_with_discount;
  }else{
    main_total = order_sum
  }

  // if(typeof(fee)=='number'){
  //   main_total += fee
  // } 
  //set the total order value to the total div
  document.querySelector('.order-total-value').innerHTML = main_total
}

function updateSummary(button){
  //set global variables
  const product_id = button.dataset.productId;
  const discount = document.querySelector("#select-discount").value;

  // get the quantity, total item price and unit price of product from summary list
  const quantity = summary_list[`${product_id}`]['quantity'];
  const unit_price = summary_list[`${product_id}`]['unit_price'];

  // set some global variables
  let quantity_el_value = Number(quantity);
  let unit_price_int = Number(unit_price);
  var quantity_el = summary_list[`${product_id}`]['html']['quantity'];
  var total_el = summary_list[`${product_id}`]['html']['total'];
  
  let change = 1;
  
  // add or reduce the quantity
  console.log(button.dataset.action);
  if (button.dataset.action == 'add'){
    let result = quantity_el_value + change;
    // change the value in the object
    summary_list[`${product_id}`]['quantity'] = result;
    // change the value of the quantity
    quantity_el.innerHTML = result;  

    // calculate new item total price
    let total = item_price_total(unit_price_int,result)
    // change the value in the object
    summary_list[`${product_id}`]['total'] = total;
    // change the value of the total item price
    total_el.innerHTML = total;
  }

  else if (button.dataset.action == 'reduce'){
    if (quantity_el_value != 1){
      let result = quantity_el_value - change;
      // change the value in the object
      summary_list[`${product_id}`]['quantity'] = result;
      // change the value of the quantity
      quantity_el.innerHTML = result;  

      // calculate new item total price
      let total = item_price_total(unit_price_int,result);
      // change the value in the object
      summary_list[`${product_id}`]['total'] = total;
      // change the value of the total item price
      total_el.innerHTML = total;
    } 
    else{
      alert('click the bin icon to delete product from list')
    }
  }    
  
  // get and insert order total
  orderTotal(discount)
}

function deleteItem(button){
  //set global variables
  const product_id = button.dataset.productId;
  const discount = document.querySelector("#select-discount").value;

  // get the summary list block of the particular product id
  var main = summary_list[`${product_id}`]['html']['main']
  
  // remove product block from summary list
  main.classList.add('remove');
  main.remove();

  //find index of product in orderlist
  let index = order_list.indexOf(summary_list[`${product_id}`]['product_name']);
  order_list.splice(index, 1);
  console.log(order_list);

  //delete product block from summary list object
  delete summary_list[`${product_id}`]

  // get and insert order total
  orderTotal(discount)

  //remove receipt button if order list is empty
  hideButton();
}

function showButton() {
  if (item_present === false){
    item_present = true;
    receipt_button.classList.toggle('show')
  }
}

function hideButton() {
  //check if order list is empty
  if (order_list.length === 0){
    //set item_present to false
    item_present = false
    //hide the receipt button
    receipt_button.classList.remove('show')
  }
}

function item_price_total(x,y){
  let total = x * y;

  return total
}

function delivery(radio){
  delivery_method =  radio.value
  document.querySelector(".shipping").classList.add("show")
  console.log(delivery_method)

  var delivery_fee_el = document.querySelector(".delivery-fee")
  console.log(delivery_fee)
  if (delivery_method == "delivery"){
    delivery_fee_el.classList.add("show")
  }else{
    if (delivery_fee_el.classList.contains("show")){
      if (delivery_fee==''){}
      else if(delivery_fee === undefined){}
      else if(state == "1"){
        state = 0
        includeFee.checked = false;
        main_total -= Number(delivery_fee);
        order_sum -= Number(delivery_fee);
        document.querySelector('.order-total-value').innerHTML = main_total;
      }
      document.getElementById("delivery-fee-input").value = ''
      delivery_fee_el.classList.remove("show")
      delivery_fee = ''
    }
  }
}

var includeFee = document.getElementById("addFee")
var state = includeFee.dataset.state
includeFee.addEventListener( 'click' ,(event) =>{
  delivery_fee = document.querySelector('[name="delivery"]').value
  if(state == '0'){
    if (delivery_fee != ''){
      main_total += Number(delivery_fee)
      order_sum += Number(delivery_fee)
      state = '1'
    } else{
      alert("Please insert a delivery fee in order to use this function")
      event.preventDefault();
    }
  }else{
    main_total -= Number(delivery_fee)
    order_sum -= Number(delivery_fee)
    state = '0' 
    delivery_fee = ''
  }
  document.querySelector('.order-total-value').innerHTML = main_total
})


function discountChange(){
  if (order_list=='0'){}
  else{
    discount = document.querySelector("#select-discount").value;
    orderTotal(discount)
    document.querySelectorAll('.discount-option').forEach(function(option){
    if (option.value == discount){
      discount_name = option.dataset.name;
    }
    })
  }
}
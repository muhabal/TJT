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
let list_num;

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
    tjtAlert('This product has already been selected! Please update in the summary!');
  }else{

    // check for empty fields
    if (quantity === ''){
      tjtAlert('quantity field is empty');
    }else if (quantity <= 0){
      tjtAlert('please select a value greater than 0')
    }else if (product_name ==='0'){
      tjtAlert('Select a product!')
    }else if (discount === '0'){
      tjtAlert('Select discount')
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

      // create new div for summary item
      // get the summary-tab for each colum
      var summary_num = document.querySelector('.porder');
      var summary_name = document.querySelector('.pname');
      var summary_quantity = document.querySelector('.pquantity');
      var summary_price = document.querySelector('.puprice');
      var summary_total = document.querySelector('.ptotal');

      // get the list number for the new item
      // if (list_num === undefined){
      //   list_num = 1;
      // }else{
      //   list_num += 1;
      // }

      // create a new list number div
      var div_list_num = document.createElement('div');
      div_list_num.classList.add('item', 'num');
      div_list_num.setAttribute('data-product-id', product_id);
      // set the list number to the div
      // div_list_num.append(list_num);

      // create summary name div
      var div_summary_name = document.createElement('div');
      div_summary_name.classList.add('item', 'new-add-name');
      div_summary_name.setAttribute('data-product-id', product_id);
      // set the product name to the div
      div_summary_name.append(product_name);

      // create summary quantity div
      var div_summary_quantity = document.createElement('div');
      div_summary_quantity.classList.add('item', 'quantity-tab');
      div_summary_quantity.setAttribute('data-product-id', product_id);

      //creating quantity span
      var quantity_span = document.createElement('span');
      quantity_span.classList.add('product-summary-quantity', 'new-add-quantity');
      quantity_span.setAttribute('data-product-id', product_id);
      // set the quantity to the span
      quantity_span.append(quantity);

      //creating add and reduce button
      var p_add = document.createElement('p');
      var p_reduce = document.createElement('p');

      p_add.classList.add('add-item-quantity');
      p_add.setAttribute('data-product-id', product_id);
      p_add.setAttribute('onclick', 'updateSummary(this)');
      p_add.setAttribute('data-action', 'add')

      //////////////////////////////////////
      p_reduce.classList.add('reduce-item-quantity');
      p_reduce.setAttribute('data-product-id', product_id);
      p_reduce.setAttribute('onclick', 'updateSummary(this)');
      p_reduce.setAttribute('data-action', 'reduce')       
      ///////////////////////////////////
      p_add.append('+');
      p_reduce.append('-');

      //create a div for the buttons
      var div_button_container = document.createElement('div');
      div_button_container.className = 'quantity-update';
      div_button_container.append(p_add);
      div_button_container.append(p_reduce);

      div_summary_quantity.append(quantity_span);
      // append the button container to the summary quantity div
      div_summary_quantity.append(div_button_container);

      // create summary unit price div
      var div_summary_price = document.createElement('div');
      div_summary_price.classList.add('item', 'new-add-price');
      div_summary_price.setAttribute('data-product-id', product_id);
      // set the unit price to the div
      div_summary_price.append(unit_price);

      // create summary total price div
      var div_summary_total = document.createElement('div');
      div_summary_total.classList.add('item', 'total-tab');
      div_summary_total.setAttribute('data-product-id', product_id);

      var total_span = document.createElement('span');
      total_span.classList.add('item-price-total', 'new-add-total');
      total_span.setAttribute('data-product-id', product_id);
      // set the item total price to the span
      total_span.append(item_total_price);

      //create div for delete icon
      var div_delete_icon = document.createElement('div');
      div_delete_icon.classList.add('trash-icon');
      div_delete_icon.setAttribute('data-product-id', product_id);

      // create img element for delete icon
      var delete_icon = document.createElement('img');
      delete_icon.classList.add('trash-image');
      delete_icon.setAttribute('src', "static/icons/icons8-trash-can-50.png");
      delete_icon.setAttribute('data-product-id', product_id);
      // set the onclick attribute to deleteItem function
      delete_icon.setAttribute('onclick', 'deleteItem(this)');

      // add the delete icon to the div
      div_delete_icon.append(delete_icon);

      // set the total span to the summary total div
      div_summary_total.append(total_span);
      // append the delete icon to the summary total div
      div_summary_total.append(div_delete_icon);

      //SET all divs to the summary tab
      summary_num.append(div_list_num);
      summary_name.append(div_summary_name);
      summary_quantity.append(div_summary_quantity);
      summary_price.append(div_summary_price);
      summary_total.append(div_summary_total);

      // add index num
      adjustIndex();


      // var div_main = document.createElement('div');
      // div_main.classList.add('summary-list', 'new-add-main');
      // div_main.setAttribute('data-product-id', product_id);

      // creating name container
      // var div_name_container = document.createElement('div');
      // div_name_container.className = 'name-container';         

      // creating product name div
      // var div_name = document.createElement('div');
      // div_name.classList.add('product-summary-name') ;
      // div_name.append(product_name);

      // creating img div for delete icon
      // var div_delete = document.createElement('div');
      // div_delete.classList.add('delete-icon-div');

      // create img element
      // var delete_icon = document.createElement('img');
      // delete_icon.classList.add('delete-icon');
      // delete_icon.setAttribute('data-product-id', product_id);
      // delete_icon.setAttribute('src',"static/icons/delete-icon.png");
      // delete_icon.setAttribute('onclick', 'deleteItem(this)');

      // append img element into delete div
      // div_delete.append(delete_icon);

      //append delete div an name into name container
      // div_name_container.append(div_delete);
      // div_name_container.append(div_name);

      //creating quantity container
      // var div_quantity_container = document.createElement('div');
      // div_quantity_container.className = 'quantity-container';

      //creating quantity div
      // var div_quantity = document.createElement('div');
      // div_quantity.classList.add('product-summary-quantity','new-add-quantity');
      // div_quantity.setAttribute('data-product-id', product_id);
      // div_quantity.append(quantity);

      //creating add and reduce button
      // var div_add = document.createElement('div');
      // var div_reduce = document.createElement('div');

      // div_add.classList.add('add-item-quantity');
      // div_add.setAttribute('data-product-id', product_id);
      // div_add.setAttribute('onclick', 'updateSummary(this)');
      // div_add.setAttribute('data-action', 'add')

      //////////////////////////////////////
      // div_reduce.classList.add('reduce-item-quantity');
      // div_reduce.setAttribute('data-product-id', product_id);
      // div_reduce.setAttribute('onclick', 'updateSummary(this)');
      // div_reduce.setAttribute('data-action', 'reduce')       
      ////////////////////////////////////

      // div_add.append('+');
      // div_reduce.append('-');

      // buttons container
      // var div_button_container = document.createElement('div');
      // div_button_container.className = 'button-container';
      // div_button_container.append(div_add);
      // div_button_container.append(div_reduce);

      //append quanity and button container to quantity container

      // div_quantity_container.append(div_quantity);
      // div_quantity_container.append(div_button_container);

      //create unit price and item total price divs

      // var div_unit_price = document.createElement('div');
      // div_unit_price.classList.add('product-price');
      // div_unit_price.setAttribute('data-product-id', product_id);
      // div_unit_price.append(unit_price);

      // var div_item_total = document.createElement('div');
      // div_item_total.classList.add('item-price-total','new-add-total');
      // div_item_total.setAttribute('data-product-id', product_id);
      // div_item_total.append(item_total_price);

      // append divs to the main list div
      // div_main.append(div_name_container);
      // div_main.append(div_quantity_container);
      // div_main.append(div_unit_price);
      // div_main.append(div_item_total);

      //append div main in to summary div
      // document.querySelector('.summary').appendChild(div_main);

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
          total_div: document.querySelector('.new-add-total').parentElement,
          quantity_div: document.querySelector('.new-add-quantity').parentElement,
          name_div: document.querySelector('.new-add-name'),
          price_div: document.querySelector('.new-add-price'),
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
      document.querySelector('.new-add-name').classList.remove('new-add-name');
      document.querySelector('.new-add-price').classList.remove('new-add-price');
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
      tjtAlert('click the bin icon to delete product from list')
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
  var name_el = summary_list[`${product_id}`]['html']['name_div'];
  var quanity_div_el = summary_list[`${product_id}`]['html']['quantity_div'];
  var total_div_el = summary_list[`${product_id}`]['html']['total_div'];
  var price_div_el = summary_list[`${product_id}`]['html']['price_div'];
  
  // remove product block from summary list
  // main.classList.add('remove');
  name_el.classList.add('remove');
  quanity_div_el.classList.add('remove');
  total_div_el.classList.add('remove');
  price_div_el.classList.add('remove');
  name_el.remove();
  quanity_div_el.remove(); 
  total_div_el.remove();
  price_div_el.remove();
  // main.remove();

  // get the S/N of the product summary and remove it
  var num_el = document.querySelectorAll('.num');
  // find the index of the product id in the num_el NodeList
  let num_index = Array.from(num_el).findIndex(num => num.dataset.productId === product_id);
  // remove the num element at the index
  if (num_index !== -1) {
    num_el[num_index].remove();
  }

  //find index of product in orderlist
  let index = order_list.indexOf(summary_list[`${product_id}`]['product_name']);
  order_list.splice(index, 1);
  console.log(order_list);

  //delete product block from summary list object
  delete summary_list[`${product_id}`]

  //adjust the index of the summary
  adjustIndex();

  // if (order_list.length != '0'){
  //   var num_list = [];
  //   let num_items = order_list.length;
  //   let startCount = 1;
    
  //   while(startCount<=num_items){
  //     num_list.push(startCount)
  //     startCount += 1
  //   }
  //   // console.log(num_list)
  //   let startList = 0;
  //   document.querySelectorAll('.num').forEach((num)=> {
  //     num.innerHTML = num_list[startList]
  //     startList += 1
  //   })    
  // }

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

function adjustIndex() {
  // get all the num elements
  let num_elements = document.querySelectorAll('.num');
  // loop through each num element and update its innerHTML
  num_elements.forEach((num, index) => {
    num.innerHTML = index + 1; // update to new index
  });
}

function hideButton() {
  //check if order list is empty
  if (order_list.length === 0){
    //set list num to undefined
    list_num = undefined
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
  document.querySelector(".delivery-info-container").classList.add("show")
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
      tjtAlert("Please insert a delivery fee in order to use this function")
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
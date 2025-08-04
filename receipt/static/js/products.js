// get client info from django
const django_products = JSON.parse(document.getElementById('products_js').textContent)
console.log(django_products)

const sales = JSON.parse(document.getElementById('sales_js').textContent)

// parse the info to match the table row ids
const Products = {};
let counter = 0;
for (let key in django_products){
  const item = django_products[key];
  Products[`${item.id}`] = {'name':item.name, 'price':item.price, 'sales':sales[`${counter}`]}
  ;
  counter +=1;
}

// add event listener for edit and delete options
var product_option = document.querySelectorAll('.products_list .detail-options p')
var product_details = document.querySelector('.product_details')
var product_edit_block = document.querySelector('.edit_product')
var product_delete_block = document.querySelector('.delete-product')
var addNewProduct = document.querySelector('.add-new-product')
product_option.forEach((option)=>{
  var action = option.dataset.action;
  option.addEventListener('click', (e)=>{
    const parent = option.parentElement.parentElement.dataset
    var product = Products[parent.productId]
    // remove details options
    product_details.style.display = 'block'

    activeDetail();
    if (action == 'edit'){
      // set delete block to display none and show edit block
      product_edit_block.style.display = 'block'
      product_delete_block.style.display = 'none'
      addNewProduct.style.display = 'none'

      // set the values to be same as the product's details
      product_edit_block.querySelector('[name = "product"]').value = product.name
      product_edit_block.querySelector('[name = "unit-price"]').value = product.price
      product_edit_block.querySelector('.edit-inputs div div').innerHTML = product.sales
      product_edit_block.querySelector('[name="id"]').value = parent.productId
    }else{
      // set edit block to display none and show delete block
      product_edit_block.style.display = 'none' 
      addNewProduct.style.display = 'none'    
      product_delete_block.style.display = 'block'
      product_delete_block.querySelector('[name="id"]').value = parent.productId
      
      // set the delete to display a query
      product_delete_block.querySelector('h3').innerHTML = `Are you sure you want to delete ${product.name} from the database?`

      //add event listener to record the answer
      var answerBtn = product_delete_block.querySelectorAll('button')
      answerBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          if (btn.dataset.action == 'yes'){
            document.querySelector(`#product-${parent.productId}`).remove()
          }else{}
          product_details.style.display = 'none'
        })
      })
    }
    e.stopPropagation();
  })  
})

// add event listener to close the product details block
var productCloseBtn = product_details.querySelector('.close')
productCloseBtn.addEventListener('click', ()=>{
  product_details.style.display = 'none'
}) 

// event listener for displaying form to add new product
const newProduct = document.querySelector('.add-product-main')
newProduct.addEventListener( 'click',()=>{
  product_edit_block.style.display = 'none'
  product_delete_block.style.display = 'none'
  product_details.style.display = 'block'
  addNewProduct.style.display ='block'
})

// check if the add product was the link click to come to this page

window.onload = ()=>{
  if (localStorage.getItem('product') === 'add'){
    product_details.style.display = 'block'
    addNewProduct.style.display ='block'
    localStorage.removeItem('product')
    window.location.href = '#newProduct'
  }
}
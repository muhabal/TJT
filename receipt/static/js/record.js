//get the confirmation elements from the DOM
const showAlertButton = document.getElementById("record-order");
const customAlert = document.getElementById("payment-confirm-alert");
const confirmBtn = document.getElementById("confirm");
const denyBtn = document.getElementById("deny");

//show the alert
showAlertButton.addEventListener('click', function(){
  console.log(customAlert.style.display)
  customAlert.style.display = 'flex'
})

//remove alert
confirmBtn.addEventListener('click', function(){
  customAlert.style.display = 'none';
})

denyBtn.addEventListener('click', function(){
  customAlert.style.display = 'none'
})

const order_id = JSON.parse(document.getElementById('order_id').textContent);
$('#confirm').on('click',
  function submitOrder(){       
    console.log(discount)  
    $.ajax({
      type: 'POST',
      url: '/invoice/logOrder',
      data:{
        address:$('[name = "address"]').val(),
        city:$('[name = "city"]').val(),
        name:$('[name = "name"]').val(),
        state:$('[name = "state"]').val(),
        phone:$('[name = "phone"]').val(),
        delivery_fee:$('[name = delivery]').val(),
        discount: discount,
        delivery_method: delivery_method,
        order_id: order_id,
        products: JSON.stringify(summary_list),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()      
      },
      success: function(response){
        console.log(response);
        alert('Order Recorded');
        window.location.reload();
      }
    })  
  }    
)


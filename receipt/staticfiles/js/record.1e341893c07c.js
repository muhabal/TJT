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


from django.shortcuts import render, redirect
from .models import * 
from django.http import *
import json
import uuid
from django.contrib import auth, messages
import datetime
from tjtAdmin.utils import jsTime, customNotificationSend
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group, User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from tjtAdmin.models import Notifications

# Create your views here.

@login_required(login_url= 'signin')
def invoice(request):
  products = Product.objects.all()
  discounts = Discount.objects.all()
  admin = request.user.groups.filter(name='Admin').exists()
  context = {
    'products' : products,
    'discounts': discounts,
    'order_id' : str(uuid.uuid4()),
    'admin': admin
  }
  return render(request, 'invoice.html', context)

def logOrder(request):
  if request.method == 'POST':
    client_name = request.POST['name']
    address = request.POST['address']
    state = request.POST['state']
    city = request.POST['city']
    phone = request.POST['phone']
    order_id = request.POST['order_id']
    discount = request.POST['discount']
    delivery_method = request.POST['delivery_method']
    delivery_fee = request.POST['delivery_fee']
    products = request.POST['products']

    get_products = json.loads(products)
    applied_discount = Discount.objects.get(percentage=discount)
    delivery = Delivery.objects.get(method = delivery_method)
    check_client = DeliveryAddress.objects.filter(name = client_name, mobile_no = phone)
    
    if check_client.exists():
      if delivery_method == "delivery":
        client_details = check_client.update(address = address, state = state, city = city)        
    else:
      if delivery_method == "delivery":
        client_details = DeliveryAddress.objects.create(name = client_name, address = address, state = state, city = city, mobile_no = phone)
      else:
        client_details = DeliveryAddress.objects.create(name = client_name, mobile_no = phone)
    client_details = DeliveryAddress.objects.get(name = client_name, mobile_no = phone)

    if delivery_fee != '':
      order = Order.objects.create(order_id = order_id, complete = True, client = client_details , discount=applied_discount, delivery_method = delivery, delivery_fee = delivery_fee, date = datetime.date.today())
    else:
      order = Order.objects.create(order_id = order_id, complete = True, client = client_details, discount=applied_discount, delivery_method = delivery, date = datetime.date.today())

    print(get_products)

    for key, item in get_products.items():
      product_name = item['product_name']
      unit_price = item['unit_price']
      quantity = item['quantity'] 
      total = item['total']
    
      product = Product.objects.get(name = product_name)
      order_item = OrderItem.objects.create(order=order,  product = product, quantity = quantity)  

    # sending notification
    message = "created an order"
    customNotificationSend(request.user.username,message)
    time = jsTime()

    Notifications.objects.create(user = request.user.username, time=time, action = f"{message}").save()

    return HttpResponse('all good')
  
def receipt(request, pk):
  order_id = pk
  order = Order.objects.get(order_id = order_id)
  orderItems = order.orderitem_set.all()
  client_details = DeliveryAddress.objects.get(order=order)
  Invoice_no = order.order_id[0:13]
  context = {
    'order': order,
    'orderList' : orderItems,
    'invoice_no' : Invoice_no,
    'client_details': client_details
  }
  return render(request, 'receipt.html', context)
  
def signin(request):
  if request.user.is_authenticated:
    return redirect('/')
  else:
    if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']

      user = auth.authenticate(username=username, password=password)

      if user is not None:
        auth.login(request, user)
        if request.user.groups.filter(name='Admin').exists() != False:
          # send notification of user sign in
          customNotificationSend(user, "signed in")
          # save notification
          time = jsTime()
          Notifications.objects.create(user = user.username, action = "signed in", time = time).save()

          return redirect('/')
        else:
          return redirect('/invoice')
      else:
        messages.info(request, 'Invalid Credentials')
        return redirect ('signin')
    else:
      return render(request, 'signin.html')






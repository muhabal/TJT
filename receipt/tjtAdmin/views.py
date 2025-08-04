from django.shortcuts import render, redirect
from django.http import *
from django.contrib.auth.decorators import login_required
from invoice.models import *
from django.contrib import auth
import json
from datetime import datetime
from .excel import *
from django.contrib.auth.models import User, Group
from .decorators import *

# Create your views here.
@login_required(login_url= 'signin')
@unauthenticated_user
def index(request):
  print(request.method)
  return render(request, 'index.html')

@login_required(login_url='signin')
@unauthenticated_user
def products(request):
  print(request.method)
  if request.method == 'POST':
    if request.POST.get('new', False):
      name = request.POST['name']
      price = request.POST['price']
      new_product = Product.objects.create(name = name, price = price)
      new_product.save()
    else:
      id = request.POST['id']
      product = Product.objects.get(id = id)
      if request.POST.get('delete', False):
        product.delete()
      else:
        name = request.POST['product']
        price = request.POST['unit-price']
        product.name = name
        product.price = price
        product.save()
    return redirect('products')
  
  products = Product.objects.all()
  sales = []
  for product in products:
    sales.append(product.get_total_sales)
  context = {
    'products':products,
    'products_js': list(products.values()),
    'sales_js': sales,
  }
  return render(request, 'products.html', context)

@login_required(login_url='signin')
@unauthenticated_user
def customers(request):
  print(request.method)
  if request.method == 'POST':
    if request.POST.get('new', False):
      name = request.POST['name']
      address = request.POST['address']
      mobile_no = request.POST['phone']
      new_customer = DeliveryAddress.objects.create(name = name, address=address, mobile_no = mobile_no)
      new_customer.save()
    else:
      id= request.POST['id']
      customer_info = DeliveryAddress.objects.get(id = id)
      if request.POST.get('delete', False):
        customer_info.delete()
      else:
        name = request.POST['name']
        address = request.POST['address']
        mobile_no = request.POST['phone']
        customer_info.name = name
        customer_info.address = address
        customer_info.mobile_no = mobile_no
        customer_info.save()
    return redirect('customers')

  customers = DeliveryAddress.objects.all()
  context = {
    'customers': customers,
    'clients': list(customers.values())
  }
  return render(request, 'customers.html', context)

@login_required(login_url='signin')
@unauthenticated_user
def records(request):
  orders = Order.objects.all()

  # get information to be inserted in the excel sheet
  if request.method == 'POST':
    start_date = request.POST['start']
    end_date = request.POST['end']
    atr = request.POST['atr']
    pdb = request.POST['pdb']

    print(start_date)
    print(end_date)
    # get orders which were carried out within the date range
    orders_list = []
    if start_date == end_date:
      for order in orders:
        if order.date.date() == convertDate(start_date):
          orders_list.append(order)
    else:
      for order in orders:
        if order.date.date() >= convertDate(start_date) and order.date.date() <= convertDate(end_date):
          orders_list.append(order)
    
    # get the order items for each order
    order_items = []
    for order in orders_list:
      orderitem = order.orderitem_set.all()
      for item in orderitem:
        order_items.append(item)

    # check if admin want all time records or include the ranged data with predb data
    # process the excel file
    if atr == 'all':
      items = OrderItem.objects.all()
      stream = allTime(items)
    else:
      if pdb == 'predb':
        stream = preDB(order_items)
      else:
        stream = xlsx(order_items)    

    #return downloadable file
    response = HttpResponse(stream, content_type = "application/vnd.openxmlformats-officedocument.spreadsheet.sheet")
    response['Content-Disposition'] = 'attachment; filename="tjt_records.xlsx"'
    return response
    # return HttpResponse('ok')
  else:
    print(request.method)
    orderItems = OrderItem.objects.all()
    context = {
      'orderItems': orderItems,
    }
    return render(request, 'records.html', context)

@login_required(login_url='signin')
@unauthenticated_user
def orders(request):
  if request.method == 'POST':
    if request.POST.get('delete', False):
      id = request.POST['id']
      order = Order.objects.get(id = id)
      order.delete()
      return redirect('orders')
    else:
      print(request.method)
      id = request.POST['id']
      discount = request.POST['discount']
      client = request.POST['client']
      delivery_method = request.POST['delivery_method']
      status = request.POST['status']
      method = Delivery.objects.get(method = delivery_method)
      customer = DeliveryAddress.objects.get(name = client)
      applied_discount = Discount.objects.get(name = discount)
      order_search = Order.objects.filter(id = id)
      order_search.update(discount = applied_discount, client=customer, delivery_method = method)
      print(id,discount,client,delivery_method,status)
      return JsonResponse('ok',safe=False)
  else:
    customers = DeliveryAddress.objects.all()
    methods = Delivery.objects.all()
    discounts = Discount.objects.all()
    orders = Order.objects.all()
    total_list = []
    for order in orders:
      total_list.append(order.get_total_with_discount)
    context = {
      'orders': orders,
      'customers': customers,
      'delivery_methods': methods,
      'discounts': discounts,
      'delivery_methods_js':list(methods.values()),
      'discounts_js':list(discounts.values()),
      'customers_js':list(customers.values()),
      'orders_js': list(orders.values()),
      'total_js':total_list,
    }
    return render(request, 'orders.html', context)
  
@login_required(login_url='signin')
@unauthenticated_user
def setting(request):
  # create new user
  if request.method == 'POST':
    try:
      if request.POST['action'] == 'save':
        id, name, email, password, group = handlePost(request)
        auth_user = User.objects.filter(id = id)
        auth_user.update(username = name, password=password, email=email)
        user = User.objects.get(username = name)
        updated_group = Group.objects.get(name = group)
        users_groups = user.groups.all()
        for group in users_groups:
          if group.name != group:
            user.groups.remove(Group.objects.get(name = group))
        user.groups.add(updated_group)
      else:
        id, name, email, password, group = handlePost(request)
        auth_user = User.objects.get(id = id)
        auth_user.delete()
    
    except:
      name = request.POST['username']
      email = request.POST['email']
      group = request.POST['group']
      password1 = request.POST['password1']
      password2 = request.POST['password2']
      if group!= 'Staff':
        auth_user = User.objects.create_user(username = name, password = password1, email = email, is_staff = True)
      else:
        auth_user = User.objects.create_user(username = name, password = password1, email = email)

      auth_user.save()
      # add new user to a group
      auth_user.groups.add(Group.objects.get(name=group))

      print(auth_user.groups.all())
    
    return redirect('settings')

  groups = Group.objects.all()
  users = User.objects.all()
  user_groups = []
  for user in users:
    user_groups.append(list(user.groups.all().values()))
  context = {
    'groups': groups,
    'users': User.objects.all(),
    'users_js': list(users.values()),
    'user_groups': (user_groups),
    'groups_js': list(groups.values()),
  }
  return render(request, 'settings.html', context)

@login_required(login_url='signin')
@unauthenticated_user
def expenses(request):
  return render(request, 'expenses.html')

@login_required(login_url='signin')
def logout(request):
  auth.logout(request)
  return redirect ('signin')

def convertDate(date_string):
  format_code = "%Y-%m-%d"
  date_object = datetime.strptime(date_string, format_code)
  date = date_object.date()
  return date

def handlePost(request):
  id = request.POST['userId']
  name = request.POST['name']
  email = request.POST['email']
  password = request.POST['password']
  group = request.POST['group']

  return id,name,email,password,group
from django.db import models
import uuid


# Create your models here.

class Product(models.Model):
  name = models.CharField(max_length=50, null=True, blank=True)
  price = models.IntegerField(null=True, blank=True)
  
  def __str__(self):
    return self.name
  
  @property
  def get_total_sales(self):
    orderitems = self.orderitem_set.all()
    total = sum([item.quantity for item in orderitems])
    return total
  
# class Invoice_No(models.Model):
#   invoice_no = models.UUIDField(primary_key = True, default = uuid.uuid4)

#   def __str__(self):
#     return self.invoice_no
  


class Discount(models.Model):
  name = models.CharField(max_length= 100, null=True, blank=True)
  percentage = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)

  def __str__ (self):
    return (f"{self.name} discount({self.percentage*100}% off)")
  
class Delivery(models.Model):
  method = models.CharField(max_length=20)

  def __str__(self):
    return self.method
  
class DeliveryAddress(models.Model):
  name = models.CharField(max_length=100, null=True, blank=True)
  city = models.CharField(max_length=100, default= 'Abuja', null=True, blank=True)
  address = models.CharField(max_length=100, null=True, blank=True)
  mobile_no = models.CharField(max_length=100, null=True, blank=True)
  state = models.CharField(max_length=100, null=True, blank=True)

  def __str__(self):
    return self.name

class Order(models.Model):
  order_id = models.CharField(max_length=200)
  discount = models.ForeignKey(Discount, on_delete=models.SET_NULL, null=True, blank=True)
  client = models.ForeignKey(DeliveryAddress, on_delete=models.SET_NULL, null=True, blank=True)
  date = models.DateTimeField(blank= True, null = True, auto_now_add=True)
  delivery_method = models.ForeignKey(Delivery, on_delete=models.SET_NULL, null=True, blank= True)
  delivery_fee = models.IntegerField(blank=True, null=True)
  complete = models.BooleanField(default=False)

  def __str__(self):
    return str(self.id)
  
  
  @property
  def get_total_items(self):
    orderitems = self.orderitem_set.all()
    total = sum([item.quantity for item in orderitems])
    return total
  
  @property
  def get_order_total(self):
    orderitems = self.orderitem_set.all()
    total = sum([item.get_total for item in orderitems])
    return total

  @property
  def get_total_with_discount(self):
    discount = self.discount.percentage
    order_total = self.get_order_total
    total = order_total - ( order_total * discount)
    return int(total)
  
  @property
  def total_with_delivery(self):
    delivery_fee = self.delivery_fee
    order_total = self.get_total_with_discount
    total = delivery_fee + order_total
    return int(total)

class OrderItem(models.Model):
  product = models.ForeignKey(Product,  on_delete = models.CASCADE, null=True, blank=True)
  order = models.ForeignKey(Order, on_delete = models.CASCADE, null=True, blank=True)
  quantity = models.IntegerField(default=0)

  def __str__(self):
    return (f"{self.product.name}-{self.order.order_id}")

  @property
  def get_total(self):
    total = self.product.price * self.quantity
    return total
  


  
  

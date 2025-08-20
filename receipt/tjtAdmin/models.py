from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Expenses(models.Model):
  name = models.CharField(max_length=100, blank=True, null=True)
  cost = models.IntegerField(blank=True, null=True)
  unit = models.CharField(max_length=15, null=True, blank=True)
  quantity = models.IntegerField(null=True, blank=True)
  date = models.DateField(null=True, blank=True, auto_now_add=True)

  def __str__(self):
    return f'{self.name} {self.quantity} {self.unit}s'

class Notifications(models.Model):
  user = models.CharField(max_length=20)
  time = models.CharField(max_length=100)
  page = models.CharField(max_length=20, blank=True, null=True)
  action = models.CharField(max_length=20, default='')

  def __str__(self):
    return self.time
  
class FCMDevice(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  token = models.CharField(max_length=25)

  def __str__(self):
    return self.token
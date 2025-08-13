from datetime import datetime
from .models import Notifications

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

def getNotifications():
  try:
    notifications = Notifications.objects.all().reverse()
    
  except: return
  return
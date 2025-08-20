from datetime import datetime
from .models import Notifications
from datetime import datetime, timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from firebase_admin import messaging
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

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
    notifications = Notifications.objects.all().order_by('-id')
    return notifications
  except: 
    return


def jsTime():
    now = datetime.now(timezone.utc)
    time = now.isoformat(timespec='milliseconds').replace("+00:00", "Z")

    return time

def customNotificationSend(user, message):
  channel_layer = get_channel_layer()
  async_to_sync(channel_layer.group_send)(
      'notifications',{
      "type":"custom_note",
      "user":f"{user}",
      "message": f"{message}"
    }
  )

def send_notification(token, title, body, image_url = None):
  data = {
    "title":title,
    "body":body,
    "icon": "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
  }

  if image_url:
    data["image"] = image_url

  message = messaging.Message(data=data, token=token)
  response = messaging.send(message)
  print("Data message sent", response)


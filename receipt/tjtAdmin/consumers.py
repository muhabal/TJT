import json
from channels.generic.websocket import  AsyncWebsocketConsumer,WebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Notifications
from .utils import send_notification

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_group_name = 'notifications'
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )
    await self.accept()

  async def receive(self, text_data):
    text_data_json = json.loads(text_data)
    username= text_data_json['User']
    page= text_data_json['page']
    action= text_data_json['action']
    time= text_data_json['time']

    # save to database
    await self.save_notification(username, time, page, action)

    # send message to admin
    
    await self.channel_layer.group_send(
      self.room_group_name,
      {
        "type":'notification',
        'User':username,
        'action': action,
        'time': time,
        'page': page        
      }
    )

  async def notification(self, event):
    User = event['User']
    action = event['action']
    time = event['time']
    page = event['page']
    await self.send(text_data=json.dumps({
        'User':User,
        'action': action,
        'time': time,
        'page': page    
    }))

  async def custom_note(self,event):
    print("connected")
    await self.send(text_data = json.dumps({
      "user": event['user'],
      "message": event['message']
    }))

  @sync_to_async
  def save_notification(self, user, time, page, action):
    Notifications.objects.create(user=user, time = time, page = page, action = action).save()
  
  # send push notifications
  

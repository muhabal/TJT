from django.urls import path
from . import views


urlpatterns = [
    path('', views.invoice, name='invoice'),
    path('signin', views.signin, name = 'signin'),
    path('logOrder', views.logOrder, name = 'logOrder' ),
    path('receipt/<str:pk>', views.receipt, name= 'receipt')
]

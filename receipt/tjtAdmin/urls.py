from django.urls import path
from . import views

urlpatterns = [
    path('', views.index , name='admin' ),
    path('products', views.products, name='products'),
    path('records', views.records, name='records'),
    path('customers', views.customers, name='customers'),
    path('settings', views.setting, name='settings'),
    path('orders', views.orders, name='orders'),
    path('expenses', views.expenses, name='expenses'),
    path('logout', views.logout, name='logout'),
    path('save-fcm-token/', views.SaveFCMToken.as_view(), name="save-fcm-token"),
]

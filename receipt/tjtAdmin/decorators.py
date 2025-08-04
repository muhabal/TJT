from django.http import HttpResponse
from django.shortcuts import redirect


def unauthenticated_user(view_func):
  def wrapper_func(request, *args, **kwargs):
    if request.user.groups.filter(name='Admin').exists() != False:
      return view_func(request, *args, **kwargs)
    else:
      return redirect('/invoice')
  
  return wrapper_func
from django.http import request
from django.http import HttpRequest

class UserIpMiddleware:
  def __init__(self, get_response):
    self.get_response = get_response

  def __call__(self, request:HttpRequest):
    # Get user IP from request headers
    user_ip = request.META.get('REMOTE_ADDR')
    # Attach user IP to the request object
    request.user_ip = user_ip
    response = self.get_response(request)
    return response

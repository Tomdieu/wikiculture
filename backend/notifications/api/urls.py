from django.urls import  path

from rest_framework.routers import  DefaultRouter

from .views import  NotificationViewSet

router = DefaultRouter()

router.register('notifications',NotificationViewSet,basename="notification")

urlpatterns = [

]

urlpatterns += router.urls
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import UserViewSet,LoginViewSet,RegisterViewSet,CheckUserNameView

router = DefaultRouter()
router.register('users',UserViewSet,basename='users')
router.register('login',LoginViewSet,basename='login')
router.register("register",RegisterViewSet,basename="register")

urlpatterns = [
    path('check_username/<username>/',CheckUserNameView.as_view())
]

urlpatterns += router.urls
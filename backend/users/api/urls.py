from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import UserViewSet,LoginViewSet,RegisterViewSet,CheckUserNameView,PasswordResetView,VerifyCodeView,ResetPasswordView,ModeratorViewSet

router = DefaultRouter()
router.register('users',UserViewSet,basename='users')
router.register('login',LoginViewSet,basename='login')
router.register("moderator",ModeratorViewSet,basename="moderator")
router.register("register",RegisterViewSet,basename="register")


urlpatterns = [
    path('check_username/<username>/',CheckUserNameView.as_view()),
    path('forgot-password/',PasswordResetView.as_view()),
    path("verif-code/<int:code>/",VerifyCodeView.as_view()),
    path("reset-passsword/",ResetPasswordView.as_view())
]

urlpatterns += router.urls
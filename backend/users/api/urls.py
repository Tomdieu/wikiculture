from rest_framework.routers import DefaultRouter

from .views import UserViewSet,LoginViewSet,RegisterViewSet

router = DefaultRouter()
router.register('users',UserViewSet,basename='users')
router.register('login',LoginViewSet,basename='login')
router.register("register",RegisterViewSet,basename="register")

urlpatterns = router.urls
from rest_framework.routers import DefaultRouter

from .views import UserViewSet,LoginViewSet

router = DefaultRouter()
router.register('users',UserViewSet,basename='users')
router.register('login',LoginViewSet,basename='login')

urlpatterns = router.urls
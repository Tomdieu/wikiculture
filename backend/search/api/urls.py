from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("articles",views.SearchDocumentViewSet,basename="articles")



urlpatterns = [
    path('search/<str:query>/',views.SearchArticleView.as_view(),name='search'),
] 

urlpatterns += router.urls

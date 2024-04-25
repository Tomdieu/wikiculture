from django.urls import path
from . import views


urlpatterns = [
    path('search/<str:query>/',views.SearchArticleView.as_view(),name='search'),
] 

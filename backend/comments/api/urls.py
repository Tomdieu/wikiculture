from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('comments',views.CommentViewSet,basename="comments")
# router.register("articles-comment",views.ArticleCommentsViewSet,basename="article comments")

urlpatterns = [
    path('articles-comment/<int:article_id>',views.ArticleCommentsViewSet.as_view())
]

urlpatterns += router.urls


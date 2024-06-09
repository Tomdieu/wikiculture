from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from .models import User, Article, Category, Event,ReadingTime,ArticleVistors,CulturalArea,Region,Village,ArticleLike,UserArticleInteraction


# Register your models here.

class ReadOnlyAdmin(admin.ModelAdmin):

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False

@admin.register(ArticleVistors)
class ArticleVistorsAdmin(ReadOnlyAdmin):
    list_display = ['article','ip_address','user_agent','date']
    list_filter = ['article','date','user_agent']


@admin.register(ArticleLike)
class ArticleLikeAdmin(ReadOnlyAdmin):
    list_display = ['article','user','ip_address','user_agent','created_at']
    list_filter = ['article','user','ip_address','created_at']
    
@admin.register(CulturalArea)
class CulturalAreaAdmin(admin.ModelAdmin):

    list_display = ['id','name','description']
    search_fields = ['name','description']

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):

    list_display = ['id','name','description','cultural_area']
    search_fields = ['name','description']

@admin.register(Village)
class VillageAdmin(admin.ModelAdmin):
    list_display = ['id','name','description','region','cultural_area']
    search_fields = ['name','description']
    
    list_filter = ['region','region__cultural_area']

    @admin.display
    def cultural_area(self,obj:Village):
        return obj.region.cultural_area


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'event_type', 'data']
    search_fields = ['event_type']

    def has_add_permission(self, request):
        return False


@admin.register(User)
class UserAdmin(ReadOnlyAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'user_type', 'date_joined')
    list_filter = ('user_type', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)


@admin.register(Article)
class ArticleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    readonly_fields = ['slug','updated','approved']

    list_display = ('title', 'slug',  'author', 'created_at', 'updated_at')
    list_filter = ('categories', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'content')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(ReadingTime)
class ReadingTimeAdmin(admin.ModelAdmin):
    
    list_display = ('id','user','article','total_time_spent')
    search_fields = ('user__username','article__title')
    ordering = ('article__title','user__username')


@admin.register(UserArticleInteraction)
class UserArticleInteractionAdmin(admin.ModelAdmin):

    list_display = ('user', 'article', 'timestamp', 'interaction_type', )
    
from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from .models import User, Article, Category, Event,ReadingTime


# Register your models here.

class ReadOnlyAdmin(admin.ModelAdmin):

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False


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

    list_display = ('title', 'slug', 'status', 'author', 'created_at', 'updated_at')
    list_filter = ('status', 'categories', 'author', 'created_at', 'updated_at')
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
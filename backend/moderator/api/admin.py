from django.contrib import admin

from .models import Article,User,ModerationRecord

# Register your models here.

class ReadOnlyAdmin(admin.ModelAdmin):

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False

@admin.register(User)
class UserAdmin(ReadOnlyAdmin):
    
    list_display = ('username', 'first_name', 'last_name', 'email', 'user_type', 'date_joined')
    list_filter = ('user_type', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)
    
@admin.register(Article)
class ArticleAdmin(ReadOnlyAdmin):
    
    list_display = ['id',"title","content"]
    search_fields = ['title','content']
    
@admin.register(ModerationRecord)
class ModerationRecordAdmin(admin.ModelAdmin):
    
    list_display = ['id','user','article','decision','timestamp']
    list_filter = ['decision']
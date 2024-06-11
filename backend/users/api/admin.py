from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from .models import Event,LoginHistory
# Register your models here.

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    
    fieldsets = (
        (None, {"fields": ("username","user_type", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username","email","user_type", "password1", "password2"),
            },
        ),
    )
    list_display = ("username", "email", "first_name", "last_name", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups","user_type")
    search_fields = ("username", "first_name", "last_name", "email")

admin.site.register(User,UserAdmin)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    
    list_display = ['id','event_type','timestamp','data']
    list_filter = ['event_type','timestamp']
    search_fields = ['event_type','timestamp']

@admin.register(LoginHistory)
class LoginHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'ip_address', 'user_agent','browser_info', 'timestamp')
    search_fields = ('user__username', 'ip_address', 'user_agent')
    list_filter = ('timestamp',)
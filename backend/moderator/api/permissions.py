from rest_framework.permissions import BasePermission

class IsModerator(BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.user_type == 'Moderator')
    
class IsAdmin(BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.user_type == 'Admin')
    
class IsModeratorOrAdmin(BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and (request.user.user_type == 'Moderator' or request.user.user_type == 'Admin'))
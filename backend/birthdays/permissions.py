from rest_framework import permissions

class IsOwner(permissions.IsAuthenticated):
    """
    Custom permission to only allow owners of an object to edit or view it. 
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

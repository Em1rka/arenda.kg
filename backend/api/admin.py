# api/admin.py или где у тебя модели

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Equipment, Booking, Payment, Review, Document  # импортируй свои модели

class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['phone', 'name', 'role', 'is_active']
    search_fields = ['phone', 'name']
    fieldsets = (
        (None, {'fields': ('phone', 'password')}),
        ('Personal Info', {'fields': ('name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'name', 'role', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )
    model = User

admin.site.register(User, UserAdmin)
admin.site.register(Equipment)
admin.site.register(Booking)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(Document)

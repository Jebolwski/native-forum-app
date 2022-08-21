from django.contrib import admin
from .models import * 
from mptt.admin import DraggableMPTTAdmin

admin.site.register(Form)
admin.site.register(
    FormAnswer,
    DraggableMPTTAdmin,
    list_display=(
        'tree_actions',
        'indented_title',
    ),
)
admin.site.register(Profile)
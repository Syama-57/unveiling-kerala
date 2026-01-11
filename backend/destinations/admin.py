from django.contrib import admin
from .models import Story


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "district",
        "category",
        "source",
        "created_at",
    )
    list_filter = ("district", "category", "source")
    search_fields = ("title", "short_description")
    prepopulated_fields = {"slug": ("title",)}

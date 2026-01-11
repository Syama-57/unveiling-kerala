from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Story


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["id", "username", "password"]

    def create(self, validated_data):
        user = User(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class StorySerializer(serializers.ModelSerializer):
    short = serializers.CharField(source="short_description")
    submitted_by_username = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = [
            "id",
            "title",
            "slug",
            "short",
            "full_story",
            "category",
            "district",
            "image",
            "source",
            "is_approved",
            "submitted_by_username",
            "created_at",
        ]

    def get_submitted_by_username(self, obj):
        return obj.submitted_by.username if obj.submitted_by else None

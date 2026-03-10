from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Story


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )


class StorySerializer(serializers.ModelSerializer):
    short = serializers.CharField(source="short_description", required=True)
    submitted_by_username = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = [
            "id",
            "title",
            "slug",
            "short",
            "full_story",
            "latitude",
            "longitude",
            "category",
            "district",
            "image",
            "source",
            "is_approved",
            "submitted_by_username",
            "created_at",
        ]
        read_only_fields = [
            "slug",
            "source",
            "is_approved",
            "submitted_by_username",
            "created_at",
        ]

    def get_submitted_by_username(self, obj):
        if obj.submitted_by:
            return obj.submitted_by.username
        return None
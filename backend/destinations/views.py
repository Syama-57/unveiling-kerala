from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Story
from .serializers import UserSerializer, StorySerializer


# ----------------------
# SIGNUP
# ----------------------
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# ----------------------
# LOGIN
# ----------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    user = authenticate(
        username=request.data.get("username"),
        password=request.data.get("password"),
    )

    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username,
    })


# ----------------------
# ALL STORIES (PUBLIC)
# ----------------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_stories(request):
    stories = Story.objects.filter(is_approved=True)
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)


# ----------------------
# STORY DETAIL (SLUG)
# ----------------------
class StoryDetailBySlugView(generics.RetrieveAPIView):
    queryset = Story.objects.filter(is_approved=True)
    serializer_class = StorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


# ----------------------
# SUBMIT STORY (AUTH)
# ----------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_story(request):
    serializer = StorySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(
            submitted_by=request.user,
            source="user",
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------------
# USER STORIES
# ----------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_stories(request):
    stories = Story.objects.filter(submitted_by=request.user)
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)


# ----------------------
# UPDATE / DELETE STORY
# ----------------------
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def manage_story(request, pk):
    try:
        story = Story.objects.get(pk=pk, submitted_by=request.user)
    except Story.DoesNotExist:
        return Response({"error": "Not found or unauthorized"}, status=404)

    if request.method == "GET":
        return Response(StorySerializer(story).data)

    if request.method == "PUT":
        serializer = StorySerializer(story, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    story.delete()
    return Response({"message": "Deleted successfully"}, status=204)

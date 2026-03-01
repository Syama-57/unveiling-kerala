from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Story
from .serializers import UserSerializer, StorySerializer
from .models import Story, Bookmark # Add Bookmark here
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


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

@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_stories(request):
    stories = Story.objects.filter(is_approved=True)
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)

class StoryDetailBySlugView(generics.RetrieveAPIView):
    queryset = Story.objects.filter(is_approved=True)
    serializer_class = StorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


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



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_stories(request):
    stories = Story.objects.filter(submitted_by=request.user)
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)

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
@api_view(["GET"])
@permission_classes([AllowAny])
def map_legends_view(request):
    # This specifically grabs stories for the map
    category = request.query_params.get('category', None)
    stories = Story.objects.filter(is_approved=True)
    
    if category:
        stories = stories.filter(category=category)
        
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def toggle_bookmark(request, story_id):
    try:
        story = Story.objects.get(id=story_id)
        if request.method == "GET":
            is_saved = Bookmark.objects.filter(user=request.user, story=story).exists()
            return Response({"bookmarked": is_saved})
            
        # POST logic remains the same
        bookmark, created = Bookmark.objects.get_or_create(user=request.user, story=story)
        if not created:
            bookmark.delete()
            return Response({"bookmarked": False})
        return Response({"bookmarked": True})
    except Story.DoesNotExist:
        return Response({"error": "Story not found"}, status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_bookmarks(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    # Extract the stories from the bookmarks
    stories = [b.story for b in bookmarks]
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)

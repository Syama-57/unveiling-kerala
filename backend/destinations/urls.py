from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import (
    SignupView,
    login_view,
    get_all_stories,
    StoryDetailBySlugView,
    submit_story,
    my_stories,
    manage_story,
)

urlpatterns = [
    # Prefix 'api/' is provided by the main project urls.py
    path("signup/", SignupView.as_view()),
    path("login/", login_view),

    path("stories/", get_all_stories),
    path("stories/<slug:slug>/", StoryDetailBySlugView.as_view()),

    path("my-stories/", my_stories),
    path("stories-manage/<int:pk>/", manage_story),
    path("submit/", submit_story),
    path('map-legends/', views.map_legends_view),
    
    path('bookmark/<int:story_id>/', views.toggle_bookmark, name='toggle-bookmark'),
    path('my-bookmarks/', views.get_my_bookmarks, name='my-bookmarks'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
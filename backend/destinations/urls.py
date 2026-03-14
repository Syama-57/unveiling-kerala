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
    # Wrap these in an 'api/' prefix to match your React 'api.js'
    path("api/signup/", SignupView.as_view()),
    path("api/login/", login_view),

    path("api/stories/", get_all_stories),
    path("api/stories/<slug:slug>/", StoryDetailBySlugView.as_view()),

    path("api/my-stories/", my_stories),
    path("api/stories-manage/<int:pk>/", manage_story),
    path("api/submit/", submit_story),
    path("api/map-legends/", views.map_legends_view),
    
    path("api/bookmark/<int:story_id>/", views.toggle_bookmark, name='toggle-bookmark'),
    path("api/my-bookmarks/", views.get_my_bookmarks, name='my-bookmarks'),
]
# This is CRUCIAL for viewing images locally and on Render (with WhiteNoise)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
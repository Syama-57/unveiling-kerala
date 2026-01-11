from django.urls import path
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
    path("signup/", SignupView.as_view()),
    path("login/", login_view),

    path("stories/", get_all_stories),
    path("stories/<slug:slug>/", StoryDetailBySlugView.as_view()),

    path("my-stories/", my_stories),
    path("stories-manage/<int:pk>/", manage_story),
    path("submit/", submit_story),
]

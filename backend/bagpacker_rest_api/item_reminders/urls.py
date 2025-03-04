from django.urls import path
from .views import RegisterView, Home, CreateDescriptionView, DescriptionListView, UserListView

urlpatterns = [
    path("", Home.as_view()),
    path("userlist/", UserListView.as_view()),
    path("register/", RegisterView.as_view()),
    path("description/create/", CreateDescriptionView.as_view()),
    path("description/list/",DescriptionListView.as_view())
]
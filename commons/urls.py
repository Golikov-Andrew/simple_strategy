from django.urls import path

from commons.views.auth import LoginUser, profile, RegisterUser, logout_user
from commons.views.commons import index

urlpatterns = [
    path('', index, name='homepage'),

    path('login/', LoginUser.as_view(), name='login'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('profile/', profile, name='profile'),
    path('logout/', logout_user, name='logout')
]

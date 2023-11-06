from django.urls import path

from simple_strategy.views import single_play_page

urlpatterns = [
    path('single_play_page/', single_play_page, name='single_player_page')

]

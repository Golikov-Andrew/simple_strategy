from django.urls import path

from simple_strategy.views import single_play_page, create_game_page, play_game

urlpatterns = [
    path('single_play_page/', single_play_page, name='single_player_page'),
    path('create_game/', create_game_page, name='create_game'),
    path('play_game/<int:pk>/', play_game, name='play_game')

]

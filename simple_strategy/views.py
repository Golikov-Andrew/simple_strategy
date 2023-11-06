from django.shortcuts import render, redirect

# Create your views here.
from simple_strategy.forms.game import AddGameForm
from simple_strategy.models.game import Game


def single_play_page(request, **kwargs):
    kwargs.update({'games': Game.objects.all()})
    return render(request, 'simple_strategy/single_play_page.html', kwargs)


def create_game_page(request, **kwargs):
    if request.method == 'POST':
        form = AddGameForm(request.POST)
        form.instance.owner = request.user

        if form.is_valid():
            form.save()
            return redirect('single_player_page')

    form = AddGameForm()
    kwargs.update({'form': form})
    return render(request, 'simple_strategy/create_game_page.html', kwargs)


def play_game(request, pk, **kwargs):
    game = Game.objects.filter(pk=pk).first()
    kwargs.update({'game': game})
    return render(request, 'simple_strategy/play_game_page.html', kwargs)

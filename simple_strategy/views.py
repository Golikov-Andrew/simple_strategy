from django.shortcuts import render


# Create your views here.

def single_play_page(request):
    return render(request, 'simple_strategy/single_play_page.html')

from django.shortcuts import render


def index(request, **kwargs):
    kwargs.update({'title': 'Главная'})
    return render(request, 'commons/homepage.html', kwargs)

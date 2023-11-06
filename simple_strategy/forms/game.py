from django import forms

from simple_strategy.models.game import Game


class AddGameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ['title', 'width', 'height']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input'
            }),
            'width': forms.TextInput(attrs={
                'type': 'number'
            }),
            'height': forms.TextInput(attrs={
                'type': 'number'
            }),
        }
        labels = {
            'title': 'Название',
            'width': ' Ширина карты',
            'height': 'Высота карты',
        }


class UpdateGameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ['title', 'width', 'height']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input'
            }),
            'width': forms.TextInput(attrs={
                'type': 'number'
            }),
            'height': forms.TextInput(attrs={
                'type': 'number'
            }),
        }
        labels = {
            'title': 'Название',
            'width': ' Ширина карты',
            'height': 'Высота карты',
        }

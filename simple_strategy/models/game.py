from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse


class Game(models.Model):
    title = models.CharField(max_length=150)
    stage = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='tasks')
    width = models.IntegerField(default=500)
    height = models.IntegerField(default=500)

    def __str__(self):
        return self.title

    # def get_absolute_url(self):
    #     return reverse('game_detail', kwargs={'pk': self.pk})

    def to_json(self):
        return {
            'pk': self.pk,
            'title': self.title,
            'stage': self.stage,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner': str(self.owner),
            'width': self.width,
            'height': self.height,
        }

    class Meta:
        verbose_name = 'Game'
        verbose_name_plural = 'Games'

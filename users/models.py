from django.contrib.auth.models import User
from django.db import models


class MyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fav_themes = models.ManyToManyField('themes.Theme', related_name='fav_users', blank=True)
    like_images = models.ManyToManyField('images.ImagePost', related_name='like_users', blank=True)
    # owned_themes
    # comments
    # likes

    def __str__(self):
        return self.user.username

from django.db import models
from users.models import MyUser


class Theme(models.Model):
    owner = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='themes_owned')
    name = models.CharField(max_length=20)
    # fav_users
    # images
    operation = models.TextField(max_length=10000)

    def __str__(self):
        return self.name

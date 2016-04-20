from django.db import models
from users.models import MyUser


class Theme(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='themes')
    operation = models.TextField(max_length=10000)

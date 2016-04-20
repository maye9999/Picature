from django.db import models
from users.models import MyUser
from images.models import ImagePost


class Comment(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='comments')
    time = models.DateTimeField(auto_now_add=True)
    image_post = models.ForeignKey(ImagePost, on_delete=models.CASCADE, related_name='comments')


from django.db import models
from users.models import MyUser
from images.models import ImagePost


class Comment(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='comments')
    time = models.DateTimeField(auto_now_add=True)
    image_post = models.ForeignKey(ImagePost, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(max_length=200)

    def __str__(self):
        return self.content


class Tag(models.Model):
    image_posts = models.ManyToManyField(ImagePost, related_name='tags')
    content = models.CharField(max_length=20)

    def __str__(self):
        return self.content


class Like(models.Model):
    image_post = models.ForeignKey(ImagePost, on_delete=models.CASCADE, related_name='likes')
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='likes')

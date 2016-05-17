from django.db import models
from themes.models import Theme
from users.models import MyUser


class ImagePost(models.Model):
    image = models.ImageField(upload_to='images/')
    upload_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='images')
    is_private = models.BooleanField(default=False)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, related_name='images')
    description = models.TextField()

    # comments
    # like_users
    # tags
    # likes

    def __str__(self):
        return self.image.name

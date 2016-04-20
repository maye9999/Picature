import os
import uuid

from django.db import models

from themes.models import Theme
from users.models import MyUser

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('uploads/logos', filename)


class ImagePost(models.Model):
    image = models.ImageField(upload_to='images/')
    upload_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='images')
    is_private = models.BooleanField(default=False)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.image.name

from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

def userAvatarDirectory(instance, filename):
    return f'{ instance.owner.id }/{ filename }'

class Date(models.Model):
    name = models.CharField(max_length=100)
    birthday = models.DateTimeField()
    owner = models.ForeignKey('auth.User', related_name='dates', on_delete=models.CASCADE)
    avatar = ProcessedImageField(blank=True,
                                 upload_to=userAvatarDirectory,
                                 processors=[ResizeToFill(100, 100)],
                                 format='PNG',
                                 options={'quality': 100})

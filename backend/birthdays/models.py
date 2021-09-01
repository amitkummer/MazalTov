from django.db import models

# Create your models here.

class Date(models.Model):
    name = models.CharField(max_length=100)
    birthday = models.DateTimeField()
    owner = models.ForeignKey('auth.User', related_name='dates', on_delete=models.CASCADE)

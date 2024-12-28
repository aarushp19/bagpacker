from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Description(models.Model):
    text = models.CharField(max_length=100, blank=True, default='')

    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, blank=True, null=True)

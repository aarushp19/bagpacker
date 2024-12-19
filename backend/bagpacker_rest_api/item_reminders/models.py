from django.db import models

# Create your models here.
class Description(models.Model):
    text = models.CharField(max_length=100, blank=True, default='')

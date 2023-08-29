from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models


class MyClass(models.Model):
    class_name = models.CharField(max_length=100)

    def __str__(self):
        return self.class_name
class Student(AbstractUser):
    phone = models.CharField(max_length=15, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=False)
    class_enrolled = models.ForeignKey(MyClass, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='student_images/', blank=True, null=True)

    def __str__(self):
        return self.username
    
 
    


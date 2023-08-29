from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["id" , "first_name"]


@admin.register(MyClass)
class StudentClass(admin.ModelAdmin):
    list_display = ["id"]

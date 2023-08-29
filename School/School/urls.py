from django.contrib import admin
from django.urls import path ,include
from django.conf.urls.static import static
from django.conf import settings
from student import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path("backend/addclass/",views.add_class),
    path("backend/student_regester/",views.student_regester ),
    path("backend/viewclasses/",views.view_class ), 
    path("api/login" , views.login), 
    path("api/updateprofile/", views.update_profile), 
    path("api/viewprofiledata/" , views.get_profile_data),
]+ static (settings.MEDIA_URL ,document_root = settings.MEDIA_ROOT)
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
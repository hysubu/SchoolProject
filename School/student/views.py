from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
from django.core import serializers
from django.http import JsonResponse
from datetime import datetime
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated


# Add class Api  //
@csrf_exempt
@api_view(["POST"])
def add_class(request):
    print("class")
    try:
        api_data = request.data
        class_name = api_data.get("classname")
        if class_name:
            MyClass.objects.create(class_name=class_name)
            return Response("Data Saved", status=201)  # 201 Created
        else:
            return Response("Invalid data", status=400)  # 400 Bad Request
    except Exception as e:
        return Response({"error": str(e)}, status=500)



# View the All clasess API 
@csrf_exempt
@api_view(["GET"])
def view_class(request):
    try:
        all_classes = MyClass.objects.all()
        json_data = serializers.serialize('json', all_classes)
        return JsonResponse(json_data, safe=False, status=200)  
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)






# Regestration  API 
@csrf_exempt
@api_view(["POST"])
def student_regester(request):
    try :
        api_data = dict(request.data)
        print("api" , api_data["email"][0])
        print("clas" , api_data["selected_class"][0])
        img = request.FILES.get('image')
        print("img" , img)
        class_object = MyClass.objects.get(id=api_data["selected_class"][0])
        print(class_object)
        date_of_birth_str = api_data["date_of_birth"][0]
        date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()
        try :
            new_user = Student(
                username=api_data["first_name"][0],
                first_name=api_data["first_name"][0],
                last_name=api_data["last_name"][0],
                email=api_data['email'][0],
                date_of_birth = date_of_birth,
                phone=api_data['phone'][0],
                image=img,
                class_enrolled=class_object
            )
            new_user.set_password(api_data["password"][0])
            new_user.save()
        except Exception as e :
            print(e) 
        return Response("Registration successful", status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)













# LOGIN API 


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        print(request.data)
        phone = request.data['username']
        password = request.data['password']
        print("pass" , password)
        user = get_user_model() 
        student = user.objects.get(phone = phone)
        if student.check_password(password):
            if student.status == True:
                print("hello")
                token, _ = Token.objects.get_or_create(user=student)
                print("token", token.key)
                return Response({'token': token.key })
            else :
                return Response({"error":"Not Permission"}, status=400)
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    except Exception as e:
        return Response({'error': 'An error occurred'}, status=500)
    



# Acces Profile_data from database  

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])

def get_profile_data(request):
    try :
        user = request.user
        print(user.date_of_birth)
        profile_data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_of_birth': str(user.date_of_birth),
            'class_enrolled' :user.class_enrolled.class_name,
            'email' : user.email , 
            'phone' :user.phone, 
            'image' : str(user.image)
        }
        profile_data_json = json.dumps(profile_data)
        return JsonResponse(profile_data_json, safe=False, status=200)
    except Exception as e :
        print(e)













# Update Profile 

@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        user = request.user
        api_data  = dict(request.data)
        print(api_data)
        image = request.FILES.get('image')
        print("image",image)
        class_object = MyClass.objects.get(class_name=api_data["selected_class"][0])
        print("class", class_object)
        date_of_birth_str = api_data["date_of_birth"][0]
        date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()
        # print("user", user.first_name)
        student = Student.objects.filter(phone = user.phone)
        if student.exists():
            student.update(
                first_name  = api_data['first_name'][0],
                last_name = api_data["last_name"][0] ,
                date_of_birth = date_of_birth , 
                image = image , 
                phone = api_data["phone"][0], 
                email = api_data["email"][0],
                class_enrolled = class_object
            )
            return Response("update Profile",status=200)
        else:
            return Response("not Updated")
    except Exception as e :
        print(e)


# -------------------------------------------------------







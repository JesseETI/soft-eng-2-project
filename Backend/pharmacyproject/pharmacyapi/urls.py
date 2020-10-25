from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
#router.register('workouts', WorkoutViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
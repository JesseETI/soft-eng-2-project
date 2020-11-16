from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, OrderViewSet, PharmacyViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('orders', OrderViewSet)
router.register('pharmacy', PharmacyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_auth.urls')),
]
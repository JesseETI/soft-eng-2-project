from rest_framework import viewsets
from .models import User, PrescriptonOrder
from .serializers import UserSerializer, PrescriptionSerializer
from rest_framework import permissions


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = PrescriptonOrder.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = (permissions.IsAuthenticated,)



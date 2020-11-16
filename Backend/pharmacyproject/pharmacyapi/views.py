from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, PrescriptonOrder, Pharmacy
from .serializers import UserSerializer, PrescriptionSerializer, PharmacySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class PharmacyViewSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer
    permission_classes = (permissions.IsAuthenticated,)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = PrescriptonOrder.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(methods=['GET'], detail=False)
    def getmyorders(self, request):
        user = request.user

        try:
            if user.role == "USER":
                orders_queryset = PrescriptonOrder.objects.filter(user = user.id)
            elif user.role == "PHARM":
                pharmacy = Pharmacy.objects.get(pharmacist = user.id)
                orders_queryset = PrescriptonOrder.objects.filter(pharmacy=pharmacy.id)

            serializer = PrescriptionSerializer(orders_queryset, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            response = {
                "message": "No order found",
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

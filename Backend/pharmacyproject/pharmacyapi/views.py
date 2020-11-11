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

    @action(methods=['GET'], detail = False)
    def getmyorders(self, request):
        user = request.user

        try:
            if (user.role =="USER"):
                orders_queryset = PerscriptionOrder.objects.filter(user = user.id)
            elif (user.role =="PHARM"):
                pharmacy = Pharmacy.objects.filter(pharmacist = user.id).first()
                orders_queryset = PerscriptionOrder.objects.filter(pharmacy = pharmacy.id)

            serializer = OrderSerializer(orders_queryset, many = True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            response = {
                "message": "No order found",
            }
            return Response(response, status = status.HTTP_400_BAD_REQUEST)



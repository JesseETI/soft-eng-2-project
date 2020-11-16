from rest_framework import serializers
from .models import User, PrescriptonOrder, Pharmacy


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print(user)
        return user

class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrescriptonOrder
        fields = '__all__'

class PharmacySerializer(serializers.ModelSerializer):

    class Meta:
        model = Pharmacy
        fields = '__all__'
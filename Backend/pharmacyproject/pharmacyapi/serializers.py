from rest_framework import serializers
from .models import User, PrescriptonOrder, Pharmacy

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'role', 'password')
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
    pharmacist = UserSerializer()

    class Meta:
        model = Pharmacy
        fields = ('id','name', 'address', 'contact', 'pharmacist')

    def create(self, validated_data):
        pharmacist_data = validated_data.pop('pharmacist')
        pharmacist = User.objects.create(**pharmacist_data)
        pharmacy = Pharmacy.objects.create(pharmacist= pharmacist, **validated_data)
        return pharmacy

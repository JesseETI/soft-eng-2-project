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

class PharmacySerializer(serializers.ModelSerializer):
    pharmacist = UserSerializer()

    class Meta:
        model = Pharmacy
        fields = ('id','name', 'address', 'contact', 'pharmacist')

    def create(self, validated_data):
        pharmacist_data = validated_data.pop('pharmacist')
        pharmacist = User.objects.create_user(**pharmacist_data)
        pharmacy = Pharmacy.objects.create(pharmacist= pharmacist, **validated_data)
        return pharmacy


class PrescriptionSerializer(serializers.ModelSerializer):
    pharmacy = PharmacySerializer(read_only=True)
    pharmacy_id = serializers.PrimaryKeyRelatedField(
        queryset=Pharmacy.objects.all(), source='pharmacy', write_only=True)

    class Meta:
        model = PrescriptonOrder
        fields = ('id', 'prescriptionText', 'prescriptionImage', 'pharmacy','pharmacy_id', 'user', 'status')

    def create(self, validated_data):
        order = PrescriptonOrder.objects.create(**validated_data)
        return order
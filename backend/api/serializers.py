from rest_framework import serializers
from .models import RP

class RPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RP
        fields = '__all__'
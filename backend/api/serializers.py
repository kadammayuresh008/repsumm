from rest_framework import serializers

from .models import RP, ProcessImage

class RPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RP
        fields = '__all__'


class processImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProcessImage
        fields= '__all__'
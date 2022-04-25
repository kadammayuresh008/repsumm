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


class FileListSerializer ( serializers.Serializer ) :
    image = serializers.ListField(child=serializers.FileField( max_length=100000, allow_empty_file=False, use_url=False ))
    
    # def create(self, validated_data):
    #     blogs=Blogs.objects.latest('created_at')
    #     image=validated_data.pop('image')
    #     for img in image:
    #         photo=Photo.objects.create(image=img,blogs=blogs,**validated_data)
    #     return photo
from .serializers import RPSerializer
from .models import RP
# from .services import extract_text, extract_sectionwise_text
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .generateSummary import get_section_summary
# from django.http import JsonResponse

"""
working on list of mutilple forms serialization

"""














class RPView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        rps = RP.objects.all()
        serializer = RPSerializer(rps, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # request.FILES.getlist('file')
        print(list(request.data))
        return Response({}, status=status.HTTP_201_CREATED)
        # print(request.FILES.getlist('file'))
        # rps_serializer = RPSerializer(data=request.data)
        # print(rps_serializer)
        # if 'file' not in request.FILES or not serializer_class.is_valid():
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     # handle_uploaded_file(request.FILES['file'])
        #     return Response(status=status.HTTP_201_CREATED)
        # print("hi")
        # print(request.data)
        # return Response({}, status=status.HTTP_201_CREATED)

        # rps_serializer = RPSerializer(data=request.data)
        # if rps_serializer.is_valid():
        #     rps_serializer.save()
        #     print(rps_serializer.data[0]['title'])
        #     # text = extract_text(rps_serializer.data['rp_file'])
        #     # paper_content = get_section_summary(rps_serializer.data['rp_file'])
        #     paper_content = {}
        #     return Response(paper_content, status=status.HTTP_201_CREATED)
        # else:
        #     print('error', rps_serializer.errors)
        #     return Response(rps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
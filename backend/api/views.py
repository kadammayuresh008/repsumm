from .serializers import RPSerializer
from .models import RP
# from .services import extract_text, extract_sectionwise_text
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .generateSummary import get_section_summary

"""
working on list of mutilple forms serialization

"""

summ = {}
ind = 0

class RPView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        # rps = RP.objects.all()
        # serializer = RPSerializer(rps, many=True)
        # return Response(serializer.data)
        return Response(summ)


    def post(self, request, *args, **kwargs):
        rps_serializer = RPSerializer(data=request.data)
        if rps_serializer.is_valid():
            rps_serializer.save()
            # text = extract_text(rps_serializer.data['rp_file'])
            paper_content = get_section_summary(rps_serializer.data['rp_file'])
            global summ
            global ind
            # summ.append(paper_content)
            summ[ind] = paper_content
            ind += 1
            print("*******")
            print(len(summ))
            print("*******")
            return Response(paper_content, status=status.HTTP_201_CREATED)
        else:
            print('error', rps_serializer.errors)
            return Response(rps_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


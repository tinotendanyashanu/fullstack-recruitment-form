from rest_framework import viewsets
from .models import Applicant
from .serializers import ApplicantSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all().order_by('-submitted_at')
    serializer_class = ApplicantSerializer

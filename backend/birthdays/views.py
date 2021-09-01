from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import viewsets

from birthdays.models import Date
from birthdays.serializers import DateSerializer
from birthdays.permissions import IsOwner

# Create your views here.

class DateViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Date.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

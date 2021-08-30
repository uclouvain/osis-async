from collections import OrderedDict

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from osis_async.api.serializers import AsyncTaskSerializer
from osis_async.models import AsyncTask
from osis_async.models.enums import TaskStates


@method_decorator(ensure_csrf_cookie, name="dispatch")
class AsyncTaskListView(generics.ListAPIView):
    """Return all the asynchronous tasks associated with a specific user."""

    queryset = AsyncTask.objects.all()
    serializer_class = AsyncTaskSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication,)

    def get_paginated_response(self, data):
        pending_count = (
            self.get_queryset()
            .filter(state__in=[TaskStates.PROCESSING.name, TaskStates.PENDING.name])
            .count()
        )
        return Response(OrderedDict([
            ("count", self.paginator.count),
            ("pending_count", pending_count),
            ("next", self.paginator.get_next_link()),
            ("previous", self.paginator.get_previous_link()),
            ("results", data),
        ]))

    def get_queryset(self):
        return super().get_queryset().filter(person=self.request.user.person)

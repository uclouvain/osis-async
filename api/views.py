from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from osis_async.api.serializers import AsyncTaskSerializer
from osis_async.models import AsyncTask


class AsyncTaskSetPagination(LimitOffsetPagination):
    default_limit = 15


@method_decorator(ensure_csrf_cookie, name='dispatch')
class AsyncTaskListView(generics.ListAPIView):
    """Return all the asynchronous tasks associated with a specific user."""

    queryset = AsyncTask.objects.all()
    serializer_class = AsyncTaskSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = AsyncTaskSetPagination
    authentication_classes = (SessionAuthentication,)

    def get_queryset(self):
        return super().get_queryset().filter(person_id=self.request.user.person.id)

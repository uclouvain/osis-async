# ##############################################################################
#
#    OSIS stands for Open Student Information System. It's an application
#    designed to manage the core business of higher education institutions,
#    such as universities, faculties, institutes and professional schools.
#    The core business involves the administration of students, teachers,
#    courses, programs and so on.
#
#    Copyright (C) 2015-2022 Université catholique de Louvain (http://www.uclouvain.be)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    A copy of this license - GNU General Public License - is available
#    at the root of the source code of this program.  If not,
#    see http://www.gnu.org/licenses/.
#
# ##############################################################################

from collections import OrderedDict

from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from osis_async.api.serializers import AsyncTaskSerializer
from osis_async.api.utils import CorsAllowOriginMixin
from osis_async.models import AsyncTask
from osis_async.models.enums import TaskState


class AsyncTaskListView(CorsAllowOriginMixin, generics.ListAPIView):
    """Return all the asynchronous tasks associated with a specific user."""

    name = "task-list"
    queryset = AsyncTask.objects.all()
    serializer_class = AsyncTaskSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = LimitOffsetPagination
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES + [SessionAuthentication]

    def get_paginated_response(self, data):
        pending_count = (
            self.get_queryset()
            .filter(state__in=[TaskState.PROCESSING.name, TaskState.PENDING.name])
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

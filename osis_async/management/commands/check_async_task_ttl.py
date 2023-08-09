# ##############################################################################
#
#    OSIS stands for Open Student Information System. It's an application
#    designed to manage the core business of higher education institutions,
#    such as universities, faculties, institutes and professional schools.
#    The core business involves the administration of students, teachers,
#    courses, programs and so on.
#
#    Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
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
import datetime
import logging

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.models import F, ExpressionWrapper, DateTimeField
from osis_async.models.task import AsyncTask
from osis_async.models.enums import TaskState


logger = logging.getLogger(settings.DEFAULT_LOGGER)


class Command(BaseCommand):
    help = "Set running tasks out of date (TTL expired) in error"

    def handle(self, *args, **options):
        logger.info(f"[OSIS-Async] Check async task TTL.")

        out_of_date_tasks = AsyncTask.objects.filter(
            started_at__isnull=False,
            state=TaskState.PROCESSING.name
        ).annotate(
            expiration_date=ExpressionWrapper(
                F('started_at') + datetime.timedelta(seconds=60) * F('time_to_live'),
                output_field=DateTimeField(),
            )
        ).filter(
            expiration_date__lt=datetime.datetime.today()
        )

        for out_of_date_task in out_of_date_tasks:
            logger.warning(f"[OSIS-Async] Tasks ({out_of_date_task.uuid}) - '{out_of_date_task.name}' out of date. "
                           f"Cause: TTL Reached")
            out_of_date_task.state = TaskState.ERROR.name
            out_of_date_task.progression = 0
            out_of_date_task.completed_at = datetime.datetime.today()
            out_of_date_task.save()

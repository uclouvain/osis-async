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
import traceback
from datetime import datetime

from osis_async.models import AsyncTask
from osis_async.models.enums import TaskState


def update_task(
    uuid,
    progression: int = None,
    description: str = None,
    state: TaskState = None,
    started_at: datetime = None,
    completed_at: datetime = None,
    exception: Exception = None,
):
    task = AsyncTask.objects.get(uuid=uuid)
    if progression is not None:
        task.progression = progression
    if description is not None:
        task.description = description
    if state is not None:
        task.state = state.name
    if started_at is not None:
        task.started_at = started_at
    if completed_at is not None:
        task.completed_at = completed_at
    if exception is not None:
        task.traceback = ''.join(traceback.format_exception(etype=None, value=exception, tb=exception.__traceback__))
    task.save()

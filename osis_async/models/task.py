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

import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from base.models.person import Person
from osis_async.models.enums import TaskStates


class AsyncTask(models.Model):
    """Store information about an asynchronous task."""

    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    name = models.CharField(_("Name"), max_length=100)
    description = models.TextField(_("Description"))
    state = models.CharField(
        _("State"),
        choices=TaskStates.choices(),
        default=TaskStates.PENDING.name,
        max_length=25,
    )
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="+", null=True)
    progression = models.IntegerField(
        _("Progression"),
        help_text=_("In percentage"),
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100),
        ],
    )
    time_to_live = models.IntegerField(
        _("Time To Live"),
        help_text=_(
            "The Time To Live is the duration, in minutes, that the instance of a "
            "task will have to be completed. Pass this time, the task will be stop "
            "and errored."
        ),
        default=5,
        validators=[
            MinValueValidator(0),
        ],
    )

    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    started_at = models.DateTimeField(_("Started at"), editable=False, null=True)
    completed_at = models.DateTimeField(_("Completed at"), editable=False, null=True)

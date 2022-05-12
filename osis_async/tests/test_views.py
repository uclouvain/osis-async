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
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from base.tests.factories.person import PersonFactory
from osis_async.models import AsyncTask


class AsyncTaskListViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.person = PersonFactory()
        cls.async_task = AsyncTask.objects.create(
            person=cls.person,
            name="test",
            description="Test description",
        )
        cls.url = reverse("osis_async:task-list")

    def setUp(self):
        self.client.force_authenticate(user=self.person.user)

    def test_allow_user_to_retrieve_his_tasks(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_only_return_users_tasks(self):
        # Create an other task for an other user
        AsyncTask.objects.create(
            person=PersonFactory(),
            name="test 2",
            description="Test description 2",
        )
        response = self.client.get(self.url)
        # It should not be in the response
        self.assertEqual(response.data["count"], 1)

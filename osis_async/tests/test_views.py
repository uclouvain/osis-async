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

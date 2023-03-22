/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */

import {flushPromises, mount} from '@vue/test-utils';
import {expect, it, vi} from "vitest";
import AsyncTasksViewer from './AsyncTasksViewer.vue';
import fetchMock from "fetch-mock";


const jQueryMock = vi.fn(() => ({
  on: vi.fn((eventName, selectorOrHandler: string | CallableFunction, handler?: CallableFunction) => {
    if (typeof selectorOrHandler === 'function') {
      selectorOrHandler({stopPropagation: vi.fn()});
    } else if (handler) {
      handler({stopPropagation: vi.fn()});
    }
  }),
}));

vi.stubGlobal('jQuery', jQueryMock);

it('should mount and unmount', async () => {
  vi.useFakeTimers();
  fetchMock.reset().get('/?limit=15', {
    count: 1,
    results: [
      {
        uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
        name: 'Génération de document',
        description: 'Votre document est en attente de génération',
        state: 'PENDING',
        progression: 0,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: null,
      },
    ],
  });
  const wrapper = mount(AsyncTasksViewer, {
    props: {url: '/'},
  });

  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(0);
  await flushPromises();
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(1);
  expect(wrapper.getComponent({name: 'AsyncTask'}).props('state')).toBe('PENDING');

  fetchMock.reset().get('/?limit=15', {
    count: 1,
    results: [
      {
        uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
        name: 'Génération de document',
        description: 'Votre document est généré',
        state: 'DONE',
        progression: 0,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: "07/06/2021 14:23",
      },
    ],
  });
  vi.advanceTimersToNextTimer();
  await flushPromises();
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(1);
  expect(wrapper.getComponent({name: 'AsyncTask'}).props('state')).toBe('DONE');
  expect(vi.getTimerCount()).toBe(1);

  wrapper.unmount();
  expect(vi.getTimerCount()).toBe(0);
});

it('should display a response error', async () => {
  fetchMock.reset().get('/error?limit=15', 404);
  const wrapper = mount(AsyncTasksViewer, {
    props: {url: '/error'},
  });
  await flushPromises();
  expect(wrapper.text()).toContain('async_tasks_viewer.error_fetch_async_tasks');
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(0);
});

it('should display an error if fetching async tasks fail', async () => {
  fetchMock.reset().get('/error?limit=15', {throws: 'This is an error'});
  const wrapper = mount(AsyncTasksViewer, {
    props: {url: '/error'},
  });
  await flushPromises();
  expect(wrapper.text()).toContain('async_tasks_viewer.error_fetch_async_tasks');
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(0);
});

it('should display a link to load more tasks if request is too big', async () => {
  const mockAsyncTasks2 = {
    pending_count: 1,
    count: 2,
    next: 'mockAsyncTasks2',
    results: [
      {
        uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
        name: 'Génération de document',
        description: 'Votre document est en attente de génération',
        state: 'PENDING',
        progression: 0,
        created_at: '07/06/2021 12:22',
        started_at: null,
        completed_at: null,
      }, {
        uuid: 'f66ecf3b-637c-413a-91a7-e318c27ce02f',
        name: 'Génération de document',
        description: 'Votre document est en cours de génération',
        state: 'PROCESSING',
        progression: 45,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: null,
      },
    ],
  };
  const mockAsyncTasks3 = {
    count: 1,
    next: null,
    results: [
      {
        uuid: '1445bb87-4965-44a5-0889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      },
    ],
  };

  fetchMock.reset()
      .get('/2?limit=2', mockAsyncTasks2)
      .get('/2?limit=4', mockAsyncTasks3);
  const wrapper = mount(AsyncTasksViewer, {
    props: {
      url: '/2',
      limit: 2,
    },
  });
  await flushPromises();
  expect(wrapper.text()).toContain('async_tasks_viewer.load_more');
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(2);
  await wrapper.find('button').trigger('click');
  await flushPromises();
  expect(wrapper.findAllComponents({name: 'AsyncTask'})).toHaveLength(1);
});

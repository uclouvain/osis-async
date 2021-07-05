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

import { mount } from '@vue/test-utils';
import AsyncTasksViewer from './AsyncTasksViewer.vue';
import fetchMock from "fetch-mock";
import Vue from "vue";

jest.mock('./utils.js');

const mockAsyncTasks = {
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
};
fetchMock
  .get('/', mockAsyncTasks)
  .get('/error', {throws: 'This is an error'});

describe('component lifecycle', () => {
  it('should mount', async () => {
    const wrapper = mount(AsyncTasksViewer, {
      propsData: {
        url: '/',
      },
      mocks: {
        $t: k => k,
      },
    });

    expect(wrapper.vm.asyncTasks.length).toBe(0);
    await Vue.nextTick(); // wait for request
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.vm.asyncTasks.length).toBe(1);
  });

  it('should display an error if fetching async tasks fail', async () => {
    const wrapper = mount(AsyncTasksViewer, {
      propsData: {
        url: '/error',
      },
      mocks: {
        $t: k => k,
      },
    });
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.text()).toContain('async_tasks_viewer.error_fetch_async_tasks');
    expect(wrapper.vm.asyncTasks.length).toBe(0);
  });
});

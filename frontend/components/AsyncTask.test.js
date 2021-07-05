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
import AsyncTask from './AsyncTask.vue';

jest.mock('../utils.js');


const pendingAsyncTaskData = {
  uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
  name: 'pendingAsyncTaskData',
  description: 'Votre document est en attente de génération',
  state: 'PENDING',
  progression: 0,
  createdAt: Date.now().toString(),
  startedAt: Date.now().toString(),
  completedAt: Date.now().toString(),
}
const processingAsyncTaskData = {
  uuid: 'f66ecf3b-637c-413a-91a7-e318c27ce02f',
  name: 'processingAsyncTaskData',
  description: 'Votre document est en cours de génération',
  state: 'PROCESSING',
  progression: 45,
  createdAt: Date.now().toString(),
  startedAt: Date.now().toString(),
  completedAt: Date.now().toString(),
}
const doneAsyncTaskData = {
  uuid: '1445bb87-4965-44a5-9889-1b82f49166ec',
  name: 'doneAsyncTaskData',
  description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
  state: 'DONE',
  progression: 100,
  createdAt: Date.now().toString(),
  startedAt: Date.now().toString(),
  completedAt: Date.now().toString(),
}

describe('component lifecycle', () => {
  it('should mount', () => {
    const wrapper = mount(AsyncTask, {
      propsData: {
        ...pendingAsyncTaskData,
      },
      mocks: {
        $t: k => k,
      },
    });
    expect(wrapper.text()).toContain(pendingAsyncTaskData['name']);
    expect(wrapper.text()).toContain(pendingAsyncTaskData['description']);
  });

  it('should update', async () => {
    const wrapper = mount(AsyncTask, {
      propsData: {
        ...pendingAsyncTaskData,
      },
      mocks: {
        $t: k => k,
      },
    });
    wrapper.setProps({...doneAsyncTaskData});
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(doneAsyncTaskData['name']);
    // expect(wrapper.text()).toContain(doneAsyncTaskData['description']);
  });
});

describe('async task display', () => {
  it('changes when processing state', async () => {
    const wrapper = mount(AsyncTask, {
      propsData: {
        ...pendingAsyncTaskData,
      },
      mocks: {
        $t: k => k,
      },
    });

    // text must be bold
    const textSpan = wrapper.find('span.async-task-text');
    expect(textSpan.exists()).toBe(true);
    expect(textSpan.element.classList).toContain('font-bold');
  });

  it('changes when read state', async () => {
    const wrapper = mount(AsyncTask, {
      propsData: {
        ...doneAsyncTaskData,
      },
      mocks: {
        $t: k => k,
      },
    });

    // text must not be bold
    const textSpan = wrapper.find('span.async-task-text');
    expect(textSpan.exists()).toBe(true);
    expect(textSpan.element.classList).not.toContain('font-bold');
  });
});

it('should have correct computed values', () => {
  expect(AsyncTask.computed.isDone.call({ state: pendingAsyncTaskData.state})).toEqual(false);
  expect(AsyncTask.computed.isDone.call({ state: doneAsyncTaskData.state})).toEqual(true);

  expect(AsyncTask.computed.isProcessing.call({ state: pendingAsyncTaskData.state})).toEqual(false);
  expect(AsyncTask.computed.isProcessing.call({ state: processingAsyncTaskData.state})).toEqual(true);
});

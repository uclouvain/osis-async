<!--
  -
  -   OSIS stands for Open Student Information System. It's an application
  -   designed to manage the core business of higher education institutions,
  -   such as universities, faculties, institutes and professional schools.
  -   The core business involves the administration of students, teachers,
  -   courses, programs and so on.
  -
  -   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
  -
  -   This program is free software: you can redistribute it and/or modify
  -   it under the terms of the GNU General Public License as published by
  -   the Free Software Foundation, either version 3 of the License, or
  -   (at your option) any later version.
  -
  -   This program is distributed in the hope that it will be useful,
  -   but WITHOUT ANY WARRANTY; without even the implied warranty of
  -   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -   GNU General Public License for more details.
  -
  -   A copy of this license - GNU General Public License - is available
  -   at the root of the source code of this program.  If not,
  -   see http://www.gnu.org/licenses/.
  -
  -->
<template>
  <li
      id="async-tasks-viewer"
      class="dropdown"
  >
    <a
        class="dropdown-toggle"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
    >
      <div
          class="download"
          :data-count="pendingAsyncTasksCount"
          :class="{'show-count': pendingAsyncTasksCount }"
      >
        <span class="fas fa-tasks" />
      </div>
    </a>
    <ul
        v-show="asyncTasks.length || error"
        class="dropdown-menu async-tasks-dropdown"
    >
      <li v-if="error">
        <div
            class="alert alert-warning"
            role="alert"
        >
          {{ error }}
        </div>
      </li>
      <AsyncTask
          v-for="asyncTask in asyncTasks"
          :key="asyncTask.uuid"
          :uuid="asyncTask.uuid"
          :name="asyncTask.name"
          :description="asyncTask.description"
          :progression="asyncTask.progression"
          :state="asyncTask.state"
          :created-at="asyncTask.created_at"
          :started-at="asyncTask.started_at"
          :completed-at="asyncTask.completed_at"
      />
      <li
          v-show="next"
          class="text-center"
      >
        <button
            type="button"
            class="btn btn-link"
            @click="loadMore"
        >
          {{ $t('async_task_viewer.load_more') }}
        </button>
      </li>
    </ul>
  </li>
</template>

<script>
import AsyncTask from './components/AsyncTask';

export default {
  name: 'AsyncTasksViewer',
  components: { AsyncTask },
  props: {
    url: {
      type: String,
      required: true,
    },
    interval: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      asyncTasks: [],
      next: false,
      pageSize: 15,
      error: '',
    };
  },
  computed: {
    pendingAsyncTasksCount: function () {
      return this.asyncTasks.filter(asyncTask => ['PENDING', 'PROCESSING'].includes(asyncTask.state)).length;
    },
  },
  async mounted() {
    await this.fetchAsyncTasks();
    let interval = this.interval;
    if (this.pendingAsyncTasksCount > 0) {
      // in case there is actual pending async task, set the interval to 5 seconds
      interval = 5;
    }
    this.timer = setInterval(this.fetchAsyncTasks, interval * 1000);
    // This next line let the dropdown menu open after clicking inside it. See the bootstrap source code here:
    // https://github.com/twbs/bootstrap/blob/0b9c4a4007c44201dce9a6cc1a38407005c26c86/js/dropdown.js#L160
    jQuery(document).on('click.bs.dropdown.data-api', '.async-tasks-dropdown', e => e.stopPropagation());
  },
  methods: {
    fetchAsyncTasks: async function () {
      try {
        const response = await fetch(`${this.url}?limit=${this.pageSize}`);
        const newAsyncTasks = await response.json();
        this.asyncTasks = newAsyncTasks.results;
        this.next = 'next' in newAsyncTasks && newAsyncTasks.next != null;
      } catch (error) {
        this.error = `${this.$t('async_tasks_viewer.error_fetch_async_tasks')} ( ${error.statusText} )`;
      }
    },
    loadMore: function () {
      this.pageSize += 15;
      this.fetchAsyncTasks();
    },
  },
};
</script>

<style lang="scss" scoped>
#async-tasks-viewer {
  .dropdown-menu {
    padding: 0;
  }
  .alert.alert-warning {
    margin-top: 20px;
  }

  //-------------------------------------------------
  // Code from https://codepen.io/ryanmorr/pen/RPZZjd
  .download {
    display: inline-block;
    position: relative;

    &::before,
    &::after {
      color: #777;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    &::after {  // async tasks count
      font-family: Arial sans-serif;
      font-size: 0.8em;
      font-weight: 700;
      position: absolute;
      top: -10px;
      right: -15px;
      padding: 1px 3px;
      line-height: 100%;
      border: 2px #fff solid;
      border-radius: 60px;
      background: #db3434;
      opacity: 0;
      content: attr(data-count);
      transform: scale(0.5);
      transition: transform, opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
      color: #fff;
      z-index: 2;
    }
    &.show-count::after {
      transform: scale(1);
      opacity: 1;
    }
  }
  //-------------------------------------------------
}
</style>

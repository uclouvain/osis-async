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
  <li class="async-task-dropdown-item container">
    <div class="row">
      <div class="col-md-12 text-left">
        <span class="font-bold">
          {{ name }}
        </span>
        <span class="async-task-date pull-right">
          <em>{{ asyncDate }}</em>
        </span>
      </div>
      <div class="col-md-12 text-left">
        <!-- eslint-disable-next-line --><!-- Disable the vue/no-v-html warning -->
        <span class="async-task-text" v-html="description" />
      </div>
      <div class="col-md-12">
        <div class="progress">
          <div
              class="progress-bar progress-bar-striped"
              :class="{ 'active': isProcessing, 'progress-bar-success': isDone }"
              role="progressbar"
              :aria-valuenow="progression"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progression + '%' }"
          >
            {{ progression }}%
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  name: 'AsyncTask',
  props: {
    uuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progression: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    startedAt: {
      type: String,
      required: false,
      default: null,
    },
    completedAt: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    isProcessing: function () {
      return this.state === 'PROCESSING';
    },
    isDone: function () {
      return this.state === 'DONE';
    },
    asyncDate: function () {
      if (this.completedAt) {
        return `${this.$t('async_task.completed_at')} : ${this.completedAt}`
      } else if (this.startedAt) {
        return `${this.$t('async_task.started_at')} : ${this.startedAt}`
      } else {
        return `${this.$t('async_task.created_at')} : ${this.createdAt}`
      }
    },
  },
};
</script>

<style lang="scss">
.async-task-dropdown-item {
  padding: 10px;

  .row {
    margin: 0;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  .label {
    margin-right: 10px;
  }

  .async-task-date {
    padding-right: 5px;
  }

  .progress {
    margin-top: 5px;
    .progress-bar {
      min-width: 2em;
    }
  }
}

.font-bold {
  font-weight: bold;
}
</style>

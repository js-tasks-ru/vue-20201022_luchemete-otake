<template>
  <form class="form meetup-form" @submit.prevent="submitFormData">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="localMeetUp.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="localMeetUp.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="localMeetUp.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="localMeetUp.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="localMeetUp.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetUp.agenda"
        class="mb-3"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem($event, index)"
        :key="agendaItem.id"
        @remove="removeAgendaItem(index)"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText ? submitText : 'Submit' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: String,
  },

  data() {
    return {
      localMeetUp: clone(this.meetup),
    };
  },

  methods: {
    submitFormData() {
      this.$emit('submit', clone(this.localMeetUp));
    },
    addAgendaItem() {
      const newItem = buildAgendaItem();
      const lastIndex = this.localMeetUp.agenda.length - 1;
      if (lastIndex >= 0) {
        newItem.startsAt = this.localMeetUp.agenda[lastIndex].endsAt;
      }
      this.localMeetUp.agenda.push(newItem);
    },
    updateAgendaItem(agendaItem, index) {
      this.localMeetUp.agenda.splice(index, 1, agendaItem);
    },
    removeAgendaItem(index) {
      this.localMeetUp.agenda.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>

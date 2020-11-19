<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="localAgendaItem.type">
        <option v-for="type in types" :value="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            :value="localAgendaItem.startsAt"
            @input="updateStartTime($event.target.value)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ titleLabel }}</label>
      <input class="form-control" v-model="localAgendaItem.title" />
    </div>

    <div class="form-group" v-if="isTalk">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="localAgendaItem.speaker" />
    </div>
    <div class="form-group" v-if="hasDescription">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="localAgendaItem.description"
      ></textarea>
    </div>
    <div class="form-group" v-if="isTalk">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="localAgendaItem.language">
        <option v-for="language in languages" :value="language.value">
          {{ language.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

function getDateByTime(time) {
  const date = new Date();
  const times = time.split(':');
  date.setHours(times[0], times[1], 0, 0);
  return date;
}

function doubleTimeFormat(time) {
  return time < 10 ? '0' + time : time;
}

function getFormattedTime(hours, minutes) {
  return `${doubleTimeFormat(hours)}:${doubleTimeFormat(minutes)}`;
}

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      types: getAgendaItemTypes(),
      languages: getTalkLanguages(),
    };
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },
  },

  computed: {
    titleLabel() {
      if (this.localAgendaItem.type === 'talk') {
        return 'Тема';
      }
      if (this.localAgendaItem.type === 'other') {
        return 'Заголовок';
      }
      return 'Нестандартный текст (необязательно)';
    },
    isTalk() {
      return this.localAgendaItem.type === 'talk';
    },
    hasDescription() {
      return this.isTalk || this.localAgendaItem.type === 'other';
    },
  },

  methods: {
    updateStartTime(newStartTime) {
      const time_start_old = getDateByTime(this.localAgendaItem.startsAt);
      const time_end_old = getDateByTime(this.localAgendaItem.endsAt);

      const length = time_end_old - time_start_old;
      let time_end_new = getDateByTime(newStartTime);
      time_end_new.setMilliseconds(time_end_new.getMilliseconds() + length);
      let hours = time_end_new.getHours();
      let minutes = time_end_new.getMinutes();

      this.localAgendaItem.endsAt = getFormattedTime(hours, minutes);
      this.localAgendaItem.startsAt = newStartTime;
    },
  },
};
</script>

<style></style>

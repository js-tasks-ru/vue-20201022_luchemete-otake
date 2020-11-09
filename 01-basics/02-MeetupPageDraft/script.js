import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

function getMeetupLink(meetupId) {
  return `${API_URL}/meetups/${meetupId}`;
}

function getDateOnlyString(date) {
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: {},
  },

  mounted() {
    this.getMeetupData(MEETUP_ID);
  },

  computed: {
    meetup() {
      return {
        ...this.rawMeetup,
        agenda: this.rawMeetup.agenda
          ? this.rawMeetup.agenda.map((agendaItem) => {
            return {
              ...agendaItem,
              isTalk: agendaItem.type === 'talk',
              title: agendaItem.title
                ? agendaItem.title
                : agendaItemTitles[agendaItem.type],
              icon: `/assets/icons/icon-${
                agendaItemIcons[agendaItem.type]
              }.svg`,
            };
          })
          : undefined,
        cover: this.rawMeetup.imageId ? this.meetupCoverLink : undefined,
        localDate: new Date(this.rawMeetup.date).toLocaleString(
          navigator.language,
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        ),
        dateOnlyString: getDateOnlyString(new Date(this.rawMeetup.date)),
      };
    },
    meetupCoverLink() {
      return getMeetupCoverLink(this.rawMeetup);
    },
  },

  methods: {
    async getMeetupData(id) {
      this.rawMeetup = await fetch(getMeetupLink(id)).then((response) =>
        response.json(),
      );
    },
  },
});

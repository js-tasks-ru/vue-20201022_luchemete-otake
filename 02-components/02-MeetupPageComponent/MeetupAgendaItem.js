import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `
    <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <img class="icon" alt="icon" :src="processedAgendaItem.icon" />
    </div>
    <div class="meetup-agenda__item-col">{{ processedAgendaItem.startsAt }} - {{ processedAgendaItem.endsAt }}</div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title" v-if="processedAgendaItem.title">{{ processedAgendaItem.title }}</h5>
      <p v-if="processedAgendaItem.isTalk">
        <span>{{ processedAgendaItem.speaker }}</span>
        <span class="meetup-agenda__dot"></span>
        <span class="meetup-agenda__lang">{{ processedAgendaItem.language }}</span>
      </p>
      <p v-if="processedAgendaItem.description">{{ processedAgendaItem.description }}</p>
    </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    processedAgendaItem() {
      return {
        ...this.agendaItem,
        isTalk: this.agendaItem.type === 'talk',
        title: this.agendaItem.title
          ? this.agendaItem.title
          : agendaItemTitles[this.agendaItem.type],
        icon: `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`,
      };
    },
  },
};

import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<meetup-view v-if="meetup" :meetup="meetup"></meetup-view>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    };
  },

  mounted() {
    this.getMeetupData(MEETUP_ID);
  },

  methods: {
    async getMeetupData(id) {
      this.meetup = await fetchMeetup(id);
    },
  },
};

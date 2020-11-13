export const MeetupCover = {
  template: `
    <div class="meetup-cover" :style="coverUrl">
        <h1 class="meetup-cover__title" v-if="title">{{ title }}</h1>
    </div>`,

  props: {
    link: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    coverUrl() {
      return this.link ? `--bg-url: url(${this.link})` : '';
    },
  },
};

<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },

  created() {
    this.updateParamsFromQuery(this.$route.query);
  },

  computed: {
    query() {
      return {
        ...(this.view !== 'list' && { view: this.view }),
        ...(this.date !== 'all' && { date: this.date }),
        ...(this.participation !== 'all' && {
          participation: this.participation,
        }),
        ...(this.search !== '' && { search: this.search }),
      };
    },
  },

  watch: {
    query(val) {
      if (this.isSamePath(this.$route.query)) {
        return;
      }
      this.$router.push({ path: '/', query: val });
    },
    $route(to) {
      this.updateParamsFromQuery(to.query);
    },
  },

  methods: {
    isSamePath(query) {
      return (
        this.view === query.view &&
        this.date === query.date &&
        this.participation === query.participation &&
        this.search === query.search
      );
    },
    updateParamsFromQuery(query) {
      this.view = query.view ? query.view : 'list';
      this.date = query.date ? query.date : 'all';
      this.participation = query.participation ? query.participation : 'all';
      this.search = query.search ? query.search : '';
    },
  },
};
</script>

<style scoped></style>

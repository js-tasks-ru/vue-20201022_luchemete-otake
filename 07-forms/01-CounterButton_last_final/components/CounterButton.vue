<template>
  <button type="button" @click="increase">{{ innerCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      innerCount: this.count,
    };
  },

  watch: {
    count(val) {
      if (val) {
        this.innerCount = val;
      }
    },
  },

  methods: {
    increase() {
      this.innerCount += 1;
      this.$emit('increment', this.innerCount);
    },
  },
};
</script>

<style>

</style>

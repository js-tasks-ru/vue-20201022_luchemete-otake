<template>
  <button type="button" @click="increase">{{ localCount }}</button>
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
      localCount: this.count,
    };
  },

  watch: {
    count(val) {
      if (val) {
        this.localCount = val;
      }
    },
  },

  methods: {
    increase() {
      this.localCount += 1;
      this.$emit('increment', this.localCount);
    },
  },
};
</script>

<style></style>

export const CounterButton = {
  template: `<button type="button" @click="$emit('increment', count + 1)">{{ count }}</button>`,

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
};

<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h1 class="page__title text-center">
        {{ title }}
      </h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props: {
    title: String,
  }
};
</script>

<style scoped>
.page.page_meetup-forms {
  padding: 70px 0;
}

.page__title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: var(--body-color);
  margin: 0 0 32px;
}

.text-center {
  text-align: center;
}

.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}
</style>

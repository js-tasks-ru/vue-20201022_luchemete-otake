<template>
  <div class="page page_onboarding">
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
  name: 'AuthLayout',

  props: {
    title: String,
  }
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
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

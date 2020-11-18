<template>
  <div class="wrapper bg-grey">
    <the-header></the-header>
    <main>
      <slot></slot>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
export default {
  name: 'BaseLayout',

  components: { TheFooter, TheHeader },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.bg-grey {
  background-color: var(--grey-light);
}
</style>

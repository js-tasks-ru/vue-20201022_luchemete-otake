<template>
  <form class="form" @submit="onLogin">
    <div class="form-group">
      <span>
        <label class="form-label">
          Email
        </label>
        <div class="input-group">
          <input type="email" placeholder="demo@email" class="form-control" v-model="email">
        </div>
      </span>
    </div>
    <div class="form-group">
      <span>
        <label class="form-label">
          Пароль
        </label>
        <div class="input-group">
          <input type="password" placeholder="password" class="form-control" v-model="password">
        </div>
      </span>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">
        Зарегистрируйтесь
      </router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  methods: {
    async onLogin() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      const response = await login(this.email, this.password);
      if (response.error) {
        alert(response.message);
        return;
      }
      alert(response.fullname);
    },
  },
};
</script>

<style scoped></style>

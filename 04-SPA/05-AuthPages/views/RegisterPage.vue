<template>
  <form class="form" @submit.prevent="onRegister">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullname"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="passwordConfirmation"/>
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input type="checkbox" v-model="agreement"/> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">Уже есть аккаунт? <router-link to="/login" class="link">Войдите</router-link></div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: undefined,
      fullname: undefined,
      password: undefined,
      passwordConfirmation: undefined,
      agreement: false,
    };
  },

  methods: {
    async onRegister() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.fullname) {
        alert('Требуется ввести полное имя');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      if (!this.passwordConfirmation || this.password !== this.passwordConfirmation) {
        alert('Пароли не совпадают');
        return;
      }
      if (!this.agreement) {
        alert('Требуется согласиться с условиями');
        return;
      }
      const response = await register(this.email, this.fullname,this.password);
      if (response.error) {
        alert(response.message);
        return;
      }
      alert(response.id);
    },
  },
};
</script>

<style scoped></style>

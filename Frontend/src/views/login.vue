<template>
  <div class="login-page">
    <LoginHeader />
    <LoginForm />
    <LoginFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginHeader from '../components/login.header.vue';
import LoginForm from '../components/login.form.vue';
import LoginFooter from '../components/login.footer.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginHeader,
    LoginForm,
    LoginFooter,
  },
});
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>

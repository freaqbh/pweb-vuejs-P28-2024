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


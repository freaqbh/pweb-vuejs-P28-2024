<template>
  <div class="login-page">
    <RegisterHeader />
    <RegisterForm />
    <RegisterFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterHeader from '../components/register.header.vue';
import RegisterForm from '../components/register.form.vue';
import RegisterFooter from '../components/register.footer.vue';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    RegisterHeader,
    RegisterForm,
    RegisterFooter,
  },
});
</script>


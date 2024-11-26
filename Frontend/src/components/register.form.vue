<template>
    <div class="entry">
        <form @submit.prevent="registerUser">
            <div>
                <label>Username:</label>
                <input v-model="formData.username" required />
            </div>
            <div>
                <label>Password:</label>
                <input class="input-pass" type="password" v-model="formData.password" required />
            </div>
            <button :disabled="loading" type="submit">
                {{ loading ? "Processing..." : "Register" }}
            </button>
        </form>
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'RegisterForm',
    setup() {
        const formData = reactive({
            username: '',
            password: '',
        });

        const loading = ref(false);
        const error = ref('');

        const registerUser = async () => {
            loading.value = true;
            error.value = '';
            try {
                const response = await axios.post('http://localhost:3000/auth/register', formData);
                alert(`User registered successfully: ${response.data.message}`);
                localStorage.setItem('token', response.data.token); // Simpan token jika diperlukan
            } catch (err: any) {
                error.value = err.response?.data?.error || 'Failed to register';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        return { formData, registerUser, loading, error };
    },
});
</script>

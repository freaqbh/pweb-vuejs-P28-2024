<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label>Username:</label>
                <input v-model="formData.username" required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="formData.password" required />
            </div>
            <button :disabled="loading" type="submit">
                {{ loading ? "Logging in..." : "Login" }}
            </button>
        </form>
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const formData = reactive({
            username: '',
            password: '',
        });

        const loading = ref(false);
        const error = ref('');
        const router = useRouter();

        const loginUser = async () => {
            loading.value = true;
            error.value = '';
            try {
                const response = await axios.post('http://localhost:3000/auth/login', formData);
                localStorage.setItem('token', response.data.token); // Simpan token di browser
                alert('Login berhasil!');
                router.push('/dashboard'); // Navigasi ke dashboard
            } catch (err: any) {
                error.value = err.response?.data?.error || 'Login gagal';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        return { formData, loginUser, loading, error };
    },
});
</script>

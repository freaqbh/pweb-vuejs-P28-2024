<template>
    <div>
        <h2>Dashboard</h2>
        <p>Selamat datang di dashboard!</p>
        <p>Ini daftar file</p>
        <button @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const logout = () => {
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = '/login'; // Arahkan ke halaman login
        };

        return { logout };
    },
});
</script>

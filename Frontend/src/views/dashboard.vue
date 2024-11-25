<template>
    <div>
        <h2>Dashboard</h2>
        <p>Selamat datang di dashboard!</p>
        <p>Ini daftar file</p>
        
        <!-- Indikator Loading -->
        <div v-if="isLoading">Loading data...</div>

        <!-- Error -->
        <div v-else-if="error">Error: {{ error }}</div>

        <!-- Tampilkan Data -->
        <ul v-else>
            <li v-for="file in files" :key="file.id">{{ file.title }}</li>
        </ul>

        <button @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    setup() {
        const logout = () => {
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = '/login'; // Arahkan ke halaman login
        };

        const files = ref([]); // Menyimpan daftar file
        const isLoading = ref(false); // Indikator loading
        const error = ref<string | null>(null); // Menyimpan error

        const fetchFiles = async () => {
            isLoading.value = true; // Tampilkan indikator loading
            const token = localStorage.getItem('token'); // Ambil token dari localStorage
            console.log(token);
            if (!token) {
                error.value = 'Token tidak ditemukan! Silakan login.';
                isLoading.value = false;
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Sertakan token di header
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
                files.value = await response.json(); // Simpan hasil response ke state
            } catch (err: any) {
                error.value = err.message; // Simpan pesan error
            } finally {
                isLoading.value = false; // Sembunyikan indikator loading
            }
        };

        onMounted(fetchFiles); // Fetch data saat komponen dimount

        return { files, isLoading, error, logout };
    },
    
});
</script>

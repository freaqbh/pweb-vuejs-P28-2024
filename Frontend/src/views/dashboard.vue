<template>
    <div>
        <h2>Dashboard</h2>
        <p>Selamat datang di dashboard!</p>
        <p>Ini daftar file</p>
        
        <!-- Indikator Loading -->
        <div v-if="loading">Loading data...</div>

        <!-- Error -->
        <div v-else-if="error">Error: {{ error }}</div>

        <!-- Tampilkan Data -->
        <div v-else>
            <ul>
                <li v-for="book in books" :key="book._id">
                    <h3>{{ book.title }}</h3>
                    <p>Penulis: {{ book.author }}</p>
                    <p>Publisher: {{ book.publisher }}</p>
                    <p>Rating: {{ book.rating.average }} ({{ book.rating.count }} ulasan)</p>
                    <p>Deskripsi: {{ book.description }}</p>
                    <p>Tag: {{ book.tags.join(', ') }}</p>
                    <img :src="book.coverImage" alt="Cover Image" style="width: 150px; height: auto;" />
                </li>
            </ul>
        </div>

        <button @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
    setup() {
        const logout = () => {
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = '/login'; // Arahkan ke halaman login
        };

        const books = ref([]); // Menyimpan data buku
        const loading = ref(false); // Status loading
        const error = ref<string | null>(null); // Menyimpan error, jika ada

        const fetchBooks = async () => {
            loading.value = true;
            error.value = null;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Silakan login.');
                }

                const response = await axios.get('http://localhost:3000/books', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan token ke header
                    },
                });
                
                console.log('Response data:', response.data); // Debug log
                books.value = response.data.data; // Ambil array "data" dari response
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat data';
                console.error('Error fetching books:', err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchBooks); // Fetch data saat komponen dimuat

        return { books, loading, error, logout };
    },
    
});
</script>

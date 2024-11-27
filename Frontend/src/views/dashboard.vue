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
                    <router-link :to="`/books/${book._id}`">
                        <h3 style="cursor: pointer;">{{ book.title }}</h3>
                    </router-link>
                    <p>Penulis: {{ book.author }}</p>
                    <p>Tag: {{ book.tags.join(', ') }}</p>
                    <button @click="deleteBook(book._id)" style="color: red;">Hapus</button>
                </li>
            </ul>
        </div>

        <!-- Button to go to Add Book Page -->
        <router-link to="/add-book">
            <button>Tambah Buku</button>
        </router-link>

        <!-- Logout Button -->
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

        const deleteBook = async (id: string) => {
            const confirmed = confirm('Apakah Anda yakin ingin menghapus buku ini?');
            if (!confirmed) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Silakan login.');
                }

                await axios.delete(`http://localhost:3000/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('Buku berhasil dihapus!');
            
                books.value = books.value.filter(book => book._id !== id);
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal menghapus buku';
                console.error('Error deleting book:', err);
            }
        };

        onMounted(fetchBooks); // Fetch data saat komponen dimuat

        return { books, loading, error, logout, deleteBook };
    },
    
});
</script>

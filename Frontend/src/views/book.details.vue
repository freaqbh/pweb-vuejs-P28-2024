<template>
    <div>
        <h2>Detail Buku</h2>
        <div v-if="loading">Memuat detail buku...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="book">
            <h3>{{ book.title }}</h3>
            <img :src="book.coverImage" alt="Cover Image" style="width: 150px; height: auto;" />
            <p>Penulis: {{ book.author }}</p>
            <p>Publisher: {{ book.publisher }}</p>
            <p>Rating: {{ book.rating.average }} ({{ book.rating.count }} ulasan)</p>
            <p>Deskripsi: {{ book.description }}</p>
            <p>Tag: {{ book.tags.join(', ') }}</p>
        </div>

        <button @click="back">Back to dashboard</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
    setup() {
        const back = () => {
            window.location.href = '/dashboard';
        };
        const route = useRoute(); // Akses parameter dari route
        const book = ref(null);
        const loading = ref(false);
        const error = ref<string | null>(null);

        const fetchBookDetail = async () => {
            loading.value = true;
            error.value = null;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Silakan login.');
                }
                const { id } = route.params; // Ambil id dari route
                const response = await axios.get(`http://localhost:3000/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan token ke header
                    },
                });
                book.value = response.data.data; // Simpan detail buku
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat detail buku';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchBookDetail); // Fetch detail buku saat komponen dimuat

        return { book, loading, error, back };
    },
});
</script>
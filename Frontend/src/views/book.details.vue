<template>
    <div>
        <h2>{{ book?.title }}</h2>
        <p><strong>Author:</strong> {{ book?.author }}</p>
        <p><strong>Year:</strong> {{ book?.year }}</p>
        <router-link to="/">Back to Home</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Book {
    _id: string;
    title: string;
    author: string;
    year: number;
}

export default defineComponent({
    setup() {
        const route = useRoute();
        const book = ref<Book | null>(null);

        const fetchBook = async () => {
            try {
                const id = route.params.id as string;
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                book.value = response.data;
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        onMounted(fetchBook);

        return { book };
    },
});
</script>

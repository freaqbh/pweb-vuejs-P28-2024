<template>
    <div>
        <h2>Books</h2>
        <ul>
            <li v-for="book in books" :key="book._id">
                <router-link :to="'/book/' + book._id">{{ book.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Book {
    _id: string;
    title: string;
    author: string;
}

export default defineComponent({
    setup() {
        const books = ref<Book[]>([]);

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                books.value = response.data;
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        onMounted(fetchBooks);

        return { books };
    },
});
</script>

<template>
    <div>
        <h1>Library</h1>
        <BookList />
        <router-link to="/add">Add New Book</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookList from '../components/book.list.vue';

export default defineComponent({
    components: { BookList },
});
</script>

<template>
    <div>
      <h1>Add a New Book</h1>
      <BookForm />
    </div>
  </template>
  
  <script>
  import BookForm from "../components/bookform.vue";
  
  export default {
    components: {
      BookForm,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  </style>
  
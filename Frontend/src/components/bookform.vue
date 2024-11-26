<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input v-model="form.title" type="text" id="title" required />
      </div>
  
      <div>
        <label for="author">Author:</label>
        <input v-model="form.author" type="text" id="author" required />
      </div>
  
      <div>
        <label for="publishedDate">Published Date:</label>
        <input v-model="form.publishedDate" type="date" id="publishedDate" required />
      </div>
  
      <div>
        <label for="publisher">Publisher:</label>
        <input v-model="form.publisher" type="text" id="publisher" required />
      </div>
  
      <div>
        <label for="description">Description:</label>
        <textarea v-model="form.description" id="description" rows="4" required></textarea>
      </div>
  
      <div>
        <label for="coverImage">Cover Image URL:</label>
        <input v-model="form.coverImage" type="url" id="coverImage" required />
      </div>
  
      <div>
        <label for="tags">Tags (comma-separated):</label>
        <input v-model="tagsInput" type="text" id="tags" @blur="handleTags" placeholder="e.g. animal,farm,occult" />
      </div>
  
      <div>
        <label for="initialQty">Initial Quantity:</label>
        <input v-model.number="form.initialQty" type="number" id="initialQty" required />
      </div>
  
      <div>
        <label for="qty">Quantity:</label>
        <input v-model.number="form.qty" type="number" id="qty" required />
      </div>
  
      <div>
        <label for="ratingAverage">Rating Average:</label>
        <input v-model.number="form.rating.average" type="number" step="0.1" id="ratingAverage" required />
      </div>
  
      <div>
        <label for="ratingCount">Rating Count:</label>
        <input v-model.number="form.rating.count" type="number" id="ratingCount" required />
      </div>
  
      <button type="submit">Add Book</button>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        form: {
          title: "",
          author: "",
          publishedDate: "",
          publisher: "",
          description: "",
          coverImage: "",
          tags: [],
          initialQty: 0,
          qty: 0,
          rating: {
            average: 0,
            count: 0,
          },
        },
        tagsInput: "",
      };
    },
    methods: {
      handleTags() {
        this.form.tags = this.tagsInput.split(",").map(tag => tag.trim());
      },
      async submitForm() {
        try {
          // Get the raw token string from localStorage
          const tokenData = localStorage.getItem("token");
  
          // Check if token exists
          if (!tokenData) {
            alert("Authorization token not found.");
            return;
          }
  
          let token;
          try {
            // Attempt to parse the token if it's stored as a JSON string (e.g., array of tokens)
            const tokens = JSON.parse(tokenData);
  
            // Ensure the tokens array is not empty and retrieve the last token
            if (Array.isArray(tokens) && tokens.length > 0) {
              token = tokens[tokens.length - 1];
            } else {
              // If the data isn't in the expected array format, use the token directly
              token = tokenData; // Treat it as a plain token string
            }
          } catch (error) {
            // Handle the case where token data is not valid JSON
            token = tokenData; // Treat as a plain token string if JSON parsing fails
          }
  
          // Ensure token is valid
          if (!token) {
            alert("Invalid token.");
            return;
          }
  
          // Set Authorization header with the last token
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          // Send POST request with the config
          await axios.post("http://localhost:3000/books", this.form, config);
  
          alert("Book added successfully!");
          this.resetForm();
        } catch (error) {
          console.error("Error adding book:", error);
  
          // Check if the error is related to the request
          if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
            alert(`Failed to add book. Server responded with: ${error.response.status} - ${error.response.data.message || error.response.data}`);
          } else if (error.request) {
            console.error("No response received:", error.request);
            alert("Failed to add book. No response from the server.");
          } else {
            console.error("Error message:", error.message);
            alert(`Failed to add book. Error: ${error.message}`);
          }
        }
      },
      resetForm() {
        this.form = {
          title: "",
          author: "",
          publishedDate: "",
          publisher: "",
          description: "",
          coverImage: "",
          tags: [],
          initialQty: 0,
          qty: 0,
          rating: {
            average: 0,
            count: 0,
          },
        };
        this.tagsInput = "";
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input,
  textarea,
  button {
    padding: 0.5rem;
    font-size: 1rem;
  }
  </style>
  
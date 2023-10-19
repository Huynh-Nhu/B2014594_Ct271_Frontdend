<template>
  <main>
    <div>
      <h2>Create Category</h2>
      <form @submit.prevent="createCategory">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
          <!-- <div v-if="nameExists" class="error-message">Tên loại đã tồn tại.</div> -->
        </div>
        <div>
          <span class="d-block">{{ message }}</span>

          <button type="submit">Create Category</button>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async createCategory() {
      try {
        const formData = new FormData()
        formData.append('name', this.name)
        const response = await axios.post('http://localhost:3000/category/create', formData)
        this.message = response.data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

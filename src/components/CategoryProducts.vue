<template>
  <div>
    <h2>Thêm sản phẩm</h2>
    <form @submit.prevent="addProduct">
      <label for="category">Chọn sản phẩm:</label>
      <select v-model="selectedCategory" id="category">
        <option v-for="category in categories" :value="category.id" :key="category.id">
          {{ category.name }}
        </option>
      </select>

      <div>
        <label for="name">Tên sản phẩm:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="image">Hình ảnh:</label>
        <input type="file" id="file" name="image" accept="*" />
      </div>
      <div>
        <label for="sizes">Kích thước và giá tiền:</label>
        <div id="sizes">
          <div class="size-input">
            <input type="text" name="sizeS" placeholder="Size S" required />
            <input type="text" name="sizeM" placeholder="Size M" required />
          </div>
        </div>
        <!-- {{!-- <button type="button" id="add-size">Thêm kích thước</button> --}} -->
      </div>
      <div>
        <label for=" details">Thông tin chi tiết:</label>
        <textarea id="details" name="details"></textarea>
      </div>
      <button type="submit">Thêm sản phẩm</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      name: '',
      image: '',
      sizeS: '',
      SizeM: '',
      details: ''
    }
  },
  methods: {
    async addProduct() {
      try {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('image', this.image)
        formData.append('sizeS', this.sizeS)
        formData.append('sizeM', this.sizeM)
        formData.append('details', this.details)

        const response = await axios.post('http://localhost:3000/category/${this.selectedCategory}/products', formData)
        this.message = response.data
      } catch (err) {
        console.error('Error adding product:', error)
      }
    }
  }
}
</script>

<template>
  <div>

    <h2>Thêm sản phẩm {{ categoryName }}</h2>
    <form @submit.prevent="addProduct" enctype="multipart/form-data">
      <div>
        <label for="name">Tên sản phẩm:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="image">Hình ảnh:</label>
        <input type="file" ref="fileInput" id="file" @change="handleFile" accept="*" />
        <img :src="newImage" alt="" width="100" height="100" />
      </div>
      <div>
        <label for="sizes">Kích thước và giá tiền:</label>
        <div id="sizes">
          <div class="size-input">
            <input type="text" v-model="sizeS" placeholder="Size S" required />
            <input type="text" v-model="sizeM" placeholder="Size M" required />
          </div>
        </div>
        <!-- {{!-- <button type="button" id="add-size">Thêm kích thước</button> --}} -->
      </div>
      <div>
        <label for=" details">Thông tin chi tiết:</label>
        <textarea id="details" v-model="details"></textarea>
      </div>
      <button type="submit"> Thêm Sản Phẩm Mới</button>
    </form>
    <router-link :to="`/listCate/${categoryId}`">Quay lại danh sách sản phẩm</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      newImage: '',
      categoryName: '',
      categoryId: '',
      name: '',
      file: null,
      sizeS: '',
      sizeM: '',
      details: ''
    }
  },

  created() {
    this.categoryId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    this.fetchCategory()
  },
  methods: {
    fetchCategory() {
      axios
        .get(`http://localhost:3000/category/${this.categoryId}`)
        .then((response) => {
          this.categoryName = response.data.name
          console.log(response.data.name)
        })
        .catch((error) => {
          console.log(error)
          console.error('Error fetching category:', error)
        })
    },
    async handleFile(event) {
      this.file = this.$refs.fileInput.files[0]
      const file = event.target.files[0]

      const Read = new FileReader()
      Read.onload = async () => {
        this.newImage = await Read.result
      }
      Read.readAsDataURL(file)
    },
    async addProduct() {
      try {
        const formData = new FormData()
        formData.append('categoryId', this.categoryId)
        formData.append('name', this.name)
        formData.append('image', this.file)
        formData.append('sizeS', this.sizeS)
        formData.append('sizeM', this.sizeM)
        formData.append('details', this.details)
        console.log(this.file)
        // const categoryId = this
        const response = await axios.post(
          `http://localhost:3000/category/${this.categoryId}/products`,
          formData
        )
         // Reset các giá trị form fields
        this.name = ''
        this.newImage = ''
        this.sizeS = ''
        this.sizeM = ''
        this.details = ''

        // Tạo một giá trị ngẫu nhiên cho ref input file
        this.$refs.fileInput.value = ''
        this.$refs.fileInput.dispatchEvent(new Event('input'))
         // Redirect đến trang danh sách sản phẩm
        this.$router.push(`/listCate/${this.categoryId}/products`)
        this.message = response.data
      } catch (err) {
        console.log(err)
      }
    }
   
  }
}
</script>

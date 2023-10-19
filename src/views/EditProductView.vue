<template>
  <div>
    <h2>Sửa thông tin của sản phẩm</h2>
  </div>
  <form @submit.prevent="updateProduct" enctype="multipart/form-data">
    <div>
      <label for="name">Tên sản phẩm:</label>
      <input type="text" id="name" v-model="products.name" required />
    </div>
    <div>
      <label for="image">Hình ảnh:</label>
      <!-- <img v-bind:src="'/img/products/' + image.name" alt="" width="100" height="100" /> -->
      <input type="file" ref="fileInput" id="file" @change="handleFile" accept="*" />
      <!-- <img src="" alt=""> -->
    </div>
    <div>
      <label for="sizes">Kích thước và giá tiền:</label>
      <div id="sizes">
        <div class="size-input">
          <input type="text" v-model="products.sizeS" placeholder="Size S" required />
          <input type="text" v-model="products.sizeM" placeholder="Size M" required />
        </div>
      </div>
    </div>
    <div>
      <label for=" details">Thông tin chi tiết:</label>
      <textarea id="details" v-model="products.details"></textarea>
    </div>
    <button type="submit">Cập nhật sản phẩm</button>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      products: [],
      file: null
    }
  },
  created() {
    this.productId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    console.log('id san pham url', this.productId)
    this.fetchGetProduct()
  },
  methods: {
    async fetchGetProduct() {
      axios.get(`http://localhost:3000/product/${this.productId}`).then((response) => {
        this.products = response.data
        console.log('Cateory', this.products.category)
      })
    },
    async updateProduct() {
      try {
        // Tạo một FormData object để gửi dữ liệu sản phẩm và tệp ảnh đến máy chủ
        if (this.products.category) {
          const formData = new FormData();
          formData.append('name', this.products.name);
          formData.append('sizeS', this.products.sizeS);
          formData.append('sizeM', this.products.sizeM);
          formData.append('details', this.products.details);
          axios
            .put(`http://localhost:3000/product/${this.productId}/edit`, this.products)
            .then((response) => {
              this.products = response.data
                 console.log(response);
            })
            .catch((error) => {
              console.log(error)
            })
          console.log("this.products._id",this.products._id);
          console.log("this.productId",this.productId);
          

          // if(this.products._id === this.productId ){
            // Kiểm tra xem người dùng đã chọn tệp ảnh mới hay chưa
             if (this.file) {
              formData.append('image', this.file); // Thêm tệp ảnh vào FormData
            }
            if(this.file){
              const formDataImage = new FormData();
              formDataImage.append('image', this.file);
              await axios.put(`http://localhost:3000/product/${this.productId}/upimg`, formDataImage ).then((response) => {
                this.file = response.data
               console.log(this.file);
               console.log(response.data);

              }
              ) .catch((err) => {
                console.log(err);
              });
            // }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    

    async handleFile(event) {
      this.file = event.target.files[0]
    }
  }
}
</script>

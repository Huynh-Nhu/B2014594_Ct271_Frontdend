<template>
  <headerAdminVue></headerAdminVue>
  hien danh sach san pham
  <br />
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Tên sản phẩm</th>
        <th scope="col">Hình Ảnh</th>
        <th scope="col">SizeS</th>
        <th scope="col">SizeM</th>
        <th scope="col">thông tin sản phẩm</th>
        <th scope="col">Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product._id">
        <td>{{ product.name }}</td>

        <td>
          <img
            v-for="image in product.images"
            :key="image._id"
            v-bind:src="'/public/img/products/' + image.name"
            alt=""
            width="100"
            height="100"
          />
        </td>
        <td>{{ product.sizeS }}</td>
        <td>{{ product.sizeM }}</td>
        <td>{{ product.details }}</td>
        <td>
          <button><router-link :to="'/editProduct/' + product._id"> Sửa</router-link></button>
        </td>
        <td>
          <button @click="deleteProduct(product._id)">Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>

  <RouterLink :to="'/listCate/' + this.categoryId + '/products'">Them san pham</RouterLink>
</template>
<script>
import headerAdminVue from '../components/HeaderAdmin.vue'

import axios from 'axios'
// import hinh from '../'
export default {
  data() {
    return {
      categories: [],
      products: []
      // image: ''
    }
  },
  components:{
    headerAdminVue,
  },
  created() {
    this.categoryId = this.$route.params.id // Lấy ID từ URL và gán cho biến categoryId
    this.fetchShowProduct()
    this.fetchShowImage()
  },
  methods: {
    async fetchShowProduct() {
      try {
        const productAll = {}
        axios
          .get('http://localhost:3000/product/home')
          .then((response) => {
            response.data.map((product) => {
              // console.log(product.category);
              if (product.category === this.categoryId) {
                // console.log(product);
                productAll[product._id] = product
              }
              this.products = Object.values(productAll)
              console.log('productAll', productAll)
            })

            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchShowImage() {
      try {
        const response = await axios.get('http://localhost:3000/product/img')
        const images = response.data
        console.log(' img.nameProduct', response.data)

        this.products.forEach((product) => {
          console.log(' product._id', product._id)
          const productImages = images.filter((img) => img.nameProduct === product._id)
          if (productImages) {
            console.log('productImages', productImages)
          }
          product.images = productImages
          // console.log(" product.images", product.images);
          // console.log(" img.nameProduct", img.nameProduct);
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteProduct(productId) {
      console.log('id san pham ', productId)
      try {
        await axios.delete(`http://localhost:3000/product/${productId}`)
        // Xóa thành công, tải lại trang
        this.fetchShowProduct()
        this.fetchShowImage()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

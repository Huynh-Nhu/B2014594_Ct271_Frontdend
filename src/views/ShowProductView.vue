<template>
  <headerAdminVue></headerAdminVue>

  <h2 class="text-name-admin">Danh Sách Sản Phẩm</h2>
  <div class="back">
    <router-link to="/listCate" class=""
      ><i class="fa fa-arrow-left" aria-hidden="true"></i
    ></router-link>
  </div>

  <table class="table text-center">
    <thead>
      <tr>
        <th scope="col">STT</th>

        <th scope="col">Tên sản phẩm</th>
        <th scope="col">Hình Ảnh</th>
        <th scope="col">Size S</th>
        <th scope="col">Size M</th>
        <th scope="col">thông tin sản phẩm</th>
        <th scope="col">Edit</th>
        <th scope="col">Removed</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product._id">
        <td>{{ index + 1 }}</td>
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
          <button class="btn-edit btn">
            <router-link :to="'/editProduct/' + product._id">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>
          </button>
        </td>
        <td>
          <button class="btn-edit btn" @click="deleteProduct(product._id)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-center next-add mt-5">
    <RouterLink :to="'/listCate/' + this.categoryId + '/products'">Thêm sản phẩm</RouterLink>
  </div>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],
      products: []
    }
  },
  components: {
    headerAdminVue
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
            this.fetchShowImage()
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

<style>
.btn-edit {
  font-size: 25px;
  color: rgba(196, 59, 59, 0.734);
}
.btn-edit a {
  font-size: 25px;

  text-decoration: none;
  color: rgb(120, 204, 219);
  padding: 10px;
}
.btn-edit a:hover {
  color: black;
}
.next-add a {
  text-decoration: none;
  font-size: 17px;
  text-transform: uppercase;
  color: black;
  background-color: rgba(185, 160, 97, 0.853);
  padding: 10px;
  border: 5px solid rgba(53, 51, 51, 0.241);
  border-radius: 25px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.318);
}
</style>

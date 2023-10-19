<template>
  <headerVue></headerVue>
  <main>
    <div class="container my-2">
      <div class="row d-flex">
        <div class="col-md-6">
          <img
            class="img-product"
            :src="'/img/products/' + product.imageData"
            alt=""
            style="width: 100%; "
          />
        </div>
        <div class="col-md-6 infor-product">
          <h1>{{ product.name }}</h1>

          <button class="btn btn-size" @click="selectSize('S')">S</button>
          <button class="btn btn-size" @click="selectSize('M')">M</button>
          

          <div v-if="selectedSize === 'S' || selectedSize === 'M'">
            <div class="quantity-container" v-if="selectedSize === 'S'">
              <button class="quantity-button" @click="decreaseQuantity('S')">-</button>
              <div class="quantity">{{ quantityS }}</div>
              <button class="quantity-button" @click="increaseQuantity('S')">+</button>
            </div>
            <div class="quantity-container" v-if="selectedSize === 'M'">
              <button class="quantity-button" @click="decreaseQuantity('M')">-</button>
              <div class="quantity">{{ quantityM }}</div>
              <button class="quantity-button" @click="increaseQuantity('M')">+</button>
            </div>
          </div>

          <p v-if="selectedSize === 'S'">Tổng giá tiền (S): {{ totalPriceS }}</p>
          <p v-if="selectedSize === 'M'">Tổng giá tiền (M): {{ totalPriceM }}</p>
          <p>Thông Tin: {{ product.details }}</p>
          <textarea v-model="customerNote" placeholder="Ghi chú cho khách hàng"></textarea>
          <button @click="addCart(product._id)">Thêm Sản Phẩm</button>
        </div>
        <!-- <p v-else style="color: red">Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!</p> -->
        <div v-if="showMessage" class="alert alert-light" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>

<script>
import {useCartStore} from '../stores/counter'
import { useRouter } from 'vue-router'
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'

import axios from 'axios'
export default {
  data() {
    return {
      product: {},
      quantityS: 1,
      quantityM: 1,
      selectedSize: null,
      priceS: '',
      priceM: '',
      customerNote: '',
      message: '',
      showMessage: false // Thêm dòng này để khởi tạo giá trị ban đầu cho showMessage
    }
  },
  created() {
    const productId = this.$route.params.id
    this.GetOneProduct(productId)
  },
  methods: {
    async GetOneProduct(productId) {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`)
        this.product = response.data
        this.priceS = this.product.sizeS
        this.priceM = this.product.sizeM
        // console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    selectSize(size) {
      this.selectedSize = size
    },
    increaseQuantity(size) {
      if (size === 'S') {
        this.quantityS++
      } else if (size === 'M') {
        this.quantityM++
      }
    },
    decreaseQuantity(size) {
      if (size === 'S' && this.quantityS > 1) {
        this.quantityS--
      } else if (size === 'M' && this.quantityM > 1) {
        this.quantityM--
      }
    },
     async addCart(productId) {
      const cartStore = useCartStore();
      console.log(sessionStorage.getItem('id'))
      if (this.loginOn) {
        if (this.selectedSize) {
          const productAddCart = {
            idUser: sessionStorage.getItem('id'),
            idProduct: productId,
            name: this.product.name,
            image: this.product.imageData,
            size: this.selectedSize,
            note: this.customerNote,
            priceSize: this.selectedSize === 'S' ? this.priceS : this.priceM,

            quantity: this.selectedSize === 'S' ? this.quantityS : this.quantityM,
            price: this.selectedSize === 'S' ? this.totalPriceS : this.totalPriceM
          }
          await axios.post('http://localhost:3000/cart/add', productAddCart).then((response) => {
            console.log(response.data)
            this.message = 'thêm sản phẩm thành công'
            this.showMessage = true
            setTimeout(() => {
              this.showMessage = false
            }, 500)
            cartStore. incrementCartQuantity();
          })
        } else {
          this.message = 'Vui chon size của sản phẩm '
          this.showMessage = true
          setTimeout(() => {
              this.showMessage = false
            }, 500)
        }
      } else {
        // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
        this.$router.push('/login') // Điều hướng đến trang đăng nhập
      }
    }
  },
  components: {
    headerVue,
    footerVue
  },
  computed: {
    totalPriceS() {
      const total = this.quantityS * this.priceS
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    totalPriceM() {
      const total = this.quantityM * this.priceM
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    loginOn() {
      const phone = sessionStorage.getItem('phone')
      return phone
    }
  }
}
</script>

<style>
.img-product {
  background-color: rgb(17, 68, 60);
  border: 5px solid #c4c89f;
  border-radius: 25px;
}

.quantity-container {
  display: flex;
  align-items: center;
}

.quantity-button {
  border: none;
  background-color: lightgray;
  padding: 5px 10px;
  cursor: pointer;
}

.quantity {
  margin: 0 10px;
  font-weight: bold;
}
.btn-size{
  background-color: #c4c89f;
  padding:2px 50px;
  margin-right: 50px;
}
.btn-size:hover{
  background-color: #0e4e49;
  color:aliceblue;
}

</style>

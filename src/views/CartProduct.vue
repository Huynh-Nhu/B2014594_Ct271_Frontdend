<template>
  <headerVue></headerVue>
  <main class="cart-main">
    <div>
      <h1 class="cart">Cart</h1>
      <div class="row cart-content">
       
        <div class="col-sm-3 col-md-3 col-lg-3 col-xxl-3 cart-full">
          <div class="cart-detail">

            <h3 class="cart-name" style="text-align: center">Thông tin</h3>
            <p class="cart-name">Tên khách hàng:</p>
  
            <p class="cart-user">{{ nameUser }}</p>
            <p class="cart-name">Số điện thoại khách hàng:</p>
  
            <p class="cart-user">{{ phoneNumber }}</p>
            <p class="cart-name">Địa chỉ khách hàng</p>
            <textarea
              v-model="localUser"
              id=""
              cols="12"
              rows="3"
              placeholder="Nhâp địa chỉ "
              @input="validateAddress"
              class="form-control mb-5"
            ></textarea>
            <div class="btn-order">
              <button class="btn btn-order-children" @click="placeOrder">Đặt hàng</button>
  
            </div>
          </div>
        </div>
        <div class="col-sm-8 col-md-8 col-lg-8 col-xxl-8 table-full">
          <div class="row">
            <table class="table table-cart  table-striped">
              <thead>
                <tr>
                  <th scope="col">Thao Tác</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Size</th>
                  <th scope="col">Số lượng đặt</th>
                  <th scope="col">Tổng số lượng</th>
                  <th scope="col">Giá Gốc</th>
                  <th scope="col">Thành Tiền</th>
                  <th scope="col">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in carts" :key="cart._id">
                  <td>
                    <button class="btn" @click="removeCart(cart)"><i class="ti-close"></i></button>
                  </td>

                  <td style="text-transform: uppercase" scope="row">{{ cart.name }}</td>
                  <td>
                    <img :src="'/public/img/products/' + cart.image" alt="" style="width: 150px" />
                  </td>
                  <td>{{ cart.size }}</td>
                  <td>{{ cart.quantity }}</td>
                  <td class="">
                    <div class="d-flex">
                      <button class="btn btn-quantity" @click="decrementQuantity(cart)">-</button>
                      {{ cart.quantity }}
                      <button class="btn btn-quantity" @click="incrementQuantity(cart)">+</button>
                    </div>
                  </td>
                  <td>{{ cart.priceSize }}</td>
                  <td>{{ cartPriceOne(cart) }}</td>
                  <td>{{ cart.note }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  
                  <td colspan="6"></td>
                  <!-- <td>
                    <button @click="placeOrder">Đặt hàng</button>
                  </td> -->
                  <td>Tổng đơn hàng:</td>
                  <td colspan="6">
                    {{ cartPriceAll() }}
                  </td>
                 

                  
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="cart-none col-sm-8 col-md-8">
          <div class="row">
            <div class="card" style="width: fit-content; text-align: center">
              <div class="card-body">
                <h5 class="card-title">Thông tin sản phẩm</h5>
                <div v-for="cart in carts" :key="cart._id" class="card">
                  <div class="card-body row cart-inf">
                    <div class="col-sm-2">
                      <button class="btn" @click="removeCart(cart)">
                        <i class="ti-close"></i>
                      </button>
                    </div>
                    <div class="col-sm-3">
                      <h6 class="card-subtitle mb-2 text-muted">{{ cart.name }}</h6>
                      <img :src="'/public/img/products/' + cart.image" alt="" style="width: 100%" />
                    </div>
                    <div class="col-sm-7">
                      <div class="row d-flex mx-1">
                        <p class="card-text">Size: {{ cart.size }}</p>
                        <p class="card-text mx-1">Số lượng đặt: {{ cart.quantity }}</p>
                        <div class="mx-1">
                          <button class="btn btn-quantity" @click="decrementQuantity(cart)">
                            -
                          </button>
                          {{ cart.quantity }}
                          <button class="btn btn-quantity" @click="incrementQuantity(cart)">
                            +
                          </button>
                        </div>
                        <p class="card-text mx-1">Giá Gốc: {{ cart.priceSize }}</p>
                        <p class="card-text mx-1">Thành Tiền: {{ cartPriceOne(cart) }}</p>
                        <p class="card-text mx-1">Ghi chú: {{ cart.note }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Tổng đơn hàng:</h6>
                    <p class="card-text">{{ cartPriceAll() }}</p>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footerVue></footerVue>
</template>

<script>
import { useCartStore } from '../stores/counter'
import moment from 'moment'
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'

import axios from 'axios'
export default {
  data() {
    return {
      carts: [],
      nameUser: '',
      phoneNumber: '',
      localUser: '',
      isAddLocal: false
    }
  },
  components: {
    headerVue,
    footerVue
  },
  mounted() {
    this.nameUser = sessionStorage.getItem('name')
    this.phoneNumber = sessionStorage.getItem('phone')
  },
  created() {
    this.showCart()
  },
  methods: {
    async showCart() {
      const idUser = sessionStorage.getItem('id')
      const cartUser = []
      axios.get('http://localhost:3000/cart/show').then((response) => {
        response.data.map((carts) => {
          if (carts.idUser === idUser) {
            console.log(idUser)
            // cartUser[carts._id] = carts
            cartUser.push(carts)
          }
          this.carts = cartUser
        })
      })
    },
    validateAddress() {
      if (this.localUser.trim() !== '') {
        this.isAddLocal = true
      } else {
        this.isAddLocal = false
      }
    },
    async placeOrder() {
      if (!this.isAddLocal) {
        alert('Vui lòng nập địa chỉ trước khi đặt hàng')
        return
      } else {
        const idUser = sessionStorage.getItem('id')
        const dayOrder = moment().format('DD-MM-YYYY HH:mm:ss')

        const status = 'Pending'
        const orderDetails = this.carts.map((cart) => ({
          idProduct: cart.idProduct,
          quantityProduct: cart.quantity,
          priceAll: (cart.priceSize * cart.quantity).toLocaleString('vi-VN', {
            minimumFractionDigits: 3
          }),
          localUser: this.localUser,
          note: cart.note
        }))
        console.log(orderDetails.idProduct)
        console.log(orderDetails)
        const orderData = { idUser, dayOrder, status, orderDetails }
        console.log('orderData', orderData)
        try {
          await axios.post('http://localhost:3000/order/', orderData).then((response) => {
            console.log(this.carts)
          })
          this.clear()
          this.carts = []
          // this.$router.push('/cart')
        } catch (err) {
          console.log(err)
        }
      }
    },
    incrementQuantity(cart) {
      cart.quantity++
    },
    decrementQuantity(cart) {
      if (cart.quantity != 0) {
        cart.quantity--
      }
    },
    cartPriceOne(cart) {
      const money = cart.priceSize * cart.quantity
      return money.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    cartPriceAll() {
      let total = 0
      this.carts.forEach((cart) => {
        total += cart.priceSize * cart.quantity
      })
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    async removeCart(cart) {
      // const cartStore = useCartStore();

      console.log('Cart', cart._id)
      try {
        axios.delete(`http://localhost:3000/cart/show/${cart._id}`)
        const index = this.carts.findIndex((item) => item._id === cart._id) // tim vi tri của mảng cần xóa trong code dựa theo id
        if (index !== -1) {
          this.carts.splice(index, 1) // Xóa sản phẩm khỏi mảng carts
          // cartStore. decrementCartQuantity();
        }
      } catch (err) {
        console.log(err)
      }
    },
    async clear() {
      const userId = sessionStorage.getItem('id')
      const cartId = this.carts.map((cart) => cart._id)
      console.log(cartId)
      axios.delete(`http://localhost:3000/cart/${userId}`).then((response) => {})
    }
  }
}
</script>

<style>
.cart-main {
  background-color: #2f6451;
}
.cart {
  text-align: center;
  background-color: black;
  color: rgb(255, 255, 255);
  border-top: solid 5px white;
  border-bottom: solid 5px white;
}
.cart-full {
  border: 2px solid white;
  padding: 30px;
  border-radius: 25px;
  margin: 25px;
  background: url('public/img/png/ve-dep-cua-doi-che-o-phu-tho-duoc-giai-anh-quoc-te-gioi-thieu-1544156909.png') top center / cover no-repeat ;
}
.cart-detail{
  background-color: #fff9f9;
  opacity: 0.9;
  padding: 25px;
  border-radius: 25px;
}
.cart-name {
  color: rgb(0, 0, 0);
}

.cart-user {
  font-size: 15px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 25px;
  text-align: center;
  padding:  10px 0;
  color: rgb(0, 0, 0);
}

.table-cart {
  padding: 0;
  margin-top: 25px;
}

.btn-quantity {
  border-radius: 100%;
  margin: 0 10px;
}
.btn-quantity:hover {
  background-color: rgb(99, 152, 111);
}
.table-full {
  width: fit-content;
  text-align: center;
}
.cart-inf {
  width: fit-content;
}
.cart-none {
  display: none;
}
.btn-order{
  text-align: center;
}
.btn-order-children{
  background-color: #c4c89f ;
  color: rgb(0, 0, 0);
  border: #fff9f9 solid 2px;
}
.btn-order-children:hover{
  color: #ffffff;
  background-color:#10cc87;
  border: #fff9f9 solid 2px;

}
@media screen and (max-width: 1415px) {
  .table-full {
    display: none;
  }
  .cart-none {
    display: block;
  }
}
</style>

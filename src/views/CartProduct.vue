<template>
  <div>
    <h1>Cart</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Size</th>
          <th scope="col">Quantity</th>
          <th scope="col">Quantity</th>

          <th scope="col">Giá Gốc</th>
          <th scope="col">Thành Tiền</th>
          <th scope="col">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts" :key="cart._id">
          <td scope="row">{{ cart.name }}</td>
          <td><img :src="'/public/img/products/' + cart.image" alt="" style="width: 100px" /></td>
          <td>{{ cart.size }}</td>
          <td>{{ cart.quantity }}</td>
          <td>
            <button @click="decrementQuantity(cart)">-</button>
            {{ cart.quantity }}
            <button @click="incrementQuantity(cart)">+</button>
          </td>
          <td>{{ cart.priceSize }}</td>
          <td>{{ cartPriceOne(cart) }}</td>
          <td>{{ cart.note }}</td>
          <button @click="removeCart(cart)"><i class="ti-close"></i></button>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5"></td>
          <td>Tổng đơn hàng:</td>
          <td>
            {{ cartPriceAll() }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import {useCartStore} from '../stores/counter'

import axios from 'axios'
export default {
  data() {
    return {
      carts: []
      ,
    }
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
    incrementQuantity(cart) {
      cart.quantity++
    },
    decrementQuantity(cart) {
      cart.quantity--
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
    }
  }
}
</script>

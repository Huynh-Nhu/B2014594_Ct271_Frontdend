<template>
  <headerAdminVue></headerAdminVue>

  <div class="text-center">
    <table class="table table-bordered">
      <div v-if="showMessage" class="alert text-center" role="alert">
        {{ message }}
      </div>
      <thead class="table-dark">
        <tr>
          <th scope="col">Tên khách hàng</th>
          <th scope="col">Chi tiết đơn hàng</th>
          <th scope="col">Tổng số lượng</th>
          <th scope="col">Tổng Hóa Đơn</th>
          <th scope="col">Ngày đặt đơn</th>
          <th scope="col">Địa Chỉ</th>
          <th scope="col">Ghi Chú</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ngày giao</th>

          <th scope="col">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order._id">
          <td>{{ order.user.name }}</td>
          <td>
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Size</th>
                  <th>Số Lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="detail in order.orderDetail" :key="detail._id">
                  <td>{{ detail.product.name }}</td>
                  <td>
                   {{ sizeProduct(order.orderDetail) }}
                  </td>
                  <td>{{ detail.quantityProduct }}</td>
                  <td>{{ detail.priceAll }}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>{{ calculateTotalQuantity(order.orderDetail) }}</td>
          <td>{{ calculateTotalPrice(order.orderDetail) }}</td>
          <td>{{ order.order.dayOrder }}</td>
          <td>{{ getOrderAddress(order.orderDetail) }}</td>
          <td>{{ getOrderNote(order.orderDetail) }}</td>
          <td>{{ order.order.status }}</td>
          <td v-if="order.order.status === 'Đã giao'">{{ order.order.dayCurrent }}</td>
          <td v-else>Chưa xác nhận</td>
          <td>
            <button
              v-if="order.order.status !== 'Đã giao'"
              class="btn btn-dark"
              @click="updateOrderStatus(order.order._id, 'Đã giao')"
            >
              Xác Nhận Đơn
            </button>
            <div v-else class="">
              <p>Đơn đã xác nhận</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'

export default {
  data() {
    return {
      orders: [],
      currentDate: '',
      message: '',
      showMessage: false
    }
  },
  components: {
    headerAdminVue
  },
  created() {
    this.fetchOrders()
    this.getOrder5s()
  },

  methods: {
    async fetchOrders() {
      try {
        await axios
          .get('http://localhost:3000/order/show')
          .then((response) => {
            this.orders = response.data
              .filter((order) => order.order && order.order.dayOrder)
              .sort((a, b) => {
                //sắp hóa đơn có ngày giảm dần
                if (a.order.dayOrder > b.order.dayOrder) {
                  return -1
                } else if (a.order.dayOrder < b.order.dayOrder) {
                  return 1
                }
                return 0
              })
            console.log(this.orders)
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (err) {
        console.log(err)
      }
    },
    async getOrder5s() {
      while (true) {
        await this.fetchOrders()
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Chờ 5 giây trước khi gọi lại fetchOrders
      }
    },
    calculateTotalQuantity(orderDetail) {
      let totalQuantity = 0
      for (const detail of orderDetail) {
        totalQuantity += parseInt(detail.quantityProduct) //chuyen lieu dl tu string sang so de tinh;
      }
      return totalQuantity
    },
    sizeProduct(orderDetail) {
      let size = null
      for (const detail of orderDetail) {
        const price = parseInt(detail.priceAll.replace(/,/g, ' '), 10)
        const quantity = parseInt(detail.quantityProduct)
        if (price / quantity ===  parseInt(detail.product.sizeS)) {
          size = 'S'
        } else {
          size = 'M'
        }
      }
      return size
    },

    calculateTotalPrice(orderDetail) {
      let totalPrice = 0
      for (const detail of orderDetail) {
        totalPrice += parseInt(detail.priceAll) // Giả sử giá tiền sản phẩm lưu trong thuộc tính 'price'
      }
      return totalPrice.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    getOrderAddress(orderDetail) {
      for (const detail of orderDetail) {
        // console.log(detail.localUser)
        return detail.localUser
      }
    },
    getOrderNote(orderDetail) {
      for (const detail of orderDetail) {
        return detail.note
      }
    },
    async updateOrderStatus(orderId, status) {
      const dayCurrent = moment().format('DD-MM-YYYY HH:mm:ss')
      try {
        const response = await axios.put(`http://localhost:3000/order/update/${orderId}`, {
          status,
          dayCurrent: dayCurrent
        })
        const updateOrder = response.data.order
        this.message = 'Cập nhật sau 5 s'
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 500)
        const orderIndex = this.orders.findIndex((order) => order.order._id === updateOrder._id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].order.status = updateOrder.status
          this.orders[orderIndex].currentDate = updateOrder.dayCurrent
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

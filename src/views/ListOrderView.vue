<template>
    <headerAdminVue></headerAdminVue>

  <div class="text-center">
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th  scope="col">Tên khách hàng</th>
          <th  scope="col" >Chi tiết đơn hàng</th>
          <th  scope="col" >Tổng số lượng</th>
          <th  scope="col" >Tổng Hóa Đơn</th>
          <th  scope="col" >Ngày đặt đơn</th>
          <th  scope="col" >Địa Chỉ</th>
          <th  scope="col" >Ghi Chú</th>
          <th  scope="col" >Trạng thái</th>
          <th  scope="col" >Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order._id">
          <td>{{ order.user.name }}</td>
          <td>
            <table class="table  ">
              <thead class="table-secondary">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số Lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="detail in order.orderDetail" :key="detail._id">
                  <td>{{ detail.product.name }}</td>
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
          <td>
            <button class="btn btn-dark" @click="updateOrderStatus(order.order._id, 'Đã giao')">
              Xác Nhận Đơn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'

export default {
  data() {
    return {
     
      orders: [],
     
    }
  },
  components: {
    headerAdminVue
  },
  mounted() {
    this.fetchOrders()
  },

  methods: {
    fetchOrders() {
      axios
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
          // console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    calculateTotalQuantity(orderDetail) {
      let totalQuantity = 0
      for (const detail of orderDetail) {
        totalQuantity += parseInt(detail.quantityProduct) //chuyen lieu dl tu string sang so de tinh;
      }
      return totalQuantity
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
      await axios
        .put(`http://localhost:3000/order/update/${orderId}`, { status })
        .then((response) => {
          const updateOrder = response.data.order
          console.log(updateOrder)
          // const orderIndex = this.orders.findIndex(order => order.orderId === updateOrder._id);
          // console.log(order);
          // if(orderIndex !== -1){
          //   this.orders.splice(orderIndex, 1 , updateOrder);
          // }
          console.log(response.data)
        })
      this.fetchOrders()
    },
    
  }
}
</script>

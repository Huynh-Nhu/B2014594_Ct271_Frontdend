<template>
    <div>
      <h1>Đăng ký tài khoản admin</h1>
      <form @submit.prevent="registerAdmin">
        <div>
          <label for="name">Họ và tên:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div>
          <label for="phone">Số điện thoại:</label>
          <input type="text" id="phone" v-model="formData.phone" required>
        </div>
        <div>
          <label for="position">Vị trí:</label>
          <input type="text" id="position" v-model="formData.position" required>
        </div>
        <div>
          <label for="address">Địa chỉ:</label>
          <input type="text" id="address" v-model="formData.address" required>
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          phone: '',
          position: '',
          address: '',
          password: ''
        }
      }
    },
    methods: {
      registerAdmin() {
        axios.post('http://localhost:3000/admin/create', this.formData)
          .then(response => {
            // Xử lý kết quả đăng ký thành công
            console.log(response.data); // In ra thông báo thành công hoặc thông tin người dùng đã đăng ký
          })
          .catch(error => {
            // Xử lý lỗi đăng ký
            console.log(error);
          });
      }
    }
  }
  </script>
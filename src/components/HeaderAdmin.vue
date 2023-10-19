<template>
  <main>
    <ul class="use-menu d-flex">
      <h1 v-if="loginOn">{{ name }}</h1>

      <router-link v-if="loginOn" @click="logoutUser" to="/">Logout</router-link>
      <router-link v-if="!loginOn" to="/login" class="">Login</router-link>
      <router-link v-if="!loginOn" to="/register" class="">Register</router-link>
    </ul>
    <ul class="" style="justify-content: center">
      <router-link to="/admin" class="mx-5">Home Admin</router-link>
      <router-link to="/caterogy" class="">Thêm loại sản Phẩm</router-link>
      <router-link to="/listuser" class="mx-5">Quản Lý User</router-link>
      <router-link to="/listCate">Quản Lý Sản Phẩm</router-link>
      <router-link to="" class="mx-5">Quản Lý Đơn Hàng</router-link>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'headerAdminVue',
  data() {
    return {
      loginOn: false,
      name: ''
    }
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (sessionStorage.getItem("phone")) {
      this.loginOn = true
      this.name = sessionStorage.getItem("name")
    }
  },
  methods:{
    logoutUser(){
      // Xóa thông tin đăng nhập khỏi session
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("name");
      // Cập nhật lại trạng thái đăng nhập
      this.loginOn = false;
      this.name = "";
    }


  }
}
</script>

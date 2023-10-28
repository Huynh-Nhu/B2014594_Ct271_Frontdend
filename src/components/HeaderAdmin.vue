<template>
  <main>
    <div class="page-admin">
      <p class="text-page">Admin</p>
    </div>

    <div class="row d-flex">
      <div class="col-sm-4 d-flex inf-admin" style="text-align: start">
        <router-link to="/admin" class="mx-5"><i class="ti-home router-home"></i></router-link>
      </div>
      <div class="col-sm-4 d-flex inf-admin" style="justify-content: center;">
        <p class="mx-3" v-if="loginOn"><i class="ti-user "></i> {{ name }}</p>
        <p v-if="loginOn"><i class="fa fa-mobile"></i> {{ phone }}</p>
      </div>
      <div class="col-sm-4 logout-admin" style="text-align: end">
        <router-link v-if="loginOn" @click="logoutUser" to="/"
          ><i class="fa fa-sign-out"></i
        ></router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'headerAdminVue',
  data() {
    return {
      loginOn: false,
      name: '',
      phone: ''
    }
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (sessionStorage.getItem('phone')) {
      this.loginOn = true
      this.name = sessionStorage.getItem('name')
      this.phone = sessionStorage.getItem('phone')
    }
  },
  methods: {
    logoutUser() {
      // Xóa thông tin đăng nhập khỏi session
      sessionStorage.removeItem('phone')
      sessionStorage.removeItem('name')
      // Cập nhật lại trạng thái đăng nhập
      this.loginOn = false
      this.name = ''
    }
  }
}
</script>
<style>
.page-admin {
  background-color: rgba(185, 160, 97, 0.853);
}
.text-page {
  font-size: 50px;
  font-weight: 800;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  text-align: center;
}
.logout-admin a i {
  color: black;
  font-size: 30px;
}
.inf-admin a i{
  color: black;
  font-size: 30px;

}

</style>

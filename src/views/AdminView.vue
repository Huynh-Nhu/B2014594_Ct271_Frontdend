<template>
  <headerAdminVue></headerAdminVue>
  <main>
    <div class="row row-cols-1 row-cols-md-3 g-4 text-center">
      <!-- <div class="col">
        <div class="card">
          <i class="ti-home icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/admin" class="mx-5">Home Admin</router-link>
          </div>
        </div>
      </div> -->
      <div class="col">
        <div class="card">
          <i class="ti-clipboard icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/caterogy" class="">Thêm loại sản Phẩm</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <i class="ti-user icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/listuser" class="mx-5">Quản Lý User</router-link>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <i class="fa fa-coffee icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/listCate" class="">Quản Lý Sản Phẩm</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <i class="ti-receipt icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/listOrder" class="">Quản Lý Đơn Hàng</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <i class="fa fa-plus icon-admin"></i>
          <div class="card-body body-router">
            <router-link to="/registerAdmin" class="">Thêm Admin</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-10"></div>
  </main>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
export default {
  components: {
    headerAdminVue
  },
  mounted(){
    const rule = sessionStorage.getItem('rule')
    if(rule != 'true'){
      this.$router.push('/:pathMatch(.*)*')
    }
  }


}
</script>

<style>
.icon-admin {
  font-size: 100px;
  margin-top: 20px;
}

.body-router a {
  border: 2px solid rgba(0, 0, 0, 0.153);
  padding: 5px;
  border-radius: 5px;
  text-decoration: none;
  color: black;
}
.body-router a:hover {
  background-color: rgb(75, 187, 163);
  color: aliceblue;
}
</style>

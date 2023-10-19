<template>
    <headerAdminVue></headerAdminVue>
    <main>
      <router-link to="/listuser" class="">Quản Lý User</router-link>
      <router-link to="/listCate" class="">Quản Lý Sản Phẩm</router-link>

        
    </main>

</template>


<script >
import headerAdminVue from '../components/HeaderAdmin.vue'
export default {
  components:{
    headerAdminVue
  }}
</script>


<style>
</style>
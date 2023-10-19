<script>
import axios from 'axios'
// // import { RouterLink } from 'vue-router';c
// import CategoryProducts from '../components/CategoryProducts.vue';
export default {
    data() {
        return {
            categories: [],
        };
    },
    created(){
      axios.get('http://localhost:3000/category/listCate').then((response) =>{
        this.categories = response.data
       
      })
    },
    // components: {
    //   CategoryProducts
    // } 
}
</script>
<template>
  <main>
    <h1>
      hien loai san pham
    </h1>
    <ul>
      <li v-for="category in categories" :key="category._id">
      <!-- <RouterLink :to="'/listCate/' + category._id + '/products'">{{ category.name }}</RouterLink> -->
      <RouterLink :to="'/listCate/' + category._id ">{{ category.name }}</RouterLink>

      <!-- <button @click="addProductToCategory(category.id, 'Tên sản phẩm')">Thêm sản phẩm</button> -->
      </li>
    </ul>
    <!-- <CategoryProducts></CategoryProducts> -->
      
  <!-- <router-link to="/caterogy" class="">Them loai san pham</router-link> -->
  </main>
</template>

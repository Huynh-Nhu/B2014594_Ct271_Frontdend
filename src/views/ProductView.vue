<template>
  <headerVue></headerVue>

  <main class="main">
    <div class="row d-flex">
      <div class="col-md-3 mt-5">
        <div class="category">
          <ul>
            <li @click="showAll()" class="mb-4">tất cả</li>
            <li
              v-for="category in categories"
              :key="category._id"
              class="mb-4"
              @click="showProducts(category._id)"
            >
              <router-link class="mb-4" :to="'/products'">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <h1 class="h1-name">Hiện danh sách sản phẩm</h1>
        <div class="">
          <input  class="form-control search-name" type="text" v-model="searchProduct" placeholder="Nhập tên sản phẩm để tìm kiếm"/>

        </div>

     
        <div  class="row d-flex">
          <div  v-for="product in filteredProducts" :key="product._id" class="product col-md-4">
            <div class="card product-card" style="width: 100%; height: 100%">
              <router-link  :to="'/products/' + product._id">
                <img
                  v-for="image in product.images"
                  :key="image._id"
                  :src="'/public/img/products/' + image.name"
                  class="card-img-top"
                  alt=""
                />
              </router-link>

              <div class="card-body">
                <h5 class="card-title name-product">{{ product.name }}</h5>
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
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],
      products: [],
      searchProduct:'',
   
    }
  },

  created() {
    this.showAll()
    this.showCate()
  },
  computed:{
    filteredProducts(){
      const search = this.searchProduct.toLowerCase().trim()
      if(!search){
        return  this.products
      }
      return this.products.filter((product)=>{
        return product.name.toLowerCase().includes(search)
      })

    },

  },
 
  methods: {
    async showAll() {
      try {
        await axios.get('http://localhost:3000/product/home').then((response) => {
          this.products = response.data.filter((product) => product.status === true);
          
        })
        if (this.products.length > 0) {
          const response = await axios.get('http://localhost:3000/product/img')
          const anh = response.data
          this.products.forEach((product) => {
            const hinh = anh.filter((imgs) => imgs.nameProduct === product._id)
            product.images = hinh
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async showCate() {
      axios.get('http://localhost:3000/category/listCate').then((response) => {
        this.categories = response.data
      })
    },

    async showProducts(categoryId) {
      const productAll = {}
      try {
        await axios.get('http://localhost:3000/product/home').then((response) => {
          response.data.map((product) => {
            if (product.category === categoryId && product.status === true) {
              productAll[product._id] = product
            }
            //gán một mảng chứa các giá trị thuộc tính của đối tượng productAll
            this.products = Object.values(productAll)
          })
        })

        const response = await axios.get('http://localhost:3000/product/img')
        const images = response.data
        this.products.forEach((product) => {
          const img = images.filter((img) => img.nameProduct === product._id)
          product.images = img
        })
      } catch (err) {
        console.log(err)
      }
    },
    
  },
  components: {
    headerVue,
    footerVue,
  }
}
</script>

<style>
.h1-name {
  text-align: center;
  color: aliceblue;
}
.main {
  background-color: #2f6451;
}
.search-name{
  width: 25%;
  margin: 10px 0;
  justify-content: end;
}

.category ul {
  text-align: center;
  /* background-color: rgba(200, 168, 92, 0.718); */
  /* width: fit-content; */
}
.category li {
  list-style: none;
  color: aliceblue;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 25px;

  /* margin: 25px; */
}
.category li:hover {
  cursor: pointer;
  margin: 2px;
}

.category li {
  font-family: 'Courier New', Courier, monospace;
  color: rgb(1, 0, 0);
  text-transform: uppercase;
  text-align: center;
}
.category li a {
  color: rgb(1, 0, 0);

  text-transform: uppercase;

  text-decoration: none;
}
.name-product {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
.product img {
  padding: 25px;
  background-color: #2f6451;
}
.product {
  margin-bottom: 30px;
}

.product-card:hover {
  padding: 5px;
  box-shadow: 0px 0px 50px rgba(183, 181, 181, 0.5);
  background-color: rgb(207, 204, 157);
  opacity: 0.8.5;
}
</style>

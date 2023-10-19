<template>
  <main>
    <div class="row row-1 header-full">
      <div class="col-md-3 col-lg-2 logo-dsp">
        <div class="logo-web">
          <router-link to="/" class="">
            
            <img class="logo" href="" src="/public/img/logo/1.png" alt="logo" />
          </router-link>
        </div>
      </div>
      <div class="col-md-9 col-sm-12 col-lg-10 nav-details">
        <div class="main-hn">
          <div class="main-content">
            <ul class="nav main-header" style="justify-content: center">
              <router-link to="/" class="">HOME</router-link>
              <router-link to="/products" class="">product</router-link>
              <router-link to="/about">ABOUT</router-link>
              <router-link to="/" class="">Connect</router-link>
              <router-link to="/" class="">Book</router-link>
            </ul>
          </div>
          <div class="use-bottom">
            <div class="icon-content d-flex">
              <button class="search-btn btn mx-3">
                <i class="fa fa-search"></i>
              </button>

              <button type="button" class="btn  position-relative cart-btn" @click="goAdd" >
                <router-link to="/cart" class="">
                  <i class="fa fa-shopping-basket"></i>
                </router-link>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {{ getCartQuantity }}
                </span>
              </button>

              <div class="use-content">
                <ul class="use-menu d-flex">
                  <h1 v-if="loginOn">{{ name }}</h1>

                  <router-link v-if="loginOn" @click="logoutUser" to="/">Logout</router-link>
                  <router-link v-if="!loginOn" to="/login" class="">Login</router-link>
                  <router-link v-if="!loginOn" to="/register" class="">Register</router-link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-2 col-sm-2 col-lg-2 d-none"></div> -->
    </div>
  </main>
</template>

<script>
import { useCartStore } from '../stores/counter'
// import { ref, watch } from 'vue'
export default {
  name: 'headerVue',
  data() {
    return {
      loginOn: false,
      name: '',
      // cartQuantity: 0
    }
  },
  computed: {
    getCartQuantity() {
      const cartStore = useCartStore();
      return cartStore.cartQuantity;
    }
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (sessionStorage.getItem('phone')) {
      this.loginOn = true
      this.name = sessionStorage.getItem('name')
    }
    
    // this.fetchCart();
  },
  methods: {
    logoutUser() {
      // Xóa thông tin đăng nhập khỏi session
      sessionStorage.removeItem('phone')
      sessionStorage.removeItem('name')
      // Cập nhật lại trạng thái đăng nhập
      this.loginOn = false
      this.name = ''

      const cartStore = useCartStore()
      cartStore.cartQuantity = 0

    },
    goAdd(){
      const cartStore = useCartStore()
      cartStore.cartQuantity = 0
    }
    

  }
}
</script>

<style>
.row-1 {
  /* #c4c89f */
  height: 255px;
  background-color: #c4c89f;
  margin: auto;
}
.header-full {
  height: auto;
}

@media screen and (max-width: 768px) {
  .logo-dsp {
    display: none;
    padding: 0;
  }

  .header-right {
    display: none;
  }
}

.logo-web {
  padding: 0;
}

.logo {
  width: 100%;
  border-radius: 200px;
  padding: 20px;
  position: unset;
  height: 100%;
  margin-top:30px;
}

.nav-details {
  padding: 70px 0;
}

.main-hn {
  display: block;
  padding: 30px 15px;
  background-color: rgb(216, 223, 195);
  border-radius: 50px;
}

.main-content {
  background-color: black;
  border-radius: 15px;
  padding: 10px 0px;
}

.main-header {
  margin-right: 20px;
  cursor: pointer;
}

.main-header a {
  padding: 10px;
  font-size: 15px;
  color: aliceblue;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 50px;
}

.main-header a:hover {
  background-color: rgb(79, 227, 202);
}

.use-bottom {
  height: 100%;
  margin-top: 10px;
  margin-bottom: -25px;
  justify-content: center;
}

.icon-content {
  /* display: flex; */
  justify-content: center;
}

.icon-content .btn {
  color: rgb(79, 227, 202);
  background-color: black;
  border-radius: 90px;
}
.icon-content .btn a {
  color: rgb(79, 227, 202);
  background-color: black;
  border-radius: 90px;
}


.icon-content .btn:hover {
  border-color: pink;
  border: 15px;
}

.use-menu {
  /* display: flex; */
  text-decoration: none;
  list-style: none;
}

.use-menu a {
  margin-right: 20px;
  text-decoration: none;
  text-transform: uppercase;
  color: #253216;
  margin-top: 10px;
}
.use-menu a:hover {
  font-size: 15px;
  color: #a7d573;
}
</style>

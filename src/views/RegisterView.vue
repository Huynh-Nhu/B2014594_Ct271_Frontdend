<template>
    <headerVue></headerVue>
  <main>
    <form class="was-validated" @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Username:</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" v-model="phone" />
        
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password" />
        
      </div>
    
      <div class="alert alert-danger" role="alert"></div>
    
      <span class="d-block">{{ message }}</span>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <!-- <div class="container use-full">
      <div class="row login-content">
        <div class="col-md-6 offset-md-3 shadow-lg p-3 mb-5 rounded login-main"> -->
          <!-- <form @submit.prevent="registerUser">
            <div class="login-top">
              <p class="login-name">Register</p>
            </div>
            <div class="use-detail">
              <div class="mb-3">
                <div class="row">
                  <div class="col-lg-2">
                    <label for="name" class="form-label">User Name</label>
                  </div>
                  <div class="col-lg-10">
                    <input v-model="name" type="text" class="form-control" id="name" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-lg-2">
                    <label for="phone" class="form-label">Phone</label>
                  </div>
                  <div class="col-lg-10">
                    <input v-model="phone" type="phone" class="form-control" id="phone" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-lg-2">
                    <label for="password" class="form-label">Password</label>
                  </div>
                  <div class="col-lg-10">
                    <input v-model="password" type="password" class="form-control" id="password" />
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-login-full">
              <button type="submit" class="btn login-btn">Đăng ký</button>
            </div>
          </form> -->
          <!-- <p v-if="message">{{ message }}</p>
          <p v-if="error">{{ error }}</p> -->
        <!-- </div>
      </div>
    </div> -->
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
      name: '',
      phone: '',
      password: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async registerUser() {
      try {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('phone', this.phone)
        formData.append('password', this.password)
        console.log(formData)
        const response = await axios.post('http://localhost:3000/reg/create', formData)
        this.message = response.data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components:{
    headerVue, footerVue
  }
}
</script>

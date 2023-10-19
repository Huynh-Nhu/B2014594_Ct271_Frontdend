<template>
  <headerVue></headerVue>
  <main>
    <div class="container use-full">
      <div class="row login-content">
        <div class="col-md-6 offset-md-3 shadow-lg p-3 mb-5 rounded login-main">
          <div class="login-top">
            <p class="login-name">LOGIN</p>
          </div>

          <form @submit="loginUser">
            <div class="use-detail">
              <div class="mb-3">
                <div class="row">
                  <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" v-model="phone" required />
                  </div>
                </div>
              </div>
            </div>
            <div class="use-detail">
              <div class="mb-3">
                <div class="row">
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required />
                  </div>
                </div>
              </div>
            </div>
            <span class="d-block">{{ message }}</span>
            <button type="submit">Login</button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <div class="if-no-tk">
              <p>
                Nếu bán chưa có tài khoản hãy
                <router-link v-if="!loginOn" to="/register" class="">Register</router-link>
                để được nhiều ưu đãi
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  <form>
    <div class="use-detail">
      <div class="mb-3">
        <div class="row">
          <div class="col-lg-2">
            <label for="phone" class="form-label">Phone</label>
          </div>
          <div class="col-lg-10">
            <input type="phone" class="form-control" id="phone-login" />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col-lg-2">
            <label for="pass-login" class="form-label">Password</label>
          </div>
          <div class="col-lg-10">
            <input type="password" class="form-control" id="pass-login" />
          </div>
        </div>
      </div>
    </div>
    <div class="btn-login-full">
      <button type="submit" class="btn login-btn">Đăng nhập</button>
    </div>
  </form>
  <footerVue></footerVue>
</template>

<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'

import axios from 'axios'

export default {
  data() {
    return {
      phone: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async loginUser(event) {
      event.preventDefault()
      try {
        const formData = new FormData()
        formData.append('phone', this.phone)
        formData.append('password', this.password)
        console.log(formData)
        const response = await axios.post('http://localhost:3000/login/access', formData)
        console.log(response.data)

        sessionStorage.setItem('id', response.data._id)

        sessionStorage.setItem('name', response.data.name)
        sessionStorage.setItem('phone', response.data.phone)
        if (response.data.rule === true) {
          // Redirect to admin page
          window.location.href = '/admin'
        } else {
          // Redirect to user page
          window.location.href = '/'
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.error
          window.location.reload()
        } else {
          console.log(error)
          this.errorMessage = 'An error occurred while logging in'
        }
      }
    }
  },
  components: {
    headerVue,
    footerVue
  }
}
</script>

<style>
.login-name {
  text-align: center;
  font-size: 25px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}

.use-full {
  margin-top: 100px;
  margin-bottom: 100px;
}

.if-no-tk {
  margin-top: 10px;
  text-align: center;
}

.if-no-tk-p {
  margin-top: 10px;
  color: #ffffff;
  text-decoration: none;
}

.if-no-tk-p:hover {
  color: rgb(255, 255, 255);
  text-decoration: none;
  background-color: rgb(79, 227, 202);
  border-radius: 60px;
  padding: 5px;
}

.login-main {
  background-color: #668245;
}

.use-detail label {
  color: #ced2a9;
}

.login-btn {
  justify-content: center;
  background-color: #253216;
  color: #ffffff;
  opacity: 0.7;
}

.login-btn:hover {
  background-color: rgb(79, 227, 202);
  opacity: 0.6;
}

.btn-login-full {
  text-align: center;
}
</style>

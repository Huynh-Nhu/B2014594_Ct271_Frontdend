<template>
  <headerAdminVue></headerAdminVue>
  <main>
    <div class="create-cate">
      <h2 class="text-name-admin">Create Category</h2>
      <div class="cate-full">
        <div class="col-md-6 offset-md-3 form-add-cate">
          <h1 class="text-center mb-3" >Thêm Loại Sản Phẩm</h1>

          <form @submit.prevent="createCategory">
            <div>
              <label style="color: rgb(0, 0, 0);" for="name">Name:</label>
              <input class="form-control" type="text" id="name" v-model="name" required />
              <div class="mt-3">
                <label style="color: rgb(0, 0, 0);" for="image">Hình ảnh:</label>
                <input class="form-control" type="file" ref="fileInput" id="file" @change="handleFile" accept="*" required />
                <img v-if="newImage" :src="newImage" alt="" width="250" height="250" />
              </div>
              <!-- <div v-if="nameExists" class="error-message">Tên loại đã tồn tại.</div> -->
            </div>
            <div>
              <div v-if="showMessage" class="alert-cate" role="alert">
                {{ message }}
              </div>
              <div class="button">
                <button class="btn btn-cate" type="submit">Thêm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
import headerAdminVue from '../components/HeaderAdmin.vue'

export default {
  data() {
    return {
      name: '',
      message: '',
      error: '',
      file: null,
      showMessage: false,
      newImage: '',
    }
  },
  components: {
    headerAdminVue
  },
  methods: {
    async createCategory() {
      try {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('img',this.file)
        const response = await axios.post('http://localhost:3000/category/create', formData)
        this.message = response.data
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 1000)
        this.name=''
        this.newImage = ''
        this.$refs.fileInput.value = ''
        this.$refs.fileInput.dispatchEvent(new Event('input'))
        
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async handleFile(event) {
      this.file = this.$refs.fileInput.files[0]
      const file = event.target.files[0]

      const Read = new FileReader()
      Read.onload = async () => {
        this.newImage = await Read.result
      }
      Read.readAsDataURL(file)
    },
  }
}
</script>

<style>
.text-name-admin {
  background-color: black;
  color: rgb(0, 0, 0);
  text-align: center;
  border-top: 5px solid rgba(185, 160, 97, 0.853);
  border-bottom: 5px solid rgba(185, 160, 97, 0.853);
}
.cate-full {
  /* background-color: black; */
  background: url('/img/png/cate.jpg') center center ;

  padding: 25px 0;
  margin: 60px;
  border-radius: 25px;
}
.form-add-cate {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.875);
  padding: 100px 50px;
  margin-top: 50px;
  margin-bottom: 50px;

  border-radius: 25px;
}
.alert-cate {
  margin-top: 5px;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-top: 5px;
  background-color: black;
  padding:15px;
}
.button {
  text-align: center;
}
.btn-cate:hover {
  background-color: rgb(117, 230, 226);
}
.btn-cate {
  background-color: rgb(212, 235, 255);
  margin-top: 15px;
}
</style>

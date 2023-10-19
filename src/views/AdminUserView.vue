<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
    }
  },
 created(){
    axios.get('http://localhost:3000/user/listUser').then((response) => {
      this.users = response.data
    })
  }
}
</script>
<template>
  <main>
    <h1>User List</h1>
    <table class="table table-success table-striped">
      <thead>
        <tr >
          <th cope="col">Name</th>
          <th cope="col">Phone</th>
          <th cope="col">Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td scope="row">{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.password }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

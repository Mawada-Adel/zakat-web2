<template>
<div>
  <nav-component style="margin-bottom: 200px"></nav-component>
  <table class="table container" style="width: 1200px">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">اسم المسؤول</th>
      <th scope="col">العنوان</th>
      <th scope="col">رقم الهاتف</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="( emb , index ) in employees" :key="emb.id" >
      <th scope="row">{{index +1}}</th>
      <td>{{ emb.username }}</td>
      <td>{{emb.address}}</td>
      <td>{{emb.phoneNumber}}</td>
      
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import navComponent from "@/components/nav";
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Employees",
  components : {
    navComponent
  },
  data () {
    return {
      employees : []
    }
  },
  methods : {
    fetchemployees() {
      axios.get(`http://localhost:5050/admin/fetch-all-employees?type=0`)
          .then(response => {
            this.employees = response.data.employees
          });
    },
   changeStatus(id , status) {
      axios.put(`http://localhost:5050/admin/accept-decline/${id}` , {
        "deserverStatus" :status
      }).then(response => {
        console.log(response);
        this.fetchDeservers();
      })

    }
  },
  created() {
    this.fetchemployees();
  }
}
</script>

<style lang="css" scoped>
  
</style>
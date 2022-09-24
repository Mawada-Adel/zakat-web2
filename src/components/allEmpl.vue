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
      <th scope="col"> التحكم</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="( emb , index ) in employees" :key="emb.id" >
      <th scope="row">{{index +1}}</th>
      <td>{{ emb.username }}</td>
      <td>{{emb.address}}</td>
      <td>{{emb.phoneNumber}}</td>
      <td>
        <button class="btn btn-primary " @click="pushToEdit(emb)">edit</button>
        <button class="btn btn-danger " @click="deleteEmployee(emb.id)" style="margin-right : 5px">delete</button>
        <button class="btn btn-primary " @click="fetchAddedBy(emb.id , emb.username)" style="margin-right : 5px">log</button>
      </td>
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
    fetchAddedBy(id , name) {
        console.log('id name ' , id , name)
     this.$router.push({name : 'addedBy' , params : {id : id , name : name}});
    },
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

    },
    pushToEdit(employee) {
      console.log('employee ' , employee);
        this.$router.push({name : 'addempl' , params : {id : employee.id}});
    },
    deleteEmployee(id) {
      console.log('id is : ' , id);
      axios.delete(`http://localhost:5050/employee/delete/${id}`)
        .then(res => {
          console.log(res);
          this.fetchemployees();
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
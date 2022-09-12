<template>
<div>
  <nav-component style="margin-bottom: 200px"></nav-component>
  <table class="table container" style="width: 1200px">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">اسم المستحق</th>
      <th scope="col">الرقم الوطني</th>
      <th scope="col">العنوان</th>
      <th scope="col">الحالة</th>
      <th scope="col">رقم الهاتف</th>
      <th scope="col">ملاحظات</th>
      <th scope="col">حالة القبول</th>
      <th scope="col">مقبول/مرفوض</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="( des , index ) in deservers" :key="des.id" >
      <th scope="row">{{index +1}}</th>
      <td>{{ des.username }}</td>
      <td>{{ des.national_number }}</td>
      <td>{{des.address}}</td>
      <td>{{des.status}}</td>
      <td>{{des.phoneNumber}}</td>
      <td>{{des.note}}</td>
      <td>{{des.accept_status}}</td>
      <td>
        <button class="btn btn-primary" @click="changeStatus(des.id , 1)">مقبول</button>
        <button class="btn btn-danger ml-1">مرفوض</button>
      </td>
    </tr>

    <tr v-if="deservers.length == 0">
      <h4>no deservers </h4>
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
  name: "dtable",
  components : {
    navComponent
  },
  data () {
    return {
      deservers : []
    }
  },
  methods : {
    fetchDeservers() {
      axios.get(`http://localhost:5050/admin/fetch-all-deservers?type=0`)
          .then(response => {
            this.deservers = response.data.deservers
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
    this.fetchDeservers();
  }
}
</script>

<style lang="css" scoped>
  
</style>
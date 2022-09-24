<template>
    <div>
      <nav-component style="margin-bottom: 200px"></nav-component>
      <h3>مستحقين تم إضافتهم من قبل :</h3> 
      <h5 style="margin-left : 10px">{{this.$route.params.name}}</h5>
      <table class="table container" style="width: 1200px">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">اسم المستحق</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="( des , index ) in deservers" :key="des.id" style="font-color : white">
          <th scope="row">{{index +1}}</th>
          <td style="font-color : white">{{ des.username }}</td>
        </tr>
  
        <tr v-if="deservers.length == 0">
          <h4>no deservers added by employee </h4>
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
        fetchAddedBy() {
         axios.get(`http://localhost:5050/deservers/fetch-added-by/${this.$route.params.id}`)
          .then(response => {
            this.deservers = response.data.response
          });
    },
    },
    created() {
      console.log('param id : ' , this.$route.params.id)
      this.fetchAddedBy();
    }
  }
  </script>
  
  <style lang="css" scoped>
    
  </style>
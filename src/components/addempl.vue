<template>

<div>
    <nav-component style="margin-bottom: 200px"></nav-component>
  <div class="container" >
    <div class="panel panel-primary">
      <div class="panel-heading">
        <span class="glyphicon glyphicon-log-in">تسجيل مسؤول</span>
        <span class="panel-title"></span>
      </div>
      <div class="panel-body">
        <form class="form-horizontal" >
        
          <div class="form-group">
                     <label class="col-md-2" for="Password">اسم المستخدم</label>
                   <div class="col-md-10">
              <input v-model="username" class="form-control"  type="text"   />
              <span class="field-validation-valid" data-valmsg-for="Username" data-valmsg-replace="true"></span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2" for="Password">كلمة المرور</label>
            <div class="col-md-10">
              <input v-model="password" type="password" class="form-control" autocomplete="off" data-val="true" data-val-required="&#x627;&#x62F;&#x62E;&#x644;/&#x627;&#x62E;&#x62A;&#x631; &#x642;&#x64A;&#x645;&#x629; &#x644;&#x640; &#x27;&#x643;&#x644;&#x645;&#x629; &#x627;&#x644;&#x633;&#x631;&#x27;." id="Password" name="Password" />
              <span class="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true"></span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2" for="address">العنوان</label>
            <div class="col-md-10">
              <input v-model="address" type="address" class="form-control" autocomplete="off" data-val="true" data-val-required="&#x627;&#x62F;&#x62E;&#x644;/&#x627;&#x62E;&#x62A;&#x631; &#x642;&#x64A;&#x645;&#x629; &#x644;&#x640; &#x27;&#x643;&#x644;&#x645;&#x629; &#x627;&#x644;&#x633;&#x631;&#x27;." id="Password" name="Password" />
              <span class="field-validation-valid" data-valmsg-for="address" data-valmsg-replace="true"></span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2" for="phoneNumber">رقم الهاتف</label>
            <div class="col-md-10">
              <input v-model="phoneNumber" type="phoneNumber" class="form-control" autocomplete="off" data-val="true" data-val-required="&#x627;&#x62F;&#x62E;&#x644;/&#x627;&#x62E;&#x62A;&#x631; &#x642;&#x64A;&#x645;&#x629; &#x644;&#x640; &#x27;&#x643;&#x644;&#x645;&#x629; &#x627;&#x644;&#x633;&#x631;&#x27;." id="Password" name="Password" />
              <span class="field-validation-valid" data-valmsg-for="phoneNumber" data-valmsg-replace="true"></span>
            </div>
          </div>
          <button class="btn btn-primary" @click="addEmployee()">اضافة</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import navComponent from "@/components/nav";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "addempl" ,
    components : {
    navComponent
  },
  data() {
    return {
      username : '' ,
      password : '' ,
      address : '' ,
      phoneNumber : ''

    }
  },
  methods :  {
    addEmployee() {
      axios.post(`http://localhost:5050/admin/add-employee`,{username : this.username , password : this.password , address : this.address , phoneNumber : this.phoneNumber })
          .then(res => {
            console.log(res);
          }).catch(err => console.log(err))
          
  }
  
    }
  }

</script>
body {
 background-image: url("bgtexture3.jpg");

}
<style scoped>

</style>
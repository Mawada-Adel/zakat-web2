<template>

<div>
  <div class="container" >
    <div class="panel panel-primary">
      <div class="panel-heading">
        <span class="glyphicon glyphicon-log-in">تسجيل الدخول</span>
        <span class="panel-title"></span>
      </div>
      <div class="panel-body">
        <form class="form-horizontal" >
          <input type="hidden" id="returnUrl" name="returnUrl" value="" />
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
          <button class="btn btn-primary" @click="signIn()">تسجيل دخول</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login" ,
  data() {
    return {
      username : '',
      password : ''
    }
  },
  methods :  {
    signIn() {
      axios.post(`http://localhost:5050/admin/signIn` , {username : this.username , password : this.password })
          .then(response => {
            console.log(response);
            if (response.data.status == 'success') {
              this.$router.push('/home');
            }
          })
    }
  }
}
</script>
body {
 background-image: url("bgtexture3.jpg");

}
<style scoped>

</style>
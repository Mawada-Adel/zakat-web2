<template>
<div>
  <nav-component style="margin-bottom: 200px"></nav-component>
  <div class="container">
    <div class="panel panel-primary zakatServiceTopSpace">
      <div class="panel-heading">
        <span class="glyphicon glyphicon-grain"></span>
        <span class="panel-title">&#x62E;&#x62F;&#x645;&#x627;&#x62A; &#x627;&#x644;&#x645;&#x633;&#x62A;&#x62D;&#x642;&#x64A;&#x646;</span>
      </div>
      <div class="panel-body pad0">
        <div class="row">
          <div class="col-xs-12">
            <div class="push-RightLeft mar10">
                        <span class="btnPoll">

                        </span>
            </div>
            <center>
              <div class="SectionColContainerInner">
                <div class="SectionCol-Inner">
                  <router-link to="/d-table">
                    <center><span class="CheckAppIcon"></span></center>
                    <h1>متابعة طلب</h1>
                    <p>خدمة تتيح لمقدمي طلبات الزكاة إمكانية متابعة طلباتهم</p>
                  </router-link>
                </div>
                <div class="SectionCol-Inner">
                  <router-link to="/all-deserves">
                    <center><span class="SearchAppIcon"></span></center>
                    <h1>كل المستحقين</h1>
                    <p>خدمة الاستعلام عن مستحقي الزكاة </p>
                  </router-link>
                </div>

              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import navComponent from './nav'
export default {
  name: "deserversServices",
  components : {
    navComponent
  }
}
</script>

<style scoped>

</style>
<template>
<div>
  <nav-component style="margin-bottom: 200px"></nav-component>
  <div class="container">
    <div class="panel panel-primary zakatServiceTopSpace">
      <div class="panel-heading">
        <span class="panel-title">خدمات المسؤولين</span>
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
                  <router-link to="/addempl">
                    <center><span class="CheckAppIcon"></span></center>
                    <h1>اضافة مسؤول</h1>
                  </router-link>
                </div>
                <div class="SectionCol-Inner">
                  <router-link to="/allemple">
                    <center><span class="SearchAppIcon"></span></center>
                    <h1>كل المسؤولين</h1>
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
  name: "EmplloyeeServises",
  components : {
    navComponent
  }
}
</script>

<style scoped>

</style>
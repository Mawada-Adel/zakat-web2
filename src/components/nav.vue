<template>
<div>
  <nav class="navbar navbar-fixed-top">
    <div class="toplinksContainer">
      <div class="container">
        <div class="push-RightLeft toplinkWidth">
          <ul class="toplinks">
            <li>
               <span class="glyphicon glyphicon-log-in" @click="logout()">logout</span>
              
            </li>
            <li class="sep">|</li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="container headerContainer">

      <span class="PortalName">البوابة الالكترونية لخدمات الزكاة</span>
      <div class="row">
        <div class="col-sm-2 col-xs-3">
          <div class="navbar-header">
            <a class="navbar-brand" href="index.html">
              <img src="images/ZakatLogo.png" class="logo" />
            </a>
          </div>

        </div>
        <div class="col-sm-10 col-xs-9">
          <div class="MaraLogo push-RightLeft">
          </div>
          <div class="clearfix"></div>

          <div class="navbar-menu">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle Navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="clearfix"></div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li><router-link to="/">الرئيسية</router-link></li>
                <li><router-link to="/d-Servises">خدمات المزكين</router-link></li>
                <li><router-link to="/services">خدمات المستحقين</router-link></li>
                <li><router-link to="/employee">خدمات المسؤولين</router-link></li>
                <li><router-link to="/e-Pays">إحصائيات</router-link></li>
                
              </ul>
            </div>
            <form class="form-horizontal" data-toggle="validator" role="form" action="https://zakah.su/ar/Account/LogOff?returnUrl=%2Far%2FPay%2FZakah%2F" method="post">
              <ul class="nav navbar-nav navbar-left">
              </ul>
              <input name="__RequestVerificationToken" type="hidden" value="CfDJ8B0UyZT8YoVCjFH_EcLHHKMMWN6Jea4YiRcSBa_8zFMRIV-XTdrJJDffQaYCv7AJJfZENiKDhTryQ09IF5IaRKn2hke3J2wGWDvgpnNx7leDYPvJPMCMvBhnbtjY4Orc9mbiRVT13HOo1mxhwBUuRro" /></form>
          </div>
        </div>
      </div>

      <a class="langLinkMobileApp" href="en/index.html?returnUrl=%2Far">
        En
      </a>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "nav-com" , 
  methods : {
    logout() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
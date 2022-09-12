<template>
<div>
  <navComponent></navComponent>

  <div class="container-fluid body-content">

    <div class="row">
      <div class="ZakatSliderMobile" id="loadingSlider">
        <div class="carousel-caption" role="option">
          <h1>الـزكــاة<br /> في القرآن</h1>
          <p>"إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ" سورة المائدة، آية 55</p>
          
        </div>
      </div>
      <div id="ZakatSlider" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner carousel-zoom">
          <div class="carousel-caption" role="option">
            <h1>الـزكــاة<br /> في القرآن</h1>
            <p>"إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ" سورة المائدة، آية 55</p>
          </div>
          <div class="item active">
            <img src="images/HomePageSlider/SliderImg01-ar.jpg" class="img-responsive" />
          </div>
          <div class="item">
            <img src="images/HomePageSlider/SliderImg02-ar.jpg" class="img-responsive" />
          </div>
        </div>
      </div>
    </div>
  <div>
  </div>
    <div class="row">
      <div class="ZakatStatsContainer">
        <div class="col-md-12 col-xs-12">
          <div class="row" title="11:47:48 &#x635;">
            <h1>إحصائيات</h1>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="ZakatCount">
                <div class="row">
                  <div class="col-md-1 hidden-xs"></div>
                  <div class="col-md-10 col-xs-12">
                    <center>
                      <div class="ZakatCountCol">
                        <label for="totalDonationAmount">إجمالي المدفوع عبر البوابة</label><span>1,754,350.442</span>
                        <span>جنيه سوداني</span>
                      </div>
                      <div class="ZakatCountCol">l</div>
                      <div class="clearfixResp"></div>
                      <div class="ZakatCountCol last">
                        <label for="totalDonationAmount">عدد المساهمات</label><span>24,465</span>
                      </div>
                      <div class="clearfix"></div>
                    </center>
                  </div>
                  <div class="col-md-1 hidden-xs"></div>
                </div>
              </div>
              <div class="form-horizontal" id="statisticsDiv">
                <div class="form-group ">
                  <label class="control-label col-md-offset-3 col-md-1" for="GovernorateId">محلية</label>
                  <div class="col-md-2">
                    <select select="&#x627;&#x644;&#x62D;&#x633;&#x627;&#x628; &#x627;&#x644;&#x639;&#x627;&#x645; &#x644;&#x644;&#x633;&#x644;&#x637;&#x646;&#x629;" class="form-control" masterCodeType="1" childId="WilayatId" id="GovernorateId" name="GovernorateId"><option>&#x627;&#x62E;&#x62A;&#x631;</option>
                    </select>
                  </div>
                  <label class="control-label col-md-1" for="WilayatId">&#x627;&#x644;&#x648;&#x644;&#x627;&#x64A;&#x629;</label>
                  <div class="col-md-2">
                    <select select="&#x627;&#x644;&#x643;&#x644;" class="form-control" masterCodeType="2" id="WilayatId" name="WilayatId"><option>&#x627;&#x62E;&#x62A;&#x631;</option>
                    </select>
                  </div>
                </div>
                <center>
                  <div class="form-group statisticsChartsDiv">
                    <div class="col-md-4">
                      <div id="ZakatPayment" style="width: 300px; height: 200px; "></div>
                    </div>
                    <div class="col-md-4">
                      <div id="SadaqaPayment" style="width: 300px; height: 200px; ">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div id="KaffaraPayment" style="width: 300px; height: 200px; ">
                      </div>
                    </div>
                  </div>
                </center>
              </div>
            </div>
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
  name: "home-page",
  components : {
    navComponent
  }
}
</script>

<style scoped>

</style>
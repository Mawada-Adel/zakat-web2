<template>
<dev>
      <nav-component style="margin-bottom: 200px"></nav-component>
    <div class="container-fluid body-content">
        <div class="container">
     <div class="panel panel-primary">
        <div class="panel-heading">
            <span class="glyphicon glyphicon-stats"></span>
            <span class="panel-title">&#x625;&#x62D;&#x635;&#x627;&#x626;&#x64A;&#x627;&#x62A; (&#x627;&#x644;&#x645;&#x62F;&#x641;&#x648;&#x639;&#x627;&#x62A;) </span>
        </div>
        <div class="panel-body">
            <div class="form-horizontal" id="statisticsDiv">
     <div class="jumbotron pad10">
        <div class="form-group ">
            <label class="control-label col-md-2" for="Type">&#x646;&#x648;&#x639; &#x627;&#x644;&#x625;&#x62D;&#x635;&#x627;&#x626;&#x64A;&#x629;</label>
            <div class="col-md-4">
                <select class="form-control" data-val="true" data-val-required="The &#x646;&#x648;&#x639; &#x627;&#x644;&#x625;&#x62D;&#x635;&#x627;&#x626;&#x64A;&#x629; field is required." id="Type" name="Type">
                    <option value="true">&#x627;&#x644;&#x645;&#x62F;&#x641;&#x648;&#x639; &#x639;&#x628;&#x631; &#x627;&#x644;&#x628;&#x648;&#x627;&#x628;&#x629;</option>
                    <option value="false" selected="selected">&#x627;&#x631;&#x635;&#x62F;&#x629; &#x627;&#x644;&#x62D;&#x633;&#x627;&#x628;&#x627;&#x62A;</option>
                </select>
            </div>
            <label class="control-label col-md-2" for="GovernorateId">المحلية</label>
            <div class="col-md-4">
                <select select="&#x627;&#x644;&#x62D;&#x633;&#x627;&#x628; &#x627;&#x644;&#x639;&#x627;&#x645; &#x644;&#x644;&#x633;&#x644;&#x637;&#x646;&#x629;" class="form-control" masterCodeType="1" childId="WilayatId" id="GovernorateId" name="GovernorateId"><option>&#x627;&#x62E;&#x62A;&#x631;</option>
     </select>
            </div>
        </div>
        <div class="form-group ">
            <label class="control-label col-md-2" for="WilayatId">&#x627;&#x644;&#x648;&#x644;&#x627;&#x64A;&#x629;</label>
            <div class="col-md-4">
                <select select="&#x627;&#x644;&#x643;&#x644;" class="form-control" masterCodeType="2" childId="DistrictId" id="WilayatId" name="WilayatId"><option>&#x627;&#x62E;&#x62A;&#x631;</option>
     </select>
            </div>
            <label class="control-label col-md-2" for="DistrictId">الحي</label>
            <div class="col-md-4">
                <select select="&#x627;&#x644;&#x643;&#x644;" class="form-control" masterCodeType="105" id="DistrictId" name="DistrictId"><option>&#x627;&#x62E;&#x62A;&#x631;</option>
     </select>
            </div>
        </div>
        <div class="form-group" id="yearAndMonthDiv">
            <label class="control-label col-md-2" for="Year">&#x627;&#x644;&#x633;&#x646;&#x629;</label>
            <div class="col-md-4">
                <select class="form-control" id="Year" name="Year">
                    <option>&#x627;&#x644;&#x643;&#x644;</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022" selected="selected">2022</option>
                </select>
            </div>
            <label class="control-label col-md-2" for="Month">&#x627;&#x644;&#x634;&#x647;&#x631;</label>
            <div class="col-md-4">
                <select class="form-control" id="Month" name="Month">
                    <option>&#x627;&#x644;&#x643;&#x644;</option>
                                            <option value="1">1 &#x64A;&#x646;&#x627;&#x64A;&#x631;</option>
                        <option value="2">2 &#x641;&#x628;&#x631;&#x627;&#x64A;&#x631;</option>
                        <option value="3">3 &#x645;&#x627;&#x631;&#x633;</option>
                        <option value="4" selected="selected">4 &#x623;&#x628;&#x631;&#x64A;&#x644;</option>
                        <option value="5">5 &#x645;&#x627;&#x64A;&#x648;</option>
                        <option value="6">6 &#x64A;&#x648;&#x646;&#x64A;&#x648;</option>
                        <option value="7">7 &#x64A;&#x648;&#x644;&#x64A;&#x647;</option>
                        <option value="8">8 &#x623;&#x63A;&#x633;&#x637;&#x633;</option>
                        <option value="9">9 &#x633;&#x628;&#x62A;&#x645;&#x628;&#x631;</option>
                        <option value="10">10 &#x623;&#x643;&#x62A;&#x648;&#x628;&#x631;</option>
                        <option value="11">11 &#x646;&#x648;&#x641;&#x645;&#x628;&#x631;</option>
                        <option value="12">12 &#x62F;&#x64A;&#x633;&#x645;&#x628;&#x631;</option>
                </select>
            </div>
        </div>
        <div class="form-group pad0">
            <div class="col-md-12">
                <center>
                    <input type="button" class="grid-search-btn btn btn-primary" id="btnSearch" value=&#x639;&#x631;&#x636; />
                </center>
            </div>
        </div>
     </div>
     </div>
     <div>
     <center>
        <div class="well" id="lastRefreshOn">12:12:23 &#x645;</div>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-3">
                <div id="ZakatPayment" class="StatsChartDiv"></div>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-3">
                <div id="ZakatFitrPayment" class="StatsChartDiv"></div>
            </div>
            <div class="col-md-2"></div>
        </div>
        <hr class="visible-lg" />
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-3">
                <div id="SadaqaPayment" class="StatsChartDiv">
                </div>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-3">
                <div id="KaffaraPayment" style="width: 300px; height: 200px;" class="StatsChartDiv">
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
     </center>
     </div>
        </div>
     </div>
     </div>
     </div>
</dev>
</template>
<script>
import navComponent from './nav'
export default {
  name: "DServices",
  components : {
    navComponent
  }
}
</script>

<style scoped>

</style>
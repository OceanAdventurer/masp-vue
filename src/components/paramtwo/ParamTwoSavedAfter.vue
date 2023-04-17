<style scoped>
  .clearfix{
    display:table;

  }
  .el-input-number.is-disabled .el-input-number__decrease, .el-input-number.is-disabled .el-input-number__increase {
    border-color: #e4e7ed;
    color: #999;
  }
  .clearfix:before,.clearfix:after{
    content:"";
    display:block;
    clear:both;
    height:0;
  }
  .clearfix{
    _zoom:1;
  }
  .tab_file_new1 {
    display: flex;
    flex-direction: row;
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .el-step__head.is-finish {
    color: #2A436F;
    border-color: #2A436F;
  }
  .el-step__title.is-finish {
    color: #2A436F;
  }
  .tab_file_new {
    position: relative;
  }

  .library-new-bottom{
    padding-top: 15px;
    width: 100%;
    height: 10%;
    border-top: solid 1px #DDDDDD;
    padding-right: 15%;
  }
  .library-new-left{
    width: 73%;
    float: left;
    height: 100%;
    padding: 0px 5px;
    border-right: solid 1px #dddddd;
  }
  .library-new-right{
    width: 25%;
    float: left;
    height: 100%;
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 10px;
  }

  .running-jobs {
    color: #8c939d;
    font-size: 12px;
  }

  .el-table__row {
    line-height: 20px;
    height: 20px;
  }

  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 15px;
  }

  .el-table td,
  .el-table th {
    padding: 10px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }

  .dialog_content_list .el-table td,
  .dialog_content_list .el-table th {
    padding: 0px;
  }

  .dialog_content_list .cell {
    height: 15px;
    line-height: 15px;
  }
  .el-table-column {
    width: 100%;
  }
  .headerFixedBtn {
    position: fixed;
    right: 60px;
  }
  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    height: 800px;
  }
  /* 窗口高度大于800px */
  @media screen and (min-height: 800px) {
    .headerFixedBtn {
      top:0px;
    }
  }
  /* 窗口高度小于800px */
  @media screen and (max-height: 800px) {
    .headerFixedBtn {
      top: -5px;
    }
  }
  .el-dialog{
    margin-top: -8vh;
  }

  .param-two-content {
    width: 100%;
    height: 100%;
  }

  .param-two-time-point-global {
    width: 100%;
    height: 100%;
  }
  .el-input.is-disabled .el-input__inner {
    /*color: #c0c4cc;*/
  }
  /**
  绑定关系界面的
   */

  /* 左侧 */
  .tab_file_new_left {
    float: left;
    width: 25%;
    height: 60vh;
    border-right: 1px solid #DDDDDD;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tab_riglt {
    width: 90%;
    height: 60vh;
    float: left;
    /* box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative; */
  }

  .tab-profile {
    width: 100%;
    padding-left: 8px;
  }
  .point-ylgx {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(80vh - 199px);
    padding-left: 15px;
  }
  .calc_result {
    /* text-align: center; */
    height: calc(80vh - 183px);
  }
  .rule_delete {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    background-image: url(../../assets/images/icon71.png);
    background-size: cover;
    cursor: pointer;
  }
  .point-main-top {
    width: 100%;
    height: 90%;
    border-bottom: solid 1px #DDDDDD;
  }  .el-button.is-circle {
       border-radius: 50%;
       padding: 4px;
     }
  .el-button+.el-button {
    margin-left: 0px;
  }
  .table-ligc{
    border-right: solid 1px #DDDDDD;
    width: 550px;height: auto; border-top: solid 1px #DDDDDD;  border-left: solid 1px #DDDDDD; margin-top: 20px;margin-left: 10px;border-bottom: solid 1px #dddddd;
  }
  .tr-ligc{
    width: 100%;
    height: 33px;
  }
  .td-ligc{
    border-bottom: solid 1px #DDDDDD;border-right: solid 1px #DDDDDD;width: auto;height: 100%;float: left; line-height: 35px;
  }

  .script_left {
    float:left;
    width:26.3%;
    height: calc(80vh - 121px);
  }

  .script_edit {
    float:left;
    width: 73.7%;
    /* height: 100%; */
    height: calc(80vh - 138px);
  }

  #ifid {
    /* height: calc(100% - 32px); */
    height: 100%;
  }
  #iframeOrgChart {
    width: calc(100% - 1px);
    height: calc(100% - 80px);
  }
  .right_shade {
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:.5;
    background:#000;
    z-index: 99;
  }

  .right_content {
    position: fixed;
    left: 1%;
    top: 10%;
    width: 98%;
    height: 80%;
    background:white;
    z-index: 105;
  }

  .new_on_main {
    width: 100%;
    height: calc(72vh - 57px - 15px - 15px);
    border-top: solid 1px #eeeeee;
  }
  .param-two-time-point {
    /* position: absolute; */
    height: calc(80vh - 121px);
    width: 100%;
  }
  .left_tree {
    overflow: auto;
    height: calc(80vh - 167px);
  }

  .left_filter {
    margin-top: 5px
  }
  .el-input.is-disabled .el-input__inner {
    cursor: not-allowed;
  }
  .yingshe {
    /*width: 100%;*/
    /*height: calc(60vh - 40px);*/
    /*!* position: relative;  *!*/
    /*margin-top: 27px;*/
    /*overflow: auto;*/
  }
  .el-tabs__content>.el-tab-pane, .el-tabs__content>.el-tab-pane>div {
    position: relative;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-input-number.is-disabled .el-input-number__decrease, .el-input-number.is-disabled .el-input-number__increase {
    border-color: #e4e7ed;
    /* color: #e4e7ed; */
  }
  .el-input-number__decrease, .el-input-number__increase {
    position: absolute;
    z-index: 1;
    top: 2px;
    width: 40px;
    height: auto;
    text-align: center;
    background: #ffffff;
    color: #606266;
    cursor: pointer;
    font-size: 12px;
  }
  .textarea{
    /* width: 310px; */
    min-height: 42px;
    max-height: 100px;
    _height: 120px;
    margin-right: auto;
    margin-left: 30px;
    padding-top:8px;
    outline: 0;
    /* border: 1px solid #a0b3d6; */
    /* font-size: 12px; */
    line-height: 24px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    /* float: left; */
    /* border-color: rgba(82, 168, 236, 0.8); */
    /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6); */
  }
  .construction_img {
    background-image: url(../../assets/images/icon117.png);
    background-size: cover;
    width: 40px;
    height: 22px;
    cursor: pointer;
    float: right;
    margin-top: 10px;
    margin-right: 35px;
  }
  .content_main_right > .el-tabs > .el-tabs__content > .el-tab-pane > div {
    position: relative;
    height: calc(80vh - 174px);
  }
  .content_main_right>.el-tabs>.el-tabs__content>.el-tab-pane>div {
    position: relative;
    height: calc(80vh - 174px);
  }
  .el-tabs__content > .el-tab-pane > div {
    position: relative;
    height: calc(80vh - 174px);
  }
</style>
<style>
  .el-input-number.is-disabled .el-input-number__decrease, .el-input-number.is-disabled .el-input-number__increase {
    border-color: #e4e7ed;
    color: #303133;
  }
  .el-input-number__decrease, .el-input-number__increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    background: #ffffff;
    color: #606266;
    cursor: pointer;
    font-size: 12px;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-input.is-disabled .el-input__inner {
    /* background-color: #f5f7fa; */
    /* border-color: #e4e7ed; */
    /* color: #c0c4cc; */
    cursor: not-allowed;
  }
  .el-step__title.is-process{
    color: #c0c4cc;
    font-weight: 100;
    font-size: 12px; line-height: 38px;
  }
  .el-step__head.is-process{
    color: #c0c4cc;
    border-color: #c0c4cc;
  }

  #paramTwoSavedAfter .left_tree_oneParam {
    overflow: auto;
    overflow-x: auto;
    height: 331px;
    border: 1px solid #ebeef5;
  }
  #paramTwoSavedAfter .left_tree_time_point {
    overflow: auto;
    overflow-x: auto;
    height: 331px;
    border: 1px solid #ebeef5;
  }
  .left_tree1 {
    overflow: auto;
    overflow-x: auto;
    height: 423px;
    border: 1px solid #ebeef5;
  }
  .left_tree_bind{
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
    cursor: pointer;
    border: 1px solid #ebeef5;
  }
  .el-step__head.is-finish {
    color: #2A436F;
    border-color: #2A436F;
  }
  .el-step__title.is-finish {
    color: #2A436F;
  }
  .all_content {
    margin-top: -1px;
    height: calc(80vh - 45px);
    width: 100%;
  }
  .content_top {
    height: 80px;width: 100%;
  }
  .content_main {
    height: calc(80vh - 121px);width: 100%;
    border-top: solid 1px #ebeef5;
    border-bottom: solid 1px #ebeef5
  }
  .content_bottom{
    width: 100%;
    float: left;
    height: 70px;width: 100%;
  }
  .content_bottom .el-button--mini{
    width: 90px !important;
    height: 34px !important;
  }
  .content_main_left{
    float: left;
    height: calc(80vh - 121px);
    width:76%;
    border-right: solid 1px #ebeef5;
    box-sizing: border-box;
  }
  .content_main_right{
    float: left;
    height: calc(80vh - 121px);
    width:24%;
  }
  .content_main_left_tree {
    width: 26.3%;
    height: calc(80vh - 121px);
    float: left;
    border-right: solid 1px #dddd;
    box-sizing: border-box;
  }

  .content_main_right_content {
    width: 73.7%;
    height: calc(80vh - 121px);
    float: left;
  }

  .point-ylgx {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(80vh - 199px);
    padding-left: 15px;
  }
</style>
<template>
  <div class="all_content"   :element-loading-text="saveLoaddingText"  v-loading="saveContentLoding">
    <!--选择多个不通算法的版本库选择界面-->
    <checkLibraryParam v-if="showSelectLibraryParamDataData" @nextPageEmit="getClickLibraryParamNextPage" @lastPageEmit="getClickLibraryParamLastPage" :libraryIds="libraryIds"   :linkParam="this.linkParam" :isCurrentUser="isCurrentUser"></checkLibraryParam>
    <div v-if="!showSelectLibraryParamDataData">
      <!--新建/编辑算法步骤页面-->
      <div class="content_top">
        <div v-show="isCurrentUser && !isLinkParam">
          <el-steps :active="activeStep" style="position: relative;width: 60%; float: left; margin-left: 20%;margin-top: 10px">
            <el-step title="新建分析参数" style="color:#2A436F"></el-step>
            <el-step title="选定版本库"></el-step>
            <el-step title="新增算法"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
      </div>
      <!--显示绑定-->
      <div class="content_main" v-show="selectBindingMappingPage">
        <el-table style="height:93%;overflow-y: auto;overflow-x: hidden;width: 96%;float: left;margin-left: 2%; margin-top: 18px;"
                  v-loading="bindLoadidng"
                  :data="libraryList"
                  border
                  align="center"
                  true-label
                  header-align="center"
                  @selection-change="selectionMapping"
        >
          <el-table-column  type="selection" align="center" width="55"></el-table-column>
          <el-table-column  prop="versionLibrary" align="center"  width="300"  label="版本库">
            <template slot-scope="scope">
              {{scope.row.versionLibrary}} （{{scope.row.planeType}}）
            </template>
          </el-table-column>
          <el-table-column  prop="mapping"  align="center" label="映射"  style="width: 40%">
            <template slot-scope="scope">
              <el-button type="text" @click="editTwoDimensional(scope.row)" :title="scope.row.mapping">{{scope.row.title}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--选择，新建、编辑分析算法-->
      <div class="content_main" v-show="addFenXiSuanFaPage">
        <div class="content_main_left cm_content_main_left">
          <div v-if="showContent === false" >
            <el-radio-group v-model="creatorId" v-if="childCreatorList.length > 0" style="padding-left: 40%; padding-top: 14%;">
              <el-form v-for="item in childCreatorList" :key="item.ID" label-width="20%" size="mini" v-if="item.ID !== 19 && item.ID !== 20 && item.ID !== 21">
                <el-form-item>
                  <el-radio :label="item.ID"  v-if="(isLinkParam || !isCurrentUser) && item.ID != creatorId" disabled>{{item.NAME}}</el-radio>
                  <el-radio v-else :label="item.ID"  >{{item.NAME}}</el-radio>
                </el-form-item>
              </el-form>
            </el-radio-group>
          </div>
          <div v-else>
            <div class="content_main_left_tree cm_content_main_left_tree" v-show="creatorId >0 && showScript === false ">
              <!--左侧的树-->
              <LeftTree @getTreenodeData="getTreeNodeData" :treeType="treeType" :creatorId="creatorId" :twoDimensionId="saveReturnTwoDimensionId" :showDescription="showDescription" :isCurrentUser="isCurrentUser" :isLinkParam="linkParam"></LeftTree>
            </div>
            <div class="content_main_right_content cm_content_main_right_content"  v-show="showScript === false">
              <!--基于时间点偏移-->
              <PointTimeOffset v-if="creatorId === 6 || creatorId === '6'"  @treeType="getTreeType" :formData="formData" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></PointTimeOffset>
              <!--时间段-->
              <TwoTimePoints v-if="creatorId === '8' || creatorId === 8" @treeType="getTreeType" :formData="formData" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></TwoTimePoints>
              <!-- 测量值-工程参数在时间点的值 -->
              <ParamTwoSetTimePoint v-if="creatorId === '9' || creatorId === 9"  @treeType="getTreeType" :formData="formData"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></ParamTwoSetTimePoint>
              <!-- 测量值-工程参数在时间点的聚合值 -->
              <LibraryMeasureOneParam  v-if="creatorId === '10' || creatorId === 10"  @treeType="getTreeType"  :formData="formData"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></LibraryMeasureOneParam>
              <!-- 测量值-工程参数在时间段的聚合值 -->
              <TimeSoltAggregation  v-if="creatorId === '18' || creatorId === 18" @treeType="getTreeType" :formData="formData"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></TimeSoltAggregation>
              <!--统计筛选方式、时间段发生次数-->
              <ScreeningTimes v-if="creatorId === '22' || creatorId === 22" @treeType="getTreeType" :formData="formData"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></ScreeningTimes>

              <!--逻辑值 / 筛选方式 - 多个工程参数判断-->
              <LuoJiGuanXi v-if="creatorId === 12 || creatorId === 14" ref="luojiguanxi" :tableListEditData="tableListEditData" :scriptId="scriptId" :options="optionList"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></LuoJiGuanXi>
            </div>
            <!--所有脚本都在此处-->
            <span v-show="showScript">
              <!-- 左侧元素 -->
              <div class="script_left" >
                <ParamTwoScriptTree @listenToChildStepEvent="showMsgFromChild" @listenToChildStepEvent1="showMsgFromChildSystem" :showDescription="showDescription" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" :isLoadScript="isLoadScript"></ParamTwoScriptTree>
              </div>
              <div class="script_edit">
                <iframe id="ifid" ref="iframe" src="/DSAP/static/groovyIDE/index2.html" width="100%" style="height:93%;width: 96%;margin-left: 2%;margin-top: 3%"  readonly="readonly" ></iframe>
              </div>
            </span>
          </div>
        </div>
        <div class="content_main_right cm_param-two-right">
          <el-tabs v-model="rightTabActive"   class="tab-profile">
            <el-tab-pane label="  当前所选版本库为" name="rightShuxing"  >
              <div class="point-ylgx">
                <el-row v-for="(item, index) of multipleSelection"
                        :key="index"
                        style="line-height: 40px;border-bottom: solid 1px #dddd;">
                  {{item.versionLibrary}} （{{item.planeType}}）
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 计算结果" name="ylgx"  v-if="isCurrentUser && !linkParam">
              <div class="point-ylgx calc_result">
                <!-- <el-collapse  v-model="activeName"  v-for="(item, index) in relyonArr"  :key="item.id" @change="panelChangeTwo(item, index)">
                  <el-collapse-item :title="index" :name="index">
                    <div v-show="errorShow" class="collapse_content" :ref="'collapse_content' + index"></div>
                    <div class="flight_no" :ref="'flight_no' + index"></div>
                  </el-collapse-item>
                </el-collapse> -->
                <div v-for="(item, index) in relyonArr" :key="item.id">
                  <div style="border-bottom:1px solid rgba(221, 221, 221, 0.867);padding-top:15px;">
                    <!--版本库-->
                    <div style="height:42px;line-height:42px;background-color:#F5F2F1;">
                      <div style="width:95px;height:42px;text-align:right;float:left;">版本库：</div>
                      <div style="float:left;">{{index}}</div>
                      <!--按钮-->
                       <el-button  title="查看结果"   type="info"  size="mini" round style="padding: 3px 5px;"   @click="showResultPage(item, index)">查看</el-button>
                      <div class="construction_img" @click="panelChangeTwo(item, index)">
                        <!-- <el-button style="margin-left:10px" title="显示结构" icon="el-icon-star-off" type="info" circle plain @click="panelChangeTwo(item, index)"></el-button> -->
                      </div>
                    </div>
                    <!--计算结果-->
                    <div style="margin-left:25px;height:42px;line-height:42px;text-align:right;float:left;">计算结果：</div>
                    <div v-if="item['EXCEPTION_REASON']" class="exception_txt textarea">{{item.EXCEPTION_REASON}}</div>
                    <div v-else-if="item['test_data'] && item.test_data.length > 0 " class="flight_no" style="float:left;height:42px;line-height:42px;">{{item.test_data[0].value}}</div>
                    <div v-else class="textarea">{{item}}</div>
                    <div class="clearfloat" style="clear:both;height:0;font-size:1px;line-height:0px;"></div>
                  </div>
                </div>
                <div v-show="rightShow">
                  <div class="right_shade"></div>
                  <div class="right_content">
                    <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/DSAP/static/orgChart/color-coded/org_chart.html" ></iframe>
                    <el-button @click="closePopup" style="float:right;margin:10px 26px 0px 0px;">关闭</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="content_bottom">
        <div style="float: right; margin-top: 20px;margin-right: 25px;">
          <el-button type="primary" style="float: left;margin-left: 10px;"  @click="prevStep"  v-show="show_last_button" size="mini">上一步</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;" @click="nextStep"  v-show="show_nextBtn" size="mini">下一步</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;" size="mini" @click="onTest" v-show="show_nextBtn === false && (this.isLinkParam === null || this.isLinkParam === undefined || this.isLinkParam === false) && isCurrentUser">测 试</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;" @click="saveTwoDimensionRelation" size="mini" v-show="show_nextBtn === false && (this.isLinkParam === null || this.isLinkParam === undefined || this.isLinkParam === false) && isCurrentUser" >保   存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  function checkEditor (vue, val) {
    if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
      vue.saveContentLoding = false
      vue.$store.commit('HIDE_LOADING', '拼命加载中!')

      vue.$refs.iframe.contentWindow.insertMethod(val)
    } else {
      setTimeout(function () {
        checkEditor(vue, val)
      }, 1500)
    }
  }
  const PointTimeOffset = () => import('components/paramtwo/PointTimeOffset')
  const TwoTimePoints = () => import('components/paramtwo/TwoTimePoints')
  const ParamTwoSetTimePoint = () => import('components/paramtwo/ParamTwoSetTimePoint')
  const LibraryMeasureOneParam = () => import('components/paramtwo/LibraryMeasureOneParam')
  const TimeSoltAggregation = () => import('components/paramtwo/TimeSoltAggregation')
  const ParamTwoScriptTree = () => import('components/paramtwo/ParamTwoScriptTree')
  const LuoJiGuanXi = () => import('components/paramtwo/LuoJiGuanXi')
  const LeftTree = () => import('components/paramtwo/LeftTree')
  const checkLibraryParam = () => import('components/paramtwo/checkLibraryParam')
  const ScreeningTimes = () => import('components/paramtwo/ScreeningTimes')

  export default {
    data () {
      return {
        scriptContent: '', // 点击测试返回的script
        isCurrentUser: false,
        treeData: {},
        treeNode: {},
        showDescription: false,
        dialogVisible: false,
        relyonArr: {},
        optionList: [], // 动态传 逻辑值或筛选方式的 option
        // 逻辑值
        options1: [{
          value: '==',
          label: '=='
        }, {
          value: '>',
          label: '>'
        }, {
          value: '<',
          label: '<'
        }, {
          value: '<>',
          label: '!='
        }, {value: '>=',
          label: '>='
        }, {value: '<=',
          label: '<='
        }],
        // 筛选方式
        options: [{
          value: '=',
          label: '='
        }, {
          value: '>',
          label: '>'
        }, {
          value: '<',
          label: '<'
        }, {
          value: '<>',
          label: '!='
        }, {value: '>=',
          label: '>='
        }, {value: '<=',
          label: '<='
        }],
        activeStep: 2, // 默认是第二步开始，第一步是前面的一个弹框
        selectBindingMappingPage: false, // 选中绑定界面
        addFenXiSuanFaPage: false, // 新增分析算法界
        completeStatus: false, // 完成界面
        showScript: false,
        creatorId: 0, // 节点id, 也是 选中分析参数算法选项 radio 的值
        activeName: 'setTimePoint',
        rightTabActive: 'rightShuxing',
        showtabsForBind: 'bdshuxing',
        treeLoading: false,
        fileNewTreeArr: [], // 左侧树状数据
        mappingLoadding: false,
        saveContentLoding: false,
        saveLoaddingText: '正在保存...',
        lefTabActive: 'paramTwomapping', // 选中tab的name
        timePointTitle: '映射',
        libraryList: [], // 版本库
        bindLoadidng: false,
        scriptList: [], // 绑定关系左侧树状数据
        modelIds: [], // 存储复选框选中的值(String 数组) 用于提交
        multipleSelection: [], // 选中版本库映射的数据
        editJsonData: {}, // 编辑时传过来的数据
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        iconMoreShow: false, // 自定义节点图标
        iconOtherShow: false, // 自定义节点图标
        iconShow: true, // 树节点过滤图标
        searchShow: true, // 树节点搜索框
        filterText: '',
        scriptId: null, //算法的id，在这里没用
        formLabelAlign: {
          name: '', // 新增分析参数的名称描述，绑定关系处显示
          desc: '',
          twoDimensionName: '', // 分析参数算法库的名称
          twoDimensionDescription: ''
        },
        selectModeList: [{
          ID: 1,
          NAME: '新建算法并绑定'
        }, {
          ID: 2,
          NAME: '绑定已有算法'
        }],
        tableListEditData: {'0': {'data': {
              '0': {'relation': '', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''},
              '1': { 'relation': '与', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': '' } },
            'relation': ''}
        }, // 编辑的时候传值过去
        formData: {
          screeningTypeId: '',
          screeningType: '',
          statistical: 'TWO_DIMENSION_NAME',
          zhongshu: '',
          number: '',
          timePoint: '',
          columnName: '',
          columnName1: '', // "ID":9,"NAME":"工程参数在时间点的值" 避免跟其他的重复
          interval: '', // 18
          intervalColumnName: '', // 18
          intervalAggregate: '',
          timePointOne: '',
          timePointTwo: '',
          aggregate: '',
          twoDimensionId: '' // 传入参数id
        },
        show_last_button: false, // 显示上一步
        show_nextBtn: true, // 显示下一步
        parentId: '-1', // 筛选方式界面默认父节点id
        childCreatorList: [], // 根据script查询分析函数选项
        showContent: false, // 输入内容界面
        rightShow: false,
        errorShow: false,
        url: '', //getTree的url
        showSelectLibraryParamDataData: '',
        paramManagerData: '',
        scriptType: 0, // 参数类型
        profileCatalogId: '',
        saveReturnTwoDimensionId: '', //保存后返回的参数id
        sourcePage: '', // 来源页面
        isLinkParam: false,
        currentUser: false,
        isLoadScript: false,
        twoDimensionNameValue: '', // 参数名称
        algorithmsLibraryNewEditStatus: false, // 是否编辑分析算法
        fromBindPage: false, // 页面状态 false表示保存 过来的。true表示从新建或者编辑算法按钮过来的
        profileData: [], // profile数组
        treeParam: {},
        mappingData: '',
        createSteps: [],
        arrCreatorId: [], // 存储点击过的节点id，
        scriptTypes: [], // 存储 父节点id 根节点为scriptType的值
        explainShow: false,
        treeType: ''
      }
    },
    components: {
      PointTimeOffset,
      TwoTimePoints,
      ParamTwoSetTimePoint,
      LibraryMeasureOneParam,
      TimeSoltAggregation,
      ParamTwoScriptTree,
      LuoJiGuanXi,
      LeftTree,
      checkLibraryParam,
      ScreeningTimes
    },
    watch: {
      filterText (val) {
        // if (this.url === '/apm/getProfileCatalogByUserIdWithoutStandard') {
        //   if (!this.$util.isDefine(val)) {
        //     this.getTree()
        //   }
        // } else if (this.url === '/apm/getGpTree') {
        //   if (!this.$util.isDefine(val)) {
        //     this.getTree()
        //   }
        // } else {
        //   this.$refs.tree.filter(val)
        // }
      }
    },
    // paramManagerData 返回到edit页面用
    props: ['showSelectLibraryParam', 'paramManagerObj', 'scriptType1', 'backProfileCatalogId', 'saveReturnTwoDimensionId1', 'twoDimensionName1', 'libraryIds', 'edit', 'page', 'linkParam', 'isCurrentUser1', 'nowTreeData', 'nowTreeNode'], // saveReturnTwoDimensionId1保存弹框后返回的参数id twoDimensionName保存弹框中的参数名
    mounted () {
      this.clearData() //清空原来的数据
      this.selectBindingMappingPage = false
      this.addFenXiSuanFaPage = false
      this.showSelectLibraryParamDataData = this.showSelectLibraryParam
      this.paramManagerData = this.paramManagerObj
      this.scriptType = this.scriptType1 // 参数类型
      this.profileCatalogId = this.backProfileCatalogId
      this.saveReturnTwoDimensionId = this.saveReturnTwoDimensionId1 // 保存后返回的参数id
      this.twoDimensionNameValue = this.twoDimensionName1
      this.sourcePage = this.page
      this.formData.twoDimensionId = this.saveReturnTwoDimensionId
      this.isLinkParam = this.linkParam
      this.multipleSelection = this.libraryIds // 选中的版本库
      this.isCurrentUser = this.isCurrentUser1
      this.treeData = this.nowTreeData
      this.treeNode = this.nowTreeNode
      if (this.sourcePage === 'saveAfter') {
        this.activeStep = 2
        this.showSelectLibraryParamDataData = false // 隐藏选择编辑界面
        this.selectBindingMappingPage = true // 显示绑定界面
        // 保存完毕查询版本库
        this.getAllModels()
      } else {
        // 页面来源是否算法绑定页面
        this.fromBindPage = true
        // 在新建。编辑绑定界面选中的版本库带过来。
        this.algorithmsLibraryNewEditStatus = this.edit // 记录是否编辑
        if (!this.showSelectLibraryParamDataData) { // 如果不是多个编辑选择 直接进入界面
          // 新增、单个编辑直接显示步骤3
          if (this.algorithmsLibraryNewEditStatus) { // 单个编辑
            this.mappingData = this.multipleSelection[0].mapping
            this.createSteps = this.multipleSelection[0].createSteps
          }
          this.show_last_button = false // 隐藏上一步菜单
          this.getNextActiveStep3()
        }
      }
    },
    methods: {
      // 编辑选择界面点击下一步
      getClickLibraryParamNextPage (v, o) {
        // 说明从绑定界面过来的，直接跳到第三步
        if (v === 1 || v === '1') {
          this.algorithmsLibraryNewEditStatus = false // 新增
        } else {
          this.algorithmsLibraryNewEditStatus = true // 编辑
        }
        this.sourcePage = 'FROM_SELECTLIBRARYPARAM' // 表示从选择界面进入
        this.mappingData = v
        this.createSteps = o
        this.getNextActiveStep3()
      },
      // 选择界面的上一页（绑定界面)
      getClickLibraryParamLastPage () {
        this.goBackParamTwoFile()
      },
      // 获取点击树传过来的值,并赋值给输入框
      getTreeNodeData (obj) {
        let name = obj.NAME
        if (this.creatorId === 6) { // 基于时间点偏移
          this.formData.timePoint = name
        } else if (this.creatorId === 8) { // 两个时间点组合
          if (this.treeType === 'shijiandian1') {
            this.formData.timePointOne = name
          } else if (this.treeType === 'shijiandian2') {
            this.formData.timePointTwo = name
          }
        } else if (this.creatorId === 9) { // 工程参数在时间点的值
          if (this.treeType === 'timePoint') {
            this.formData.timePoint = name
          } else if (this.treeType === 'paramone') {
            this.formData.columnName1 = name
          }
        } else if (this.creatorId === 10) { // 工程参数在时间点的聚合值
          //alert(this.treeType)
          if (this.treeType === 'timePoint1') {
            this.formData.timePointOne = name
          } else if (this.treeType === 'timePoint2') {
            this.formData.timePointTwo = name
          } else if (this.treeType === 'gcparam') {
            this.formData.columnName = name
          }
        } else if (this.creatorId === 18) { // 工程参数在时间段的聚合值
          if (this.treeType === 'checkTimeSlot') {
            this.formData.interval = name
          } else if (this.treeType === 'gcparam') {
            this.formData.intervalColumnName = name
          }
        } else if (this.creatorId === 22) { // 统计筛选方式
          this.formData.screeningType = name
          this.formData.screeningTypeId = obj.TID
        } else if (this.creatorId === 12 || this.creatorId === 14) { // 多个测量值判断 、多个工程参数判断
          this.$set(this.$refs.luojiguanxi.tableListData[this.$refs.luojiguanxi.currentInputTableIndex]['data'][this.$refs.luojiguanxi.currentInputRowIndex], 'parameterName', name)
        } else {
          var iframeDocument = this.$refs.iframe
          let v = this.multipleSelection[0].mapping
          iframeDocument.contentWindow.insertMethod(v) // 赋值到编辑器
        }
      },
      getTreeType (v) {
        //alert(v)
        this.treeType = v
      },
      removeTab (targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      },
      // 清除原来的数据
      clearData () {
        let hideMenuObj = {}
        hideMenuObj['paramTwo_algorithmsLibrary_new'] = false // 隐藏新建算法
        hideMenuObj['paramTwo_algorithmsLibrary_new_edit'] = false // 隐藏编辑算法
        hideMenuObj['paramTwo_algorithmsLibrary_new_remove'] = false // 隐藏清空算法
        hideMenuObj['paramTwo_edit'] = false // 隐藏新建算法
        hideMenuObj['paramTwo_edit_compute'] = false // 显示开始计算
        hideMenuObj['paramTwo_delete'] = false // 隐藏删除按钮
        hideMenuObj['paramTwo_share'] = false // 隐藏删除按钮
        hideMenuObj['paramTwo_share_cancle'] = false // 隐藏删除按钮
        this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, {}) // 修改二级菜单
        this.formLabelAlign.name = ''
        this.formLabelAlign.desc = ''
        this.formLabelAlign.twoDimensionDescription = ''
        this.formLabelAlign.twoDimensionName = ''
        this.formData.number = ''
        this.formData.timePoint = ''
        this.formData.columnName = ''
        this.formData.timePointOne = ''
        this.formData.timePointTwo = ''
        this.formData.aggregate = ''
        this.formData.intervalColumnName = ''
        this.formData.intervalAggregate = ''
      },
      // 查询版本库
      getAllModels () {
        this.bindLoadidng = true
        this.$axios.get('/apm/getAllModels', {params: {}}).then(response => {
          this.bindLoadidng = false
          var data = response.data
          if (data && data.length > 0) {
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$router.push({path: '/'})
            } else {
              // console.log('xxx:' + data)
              let tempList = []
              for (var i = 0; i < data.length; i++) {
                tempList.push({
                  versionLibrary: data[i].ID,
                  planeType: data[i].DESCRIPTION,
                  mapping: null,
                  title: null,
                  scriptId: null
                })
              }
              // console.log('xxx:' + tempList)
              this.libraryList = tempList
            }
          } else {
            this.bindLoadidng = false
          }
          this.clearData() //清空原来的数据
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.bindLoadidng = false
        })
      },
      //选中版本库映射进行后续操作
      selectionMapping (val) {
        this.multipleSelection = val
        // console.log('------------------' + this.multipleSelection)
      },
      // 上一步事件
      prevStep () {
        this.showDescription = false
        this.explainShow = false
        if (this.activeStep === 3) {
          this.getPreAcitveStep3Cotent()
        } else if (this.activeStep === 4) {
          this.activeStep = 3
          this.showContent = true // 从步骤四点过来，应该在 新建算法界面
          this.show_nextBtn = false //显示保存按钮隐藏下一步按钮
        }
      },
      // 步骤3时需要显示和隐藏的界面
      getPreAcitveStep3Cotent () {
        if (this.showContent) { // 如果为true，则在新建算法界面，此时需要关闭算法界面，显示 选择类型 界面
          this.showContent = false
          this.show_nextBtn = true //隐藏保存按钮，显示下一步按钮
          this.arrCreatorId.pop()
          let lastIndex = this.scriptTypes.length - 1
          let scriptType = this.scriptTypes[lastIndex - 1] // 获取到父节点
          let nowScriptType = this.scriptTypes[lastIndex] // 获取到当前节点
          this.scriptTypes.pop() // 删除最后一个节点类型
          this.getChildCreatorByScriptType(scriptType, nowScriptType) // 根据父节点查询，要把当前的节点选中
        } else {
          if (this.fromBindPage) {
            // 从绑定界面来的。
            if (this.sourcePage === 'paramFileditAdd') {
              this.goBackParamTwoFile()
            } else if (this.sourcePage === 'FROM_SELECTLIBRARYPARAM') { // 在选择界面选择后进入
              this.showSelectLibraryParamDataData = true
            } else {
              this.goBackParamTwoFile()
            }
            // } else {
            //   this.goBackParamTwoFile()
            // }
          } else {
            // 为false 时，在选择类型界面，此时点击上一步需要 跳转到第二步骤
            this.activeStep = 2 // 选中第2个步骤
            this.show_last_button = false // 隐藏上一步菜单
            this.selectBindingMappingPage = true // 显示绑定界面
            this.addFenXiSuanFaPage = false // 隐藏新建页面
          }
        }
      },
      // 返回绑定关系界面
      goBackParamTwoFile () {
        this.$bus.$emit('param_two_binding_select_librarys', {
          backTreeNode: this.treeNode,
          backTreeData: this.treeData,
          paramManagerObj: this.paramManagerData,
          scriptType: this.scriptType,
          isCurrentUser: this.isCurrentUser,
          backProfileCatalogId: this.profileCatalogId,
          saveReturnTwoDimensionId: this.saveReturnTwoDimensionId,
          twoDimensionNameValue: this.twoDimensionNameValue
        })
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit', zhName: this.twoDimensionNameValue, isClosable: true, parent: 'paramTwo_paramLibray', count: 0, goback: 'ParamTwoSavedAfter'})
      },
      // 点击下一步事件
      nextStep () {
        //第二步
        if (this.activeStep === 2) {
          if (this.multipleSelection === null || this.multipleSelection.length === 0) {
            this.$message.error('至少选一个版本库')
          } else {
            this.getNextActiveStep3()
          }
        } else if (this.activeStep === 3) {
          this.getChildCreatorByScriptType(this.creatorId, null) // 根据算法类型查询算法类型子节点，如果没有子节点，则进入下一步骤，如果有，则继续选择
        }
      },
      // 下一步进入步骤3
      getNextActiveStep3 () {
        this.activeStep = 3 // 选中第三个步骤
        this.selectBindingMappingPage = false // 隐藏绑定界面
        this.showSelectLibraryParamDataData = false // 进入这个步骤 选择界面就要隐藏了
        this.addFenXiSuanFaPage = true // 显示新建页面
        this.showContent = false // 显示选择绑定隐藏输入 界面
        this.show_nextBtn = true //隐藏保存按钮，显示下一步按钮
        this.getChildCreatorByScriptType(this.scriptType, null) // 根据参数类型查询算法类型
        if (this.scriptTypes.indexOf(this.scriptType) < 0) {
          this.scriptTypes.push(this.scriptType) // 第一次查询把父节点 参数类型存进去
        }
      },
      // 查询算法类型
      getChildCreatorByScriptType (creatorId, oldCreatorId) {
        this.showScript = false // 默认隐藏脚本编辑
        // 初次根据 参数类型查询算法类型
        this.$axios.get('/apm/getChildCreator', {params: {id: creatorId}}).then(response => {
          if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
            this.$router.push({path: '/'})
          } else {
            this.childCreatorList = []
            this.childCreatorList = response.data
            if (this.childCreatorList !== null && this.childCreatorList !== '' && this.childCreatorList.length > 0) {
              // 不是从选择版本库界面，并且不是从多编辑算法选择界面过来的。隐藏上一步。
              if (this.sourcePage !== 'FROM_SELECTLIBRARYPARAM' && this.arrCreatorId.length === 0 && (!this.libraryList || this.libraryList.length === 0)) {
                this.show_last_button = false
              } else { // 如果从选择界面过来的，他依然要返回选择界面的
                this.show_last_button = true
              }
              if (this.$util.isDefine(oldCreatorId)) {
                this.creatorId = oldCreatorId * 1
              } else {
                if (this.algorithmsLibraryNewEditStatus) { // 如果是编辑
                  this.editJsonData = this.createSteps
                  this.creatorId = this.editJsonData.creatorId * 1
                } else {
                  this.editJsonData = {}
                  this.clearData()
                  if (creatorId === 5 || creatorId === '5') { // 如果是事件，则默认选中脚本编辑，其他的几个选项不展示
                    this.creatorId = 16
                  } else {
                    this.creatorId = this.childCreatorList[0].ID * 1 // 默认选中第一个
                  }
                }
              }
            } else {
              this.showDescription = false
              // 根据算法类型查询不到子节点，则进入下一步骤，显示内容隐藏选择界面。
              this.scriptTypes.push(this.creatorId + '') // 如果有子节点存储当前id为父节点
              this.showContent = true // 显示内容，隐藏选则算法类型界面
              this.show_last_button = true // 显示上一步菜单
              this.show_nextBtn = false //显示保存按钮隐藏下一步按钮
              //加载树,其余的在对应的单独页面加载
              // 逻辑值和筛选方式需要设置默认值，以及下拉选择值
              if (this.creatorId === 12) {
                this.optionList = this.options1
              } else if (this.creatorId === 14) {
                this.optionList = this.options
              } else if (this.creatorId === 7 || this.creatorId === '7' || this.creatorId === '11' ||
                this.creatorId === 11 || this.creatorId === '13' || this.creatorId === 13 ||
                this.creatorId === '15' || this.creatorId === 15 || this.creatorId === 16 || this.creatorId === '16' ||
                this.creatorId === 17 || this.creatorId === '17') {
                this.showScript = true // 显示脚本编辑
                this.isLoadScript = true // 加载脚本编辑tree
              }
              this.setEditValue()
              this.arrCreatorId.push({
                // 存选中的节点
                ID: this.creatorId
              })
            }
          }
        }).catch(response => {
          // this.$message.error('数据加载失败了!')
          this.treeLoading = false
        })
      },
      // 测试按钮
      onTest () {
        let jsonData = this.getJsonDta(this.creatorId)
        if (jsonData) {
          this.rightTabActive = 'ylgx'
          this.saveLoaddingText = '正在计算...'
          this.saveContentLoding = true
          // console.log('jsonData' + jsonData)
          var arr = this.multipleSelection
          let index = 0
          let objData = {}
          this.relyonArr = {}
          for (var i = 0; i < arr.length; i++) {
            let str = arr[i].versionLibrary
            this.$axios(
            {
              url: '/apm/getTwoTreesByContent?twoDimensionId=' + this.saveReturnTwoDimensionId + '&modelId=' + str + '&creatorId=' + this.creatorId,
              method: 'post',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: jsonData
            }
          ).then(response => {
              index++ // 执行的次数
              for (let item in response.data) {
                if (item === 'script') {
                  this.scriptContent = response.data[item]
                } else {
                  objData[item] = response.data[item]
                }
              }
              // 执行的次数和 数组的长度一样 说明已经全部执行完毕，此时给 relyonArr赋值
              if (index === arr.length) {
                this.relyonArr = objData
                setTimeout(
                  this.saveContentLoding = false
                  , 3000)
              }
            }).catch(response => {
              this.saveContentLoding = false
              this.$message.error('计算失败！')
            })
          }
        }
      },
      getValue (v) {
        if (v === null || v === undefined || v === '') {
          return ''
        }
        return v
      },
      // 显示计算结果
      showResultPage (item, index) {
        if (item['test_data'] && item['test_data'].length > 0) {
          let testData = item['test_data']
          let scriptContent = this.scriptContent
          let obj = {libraryData: index, test_data: testData, scriptContent: scriptContent, profileId: this.paramManagerData.ID}
          this.$bus.$emit('ParamTwoCalculationResultsData', obj)
          this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_calculation_results', zhName: '计算结果', isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
        }
      },
      // 展示详细信息
      panelChangeTwo (item, index) {
        this.rightShow = true
        var obj = {}
        obj[index] = item
       // console.log(JSON.stringify(obj))
        this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
        // if (item['EXCEPTION_REASON']) {
        //   this.errorShow = true
        //   this.$refs['collapse_content' + index][0].textContent = item.EXCEPTION_REASON
        // } else {
        //   this.rightShow = true
        //   if (item['test_data']) {
        //     this.$refs['flight_no' + index][0].textContent = item.test_data[0].value
        //   } else {
        //     this.$refs['flight_no' + index][0].textContent = JSON.stringify(item)
        //   }
        //   var obj = {}
        //   obj[index] = item
        //   console.log(JSON.stringify(obj))
        //   this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
      },
      // 保存 绑定映射关系。
      saveTwoDimensionRelation () {
        let stepsData = this.geStepsDta(this.creatorId)
        let jsonData = this.getJsonDta(this.creatorId)
        if (jsonData !== null) {
          this.saveLoaddingText = '正在保存...'
          this.saveContentLoding = true
          // console.log('jsonData' + jsonData)
          // console.log('stepsData' + stepsData)
          var arr = this.multipleSelection
          let modelIds = ''
          let modelId = ''
          for (var i = 0; i < arr.length; i++) {
            modelId = arr[i].versionLibrary
            if (i === 0) {
              modelIds = modelId
            } else {
              modelIds += ',' + modelId
            }
          }
          this.$axios(
            {
              url: '/apm/bindTwoDimensionRelation?twoDimensionId=' + this.saveReturnTwoDimensionId + '&modelIds=' + modelIds + '&creatorId=' + this.creatorId,
              method: 'post',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: {
                  json: jsonData,
                  steps: stepsData
              }
            }
          ).then(response => {
            this.saveContentLoding = false
            var data = response.data
            if (data.status === '0') {
              this.$message({
                type: 'success',
                message: data.message
              })
              // 跳转到绑定页面
              this.goBackParamTwoFile()
            } else if (data.status === 'E1001') {
              this.$router.push({path: '/'})
            } else {
              this.$message.error(data.message)
            }
          }).catch(response => {
            this.saveContentLoding = false
          })
        }
      },
      // 根据不同的算法类型 拼装不同的json数据
      getJsonDta (creatorId) {
        if (creatorId === 6 || creatorId === '6') {
          if (!this.formData.timePoint) {
            this.$message.error('时间点不能为空!')
            return null
          } else if (this.formData.number === undefined || this.formData.number === '') {
            this.$message.error('时间点偏移值不能为空!')
            return null
          }
          return '{"TIMEPOINT": "' + this.formData.timePoint + '", "OFFSET": "' + this.formData.number + '"}'
        } else if (creatorId === 8 || creatorId === '8') {
          if (!this.formData.timePointOne || !this.formData.timePointTwo) {
            this.$message.error('时间点不能为空！')
            return null
          }
          return '{"TIMEPOINT_START": "' + this.formData.timePointOne + '", "TIMEPOINT_END": "' + this.formData.timePointTwo + '"}'
        } else if (creatorId === 9 || creatorId === '9') {
          if (!this.formData.timePoint) {
            this.$message.error('时间点不能为空！')
            return null
          } else if (!this.formData.columnName1) {
            this.$message.error('工程参数不能为空！')
            return null
          }
          return '{"TIMEPOINT": "' + this.formData.timePoint + '", "COLUMN_NAME": "' + this.formData.columnName1 + '"}'
        } else if (creatorId === 10 || creatorId === '10') {
          if (!this.formData.timePointOne || !this.formData.timePointTwo) {
            this.$message.error('时间点不能为空')
            return null
          } else if (!this.formData.columnName) {
            this.$message.error('工程参数不能为空')
            return null
          } else if (!this.formData.aggregate || this.formData.aggregate === '请选择') {
            this.$message.error('请选择聚合参数')
            return null
          }
          return '{"TIME_POINT_START": "' + this.formData.timePointOne + '", "TIME_POINT_END": "' + this.formData.timePointTwo + '", "COLUMN_NAME": "' + this.formData.columnName + '", "AGGREGATE":"' + this.formData.aggregate + '"}'
        } else if (creatorId === 18 || creatorId === '18') {
          if (!this.formData.interval) {
            this.$message.error('时间段不能为空！')
            return null
          } else if (!this.formData.intervalColumnName) {
            this.$message.error('工程参数不能为空！')
            return null
          } else if (!this.formData.intervalAggregate) {
            this.$message.error('请选择聚合参数！')
            return null
          }
          return '{"INTERVAL": "' + this.formData.interval + '", "COLUMN_NAME": "' + this.formData.intervalColumnName + '", "AGGREGATE":"' + this.formData.intervalAggregate + '"}'
        } else if (creatorId === 22 || creatorId === '22') {
          if (!this.formData.screeningTypeId || !this.formData.screeningTypeId) {
            this.$message.error('筛选方式不能为空')
            return null
          }
          return '{"TWO_DIMENSION_NAME": "' + this.formData.screeningType + '"}'
        } else if (this.showScript) {
          var editorContent = this.$refs.iframe.contentWindow.editor.getValue()
          if (!editorContent) {
            this.$message.error('脚本不能为空')
            return null
          }
          return editorContent
        } else if (creatorId === 12 || creatorId === '12') {
          let script = '('
          let paramIsNull = true
          for (let item in this.$refs.luojiguanxi.tableListData) {
            var data = this.$refs.luojiguanxi.tableListData[item]
            if (this.checkIsNotNull(data.relation)) {
              let relation = data.relation === '与' ? '&&' : '||'
              script += relation
            }
            script += '('
            for (let dt in data.data) {
              let obj = data.data[dt]
              if (obj.parameterName === null || obj.parameterName === undefined || obj.parameterName === '') {
                this.$message.error('参数不能为空!')
                return null
              } else if (obj.selectValue === '' || obj.selectValue === '请选择') {
                this.$message.error('请选择比较函数!')
                return null
              } else if (obj.parameterValue === null || obj.parameterValue === undefined || obj.parameterValue === '') {
                this.$message.error('值不能为空!')
                return null
              } else {
                if (this.checkIsNotNull(obj.relation)) {
                  var relation1 = obj.relation === '与' ? '&&' : '||'
                  script += ' ' + relation1 + ' '
                }
                paramIsNull = false
                script += '_.runScript(\\"' + obj.parameterName + '\\") ' + obj.selectValue + ' ' + this.getParam(obj.parameterValue)
              }
            }
            script += ')'
            script = script.replace('&&()', '').replace('||()', '').replace('&& ()', '').replace('|| ()', '')
          }
          script += ')'
          if (paramIsNull) {
            return null
          } else {
            return '{"CONDISION": "' + script + '"}'
          }
        } else if (creatorId === 14 || creatorId === '14') { // 筛选方式
          // let paramIsNull = true
          let script = 'return _.data().filter("'
          for (let item in this.$refs.luojiguanxi.tableListData) {
            let data = this.$refs.luojiguanxi.tableListData[item]
            if (this.checkIsNotNull(data.relation)) {
              let relation = data.relation === '与' ? 'AND' : ' OR'
              script += ' ' + relation + ' '
              this.flag = true // 表示有多个组
            }
            script += '('
            for (let dt in data.data) {
              let obj = data.data[dt]
              if (obj.parameterName === null || obj.parameterName === undefined || obj.parameterName === '') {
                this.$message.error('工程参数不能为空!')
                return null
              } else if (obj.selectValue === '' || obj.selectValue === '请选择') {
                this.$message.error('请选择比较函数!')
                 return null
              } else if (obj.parameterValue === null || obj.parameterValue === undefined || obj.parameterValue === '') {
                this.$message.error('值不能为空!')
                return null
              } else {
                if (this.checkIsNotNull(obj.relation)) {
                  var relation2 = obj.relation === '与' ? 'AND' : ' OR'
                  script += ' ' + relation2 + ' '
                }
                // paramIsNull = false
                script += '\'' + obj.parameterName + '\' ' + obj.selectValue + ' ' + this.getParam(obj.parameterValue)
              }
            }
            script += ')'
            script = script.replace('AND()', '').replace('OR()', '').replace('AND ()', '').replace('OR ()', '')
          }
          script += '");'
          // if (paramIsNull) {
          //   this.$message.error('不能有空值!')
          //   return null
          // } else {
            return script
          // }
        }
      },
      // 根据不同的算法类型 拼装不同的step数据
      geStepsDta (creatorId) {
        this.arrCreatorId = []
        if (creatorId === 6 || creatorId === '6') {
          return '{"timepoint": "' + this.formData.timePoint + '", "offset": "' + this.formData.number + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "' + this.twoDimensionNameValue + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + '}'
        } else if (creatorId === 8 || creatorId === '8') {
          return '{"arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '",  "stepTitle": "' + this.twoDimensionNameValue + '", "timepoint1": "' + this.formData.timePointOne + '", "timepoint2": "' + this.formData.timePointTwo + '"}'
        } else if (creatorId === 9 || creatorId === '9') {
          return '{"timepoint": "' + this.formData.timePoint + '", "columnName": "' + this.formData.columnName1 + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "' + this.twoDimensionNameValue + '"}'
        } else if (creatorId === 10 || creatorId === '10') {
          return '{"timepoint1": "' + this.formData.timePointOne + '", "timepoint2": "' + this.formData.timePointTwo + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "columnName": "' + this.formData.columnName + '","aggregate": "' + this.formData.aggregate + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "' + this.twoDimensionNameValue + '"}'
        } else if (creatorId === 18 || creatorId === '18') {
          return '{"INTERVAL": "' + this.formData.interval + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "COLUMN_NAME": "' + this.formData.intervalColumnName + '","AGGREGATE": "' + this.formData.intervalAggregate + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "' + this.twoDimensionNameValue + '"}'
        } else if (creatorId === 22 || creatorId === '22') {
          return '{"screeningType": "' + this.formData.screeningType + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "screeningTypeId": "' + this.formData.screeningTypeId + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "' + this.twoDimensionNameValue + '"}'
        } else if (this.showScript) {
          return ' {"activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "stepTitle": "脚本编辑", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + '}'
        } else if (creatorId === 12 || creatorId === '12') {
          return '{"contentList": ' + JSON.stringify(this.$refs.luojiguanxi.tableListData) + ', "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ',  "stepTitle": "' + this.twoDimensionNameValue + '", "creatorId": "' + this.creatorId + '"}'
        } else if (creatorId === 14 || creatorId === '14') { // 筛选方式
          return '{"contentList": ' + JSON.stringify(this.$refs.luojiguanxi.tableListData) + ', "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "stepTitle": "' + this.twoDimensionNameValue + '", "creatorId": "' + this.creatorId + '"}'
        }
      },
      getParam (val) {
        if (isNaN(val)) {
          return '\'' + val + '\''
        } else {
          return val
        }
      },
      // 节点悬浮描述信息
      renderContent (h, { node, data, store }) {
        return (
          <span class='custom-tree-node'>
          <span title={data.DESCRIPTION ? data.DESCRIPTION : data.NAME}>{node.label}</span>
          </span>
      )
      },
      // 赋值工程参数
      showMsgFromChild (data) {
        if (data === 'hide') {
          this.explainShow = false
        } else {
          let content = 'left_"' + data.NAME + '"'
          checkEditor(this, content) // 脚本内容 需要“”
        }
      },
      // 赋值系统函数 （分析）
      showMsgFromChildSystem (data) {
        if (data === 'hide') {
          this.explainShow = false
        } else {
          let content = 'left_' + data.METHOD_NAME
          checkEditor(this, content) // 脚本 不需要“”
        }
      },
      checkIsNotNull (val) {
        if (val !== null && val !== undefined && val !== '') {
          return true
        } else return false
      },

      closePopup () {
        this.rightShow = false
        this.$refs.iframeOrgChart.contentDocument.getElementById('chart-container').innerText = ''
      }, // 刷新事件
      refresh () {
        this.treeLoading = true
        this.getTree()
      },
      filterNode (value, data) {
        if (!value) return true
        return data.NAME.indexOf(value) !== -1
      },
      isArray (o) {
        return Object.prototype.toString.call(o)
      },
      // 编辑赋值
      setEditValue () {
        let json = this.editJsonData
        if (this.creatorId === 6 || this.creatorId === '6') { // 基于时间点偏移
          this.formData.timePoint = json.timepoint
          this.formData.number = json.offset
        } else if (this.creatorId === 8) { // 两个时间点组合
          this.formData.timePointOne = json.timepoint1
          this.formData.timePointTwo = json.timepoint2
        } else if (this.creatorId === 9) { // 工程参数在时间点的值
          this.formData.timePoint = json.timepoint
          this.formData.columnName1 = json.columnName
          let arr = json.columnName
          if (Array.isArray(arr)) {
            this.formData.columnName1 = arr[0]
          } else {
            this.formData.columnName1 = arr
          }
        } else if (this.creatorId === 10) { // 工程参数在两个时间点的聚合值
          this.formData.timePointOne = json.timepoint1
          this.formData.timePointTwo = json.timepoint2
          this.formData.columnName = json.columnName
          this.formData.aggregate = json.aggregate
        } else if (this.creatorId === 18) { // 工程参数在时间段的聚合值
          this.formData.interval = json.INTERVAL
          this.formData.intervalColumnName = json.COLUMN_NAME
          this.formData.intervalAggregate = json.AGGREGATE
        } else if (this.creatorId === 22) { // 统计次数
          this.formData.screeningType = json.screeningType
          this.formData.screeningTypeId = json.screeningTypeId
        } else if (this.creatorId === 12 || this.creatorId === 14) { // 多个测量值判断 多个工程参数判断
          this.tableListEditData = json.contentList
        } else {
          //如果是编辑状态，给他赋值
          if (this.algorithmsLibraryNewEditStatus) {
            // this.saveLoaddingText = '加载脚本中...'
            // this.saveContentLoding = true
            this.$store.commit('SHOW_LOADING', '正在加载数据...')
            setTimeout(() => {
              checkEditor(this, this.mappingData) // 脚本内容
            }, 3000)
          }
        }
      }
    }
  }
</script>

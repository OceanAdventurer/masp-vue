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
  height: calc(80vh - 204px);
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
  width: 30%;
  height: calc(80vh - 155px);
}

.script_edit {
  float:left;
  width: 68%;
  /* height: 100%; */
  height: calc(80vh - 153px);
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
  height: calc(80vh - 150px);
  width: 100%;
}
.left_tree {
  overflow: auto;
  height: calc(80vh - 182px);
}

.left_filter {
  margin-top: 5px;
  /* padding: 4px 10px 0px; */
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
  height: calc(80vh - 155px);
}
.content_main_right>.el-tabs>.el-tabs__content>.el-tab-pane>div {
  position: relative;
  height: calc(80vh - 155px);
}
.el-tabs__content > .el-tab-pane > div {
  position: relative;
  height: calc(80vh - 155px);
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
  height: calc(80vh - 121px);
  width: 100%;
  border-top: solid 1px #ebeef5;
  border-bottom: solid 1px #ebeef5
}
.content_bottom{
  width: 100%;
  float: left;
  height: 70px;width: 100%;
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
  height: calc(80vh - 204px);
  padding-left: 15px;
}
</style>
<template>
  <div class="all_content"   :element-loading-text="saveLoaddingText"  v-loading="saveContentLoding">
    <!--选择多个不通算法的版本库选择界面-->
    <checkLibraryEvent v-if="showSelectLibraryParamDataData" @nextEventPageEmit="getClickLibraryParamNextPage" @lastPageEmit="getClickLibraryParamLastPage" :libraryIds="libraryIds"   :linkParam="this.linkParam" :isCurrentUser="isCurrentUser"></checkLibraryEvent>
    <div v-if="!showSelectLibraryParamDataData">
      <!--新建/编辑算法步骤页面-->
      <div class="content_top">
        <div v-show="isCurrentUser && !isLinkParam">
          <el-steps :active="activeStep" style="position: relative;width: 60%; float: left; margin-left: 20%;margin-top: 10px">
            <el-step title="新建事件" style="color:#2A436F"></el-step>
            <el-step title="选定版本库"></el-step>
            <el-step title="定义事件"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
      </div>
      <!--显示绑定-新增事件的时候，需要选择版本库，只有新增的情况下出现-->
      <div class="content_main" v-show="selectBindingMappingPage">
        <el-table style="height: 93%;overflow-y: auto;overflow-x: hidden;width: 96%;float: left;margin-left: 2%; margin-top: 18px;"
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
        <div class="content_main_left">
          <div v-if="showContent === false" >
            <el-radio-group v-model="creatorId" v-if="childCreatorList.length > 0" style="padding-left: 40%; padding-top: 14%;">
              <el-form v-for="item in childCreatorList" :key="item.ID" label-width="20%" size="mini" >
                <el-form-item>
                  <el-radio :label="item.ID"  v-if="(isLinkParam || !isCurrentUser) && item.ID != creatorId" disabled>{{item.NAME}}</el-radio>
                  <el-radio v-else :label="item.ID"  >{{item.NAME}}</el-radio>
                </el-form-item>
              </el-form>
            </el-radio-group>
          </div>
          <div v-else>
            <div class="content_main_left_tree" v-show="creatorId >0 && showScript === false ">
              <!--左侧的树-->
              <LeftTree @getTreenodeData1="getTreeNodeData" :treeType="treeType" :creatorId="creatorId" :twoDimensionId="saveReturnTwoDimensionId" :showDescription="showDescription" :isCurrentUser="isCurrentUser" :isLinkParam="linkParam"></LeftTree>
            </div>
            <div class="content_main_right_content"  v-show="showScript === false">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="  配置" name="first" style="overflow-y: auto;height: calc(80vh - 189px);width: 100%;">
                  <!--根据测量参数-->
                  <MeasurementParameters v-if="creatorId === 19|| creatorId === '19'" ref="measurementParametersRef"  :algorithmsLibraryNewEditStatus="algorithmsLibraryNewEditStatus" :parentName="parentName" :flightModelData="flightModelData" :MeasurementParametesTable1="MeasurementParametesTable" :checkAcTypeData="checkAcTypeData"   @treeType1="getTreeType" :formData="formData" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" @getChangeData="getChangeData"></MeasurementParameters>
                  <!--根据筛选方式参数-->
                  <ScreeningMethod v-if="creatorId === '20' || creatorId === 20"  ref="screeningMethodRef"    :algorithmsLibraryNewEditStatus="algorithmsLibraryNewEditStatus"  :flightModelData="flightModelData" :checkAcTypeData="checkAcTypeData"  @treeType1="getTreeType" :formData="formData" :ScreeningMethodTable1="ScreeningMethodTable"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></ScreeningMethod>
                  <!--编写filter脚本-->
                  <FilterScript v-if="creatorId === 21 || creatorId === '21'" ref="filterScriptRef"   :algorithmsLibraryNewEditStatus="algorithmsLibraryNewEditStatus"   :flightModelData="flightModelData" :checkAcTypeData="checkAcTypeData"  :formData="formData" :FilterScriptTable1="FilterScriptTable" :tableListEditData="tableListEditData" :scriptId="scriptId" :options="options"  :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam"></FilterScript>
                </el-tab-pane>
<!--                <el-tab-pane label="关注的分析参数" name="second">-->
<!--                  <div style="width: 100%;margin-top: 10px;">-->
<!--                                        <el-table-->
<!--                                          :data="tableData"-->
<!--                                          height="250"-->
<!--                                          border-->
<!--                                          style="width: 100%">-->
<!--                                          <el-table-column-->
<!--                                            prop="name"-->
<!--                                            label="事件等级"-->
<!--                                            width="180">-->
<!--                                          </el-table-column>-->
<!--                                          <el-table-column-->
<!--                                            prop="address"-->
<!--                                            label="比较">-->
<!--                                          </el-table-column>-->
<!--                                        </el-table>-->
<!--                  </div>-->
<!--                </el-tab-pane>-->
              </el-tabs>
            </div>
            <!--所有脚本都在此处-->
            <span v-show="showScript">
              <!-- 左侧元素 -->
              <div class="script_left" >
                <EventScriptTree @listenToChildStepEvent="showMsgFromChild" @listenToChildStepEvent1="showMsgFromChildSystem" :showDescription="showDescription" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" :isLoadScript="isLoadScript"></EventScriptTree>
              </div>
              <div class="script_edit">
                <iframe id="ifid" ref="iframe" src="/csap/static/groovyIDE/index2.html" width="100%" style="height:97%;width: 94%;margin-left: 4%;margin-top: 3%"  readonly="readonly" ></iframe>
              </div>
            </span>
          </div>
        </div>
        <div class="content_main_right">
          <el-tabs v-model="rightTabActive"   class="tab-profile">
            <el-tab-pane label="  当前所选版本库为" name="rightShuxing" >
              <div class="point-ylgx">
                <el-row v-for="(item, index) of multipleSelection"
                        :key="index"
                        style="line-height: 38px;border-bottom: solid 1px #dddd;">
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
                      <!--                       <el-button  title="查看结果"   type="info"  size="mini" round style="padding: 3px 5px;"   @click="showResultPage(item, index)">查看</el-button>-->
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
                    <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/csap/static/orgChart/color-coded/org_chart.html" ></iframe>
                    <el-button @click="closePopup" style="float:right;margin:10px 26px 0px 0px;">关闭</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="content_bottom">
        <div style="float: right; margin-top: 20px;margin-right:25px">
          <el-button type="primary" style="float: left;margin-left: 10px;width:90px;height:34px"  @click="prevStep"  v-show="show_last_button" size="mini">上一步</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;width:90px;height:34px" @click="nextStep"  v-show="show_nextBtn" size="mini">下一步</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;width:90px;height:34px" size="mini" @click="onTest" v-show="show_nextBtn === false && (this.isLinkParam === null || this.isLinkParam === undefined || this.isLinkParam === false) && isCurrentUser">测 试</el-button>
          <el-button type="primary" style="float: left;margin-left: 10px;width:90px;height:34px" @click="saveTwoDimensionRelation" size="mini" v-show="show_nextBtn === false && (this.isLinkParam === null || this.isLinkParam === undefined || this.isLinkParam === false) && isCurrentUser" >保   存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
function checkEditor (vue, val) {
  if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
    vue.saveContentLoding = false
    vue.$refs.iframe.contentWindow.insertMethod(val)
  } else {
    setTimeout(function () {
      checkEditor(vue, val)
    }, 500)
  }
}
const FilterScript = () => import('components/event/FilterScript')
const LeftTree = () => import('components/event/LeftTree')
const checkLibraryEvent = () => import('components/event/checkLibraryEvent')
const MeasurementParameters = () => import('components/event/MeasurementParameters')
const ScreeningMethod = () => import('components/event/ScreeningMethod')
const EventScriptTree = () => import('components/event/EventScriptTree')

export default {
  data () {
    return {
      levelOptioins: [{'value': '>', 'label': '>'}, {'value': '>=', 'label': '>='}, {'value': '=', 'label': '='}, {'value': '<', 'label': '<'}, {'value': '<=', 'label': '<='}],
      scriptContent: '', // 点击测试返回的script
      isCurrentUser: false,
      isLinkParam: false,
      showDescription: false,
      tableCurrentIndex: 0,
      dialogVisible: false,
      scriptName: '', // 脚本中存参数名
      flightModelData: { // 根据机型配置的对象，多个机型，每个机型都
      },
      MeasurementParametesTable: [
        {
          'level_index': '0',
          'level': '低级',
          'script': '', // 脚本
          'scName': '', // 脚本中文
          'compare': '', // 比较
          'tbList': {} // 可能有多个
        }, {
          'level_index': '1',
          'level': '中级',
          'compare': '', // 比较
          'script': '',
          'scName': '', // 脚本中文
          'tbList': {}
        }, {
          'level_index': '2',
          'level': '高级',
          'compare': '', // 比较
          'script': '',
          'scName': '', // 脚本中文
          'tbList': {}
        }
      ],
      ScreeningMethodTable: [
        {
          'level_index': '0',
          'level': '低级',
          'script': '', // 脚本
          'compare': '', // 比较
          'lData': {},
          'tData': {}
        }, {
          'level_index': '1',
          'level': '中级',
          'compare': '', // 比较
          'script': '',
          'lData': {},
          'tData': {}
        }, {
          'level_index': '2',
          'level': '高级',
          'compare': '', // 比较
          'script': '',
          'lData': {},
          'tData': {}
        }
      ],
      FilterScriptTable: [
        {
          'level_index': '0',
          'level': '低级',
          'script': '',
          'compare': '', // 比较
          'ffdata': {},
          'tbData': {} // 筛选方式多个输入框的值回显用。
        }, {
          'level_index': '1',
          'level': '中级',
          'script': '',
          'compare': '', // 比较
          'ffdata': {},
          'tbData': {} // 筛选方式多个输入框的值回显用。
        }, {
          'level_index': '2',
          'level': '高级',
          'script': '',
          'compare': '', // 比较
          'ffdata': {},
          'tbData': {} // 筛选方式多个输入框的值回显用。
        }
      ],
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
      activeName: 'first',
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
      parentName: '', // 库名
      formData: {
        checked: false,
        stage: '',
        compare: '',
        levelValue: '',
        timeLevelValue: '',
        timeCompare: '',
        shaixuanWay: '',
        shaixuanWayId: '', // 筛选方式
        gongchengParam: '', // 工程参数
        gongchengParamId: '', // 工程参数
        analysisParameters: '',
        analysisParametersId: '', // 分析参数ID
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
      showSelectLibraryParamDataData: false,
      paramManagerData: '',
      scriptType: 0, // 参数类型
      profileCatalogId: '',
      saveReturnTwoDimensionId: '', //保存后返回的参数id
      nowCatalogData: {},
      noWCatalogNode: {},
      sourcePage: '', // 来源页面
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
      treeType: '',
      checkAcTypeData: ''
    }
  },
  components: {
    FilterScript,
    LeftTree,
    MeasurementParameters,
    ScreeningMethod,
    checkLibraryEvent,
    EventScriptTree
  },
  watch: {
    filterText (val) {
    }
  },
  // paramManagerData 返回到edit页面用
  props: ['showSelectLibraryParam', 'paramManagerObj', 'scriptType1', 'backProfileCatalogId', 'noWCatalogNode1', 'nowCatalogData1', 'saveReturnTwoDimensionId1', 'twoDimensionName1', 'libraryIds', 'edit', 'page', 'linkParam', 'isCurrentUser1'], // saveReturnTwoDimensionId1保存弹框后返回的参数id twoDimensionName保存弹框中的参数名
  mounted () {
    this.clearData() //清空原来的数据
    this.selectBindingMappingPage = false
    this.addFenXiSuanFaPage = false
    this.showSelectLibraryParamDataData = this.showSelectLibraryParam // 显示多个版本库选择界面
    this.paramManagerData = this.paramManagerObj
    this.scriptType = this.scriptType1 // 参数类型
    this.profileCatalogId = this.backProfileCatalogId
    this.saveReturnTwoDimensionId = this.saveReturnTwoDimensionId1 // 保存后返回的参数id
    this.twoDimensionNameValue = this.twoDimensionName1
    this.noWCatalogNode = this.noWCatalogNode1
    this.nowCatalogData = this.nowCatalogData1
    this.sourcePage = this.page
    this.formData.twoDimensionId = this.saveReturnTwoDimensionId
    this.isLinkParam = this.linkParam
    this.multipleSelection = this.libraryIds // 选中的版本库
    this.isCurrentUser = this.isCurrentUser1
    if (this.sourcePage === 'saveAfter') { // 保存事件后直接定义事件的
      this.activeStep = 2
      this.showSelectLibraryParamDataData = false // 隐藏选择编辑界面
      this.selectBindingMappingPage = true // 显示绑定界面
      // 保存完毕查询版本库
      this.getAllModels()
      this.getProfileEventLevel() // 保存事件后新增事件算法 设置等级默认值
    } else {
      // 页面来源是否算法绑定页面
      this.fromBindPage = true
      // 在新建。编辑绑定界面选中的版本库带过来。
      this.algorithmsLibraryNewEditStatus = this.edit // 记录是否编辑
      if (!this.algorithmsLibraryNewEditStatus) {
        this.getProfileEventLevel() // 新增定义事件算法，设置等级默认值
      }
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
    // 获取等级设置
    getProfileEventLevel () {
      this.creatorId = this.creatorId * 1
      let MeasurementParametesTable = []
      let ScreeningMethodTable = []
      let FilterScriptTable = []
      this.$axios.get('/apm/getProfileEventLevel', {params: {id: this.paramManagerData.ID}}).then(response => {
        let data = response.data
        if (data && data.length > 0) {
          let obj1 = {}
          let obj2 = {}
          let obj3 = {}
          for (let i = 0; i < data.length; i++) {
            obj1 = {}
            obj2 = {}
            obj3 = {}
            obj1['level_index'] = data[i]['EVENT_LEVEL'] // 取出自定义设置的等级名称
            obj1['level'] = data[i]['EVENT_CAPTION'] // 取出自定义设置的等级名称
            obj1['script'] = ''
            obj1['compare'] = ''
            obj1['tbList'] = {}
            MeasurementParametesTable.push(obj1)
            obj2['level_index'] = data[i]['EVENT_LEVEL'] // 取出自定义设置的等级名称
            obj2['level'] = data[i]['EVENT_CAPTION'] // 取出自定义设置的等级名称
            obj2['script'] = ''
            obj2['compare'] = ''
            obj2['lData'] = {}
            obj2['tData'] = {}
            ScreeningMethodTable.push(obj2)
            obj3['level_index'] = data[i]['EVENT_LEVEL'] // 取出自定义设置的等级名称
            obj3['level'] = data[i]['EVENT_CAPTION'] // 取出自定义设置的等级名称
            obj3['script'] = ''
            obj3['compare'] = ''
            obj3['ffdata'] = {}
            obj3['tbData'] = {}
            FilterScriptTable.push(obj3)
          }

          this.MeasurementParametesTable = MeasurementParametesTable
          this.ScreeningMethodTable = ScreeningMethodTable
          this.FilterScriptTable = FilterScriptTable
          this.MeasurementParametesTable.sort(this.$util.compare('level_index'))
          this.ScreeningMethodTable.sort(this.$util.compare('level_index'))
          this.FilterScriptTable.sort(this.$util.compare('level_index'))
        }
      }).catch(response => {
      })
    },
    getCheckAcTypeData () {
      let modelId = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (modelId === '') {
          modelId += this.multipleSelection[i].versionLibrary
        } else {
          modelId += ',' + this.multipleSelection[i].versionLibrary
        }
      }
      if (modelId) {
        this.$axios.get('/etl/model/checkAcType', {params: {modelID: modelId}}).then(response => {
          this.checkAcTypeData = response.data
        }).catch(response => {
        })
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
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
      if (obj['CHILDREN']) { // 点击父节点
        if (!obj['IS_ROOT']) {
          if (this.creatorId === 19 || (this.creatorId === 20 && this.treeType === 'shaixuanway')) {
            this.parentName = obj.NAME
          }
        }
      } else {
        let name = obj.NAME
        let id = obj.ID
        if (this.creatorId === 19 || this.creatorId === '19') { // 根据测量参数
          this.formData.analysisParameters = name
          this.formData.analysisParametersId = id // 保存的时候需要 的是ID
          this.$bus.$emit('emitAnalysisParameters')
        } else if (this.creatorId === 20 || this.creatorId === '20') { // 根据筛选方式
          if (this.treeType === 'shaixuanway') {
            this.formData.shaixuanWay = name
            this.formData.shaixuanWayId = id // 保存的时候需要 的是ID
          } else if (this.treeType === 'gongchengparam') {
            this.formData.gongchengParam = name
            this.formData.gongchengParamId = id // 保存的时候需要 的是ID
          }
        } else if (this.creatorId === 21 || this.creatorId === '21') {
          this.$set(this.$refs.filterScriptRef.tableListData[this.$refs.filterScriptRef.currentInputTableIndex]['data'][this.$refs.filterScriptRef.currentInputRowIndex], 'pm', name)
        } else {
          var iframeDocument = this.$refs.iframe
          let v = this.multipleSelection[0].mapping
          iframeDocument.contentWindow.insertMethod(v) // 赋值到编辑器
        }
      }
    },
    getTreeType (v) {
      this.treeType = v
    },
    // 清除原来的数据
    clearData () {
      this.formLabelAlign.name = ''
      this.formLabelAlign.desc = ''
      this.formLabelAlign.twoDimensionDescription = ''
      this.formLabelAlign.twoDimensionName = ''
      this.formData.checked = false
      this.formData.stage = ''
      this.formData.compare = ''
      this.formData.levelValue = ''
      this.formData.timeCompare = ''
      this.formData.timeLevelValue = ''
      this.formData.shaixuanWay = ''
      this.formData.shaixuanWayId = ''
      this.formData.gongchengParam = ''
      this.formData.gongchengParamId = ''
      this.formData.zhongshu = '' //
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
      this.rightTabActive = 'rightShuxing'
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
      this.$bus.$emit('event_binding_select_librarys', {
        paramManagerObj: this.paramManagerData,
        twoDimensionNameValue: this.twoDimensionNameValue,
        scriptType: this.scriptType,
        isCurrentUser: this.isCurrentUser,
        backProfileCatalogId: this.profileCatalogId,
        saveReturnTwoDimensionId: this.saveReturnTwoDimensionId,
        backnoWCatalogNode: this.noWCatalogNode,
        backnowCatalogData: this.nowCatalogData
      })
      this.$bus.$emit('paramEventAddTab', {enName: 'event_profile_edit_return', zhName: this.twoDimensionNameValue, isClosable: true, parent: 'paramEvent_eventLibrary', count: 0, goback: 'createEventPage'})
    },
    // 点击下一步事件
    nextStep () {
      this.rightTabActive = 'rightShuxing'
      this.clearData()
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
      this.rightTabActive = 'rightShuxing'
      this.showScript = false // 默认隐藏脚本编辑
      // 初次根据 参数类型查询算法类型
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getChildCreator', {params: {id: creatorId}}).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
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
              } else { // 新增的时候设置默认的等级模板数据
                this.editJsonData = {}
                this.creatorId = this.childCreatorList[0].ID * 1 // 默认选中第一个
              }
            }
            this.getCheckAcTypeData()
          } else {
            this.showDescription = false
            // 根据算法类型查询不到子节点，则进入下一步骤，显示内容隐藏选择界面。
            this.scriptTypes.push(this.creatorId + '') // 如果有子节点存储当前id为父节点
            this.showContent = true // 显示内容，隐藏选则算法类型界面
            this.show_last_button = true // 显示上一步菜单
            this.show_nextBtn = false //显示保存按钮隐藏下一步按钮
            //加载树,其余的在对应的单独页面加载
            if (this.algorithmsLibraryNewEditStatus) {
              this.setEditValue()
            } else if (this.creatorId === 16) {
              this.showScript = true
            }
            this.arrCreatorId.push({
              // 存选中的节点
              ID: this.creatorId
            })
          }
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        this.treeLoading = false
      })
    },
    // 测试按钮
    onTest () {
      console.log(this.creatorId)
      let jsonData = this.getJsonDta(this.creatorId)
      console.log(jsonData)
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
        this.$bus.$emit('paramEventAddTab', {enName: 'paramTwo_calculation_results', zhName: '计算结果', isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
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
    getChangeData (data) {
      this.formData.stage = data.toString()
    },
    // 保存 绑定映射关系。
    saveTwoDimensionRelation () {
      let jsonData = this.getJsonDta(this.creatorId)
      console.log(jsonData)
      let stepsData = this.geStepsDta(this.creatorId)
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
        // this.$axios.post('/apm/bindEventRelation', param, {
        //   headers: { 'Content-type': 'application/json' }
        // }).then(response => {
        this.$axios(
          {
            url: '/apm/bindEventRelation?twoDimensionId=' + this.saveReturnTwoDimensionId + '&modelIds=' + modelIds + '&creatorId=' + this.creatorId,
            method: 'post',
            data: {
              json: jsonData,
              steps: stepsData
            },
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
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
      if (creatorId === 19 || creatorId === '19') {
        if (this.formData.analysisParameters === undefined || this.formData.analysisParameters === '') {
          this.$message.error('分析参数不能为空!')
          return null
        }
        if (this.formData.stage === undefined || this.formData.stage === '') {
          this.$message.error('飞行阶段不能为空!')
          return null
        }
        //return _.data().eventByMeasurement("_.run2(\" + 测量值id + "\") > 10",Constant.EVENT_ALERT,"_.run2(\" + 测量值id + "\") > 5 && _.run2(\" + 测量值id + "\") <= 10",Constant.EVENT_WARN);
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          let param = ''
          let scriptName = ''
          let i = 0
          Object.keys(this.flightModelData).forEach(model => {
            if (i === 0) {
                param += 'if '
               scriptName += 'if '
              } else {
                param += 'else if '
                scriptName += 'else if '
              }
              param += '(_.getAcType() == "' + model + '") {' + this.getCreatorParam19(this.flightModelData[model]) + '}'
              scriptName += '(_.getAcType() == "' + model + '") {' + this.scriptName + '}'
            i++
          })
          this.scriptName = scriptName
          return param
        } else {
          let count = 0
          let data = this.$refs.measurementParametersRef.MeasurementParametesTable
          for (let i = 0; i < data.length; i++) {
            if (data[i]['script']) {
              count++
            }
          }
          if (count === 0) {
            this.$message.error('请配置事件等级!')
            return null
          }
          return this.getCreatorParam19(this.$refs.measurementParametersRef.MeasurementParametesTable)
        }
      } else if (creatorId === 20 || creatorId === '20') {
        if (!this.formData.shaixuanWay || !this.formData.gongchengParam) {
          this.$message.error('筛选方式和工程参数不能为空!')
          return null
        }
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          let param = ''
          let paramName = ''
          let i = 0
          Object.keys(this.flightModelData).forEach(model => {
            if (i === 0) {
              param += 'if '
              paramName += 'if '
            } else {
              param += 'else if '
              paramName += 'else if '
            }
            param += '(_.getAcType() == "' + model + '") {' + this.getCreatorParam20(this.flightModelData[model]) + '}'
            paramName += '(_.getAcType() == "' + model + '") {' + this.scriptName + '}'
            i++
          })
          this.scriptName = paramName
          return param
        } else {
          let count = 0
          let data = this.$refs.screeningMethodRef.ScreeningMethodTable
          for (let i = 0; i < data.length; i++) {
            if (data[i]['script']) {
              count++
            }
          }
          if (count === 0) {
            this.$message.error('请配置事件等级!')
            return null
          }
          return this.getCreatorParam20(this.$refs.screeningMethodRef.ScreeningMethodTable)
        }
      } else if (creatorId === 21 || creatorId === '21') {
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          let param = ''
          let i = 0
          Object.keys(this.flightModelData).forEach(model => {
            if (i === 0) {
              param += 'if '
            } else {
              param += 'else if '
            }
            param += '(_.getAcType() == "' + model + '") {' + this.getCreatorParam21(this.flightModelData[model]) + '}'
            i++
          })
          this.scriptName = param // 没有保存ID的情况直接用这个脚本
          return param
        } else {
          let count = 0
          let data = this.$refs.filterScriptRef.FilterScriptTable
          for (let i = 0; i < data.length; i++) {
            if (data[i]['script']) {
              count++
            }
          }
          if (count === 0) {
            this.$message.error('请配置事件等级!')
            return null
          }
          // return _.data().eventByFilterScript("'RALTC' > 1 AND 'PITCH' < 5","高",">","1","'RALTC' > 1 AND 'PITCH' < 5","中",">","2");
          let param = this.getCreatorParam21(this.$refs.filterScriptRef.FilterScriptTable)
          return param
        }
      } else if (this.showScript) {
        var editorContent = this.$refs.iframe.contentWindow.editor.getValue()
        if (!editorContent) {
          this.$message.error('脚本不能为空')
          return null
        }
        return editorContent
      }
      },
    // creatorID=21 根据filter
    getCreatorParam21 (list) {
      let script = 'return _.data().eventByFilterScript('
      let scriptName = 'return _.data().eventByFilterScript('
      for (let i = 0; i < list.length; i++) {
        if (list[i].script !== '') {
          if (i === 0) {
            script += list[i]['script']
            scriptName += list[i]['scName']
          } else {
            script += ',' + list[i]['script']
            scriptName += ',' + list[i]['scName']
          }
        }
      }
      script += ');'
      scriptName += ');'
      this.scriptName = scriptName
      return script
    },
    // creatorID=20 根据筛选方式
    getCreatorParam20 (list) {
      // return _.data().eventByFilterAndScript("71ba0981aa3a4cc597dadfd2ace0e920","'IVV'>1.7", "低级", ">@1,<@2","'IVV'>1.7", "中级", ">=2,<@4");

      let script = 'return _.data().eventByFilterAndScript("' + this.formData.shaixuanWayId + '",'
      let scriptName = 'return _.data().eventByFilterAndScript("' + this.parentName + '->' + this.formData.shaixuanWay + '",'

      for (let i = 0; i < list.length; i++) {
        if (list[i].script !== '') {
          if (i === 0) {
            script += list[i]['script']
            scriptName += list[i]['scName']
          } else {
            script += ',' + list[i]['script']
            scriptName += ',' + list[i]['scName']
          }
        }
      }
      script += ');'
      scriptName += ');'
      this.scriptName = scriptName
      return script
    },
    // creatorID=19 根据测量的脚本
    getCreatorParam19 (list) {
      console.log(list)
      let param = 'return _.data().eventByMeasurement('
      let paramName = 'return _.data().eventByMeasurement('
      let name = this.parentName + '->' + this.formData.analysisParameters
      param += '"' + this.formData.stage + '",'
      paramName += '"' + this.formData.stage + '",'
      for (let i = 0; i < list.length; i++) {
        if (list[i].script !== '') {
          if (i === 0) {
            console.log(this.formData.analysisParametersId)
            console.log(list[i].script)
            param += list[i].script.replace(new RegExp('@', 'g'), this.formData.analysisParametersId)
            console.log(param)
            paramName += list[i].scName.replace(new RegExp('#', 'g'), name)
          } else {
            param += ',' + list[i].script.replace(new RegExp('@', 'g'), this.formData.analysisParametersId)
            paramName += ',' + list[i].scName.replace(new RegExp('#', 'g'), name)
          }
        }
      }
      param += ');'
      paramName += ');'
      this.scriptName = paramName
      return param
    },
    // 根据不同的算法类型 拼装不同的step数据
    geStepsDta (creatorId) {
      this.arrCreatorId = []
      if (creatorId === 19 || creatorId === '19') {
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          return '{"arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '" , "flDt": ' + JSON.stringify(this.flightModelData) + ', "fxN": "' + this.formData.analysisParameters + '", "fxId": "' + this.formData.analysisParametersId + '", "checked": ' + this.formData.checked + ', "stage": "' + this.formData.stage + '", "ky": ' + JSON.stringify(this.scriptName) + ', "parentName": "' + this.parentName + '"}' //, "scriptName": ' + JSON.stringify(this.scriptName) + '
        } else {
          return '{"arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '", "mtab": ' + JSON.stringify(this.$refs.measurementParametersRef.MeasurementParametesTable) + ', "fxN": "' + this.formData.analysisParameters + '", "fxId": "' + this.formData.analysisParametersId + '", "checked": ' + this.formData.checked + ', "stage": "' + this.formData.stage + '", "ky": ' + JSON.stringify(this.scriptName) + ', "parentName": "' + this.parentName + '"}'
        }
      } else if (creatorId === 20 || creatorId === '20') {
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          return '{"flDt": ' + JSON.stringify(this.flightModelData) + ', "sxw":"' + this.formData.shaixuanWay + '", "sxwid":"' + this.formData.shaixuanWayId + '", "gc":"' + this.formData.gongchengParam + '", "arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '", "checked": ' + this.formData.checked + ', "ky": ' + JSON.stringify(this.scriptName) + ', "parentName": "' + this.parentName + '"}'
        } else {
          return '{"stb": ' + JSON.stringify(this.$refs.screeningMethodRef.ScreeningMethodTable) + ', "sxw":"' + this.formData.shaixuanWay + '", "sxwid":"' + this.formData.shaixuanWayId + '", "gc":"' + this.formData.gongchengParam + '", "arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '", "checked": ' + this.formData.checked + ', "ky": ' + JSON.stringify(this.scriptName) + ', "parentName": "' + this.parentName + '"}'
        }
      } else if (this.showScript) {
        return '{"arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '"}' //, "scriptName": ' + JSON.stringify(this.scriptName) + '
      } else if (creatorId === 21 || creatorId === '21') {
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          return '{"arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '", "flDt": ' + JSON.stringify(this.flightModelData) + ', "checked": ' + this.formData.checked + ', "ky": ' + JSON.stringify(this.scriptName) + '}'
        } else {
          return '{"arid": ' + JSON.stringify(this.arrCreatorId) + ', "creatorId": "' + this.creatorId + '", "ftb": ' + JSON.stringify(this.$refs.filterScriptRef.FilterScriptTable) + ', "checked": ' + this.formData.checked + ', "ky": ' + JSON.stringify(this.scriptName) + '}'
        }
        //
        // return '{"$refs.filterScriptRef.FilterScriptTable": ' + JSON.stringify(this.$refs.filterScriptRef.FilterScriptTable) + ',  "flDt": ' + JSON.stringify(this.flightModelData) + ', "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ',  "stepTitle": "' + this.twoDimensionNameValue + '", "creatorId": "' + this.creatorId + '", "checked": ' + this.formData.checked + '}'
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
    // 编辑赋值
    setEditValue () {
      let json = this.editJsonData
        if (json.checked) {
          this.formData.checked = json.checked
          // 根据机型配置不为空，则按照根据机型配置来
          if (json.flDt !== null && json.flDt !== undefined && JSON.stringify(json.flDt) !== '{}') {
            this.flightModelData = json.flDt
          }
        }
        if (this.creatorId === 19 || this.creatorId === '19') { // 两个时间点组合
          if (json.stage !== undefined) {
            this.formData.stage = json.stage + ''
          }
        this.formData.analysisParameters = json.fxN
        this.formData.analysisParametersId = json.fxId
        this.parentName = json.parentName
          if (json.mtab !== null && json.mtab !== undefined && JSON.stringify(json.mtab) !== '{}' && !json.checked) {
          this.MeasurementParametesTable = json.mtab
        }
      } else if (this.creatorId === 20 || this.creatorId === '20') { // 工程参数在时间点的值
          this.parentName = json.parentName
          this.formData.gongchengParam = json.gc
        // this.formData.gongchengParamId = json.gongchengParamId
        this.formData.shaixuanWay = json.sxw
        this.formData.shaixuanWayId = json.sxwid
        if (json.stb !== null && json.stb !== undefined && JSON.stringify(json.stb) !== '{}' && !json.checked) {
          this.ScreeningMethodTable = json.stb
        }
      } else if (this.creatorId === 21 || this.creatorId === '21') { // filter脚本
          let FilterScriptTable = json.ftb
        if (FilterScriptTable !== null && FilterScriptTable !== undefined && JSON.stringify(FilterScriptTable) !== '{}') {
          this.FilterScriptTable = json.ftb
        }
      } else {
        this.showScript = true // 显示脚本编辑
        this.isLoadScript = true // 加载脚本编辑tree
        //如果是编辑状态，给他赋值
        if (this.algorithmsLibraryNewEditStatus && this.mappingData) {
          this.saveLoaddingText = '加载脚本中...'
          this.saveContentLoding = true
          checkEditor(this, this.mappingData) // 脚本内容
        }
      }
    }
  }
}
</script>

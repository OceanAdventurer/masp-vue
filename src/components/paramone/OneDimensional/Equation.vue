<style scoped>
.div_equation {
  margin-top: -1px;
  height: 80vh;width: 100%;
}

.div_equation_left {
  width: 335px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #ebeef5;
  box-sizing: border-box;
}

.left_tree {
  overflow: auto;
}

.left_tree::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

.left_tree::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cccccc;
}

.left_filter {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border: 0px solid #ebeef5;
  height: 40px;
}

.left_filter_search {
  background-image: url(../../../assets/images/icon66_1.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.left_filter_refresh {
  background-image: url(../../../assets/images/icon67.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.equa {
  width: calc(100% - 338px);
  height: 100%;
  display: flex;
  flex-direction: row;
  float: left;
}

.equa_main {
  width: 70%;
  height: 100%;
  border-right: 1px solid #ebeef5;
  /* display: grid; */
  /* grid-row-gap: 50px; */
}
.equa_right {
  position: relative;
  width: 30%;
  height: 100%;
}

.div_common {
  width: 90%;
  height: 32px;
  line-height: 32px;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
}

.label_name {
  width: 43px;
}

.label_text {
  width: 80%;
}

.main_name .el-input {
  width: 100%;
}

.eidtor {
  width: 90%;
  display: grid;
  margin: 0px auto;
}

.editor_default {
  width: 100%;
  height: 45vh;
  line-height: 20px;
  margin-bottom: 10px;
  border: 1px solid #DCDFE6;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.editor_iframe {
  width: 100%;
  height: 60vh;
  margin-bottom: 10px;
}

.commonents {
  width: 90%;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
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
  top: 5%;
  width: 98%;
  height: 90%;
  background:white;
  z-index: 105;
}

#iframeOrgChart {
  width: calc(100% - 1px);
  height: calc(100% - 60px);
}

.save {
float: right;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  /*position: absolute;*/
  /* left: 88%; */
  margin-top: 20px;
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
  background-image: url(../../../assets/images/icon117.png);
  background-size: cover;
  width: 40px;
  height: 22px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  margin-right: 35px;
}
</style>
<style>
.ace-tomorrow .ace_print-margin{
  width: 0px !important;
}
</style>
<template>
  <!--???????????????-->
  <div class="div_equation" >
    <div style="height: calc(80vh - 40px); border-bottom: solid 1px #ebeef5">
      <!-- ???????????? -->
      <div class="div_equation_left">
        <el-tabs  v-model="activeName" @tab-click="tabHandleTabClick" style="padding-left:5px;">
          <el-tab-pane label="????????????" name="first">
            <GongChengParamTree :styleHeight="bindHeight" :searchDisabled1="searchDisabled" @gcparamObj="getGongChengParamObj"></GongChengParamTree>
          </el-tab-pane>
          <el-tab-pane label="????????????" name="second">
            <SystemFunctionTree :systemStatus="systemStatus" :styleHeight="bindHeight" :searchDisabled1="searchDisabled" @systemfunctionTreeData="getSystemFunctionObj"></SystemFunctionTree>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="equa">
        <div class="equa_main cm_main_content">
          <div class="div_common" style="margin-top: 10px;justify-content:space-between">
          </div>
          <div class="eidtor">
            <div class="editor_iframe">
              <iframe id="ifid" ref="iframe" src="/csap/static/groovyIDE/index.html" width="100%" height="100%"></iframe>
            </div>
          </div>
        </div>
        <div class="equa_right cm_main_attr">
          <el-tabs v-model="attrRight">
            <el-tab-pane label="??????" name="attrFirst" class="content_tab_attr">
              <div class="main_name div_common" style="margin-top: 10px;">
                <div class="label_name">?????????</div>
                <div class="label_text">
                  <el-input v-model="nameValue" size="small" placeholder="???????????????"></el-input>
                </div>
              </div>
              <div class="commonents" style="margin-top: 10px;">
                <div class="label_name">?????????</div>
                <div class="label_text">
                  <el-input v-model="commentsValue" type="textarea" :rows="3" placeholder="???????????????"></el-input>
                </div>
              </div>
              <!-- <div class="commonents" style="margin-top: 10px;">
                <div class="label_name">?????????</div>
                <div class="label_text">
                  <el-input v-model="attrExplain" type="textarea" :rows="3" placeholder="???????????????"></el-input>
                </div>
              </div> -->
            </el-tab-pane>
            <el-tab-pane label="????????????" name="attrSecond">
              <!-- <el-collapse  v-model="activeName" accordion v-for="(item, index) in relyonArr" :key="item.id" @change="panelChange(item, index)">
                <el-collapse-item :title="index" :name="index">
                  <div v-show="errorShow" class="collapse_content" :ref="'collapse_content' + index"></div>
                  <div class="flight_no" :ref="'flight_no' + index"></div>
                </el-collapse-item>
              </el-collapse> -->
              <div v-for="(item, index) in relyonArr" :key="item.id">
                <div style="border-bottom:1px solid rgba(221, 221, 221, 0.867);padding-top:15px;">
                  <!--?????????-->
                  <div style="height:42px;line-height:42px;background-color:#F5F2F1;">
                    <div style="width:95px;height:42px;text-align:right;float:left;">????????????</div>
                    <div style="float:left;">{{index}}</div>
                    <!--??????-->
                    <div class="construction_img" @click="panelChange(item, index)">
                      <!-- <el-button style="margin-left:10px" title="????????????" icon="el-icon-star-off" type="info" circle plain @click="panelChangeTwo(item, index)"></el-button> -->
                    </div>
                  </div>
                  <!--????????????-->
                  <div style="margin-left:25px;height:42px;line-height:42px;text-align:right;float:left;">???????????????</div>
                  <div v-if="item['EXCEPTION_REASON']" class="exception_txt textarea">{{item.EXCEPTION_REASON}}</div>
                  <div v-else-if="item['test_data']" class="flight_no" style="float:left;height:42px;line-height:42px;">{{item.test_data[0].value}}</div>
                  <div v-else class="textarea">{{item}}</div>
                  <div class="clearfloat" style="clear:both;height:0;font-size:1px;line-height:0px;"></div>
                </div>
              </div>
              <div v-show="rightShow">
                <div class="right_shade"></div>
                <div class="right_content">
                  <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/csap/static/orgChart/color-coded/org_chart.html" ></iframe>
                  <el-button @click="closePopup" style="float:right;margin:0px 26px 0px 0px;">??????</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="left_description" style="padding:5px 0px 20px 20px;width: 80%;float: left;" v-show="showDescription">
      <span>?????????</span>
      <span class="descri" ref="descri_text"></span>
    </div>
    <div class="save" style="float: right;width: 10%;">
      <el-button type="primary" @click="onTest"  size="mini">??????</el-button>
      <el-button type="primary" @click="onSubmit"  size="mini">??????</el-button>
    </div>
  </div>
</template>
<script>
  import GongChengParamTree from 'components/base/GongChengParamTree'
  import SystemFunctionTree from 'components/base/SystemFunctionTree'

  function checkEditor (vue, val) {
  if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
    vue.$refs.iframe.contentWindow.setFuncType('1')
    vue.$refs.iframe.contentWindow.insertMethod(val)
  } else {
    setTimeout(function () {
      checkEditor(vue, val)
    }, 20)
  }
}

export default {
  data () {
    return {
      bindHeight: 'calc(80vh - 129px)',
      systemStatus: 'paramone',
      searchDisabled: false, //?????????????????????
      treeLoading: false,
      showDescription: false,
      fileNewTreeArr: [],
      systemFunctionData: [],
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      systemProps: {
        label: 'METHOD_NAME',
        children: 'CHILDREN'
      },
      activeName: 'first',
      parentId: '-1',
      iconShow: true, // ?????????????????????
      searchShow: true, // ??????????????????
      initDataObj: {}, // ??????dataObj
      mainTitle: '', // ???????????????
      nameValue: '', // ??????,
      commentsValue: '',
      tabIndex: '', // tab?????????
      title: '', // ??????????????????
      relyonArr: [],
      errorShow: false,
      rightShow: false,
      gpId: '', // ?????????id
      attrExplain: '', // ??????--??????????????????
      explainShow: false,
      attrRight: 'attrFirst'
    }
  },
  watch: {
    filterText (val) {
      // ???????????????
      if (!this.$util.isDefine(val)) {
      }
    }
  },
  props: ['dataObj'],
  mounted () {
    this.$nextTick(() => {
      this.getMainData()
    })
  },
  components: {
    GongChengParamTree,
    SystemFunctionTree
  },
  methods: {
    // ??????????????????????????????????????????
    getGongChengParamObj (v) {
      this.showDescription = false
      if (!v['CHILDREN']) { // ????????????????????? ??????????????????
        if (v['DESCRIPTION']) { // ??????????????????
          this.showDescription = true
          this.$refs.descri_text.textContent = v['DESCRIPTION']
        }
        checkEditor(this, '"' + v.NAME + '"')
      }
    },
    // ???????????????????????????data
    getSystemFunctionObj (data) {
      this.showDescription = false // ??????false
      if (!data['CHILDREN']) { // ????????????????????? ??????????????????
        if (data.METHOD_DESCRIPTION) { // ??????????????????
          this.showDescription = true
          this.$refs.descri_text.textContent = data.METHOD_DESCRIPTION
        }
        checkEditor(this, data.METHOD_NAME)
      }
    },
    // ??????tab??????
    tabHandleTabClick () {
      this.showDescription = false // ????????????
      if (this.activeTabName === 'first') {
      } else {
      }
    },
    // ??????????????????
    allowDrop (draggingNode, dropNode, type) {
      return false
    },
    // ???????????????????????????-??????
    getDetail () {
      var param = { gpId: this.gpId }
      this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        // this.attrExplain = data.DESCRIPTION
        this.showDescription = true
        this.$refs.descri_text.textContent = data.DESCRIPTION
        if (!this.$util.isDefine(data.DESCRIPTION)) {
          this.explainShow = false
          this.showDescription = false
        } else {
          this.explainShow = true
        }
        this.$store.commit('HIDE_LOADING', '???????????????!')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '???????????????!')
        this.$message.error('??????????????????!')
      })
    },
    // ??????main??????
    getMainData () {
      this.initDataObj = this.dataObj // ??????????????????
      this.tabIndex = this.dataObj.tabIndex // ??????tab??????
      if (this.dataObj.status === 'update') {
        this.mainTitle = this.dataObj.oneDimensionName // ??????
        this.nameValue = this.dataObj.oneDimensionName // ????????????
        checkEditor(this, this.dataObj.oneDimensionContent) // ????????????
        this.commentsValue = this.dataObj.oneDimensionDescription // ??????
      }
    },
    getEditorValue () {
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // ????????????????????????
      return editorContent
    },
    // ????????????
    onSubmit () {
      if (!this.nameValue) {
        this.$message.error('?????????????????????????????????')
        return
      }
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // ????????????????????????
      var url = ''
      var paramObj = {
        oneDimensionName: this.nameValue,
        oneDimensionContent: editorContent,
        oneDimensionDescription: this.commentsValue
      }
      if (this.dataObj.id) { // ??????
        url = '/apm/updateOneDimension'
        paramObj['id'] = this.dataObj.id
      } else { // ??????
        url = '/apm/addOneDimension'
      }
      var paramStr = this.$qs.stringify(paramObj)
      this.$store.commit('SHOW_LOADING', '?????????????????????????????????')
      this.$axios.post(url, paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data.status === '0') {
          this.$store.commit('HIDE_LOADING', '???????????????!')
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else if (data.status === 'E0017') {
          this.$store.commit('HIDE_LOADING', '???????????????!')
          this.$message.error(data.message)
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '???????????????!')
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '???????????????!')
        this.$message.error('??????????????????')
      })
    },
    // ????????????
    onTest () {
      this.attrRight = 'attrSecond'
      this.$store.commit('SHOW_LOADING', '?????????????????????????????????')
      // this.$refs.iframe.contentWindow.checkError('error', 0, 13, 'ddd') // ???????????????
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // ????????????????????????
      var paramStr = this.$qs.stringify({
        content: editorContent
      })
      this.$axios.post('/apm/getOneTreesByContent', paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }
        if (data) {
          this.$store.commit('HIDE_LOADING', '???????????????!')
          this.relyonArr = data
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '???????????????!')
        this.$message.error('??????????????????')
      })
    },
    // ??????????????????
    panelChange (item, index) {
      this.rightShow = true
      var tempObj = JSON.parse(JSON.stringify(item))
      delete tempObj.test_data
      var obj = {}
      obj[index] = tempObj
      this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
      // if (item['EXCEPTION_REASON']) {
      //   this.errorShow = true
      //   this.$refs['collapse_content' + index][0].textContent = item.EXCEPTION_REASON
      // } else {
      //   this.rightShow = true
      //   if (item['test_data']) {
      //     this.$refs['flight_no' + index][0].textContent = '????????????' + item.test_data[0].id
      //     delete item.test_data
      //   }
      //   var obj = {}
      //   obj[index] = item
      //   this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
      // }
    },
    closePopup () {
      this.rightShow = false
      this.$refs.iframeOrgChart.contentDocument.getElementById('chart-container').innerText = ''
    }
  }
}
</script>

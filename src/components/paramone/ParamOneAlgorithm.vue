<style scoped>

/* .el-button--mini{
    padding: 10px 32px !important;
} */
.div_equation {
  margin-top: -1px;
  height: calc(80vh - 45px);
  width: 100%;
}

.div_equation_left {
  width: 20%;
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
  background-image: url(../../assets/images/icon66_1.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.left_filter_refresh {
  background-image: url(../../assets/images/icon67.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.equa {
  width: 80%;
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
  width: 94%;
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
  height: 68vh;
  margin-bottom: 10px;
}

.commonents {
  width: 95%;
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
  margin-right: 25px;
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
  background-image: url(../../assets/images/icon117.png);
  background-size: cover;
  width: 40px;
  height: 22px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  margin-right: 35px;
}
.point-ylgx {
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 15px;
}
  .edit-select-param{
    margin: 100px 0 0 40%;
    height: auto;
  }
</style>
<style>
.ace_print-margin{
  width: 0px !important;
  display:none !important;
}
.ace_content{
  height: 0px!important;
}
.equa_right .el-tabs__nav{
  transform: translate(14px) !important;
}
</style>
<template>
  <!--???????????????-->
  <div class="div_equation"   v-loading="loading">
    <div v-if="selectParamStatus" class="edit-select-param">
     <div style="height: calc(80vh - 165px);">
       <el-radio-group v-model="radioCheckValue"  v-for="(value, key) in mappingDataMap" :key="key" style="float: left;width: 100%; margin-bottom: 10px;">
         <el-radio :label="key">???{{value}}????????????????????????????????????</el-radio>
       </el-radio-group>
     </div>
      <div class="save" style="float: right;margin-right: 10%;margin-top: 20px">
        <el-button type="primary" @click="prevStep" size="mini" class="cm_button">?????????</el-button>
        <el-button type="primary" @click="nextStep" size="mini" class="cm_button">?????????</el-button>
      </div>
      </div>
    <div v-else>
      <div style="height: calc(80vh - 40px); border-bottom: solid 1px #ebeef5">
        <!-- ???????????? -->
        <div class="div_equation_left cm_tab_file_new_left">
          <el-tabs  v-model="activeName" @tab-click="tabHandleTabClick" style="padding-left:5px;">
            <el-tab-pane label="????????????" name="first">
              <GongChengParamTree :styleHeight="bindHeight" :searchDisabled1="disabledStatus" @gcparamObj="getGongChengParamObj"></GongChengParamTree>
            </el-tab-pane>
            <el-tab-pane label="????????????" name="second">
              <SystemFunctionTree :systemStatus="systemStatus" :styleHeight="bindHeight" :searchDisabled1="disabledStatus" @systemfunctionTreeData="getSystemFunctionObj"></SystemFunctionTree>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="equa cm_tab_file_new_main">
          <div class="equa_main cm_main_content">
            <div class="div_common" style="margin-top: -4px;justify-content:space-between">
            </div>
            <div class="eidtor">
              <div class="editor_iframe">
                <iframe id="ifid" ref="iframe" src="/csap/static/groovyIDE/index.html" width="100%" height="100%"></iframe>
              </div>
            </div>
          </div>
          <div class="equa_right cm_main_attr">
            <el-tabs v-model="attrRight">
              <el-tab-pane label="????????????????????????" name="attrFirst" class="content_tab_attr">
                <div class="point-ylgx" style="height: calc(80vh - 78px)">
                  <el-row v-for="(item, index) of multipleSelection"
                          :key="index"
                          style="line-height: 40px;border-bottom: solid 1px #dddd;">
                    {{item.tableRepository}} ???{{item.tablePlane}}???
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="????????????" name="attrSecond">
                <div class="point-ylgx" style="height: calc(80vh - 78px)">
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
                      <!--???????????? -->
                      <div style="margin-left:25px;height:42px;line-height:42px;text-align:right;float:left;">???????????????</div>
                      <div v-if="item['EXCEPTION_REASON']" class="exception_txt textarea">{{item.EXCEPTION_REASON}}</div>
                      <div v-else-if="item['test_data'] && item['test_data'].length > 0 && item.test_data[0].value" class="textarea">{{item.test_data[0].value}}</div>
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
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="left_description" style="padding:5px 0px 20px 20px;width: 75%;float: left;" v-show="showDescription">
        <span>?????????</span>
        <span class="descri" ref="descri_text"></span>
      </div>
      <div class="save">
          <el-button type="primary" @click="prevStep1" style="width:90px;height:34px" size="mini" v-if="selectCount > 1">?????????</el-button>
          <el-button type="primary" @click="onTest"  size="mini" style="width:90px;height:34px" v-if="this.$util.paramOneEditAuthority">??????</el-button>
          <el-button type="primary" @click="onSubmit"  size="mini" style="width:90px;height:34px" v-if="this.$util.paramOneEditAuthority">??????</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import GongChengParamTree from 'components/base/GongChengParamTree'
  import SystemFunctionTree from 'components/base/SystemFunctionTree'

  function checkEditor (vue, val) {
       if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
         // vue.$refs.iframe.contentWindow.setFuncType('1')
         vue.$store.commit('HIDE_LOADING', '???????????????!')
         vue.$refs.iframe.contentWindow.insertMethod(val)
       } else {
         setTimeout(function () {
           checkEditor(vue, val)
         }, 1500)
       }
 }
 function readOnly (vue) {
       if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.readOnlys) {
         // vue.$refs.iframe.contentWindow.setFuncType('1')
        //  vue.$store.commit('HIDE_LOADING', '???????????????!')
         vue.$refs.iframe.contentWindow.readOnlys()
       } else {
         setTimeout(function () {
           readOnly(vue)
         }, 500)
       }
 }

export default {
  data () {
    return {
      loading: false,
      scriptData: '',
      bindHeight: 'calc(80vh - 129px)',
      systemStatus: 'paramone',
      selectCount: 0,
      selectParamStatus: false, // ?????????????????????
      disabledStatus: false, //?????????????????????
      multipleSelection: [], // ??????????????????????????????
      mappingDataMap: {}, // ???????????????????????? value???????????? key ?????????
      radioCheckValue: '',
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
      attrExplain: '', // ??????--??????????????????
      explainShow: false,
      attrRight: 'attrFirst'
    }
  },
  watch: {
    filterText (val) {
      if (!this.$util.isDefine(val)) { //???????????????
      }
    }
  },
  props: ['gpId', 'selectLibraryList', 'editStatus'],
  mounted () {
    let editPermission = this.$store.state.userInfo.menuList.map(item => {
      return item.ID
    })
    console.log(editPermission.indexOf('7001') !== -1)
    if (editPermission.indexOf('7001') === -1) {
      readOnly(this)
    }
    this.multipleSelection = this.selectLibraryList
    this.hideMenue()
    this.$bus.$on('parameditRowClickHideMenue', (o) => {
      this.hideMenue()
    })
    console.log('this.multipleSelection ', this.multipleSelection)
    this.$nextTick(() => {
      if (this.editStatus) {
        this.initEditData()
       }
    })
  },
  created () {
    if (!this.$util.paramOneEditAuthority) {
      this.disabledStatus = true
    } else {
      this.disabledStatus = false
    }
  },
  components: {
    GongChengParamTree,
    SystemFunctionTree
  },
  methods: {
    // readOnly () {
    //   if (this && this.$refs && this.$refs.iframe && this.$refs.iframe.contentWindow && this.$refs.iframe.contentWindow.readOnlys) {
    //     this.$store.commit('HIDE_LOADING', '???????????????!')
    //     this.$refs.iframe.contentWindow.readOnlys()
    //   } else {
    //     setTimeout(function () {
    //       this.readOnly()
    //     }, 1500)
    //   }
    // },
    hideMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj.paramOne_add_suanfa = false
      hideMenuObj.paramOne_edit_suanfa = false
      hideMenuObj.paramOne_clear_suanfa = false
      hideMenuObj.paramOne_file_remove = false
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, disabledMenuObj) // ??????????????????????????????
    },
    // ??????????????????????????????????????????
    getGongChengParamObj (v) {
      if (this.$util.paramOneEditAuthority) {
        this.showDescription = false
        if (!v['CHILDREN']) { // ????????????????????? ??????????????????
          if (v['DESCRIPTION']) { // ??????????????????
            this.showDescription = true
            this.$refs.descri_text.textContent = v['DESCRIPTION']
          }
          checkEditor(this, '"' + v.NAME + '"')
        }
      }
    },
    // ???????????????????????????data
    getSystemFunctionObj (data) {
      if (this.$util.paramOneEditAuthority) {
        this.showDescription = false // ??????false
        if (!data['CHILDREN']) { // ????????????????????? ??????????????????
          if (data.METHOD_DESCRIPTION) { // ??????????????????
            this.showDescription = true
            this.$refs.descri_text.textContent = data.METHOD_DESCRIPTION
          }
          checkEditor(this, data.METHOD_NAME)
        }
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
    // ???????????????????????????
    initEditData () {
      let mappingMap = {}
      let mapping = ''
      let modelIds = {}
      let repeatLibraryList = [] // ????????????????????????
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i]) {
          mapping = this.multipleSelection[i]['tableMapped']
          // tableType = this.multipleSelection[i]['tableType']
          // ???????????????????????? ????????????????????????????????????????????????????????????
          if (mapping) {
            modelIds = this.multipleSelection[i].tableRepository
            // ??????map?????????
            if (mappingMap[mapping]) {
              mappingMap[mapping] += '/' + modelIds
            } else {
              mappingMap[mapping] = modelIds
              repeatLibraryList.push(this.multipleSelection[i])
            }
          }
        }
      }
      // repeatLibraryList ??????????????????
      if (repeatLibraryList.length > 1) { // ????????????
        this.radioCheckValue = repeatLibraryList[0]['tableMapped'] // ?????????????????????
        this.selectParamStatus = true
        this.mappingDataMap = mappingMap // key ?????? value???????????? modelId
      } else { // ????????????????????????
        this.selectParamStatus = false
        if (repeatLibraryList[0]['tableMapped']) {
          this.$store.commit('SHOW_LOADING', '??????????????????...')
          setTimeout(() => {
            checkEditor(this, repeatLibraryList[0]['tableMapped'])
          }, 5000)
        } else { // ??????
          this.$store.commit('HIDE_LOADING', '???????????????!')
        }
      }
      this.selectCount = repeatLibraryList.length
    },
    // ????????????????????????
    prevStep1 () {
      this.selectParamStatus = true
    },
    // ?????????
    prevStep () {
      this.$bus.$emit('paramOneAddTab', {enName: 'paramOneManager', zhName: '????????????', isClosable: false, parent: 'paramOne_file', count: 0})
      // ??????????????????
      this.$emit('closeSuanfaTab', 'close')
      this.$bus.$emit('backParamOneManager') // ????????????????????????
    },
    // ?????????
    nextStep () {
      this.selectParamStatus = false
      this.$store.commit('SHOW_LOADING', '??????????????????...')
      setTimeout(() => {
        checkEditor(this, this.radioCheckValue)
      }, 5000)
    },
    getEditorValue () {
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // ????????????????????????
      return editorContent
    },
    // ????????????
    onSubmit () {
      let val = this.getEditorValue()
      if (val) {
        this.$store.commit('SHOW_LOADING', '???????????????...')
        // var mappedParams = {gpId: this.gpId, modelIds: this.getModelIds(), type: 'oneDimension', id: val}
       this.$axios(
                {
                  url: '/apm/bindGp?gpId=' + this.gpId + '&modelIds=' + this.getModelIds() + '&type=oneDimension',
                  method: 'post',
                  headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                  },
                  data: val
                }
              ).then(response => {
          this.$store.commit('HIDE_LOADING', '???????????????...')
          var data = response.data
          if (data.status === '0') {
            this.currentPage = 1
            this.$message({
              message: data.message,
              type: 'success'
            })
            // ??????????????????
            // ?????????????????????????????????
            this.$bus.$emit('paramOneAddTab', {enName: 'paramOneManager', zhName: '????????????', isClosable: false, parent: 'paramOne_file', count: 0})
            // ??????????????????
            this.$emit('closeSuanfaTab', 'close')
            this.$bus.$emit('backParamOneManager') // ????????????????????????
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(data.message)
          }
        }).catch(res => {
          this.$store.commit('HIDE_LOADING', '???????????????...')
        })
      } else {
        this.$message.error('??????????????????!')
      }
    },
    getModelIds () {
      let modelsId = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i === 0) {
          modelsId = this.multipleSelection[i].tableRepository
        } else {
          modelsId += ',' + this.multipleSelection[i].tableRepository
        }
      }
      return modelsId
    },
    // ????????????
    onTest () {
      // this.$refs.iframe.contentWindow.checkError('error', 0, 13, 'ddd') // ???????????????
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // ????????????????????????
      if (editorContent) {
        let index = 0
        let objData = {}
        this.attrRight = 'attrSecond'
        this.$store.commit('SHOW_LOADING', '??????????????????????????????!')
        let arr = this.multipleSelection
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          let str = arr[i].tableRepository
          var paramStr = this.$qs.stringify({
            content: editorContent,
            modelId: str
          })
          console.log(paramStr)
          this.$axios(
            {
              url: '/apm/getOneTreesByContent?modelId=' + str,
              method: 'post',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: editorContent
            }
          ).then((response) => {
            index++ // ???????????????
            for (let item in response.data) {
              if (item === 'script') {
                this.scriptContent = response.data[item]
              } else {
                objData[item] = response.data[item]
              }
            }
            // ?????????????????? ????????????????????? ?????????????????????????????????????????? relyonArr??????
            if (index === arr.length) {
              this.relyonArr = objData
              setTimeout(
                this.$store.commit('HIDE_LOADING', '??????????????????????????????!')
                , 3000)
            }
            // if (data['status']) {
            //   if (response.data.status === 'E1001') {
            //     this.$bus.$emit('logBackInHandle', response.data)
            //   } else {
            //     this.$message.error(response.data.message)
            //   }
            // }
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '??????????????????????????????!')
            this.$message.error('??????????????????')
          })
        }
        } else {
        this.$store.commit('HIDE_LOADING', '??????????????????????????????!')
        this.$message.error('?????????????????????')
      }
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

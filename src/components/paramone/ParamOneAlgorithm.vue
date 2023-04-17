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
  <!--方程式页面-->
  <div class="div_equation"   v-loading="loading">
    <div v-if="selectParamStatus" class="edit-select-param">
     <div style="height: calc(80vh - 165px);">
       <el-radio-group v-model="radioCheckValue"  v-for="(value, key) in mappingDataMap" :key="key" style="float: left;width: 100%; margin-bottom: 10px;">
         <el-radio :label="key">以{{value}}版本库为基础进行算法编辑</el-radio>
       </el-radio-group>
     </div>
      <div class="save" style="float: right;margin-right: 10%;margin-top: 20px">
        <el-button type="primary" @click="prevStep" size="mini" class="cm_button">上一步</el-button>
        <el-button type="primary" @click="nextStep" size="mini" class="cm_button">下一步</el-button>
      </div>
      </div>
    <div v-else>
      <div style="height: calc(80vh - 40px); border-bottom: solid 1px #ebeef5">
        <!-- 左侧元素 -->
        <div class="div_equation_left cm_tab_file_new_left">
          <el-tabs  v-model="activeName" @tab-click="tabHandleTabClick" style="padding-left:5px;">
            <el-tab-pane label="工程参数" name="first">
              <GongChengParamTree :styleHeight="bindHeight" :searchDisabled1="disabledStatus" @gcparamObj="getGongChengParamObj"></GongChengParamTree>
            </el-tab-pane>
            <el-tab-pane label="系统函数" name="second">
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
                <iframe id="ifid" ref="iframe" src="/DSAP/static/groovyIDE/index.html" width="100%" height="100%"></iframe>
              </div>
            </div>
          </div>
          <div class="equa_right cm_main_attr">
            <el-tabs v-model="attrRight">
              <el-tab-pane label="当前所选版本库为" name="attrFirst" class="content_tab_attr">
                <div class="point-ylgx" style="height: calc(80vh - 78px)">
                  <el-row v-for="(item, index) of multipleSelection"
                          :key="index"
                          style="line-height: 40px;border-bottom: solid 1px #dddd;">
                    {{item.tableRepository}} （{{item.tablePlane}}）
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="计算结果" name="attrSecond">
                <div class="point-ylgx" style="height: calc(80vh - 78px)">
                  <!-- <el-collapse  v-model="activeName" accordion v-for="(item, index) in relyonArr" :key="item.id" @change="panelChange(item, index)">
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
                        <div class="construction_img" @click="panelChange(item, index)">
                          <!-- <el-button style="margin-left:10px" title="显示结构" icon="el-icon-star-off" type="info" circle plain @click="panelChangeTwo(item, index)"></el-button> -->
                        </div>
                      </div>
                      <!--计算结果 -->
                      <div style="margin-left:25px;height:42px;line-height:42px;text-align:right;float:left;">计算结果：</div>
                      <div v-if="item['EXCEPTION_REASON']" class="exception_txt textarea">{{item.EXCEPTION_REASON}}</div>
                      <div v-else-if="item['test_data'] && item['test_data'].length > 0 && item.test_data[0].value" class="textarea">{{item.test_data[0].value}}</div>
                      <div v-else class="textarea">{{item}}</div>
                      <div class="clearfloat" style="clear:both;height:0;font-size:1px;line-height:0px;"></div>
                    </div>
                  </div>
                  <div v-show="rightShow">
                    <div class="right_shade"></div>
                    <div class="right_content">
                      <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/DSAP/static/orgChart/color-coded/org_chart.html" ></iframe>
                      <el-button @click="closePopup" style="float:right;margin:0px 26px 0px 0px;">关闭</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="left_description" style="padding:5px 0px 20px 20px;width: 75%;float: left;" v-show="showDescription">
        <span>说明：</span>
        <span class="descri" ref="descri_text"></span>
      </div>
      <div class="save">
          <el-button type="primary" @click="prevStep1" style="width:90px;height:34px" size="mini" v-if="selectCount > 1">上一步</el-button>
          <el-button type="primary" @click="onTest"  size="mini" style="width:90px;height:34px" v-if="this.$util.paramOneEditAuthority">测试</el-button>
          <el-button type="primary" @click="onSubmit"  size="mini" style="width:90px;height:34px" v-if="this.$util.paramOneEditAuthority">保存</el-button>
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
         vue.$store.commit('HIDE_LOADING', '拼命加载中!')
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
        //  vue.$store.commit('HIDE_LOADING', '拼命加载中!')
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
      selectParamStatus: false, // 是否显选择界面
      disabledStatus: false, //搜索框是否禁用
      multipleSelection: [], // 选中版本库映射的数据
      mappingDataMap: {}, // 根据算法进行分组 value为版本库 key 为算法
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
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      initDataObj: {}, // 初始dataObj
      mainTitle: '', // 主内容标题
      nameValue: '', // 名称,
      commentsValue: '',
      tabIndex: '', // tab页下标
      title: '', // 每个面板挑剔
      relyonArr: [],
      errorShow: false,
      rightShow: false,
      attrExplain: '', // 说明--工程参数节点
      explainShow: false,
      attrRight: 'attrFirst'
    }
  },
  watch: {
    filterText (val) {
      if (!this.$util.isDefine(val)) { //搜索框为空
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
    //     this.$store.commit('HIDE_LOADING', '拼命加载中!')
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
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
    },
    // 单击获取工程参数点击事件的值
    getGongChengParamObj (v) {
      if (this.$util.paramOneEditAuthority) {
        this.showDescription = false
        if (!v['CHILDREN']) { // 如果是子节点则 赋值显示说明
          if (v['DESCRIPTION']) { // 有说明则显示
            this.showDescription = true
            this.$refs.descri_text.textContent = v['DESCRIPTION']
          }
          checkEditor(this, '"' + v.NAME + '"')
        }
      }
    },
    // 单击系统函数获取到data
    getSystemFunctionObj (data) {
      if (this.$util.paramOneEditAuthority) {
        this.showDescription = false // 默认false
        if (!data['CHILDREN']) { // 如果是子节点则 赋值显示说明
          if (data.METHOD_DESCRIPTION) { // 有说明则显示
            this.showDescription = true
            this.$refs.descri_text.textContent = data.METHOD_DESCRIPTION
          }
          checkEditor(this, data.METHOD_NAME)
        }
      }
    },
    // 点击tab事件
    tabHandleTabClick () {
      this.showDescription = false // 隐藏说明
      if (this.activeTabName === 'first') {
      } else {
      }
    },
    // 禁止节点拖拽
    allowDrop (draggingNode, dropNode, type) {
      return false
    },
    // 加载工程参数子节点-说明
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
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败!')
      })
    },
    // 加载编辑初始化数据
    initEditData () {
      let mappingMap = {}
      let mapping = ''
      let modelIds = {}
      let repeatLibraryList = [] // 存储不重复的映射
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i]) {
          mapping = this.multipleSelection[i]['tableMapped']
          // tableType = this.multipleSelection[i]['tableType']
          // 标准字段的不选择 判断是否有映射，如果没有映射则表示新增。
          if (mapping) {
            modelIds = this.multipleSelection[i].tableRepository
            // 如果map中存在
            if (mappingMap[mapping]) {
              mappingMap[mapping] += '/' + modelIds
            } else {
              mappingMap[mapping] = modelIds
              repeatLibraryList.push(this.multipleSelection[i])
            }
          }
        }
      }
      // repeatLibraryList 去除重复后的
      if (repeatLibraryList.length > 1) { // 多个编辑
        this.radioCheckValue = repeatLibraryList[0]['tableMapped'] // 默认选中第一个
        this.selectParamStatus = true
        this.mappingDataMap = mappingMap // key 映射 value是版本库 modelId
      } else { // 如果只有选中一个
        this.selectParamStatus = false
        if (repeatLibraryList[0]['tableMapped']) {
          this.$store.commit('SHOW_LOADING', '正在加载脚本...')
          setTimeout(() => {
            checkEditor(this, repeatLibraryList[0]['tableMapped'])
          }, 5000)
        } else { // 新增
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }
      this.selectCount = repeatLibraryList.length
    },
    // 保存界面的上一步
    prevStep1 () {
      this.selectParamStatus = true
    },
    // 上一步
    prevStep () {
      this.$bus.$emit('paramOneAddTab', {enName: 'paramOneManager', zhName: '工程参数', isClosable: false, parent: 'paramOne_file', count: 0})
      // 关闭当前页签
      this.$emit('closeSuanfaTab', 'close')
      this.$bus.$emit('backParamOneManager') // 修改头部显示效果
    },
    // 下一步
    nextStep () {
      this.selectParamStatus = false
      this.$store.commit('SHOW_LOADING', '正在加载脚本...')
      setTimeout(() => {
        checkEditor(this, this.radioCheckValue)
      }, 5000)
    },
    getEditorValue () {
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // 获取编辑器的内容
      return editorContent
    },
    // 保存事件
    onSubmit () {
      let val = this.getEditorValue()
      if (val) {
        this.$store.commit('SHOW_LOADING', '正在绑定中...')
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
          this.$store.commit('HIDE_LOADING', '正在绑定中...')
          var data = response.data
          if (data.status === '0') {
            this.currentPage = 1
            this.$message({
              message: data.message,
              type: 'success'
            })
            // 关闭当前页签
            // 上一步打开工程参数界面
            this.$bus.$emit('paramOneAddTab', {enName: 'paramOneManager', zhName: '工程参数', isClosable: false, parent: 'paramOne_file', count: 0})
            // 关闭当前页签
            this.$emit('closeSuanfaTab', 'close')
            this.$bus.$emit('backParamOneManager') // 修改头部显示效果
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(data.message)
          }
        }).catch(res => {
          this.$store.commit('HIDE_LOADING', '正在绑定中...')
        })
      } else {
        this.$message.error('脚本不能为空!')
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
    // 测试事件
    onTest () {
      // this.$refs.iframe.contentWindow.checkError('error', 0, 13, 'ddd') // 返回错误行
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // 获取编辑器的内容
      if (editorContent) {
        let index = 0
        let objData = {}
        this.attrRight = 'attrSecond'
        this.$store.commit('SHOW_LOADING', '正在测试脚本，请稍等!')
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
                this.$store.commit('HIDE_LOADING', '正在测试脚本，请稍等!')
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
            this.$store.commit('HIDE_LOADING', '正在测试脚本，请稍等!')
            this.$message.error('脚本测试失败')
          })
        }
        } else {
        this.$store.commit('HIDE_LOADING', '正在测试脚本，请稍等!')
        this.$message.error('脚本不能为空！')
      }
    },
    // 展示详细信息
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
      //     this.$refs['flight_no' + index][0].textContent = '航班号：' + item.test_data[0].id
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

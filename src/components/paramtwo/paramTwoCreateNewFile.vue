<style scoped>
  .tab_file_new {
    display: flex;
    flex-direction: row;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  /* 左侧 */
  .tab_file_new_left {
    width: 25%;
    height: 100%;
/*
    padding-top: 15px;
*/
    border-right: 1px solid #DDDDDD;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left_tree {
    height: 100%;
    cursor: pointer;
/*
    overflow: scroll;
*/
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
    border: 1px solid #ebeef5;
    height: 36px;
    margin-bottom: 10px;
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

  .tab_file_new_middle {
    width: calc(100% - 335px);
  }

  .tab_file_new_main {
    width: calc(100% - 335px);
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ebeef5;
  }

  /* 中间 */
  .main_content {
    width: 60%;
    height: 100%;
    padding: 0px 2px;
    font-size: 14px;
    color: #606266;
  }

  .content_tab_pane {
    width: 95%;
    font-size: 14px;
    color: #606266;
    margin: 0px auto;
  }

  .content_mapped_value {
    color: #df5593;
  }

  .content_condition {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .input_condition {
    width: 40%;
  }

  .content_list {
    margin-top: 10px;
  }

  .content_page {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }

  /* 右侧 */
  .main_attr {
    width: 40%;
    height: 100%;
    padding-left: 2px;
    border-left: 1px solid #ebeef5;
  }

  .content_tab_attr {
    margin: 0 auto;
    width: calc(70% + 20px);
    font-size: 12px;
    color: #606266;
  }

  .main_attr_detail {
    margin-top: 10px;
    display: grid;
    grid-row-gap: 20px;
  }

  .input_text {
    width: 75%;
  }

  .equation_img {
    background-image: url(../../assets/images/icon91.png);
    background-size: cover;
    width: 25px;
    height: 17px;
  }

  .detail_mapped_text {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 75%;
    margin-left: 48px;
  }

  .input_text_mapped {
    margin-right: 10px;
  }

  .tab_attr_mapped {
    font-size: 14px;
    color: #606266;
  }

  .detail_explain {
    display: flex;
    flex-direction: row;
    width: 90%;
  }

  .detail_explain_text {
    width: 58px;
  }

  .main_attr_save {
    position: relative;
    left: 66%;
    bottom: 10px;
  }

  .main_attr_config {
    height: 70%;
    margin-top: 10px;
    display: grid;
    grid-row-gap: 20px;
  }

  .detail_senior_save {
    position: relative;
    left: 188px;
    top: 0px;
  }

  .content_tab_clear {
    margin: 0 auto;
    /* width: calc(70% + 20px); */
    width: 90%;
    font-size: 14px;
    color: #606266;
  }

  .clean_rules {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }

  .clean_rules_icon {
    display: flex;
    flex-direction: row;
  }

  .clean_rules_add {
    background-image: url(../../assets/images/icon66_1.png);
    background-size: cover;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  .clean_rules_devare {
    background-image: url(../../assets/images/icon75.png);
    background-size: cover;
    width: 18px;
    height: 18px;
  }

  .clean_rules_abnormal {
    /* width: 245px; */
    height: 200px;
    margin-top: 10px;
    border: 1px solid #ebeef5;
    padding-left: 10px;
  }

  .el-row {
    /* width: 255px; */
    padding: 5px 0px;
    border-bottom: 1px solid #ebeef5;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    line-height: 35px;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    min-height: 36px;
  }

  .row-bg {
    background-color: #f9fafc;
  }

  .icon_more {
    background-color: red;
  }

  .tab_riglt {
    width: 80%;
    height: 100%;
  }

  .tab-profile {
    width: 96%;
    margin: 0 auto;
  }

  .step-main-timepoint {
    margin: auto;
    margin-top: 40px;
    height: 100%;
  }

  .point-ylgx {
    margin-top: 40px
  }

  .point-main-bottom {
    height: 10%;
  }

  .point-main-top {
    width: 100%;
    height: 90%;
    border-bottom: solid 1px #DDDDDD;
  }

  .step-content-timepoint {
    margin: 25px 15px;
    height: 800px;
  }

  .el-textarea__inner {
    height: 300px;
  }

  .rule_delete {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    background-image: url(../../assets/images/icon71.png);
    background-size: cover;
    cursor: pointer;
  }

  .batch_untying {
    width: 85px;
    height: 25px;
    line-height: 25px;
    position: absolute;
    top: 8px;
    left: 68%;
    z-index: 999;
  }

  .rule_delete_batch {
    width: 15px;
    height: 15px;
    margin-top: 6px;
    background-image: url(../../assets/images/icon71.png);
    background-size: cover;
    cursor: pointer;
    margin-right: 5px;
    float:left;
  }

  .untying_text {
    width: 80px;
    height: 25px;
    color: #3a8ee6;
  }
</style>
<template>
  <div class="tab_file_new" style="width: 100%">
    <!-- 左侧元素 -->
    <div class="tab_file_new_left cm_tab_file_new_left" style="margin-top:-6px;">
      <div class="left_tree df-f1" v-loading="leftScriptLoadding">
        <el-table
          @row-click="checkScript"
          :data="scriptList"
          align="center"
          header-align="center"
          height="100%"
          style="width: 100%;">
          <el-table-column
            prop="NAME" align="center"
            label="名称"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="tab_riglt cm_tab_file_new_main">
      <div class="point-main-top">
        <div style="float: left;width: 70%;height: 100%; cursor:pointer;">
          <div class="batch_untying" @click="batchUntyingEvent">
            <div class="rule_delete_batch"></div>
            <div class="untying_text">批量解绑</div>
          </div>
          <el-tabs v-model="lefTabActive" class="tab-profile">
            <el-tab-pane :label="timePointTitle" name="paramTwomapping">
              <div style="margin-top:-8px;">
                <el-table
                  v-loading="bindLoadidng"
                  :data="libraryList"
                  border
                  height="65vh"
                  align="center"
                  true-label
                  header-align="center"
                  style="width: 100%;margin-top:10px;"
                  @selection-change="selectionMapping"
                >
                  <el-table-column v-loading="mappingLoadding"
                                   type="selection" align="center"
                                   width="55">
                  </el-table-column>
                  <el-table-column
                    prop="versionLibrary" align="center" width="90"
                    label="版本库">
                  </el-table-column>
                  <el-table-column
                    prop="planeType" align="center" width="190"
                    label="机型">
                  </el-table-column>
                  <el-table-column
                    prop="mapping"
                    align="center"
                    label="映射" width="">
                    <template slot-scope="scope">
                      <el-button type="text" @click="editTwoDimensional(scope.row)" :title="scope.row.mapping">{{scope.row.title}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作" width="90">
                    <template slot-scope="scope">
                     <span v-if="scope.row.mapping === null || scope.row.mapping === undefined || scope.row.mapping === ''">
                        <!--<el-button
                          size="mini"
                          @click="addScript(scope.$index, scope.row)">新增</el-button>-->
                     </span>
                     <span v-else style="display:flex;justify-content:center;">
                    <!-- <el-button size="mini" type="danger" @click="clearScript(scope.$index, scope.row)">解除绑定</el-button> -->
                      <div class="rule_delete" @click="clearScript(scope.$index, scope.row)"></div>
                     </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="float: left;width: 28%;height:100%;border-left: solid 1px #dddddd;">
          <el-tabs v-model="rightTabActive" class="tab-profile">
            <el-tab-pane label=" 属性" name="ylgx">
              <div class="point-ylgx">
                <el-form label-width="80px" :model="formLabelAlign" size="small">
                  <el-form-item label="名称：">
                    <el-input v-model="formLabelAlign.twoDimensionName" readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input type="textarea" v-model="formLabelAlign.twoDimensionDescription"
                              :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="point-main-bottom">
        <div style="float: right;margin-right: 10%;margin-top:10px;">
          <el-button type="primary" @click="saveTwoDimensionRelation">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CustomTree from 'components/base/CustomTree'

  export default {
    data () {
      return {
        subJson: {},
        active: 1,
        formLabelAlign: {},
        mappingLoadding: false,
        leftScriptLoadding: false,
        libraryList: [],
        scriptList: [], // 左侧树状数据
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        iconShow: true, // 树节点过滤图标
        searchShow: true, // 树节点搜索框
        filterText: '',
        gpId: '', // 子节点id
        lefTabActive: 'paramTwomapping', // 选中tab的name
        rightTabActive: 'ylgx',
        timePointTitle: '映射',
        multipleSelection: [], // 存储复选框选中的值 (对象)
        modelIds: [], // 存储复选框选中的值(String 数组) 用于提交
        scriptId: '',
        userId: '1',
        profileTwoDimensionId: 0,
        pofileType: 0,
        bindLoadidng: false,
        bounds: {}
      }
    },
    props: ['profileTwoDimensionId1', 'pofileType1'], // profileTwoDimensionId 分析函数的id pofileType 类型 1，时间点。
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      },
      seniorRadio (val) {
        if (val) {
          this.mappedText = ''
        }
      },
      currentPage (val) {
        this.currentChangeClick(val)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.profileTwoDimensionId = this.profileTwoDimensionId1
        this.pofileType = this.pofileType1
        this.getScripts() // 脚本
        this.getTwoDimensionById() // 右边的数据
      })
    },
    methods: {
      // 初始化树
      getScripts () {
        this.bindLoadidng = true
        this.$axios.get('/apm/getScripts', {params: {type: this.pofileType, userId: this.userId}}).then(response => {
          this.scriptList = []
          var data = response.data
          if (data && data.length > 0) {
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              // console.log('xxx:' + data)
              this.scriptList = data
              this.getAllModels() // 中间的数据
            }
          } else {
            this.bindLoadidng = false
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.bindLoadidng = false
        })
      },
      // 自定义子节点内容
      renderContent (h, {node, data, store}) {
        var that = this // 指向vue
        return h(CustomTree, {
          props: {
            data: data, // 当前节点的数据
            node: node // 当前节点的Node对象
          },
          on: { // 绑定方法 data node store type是当前节点信息
            addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
            saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
            cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node)),
            editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node))
          }
        })
      },
      // 点击编辑触发事件
      editNodeFun (data, node, nodecomment) {
      },
      // 查询版本库
      getAllModels () {
        this.$axios.get('/apm/getAllModels', {params: {}}).then(response => {
          this.libraryList = []
          var data = response.data
          if (data && data.length > 0) {
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              // console.log('xxx:' + data)
              for (var i = 0; i < data.length; i++) {
                this.libraryList.push({
                  versionLibrary: data[i].ID,
                  planeType: data[i].DESCRIPTION,
                  mapping: null,
                  title: null,
                  scriptId: null
                })
              }
              this.getBindRelation() //查询绑定关系
            }
          } else {
            this.bindLoadidng = false
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.bindLoadidng = false
        })
      },
      // 点击左边的脚本
      checkScript (row, event, column) {
        if (this.multipleSelection === null || this.multipleSelection === undefined || this.multipleSelection.length === 0) {
          this.$message('请先选中映射数据')
        } else {
          this.mappingLoadding = true
          var scriptId = row.ID
          let name = row.NAME
          // console.log('checkScript: ' + this.scriptId + '-' + name)
          var arr = []
          let flag = false
          for (let i = 0; i < this.libraryList.length; i++) {
            var libraryData = this.libraryList[i]
            flag = false
            for (let j = 0; j < this.multipleSelection.length; j++) {
              if (this.libraryList[i].versionLibrary === this.multipleSelection[j].versionLibrary) {
                let title = name
                if (title.length > 10) {
                  title = title.substring(0, 10) + '...'
                }
                arr.push({
                  versionLibrary: this.libraryList[i].versionLibrary,
                  planeType: this.libraryList[i].planeType,
                  mapping: name,
                  title: title,
                  scriptId: scriptId
                })
                this.subJson[libraryData.versionLibrary] = scriptId
                console.log(this.subJson)
                flag = true
                break
              }
            }
            if (!flag) {
              arr.push({
                versionLibrary: this.libraryList[i].versionLibrary,
                planeType: this.libraryList[i].planeType,
                mapping: this.libraryList[i].mapping,
                title: this.libraryList[i].title,
                scriptId: this.libraryList[i].scriptId
              })
            }
          }
          this.libraryList = arr
          this.mappingLoadding = false
          this.multipleSelection = [] // 清空选中的值
          // this.modelIds 清空版本库ids
        }
      },
      selectionMapping (val) {
        this.multipleSelection = val
      },
      // 清空映射
      clearScript (i, obj) {
        this.subJson[obj.versionLibrary] = ''
        this.bindTwoDimensionRelation(this.profileTwoDimensionId, this.subJson)
      },
      // 保存版本库映射
      saveTwoDimensionRelation () {
        console.log(this.subJson)
        // console.log(this.modelIds)
        this.bindTwoDimensionRelation(this.profileTwoDimensionId, JSON.stringify(this.subJson))
        this.subJson = {}
        this.updateTwoDimension()
      },
      // 绑定版本库与脚本的方法
      bindTwoDimensionRelation (twoDimensionId, jsonVal) {
        this.bindLoadidng = true
        this.$axios(
          {
            url: '/apm/bindTwoDimensionRelation',
            method: 'get',
            params: {
              twoDimensionId: twoDimensionId,
              json: jsonVal
            }
          }
        ).then(response => {
          this.bindLoadidng = false
          var data = response.data
          if (data.status === '0') {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.modelIds = []
            this.getBindRelation() // 成功之后查询绑定的数据显示到前端
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(data.message)
          }
        }).catch(response => {
          if (jsonVal === null) {
            this.$message.error('解除绑定失败！')
          } else {
            this.$message.error('绑定失败！')
          }
        })
      },
      // 根据节点id查询 绑定的版本库映射
      getBindRelation () {
        var libraryArray = []
        this.$axios.get('/apm/getBindRelation', {params: {twoDimensionId: this.profileTwoDimensionId}}).then(response => {
          var data = response.data
          this.bounds = data
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            for (var i = 0; i < this.libraryList.length; i++) {
              let scId = data[this.libraryList[i].versionLibrary]
              let scName = ''
              for (var j = 0; j < this.scriptList.length; j++) {
                if (this.scriptList[j].ID === scId) {
                  scName = this.scriptList[j].NAME
                  break
                }
              }
              let title = scName
              if (title.length > 10) {
                title = title.substring(0, 10) + '...'
              }
              libraryArray.push({
                versionLibrary: this.libraryList[i].versionLibrary,
                planeType: this.libraryList[i].planeType,
                mapping: scName,
                title: title,
                scriptId: scId
              })
            }
            this.libraryList = libraryArray
            this.bindLoadidng = false
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.bindLoadidng = false
        })
      },
      // 修改分析函数
      updateTwoDimension () {
        var paramStr = this.$qs.stringify({
          id: this.profileTwoDimensionId,
          twoDimensionDescription: this.formLabelAlign.twoDimensionDescription
        })
        this.$axios.post('/apm/updateTwoDimension', paramStr, {
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).then(response => {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }).catch(response => {
          this.$message.error({
            duration: 0,
            message: '保存失败！'
          })
        })
      },
      getTwoDimensionById () {
        this.$axios.get('/apm/getTwoDimensionById', {params: {id: this.profileTwoDimensionId}}).then(response => {
          var data = response.data
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.formLabelAlign = data
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
        })
      },
      // 点击编辑工程函数，显示tab
      editTwoDimensional (obj) {
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwoAlgorithmsLibraryPersonalEdit', zhName: obj.mapping, isClosable: true, parent: 'paramTwo_algorithmsLibrary', count: 0, id: obj.scriptId})
      },
      // 批量解绑
      batchUntyingEvent () {
        if (this.multipleSelection === null || this.multipleSelection === undefined || this.multipleSelection.length === 0) {
          this.$message('请先选中一条数据')
        } else {
          console.log(this.multipleSelection)
          var jsonObjTemp = {}
          for (var i = 0; i < this.multipleSelection.length; i++) {
            jsonObjTemp[this.multipleSelection[i].versionLibrary] = ''
          }
          this.bindTwoDimensionRelation(this.profileTwoDimensionId, JSON.stringify(jsonObjTemp))
        }
      }
    }
  }
</script>

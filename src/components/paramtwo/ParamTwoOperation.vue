<style scoped>
  .library-new-top{
    width: 100%;
    height: 90%;
  }
  .library-new-bottom{
    padding-top: 8px;
    width: 100%;
    height: 10%;
    border-top: solid 1px #DDDDDD;
  }
  .library-new-left{
    width: 75%;
    float: left;
    /* height: 98%; */
    height: 100%;
    padding: 0px 5px;
  }
  .library-new-right{
    width: 24%;
    float: left;
    height: 100%;
    border-left: solid 1px #DDDDDD;
  }
  .point-ylgx{
    margin-top: 20px;
    width: 90%;
  }
  .param-two-time-point {
    /* position: absolute; */
    height: 100%;
    width: 100%;
  }
  /* 左侧 */
  .param-two-time-point-left {
    width: 35%;
    float: left;
    height: 100%;
    border-right: solid 1px #DDDDDD;
  }
  .param-two-time-left{
    width: 35%;
    float: left;
    height: 100%;
  }
  .param-two-time-point-right{
    width: 63%;
    float: left;
    height: 100%;
   }
  .left_tree {
    overflow: auto;
    height: 93%;
    border: 1px solid #ebeef5;
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
    height: 7%;
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

  .script_left {
    float:left;
    width: 35%;
    height: 100%;
  }

  .script_edit {
    float:left;
    width: 65%;
    height: 100%;
  }

  #ifid {
    height: 100%;
  }
</style>
<template>
  <div style="height: 100%;" v-loading="loadding">
    <!-- 新建分析参数算法之事件 -->
    <div class="library-new-top">
      <div class="library-new-left" >
        <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%;">
            <!--显示菜单选项0-->
           <div v-show="showMenueItem" style="width: 100%;height: 93%;clear: left; float: left; position: relative; left:40%; top: 15%;">
                <span v-if="childCreatorList.length > 0">
                  <el-radio-group v-model="showRadio">
                   <el-form v-for="item in childCreatorList" :key="item.ID" label-width="20%" size="mini" style="margin-top: 50px;">
                    <el-form-item>
                      <el-radio :label="item.ID" @change="radioCheckChange(item.ID,item.NAME)">{{item.NAME}}</el-radio>
                    </el-form-item>
                   </el-form>
                  </el-radio-group>
                </span>
            </div>
            <!--显示数据-->
            <div class="param-two-time-point" v-show="showContentPage">
              <span v-if="creatorId === 6 || creatorId === '6'">
              <div class="param-two-time-point-left">
                <!-- 树 -->
                <div class="left_tree df-f1" v-loading="treeLoading">
                  <el-tree :data="fileNewTreeArr"  node-key="id" :props="defaultTreeProps" highlight-current
                           @node-click="handleNodeClick"
                           ref="tree" :filter-node-method="filterNode">
                  </el-tree>
                </div>
                 <!-- 过滤节点 -->
                <div class="left_filter" v-show="searchShow">
                  <el-input placeholder="请输入关键字搜索" v-model="filterText">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
                  </el-input>
                </div>
            </div>
              <div class="param-two-time-point-right">
              <!--显示输入框-->
                 <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 50px;margin-left:10%">
                   <el-form-item label="选择时间点：">
                  <el-input v-model="formData.timePoint" style="width: 60%"></el-input>
                  <el-input-number size="mini"  v-model="formData.number" style="width: 20%"></el-input-number> 秒
                </el-form-item>
                </el-form>
             </div>
              </span>
              <span v-else-if="creatorId === 16 || creatorId === '16'">
                <div class="script_left" >
                  <ParamTwoLeft v-on:listenToChildEvent="showMsgFromChild"></ParamTwoLeft>
                </div>
                <div class="script_edit">
                  <iframe id="ifid" ref="iframe" src="/dsap/static/groovyIDE/index2.html" width="100%"></iframe>
                </div>
              </span>
            </div>
        </el-tabs>
      </div>
      <div class="library-new-right">
        <el-tabs v-model="rightTabActive"   class="tab-profile">
          <el-tab-pane label=" 属性" name="rightShuxing">
            <div class="point-ylgx">
              <el-form label-width="80px" :model="formLabelAlign" size="small" >
                <el-form-item label="名称：">
                  <el-input v-model="formLabelAlign.attributeName"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input type="textarea" v-model="formLabelAlign.attributeDesc"    :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
                </el-form-item>
                <!-- <el-form-item label="说明：">
                  <el-input type="textarea" v-model="attrExplain" :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
                </el-form-item> -->
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label=" 依赖关系" name="ylgx">
            <div style="margin-top: 15px;text-align: center">
              <el-collapse  v-model="activeName"  v-for="(item, index) in relyonArr" :key="item.id" @change="panelChangeTwo(item, index)">
                <el-collapse-item :title="index" :name="index">
                  <div v-show="errorShow" class="collapse_content" :ref="'collapse_content' + index"></div>
                  <div class="flight_no" :ref="'flight_no' + index"></div>
                </el-collapse-item>
              </el-collapse>
              <div v-show="rightShow">
                <div class="right_shade"></div>
                <div class="right_content">

                  <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/dsap/static/orgChart/color-coded/org_chart.html" ></iframe>
                  <el-button @click="closePopup" style="float:right;margin:10px 26px 0px 0px;">关闭</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="library-new-bottom">
      <div v-show="explainShow" class="left_description" style="width:35%; float:left;height:10%;">
        <span>说明：</span>
        <span class="descri" ref="descri_text"></span>
      </div>
      <div class="sx_button" style="width: 90%;height:10%;">
        <el-button type="primary" style="float: left;margin-left:55%;    " :disabled="disablePrevious" @click="previousClick">上一步</el-button>
        <el-button type="primary" style="float: left;margin-left:1%;    " :disabled="childCreatorList ===null || childCreatorList === undefined || childCreatorList.length === 0"  @click="nextClick">下一步 </el-button>
        <el-button type="primary" style="float: left;margin-left:1%;    " v-show="showTestBtn "  @click="onTest">测 试</el-button>
        <el-button type="primary" style="float: left;margin-left:1%;    " v-show="showSaveBtn"  @click="onSubmit">保 存</el-button>
        <el-dialog
          title="PROFILE内容"
          :visible.sync="dialogVisible"
          width="400px">
          <el-select v-model="profileValue" placeholder="请选择" clearable @change="profileChange">
            <el-option
              v-for="item in profileData"
              :key="item.ID"
              :label="item.PROFILE_NAME"
              :value="item.ID">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="testScript">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
function checkEditor (vue, val) {
  if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
    vue.$refs.iframe.contentWindow.insertMethod(val)
    vue.$refs.iframe.contentWindow.setFuncType('2')
  } else {
    setTimeout(function () {
      checkEditor(vue, val)
    }, 500)
  }
}

const ParamTwoLeft = () => import('components/paramtwo/ParamTwoLeft')

export default {
  data () {
    return {
      loadding: true,
      disablePrevious: true, // 默认禁用上一步
      showMenueItem: true,
      showContentPage: false,
      showSaveBtn: false,
      showRadio: -2,
      rightCss: '1',
      showTree: false,
      showTestBtn: false,
      stepTitle: '事件',
      creatorId: '',
      type: '5',
      childCreatorList: [],
      arrCreatorId: [], // 存储点击过的节点id，
      scriptTypes: [], // 存储 父节点id 根节点为scriptType的值
      scriptId: null, // 个人库算法id 查询详情
      activeName: 'setTimePoint',
      rightTabActive: 'rightShuxing',
      relyonArr: [],
      errorShow: false,
      rightShow: false,
      formData: {
        timePoint: '',
        number: '1'
      },
      formLabelAlign: {
        attributeName: '',
        attributeDesc: ''
      },
      timePointTitle: '新建事件',
      treeLoading: false,
      fileNewTreeArr: [], // 左侧树状数据
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      iconMoreShow: false, // 自定义节点图标
      iconOtherShow: false, // 自定义节点图标
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      tabProfileName: '', // tab的name
      tabProfileLabel: '', // tab 的label
      tableLoading: false,
      profileObj: [],
      // childCreatorId: '', // 当前菜单步骤的具体id
      typeMap: {
        'timePoint': '1', // 时间点
        'measuredValue': '3', // 测量值 3
        'logicalValue': '4', // 逻辑值5
        'operation': '5' // 事件
      },
      // 根据返回的 type 显示默认图标用
      typeMapById: {
        '1': 'timePoint',
        '3': 'measuredValue',
        '4': 'logicalValue',
        '5': 'operation'
      },
      userId: '1',
      dialogVisible: false, // profile默认不显示弹出框
      profileValue: '', // profile默认值
      profileSelectValue: '', // profile选中值
      profileData: [], // profile数组
      attrExplain: '', // 说明--工程参数
      explainShow: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {
    ParamTwoLeft
  },
  props: ['sid', 'scriptType'],
  mounted () {
    this.scriptTypes.push(this.scriptType)
    this.getChildCreatorByScriptType(this.scriptType) // 查询 子节点菜单
  },
  methods: {
    // 根据根节点加载子节点
    getChildCreatorByScriptType (creatorId) {
      this.$axios.get('/apm/getChildCreator', {params: {id: creatorId}}).then(response => {
        if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.childCreatorList = []
          this.childCreatorList = response.data
          this.showTestBtn = false
          if (this.childCreatorList.length > 0) {
            this.showMenueItem = true
            this.showContentPage = false
            this.showSaveBtn = false
          } else {
            this.showMenueItem = false
            this.showContentPage = true
            this.showSaveBtn = true
          }
          // 修改时查询
          if (this.sid !== null && this.sid !== undefined && this.sid !== '') {
            this.scriptId = this.sid
            this.getTwoDimensionScriptById()
          } else {
            this.checkedRadio()
          }
          this.loadding = false
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    getTwoDimensionScriptById () {
      this.$axios.get('/apm/getTwoDimensionScriptById', {params: {id: this.scriptId}}).then(response => {
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.scriptId = data.id
          this.scriptType = data.type
          this.formLabelAlign.attributeName = data.name
          if (data.twoDimensionContent !== null && data.twoDimensionContent !== undefined && data.twoDimensionContent !== '') {
            this.creatorId = 16
            this.showRadio = this.creatorId * 1 // 选中radio
            checkEditor(this, data.twoDimensionContent) // 脚本内容
          } else {
            this.creatorId = 17
            this.showRadio = this.creatorId * 1 // 选中radio
          }
          if (data.createSteps !== null && data.createSteps !== undefined && data.createSteps !== '') {
            var json = JSON.parse(data.createSteps) // 解析返回的 steps json
            this.setVal(data, json)
          }
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
      })
    },
    setVal (data, json) {
      this.formLabelAlign.attributeDesc = json.description
      this.arrCreatorId = json.arrCreatorId
      this.activeName = json.activeName
      this.creatorId = json.creatorId
      // this.creatorId = jsn.creatorIdo
      // this.showRadio = this.creatorId * 1
      // if (this.creatorId === '16' || this.creatorId === 16) {
      // checkEditor(this, data.twoDimensionContent) // 脚本内容
      // } else
      this.stepTitle = json.stepTitle
      if (this.creatorId === '17' || this.creatorId === 17) {
        this.formData.timePoint = json.timepoint
        this.formData.number = json.offset
      } else { // 说明不是当前累的this.creatorId 将其清空
        this.creatorId = ''
      }
      this.checkedRadio()
    },
    // 初始化树
    getTree () {
      this.treeLoading = true
      this.$axios.get('/apm/getProfileCatalogByUserIdWithoutStandard', {params: {type: this.scriptType}}).then(response => {
        this.treeLoading = false
        this.fileNewTreeArr = []
        var data = response.data
        if (data.length > 0) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            for (var i = 0; i < data.length; i++) {
              this.fileNewTreeArr.push({
                ID: data[i].ID,
                NAME: data[i].NAME,
                CHILDREN: data[i].CHILDREN
              })
            }
          }
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    // 树节点过滤图标
    filterTree (flag) {
      flag === 'treeSearch'
        ? ([this.iconShow, this.searchShow] = [this.searchShow, this.iconShow])
        : ([this.searchShow, this.iconShow] = [this.iconShow, this.searchShow])
    },
    // 刷新事件
    refresh () {
      this.treeLoading = true
      this.getTree()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1
    },
    // 点击子节点击事件 加载中间及右侧数据
    handleNodeClick (data, node, nodeCommpent) {
      if (data.NAME !== null) {
        if (data['CHILDREN']) { // 点击父节点
        } else {
          this.formData.timePoint = data.NAME
          var iframeDocument = this.$refs.iframe
          iframeDocument.contentWindow.insertMethod('"' + data.NAME + '"') // 赋值到编辑器
        }
      }
    },
    handleClick (vc) {

    },
    // 点击的时候赋值
    radioCheckChange (id, name) {
      this.creatorId = id
      this.stepTitle = name
    },
    // 选中 radio
    checkedRadio () {
      if (this.arrCreatorId !== null && this.arrCreatorId !== undefined && this.arrCreatorId.length > 0) {
        for (var i = 0; i < this.childCreatorList.length; i++) {
          var item = this.childCreatorList[i]
          for (var j = 0; j < this.arrCreatorId.length; j++) {
            var itme1 = this.arrCreatorId[j]
            if (itme1.ID === item.ID) {
              this.creatorId = item.ID
              this.showRadio = this.creatorId * 1 // 选中radio
              this.arrCreatorId.splice(j, 1) // 清空 避免重复
            }
          }
        }
      }
    },
    previousClick () {
      this.explainShow = false
      this.attrExplain = ''
      let lastIndex = this.scriptTypes.length - 1
      let scriptType = this.scriptTypes[lastIndex] // 获取到父节点
      this.scriptTypes.splice(lastIndex, 1) // 删除数组中该父节点
      this.getChildCreatorByScriptType(scriptType)
      if (this.scriptTypes === null || this.scriptTypes.length === 0) {
        this.disablePrevious = true
        this.scriptTypes.push(this.scriptType)
      }
    },
    // 点击下一步，如果没有数据，则显示保存按钮，以及需要提交的数据，树等
    nextClick () {
      if (this.creatorId === null || this.creatorId === '') {
        this.$message.error('请先选择!')
      } else {
        this.$axios.get('/apm/getChildCreator', {params: {id: this.creatorId}}).then(response => {
          if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.disablePrevious = false
            this.childCreatorList = response.data
            this.arrCreatorId.push({
              ID: this.creatorId}) // 存选中的节点
            if (this.childCreatorList !== null && this.childCreatorList.length > 0) {
              this.scriptTypes.push(this.creatorId + '') // 如果有子节点存储当前id为父节点
              this.showSaveBtn = false
              this.showMenueItem = true
              this.showContentPage = false
            } else { // 没有子节点
              this.getTree()
              this.showMenueItem = false
              this.showContentPage = true
              this.showSaveBtn = true // 显示保存按钮
              if (this.creatorId === '16' || this.creatorId === 16) {
                this.showTestBtn = true
              }
            }
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
        })
      }
    },
    // 保存时间点 数据
    saveTimePoint () {
      var paramStr
      let url = ''
      if (this.scriptId === null || this.scriptId === undefined || this.scriptId === '') {
        url = '/apm/addTwoDimensionScriptByCreator'
        paramStr = this.$qs.stringify({
          name: this.formLabelAlign.attributeName,
          description: this.formLabelAlign.attributeDesc,
          userId: this.userId,
          creatorId: this.creatorId,
          type: this.type,
          json: '{"TIMEPOINT": "' + this.formData.timePoint + '", "OFFSET": "' + this.formData.number + '"}',
          steps: '{"timepoint": "' + this.formData.timePoint + '", "offset": "' + this.formData.number + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "description": "' + this.formLabelAlign.attributeDesc + '" ,"stepTitle": "' + this.stepTitle + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + '}'
        })
      } else {
        url = '/apm/updateTwoDimensionScriptByCreator'
        paramStr = this.$qs.stringify({
          twoDimensionScriptId: this.scriptId,
          name: this.formLabelAlign.attributeName,
          description: this.formLabelAlign.attributeDesc,
          userId: this.userId,
          creatorId: this.creatorId,
          type: this.type,
          json: '{"TIMEPOINT": "' + this.formData.timePoint + '", "OFFSET": "' + this.formData.number + '"}',
          steps: '{"timepoint": "' + this.formData.timePoint + '", "offset": "' + this.formData.number + '", "activeName": "' + this.activeName + '", "creatorId": "' + this.childCreatorId + '", "description": "' + this.formLabelAlign.attributeDesc + '"  ,"stepTitle": "' + this.stepTitle + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + '}'
        })
      }
      this.$axios.post(url, paramStr,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
        var dataRes = response.data
        if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
        } else if (dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.$message.error('保存失败!')
      })
    },
    // 加载工程参数子节点-说明
    getDetail (id) {
      var param = { gpId: id }
      this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        this.$refs.descri_text.textContent = data.DESCRIPTION
        if (!this.$util.isDefine(data.DESCRIPTION)) {
          this.explainShow = false
        } else {
          this.explainShow = true
        }
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败!')
      })
    },
    // 左侧节点值赋给右侧编辑器
    showMsgFromChild (data) {
      if (data === 'hide') {
        this.explainShow = false
      } else {
        var iframeDocument = this.$refs.iframe
        iframeDocument.contentWindow.insertMethod('"' + data.NAME + '"') // 赋值到编辑器
        this.getDetail(data.ID)
      }
    },
    // 保存编辑内容
    saveEditor () {
      var url = ''
      if (this.scriptId === null || this.scriptId === undefined || this.scriptId === '') {
        url = '/apm/addTwoDimensionScriptByCreator'
      } else {
        url = '/apm/updateTwoDimensionScriptByCreator'
      }
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue()
      var paramObj = {
        name: this.formLabelAlign.attributeName, // 名称
        userId: this.userId,
        type: this.type,
        creatorId: this.creatorId,
        twoDimensionScriptId: this.scriptId,
        json: editorContent,
        steps: '{"activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "description": "' + this.formLabelAlign.attributeDesc + '" ,"stepTitle": "' + this.stepTitle + '", "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + '}',
        twoDimensionDescription: this.formLabelAlign.attributeDesc // 注释
      }
      var paramStr = this.$qs.stringify(paramObj)
      this.$axios.post(url, paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data.status === '0') {
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$message.error('数据保存失败')
      })
    },
    // 保存事件
    onSubmit () {
      if (this.creatorId === 6 || this.creatorId === '6') {
        this.saveTimePoint()
      } else if (this.creatorId === 16 || this.creatorId === '16') {
        this.saveEditor()
      }
    },
    // 测试事件--加载profileId
    onTest () {
      this.dialogVisible = true
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getProfilesByUserId', { params: {} }).then(response => {
        var data = response.data
        if (data['status']) {
          if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data) {
          this.profileData = data
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败，请刷新页面重试！')
      })
    },
    // 选中的值
    profileChange (val) {
      this.profileSelectValue = val
    },
    // 测试事件--测试profileId和脚本内容
    testScript () {
      this.dialogVisible = false
      this.$store.commit('SHOW_LOADING', '正在测试脚本，请稍等！')
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // 获取编辑器的内容
      var paramStr = this.$qs.stringify({
        content: editorContent,
        modelId: '',
        profileId: this.profileSelectValue
      })
      this.$axios.post('/apm/getTwoTreesByContent', paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.relyonArr = data
            this.rightTabActive = 'ylgx'
          }
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('脚本测试失败')
      })
    },
    // 关闭profile弹出框
    handleClose (done) {
      done()
    },
    // 展示详细信息
    panelChangeTwo (item, index) {
      if (item['EXCEPTION_REASON']) {
        this.errorShow = true
        this.$refs['collapse_content' + index][0].textContent = item.EXCEPTION_REASON
      } else {
        this.rightShow = true
        if (item['test_data']) {
          this.$refs['flight_no' + index][0].textContent = item.test_data[0].id
        }
        delete item.test_data
        var obj = {}
        obj[index] = item
        this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
      }
    },
    closePopup () {
      this.rightShow = false
      this.$refs.iframeOrgChart.contentDocument.getElementById('chart-container').innerText = ''
    }
  }
}
</script>

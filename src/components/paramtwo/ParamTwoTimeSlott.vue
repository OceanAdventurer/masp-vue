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
    padding-right: 15%;
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
  }
  .param-two-time-point-right{
    width: 63%;
    float: left;
    height: 100%;
    border-left: solid 1px #DDDDDD;
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
</style>
<template>
  <div style="height: 100%;" v-loading="measureLoading">
    <!-- 新建分析参数算法之时间段  -->
    <div class="library-new-top">
      <div class="library-new-left" >
        <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%;">
          <div v-show="childCreatorList !== null && childCreatorList.length > 0" style="width: 100%;height: 93%;clear: left; float: left; position: relative; left:40%; top: 15%;">
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
          <span v-show="childCreatorList === null || childCreatorList === undefined || childCreatorList.length === 0 ">
              <span v-if="creatorId === '8' || creatorId === 8">
                <TwoTimePoints :formDt="formData"></TwoTimePoints>
              </span>
              <span v-else-if="creatorId === '17' || creatorId === 17">
                <div class="script_left" >
                  <ParamTwoLeft v-on:listenToChildEvent="showMsgFromChild"></ParamTwoLeft>
                </div>
                <div class="script_edit">
                  <iframe id="ifid" ref="iframe" src="/DSAP/static/groovyIDE/index2.html" width="100%"></iframe>
                </div>
              </span>
            </span></el-tabs>
      </div>
      <div class="library-new-right">
        <el-tabs v-model="rightTabActive"   class="tab-profile">
          <el-tab-pane label=" 属性" name="rightShuxing">
            <div class="point-ylgx">
              <el-form label-width="80px" :model="formLabelAlign" size="small" >
                <el-form-item label="名称：">
                  <el-input v-model="formLabelAlign.twoDimensionName"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input type="textarea" v-model="formLabelAlign.twoDimensionDescription"    :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
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

                  <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/DSAP/static/orgChart/color-coded/org_chart.html" ></iframe>
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
        <el-button type="primary" style="float: left;margin-left:55%;" :disabled="disablePrevious" @click="previousClick">上一步</el-button>
        <el-button type="primary" style="float: left;margin-left:1%; " :disabled="childCreatorList ===null || childCreatorList === undefined || childCreatorList.length === 0"  @click="nextClick">下一步 </el-button>
        <el-button type="primary" style="float: left;margin-left:1%;    " v-show="showTestBtn "  @click="onTest">测 试</el-button>
        <el-button type="primary" style="float: left;margin-left:1%;" v-show="showSaveBtn"  @click="saveMeasure">保 存</el-button>
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
  const TwoTimePoints = () => import('components/paramtwo/TwoTimePoints')
  const ParamTwoLeft = () => import('components/paramtwo/ParamTwoLeft')
  export default {
    data () {
      return {
        scriptId: '',
        saveStepsJson: {},
        disablePrevious: true, // 禁用上一步
        showSaveBtn: false,
        showRadio: -2, // 默认不选中
        creatorId: '', // 节点id
        stepTitle: '度量值',
        childCreatorList: [], // 子菜单集合
        // scriptType: '3', //  根节点id（分析函数的菜单 type）
        activeName: 'setTimePoint',
        rightTabActive: 'rightShuxing',
        relyonArr: [],
        errorShow: false,
        rightShow: false,
        formData: {
          timePoint: '',
          columnName: '',
          timePointOne: '',
          timePointTwo: '',
          aggregate: ''
        },
        arrCreatorId: [], // 存储点击过的节点id，
        scriptTypes: [], // 存储 父节点id 根节点为scriptType的值
        tag: '', // 1 工程参数 2 公式  修改的时候要根据这个选中radio
        formLabelAlign: {
          twoDimensionName: '',
          twoDimensionDescription: ''
        },
        timePointTitle: '新建时间点',
        treeLoading: false,
        libraryList: [],
        fileNewTreeArr: [], // 左侧树状数据
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        userId: '1',
        showTestBtn: false,
        measureLoading: true,
        iconMoreShow: false, // 自定 义节点图标
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
        btnFlag: '', // 保存事件标识默认值
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
    props: ['sid', 'scriptType'],
    components: {
      TwoTimePoints,
      ParamTwoLeft
    },
    mounted () {
      this.scriptTypes.push(this.scriptType)
      // 修改时查询
      this.getChildCreatorByScriptType(this.scriptType) // 查询 子节点菜单
      // 接收时间段的值
      this.$bus.$on('ParamTwoTimeSlottTime1', (obj) => {
        this.formData.timePointOne = obj.timePointOne
      })
      this.$bus.$on('ParamTwoTimeSlottTime2', (obj) => {
        this.formData.timePointTwo = obj.timePointTwo
      })
    },
    methods: {
      // 查询子节点
      getChildCreatorByScriptType (creatorId) {
        this.$axios.get('/apm/getChildCreator', {params: {id: creatorId}}).then(response => {
          if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.childCreatorList = []
            this.childCreatorList = response.data
            if (this.childCreatorList !== null && this.childCreatorList.length > 0) {
              this.showSaveBtn = false
            } else {
              this.showSaveBtn = true
            }
            if (this.sid !== null && this.sid !== undefined && this.sid !== '') {
              this.scriptId = this.sid
              this.getTwoDimensionScriptById()
            } else {
              this.checkedRadio()
            }
            this.measureLoading = false
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.treeLoading = false
        })
      },
      // 根据scriptID查询详情
      getTwoDimensionScriptById () {
        this.$axios.get('/apm/getTwoDimensionScriptById', {params: {id: this.scriptId}}).then(response => {
          var data = response.data
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.scriptId = data.id
            this.formLabelAlign.twoDimensionName = data.name
            this.scriptType = data.type
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
        this.formLabelAlign.twoDimensionDescription = json.description
        this.arrCreatorId = json.arrCreatorId // 取出子节点id 集合
        this.activeName = json.activeName
        this.formData.columnName = json.columnName
        this.creatorId = json.creatorId
        if (this.creatorId === '8' || this.creatorId === 8) { // 选中8 的数据
          this.formData.timePointOne = json.timepoint1
          this.formData.timePointTwo = json.timepoint2
        } else if (this.creatorId === '17' || this.creatorId === 17) {
          checkEditor(this, data.twoDimensionContent) // 脚本内容
        } else { // 说明不是当前累的this.creatorId 将其清空
          this.creatorId = ''
        }
        this.checkedRadio()
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
      // 初始化树
      getTree () {
        this.treeLoading = true
        this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId}}).then(response => {
          this.fileNewTreeArr = []
          this.treeLoading = false
          var data = response.data
          if (data !== null && data.length > 0) {
            console.log('xxx:' + data)
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
      handleClick (vc) {
      },
      previousClick () {
        this.explainShow = false
        this.attrExplain = ''
        this.showTestBtn = false
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
                ID: this.creatorId
              }) // 存选中的节点
              if (this.childCreatorList !== null && this.childCreatorList.length > 0) {
                this.scriptTypes.push(this.creatorId + '') // 如果有子节点存储当前id为父节点
                this.showSaveBtn = false
              } else { // 没有子节点
                this.getTree()
                this.showSaveBtn = true
                if (this.creatorId === '17' || this.creatorId === 17) {
                  this.showTestBtn = true
                }
              }
            }
          }).catch(response => {
            this.$message.error('数据加载失败!')
          })
        }
      },
      // 点击的时候赋值
      radioCheckChange (id, name) {
        this.creatorId = id
        this.stepTitle = name
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
      saveMeasure () {
        var paramStr
        let url = ''
        if (this.scriptId === null || this.scriptId === undefined || this.scriptId === '') {
          url = '/apm/addTwoDimensionScriptByCreator'
        } else {
          url = '/apm/updateTwoDimensionScriptByCreator'
        }
        if (this.creatorId === 8 || this.creatorId === '8') {
          paramStr = this.$qs.stringify({
            twoDimensionScriptId: this.scriptId,
            name: this.formLabelAlign.twoDimensionName,
            description: this.formLabelAlign.twoDimensionDescription,
            creatorId: this.creatorId,
            type: this.scriptType,
            json: '{"TIMEPOINT_START": "' + this.formData.timePointOne + '", "TIMEPOINT_END": "' + this.formData.timePointTwo + '"}',
            steps: '{"arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "description": "' + this.formLabelAlign.twoDimensionDescription + '", "stepTitle": "' + this.stepTitle + '", "timepoint1": "' + this.formData.timePointOne + '", "timepoint2": "' + this.formData.timePointTwo + '"}'
          })
        } else if (this.creatorId === 17 || this.creatorId === '17') {
          var editorContent = this.$refs.iframe.contentWindow.editor.getValue()
          var paramObj = {
            name: this.formLabelAlign.twoDimensionName, // 名称
            twoDimensionContent: editorContent, // 编辑器内容
            type: this.scriptType,
            creatorId: this.creatorId,
            twoDimensionScriptId: this.scriptId,
            json: editorContent,
            steps: '{"arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "activeName": "' + this.activeName + '", "creatorId": "' + this.creatorId + '", "description": "' + this.formLabelAlign.twoDimensionDescription + '", "stepTitle": "' + this.stepTitle + '"}',
            twoDimensionDescription: this.formLabelAlign.twoDimensionDescription // 注释
          }
          paramStr = this.$qs.stringify(paramObj)
        }
        this.$axios.post(url, paramStr,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
          var dataRes = response.data
          if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (dataRes.status === '0') {
            this.$message({
              message: dataRes.message,
              type: 'success'
            })
          } else {
            this.$message.error(dataRes.message)
          }
        }).catch(response => {
          this.$message.error('保存失败!')
        })
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
      // 测试二参数数脚本
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

<style scoped>
.tab_file_new {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 78vh;
  width: 100%;
}
/* 左侧 */
.param-two-left {
  width: 22.5%;
  padding-top: 10px;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  float: left;
}
.param-two-center{
  width: 52%;
  padding: 10px 10px;
  float: left;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
}
.param-two-right {
  float: left;
  width: 23%;
}
.input_text {
  width: 65%;
  float: left;
}
/*.label_text {*/
/*  width: 25%;*/
/*  height: 32px;*/
/*  line-height: 32px;*/
/*  text-align: right;*/
/*  float: left;*/
/*}*/
.my-row {
  clear: both;
  width: 100%;
  height: 20px;
}
.left_tree {
  height: -webkit-fill-available;
  cursor: pointer;
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
  /* align-items: center; */
  /* border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5; */
  height: 40px;
  /* margin-bottom: 16px; */
  padding: 0px 10px;
}
.main_attr_detail {
  margin-top: 10px;
  display: grid;
  grid-row-gap: 20px;
}
.tab-profile{
  width: 100%;
}
.left_tree::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

.left_tree::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cccccc;
}

.main_attr_detail {
  margin-top: 10px;
  display: grid;
  grid-row-gap: 10px;
}
.detail_div {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 93%
}

.label_name {
  width: 65px;
  height: 32px;
  line-height: 32px;
  text-align: right;
}

.label_text {
  width: 75%;
}
.main_save {
  margin-top: 70%;
  margin-right: 10px;
  float: right;
  display: flex;
  flex-direction: row;
}
.template {
  width: 100%;height: 150px
}
.template-content {
  width: 86%;float: left;
}
.template-title {
  width: 14%;float: left;padding-top: 3px;
}
.template-img {
  width: 60%;cursor: pointer; border: solid 1px white;
}
.template-img-active {
  width: 60%;cursor: pointer;border: solid 1px #253B63
}
</style>
<template>
  <!-- 编辑分析参数库 -->
  <div>
    <eventDefinitionLevel  v-if="showDefinition" ref="eventDefinitionLevelRef" :profileId="profileId"></eventDefinitionLevel>
    <div  class="tab_file_new" v-else>
      <!-- 左侧元素 -->
      <div class="param-two-left cm_tab_file_new_left" >
        <!-- 过滤节点 -->
        <div class="left_filter" v-show="searchShow">
          <el-input placeholder="请输入关键字搜索" v-model="filterMainText" size="small" @keyup.enter.native="filterTree('main')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('main')" style="font-size:20px;height:0px;"></i>
          </el-input>
        </div>
        <div class="left_tree df-f1" v-loading="treeLoading">
          <el-tree :data="fileNewTreeArr" node-key="ID" :props="defaultTreeProps" highlight-current
                   draggable
                   :current-node-key="currentNode"
                   :default-expanded-keys="expandedKeys"
                   @node-click="handleNodeClick"
                   ref="tree" :filter-node-method="filterNode"
                   :render-content="renderContent"
                   @node-drag-end="handleDragEnd">
          </el-tree>
        </div>
      </div>
      <div class="param-two-center cm_param-two-center">
        <!--绑定算法界面 saveReturnTwoDimensionId 保存之后返回的ID-->
        <EventBinding v-if="isShow" ref="bindingRef" :paramDetail="paramDetailData" :profileCatalogId1="profileCatalogId" :paramManagerObj="paramManager" :twoDimensionParamId1="twoDimensionParamId" :scriptType1bd="scriptType" :twoDimensionNamebd="paramDetailData.twoDimensionName" :currentUser="currentUser" :linkparam="isLinkParam"></EventBinding>
      </div>
      <div class="param-two-right cm_param-two-right">
        <div  v-if="isShow" style="height:100%">
          <el-tabs v-model="profileActiveName"  class="tab-profile">
            <el-tab-pane label="属性" name="sencond">
              <div>
                <div class="main_attr_detail">
                  <div class="detail_param_no detail_div">
                    <div class="label_name">名称：</div>
                    <div class="label_text">
                      <el-input v-if="currentUser && !isLinkParam"
                                placeholder="名称" size="small"
                                v-model="paramDetailData.twoDimensionName">
                      </el-input>
                      <el-input
                        v-else
                        readonly="readonly"
                        placeholder="名称"
                        v-model="paramDetailData.twoDimensionName">
                      </el-input>
                    </div>
                  </div>
                  <div class="detail_name detail_div">
                    <div class="label_name">描述：</div>
                    <div class="label_text">
                      <el-input
                        v-if="currentUser && !isLinkParam"
                        size="small"
                        type="textarea"
                        placeholder="描述"
                        v-model="paramDetailData.twoDimensionDescription">
                      </el-input>
                      <el-input
                        v-else
                        readonly="readonly"
                        size="small"
                        type="textarea"
                        placeholder="描述"
                        v-model="paramDetailData.twoDimensionDescription">
                      </el-input>
                    </div>
                  </div>
                  <!--            <div class="detail_chinese_name detail_div">-->
                  <!--              <div class="label_name">-->
                  <!--                是否链接：-->
                  <!--              </div>-->
                  <!--              <div class="label_text">-->
                  <!--                <span v-if="paramDetailData.linkDimensionId" size="small"  style="line-height: 32px;">-->
                  <!--                  是-->
                  <!--                </span>-->
                  <!--                <span v-else  size="small"  style="line-height: 32px;">否</span>-->
                  <!--              </div>-->
                  <!--            </div>-->
                  <div class="detail_div">
                    <div class="label_name">
                      是否分享：
                    </div>
                    <div class="label_text radio_attr">
                <span v-if="paramDetailData.isShare === '1'"  size="small" style="line-height: 32px;">
                  已分享
                </span>
                      <span v-else  size="small"  style="line-height: 32px;">未分享</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-button size="mini" style="float: right;margin-right:25px;width:90px;height:34px;margin-top:13px" type="primary" v-if="currentUser && !isLinkParam && isShow" @click="editTwodimensional">保存</el-button>
        </div>
      </div>
    </div>
    <div>
      <!-- 分析参数的弹框-->
      <el-dialog
        :title="createEventTitle"
        :visible.sync="TimePointdialogVisible"
        width="30%">
        <span>
          <el-form  label-width="80px" :model="formLabelAlign" size="small" v-loading="fmLoadding">
          <el-form-item label="名称：">
              <el-input v-model="formLabelAlign.name"
                        maxlength="50"></el-input>
          </el-form-item>
            <el-form-item label="描述：">
               <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
        </el-form-item>
            <!--        <el-form-item >-->
            <!--        <el-checkbox v-model="checkBoxValue">复制已有分析参数</el-checkbox>-->
            <!--        </el-form-item>-->
        </el-form>
    </span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" saveAddTwoDimension" v-show="checkBoxValue === false" size="mini" >保 存</el-button>
          <!--        <el-button type="primary" @click=" checkEvent" v-show="checkBoxValue === true" size="small" >下一步</el-button>-->
    </span>
      </el-dialog>
      <!--链接的弹框lock-scroll="false"-->
      <el-dialog
        :title="linkTitle"
        :visible.sync="linkIsAble"
        width="60%;">
        <div style="height: 300px;">
          <div style="width: 40%;float: left;">
            <div class="left_filter" v-show="searchShow">
              <el-input placeholder="请输入关键字搜索" v-model="filterText" @keyup.enter.native="filterTree('treeKey')" size="small">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
              </el-input>
            </div>
            <el-tree v-loading="link_treeLoading"
                     :element-loading-text="loadingText"
                     :data="moDalFileNewTreeArr" node-key="id" :props="defaultTreeProps" highlight-current
                     @node-click="LinkhandleNodeClick"
                     :filter-node-method="filterNode" style="height: 320px;overflow-x: hidden"
                     :render-content="renderContentNoMore">
            </el-tree>
          </div>
          <div style="width: 40%;float: right;">
            输入分析函数名：
            <el-input v-model="linkName" placeholder="输入分析函数名" size="small"></el-input>
          </div>
        </div>
        <div class="my-row" style="float: left;width: 100%;">{{linkDescription}}</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="okClick" >确  定</el-button>
        </div>
      </el-dialog>
      <!--复制弹框-->
      <el-dialog
        title="请选择"
        :visible.sync="copyAble"
        width="30%">
        <div         element-loading-text="正在复制..."
                     v-loading="copyLoadding">
          <div class="left_filter" v-show="searchShow">
            <el-input placeholder="请输入关键字搜索" v-model="filterText" @keyup.enter.native="filterTree('treeKey')" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
            </el-input>
          </div>
          <el-tree v-loading="link_treeLoading" :data="moDalFileNewTreeArr" node-key="id" :props="defaultTreeProps" highlight-current
                   :element-loading-text="loadingText"
                   @node-click="copyhandleNodeClick"
                   :render-content="renderContentNoMore"
                   ref="tree1" :filter-node-method="filterNode" style="height: 320px;overflow-x: hidden">
          </el-tree>
          <div class="my-row">
            <span style="float: left">{{copyDescription}}</span>
          </div>
          <div class="my-row">
            <span slot="footer" class="dialog-footer" style="float: right;">
            <el-button type="primary" @click="copyClick()" v-show="showCopybutton" size="small" >复 制</el-button>
           </span>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="block">
      <!-- 计算方式弹框lock-scroll="false" -->
      <el-dialog title="开始计算" :visible.sync="computeShow">
        <div style="height: 150px;">
          <div class="first" style="float:left;width:100%;margin-bottom:10px;">
            <div style="float:left;width:75px;height:32px;line-height:32px;margin-left:80px;">航班时间：</div>
            <div style="float:left;width:350px;">
              <el-date-picker v-model="computeDate" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </div>
          <div class="second" style="float:left;margin-bottom:30px;">
            <div style="float:left;width:75px;height:32px;line-height:32px;margin-left:80px;">版本库：</div>
            <div style="float:left;width:350px;">
              <el-select v-model="value5" size="small" multiple placeholder="请选择" style="width:350px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="float:left;margin-left:85%;">
            <el-button type="primary" @click="computeClick" >确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import CustomTree from 'components/base/CustomTree'
import EventEditTree from 'components/event/EventEditTree'
import EventBinding from 'components/event/EventBinding'
import eventDefinitionLevel from 'components/event/child/EventDefinitionLevel'

export default {
  data () {
    return {
      templateImg1: 'template-img', // 选中 template-img-active
      templateImg2: 'template-img',
      templateImg3: 'template-img',
      templateImg4: 'template-img',
      headerRowStyle: {
        'color': '#2A436F',
        'font-size': '10px',
        'line-height': '16px',
        'height': '30px',
        'background': '#F9F9F9'
      },
      moban1: [{level: '低级'}, {level: '中级'}, {level: '高级'}],
      moban2: [{level: '一级'}, {level: '二级'}, {level: '三级'}],
      moban3: [{level: 'A'}, {level: 'B'}, {level: 'C'}],
      moban4: [{level: ''}, {level: ''}, {level: ''}],
      showDefinition: false,
      hashBind: false,
      paramManager: '',
      gobackPage: '',
      isLinkParam: false,
      currentUser: false,
      hasBind: false,
      expandedKeys: [], // 默认要展开的keys
      options: [],
      value5: [],
      treeRootName: '',
      linkDescription: '',
      copyDescription: '',
      showTitp: false,
      checkBoxValue: false, // true 表示跳转到复制页面  false 表示跳转到新建界面
      profileTwoDimensionId: 0, // 分析参数的id，保存成功之后赋值 以上为弹框的数据
      twoDimensionParamId: '322132312', // 分析参数ID
      linkTitle: '选择链接',
      linkIsAble: false,
      copyAble: false,
      showCopybutton: false,
      createEventTitle: '新建事件',
      isShow: false,
      scriptType: 5, // 0筛选方式 1时间点 3度量值 4测量值 5事件
      TimePointdialogVisible: false, // 是否显示弹框
      fmLoadding: false,
      formLabelAlign: {
        name: '', // 新增分析参数的名称描述，绑定关系处显示
        desc: '',
        twoDimensionName: '', // 分析参数算法库的名称
        twoDimensionDescription: ''
      },
      profileCatalogId: '', // 父节点ID
      nowCatalogData: {},
      noWCatalogNode: {},
      treeLoading: false,
      link_treeLoading: false,
      copyLoadding: false,
      loadingText: '加载中...',
      currentNode: '',
      fileNewTreeArr: [], // 左侧树状数据
      isAddTreeNode: false, // 当前节点编辑状态
      moDalFileNewTreeArr: [], // 左侧树状数据
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      iconMoreShow: false, // 自定义节点图标
      iconOtherShow: false, // 自定义节点图标
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      filterMainText: '', // 主搜索框内容
      filterText: '',
      linkName: '',
      linkId: '',
      copyId: '',
      profileActiveName: 'sencond', // 选中tab的name
      tableLoading: false,
      paramDetailData: {}, // 点击profile的对象
      hideMenuObj: {}, // 隐藏的
      disabledMenuObj: {}, // 禁用的按钮
      profileId: '', // EventManager 页面的 参数库的IDprofileId
      menueList: {
        '1': 'Event_edit_timePoint',
        '3': 'Event_edit_measureValue',
        '4': 'Event_edit_logicalValue'
      },
      menueCnameMap: {
        'Event_edit_timePoint': '时间点',
        'Event_edit_measureValue': '测量值',
        'Event_edit_logicalValue': '逻辑值'
      },
      scriptTypeMap: {
        '5': '事件'
      },
      isSearch: false,
      TwoMenue: {},
      type: '', // 复制 界面用 0筛选方式 1时间点 3度量值 4测量值 5事件
      btnFlag: '', // 保存事件标识默认值
      computeShow: false,
      computeDate: '',
      dateTimeArr: [],
      startNode: '', // 开始被拖动节点的根节点
      currentEditNodeName: '' // 当前正在编辑的节点名字
    }
  },
  props: ['paramManagerObj', 'isCurrentUser', 'goback', 'scriptType1', 'backProfileCatalogId', 'backnowCatalogData', 'backnoWCatalogNode', 'saveReturnTwoDimensionId1', 'twoDimensionNamebd'],
  components: {
    EventBinding,
    eventDefinitionLevel
  },
  watch: {
    saveReturnTwoDimensionId (newData, oldData) {
      console.log(newData, oldData)
    },
    filterMainText (val) {
      // 搜索框为空
      if (!this.$util.isDefine(val)) {
        this.isSearch = true
        this.isShow = false
        this.getTree()
      }
    },
    filterText (val) {
      // 搜索框为空
      if (!this.$util.isDefine(val)) {
        this.getModalTree()
      }
    },
    seniorRadio (val) {
      if (val) {
        this.mappedText = ''
      }
    },
    currentPage (val) {
      this.currentChangeClick(val)
    },
    computeDate (val) {
      this.dateTimeArr = []
      for (var b in val) {
        var year = val[b].getFullYear()
        var month = (val[b].getMonth() + 1).toString()
        var day = (val[b].getDate()).toString()
        if (month.length === 1) {
          month = '0' + month
        }
        if (day.length === 1) {
          day = '0' + day
        }
        var temp = year + '-' + month + '-' + day
        this.dateTimeArr.push(temp)
      }
    }
  },
  created () {
    if (this.twoDimensionParamId) {
      this.currentNode = this.twoDimensionParamId
    } else if (this.saveReturnTwoDimensionId1) {
      this.currentNode = this.saveReturnTwoDimensionId1
    } else {
      this.currentNode = this.paramManagerObj.ID
    }
  },
  mounted () {
    this.currentUser = this.isCurrentUser
    this.paramManager = this.paramManagerObj
    this.gobackPage = this.goback
    if (this.goback) {
      this.isShow = true // 显示左边的信息
      this.twoDimensionParamId = this.saveReturnTwoDimensionId1
      this.paramDetailData.twoDimensionName = this.twoDimensionNamebd
      this.profileCatalogId = this.backProfileCatalogId
      this.nowCatalogData = this.backnowCatalogData
      this.noWCatalogNode = this.backnoWCatalogNode
      this.getTree(this.saveReturnTwoDimensionId1)
      // this.getTwoDimenSiionDetailById(this.twoDimensionParamId)
    }
    // // 获取parentId
    // this.$bus.$on('EventAddTab', (obj) => {
    //   if (obj.enName === 'Event_edit_timePoint') {
    //     this.TimePointdialogVisible = true // 显示时间点弹框
    //   }
    // })
    this.getRepository()
    this.$bus.$off('EventEditEmit') // 移除自定义事件监听器。
    this.$bus.$off('emithashBind') // 移除自定义事件监听器。
    this.$bus.$off('saveTempEmit') // 移除自定义事件监听器。
    this.$bus.$on('saveTempEmit', (v) => { // 保存自定义模板
      this.saveLevelTemp(v)
    })
    this.$bus.$on('emithashBind', (v) => { // 点击二级菜单触发事件
      this.hashBind = v
      this.getChildrenMenue()
    })
    this.$bus.$on('EventEditEmit', (enName) => { // 点击二级菜单触发事件
      if (enName === 'event_definition_level') {
        this.showDefinition = true
      } else if (enName === 'event_delete_event') { // 删除事件
        this.deleteTwoParam()
      } else {
        this.openTwoMenu(this.nowCatalogData, this.noWCatalogNode, enName)
      }
    })
    // 点击二级菜单，需要回调子组件的方法
    this.$bus.$on('EventTableFileEditValue', (type) => {
      this.openTwoMenu(this.nowCatalogData, this.noWCatalogNode, type)
    })
    this.$nextTick(() => {
      console.log(this.saveReturnTwoDimensionId1)
      this.getTree(this.saveReturnTwoDimensionId1)
      this.getProfileEventLevel()
      // // 获取菜单 分析参数算法用的
      // this.$axios.get('/apm/getChildCreator', {params: {id: '-1'}}).then(response => {
      //   var data = response.data
      //   if (data.status !== null && data.status !== '' && data.status === 'E1001') {
      //     this.$bus.$emit('logBackInHandle', response.data)
      //   } else {
      //     for (var i = 0; i < data.length; i++) {
      //       this.TwoMenue[this.menueList[data[i].ID]] = true
      //     }
      //   }
      // }).catch(response => {
      // })
      // this.getRepository()
    })
  },
  methods: {
    getProfileEventLevel () {
      if (this.currentUser) {
        this.$axios.get('/apm/getProfileEventLevel', {params: {id: this.profileId}}).then(response => {
          let data = response.data
          if (!data || data.length === 0) { // 如果等级模板不存在
            console.log(23145)
            this.showDefinition = true
          } else { // 存在等级模板
            this.showDefinition = false
          }
        }).catch(response => {
        })
      }
    },
    // 生成默认等级模板
    saveTemp () {
      let tableData = [{level: '低级'}, {level: '中级'}, {level: '高级'}]
      var paramObj = {
      }
      for (let i = 0; i < tableData.length; i++) {
        paramObj[i] = tableData[i]['level']
      }
      let url = '/apm/updateProfileEventLevel?id=' + this.profileId // apm/updateProfileEventLevel
      this.$axios.post(url, paramObj, {headers: { 'Content-type': 'application/json;charset=UTF-8' }}).then((response) => {
      }).catch(response => {
      })
    },
    // 保存等级模板
    saveLevelTemp (tableData) {
      let map = {}
      let paramObj = {}
      let isNull = false
      let isSame = false
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i]['level'] === undefined || tableData[i]['level'] === '') {
          isNull = true
          break
        }
        if (map[tableData[i]['level']]) {
          isSame = true
          break
        }
        map[tableData[i]['level']] = tableData[i]['level']
        paramObj[i] = tableData[i]['level']
      }
      if (isNull) {
        this.$message.error('等级不能为空！')
      } else if (isSame) {
        this.$message.error('等级不能重复！')
      } else {
        let url = '/apm/updateProfileEventLevel?id=' + this.profileId // apm/updateProfileEventLevel
        // var paramStr = this.$qs.stringify(paramObj)
        this.$axios.post(url, paramObj, {headers: { 'Content-type': 'application/json;charset=UTF-8' }}).then((response) => {
          var data = response.data
          if (data.status === '0') {
            this.$message({
              message: data.message,
              type: 'success'
            })
            this.showDefinition = false
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$message.error('数据保存失败')
        })
      }
    },
    // 模板默认是没有选中的
    getdefaultTemplateImg () {
      this.templateImg1 = 'template-img'
      this.templateImg2 = 'template-img'
      this.templateImg3 = 'template-img'
      this.templateImg4 = 'template-img'
    },
    // 开始计算
    computeClick () {
      console.log('输出开始日期：' + this.dateTimeArr[0])
      console.log('输出结束日期：' + this.dateTimeArr[1])
      console.log('输出版本库：' + this.value5.join(','))
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      var param = {twoDimensionId: this.paramDetailData.id, startDate: this.dateTimeArr[0], endDate: this.dateTimeArr[1], modelIds: this.value5.join(',')}
      this.$axios.get('/apm/reCalculateEvent', {params: param}).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data.status === '0') {
          this.$message({
            message: '数据保存成功',
            type: 'success'
          })
          this.computeShow = false
          this.options = []
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    // 版本库数据
    getRepository () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getEnableModels').then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        this.options = []
        if (data.length > 0) {
          for (var a = 0; a < data.length; a++) {
            this.options.push({
              value: data[a].ID,
              label: data[a].ID
            })
          }
        } else {
          this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    },
    tipsClick () {
      if (this.showTitp) {
        this.showTitp = false
      } else {
        this.showTitp = true
      }
    },
    // 初始化树
    getTree (pId) {
      this.profileId = this.paramManager.ID
      this.treeLoading = true
      this.$axios.get('/apm/getEventProfileCatalog', {params: {parentId: this.profileId, searchContent: this.filterMainText}}).then(response => {
        this.treeLoading = false
        this.fileNewTreeArr = []
        this.expandedKeys = []
        var data = response.data
        this.fileNewTreeArr = data.data
        if (data) {
          this.scriptType = 5
          let hideMenuObj = {}
          let disabledMenuObj = {}
          this.paramDetailData = [] // 点击父节点清空
          this.nowCatalogData = this.fileNewTreeArr[0]
          this.profileCatalogId = this.nowCatalogData['ID'] // 记录父节点ID
          if (this.profileId === this.currentNode) {
            hideMenuObj['profile_event_add'] = true // 显示
            if (!this.currentUser) {
              disabledMenuObj['profile_event_add'] = true // 禁用
            }
            this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', hideMenuObj, disabledMenuObj) // 修改二级菜单
          } else {
            this.getChildrenMenues()
            console.log('123456789101112')
          }
          this.hideMenuObj = hideMenuObj
          this.disabledMenuObj = disabledMenuObj
          console.log(this.profileCatalogId, this.isSearch, data.defaultNode)
          if (this.profileCatalogId && !this.isSearch) { // 保存返回后默认选中当前子节点并展开当前节点
            this.expandedKeys = []
            this.expandedKeys = data.defaultNode
            this.$refs.tree.setCurrentKey(data.defaultNode[0])
            this.$nextTick(() => {
              if (pId) {
                console.log(this.pId)
                this.$refs.tree.setCurrentKey(pId)
                this.getTwoDimenSiionDetailById(pId)
              }
            })
          } else {
            this.expandedKeys = data.defaultNode
          }
          if (this.isSearch) {
            this.isSearch = false
          }
        }
      }).catch(response => {
        // this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    getTreeForSave () {
      this.profileId = this.paramManager.ID
      this.treeLoading = true
      this.$axios.get('/apm/getEventProfileCatalog', {params: {parentId: this.profileId, searchContent: this.filterMainText}}).then(response => {
        this.treeLoading = false
        this.fileNewTreeArr = []
        this.expandedKeys = []
        var data = response.data
        this.fileNewTreeArr = data.data
        if (this.isSearch) {
          this.isSearch = false
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    setSearchExpandKeys (data) {
      if (data[0].TYPE !== 'CATALOG') {
        this.expandedKeys.push(data[0].ID)
      } else {
        this.setSearchExpandKeys(data[0].CHILDREN)
      }
    },
    getModalTree () {
      this.link_treeLoading = true
      this.loadingText = '加载中...'
      this.linkDescription = ''
      this.copyDescription = ''
      this.$axios.get('/apm/getSharedTwoDimensionsByType', {params: {type: this.scriptType, searchContent: this.filterText, profileId: this.profileId}}).then(response => {
        this.moDalFileNewTreeArr = []
        this.link_treeLoading = false
        var data = response.data
        if (data.length > 0) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            // 如果是复制弹框开启，执行完毕之后才显示复制按钮，否则不显示按钮
            if (this.copyAble) {
              // this.filterText = ''
              this.showCopybutton = true
            }
            console.log(data)
            this.moDalFileNewTreeArr = data
          }
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.link_treeLoading = false
      })
    },
    // 自定义子节点内容
    renderContent (h, {node, data, store}) {
      var that = this // 指向vue
      return h(EventEditTree, {
        props: {
          treeRootName: this.treeRootName,
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowMore: this.currentUser, // 是当前用户 显示更多按钮
          isCurrentUser: this.currentUser,
          isShowMoreForNode: this.currentUser, // 是当前用户 子节点是否显示更多按钮
          isShowMoreForCatalog: this.currentUser // 是当前用户 目录是否显示更多按钮
        },
        on: { // 绑定方法 data node store
          openTwoMenuHandle: ((data, node, type) => that.openTwoMenu(data, node, type)),
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node)),
          editTreeNodeHandle: ((data, node, type) => that.editTreeNode(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node))
        }
      })
    },
    // 自定义子节点内容
    renderContentNoMore (h, {node, data, store}) {
      var that = this // 指向vue
      return h(EventEditTree, {
        props: {
          treeRootName: this.treeRootName,
          data: data, //
          node: node, // 当前节点的Node对象
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false// 目录是否显示更多按钮
        },
        on: { // 绑定方法 data node store
          openTwoMenuHandle: ((data, node, type) => that.openTwoMenu(data, node, type)),
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node)),
          editTreeNodeHandle: ((data, node, type) => that.editTreeNode(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node))
        }
      })
    },
    // 点击二级菜单，点击tree更多按钮
    openTwoMenu (data, node, type) {
      this.formLabelAlign.name = ''
      this.formLabelAlign.desc = ''
      this.copyAble = false //默认不显示
      this.TimePointdialogVisible = false
      this.checkBoxValue = false
      // node.expanded = true // 展开节点显示添加的节点信息
      this.profileCatalogId = data.ID
      if (data.NAME) {
        // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
        if (type === 'catalog') { // 新增目录
          node.expanded = true // 展开节点显示添加的节点信息
          // 如果为false则表示可以新增，true不可以新增
          let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
          if (tempFlag) {
            this.$message({
              message: '有节点处于编辑中，请编辑完再添加!',
              type: 'warning'
            })
          } else {
            data.CHILDREN.push({
              ID: this.$util.generateUUID(),
              NAME: null,
              CHILDREN: [],
              status: 1,
              nodeType: type,
              isAdd: true
            })
          }
        } else if (type === 'profile_event_add') { // 显示事件弹框
          this.scriptType = 5
          this.createEventTitle = '新建事件'
          this.TimePointdialogVisible = true
        } else if (type === 'event_delete_event') { // 删除事件
          this.twoDimensionParamId = data.ID
          this.deleteTwoParam()
        } else if (type === 'eventLibrary_jisuan_event') { // 开始计算
          this.computeDate = ''
          this.value5 = []
          this.computeShow = true
        } else if (type === 'eventLibrary_share_event' || type === 'eventLibrary_share_event_cancle') { // 分享
          this.changeOperAtion()
        } else if (type === 'Event_algorithmsLibrary_new_remove') { // 清空映射关系，发送到子组件处理
          this.$bus.$emit('Event_algorithmsLibrary_new_remove_emit')
        }
      }
    },
    // 删除目录
    deleteProfileCatalog (data, node) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/apm/deleteProfileCatalog', {params: {id: data.ID}}).then(response => {
          let respData = response.data
          if (respData.status === '0') { // 成功
            this.$message({
              type: 'success',
              message: respData.message
            })
            let parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
            parentNode.CHILDREN.forEach((v, i) => {
              if (v.ID === data.ID) {
                parentNode.CHILDREN.splice(i, 1)
              }
            })
          } else if (respData.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(respData.message)
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.tableLoading = false
        })
      }).catch(() => {
      })
    },
    deleteTwoParam () {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var paramStr = this.$qs.stringify({
          twoDimensionId: this.twoDimensionParamId
        })
        this.$store.commit('SHOW_LOADING', '正在删除') // 打开加载提示框
        this.$axios.post('/apm/deleteEvent', paramStr, {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '正在删除') // 打开加载提示框
          var data = response.data
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (data.status === '0') {
            this.$message({
              message: data.message,
              type: 'success'
            })
            this.isShow = false
            this.getTree()
          } else {
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '正在删除') // 打开加载提示框
        })
      }).catch(() => {
        this.$store.commit('HIDE_LOADING', '正在删除') // 打开加载提示框
      })
    },
    // 新建分析参数/绑定页面
    editTreeNode (data, node, type) {
      // 如果为false则表示可以新增，true不可以新增
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
      } else {
        if (!data['CHILDREN'] && data.NAME !== null) { // 节点事件
          this.isLinkParam = false
          if (data.LINK_DIMENSION_ID) {
            this.isLinkParam = true
          }
          if (type === 'Event_edit') { // 编辑子节点
            this.currentEditNodeName = data.NAME // 取消编辑时用
            this.$set(data, 'status', 1)
            this.$set(data, 'isAdd', false)
            console.log('editNodeFun', data, node)
          } else {
            console.log('nothing')
          }
        }
      }
    },
    addNodeFun (data, node, type) {
      // 如果为false则表示可以新增，true不可以新增
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
      } else {
        node.expanded = true // 展开节点显示添加的节点信息
        if (data.NAME) {
          // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
          if (type === 'catalog') { // 新增目录
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, CHILDREN: [], status: 1, nodeType: type, isAdd: true})
          } else {
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
          }
        }
      }
    },
    // 保存节点内容，且是处于编辑中
    saveNodeFun (data, node) {
      let reg = /\s/
      if (reg.test(data.NAME)) {
        this.$message({
          message: '不能包含空格，请重新输入',
          type: 'warning'
        })
      } else {
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode // 递归查找父节点
        if (data.isAdd) { // 新增节点
          this.addTreeData(data, parentNode)
        } else { // 编辑节点
          // 请输入节点内容，此else不能删除
          this.editTwodimensional(data, node)
        }
      }
    },
    traverseTreeNode (node) { // 递归遍历树节点
      for (var i = 0; i < node.length; i++) {
        if (this.node) { // 整个树节点信息不存在
          break
        }

        var nodeObj = node[i]
        if (!nodeObj || !nodeObj.ID) {
          continue
        }
        if (nodeObj.status && nodeObj.status === 1) {
          this.isAddTreeNode = true
          break
        } else {
          if (nodeObj.CHILDREN && nodeObj.CHILDREN.length > 0) {
            this.traverseTreeNode(nodeObj.CHILDREN)
          } else {
            continue
          }
        }
      }
      return this.isAddTreeNode
    },
    // 保存新增节点
    addTreeData (data, parentNode) {
      this.isSearch = true // 新增后，显示默认的node
      var url = ''
      var paramStr = {}
      if (data.nodeType === 'catalog') {
        url = '/apm/addEventProfileCatalog'
        paramStr = {parentId: parentNode.ID, name: data.NAME}
      } else {
        // TODO 此处是一个弹框
        /* url = '/apm/addTwoDimension'
          paramStr = {twoDimensionName: data.NAME, profileCatalogId: parentNode.ID, twoDimensionContent: 'script', twoDimensionType: '0'}
        */
      }
      this.$axios.get(url, {params: paramStr}).then(response => {
        var resData = response.data
        if (resData.status === '0' || resData.status === 0) {
          this.$message({
            message: resData.message,
            type: 'success'
          })
          // // 保存节点到页面
          // var childData = parentNode.CHILDREN
          // for (var i = 0; i < childData.length; i++) {
          //   if (childData[i].ID === data.ID) {
          //     data.status = 0
          //     parentNode.CHILDREN.splice(i, 1, data)
          //   }
          // }
          let hideMenuObj = {}
          let disabledMenuObj = {}
          hideMenuObj['paramEvent_eventLibrary_add_catalog2'] = false
          hideMenuObj['Event_edit_link'] = false
          hideMenuObj['Event_del_catalog'] = false
          this.hideMenuObj = hideMenuObj
          this.disabledMenuObj = disabledMenuObj
          this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', hideMenuObj, disabledMenuObj) // 修改二级菜单
          this.isAddTreeNode = false
          // 重加载树
          this.getTree()
          // 加载新增节点的id
          // this.$axios.get('/apm/getEventProfileCatalog', {params: {parentId: parentNode.ID}}).then(response => {
          //   var resData = response.data
          //   if (resData.length > 0) {
          //     parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
          //     parentNode.CHILDREN = resData
          //   }
          // }).catch(response => {
          //   this.$message.error('数据加载失败!')
          // })
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(resData.message)
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
      })
    },
    editTwodimensional () {
      if (!this.paramDetailData.twoDimensionName) {
        this.$message.error({message: '分析参数名称不能为空'})
      } else {
        var paramStr = this.$qs.stringify({
          id: this.twoDimensionParamId,
          twoDimensionName: this.paramDetailData.twoDimensionName,
          twoDimensionDescription: this.paramDetailData.twoDimensionDescription
        })
        // this.isSearch = true // 新增后，显示默认的node
        this.$store.commit('SHOW_LOADING', '正在保存') // 打开加载提示框
        this.$axios.post('/apm/updateEvent', paramStr, {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '正在保存') // 打开加载提示框
          var resPdata = response.data
          if (resPdata.status !== null && resPdata.status !== '' && resPdata.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (resPdata.status === '0') {
            this.$message({
              type: 'success',
              message: resPdata.message
            })
            // 修改页面中tree数据
            this.$set(this.paramDetailData, 'status', 0)
            this.$set(this.paramDetailData, 'isAdd', false)
            this.isAddTreeNode = false
            // this.getTwoDimenSiionDetailById(this.twoDimensionParamId)
            console.log(this.twoDimensionParamId)
            this.getTree(this.twoDimensionParamId)
          } else {
            this.$message.error({
              message: resPdata.message
            })
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '正在保存') // 打开加载提示框
          this.$message.error({message: '保存失败，服务器异常'})
        })
      }
    },
    // 取消处于编辑中的新增节点
    cancelNodeFun (data, node) {
      if (data.isAdd) { // 新增
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
        parentNode.CHILDREN.forEach((v, i) => {
          if (v.ID === data.ID) {
            parentNode.CHILDREN.splice(i, 1)
          }
        })
      } else { // 编辑
        data.NAME = this.currentEditNodeName
        this.$set(data, 'status', 0)
        this.currentEditNodeName = '' // 清空旧数据
      }
      this.isAddTreeNode = false
    },
    // 树节点过滤图标
    filterTree (flag) {
      if (flag === 'main') {
        this.fileNewTreeArr = []
        this.isSearch = true
        this.isShow = false
        this.getTree()
      } else if (flag === 'treeKey') {
        this.moDalFileNewTreeArr = []
        this.getModalTree()
      }
    },
    refreshCopy () {
      this.filterText = ''
      this.copyAble = true
      this.getModalTree() // 显示tree
    },
    refreshLink () {
      this.linkIsAble = true
      this.filterText = ''
      this.getModalTree() // 显示tree
    },
    // 刷新事件
    refresh () {
      this.treeLoading = true
      this.getTree()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1 || data.ID.indexOf(value) !== -1
    },
    // 点击子节点击事件 加载中间及右侧数据
    handleNodeClick (data, node, nodeCommpent) {
      console.log(data, node)
      let hideMenuObj = {}
      let disabledMenuObj = {}
      this.twoDimensionParamId = ''
      let isLinkParam = false
      if (data.NAME !== null) {
        if (data['CHILDREN']) { // 点击父节点
          this.isShow = false // 隐藏右边属性区域
          this.paramDetailData = [] // 点击父节点清空
          this.profileCatalogId = data.ID // 记录父节点ID
          // 传值 profileCatalogId
          // 如果是当前用户则显示以下菜单否则不显示
          // 获取编辑里面的菜单
          //this.getEventEditMenue(true)
          //0筛选方式 1时间点 2时间段 3测量值 4逻辑值 5事件
          hideMenuObj['profile_event_add'] = true // 显示
          hideMenuObj['event_definition_level'] = true // 显示
          this.scriptType = 5
          if (!this.currentUser) {
            disabledMenuObj['profile_event_add'] = true // 禁用
            disabledMenuObj['event_definition_level'] = true // 禁用
          }
          this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', hideMenuObj, disabledMenuObj) // 修改二级菜单
        } else { // 点击子节点查询详情，并显示对应菜单
          this.scriptType = data.TYPE
          this.profileCatalogId = data.PARENT_ID
          this.twoDimensionParamId = data.ID
          // 获取子节点的菜单信息
          this.getTwoDimenSiionDetailById(data.ID)
        }
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.noWCatalogNode = node
      this.nowCatalogData = data
      this.$bus.$emit('EventlinkOrCurrentUser', {isCurrentUser: this.currentUser, isLinkParam: isLinkParam}) // 传值过去，然后点击二级菜单，触发对应的事件要用到
      this.$bus.$emit('emitTreeData', {noWCatalogNode: this.noWCatalogNode, nowCatalogData: this.nowCatalogData}) // 传值过去，然后点击二级菜单，触发对应的事件要用到
      // this.$bus.$emit('EventParamLibrayAddCatalog1Vaue', data, node) // 传值过去，然后点击二级菜单，触发对应的事件要用到
    },
    // 获取子节点的信息，以及对应菜单信息
    getChildrenMenue () {
      console.log(123)
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj['profile_event_definition'] = true // 显示
      hideMenuObj['event_delete_event'] = true // 显示
      hideMenuObj['eventLibrary_jisuan_event'] = true // 显示
      hideMenuObj['event_clear_suanfa'] = true // 显示
      if (this.paramDetailData.isShare === '1') {
        hideMenuObj['eventLibrary_share_event_cancle'] = true // 取消分享按钮
      } else {
        hideMenuObj['eventLibrary_share_event'] = true // 分享按钮
      }
      if (!this.hashBind) {
        disabledMenuObj['event_clear_suanfa'] = true // 禁用清空算法
      } else {
        disabledMenuObj['event_clear_suanfa'] = false // 禁用清空算法
      }
      // 判断是否有权限，没权限按钮全部禁用
      if (!this.isCurrentUser || this.isLinkParam) {
        disabledMenuObj['profile_event_definition'] = true
        disabledMenuObj['event_delete_event'] = true
        disabledMenuObj['eventLibrary_jisuan_event'] = true
        disabledMenuObj['event_clear_suanfa'] = true
        disabledMenuObj['eventLibrary_share_event'] = true
        disabledMenuObj['eventLibrary_share_event_cancle'] = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', hideMenuObj, disabledMenuObj) // 修改二级菜单
    },
    getChildrenMenues () {
      console.log(123)
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj['profile_event_definition'] = false // 显示
      hideMenuObj['event_delete_event'] = false // 显示
      hideMenuObj['eventLibrary_jisuan_event'] = false // 显示
      hideMenuObj['event_clear_suanfa'] = false // 显示
      if (this.paramDetailData.isShare === '1') {
        hideMenuObj['eventLibrary_share_event_cancle'] = true // 取消分享按钮
      } else {
        hideMenuObj['eventLibrary_share_event'] = false // 分享按钮
      }
      if (!this.hashBind) {
        disabledMenuObj['event_clear_suanfa'] = true // 禁用清空算法
      } else {
        disabledMenuObj['event_clear_suanfa'] = false // 禁用清空算法
      }
      // 判断是否有权限，没权限按钮全部禁用
      if (!this.isCurrentUser || this.isLinkParam) {
        disabledMenuObj['profile_event_definition'] = true
        disabledMenuObj['event_delete_event'] = true
        disabledMenuObj['eventLibrary_jisuan_event'] = true
        disabledMenuObj['event_clear_suanfa'] = true
        disabledMenuObj['eventLibrary_share_event'] = true
        disabledMenuObj['eventLibrary_share_event_cancle'] = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', hideMenuObj, disabledMenuObj) // 修改二级菜单
    },
    // 连接点击子节点击事件 加载中间及右侧数据
    LinkhandleNodeClick (data, node, nodeCommpent) {
      this.linkDescription = ''
      if (data.NAME !== null) {
        if (data['CHILDREN']) { // 点击父节点
        } else {
          this.linkName = data.NAME // 选中默认显示
          this.linkId = data.ID // 修改时用
          if (data.TWO_DIMENSION_DESCRIPTION) {
            this.linkDescription = data.TWO_DIMENSION_DESCRIPTION
          } else {
            this.linkDescription = data.NAME
          }
        }
      }
    },
    // 点击复制弹框子节点击事件 加载中间及右侧数据
    copyhandleNodeClick (data, node, nodeCommpent) {
      this.copyDescription = ''
      if (data.NAME !== null) {
        if (data['CHILDREN']) { // 点击父节点
        } else {
          this.copyId = data.ID // 修改时用
          if (data.TWO_DIMENSION_DESCRIPTION) {
            this.copyDescription = data.TWO_DIMENSION_DESCRIPTION
          } else {
            this.copyDescription = data.NAME
          }
        }
      }
    },
    // 获取tree 节点的详情
    getTwoDimenSiionDetailById (id) {
      if (id) {
        this.isShow = true // 显示左边的信息
        this.tableLoading = true
        this.$axios.get('/apm/getTwoDimensionById', {params: {id: id}}).then(response => {
          var data = response.data
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.twoDimensionParamId = id // 记录子节点ID
            this.paramDetailData = data // 记录子节点信息
            this.getChildrenMenue()
            this.tableLoading = false
            if (data.linkDimensionId) {
              this.isLinkParam = true
            } else {
              this.isLinkParam = false
            }
          }
        }).catch(response => {
        })
      }
    },
    // getEventEditMenue (flag) {
    //   this.$axios.get('/apm/getChildCreator', {params: {id: '-1'}}).then(response => {
    //     var disabledMenuTwoObj = {} // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
    //     var data = response.data
    //     if (data.status !== null && data.status !== '' && data.status === 'E1001') {
    //       this.$bus.$emit('logBackInHandle', response.data)
    //     } else {
    //       for (var i = 0; i < data.length; i++) {
    //         disabledMenuTwoObj[this.menueList[data[i].ID]] = flag
    //       }
    //       this.$bus.$emit('openHeaderMenuItem', 'paramEvent_eventLibrary', disabledMenuTwoObj, {}) // 修改头部显示效果
    //     }
    //   }).catch(response => {
    //   })
    // },
    // 加载框
    showLoading () {
      this.$loading({
        lock: true,
        text: 'Loading',
        target: document.querySelector('.param-two-left')
        // spinner: 'el-icon-loading'
        // background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // 点击编辑触发事件
    editNodeFun (data, node, nodecomment) {
    },
    checkEvent () {
      if (this.checkBoxValue === true) {
        this.TimePointdialogVisible = false
        this.filterText = ''
        this.copyAble = true
        this.getModalTree() // 显示tree
      }
    },
    // 保存事件
    saveAddTwoDimension () {
      if (this.fmLoadding) {
        return false
      } else {
        if (this.formLabelAlign.name === null || this.formLabelAlign.name.trim() === '') {
          this.$message.error({message: '名称不能为空'})
        } else {
          let reg = /\s/
          if (reg.test(this.formLabelAlign.name)) {
            this.$message({
              message: '新建的事件名称前后中间都不能包含空格',
              type: 'warning'
            })
          } else {
            this.fmLoadding = true
            // 保存时间点，时间点，逻辑值，度量值数据
            // twoDimensionType: 1 时间点
            var paramStr = this.$qs.stringify({
              twoDimensionName: this.formLabelAlign.name,
              twoDimensionType: this.scriptType,
              profileCatalogId: this.profileCatalogId,
              twoDimensionDescription: this.formLabelAlign.desc
            })
            this.$axios.post('/apm/addEvent', paramStr, {
              headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            }).then(response => {
              // 保存成功隐藏弹框
              this.TimePointdialogVisible = false
              this.fmLoadding = false
              var data = response.data
              if (data.status !== null && data.status !== '' && data.status === 'E1001') {
                this.$bus.$emit('logBackInHandle', response.data)
              } else if (data.status === '0') {
                this.$message({
                  type: 'success',
                  message: data.message
                })
                this.profileTwoDimensionId = data.value
                this.twoDimensionParamId = data.value
                this.$bus.$emit('emitDataToEventSaveAfter', {
                  sourcePage: 'saveAfter', // 表示新建事件后 直接定义事件
                  currentUser: this.currentUser,
                  isLinkParam: this.isLinkParam,
                  scriptType: this.scriptType,
                  profileCatalogId: this.profileCatalogId,
                  paramManagerObj: this.paramManager,
                  twoDimensionParamId: this.twoDimensionParamId,
                  twoDimensionName: this.formLabelAlign.name,
                  bindingLibrary: [],
                  multipleSelection: [] // 新建事件后。直接去定义事件。
                }) // 获取子组件的 所有版本库和选中的版本库
                // 保存完成新开页签进入保存算法界面
                this.$bus.$emit('paramEventAddTab', {enName: 'profile_event_definition_saveAfter', zhName: this.formLabelAlign.name, isClosable: true, parent: 'paramEvent_eventLibrary', count: 0})
                this.formLabelAlign.name = ''
                this.formLabelAlign.desc = ''
                this.getTreeForSave() // 重新加载一下数据
              } else {
                this.$message.error({
                  message: data.message
                })
              }
            }).catch(response => {
              this.fmLoadding = false
            })
          }
        }
      }
    },
    // 被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      if (draggingNode.data.TYPE !== 'CATALOG') {
        if (this.scriptTypeMap[draggingNode.data.TYPE] !== dropNode.data.SUPER_NAME) {
          this.$message.error('只能在本类型的目录下移动')
          this.getTree()
          return false
        }
      }
      if (draggingNode.data.TYPE === 'CATALOG' && draggingNode.data.SUPER_NAME !== dropNode.data.SUPER_NAME) {
        this.$message.error('只能在本类型的目录下移动')
        this.getTree()
        return false
      }
      console.log('tree drag end: ', draggingNode && dropNode.label, dropType)
      this.$axios.get('/apm/changeTwoDiemsnionCatalog', {params: {twoDimensionId: draggingNode.data.ID, catalogId: dropNode.data.ID}}).then(response => {
        let data = response.data
        if (data.status === '0') {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error(data.message)
          this.refresh()
        }
        // var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, draggingNode.data.ID).parentNode // 查找开始的节点的父节点
        // this.reloadNode(draggingNode.data.ID, parentNode) // 重加载开始的父节点
        // this.reloadNode(dropNode.data.ID, dropNode.data) // 重加载最后的节点
        this.refresh()
      }).catch(response => {
        this.refresh()
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('目录切换失败')
      })
    },
    //重加载节点
    // reloadNode (parentId, parentNode) {
    //   this.$axios.get('/apm/getGpTree', {params: {parentId: parentId}}).then(response => {
    //     var resData = response.data
    //     if (resData['status']) {
    //       if (resData.status === 'E1001') {
    //         this.$bus.$emit('logBackInHandle', response.data)
    //       }
    //     }
    //     if (resData.length > 0) {
    //       parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
    //       parentNode.CHILDREN = resData
    //     }
    //   }).catch(response => {
    //     this.$message.error('数据加载失败!')
    //   })
    // },
    // 确认修改名称
    okClick () {
      this.isShow = false // 隐藏右边属性区域
      this.link_treeLoading = true
      this.loadingText = '链接中，请稍后...'
      var paramObj = {
        catalogId: this.profileCatalogId,
        id: this.linkId,
        name: this.linkName
      }
      console.log(paramObj)
      var paramStr = this.$qs.stringify(paramObj)
      this.$axios.post('/apm/linkTwoDimension', paramStr,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
        this.link_treeLoading = false
        var dataRes = response.data
        console.log(dataRes)
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          this.linkIsAble = false // 隐藏
          this.getTree()
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.link_treeLoading = false
        this.$message.error('保存失败!')
      })
    },
    // 复制功能
    copyClick () {
      this.isShow = false // 隐藏右边属性区域
      this.copyLoadding = true
      var params = {
        twoDimensionId: this.copyId,
        catalogId: this.profileCatalogId
      }
      this.$axios.get('/apm/copyTwoDimension', {params: params}).then(response => {
        this.copyLoadding = false
        this.fileNewTreeArr = []
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (data.status === '0') {
          this.$message({
            message: data.message,
            type: 'success'
          })
          this.copyAble = false // 隐藏
        } else {
          this.$message.error(data.message)
        }
        this.getTree()
      }).catch(response => {
        this.copyLoadding = false
        this.copyAble = false // 隐藏
      })
    },
    // 分享或取消分享
    changeOperAtion () {
      if (this.paramDetailData.isShare !== '1') {
        this.$confirm('确定要分享吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/apm/shareTwoDimension', {params: {id: this.twoDimensionParamId}}).then(response => {
            var data = response.data
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else if (data.status === '0') {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.paramDetailData.isShare = '1'
              this.getChildrenMenue()
            } else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {

        })
      } else {
        this.$confirm('确定取消分享？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/apm/unShareTwoDimension', {params: {id: this.twoDimensionParamId}}).then(response => {
            var data = response.data
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else if (data.status === '0') {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.paramDetailData.isShare = '0'
              this.getChildrenMenue()
            } else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {
        })
      }
    }
  }
}
</script>

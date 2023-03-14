<style>
   .tab-profile .el-tabs__nav{
    transform: translate(11px) !important;
  }
   .el-dialog__title {
     font-size: 16px;
   }
</style>
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
  /* .left_tree {
    height: calc(78vh - 40px);
    cursor: pointer;
    overflow: auto;
  } */
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
    width: 95%;
  }

  .label_name {
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: right;
  }

  .label_text {
    width: 70%;
  }
  .main_save {
    margin-top: 70%;
    margin-right: 10px;
    float: right;
    display: flex;
    flex-direction: row;
  }
</style>
<template>
  <!-- 编辑分析参数库 -->
  <div class="tab_file_new">
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
      <ParamTwoBinding v-show="isShow" ref="bindingRef" :paramDetail="paramDetailData" :profileCatalogId1="profileCatalogId" :paramManagerObj="paramManager" :saveReturnTwoDimensionId1bd="twoDimensionParamId" :scriptType1bd="scriptType" :twoDimensionNamebd="paramDetailData.twoDimensionName" :currentUser="currentUser" :linkparam="isLinkParam" :hideMenuObj="hideMenuObj" :disabledMenuObj="disabledMenuObj"></ParamTwoBinding>
    </div>
    <div class="param-two-right cm_param-two-right">
      <el-tabs v-model="profileActiveName"  v-show="isShow"  class="tab-profile">
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
            <div class="detail_chinese_name detail_div">
              <div class="label_name">
                是否链接：
              </div>
              <div class="label_text">
                <span v-if="paramDetailData.linkDimensionId" size="small"  style="line-height: 32px;">
                  是
                </span>
                <span v-else  size="small"  style="line-height: 32px;">否</span>
              </div>
            </div>
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
            <div class="detail_div" v-if="paramDetailData['LINK_PROFILE_ID']">
              <div class="label_name">
                链接自：
              </div>
              <div class="label_text radio_attr">
                <span  size="small" style="line-height: 32px;">
                  {{paramDetailData['LINK_USER_NAME'] }} - {{paramDetailData['LINK_PROFILE_NAME'] }}
                </span>
              </div>
            </div>
            <div class="detail_div" v-if="paramDetailData['beLinkedTwoDimensions'] && paramDetailData['beLinkedTwoDimensions'].length > 0">
              <div class="label_name">
                被链接：
              </div>
              <div class="label_text radio_attr">
                <div  size="small" style="line-height: 32px;" v-for="(item, index) in paramDetailData['beLinkedTwoDimensions']" :key="index">
                  <div style="width: 100%;">
                    {{ item.USER_NAME }} - {{ item.PROFILE_NAME }}
                  </div>
                </div>
              </div>
            </div>
            <div class="detail_div"><div class="label_name">是否配置清洗：</div>
              <div class="label_text radio_attr">
                <span size="small"  style="line-height: 32px;">{{ paramDetailData.etlConfig ? '是' : '否' }}</span>
                <div v-if="paramDetailData.etlConfig">
                  <span v-if="paramDetailData.etlConfig.CATEGORY === 'THRESHOLD'">{{ paramDetailData.etlConfig.CATEGORY_DESC }}，{{ paramDetailData.etlConfig.OPERATE_DESC }}{{ paramDetailData.etlConfig.OPERATE == 'RANGE' ? paramDetailData.etlConfig.VALUE1 + '~' + paramDetailData.etlConfig.VALUE2 : paramDetailData.etlConfig.VALUE1 || paramDetailData.etlConfig.VALUE2 }}</span>
                  <span v-if="paramDetailData.etlConfig.CATEGORY === 'NORMAL DISTRIBUTION'">{{ paramDetailData.etlConfig.CATEGORY_DESC }}，{{ paramDetailData.etlConfig.OPERATE_DESC }}{{ paramDetailData.etlConfig.VALUE1 ? '上限边界值' + paramDetailData.etlConfig.VALUE1 : '' }}{{ paramDetailData.etlConfig.VALUE2 ? '下限边界值' + paramDetailData.etlConfig.VALUE2 : '' }}</span>
                  <span v-if="paramDetailData.etlConfig.CATEGORY === 'STD DEV'">{{ paramDetailData.etlConfig.CATEGORY_DESC }}，{{ paramDetailData.etlConfig.OPERATE_DESC }}{{ paramDetailData.etlConfig.VALUE1 ? '值' + paramDetailData.etlConfig.VALUE1 : '' }}</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button size="mini" style="float: right;margin-right:25px;width:90px;height:34px;margin-top:13px" type="primary" v-if="currentUser && !isLinkParam && isShow" @click="editTwodimensional">保存</el-button>
     </div>
    <div >
      <!-- 分析参数的弹框-->
      <el-dialog
        :title="createParamTwoTitle"
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
            <el-form-item >
            <el-checkbox v-model="checkBoxValue">复制已有分析参数</el-checkbox>
            </el-form-item>
        </el-form>
    </span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" saveAddTwoDimension" v-show="checkBoxValue === false" size="mini" >保 存</el-button>
        <el-button type="primary" @click=" checkParamTwo" v-show="checkBoxValue === true" size="mini" >下一步</el-button>
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
                   ref="tree" :filter-node-method="filterNode" style="height: 320px;overflow-x: hidden">
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
            <div style="float:left;width:75px;height:32px;line-height:32px;margin-left:135px;">航班时间：</div>
            <div style="float:left;width:350px;">
              <el-date-picker v-model="computeDate" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </div>
          <div class="second" style="float:left;margin-bottom:30px;">
            <div style="float:left;width:75px;height:32px;line-height:32px;margin-left:135px;">版本库：</div>
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
      <!-- 数据清洗弹框lock-scroll="false" -->
      <el-dialog  title="清洗规则" :visible.sync="cleanShow" width="45%" center>
            <CleaningRules :cleanShow.sync="cleanShow" v-if="cleanShow" :twoDimensionParamId="twoDimensionParamId" :paramDetailData="paramDetailData" v-on:refreshCleanRule="refreshCleanRule"></CleaningRules>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  // import CustomTree from 'components/base/CustomTree'
  import ParamTwoTree from 'components/paramtwo/ParamTwoTree'
  import ParamTwoBinding from 'components/paramtwo/ParamTwoBinding'
  import CleaningRules from './CleaningRules'

  export default {
    data () {
      return {
        paramManager: '',
        gobackPage: '',
        isLinkParam: false,
        currentUser: false,
        needDisabled: true, // 是否需要禁用，默认禁用
        expandedKeys: [], // 默认要展开的keys
        options: [],
        value5: [],
        treeRootName: '',
        linkDescription: '',
        copyDescription: '',
        showTitp: false,
        checkBoxValue: false, // true 表示跳转到复制页面  false 表示跳转到新建界面
        profileTwoDimensionId: 0, // 分析参数的id，保存成功之后赋值 以上为弹框的数据
        twoDimensionParamId: '', // 分析参数ID
        linkTitle: '选择链接',
        linkIsAble: false,
        copyAble: false,
        showCopybutton: false,
        createParamTwoTitle: '新建时间点分析参数',
        isShow: false,
        scriptType: '', // 0筛选方式 1时间点 3度量值 4测量值 5事件
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
        scriptId: '', // paramTwoManager 页面的 参数库的ID
        menueList: {
          '1': 'paramTwo_edit_timePoint',
          '3': 'paramTwo_edit_measureValue',
          '4': 'paramTwo_edit_logicalValue'
        },
        menueCnameMap: {
          'paramTwo_edit_timePoint': '时间点',
          'paramTwo_edit_measureValue': '测量值',
          'paramTwo_edit_logicalValue': '逻辑值'
        },
        scriptTypeMap: {
          '0': '筛选方式',
          '1': '时间点',
          '2': '时间段',
          '3': '测量值',
          '4': '逻辑值'
        },
        isSearch: false,
        TwoMenue: {},
        type: '', // 复制 界面用 0筛选方式 1时间点 3度量值 4测量值 5事件
        btnFlag: '', // 保存事件标识默认值
        computeShow: false,
        cleanShow: false,
        computeDate: '',
        dateTimeArr: [],
        startNode: '', // 开始被拖动节点的根节点
        currentEditNodeName: '' // 当前正在编辑的节点名字
      }
    },
    props: ['paramManagerObj', 'isCurrentUser', 'goback', 'scriptType1', 'backProfileCatalogId', 'saveReturnTwoDimensionId1', 'twoDimensionNamebd', 'backnowCatalogData', 'backnoWCatalogNode'],
    components: {
      ParamTwoBinding,
      CleaningRules
    },
    watch: {
      cleanType (newVal, oldVal) {
        this.thresholdNormal = ''
        this.thresholdMin = ''
        this.thresholdMax = ''
      },
      thresholdType (newVal, oldVal) {
        this.thresholdNormal = ''
      },
      twoDimensionNamebd (newData, oldData) {
        console.log(newData, oldData)
      },
      // filterMainText (val) {
      //   // 搜索框为空
      //   if (!this.$util.isDefine(val)) {
      //     this.isSearch = true
      //     this.isShow = false
      //     this.getTree()
      //   }
      // },
      // filterText (val) {
      //   // 搜索框为空
      //   if (!this.$util.isDefine(val)) {
      //     this.getModalTree()
      //   }
      // },
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
    mounted () {
      this.currentUser = this.isCurrentUser
      this.paramManager = this.paramManagerObj
      this.gobackPage = this.goback
      if (this.gobackPage) {
        this.twoDimensionParamId = this.saveReturnTwoDimensionId1
        this.paramDetailData.twoDimensionName = this.twoDimensionNamebd
        this.profileCatalogId = this.backProfileCatalogId
        this.scriptType = this.scriptType1
        this.nowCatalogData = this.backnowCatalogData
        this.noWCatalogNode = this.backnoWCatalogNode
      }
      // // 获取parentId
      // this.$bus.$on('paramTwoAddTab', (obj) => {
      //   if (obj.enName === 'paramTwo_edit_timePoint') {
      //     this.TimePointdialogVisible = true // 显示时间点弹框
      //   }
      // })
      this.$bus.$off('share_param_two') // 移除自定义事件监听器。
      this.$bus.$off('paramTwoTableFileEditValue') // 移除自定义事件监听器。
      this.$bus.$off('emitShowMenue') // 移除自定义事件监听器。
      this.$bus.$off('paramTwo_delete') // 移除自定义事件监听器。
      this.$bus.$off('paramTwo_edit_compute') // 移除自定义事件监听器。
      this.$bus.$off('paramTwo_clean') // 移除自定义事件监听器。
      this.$bus.$off('paramEtlTwo_dimension') // 移除自定义事件监听器。

      this.$bus.$on('emitShowMenue', (needDisabled) => {
        this.needDisabled = needDisabled
        this.getChildrenMenue()
      })
      this.$bus.$on('share_param_two', () => {
        this.changeOperAtion()
      })
      // 点击二级菜单，需要回调子组件的方法
      this.$bus.$on('paramTwoTableFileEditValue', (type) => {
        console.log('this.nowCatalogData', this.nowCatalogData)
          this.openTwoMenu(this.nowCatalogData, this.noWCatalogNode, type)
      })
      // 删除
      this.$bus.$on('paramTwo_delete', (type) => {
        this.deleteTwoParam(this.twoDimensionParamId)
      })
      // 开始计算
      this.$bus.$on('paramTwo_edit_compute', (type) => {
        this.computeDate = ''
        this.value5 = []
        this.getRepository()
        this.computeShow = true
      })
      // 数据清洗
      this.$bus.$on('paramTwo_clean', (type) => {
        console.log('自定义数据清洗')
        this.cleanShow = true
      })
      this.$bus.$on('paramEtlTwo_dimension', (type) => {
        console.log('开始清洗分析参数')
      })
      this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', {}, {}) // 修改二级菜单
      this.$nextTick(() => {
        this.getTree()
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
      // 开始计算
      computeClick () {
        console.log('输出开始日期：' + this.dateTimeArr[0])
        console.log('输出结束日期：' + this.dateTimeArr[1])
        console.log('输出版本库：' + this.value5.join(','))
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        var param = {twoDimensionId: this.twoDimensionParamId, startDate: this.dateTimeArr[0], endDate: this.dateTimeArr[1], modelIds: this.value5.join(',')}
        this.$axios.get('/apm/reCalculateTwoDimension', {params: param}).then(response => {
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
          this.$message.error('数据加载失败，请刷新页面重试！')
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
          this.$message.error('数据加载失败，请刷新页面重试！')
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
      getTree () {
        this.scriptId = this.paramManager.ID
        this.treeLoading = true
        this.$axios.get('/apm/getProfileCatalog', {params: {parentId: this.scriptId, searchContent: this.filterMainText}}).then(response => {
          this.treeLoading = false
          this.fileNewTreeArr = []
          this.expandedKeys = []
          var data = response.data
          this.fileNewTreeArr = data.data
          if (data) {
              if (this.profileCatalogId && !this.isSearch) {
                this.expandedKeys = []
                this.expandedKeys.push(this.twoDimensionParamId) // 展开当前节点
                this.$nextTick(() => {
                  this.$refs.tree.setCurrentKey(this.twoDimensionParamId) // 选中当前的节点
                  this.getTwoDimenSiionDetailById(this.twoDimensionParamId) // 根据当前节点查询详情
                })
              } else {
                this.expandedKeys = data.defaultNode
              }
              if (this.isSearch) {
                this.isSearch = false
              }
            }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.treeLoading = false
        })
      },
      getTreeForSave () {
        this.scriptId = this.paramManager.ID
        this.treeLoading = true
        this.$axios.get('/apm/getProfileCatalog', {params: {parentId: this.scriptId, searchContent: this.filterMainText}}).then(response => {
          this.treeLoading = false
          this.fileNewTreeArr = []
          this.expandedKeys = []
          var data = response.data
          this.fileNewTreeArr = data.data
            if (this.isSearch) {
              this.isSearch = false
            }
          let hideMenuObj = {}
          let disabledMenuObj = {}
          hideMenuObj['paramTwo_paramLibray_add_catalog2'] = false
          hideMenuObj['paramTwo_edit_link'] = false
          hideMenuObj['paramTwo_del_catalog'] = false
          hideMenuObj['paramTwo_edit_filter'] = false
          hideMenuObj['paramTwo_edit_timePoint'] = false
          hideMenuObj['paramTwo_edit_timeSlot'] = false
          hideMenuObj['paramTwo_edit_measureValue'] = false
          hideMenuObj['paramTwo_edit_logicalValue'] = false
          hideMenuObj['paramTwo_edit_event'] = false
          hideMenuObj['paramTwo_edit_link'] = false
          hideMenuObj['paramTwo_edit_link'] = false
          this.hideMenuObj = hideMenuObj
          this.disabledMenuObj = disabledMenuObj
          this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // 修改二级菜单
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
        this.$axios.get('/apm/getSharedTwoDimensionsByType', {params: {type: this.scriptType, searchContent: this.filterText, profileId: this.scriptId}}).then(response => {
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
        return h(ParamTwoTree, {
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
        return h(ParamTwoTree, {
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
      // 点击tree更多按钮
      openTwoMenu (data, node, type) {
        this.formLabelAlign.name = ''
        this.formLabelAlign.desc = ''
        this.copyAble = false //默认不显示
        this.TimePointdialogVisible = false
        this.checkBoxValue = false
        node.expanded = true // 展开节点显示添加的节点信息
        this.profileCatalogId = data.ID
        if (data.NAME) {
          // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
          if (type === 'catalog') { // 新增目录
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
          } else if (type === 'paramTwo_edit_filter') { // 显示筛选方式弹框
            this.scriptType = 0
            this.createParamTwoTitle = '新建筛选方式分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_timePoint') { // 显示时间点弹框
            this.scriptType = 1
            this.createParamTwoTitle = '新建时间点分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_timeSlot') { // 显示时间段
            this.scriptType = 2
            this.createParamTwoTitle = '新建时间段分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_measureValue') { // 显示测量值点弹框
            this.scriptType = 3
            this.createParamTwoTitle = '新建测量值分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_logicalValue') { // 显示逻辑值点弹框
            this.scriptType = 4
            this.createParamTwoTitle = '新建逻辑值分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_event') { // 显示事件点弹框
            this.scriptType = 5
            this.createParamTwoTitle = '新建事件分析参数'
            this.TimePointdialogVisible = true
          } else if (type === 'paramTwo_edit_link') {
            this.linkIsAble = true // 显示弹框
            this.linkName = ''
            this.linkId = ''
            this.filterText = ''
            this.getModalTree() // 显示tree
          } else if (type === 'paramTwo_edit_copy') {
            this.filterText = ''
            this.copyAble = true
            this.copyId = ''
            this.getModalTree() // 显示tree
          } else if (type === 'paramTwo_delete') { // 删除分析函数
            this.deleteTwoParam(data.ID)
          } else if (type === 'paramTwo_edit_compute') { // 开始计算
            this.computeDate = ''
            this.value5 = []
            this.getRepository()
            this.computeShow = true
          } else if (type === 'paramTwo_clean') { // 数据清洗
            console.log('数据清洗')
          } else if (type === 'paramEtlTwo_dimension') {
            console.log('开始清洗分析参数')
            this.treeLoading = true
            // 重新计算分析参数清洗
            this.$axios.get('/apm/reEtlTwoDimension', {params: {twoDimensionId: this.twoDimensionParamId}}).then(response => {
              this.treeLoading = false
              if (response.data.status === 'E5003') {
                this.$message.error(response.data.message)
              } else {
                this.$message.success('操作成功!')
              }
            }).catch(response => {
              this.treeLoading = false
              this.$message.error('操作失败!')
            })
          } else if (type === 'paramTwo_del_catalog') {
            this.deleteProfileCatalog(data)
          } else if (type === 'paramTwo_algorithmsLibrary_new' || type === 'paramTwo_algorithmsLibrary_new_edit') { // 新增算法、编辑算法
           if (this.scriptType === null || this.scriptType === undefined || this.scriptType === '') {
             this.scriptType = this.scriptType1
           }
            this.$bus.$emit('emitDataToParamSaveAfter', {
              currentUser: this.currentUser,
              isLinkParam: this.isLinkParam,
              scriptType: this.scriptType,
              profileCatalogId: this.profileCatalogId,
              paramManagerObj: this.paramManager,
              twoDimensionParamId: this.twoDimensionParamId,
              twoDimensionName: this.paramDetailData.twoDimensionName,
              bindingLibrary: this.$refs.bindingRef.bindingLibrary,
              multipleSelection: this.$refs.bindingRef.multipleSelection
            }) // 获取子组件的 所有版本库和选中的版本库
            this.$bus.$emit('paramTwoAddTab', {enName: type, zhName: this.paramDetailData.twoDimensionName, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
          } else if (type === 'paramTwo_algorithmsLibrary_new_remove') { // 清空映射关系，发送到子组件处理
            this.$bus.$emit('paramTwo_algorithmsLibrary_new_remove_emit')
          } else if (type === 'paramTwo_share') { // tree右击更多分享或者取消分享
            this.changeOperAtion()
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
      deleteTwoParam (id) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var paramStr = this.$qs.stringify({
            twoDimensionId: id
          })
          this.$store.commit('SHOW_LOADING', '正在删除') // 打开加载提示框
          this.$axios.post('/apm/deleteTwoDimension', paramStr, {
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
            this.$message.error('删除失败')
          })
        }).catch(() => {
          this.$store.commit('HIDE_LOADING', '正在删除') // 打开加载提示框
          console.log('x')
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
            if (type === 'paramTwo_edit') { // 编辑子节点
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
          url = '/apm/addProfileCatalog'
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
            hideMenuObj['paramTwo_paramLibray_add_catalog2'] = false
            hideMenuObj['paramTwo_edit_link'] = false
            hideMenuObj['paramTwo_del_catalog'] = false
            this.hideMenuObj = hideMenuObj
            this.disabledMenuObj = disabledMenuObj
            this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // 修改二级菜单
            this.isAddTreeNode = false
            // 重加载树
            this.getTree()
            // 加载新增节点的id
            // this.$axios.get('/apm/getProfileCatalog', {params: {parentId: parentNode.ID}}).then(response => {
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
          this.isSearch = true // 新增后，显示默认的node
          this.$store.commit('SHOW_LOADING', '正在保存') // 打开加载提示框
          this.$axios.post('/apm/updateTwoDimension', paramStr, {
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
              this.getTwoDimenSiionDetailById(this.twoDimensionParamId)
              this.getTree()
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
            //this.getParamTwoEditMenue(true)
            //0筛选方式 1时间点 2时间段 3测量值 4逻辑值 5事件
            hideMenuObj['paramTwo_paramLibray_add_catalog2'] = true
            hideMenuObj['paramTwo_edit_link'] = true
            if (data.NAME === '筛选方式' || data.SUPER_NAME === '筛选方式') {
              this.scriptType = 0
              hideMenuObj['paramTwo_edit_filter'] = true
            } else if (data.NAME === '时间点' || data.SUPER_NAME === '时间点') {
              this.scriptType = 1
              hideMenuObj['paramTwo_edit_timePoint'] = true
            } else if (data.NAME === '时间段' || data.SUPER_NAME === '时间段') {
              this.scriptType = 2
              hideMenuObj['paramTwo_edit_timeSlot'] = true
            } else if (data.NAME === '测量值' || data.SUPER_NAME === '测量值') {
              this.scriptType = 3
              hideMenuObj['paramTwo_edit_measureValue'] = true
            } else if (data.NAME === '逻辑值' || data.SUPER_NAME === '逻辑值') {
              this.scriptType = 4
              hideMenuObj['paramTwo_edit_logicalValue'] = true
            } else if (data.NAME === '事件' || data.SUPER_NAME === '事件') {
              this.scriptType = 5
              hideMenuObj['paramTwo_edit_event'] = true
            }
            if (data.IS_ROOT !== 'true') {
              hideMenuObj['paramTwo_del_catalog'] = true
            }
            if (!this.currentUser) {
              disabledMenuObj['paramTwo_edit_filter'] = true
              disabledMenuObj['paramTwo_paramLibray_add_catalog2'] = true
              disabledMenuObj['paramTwo_edit_link'] = true
              disabledMenuObj['paramTwo_edit_timePoint'] = true
              disabledMenuObj['paramTwo_edit_timeSlot'] = true
              disabledMenuObj['paramTwo_edit_measureValue'] = true
              disabledMenuObj['paramTwo_edit_logicalValue'] = true
              disabledMenuObj['paramTwo_edit_event'] = true
              disabledMenuObj['paramTwo_del_catalog'] = true
            }
            this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // 修改二级菜单
          } else { // 点击子节点查询详情，并显示对应菜单
            this.scriptType = data.TYPE
            this.profileCatalogId = data.PARENT_ID
            this.getTwoDimenSiionDetailById(data.ID)
          }
        }
        this.hideMenuObj = hideMenuObj
        this.disabledMenuObj = disabledMenuObj
        this.noWCatalogNode = node
        this.nowCatalogData = data
        this.$bus.$emit('paramTwolinkOrCurrentUser', {isCurrentUser: this.currentUser, isLinkParam: isLinkParam}) // 传值过去，然后点击二级菜单，触发对应的事件要用到
        this.$bus.$emit('emitParamTwoTreeData', {data: this.nowCatalogData, node: this.noWCatalogNode}) // 传值过去，然后点击二级菜单，触发对应的事件要用到
      },
      // 获取子节点的信息，以及对应菜单信息

      getChildrenMenue () {
        let hideMenuObj = {}
        let disabledMenuObj = {}
        hideMenuObj['paramTwo_clean'] = true // 显示数据清洗按钮
        hideMenuObj['paramEtlTwo_dimension'] = true // 显示开始清洗分析参数按钮
        hideMenuObj['paramTwo_algorithmsLibrary_new'] = true // 显示新建算法
        hideMenuObj['paramTwo_edit_compute'] = true // 显示开始计算
        hideMenuObj['paramTwo_algorithmsLibrary_new_edit'] = true // 显示编辑算法
        hideMenuObj['paramTwo_algorithmsLibrary_new_remove'] = true // 显示清空算法
        hideMenuObj['paramTwo_delete'] = true // 显示删除按钮
        if (this.paramDetailData.isShare === '1') {
          hideMenuObj['paramTwo_share_cancle'] = true // 取消分享按钮
        } else {
          hideMenuObj['paramTwo_share'] = true // 分享按钮
        }
          disabledMenuObj['paramTwo_algorithmsLibrary_new_edit'] = this.needDisabled // 禁用编辑算法
          disabledMenuObj['paramTwo_algorithmsLibrary_new_remove'] = this.needDisabled // 禁用清空算法
        console.log('paramtwofileEditUser', this.currentUser)
        // 判断是否有权限，没权限按钮全部禁用
        if (!this.currentUser) {
          disabledMenuObj['paramTwo_clean'] = true // 禁用数据清洗按钮
          disabledMenuObj['paramEtlTwo_dimension'] = true // 禁用开始清洗分析参数按钮
          disabledMenuObj['paramTwo_edit_compute'] = true // 禁用开始计算
          disabledMenuObj['paramTwo_algorithmsLibrary_new'] = true // 禁用新建算法
          disabledMenuObj['paramTwo_algorithmsLibrary_new_edit'] = true // 禁用编辑算法
          disabledMenuObj['paramTwo_algorithmsLibrary_new_remove'] = true // 禁用清空算法
          disabledMenuObj['paramTwo_share'] = true // 禁用分享按钮
          disabledMenuObj['paramTwo_share_cancle'] = true // 禁用取消分享按钮
          disabledMenuObj['paramTwo_delete'] = true // 禁用删除按钮
        } else if (this.isLinkParam) { // 如果是连接
          disabledMenuObj['paramTwo_clean'] = true // 禁用数据清洗按钮
          disabledMenuObj['paramEtlTwo_dimension'] = true // 禁用开始清洗分析参数按钮
          disabledMenuObj['paramTwo_edit_compute'] = true // 禁用开始计算
          disabledMenuObj['paramTwo_algorithmsLibrary_new'] = true // 禁用新建算法
          disabledMenuObj['paramTwo_algorithmsLibrary_new_edit'] = true // 禁用编辑算法
          disabledMenuObj['paramTwo_algorithmsLibrary_new_remove'] = true // 禁用清空算法
          disabledMenuObj['paramTwo_share'] = true // 禁用分享按钮
          disabledMenuObj['paramTwo_share_cancle'] = true // 禁用取消分享按钮
          disabledMenuObj['paramTwo_delete'] = false // 启用用删除按钮
        }
        this.hideMenuObj = hideMenuObj
        this.disabledMenuObj = disabledMenuObj
        //this.paramDetailData
        this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // 修改二级菜单
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
      // 修改清洗规则后刷新数据
      refreshCleanRule (id) {
        this.cleanShow = false
        this.getTree()
      },
      // 获取tree 节点的详情
      getTwoDimenSiionDetailById (id) {
        if (id) {
          this.isShow = true
          this.tableLoading = true
          this.$axios.get('/apm/getTwoDimensionById', {params: {id: id}}).then(response => {
            var data = response.data
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.twoDimensionParamId = id // 记录子节点ID
              this.paramDetailData = data // 记录子节点信息
             //this.paramDetailData.beLinkedTwoDimensions 被链接
              // linkDimensionName 链接自：
              // console.log('xxxxxxxxxxx' + JSON.stringify(this.paramDetailData))
              this.tableLoading = false
              if (data.linkDimensionId) {
                this.isLinkParam = true
              } else {
                this.isLinkParam = false
              }
              // 获取子节点的菜单信息
              this.getChildrenMenue()
              this.$axios.get('apm/getTwoDimensionEtlConfig', {params: {twoDimensionId: this.twoDimensionParamId}}).then(response => {
                let etlConfigData = JSON.parse(JSON.stringify(response.data))
                if (etlConfigData && etlConfigData.CATEGORY) {
                  this.$set(this.paramDetailData, 'etlConfig', etlConfigData)
                }
              }).catch(response => {
              })
            }
          }).catch(response => {
          })
        }
      },
      // getParamTwoEditMenue (flag) {
      //   this.$axios.get('/apm/getChildCreator', {params: {id: '-1'}}).then(response => {
      //     var disabledMenuTwoObj = {} // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
      //     var data = response.data
      //     if (data.status !== null && data.status !== '' && data.status === 'E1001') {
      //       this.$bus.$emit('logBackInHandle', response.data)
      //     } else {
      //       for (var i = 0; i < data.length; i++) {
      //         disabledMenuTwoObj[this.menueList[data[i].ID]] = flag
      //       }
      //       this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', disabledMenuTwoObj, {}) // 修改头部显示效果
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
      checkParamTwo () {
        if (this.checkBoxValue === true) {
          this.TimePointdialogVisible = false
          this.filterText = ''
          this.copyAble = true
          this.getModalTree() // 显示tree
        }
      },
      // 保存时间点弹框数据
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
                message: '新建的分析参数名称前后中间都不能包含空格',
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
              this.$axios.post('/apm/addTwoDimension', paramStr, {
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
                  this.getTreeForSave() // 重新加载一下数据
                  // 传值 scriptType 为参数类型
                  this.$bus.$emit('param_two_save_complete_after', {
                    currentUser: this.currentUser,
                    isLinkParam: this.isLinkParam,
                    scriptType: this.scriptType,
                    profileCatalogId: this.profileCatalogId,
                    paramManagerObj: this.paramManager,
                    twoDimensionParamId: data.value,
                    twoDimensionName: this.formLabelAlign.name
                  })
                  // 保存完成新开页签进入保存算法界面
                  this.$bus.$emit('paramTwoAddTab', {enName: 'param_two_save_complete', zhName: this.formLabelAlign.name, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
                  // this.formLabelAlign.name = ''
                  // this.formLabelAlign.desc = ''
                  /*
                  this.$bus.$emit('paramTwoDialog_page', {scriptType: this.scriptType, profileTwoDimensionId: data.vaue, enName: 'paramTwo_complete_page', zhName: this.createParamTwoTitle, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
                  */
                } else {
                  this.$message.error({
                    message: data.message
                  })
                }
              }).catch(response => {
                this.fmLoadding = false
                this.$message.error({message: '保存失败，服务器异常'})
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

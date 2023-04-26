<template>
  <div class="model-approve">
    <div class="model-approve-table">
      <div class="model-approve-table-input df df-jc-c df-ai-c">
        <el-form :inline="true" label-width="70px">
          <el-form-item label="模型名称:">
            <el-input v-model.trim="form.modelName" clearable placeholder="模型名称" style="width: 120px; "/>
          </el-form-item>
          <el-form-item label="模型类别:">
            <el-select v-model="form.categoryType" clearable placeholder="模型类别" style="width: 120px;">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属用户:">
            <el-input v-model.trim="form.modelUser" clearable placeholder="所属用户" style="width: 120px; "/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="model-approve-table-info">
        <el-table
          highlight-current-row
          :data="tableData"
          height="100%"
          border
          fit
          width="100%">
          <el-table-column
            prop="modelName"
            label="模型名称"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="categoryType"
            label="模型类别"
            :formatter="modelFormatter"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="modelUser"
            label="所属用户"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" width="320">
            <template slot-scope="scope">
              <div class="opt_col">
                <span @click="showPublishInfo(scope.row)">查看审批单&nbsp;&nbsp;</span>
                <span @click="showModel(scope.row)">查看模型&nbsp;&nbsp;</span>
                <span v-if="showButton(1, scope.row)" @click="modelApprove(scope.row)">审批&nbsp;&nbsp;</span>
                <span v-if="showButton(5, scope.row)" @click="reject(scope.row)">驳回&nbsp;&nbsp;</span>
                <span v-if="showButton(6, scope.row)" @click="transfer(scope.row)">转办&nbsp;&nbsp;</span>
                <span @click="showOptInfo(scope.row)">操作记录</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="model-approve-table-pagination df df-jc-fe df-ai-c">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, total"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :title="modelOpt.title" class="model-opt-dialog" :visible.sync="modelOpt.modelDialog" @close='closeDialog'>
      <el-form :model="modelOpt" label-width="80px" :rules="rules"  ref="modelOpt">
          <el-form-item label="模型名称:">
            <el-input v-model="modelOpt.modelName" style="width: 350px;" disabled/>
          </el-form-item>
          <el-form-item label="转办用户:" prop="userList" v-if="modelOpt.title === '转办'">
            <el-select v-model="modelOpt.userList"
               placeholder="转办用户"
               clearable
               filterable
               multiple
               :multiple-limit="20"
               style="width: 350px;"
            >
              <el-option
                v-for="item in allUserList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="意见:" prop="explain">
            <el-input type="textarea"
                      :rows="3"
                      :show-word-limit="true"
                      :maxlength="100"
                      v-model.trim="modelOpt.explain"
                      clearable
                      placeholder="意见"
                      style="width: 350px; "/>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modelOpt.modelDialog = false">取消</el-button>
        <el-button type="primary" @click="dialogSubmit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="操作记录" class="model-opt-list-dialog" :visible.sync="modelOptList.modelOptDialog" @close='closeOptListDialog'>
      <el-timeline style="padding:0 20px;max-height:300px;overflow:auto">
        <!-- :icon="workFlow.length < 2 ? '' : activity.optTypeLabel === '驳回' ? 'el-icon-error' : 'el-icon-success'" -->
        <el-timeline-item
          v-for="(activity, index) in modelOptList.dataList"
          :key="index"
          placement='top'
          :icon="activity.optTypeLabel === '驳回' ? 'el-icon-error' : 'el-icon-success'"
          :class="activity.optTypeLabel === '驳回' ? 'error' : 'success'"
          type="primary"
          :timestamp="`${activity.optTypeLabel}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${activity.optTime}`">
            <el-card>
              <div class='explain'><span>{{activity.optTypeLabel === '提交' ? '备注：' : '意见：'}}</span><div>{{activity.explain}}</div></div>
              <span>处理人：{{activity.optUser}}</span>
            </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        highlight-current-row
        :data="modelOptList.dataList"
        border
        style="width: 100%; height: 100%;">
        <el-table-column
          prop="optTypeLabel"
          label="操作类型"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="optUser"
          label="操作用户"
          :show-overflow-tooltip="true"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="optBeforeStateLabel"
          label="操作前状态"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="optAfterStateLabel"
          label="操作后状态"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="explain"
          label="意见"
          :show-overflow-tooltip="true"
          min-width="150px">
        </el-table-column>
        <el-table-column
          prop="optTime"
          label="操作时间"
          width="160px">
        </el-table-column>
      </el-table> -->
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="审批单" :visible.sync="publishInfoForm.showPublishDia">
      <div class="audit_detail">
        <el-form label-width="80px">
          <el-row>
            <el-col :span='12'>
              <el-form-item label="分析名称：" prop="modelName">
                <span>{{publishInfoForm.modelName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="模型分类：" prop="modelType">
                <span>{{publishInfoForm.modelTypeName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注：" prop="explain">
            <span>{{publishInfoForm.explain}}</span>
          </el-form-item>
          <el-form-item label="提交人：" prop="submitBy">
            <span>{{publishInfoForm.submitBy}}</span>
          </el-form-item>
          <el-form-item label="提交时间：" prop="submitTime">
            <span>{{publishInfoForm.submitTime}}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>
<script>

export default {
  name: 'ModelApprove',
  components: {},
  data () {
    return {
      typeList: [],
      form: {
        modelName: '',
        categoryType: '',
        modelUser: '',
        // 10：已创建｜待提交｜已驳回 /20：已提交｜已办理｜待审批 /30：已转办｜待办理 /40：已办理｜待审批 /50：已审批 /60：已驳回/70已上线｜审批通过/80：已下线
        modelState: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      modelOpt: {
        // modelHandleDialog: false,
        modelDialog: false,
        url: '',
        modelId: '',
        modelName: '',
        title: '',
        explain: '',
        userList: []
      },
      rules: {
        explain: [
          { required: true, message: '请输入意见', trigger: 'blur' },
          { message: '长度不能超过50个字符', trigger: 'blur', max: 50 }
        ],
        userList: [
          { required: true, message: '请选择转办用户', trigger: 'blur' }
        ]
      },
      allUserList: [],
      modelOptList: {
        modelOptDialog: false,
        dataList: []
      },
      publishInfoForm: {
        showPublishDia: false,
        modelName: '',
        modelType: '',
        modelTypeName: '',
        explain: '',
        submitBy: '',
        submitTime: ''
      }
      // isAudit: false
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      // 初始化列表
      this.initList()
      // 查询模型分类
      this.getModelCategory()
      // 查询所有用户
      this.getAllUserList()
      let userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo')) || {}
      this.isAudit = userInfo.isAudit || false
    })
  },
  watch: {},
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    // 办理
    // modelHandle (row) {
    //   this.setModelDialog('办理', '/handle', row.modelId, row.modelName, 'modelHandleDialog')
    // },
    initList () {
      this.currentPage = 1
      this.getList()
    },
    getList () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let params = {
        ...this.form,
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      this.$axios({
        url: '/modelMotion/approve/pageList',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        let data = res.data
        this.tableData = data.content
        this.currentPage = Number(data.pageNo)
        this.pageSize = Number(data.pageSize)
        this.total = Number(data.recordCount)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    getModelCategory () {
      this.typeList = []
      this.$axios({
        url: '/modelMotion/getModelCategory',
        method: 'get'
      }).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(item => {
            this.typeList.push({
              label: item.name,
              value: item.code
            })
          })
        }
      })
    },
    getAllUserList () {
      this.allUserList = []
      this.$axios({
        url: '/user/getAllUsers',
        method: 'get'
      }).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(item => {
            this.allUserList.push({
              label: item.LOGIN_NAME,
              value: item.ID
            })
          })
        }
      })
    },
    showPublishInfo (row) {
      this.publishInfoForm.modelName = ''
      this.publishInfoForm.modelType = ''
      this.publishInfoForm.modelTypeName = ''
      this.publishInfoForm.explain = ''
      this.publishInfoForm.submitBy = ''
      this.publishInfoForm.submitTime = ''

      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/modelMotion/publishInfo',
        method: 'post',
        params: { modelId: row.modelId }
      }).then(res => {
        if (!res.data) {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error('审批单不存在! ')
          return
        }
        let info = res.data
        this.publishInfoForm.modelName = row.modelName
        this.publishInfoForm.modelType = row.categoryType
        if (this.publishInfoForm.modelType) {
          let obj = this.typeList.find(item => item.value === row.categoryType)
          if (obj) this.publishInfoForm.modelTypeName = obj.label
        }
        this.publishInfoForm.explain = info.explain
        this.publishInfoForm.submitBy = info.optUser
        this.publishInfoForm.submitTime = info.optTime

        this.publishInfoForm.showPublishDia = true
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    showModel (row) {
      this.$bus.$emit('sendingInfo', {
        treeType: row.treeType,
        treeNode: row.treeNode,
        treeName: row.treeName,
        name: row.modelName,
        type: 'view'
        // type: this.isAudit ? 'view' : 'detail' // 审核人去模型编辑页
      })
    },
    showOptInfo (row) {
      this.modelOptList.dataList = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/modelMotion/optList',
        method: 'post',
        params: { modelId: row.modelId }
      }).then(res => {
        this.modelOptList.dataList = res.data
        this.modelOptList.modelOptDialog = true
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    // 审批
    modelApprove (row) {
      this.setModelDialog('审批', '/approve', row.modelId, row.modelName)
    },
    // 驳回
    reject (row) {
      this.setModelDialog('驳回', '/reject', row.modelId, row.modelName)
    },
    // 转办
    transfer (row) {
      this.setModelDialog('转办', '/transfer', row.modelId, row.modelName)
    },
    // 设置模型操作参数
    setModelDialog (type, url, modelId, modelName, dialog = 'modelDialog') {
      this.modelOpt.url = url
      this.modelOpt.modelId = modelId
      this.modelOpt.modelName = modelName
      this.modelOpt.title = type
      this.modelOpt.explain = ''
      this.modelOpt.userList = []
      this.modelOpt[dialog] = true
    },
    modelConfirm (type, modelName, url, params) {
      this.$confirm('您确定要' + type + '模型【' + modelName + '】吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        this.$axios({
          url: '/modelMotion' + url,
          method: 'post',
          data: JSON.stringify(params),
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          if (res.data.result) {
            this.$message.success('请求成功！')
            this.closeDialog()
            this.getList()
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
        })
      }).catch(() => {
        this.$message.info('已取消！')
      })
    },
    closeDialog () {
      this.modelOpt.modelDialog = false
      this.modelOpt.url = ''
      this.modelOpt.modelId = ''
      this.modelOpt.modelName = ''
      this.modelOpt.title = ''
      this.modelOpt.explain = ''
      this.modelOpt.userList = []
    },
    dialogSubmit () {
      this.$refs['modelOpt'].validate(valid => {
        if (valid) {
          this.modelConfirm(this.modelOpt.title, this.modelOpt.modelName, this.modelOpt.url, {
            modelId: this.modelOpt.modelId,
            explain: this.modelOpt.explain,
            userList: this.modelOpt.userList
          })
        }
      })
    },
    // 操作按钮权限
    showButton (showType, row) {
      if (showType === 1 || showType === 5) {
        if (row.modelState === '20' || row.modelState === '40') return true
      } else if (showType === 6) {
        if (row.modelState === '20') return true
      }
      return false
    },
    // 数据格式化
    modelFormatter (row, column, cellValue, index) {
      if (column.property === 'categoryType') {
        if (!cellValue && cellValue !== '0') return ''
        let obj = this.typeList.find(item => item.value === cellValue)
        if (!obj) return ''
        return obj.label
      }
      return ''
    },
    closeOptListDialog () {
      this.modelOptList.modelOptDialog = false
      this.modelOptList.dataList = []
    }
  }
}
</script>
<style scoped>
.model-approve {
  position: absolute;
  width: 100%;
  height: 100%;
}

.model-approve-table {
  position: relative;
  width: 100%;
  padding: 0 10px;
  height: 100%;
  box-sizing: border-box;
}

.model-approve-table-input {
  position: relative;
  width: 100%;
  height: 54px;
  line-height: 54px;
  display: flex;
  justify-content: flex-start;
}

.model-approve-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
}
.model-approve .model-approve-table-input .el-form-item__content {
  vertical-align: middle;
}
.model-approve-table-input .el-button {
  padding: 9px 20px !important;
}

.model-approve-table-info {
  position: relative;
  width: 100%;
  height: 80%;
}

.model-approve-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}
.model-approve .el-dialog .el-card__body .explain {
  display: flex;
  margin-bottom: 10px;
}
.model-approve .el-dialog .el-card__body .explain span {
  width: 48px;
  display: inline-block;
}
.model-approve .el-dialog .el-card__body .explain div {
  width: calc(100% - 48px);
}
.model-opt-dialog .el-dialog__body .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.model-opt-list-dialog /deep/ .el-dialog {
  width: 40%;
  min-width: 500px;
}
.model-opt-list-dialog /deep/ .el-dialog {
  height: 350px !important;
  overflow-y: auto;
}
</style>
<style>
.model-approve .el-dialog__wrapper .audit_detail .el-form-item {
  margin-bottom: 0;
}
.model-approve .el-dialog__wrapper .el-dialog__header .el-dialog__title {
  font-size: 14px;
  font-weight: bold;
}
.model-approve .model-opt-list-dialog .el-card .el-card__body {
  padding: 10px 20px;
  font-size: 12px;
}
.model-approve  .model-opt-list-dialog .el-dialog__body .el-timeline-item .el-timeline-item__tail {
  border-left: 2px solid #409EFF;
}
.model-approve  .model-opt-list-dialog .el-dialog__body .el-timeline-item.error .el-timeline-item__tail {
  border-left: 2px solid red;
}
.model-approve  .model-opt-list-dialog .el-dialog__body .el-timeline-item .el-timeline-item__node.el-timeline-item__node--normal {
  background-color: #fff;
}
.model-approve  .model-opt-list-dialog .el-dialog__body .el-timeline-item .el-timeline-item__node.el-timeline-item__node--normal .el-timeline-item__icon.el-icon-success {
  color: #409EFF;
}
.model-approve .model-opt-list-dialog .el-dialog__body .el-timeline-item .el-timeline-item__node.el-timeline-item__node--normal .el-timeline-item__icon.el-icon-error {
  color: red;
}
.model-approve .model-opt-list-dialog .el-dialog__body {
 /* padding-bottom: 0; */
}
</style>

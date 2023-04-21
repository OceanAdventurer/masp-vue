<template>
  <div class="model-approve">
    <div class="model-approve-container df df-fd-r">
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
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            highlight-current-row
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
              prop="modelName"
              label="模型名称"
              :show-overflow-tooltip="true"
              min-width="120px">
            </el-table-column>
            <el-table-column
              prop="categoryType"
              label="模型类别"
              :formatter="modelFormatter"
              :show-overflow-tooltip="true"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="modelUser"
              label="所属用户"
              :show-overflow-tooltip="true"
              width="150px">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="opt_col">
                  <span @click="showModel(scope.row)">查看模型</span>&nbsp;&nbsp;
                  <span @click="modelHandle(scope.row)">回复</span>&nbsp;&nbsp;
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
    </div>

    <el-dialog :close-on-click-modal="false" :title="modelOpt.title" class="model-opt-dialog" :visible.sync="modelOpt.modelDialog" @close='closeDialog'>
      <el-form :model="modelOpt" label-width="80px" :rules="rules"  ref="modelOpt">
          <el-form-item label="模型名称:">
            <el-input v-model="modelOpt.modelName" style="width: 350px;" disabled/>
          </el-form-item>
          <el-form-item label="意见:" prop="explain">
            <el-input type="textarea"
                      :rows="3"
                      :show-word-limit="true"
                      :maxlength="50"
                      v-model.trim="modelOpt.explain"
                      clearable
                      placeholder="意见"
                      style="width: 350px; "/>
          </el-form-item>
          <el-form-item class="model-opt-dialog-button">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modelOpt.modelDialog = false">取消</el-button>
          <el-button type="primary" @click="dialogSubmit">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="操作记录" class="model-opt-list-dialog" :visible.sync="modelOptList.modelOptDialog" @close='closeOptListDialog'>
      <el-timeline :reverse='true' style="padding:0 20px;max-height:300px;overflow:auto">
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
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'ModelHandle',
  components: {},
  data () {
    return {
      typeList: [],
      form: {
        modelName: '',
        categoryType: '',
        modelUser: '',
        modelState: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      modelOpt: {
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
        ]
      },
      modelOptList: {
        modelOptDialog: false,
        dataList: []

      }
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
        url: '/modelMotion/handle/pageList',
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
    showModel (row) {
      this.$bus.$emit('sendingInfo', {
        treeType: row.treeType,
        treeNode: row.treeNode,
        treeName: row.treeName,
        name: row.modelName,
        type: 'detail'
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
        if (res.data.length > 0) {
          res.data.sort((a, b) => { return a.optTime > b.optTime })
        }
        console.log('====================================')
        console.log(res.data, 'res.data--test')
        console.log('====================================')
        this.modelOptList.dataList = res.data
        this.modelOptList.modelOptDialog = true
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    // 办理
    modelHandle (row) {
      this.setModelDialog('回复', '/handle', row.modelId, row.modelName)
    },
    // 设置模型操作参数
    setModelDialog (type, url, modelId, modelName) {
      this.modelOpt.url = url
      this.modelOpt.modelId = modelId
      this.modelOpt.modelName = modelName
      this.modelOpt.title = type
      this.modelOpt.explain = ''
      this.modelOpt.userList = []
      this.modelOpt.modelDialog = true
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

.model-approve-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.model-approve-table {
  position: relative;
  width: calc(100vw - 204px);
  height: 100%;
  margin-left: 12px;
}

.model-approve-table-input {
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
}

.model-approve-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
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
  overflow: scroll;
}
.model-opt-dialog-button {
  margin-left: unset;
}
.model-opt-list-dialog /deep/ .el-dialog {
  width: 40%;
  min-width: 500px;
}
.model-opt-list-dialog /deep/ .el-table__body-wrapper {
  height: 350px !important;
  overflow-y: scroll;
}
</style>
<style>
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
</style>

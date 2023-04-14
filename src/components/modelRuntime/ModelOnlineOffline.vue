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
            <el-form-item label="模型状态:">
              <el-select v-model="form.modelState" clearable placeholder="模型状态" style="width: 120px;">
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
              min-width="200px">
            </el-table-column>
            <el-table-column
              prop="categoryType"
              label="模型类别"
              :formatter="modelFormatter"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="modelUser"
              label="所属用户"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="modelState"
              label="模型状态"
              :formatter="modelFormatter"
              width="100px">
            </el-table-column>
            <el-table-column label="操作" width="300px">
              <template slot-scope="scope">
                <el-button class="opt-button" size="mini" round @click.native="showModel(scope.row)">查看模型</el-button>
                <el-button v-if="showButton(3, scope.row)" size="mini" round @click.native="online(scope.row)">上线</el-button>
                <el-button v-if="showButton(4, scope.row)" size="mini" round @click.native="offline(scope.row)">下线</el-button>
                <el-button size="mini" round @click.native="showOptInfo(scope.row)">操作记录</el-button>
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
            <el-button type="primary" @click="dialogSubmit">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="操作记录" class="model-opt-list-dialog" :visible.sync="modelOptList.modelOptDialog" @close='closeOptListDialog'>
      <el-table
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
      </el-table>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'ModelOnlineOffline',
  components: {},
  data () {
    return {
      typeList: [],
      stateList: [
        {label: '已上线', value: '70'},
        {label: '已下线', value: '80'}
      ],
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
        url: '/modelMotion/onlineOffline/pageList',
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
        type: 'view'
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
    // 上线
    online (row) {
      this.setModelDialog('上线', '/online', row.modelId, row.modelName)
    },
    // 下线
    offline (row) {
      this.setModelDialog('下线', '/offline', row.modelId, row.modelName)
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
      if (showType === 3) {
        if (row.modelState === '50' || row.modelState === '80') return true
      } else if (showType === 4) {
        if (row.modelState === '70') return true
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
      } else if (column.property === 'modelState') {
        if (!cellValue) return ''
        let obj = this.stateList.find(item => item.value === cellValue)
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
  width: 60%;
  min-width: 820px;
}
.model-opt-list-dialog /deep/ .el-table__body-wrapper {
  height: 350px !important;
  overflow-y: scroll;
}
</style>

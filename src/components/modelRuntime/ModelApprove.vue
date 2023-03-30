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
            <el-form-item label="类别名称:">
              <el-input v-model.trim="form.categoryName" clearable placeholder="类别名称" style="width: 120px; "/>
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
              width="100px">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="类别名称"
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
                <el-button size="mini" round @click.native="showOptInfo(scope.row)">查看</el-button>
                <el-button v-if="showButton(0, scope.row)" size="mini" round @click.native="submit(scope.row)">提交</el-button>
                <el-button v-if="showButton(1, scope.row)" size="mini" round @click.native="modelApprove(scope.row)">审批</el-button>
                <el-button v-if="showButton(5, scope.row)" size="mini" round @click.native="reject( scope.row)">驳回</el-button>
                <el-button v-if="showButton(6, scope.row)" size="mini" round @click.native="transfer(scope.row)">转办</el-button>
                <el-button v-if="showButton(2, scope.row)" size="mini" round @click.native="modelHandle(scope.row)">办理</el-button>
                <el-button v-if="showButton(3, scope.row)" size="mini" round @click.native="online(scope.row)">上线</el-button>
                <el-button v-if="showButton(4, scope.row)" size="mini" round @click.native="offline(scope.row)">下线</el-button>
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

    <el-dialog :title="modelOpt.title" :visible.sync="modelOpt.modelDialog" @close='closeDialog'>
      <div class="model-dialog">
        <el-form :model="modelOpt" label-width="100px" :rules="rules"  ref="modelOpt">
          <el-form-item label="转办用户:" prop="userList" v-if="modelOpt.title === '转办'">
            <el-select v-model="modelOpt.userList"
               placeholder="转办用户"
               clearable
               filterable
               multiple
               :multiple-limit="20"
               style="width: 400px;"
            >
              <el-option
                v-for="item in allUserList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="explain">
            <el-input type="textarea"
                      :rows="3"
                      :show-word-limit="true"
                      :maxlength="50"
                      v-model.trim="modelOpt.explain"
                      clearable
                      placeholder="备注"
                      style="width: 400px; "/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogSubmit">确定</el-button>
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
      // 是否有审批权限
      approve: false,
      typeList: [
        {label: '分析目录', value: '0'},
        {label: '测试', value: '1'}
      ],
      stateList: [
        {label: '待提交', value: '10'},
        {label: '待审批', value: '20'},
        {label: '待办理', value: '30'},
        {label: '已办理', value: '40'},
        {label: '审批通过', value: '50'},
        {label: '已驳回', value: '60'},
        {label: '已上线', value: '70'},
        {label: '已下线', value: '80'}
      ],
      form: {
        modelName: '',
        categoryType: '',
        categoryName: '',
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
          { required: true, message: '请输入备注', trigger: 'blur' },
          { message: '长度不能超过50个字符', trigger: 'blur', max: 50 }
        ],
        userList: [
          { required: true, message: '请选择转办用户', trigger: 'blur' }
        ]
      },
      allUserList: []
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      // 是否有审批权限
      this.hasApprove()
      // 初始化列表
      this.initList()
      // 查询所有用户
      this.getAllUserList()
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
        url: '/modelMotion/pageList',
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
        this.$message.error('查询失败! ')
      })
    },
    hasApprove () {
      this.approve = false
      this.$axios({
        url: '/modelMotion/hasApprove',
        method: 'get'
      }).then(res => {
        this.approve = res.data
      }).catch(res => {
        this.$message.error('查询审批权限失败! ')
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
      }).catch(res => {
        this.$message.error('查询用户列表失败! ')
      })
    },
    showOptInfo (row) {
      console.log('====showOptInfo====', row)
    },
    // 提交
    submit (row) {
      this.setModelDialog('提交', '/submit', row.modelId, row.modelName)
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
    // 办理
    modelHandle (row) {
      this.setModelDialog('办理', '/handle', row.modelId, row.modelName)
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
          this.$message.error('请求失败! ')
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
      if (!showType && showType !== 0) return false
      if (showType === 0) {
        if (this.approve && (!row.modelState || row.modelState === '10' || row.modelState === '60')) return true
      } else if (showType === 1) {
        if (this.approve && (row.modelState === '20' || row.modelState === '40')) return true
      } else if (showType === 5 || showType === 6) {
        if (this.approve && row.modelState === '20') return true
      } else if (showType === 2) {
        if (row.transfer && row.modelState === '30') return true
      } else if (showType === 3) {
        if (this.approve && (row.modelState === '50' || row.modelState === '80')) return true
      } else if (showType === 4) {
        if (this.approve && row.modelState === '70') return true
      }
      return false
    },
    // 数据格式化
    modelFormatter (row, column, cellValue, index) {
      if (column.property === 'categoryType') {
        if (!cellValue && cellValue !== '0') return ''
        let obj = this.typeList.find(item => item.value === cellValue)
        return obj.label
      } else if (column.property === 'modelState') {
        if (!cellValue && cellValue !== '0') return '待提交'
        let obj = this.stateList.find(item => item.value === cellValue)
        return obj.label
      }
      return ''
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
  /*margin-right: unset;*/
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

.el-dialog__body .model-dialog .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

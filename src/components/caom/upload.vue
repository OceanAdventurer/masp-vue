<template>
  <el-dialog
    title="文件上传"
    :visible.sync="isFileUpload"
    :before-close="handleClose"
    class="slotReply-upload"
  >
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="计划名称:" prop="scenarioName">
          <el-input v-model="ruleForm.scenarioName"></el-input>
        </el-form-item>
        <el-form-item label="航季:" prop="season">
          <el-input v-model="ruleForm.season"></el-input>
        </el-form-item>
        <el-form-item label="标准航段版本:" prop="versionName">
          <!-- <el-input v-model="ruleForm.versionName"></el-input> -->
          <el-select v-model="ruleForm.versionName" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请选择文件:" prop="name">
          <el-upload
            class="upload-demo"
            ref="upload"
            :file-list="fileList"
            action="/netWork/distance/import"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :http-request="allUpload"
            :auto-upload="false"
            :headers="myHeaders"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Home',
  props: {
    isFileUpload: {
      default: false
    },
    options: {
      require: true
    }
  },
  data() {
    return {
      myHeaders: { Authorization: 'content-type=multipart/form-data' },
      fileList: [],
      ruleForm: {
        versionName: '',
        scenarioName: '',
        season: ''
      },
      rules: {
        versionName: [{ required: true, message: '请输入标准航段版本名称' }],
        scenarioName: [{ required: true, message: '请输入计划名称' }],
        season: [{ required: true, message: '请输入航季' }]
      }
    }
  },
  created() {
    console.log(this.options)
    console.log(1234)
  },
  methods: {
    handleClose() {
      this.fileList = []
      ;(this.ruleForm = {
        versionName: '',
        scenarioName: '',
        season: ''
      }),
        this.$emit('closeUpload')
    },
    handleExceed(files, fileList) {
      console.log(fileList, files)
    },
    beforeRemove(file, fileList) {
      console.log(fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    allUpload(param) {
      this.$emit('allUpload', param, this.ruleForm)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //排序
    sortTable() {
      this.list = []
      for (let i = 0; i < this.ordersListData.length; i++) {
        let item = Object.assign({}, this.ordersListData[i])
        this.list.push(item)
      }
      this.list.forEach(item => {
        if (item.sort == 'ascending') {
          item.sort = 'asc'
        } else {
          item.sort = 'desc'
        }
      })
      this.getList()
      // console.log(this.list)
    },
     getList() {
      const params = {
        groupId: this.groupId,
        name: this.displayName,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.loadingStatus = true
      this.dataLoading = true
      FlowApi.getGroupPage(params)
        .then(res => {
          this.loadingStatus = false
          this.dataLoading = false
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount
            this.tableData = res.data.dataList
            this.tableData.map((item, index) => {
              this.tableData[index].binding = item.binding ? '是' : '否'
              this.tableData[index].usersInGroup =
                item.usersInGroup.length > 0 ? item.usersInGroup.join(',') : ' '
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.dataLoading = false
          this.loadingStatus = false
          this.$message.error('数据加载失败')
        })
    }
  }
}
</script>
<style>
.slotReply-upload .el-dialog {
  width: 400px;
}
</style>
</script>
<style lang="less">
.table-head {
  width: 100%;
  .el-input__suffix {
    display: none;
  }
}
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.demo-ruleForm .time {
  margin-bottom: 0;
}
</style>
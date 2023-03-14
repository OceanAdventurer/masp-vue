<template>
  <div class="margin-top-10 flow">
    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="dataLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <app-table
        :isHasButtons="isHasButtons"
        :isHasButtonIcon="isHasButtonIcon"
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>

    <el-dialog
      :title="fileType == '图片' ? '图片展示' : '文件展示'"
      :visible.sync="dialogVisible"
      width="700"
      :before-close="handleClose"
    >
      <el-image
        v-if="fileType == '图片'"
        style="width: 100%; height: 50vh"
        :src="fileUrl"
        fit="contain"
        :preview-src-list="[fileUrl]"
      ></el-image>
      <xmp
        v-if="fileType == 'XML'"
        style="width:100%;height:50vh;overflow:auto;"
        >{{ fileUrl }}</xmp
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 文件上传 -->
    <el-upload
      ref="upload"
      :action="action"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="successUpload"
      :on-error="errorUpload"
    >
    </el-upload>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import FlowApi from '@/api/flow'
import Database from '@/api/dataBase'

export default {
  name: 'user',
  mixins: [tableMixin],
  data() {
    return {
      dataLoading: false,
      searchInfo: {},
      // 操作栏宽度
      optionWidth: 300,
      // 是否显示序号
      isShowNumber: true,
      // 操作栏按钮
      isHasButtons: false,
      isHasButtonIcon: true,
      // 操作栏按钮
      buttonsName: {
        normal: ['启动', '删除', '图片', 'XML'],
        icon: ['paper-plane', 'trash', 'image', 'file-excel-o']
      },
      tableConfig: [
        {
          label: '名称',
          prop: 'name'
        },
        // {
        //   label: 'ID',
        //   prop: 'id'
        // },
        // {
        //   label: '部署Id',
        //   prop: 'deploymentId'
        // },
        {
          label: '标识',
          prop: 'key'
        },
        {
          label: '描述',
          prop: 'description'
        },
        {
          label: '版本',
          prop: 'version'
        }
      ],
      dialogVisible: false,
      fileUrl: '',
      fileType: '',
      action: '/api/bpm/bpmModel/deploy',
      isErrorUpload: true,
      linesForm: {
        airlines: [
          {
            field0: '',
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: '',
            field7: '',
            field8: '',
            field9: '',
            key: Date.now()
          }
        ]
      },
      seasonsForm: {
        airlines: [
          {
            field0: '',
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: '',
            field7: '',
            field8: '',
            key: Date.now()
          }
        ]
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        airlines: [{ required: true, message: '请输入航线', trigger: 'blur' }]
      },
      linesrules: {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      },
      seasonsrules: {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      },
      linesVisible: false,
      seasonVisible: false,
      taskId: null,
      processDefinitionKey: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loadingStatus = true
      const params = {
        processDefinitionKey: this.searchInfo.processDefinitionKey,
        processDefinitionName: this.searchInfo.processDefinitionName,
        processDefinitionResourceName: this.searchInfo
          .processDefinitionResourceName,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.dataLoading = true
      FlowApi.getbpmProcessPage(params)
        .then(res => {
          this.loadingStatus = false
          this.dataLoading = false
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount
            this.tableData = res.data.dataList
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.dataLoading = false
          this.loadingStatus = false
          this.$message.error('数据加载失败')
        })
    },
    addLines() {
      this.linesForm.airlines.push({
        field0: '',
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        key: Date.now()
      })
    },
    delLines(index) {
      this.linesForm.airlines.splice(index, 1)
    },
    delSeasonLines(index) {
      this.seasonsForm.airlines.splice(index, 1)
    },
    seasonSubmit() {
      // 表单提交
      this.$refs['seasonsForm'].validate(valid => {
        if (valid) {
          let airlines = []
          this.seasonsForm.airlines.map(e => {
            let lines = []
            let str = ''
            for (let i in e) {
              if (e[i]) {
                lines.push(e[i])
              }
            }
            lines.pop()
            str = lines.join('-')
            airlines.push(str)
          })
          let num = parseInt(airlines.length / 2)
          let sftcRows = []
          for (let i = 0; i <= num; i += 2) {
            let lis = {
              chgBefore: airlines[i],
              chgAfter: airlines[i + 1]
            }
            sftcRows.push(lis)
          }
          let sftcRowsCode3 = []
          this.seasonsForm.airlines.forEach(e => {
            sftcRowsCode3.push(e.field1)
            sftcRowsCode3.push(e.field4)
            if (e.field7 !== '') {
              sftcRowsCode3.push(e.field7)
            }
          })
          sftcRowsCode3 = Array.from(new Set(sftcRowsCode3))
          Database.enSelect({}, sftcRowsCode3).then(res => {
            let ls = {
              sftcRows: sftcRows,
              sftcRowsCode3: sftcRowsCode3,
              ztdCSGrp: res,
              comment: this.seasonsForm.description,
              title: this.seasonsForm.title
            }
            let data = 'processDefinitionKey=' + this.processDefinitionKey
            FlowApi.startbpmProcess(this.taskId, data, ls)
              .then(res => {
                if (res.success) {
                  this.seasonVisible = false
                  this.$message.success('启动成功')
                  this.getList()
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(() => {
                this.$message.error('新增失败！')
              })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
.flow {
  .Technical_rout {
    .el-form-item__content {
      width: 200px;
    }
  }
  .airlines {
    display: flex;
    .airlines-input {
      margin-right: 0.4vw;
      .el-form-item__content {
        margin-left: 0 !important;
        width: 100% !important;
      }
    }
    .addOrMin {
      margin-top: 6px;
      font-size: 22px;
      color: #999;
    }
  }
  .el-form-item__content {
    width: calc(100% - 100px) !important;
  }
  .el-image-viewer__mask {
    opacity: 1;
    background: #fff;
  }
}
</style>

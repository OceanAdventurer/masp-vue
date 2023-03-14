<template>
  <div class="margin-top-10 flow">
    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="dataLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
  .el-form-item__content {
    width: calc(100% - 100px) !important;
  }
  .el-image-viewer__mask {
    opacity: 1;
    background: #fff;
  }
  .airlines {
    display: flex;
    .addOrMin {
      margin-top: 6px;
      font-size: 22px;
      color: #999;
    }
    .airlines-input {
      margin-right: 0.4vw;
      .el-form-item__content {
        margin-left: 0 !important;
        width: 100% !important;
      }
    }
  }
  .Technical_rout {
    .el-form-item__content {
      width: 200px;
    }
  }
}
</style>

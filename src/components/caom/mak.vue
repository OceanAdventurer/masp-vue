<template>
  <div
    class="margin-top-10"
    v-loading="downLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div class="fleet-dialog">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="机场" prop="airportName">
            <el-input v-model="ruleForm.airportName"></el-input>
          </el-form-item>
          <el-form-item label="三字码" prop="code3">
            <el-input
              v-model="ruleForm.code3"
              @keyup.native="
                ruleForm.code3 = ruleForm.code3
                  .replace(/[^a-zA-Z]/g, '')
                  .toUpperCase()
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="所属战区" prop="warZone">
            <el-input v-model="ruleForm.warZone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 检索 -->
    <app-search-warp
      :hasAddSearch="false"
      :hasExport="false"
      :label-width="80"
      @subSearch="handleSearch"
      @subClear="handleClear"
      @subAdd="handleAdd"
      @hadExport="handleVersion"
    >
      <app-search-item label="航班计划:">
        <el-select v-model="version" placeholder="请选择">
          <el-option
            v-for="item in versionOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="三字码:">
        <el-input
          v-model="code3"
          @keyup.native="code3 = code3.replace(/[^a-zA-Z]/g, '').toUpperCase()"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
    </app-search-warp>

    <!-- 数据展示 -->
    <el-card class="margin-top-10">
      <app-table
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
// import UserServe from '@/api/user'
import MilitaryAirport from '@/api/militaryAirport'
import LongSchedule from '@/api/longSchedule'

// import md5 from 'blueimp-md5'

export default {
  name: 'Aircraft',
  mixins: [tableMixin],
  data() {
    return {
      versionOption: [],
      version: '',
      downLoading: false,
      title: '',
      code3: '',
      ruleFormData: {
        airportName: '',
        code3: '',
        city: '',
        warZone: ''
      },
      ruleForm: {
        airportName: '',
        code3: '',
        city: '',
        warZone: ''
      },
      rules: {
        airportName: [{ required: true, message: '请输入机场名' }],
        code3: [{ required: true, message: '请输入三字码', trigger: 'blur' }],
        city: [{ required: false, message: '请输入城市', trigger: 'blur' }]
      },
      dialogVisible: false,
      // 操作栏宽度
      optionWidth: 150,
      // 是否显示序号
      isShowNumber: false,
      // 操作栏按钮
      buttonsName: {
        normal: ['编辑', '删除'],
        icon: ['edit', 'trash']
      },
      isHasButtons: false,
      isHasButtonIcon: false,
      tableConfig: [
        {
          label: '机场',
          prop: 'airportName'
        },
        {
          label: '机型',
          prop: 'acType'
        },
        {
          label: '航班号',
          prop: 'flightNo'
        },
        {
          label: '班期',
          prop: 'frequency'
        },

        {
          label: '出发机场',
          prop: 'departureAirport'
        },
        {
          label: '到达机场',
          prop: 'arrivalAirport'
        },
        {
          label: '航线',
          prop: 'route'
        },
        {
          label: '所属战区',
          prop: 'warZone'
        }
      ]
      // params: {
      //   ...defaultSearch
      //   // ...DefaultPageInfo
      // }
    }
  },
  created() {
    this.getVersionLabel()
  },
  mounted() {},
  methods: {
    getVersionLabel() {
      LongSchedule.longScheduleVersionLabel().then(res => {
        this.versionOption = res
        this.version = res[0].value
        this.getList()
      })
    },
    async getList() {
      this.loadingStatus = true
      // console.log(DefaultPageInfo)
      const params = {
        versionId: this.version,
        code3: this.code3,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      await MilitaryAirport.mixAirportApplyPage(params)
        .then(res => {
          if (res.success) {
            this.loadingStatus = false
            this.listQueryParams.total = res.data.total
            this.tableData = res.data.list
            this.tableData.map((item, index) => {
              if (item.createdAt) {
                this.tableData[index].createdAt = this.getData(item.createdAt)
              }
              if (item.modifiedAt) {
                this.tableData[index].modifiedAt = this.getData(item.modifiedAt)
              }
            })
          } else {
            this.loadingStatus = false
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.loadingStatus = false
          this.$message.error('数据加载失败')
        })
    },
    //将时间戳转成日期
    // 新增
  }
}
</script>
<style scoped>
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.demo-ruleForm .time {
  margin-bottom: 0;
}
</style>

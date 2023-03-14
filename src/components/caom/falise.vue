<template>
  <div class="margin-top-10">
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      @subSearch="handleSearch"
      @subClear="handleClear"
      class="demo-ruleForm"
    >
      <app-search-item label="日计划对比:">
        <el-select v-model="daiVersion" placeholder="请选择">
          <el-option
            v-for="item in versionSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="航班号:">
        <el-input v-model="flightNo" clearable></el-input>
      </app-search-item>
      <!-- <app-search-item label="季中时刻对比:">
        <el-select v-model="season" placeholder="请选择">
          <el-tooltip
            v-for="item in seasonList"
            :key="item.value"
            :content="item.label"
            placement="top"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              style="width:200px"
            >
            </el-option>
          </el-tooltip>
        </el-select>
      </app-search-item> -->
    </app-search-warp>

    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="downLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <app-table
        :isHasButtons="isHasButtonIcon"
        :isHasButtonIcon="isHasButtonIcon"
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import { DefaultPageInfo } from '@/utils/table'
import SoltManage from '@/api/soltManage'
import DailyPlan from '@/api/dailyPlan'
const defaultSearch = {
  account: '',
  queryBeginTime: '',
  queryEndTime: '',
  hostName: '',
  hostIp: '',
  time: []
}

export default {
  name: 'Home',
  mixins: [tableMixin],
  data() {
    return {
      flightNo: '',
      downLoading: false,
      season: '',
      seasonList: [],
      daiVersion: '',
      versionSelectList: [],
      search: { ...defaultSearch },
      // 操作栏宽度
      optionWidth: 150,
      // 是否显示序号
      isShowNumber: false,
      //是否显示操作栏
      isHasButtonIcon: false,
      // 操作栏按钮
      buttonsName: {
        normal: ['查看', '删除', '导出']
      },
      formInline: {
        user: '',
        region: ''
      },
      tableConfig: [
        {
          label: '航班号',
          prop: 'flightNo',
          width: 150
        },
        {
          label: '机型',
          prop: 'aircraftType',
          width: 100
        },
        {
          label: '班期',
          prop: 'frequency',
          width: 150
        },
        {
          label: '开始日期',
          prop: 'beginDate'
        },
        {
          label: '结束日期',
          prop: 'endDate'
        },
        {
          label: '电报',
          prop: 'poolInfo'
        },
        {
          label: '时刻',
          prop: 'seasonInfo'
        },
        {
          label: '计划',
          prop: 'dailyInfo'
        },
        {
          label: '销售',
          prop: 'adjustAfter'
        },
        {
          label: 'FOC',
          prop: 'adjustAfter'
        }
      ],
      params: {
        ...defaultSearch,
        ...DefaultPageInfo
      }
    }
  },
  created() {
    this.getVersionSelectList()
    // this.getVersionLabel()
    // this.getAuthoritySelect()
    // this.getList()
  },
  methods: {
    async getList() {
      let params = {
        dailySchedulePlanId: this.daiVersion,
        flightNo: this.flightNo,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.downLoading = true
      await SoltManage.DBMergeplanCompare(params)
        .then(res => {
          this.downLoading = false
          console.log(res)
          if (res.success) {
            this.tableData = res.data.list.slice(0, 10)
            // this.tableData = res.data.slice(
            //   this.listQueryParams.limit * (this.listQueryParams.page - 1),
            //   this.listQueryParams.limit * this.listQueryParams.page
            // )
            this.listQueryParams.total = res.data.total
            this.tableData.map((item, index) => {
              if (item.beginDate) {
                this.tableData[index].beginDate = this.getDatas(item.beginDate)
              }
              if (item.endDate) {
                this.tableData[index].endDate = this.getDatas(item.endDate)
              }
            })
          }
        })
        .catch(() => {
          this.$message.error('失败')
          this.downLoading = false
        })
    },
    //将时间戳转成日期
    getData(timesTamp) {
      var date = new Date(timesTamp)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D =
        (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      let h =
        (date.getHours() + 1 < 10 ? '0' + date.getMonth() : date.getHours()) +
        ':'
      // date.getHours() + ':'
      let m =
        date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // date.getMinutes()
      // + ':'
      // let s = date.getSeconds()
      return Y + M + D + h + m
    },
    //将时间戳转成日期
    getDatas(timesTamp) {
      var date = new Date(timesTamp)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
      // let h =
      //   (date.getHours() + 1 < 10 ? '0' + date.getMonth() : date.getHours()) +
      //   ':'
      // let m =
      //   date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return Y + M + D
    },
    getVersionSelectList() {
      DailyPlan.versionSelect().then(res => {
        this.versionSelectList = res
      })
      // SoltManage.getrealTimeSlotChange().then(res => {
      //   this.seasonList = res
      // })
    },
    // 表格操作功能
    handleTableOption(index, row, option) {
      if (option === '编辑') {
        this.$message.warning(option)
      } else if (option === '删除') {
        this.$message.warning(option)
      }
    },
    // //换页功能
    // handleRefreshList(val) {
    //   console.log(val)
    //   console.log(this.tableDataTotal)
    //   this.tableData = this.tableDataTotal.slice(
    //     val.limit * (val.page - 1),
    //     val.limit * val.page
    //   )
    //   this.tableData.map((item, index) => {
    //     if (item.beginDate) {
    //       this.tableData[index].beginDate = this.getDatas(item.beginDate)
    //     }
    //     if (item.endDate) {
    //       this.tableData[index].endDate = this.getDatas(item.endDate)
    //     }
    //   })
    // },
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.nowVersionId = ''
      this.contrastVersionId = ''
      this.airport = ''
      this.di = ''
      this.authorityChina = ''
      this.tableDataTotal = []
      this.tableData = []
    },
    // 文件上传
    handleUpload() {},
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
.ant-table-wrapper {
  height: 100px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
.ant-table-wrapper table {
  border-bottom: 1px solid rgb(232, 232, 232);
  width: 100%;
}
.ant-table-wrapper table thead tr th {
  padding: 8px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  background: #fafafa;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
  font-size: 14px;
}
</style>
<style lang="less">
.demo-ruleForm .time .el-input--small .el-input__inner {
  padding-left: 30px !important;
}
</style>

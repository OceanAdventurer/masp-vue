<template>
  <div class="margin-top-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      :hasDownloadFile="false"
      :hasAddSearch="false"
      @subSearch="handleSearch"
      @subClear="handleClear"
    >
      <app-search-item label="机场:">
        <el-input
          v-model="airport"
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="申请:">
        <el-select v-model="apply" placeholder="请选择">
          <el-option label="YES" value="YES"></el-option>
          <el-option label="NO" value="NO"></el-option>
        </el-select>
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
import { DefaultPageInfo } from '@/utils/table'
import TrafficRights from '@/api/TrafficRights'
import LongSchedule from '@/api/longSchedule'

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
      tableDataTotal: [],
      apply: '',
      airport: '',
      versionId: '',
      versionIdList: '',
      docIdList: [],
      dialogVisible: false,
      search: { ...defaultSearch },
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
      formInline: {
        user: '',
        region: ''
      },
      tableConfig: [
        {
          label: '航季',
          prop: 'season'
        },
        {
          label: '航线',
          prop: 'route'
        },
        {
          label: '计划班次量',
          prop: 'planFlightTotal'
        },
        {
          label: '上航季计划备案量',
          prop: 'lastSeason'
        },
        {
          label: '上同航季计划备案量',
          prop: 'lastSameSeason'
        },
        {
          label: '是否北上广',
          prop: 'ifFirsTier'
        },
        {
          label: '许可类型',
          prop: 'licenseType'
        },
        {
          label: '平移班次量',
          prop: 'trend'
        },
        {
          label: '申请',
          prop: 'apply'
        }
      ],
      params: {
        ...defaultSearch,
        ...DefaultPageInfo
      }
    }
  },
  created() {
    this.getVersionLabel()
  },
  methods: {
    getVersionLabel() {
      LongSchedule.longScheduleVersionLabel().then(res => {
        this.versionId = res[0].value
        this.versionIdList = res
        this.getList()
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
    // 换页功能
    handleRefreshList(val) {
      console.log(val)
      this.tableData = this.tableDataTotal.slice(
        val.limit * (val.page - 1),
        val.limit * val.page
      )
    },
    async getList() {
      this.loadingStatus = true
      this.listQueryParams.page = 1
      // console.log(DefaultPageInfo)
      const params = {
        apply: this.apply,
        versionId: this.versionId,
        airport: this.airport,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      await TrafficRights.selectByVersionPage(params)
        .then(res => {
          if (res.success) {
            console.log(res)
            this.loadingStatus = false
            this.tableDataTotal = res.data
            this.listQueryParams.total = this.tableDataTotal.length
            this.tableData = this.tableDataTotal.slice(
              this.listQueryParams.limit * (this.listQueryParams.page - 1),
              this.listQueryParams.limit * this.listQueryParams.page
            )
            // this.listQueryParams.total = res.data.total
            // this.tableData = res.data.list
            this.tableData.map((item, index) => {
              if (item.createdAt) {
                this.tableData[index].createdAt = this.getData(item.createdAt)
              }
              if (item.modifiedAt) {
                this.tableData[index].modifiedAt = this.getData(item.modifiedAt)
              }
              if (item.effDate) {
                this.tableData[index].effDate = this.getDatas(item.effDate)
              }
              if (item.disDate) {
                this.tableData[index].disDate = this.getDatas(item.disDate)
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
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.apply = ''
      this.airport = ''
      this.getList()
    }
  }
}
</script>
<style lang="less">
.demo-ruleForm .time .el-input--small .el-input__inner {
  padding-left: 30px !important;
}
.table-head {
  width: 100%;
  .el-input__suffix {
    display: none;
  }
}
</style>
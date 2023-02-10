<template>
  <div
    v-loading="downLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div>
      <!-- 检索 -->
      <app-search-warp
        :hasAddSearch="false"
        :hasReturn="true"
        :hasClearSearch="false"
        :hasDownVersion="false"
        :label-width="80"
        @subSearch="handleSearch"
        @subClear="handleClear"
        @subAdd="handleAdd"
        @subReturn="handleReturn"
        @subVersion="handleVersion"
      >
        <app-search-item class="TF_dep">
          <el-radio-group v-model="depOrArr">
            <el-radio :label="'arr'">进港</el-radio>
            <el-radio :label="'dep'">出港</el-radio>
            <el-radio :label="'all'">全部</el-radio>
          </el-radio-group>
        </app-search-item>
        <app-search-item label="机场:">
          <el-input
            v-model="airport"
            placeholder=""
            size="small"
            :disabled="true"
            @keyup.native.enter="handleSearch"
          />
        </app-search-item>
        <app-search-item label="">
          <el-select
            v-model="codeType"
            clearable
            filterable
            placeholder="三字码"
          >
            <el-option label="三字码" value="Code3"></el-option>
            <el-option label="四字码" value="Code4"></el-option>
            <el-option label="中文" value="Chinese"></el-option>
          </el-select>
        </app-search-item>
      </app-search-warp>
      <!-- 数据展示 -->
      <el-card class="margin-top-10">
        <app-table
          :valueData="valueData"
          :ordersListData="ordersListData"
          :list-query-params.sync="listQueryParams"
          v-bind="defaultTableAttrs"
          v-on="defaultTableEvent"
          @sortTable="sortTable"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import { DefaultPageInfo } from '@/utils/table'
import DataBase from '@/api/dataBase'
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
      codeType: 'Code3',
      flightType: this.paramsData.flightType,
      flightTypeSelect: [],
      tableDataTotal: [],
      airport: this.paramsData.airport,
      depOrArr: this.paramsData.depOrArr,
      list: [],
      options: [],
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
      value: '',
      tableConfig: [
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
          label: '出发时间',
          prop: 'departureTime'
        },
        {
          label: '到达时间',
          prop: 'arrivalTime'
        },
        {
          label: '到达机场',
          prop: 'arrivalAirport'
        }
      ],
      params: {
        ...defaultSearch,
        ...DefaultPageInfo
      }
    }
  },
  props: {
    paramsData: {
      default: {},
      require: true
    }
  },
  created() {
    LongSchedule.longScheduleFlightType().then(res => {
      this.flightTypeSelect = res
    })
    this.getList()
  },
  methods: {
    // 换页功能
    handleRefreshList(val) {
      this.tableData = this.tableDataTotal.slice(
        val.limit * (val.page - 1),
        val.limit * val.page
      )
    },
    async getList() {
      this.loadingStatus = true
      console.log(this.paramsData)
      const params = {
        flightType: this.flightType.join(','),
        dbType: this.paramsData.dbType,
        versionId: this.paramsData.versionId,
        airport: this.paramsData.airport,
        depOrArr: this.depOrArr,
        week: this.paramsData.week,
        slot: this.paramsData.slot,
        codeType: this.codeType
      }
      await LongSchedule.longScheduleSlotBacktracking(params).then(res => {
        if (res.success) {
          this.loadingStatus = false
          if (res.data.length > 0) {
            this.tableDataTotal = res.data
            this.listQueryParams.total = this.tableDataTotal.length
            this.tableData = this.tableDataTotal.slice(
              this.listQueryParams.limit * (this.listQueryParams.page - 1),
              this.listQueryParams.limit * this.listQueryParams.page
            )
            if (this.tableData[0].airline) {
              this.tableData = this.tableData.map(item => {
                item.flightNo = item.airline + item.flightNo
                return item
              })
            }
          } else {
            this.tableDataTotal = []
            this.tableData = []
          }
        } else {
          this.loadingStatus = false
          this.$message.error(res.msg)
        }
      })
    },
    // 表格操作功能
    handleTableOption(index, row, option) {
      if (option === '编辑') {
        this.title = '航距编辑'
        this.dialogVisible = true
        this.ruleForm = row
      } else if (option === '删除') {
        DataBase.deleteDistance(row.id)
          .then(res => {
            if (res.success) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      }
    },
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.listQueryParams.limit = 10
      this.departureAirport = ''
      this.arrivalAirport = ''
      this.getList()
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
    // 下载
    handleVersion() {
      this.downLoading = true
      DataBase.exportDistance(this.versionId)
        .then(res => {
          let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = this.downName + '.xls'
          a.click()
          // 释放这个临时的对象objectUrl
          URL.revokeObjectURL(url)
          this.downLoading = false
        })
        .catch(() => {
          this.$message.error('下载失败')
          this.downLoading = false
        })
    },
    //返回
    handleReturn() {
      this.$emit('subReplay')
    }
  }
}
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
</style>

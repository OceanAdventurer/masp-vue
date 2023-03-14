<template>
  <div class="margin-top-10">
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      @subSearch="handleSearch"
      @subClear="handleClear"
    >
      <app-search-item label="起始:">
        <el-input
          v-model="routeBegin"
          @keyup.native="
            routeBegin = routeBegin.replace(/[^a-zA-Z]/g, '').toUpperCase()
          "
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="终点:">
        <el-input
          v-model="routeEnd"
          @keyup.native="
            routeEnd = routeEnd.replace(/[^a-zA-Z]/g, '').toUpperCase()
          "
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="航季:">
        <el-input
          v-model="season"
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
    </app-search-warp>
    <!-- 图表展示 -->
    <el-card style="width:49.5%;float:left;margin:10px 0">
      <div>
        <div>{{ routeBegin }}-{{ routeEnd }} 运力(航班)</div>
        <div id="chart" ref="chart" style="height:500px"></div>
      </div>
    </el-card>
    <el-card style="width:49.5%;float:right;margin-top:10px">
      <div>
        <div style="margin-bottom: 20px">
          {{ routeBegin }}-{{ routeEnd }} 运力贡献及结构
        </div>
        <div id="chartARJ" ref="chart" style="height:480px"></div>
      </div>
    </el-card>
    <!-- 数据展示 -->
    <el-card
      style="width:100%;margin-top:10px"
      class="margin-top-10"
      v-loading="downLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <app-table
        :isHasButtons="false"
        :isHasButtonIcon="false"
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
//import $ from 'jquery'
import echarts from 'echarts'
import tableMixin from '@/mixins/tableMixin'
import { DefaultPageInfo } from '@/utils/table'
import LongSchedule from '@/api/longSchedule'
import MarketAnalysis from '@/api/marketAnalysis'
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
      routeBegin: 'PEK',
      season: 'W19',
      routeEnd: 'SHA',
      downLoading: false,
      contrastSlotList: [],
      contrastSlot: '',
      tableDataTotal: [],
      options: [],
      authoritySelect: [],
      nowVersionId: '',
      di: '',
      authorityChina: '',
      contrastVersionId: '',
      airport: '',
      activeName: 'first',
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
          label: '航季',
          prop: 'season',
          width: 150
        },
        {
          label: '航班',
          prop: 'flightNo',
          width: 150
        },
        {
          label: '机型',
          prop: 'acType',
          width: 100
        },
        {
          label: '班期',
          prop: 'schedules',
          width: 150
        },
        {
          label: '航站',
          prop: 'airport1'
        },
        {
          label: '起飞',
          prop: 'depTime1'
        },
        {
          label: '落地',
          prop: 'arrTime1'
        },
        {
          label: '航站',
          prop: 'airport2'
        },
        {
          label: '起飞',
          prop: 'depTime2'
        },
        {
          label: '落地',
          prop: 'arrTime2'
        },
        {
          label: '航站',
          prop: 'airport3'
        }
      ],
      params: {
        ...defaultSearch,
        ...DefaultPageInfo
      }
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    initChart(data) {
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      }
      // 初始化echarts
      let dom = document.getElementById('chart')
      let myPie = echarts.init(dom)
      myPie.setOption(option)
    }
  }
}

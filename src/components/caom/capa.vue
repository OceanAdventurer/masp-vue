<template>
  <div class="margin-top-10">
    <!-- 图表展示 -->
    <el-card style="width:49.5%;float:right;margin-top:10px">
      <div>
        <div style="margin-bottom: 20px">
          {{ routeBeginCopy }}-{{ routeEndCopy }} 运力贡献及结构
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
      routeBeginCopy: 'PEK',
      season: 'W19',
      routeEnd: 'SHA',
      routeEndCopy: 'SHA',
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
      console.log(data)
      let seriesData = []
      data.value.forEach(function(item, index) {
        seriesData.push({
          value: item,
          name: data.legend[index]
        })
      })
      let option = {
        backgroundColor: '#fff',
        title: {
          x: '29%',
          y: '40%',
          textStyle: {
            fontWeight: 400,
            fontSize: 24,
            color: '#687284'
          },
          textAlign: 'center',
          text: '总数',
          // textStyle: {
          //   color: 'rgba(0,0,0,.45)',
          //   fontSize: 20,
          //   fontWeight: 'normal'
          // },
          subtext: data.total,
          subtextStyle: {
            fontSize: 32,
            color: 'rgba(0,0,0,.85)'
          }
        },
        tooltip: {
          trigger: 'item',
          show: data.tooltipShow === false ? false : true
          //   formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: '2%',
          icon: 'circle',
          align: 'left',
          selectedMode: false,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 6,
          data: data.legend,
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                height: 30,
                lineHeight: 30
              }
            }
          },
          formatter: function(name) {
            var oa = option.series[0].data
            for (var i = 0; i < option.series[0].data.length; i++) {
              if (name == oa[i].name) {
                return (
                  '{a|' +
                  name +
                  '     ' +
                  oa[i].value +
                  '     ' +
                  ((oa[i].value / data.total) * 100).toFixed(2) +
                  '%}'
                )
              }
            }
          }
        }
      }
    },
  }
}


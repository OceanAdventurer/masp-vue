<template>
  <div>
    <el-card style="margin-top: 10px">
      <!-- 查询 -->
      <el-form ref="form" :model="form" inline>
        <el-form-item label="线路" size="small">
          <el-select v-model="form.lineId" filterable clearable placeholder="请选择线路">
            <el-option v-for="item in lineList" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            <!-- <el-option v-for="item in lineList" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期" size="small">
          <el-date-picker
            v-model="form.queryweek"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="small" @click="search" :disabled="this.form.lineId == '' || this.form.queryweek == null || this.form.queryweek.length == 0">
          <i class="el-icon-search"></i>
          查询
        </el-button>
      </el-form>
      <div>
        <div>
          <PassengerFlow @showEchartsFn="showEchartsFn" :dataList="dataList"></PassengerFlow>
        </div>
        <div v-if="echartShow">
          <ShowEcharts :echartShowTitle="echartShowTitle" :dayList="dayList"></ShowEcharts>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';

var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i][0]);
    rawData[i][0] = i;
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
function renderItem(params, api) {
  var xValue = api.value(0);
  var openPoint = api.coord([xValue, api.value(1)]);
  var closePoint = api.coord([xValue, api.value(2)]);
  var lowPoint = api.coord([xValue, api.value(3)]);
  var highPoint = api.coord([xValue, api.value(4)]);
  var halfWidth = api.size([1, 0])[0] * 0.35;
  var style = api.style({
    stroke: api.visual('color')
  });
  return {
    type: 'group',
    children: [
      {
        type: 'line',
        shape: {
          x1: lowPoint[0],
          y1: lowPoint[1],
          x2: highPoint[0],
          y2: highPoint[1]
        },
        style: style
      },
      {
        type: 'line',
        shape: {
          x1: openPoint[0],
          y1: openPoint[1],
          x2: openPoint[0] - halfWidth,
          y2: openPoint[1]
        },
        style: style
      },
      {
        type: 'line',
        shape: {
          x1: closePoint[0],
          y1: closePoint[1],
          x2: closePoint[0] + halfWidth,
          y2: closePoint[1]
        },
        style: style
      }
    ]
  };
}
$.get(ROOT_PATH + '/data/asset/data/stock-DJI.json', function (rawData) {
  var data = splitData(rawData);
  myChart.setOption(
    (option = {
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        position: function (pos, params, el, elRect, size) {
          var obj = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        }
      },
      axisPointer: {
        link: [{ xAxisIndex: 'all' }]
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ['lineX', 'clear']
          }
        }
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          bottom: 150
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 98,
          end: 100,
          minValueSpan: 10
        },
        {
          show: true,
          type: 'slider',
          bottom: 60,
          start: 98,
          end: 100,
          minValueSpan: 10
        }
      ],
      series: [
        {
          name: 'Dow-Jones index',
          type: 'custom',
          renderItem: renderItem,
          dimensions: ['-', 'open', 'close', 'lowest', 'highest'],
          encode: {
            x: 0,
            y: [1, 2, 3, 4],
            tooltip: [1, 2, 3, 4]
          },
          data: data.values
        }
      ]
    }),
    true
  );
});

option && myChart.setOption(option);

import PassengerFlow from './PassengerFlow'
import ShowEcharts from './ShowEcharts'
import { WeekStatisticInfoAll } from '@/api/IntelligentAnalysis/passengerSeason'
import { acyclicLineAll } from '@/api/publicRequest'
import moment from 'moment'
export default {
  components: { PassengerFlow, ShowEcharts },
  created() {
   
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.boxEchart {
  display: flex;
  width: 100%;
  .table {
    margin-top: 100px;
    height: 100%;
    width: 30%;
  }
  .EchartStyle {
    width: 70%;
  }
}
</style>


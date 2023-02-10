<template>
  <div class="margin-top-10 flow">
    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="dataLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <div class="flex-item">
        <h4 class="text_h">时刻库</h4>
        <a-table
          size="small"
          :columns="columns"
          :pagination="false"
          :data-source="dbDate"
        >
          <template
            v-for="col in ['fri', 'mon', 'sat', 'sun', 'thu', 'tue', 'wed']"
            :slot="col"
            slot-scope="text, record"
          >
            <div :key="col">
              <div v-if="col == 'mon'">
                <div @click="getDBTimeFlow(text, record, '1')">
                  <span>{{ text }}</span>
                </div>
              </div>
              <div v-else-if="col == 'fri'">
                <div @click="getDBTimeFlow(text, record, '5')">
                  <span>{{ text }}</span>
                </div>
              </div>
              <div v-else-if="col == 'sat'">
                <div @click="getDBTimeFlow(text, record, '6')">
                  <span>{{ text }}</span>
                </div>
              </div>
              <div v-else-if="col == 'sun'">
                <div @click="getDBTimeFlow(text, record, '7')">
                  <span>{{ text }}</span>
                </div>
              </div>
            </div>
          </template>
        </a-table>
      </div>
      <div class="flex-item">
        <h4 class="text_h">差值</h4>
        <a-table
          size="small"
          :columns="columns"
          :pagination="false"
          :data-source="differenceData"
        >
        </a-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import tableMixin from "@/mixins/tableMixin";
import FlowApi from "@/api/flow";
export default {
  name: "user",
  mixins: [tableMixin],
  data() {
    return {
      dataLoading: false,
      searchInfo: {},
      // 操作栏宽度
      optionWidth: 300,
      // 是否显示序号
      fileUrl: "",
      fileType: "",
      action: "/api/bpm/bpmModel/deploy",
      isErrorUpload: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loadingStatus = true;
      const params = {
        processDefinitionKey: this.searchInfo.processDefinitionKey,
      };
      this.dataLoading = true;
      FlowApi.getbpmProcessPage(params)
        .then((res) => {
          this.loadingStatus = false;
          this.dataLoading = false;
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount;
            this.tableData = res.data.dataList;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.dataLoading = false;
          this.loadingStatus = false;
          this.$message.error("数据加载失败");
        });
    },
    addLines() {
      $.get(
        ROOT_PATH + "/data/asset/data/life-expectancy-table.json",
        function (data) {
          var sizeValue = "57%";
          var symbolSize = 2.5;
          option = {
            legend: {},
            tooltip: {},
            toolbox: {
              left: "center",
              feature: {
                dataZoom: {},
              },
            },
            grid: [
              { right: sizeValue, bottom: sizeValue },
              { left: sizeValue, bottom: sizeValue },
              { right: sizeValue, top: sizeValue },
              { left: sizeValue, top: sizeValue },
            ],
            xAxis: [
              {
                type: "value",
                gridIndex: 0,
                name: "Income",
                axisLabel: { rotate: 50, interval: 0 },
              },
              {
                type: "category",
                gridIndex: 1,
                name: "Country",
                boundaryGap: false,
                axisLabel: { rotate: 50, interval: 0 },
              },
              {
                type: "value",
                gridIndex: 2,
                name: "Income",
                axisLabel: { rotate: 50, interval: 0 },
              },
              {
                type: "value",
                gridIndex: 3,
                name: "Life Expectancy",
                axisLabel: { rotate: 50, interval: 0 },
              },
            ],
            yAxis: [
              { type: "value", gridIndex: 0, name: "Life Expectancy" },
              { type: "value", gridIndex: 1, name: "Income" },
              { type: "value", gridIndex: 2, name: "Population" },
              { type: "value", gridIndex: 3, name: "Population" },
            ],
            dataset: {
              dimensions: [
                "Income",
                "Life Expectancy",
                "Population",
                "Country",
                { name: "Year", type: "ordinal" },
              ],
              source: data,
            },
            series: [
              {
                type: "scatter",
                symbolSize: symbolSize,
                xAxisIndex: 0,
                yAxisIndex: 0,
                encode: {
                  x: "Income",
                  y: "Life Expectancy",
                  tooltip: [0, 1, 2, 3, 4],
                },
              },
              {
                type: "scatter",
                symbolSize: symbolSize,
                xAxisIndex: 1,
                yAxisIndex: 1,
                encode: {
                  x: "Country",
                  y: "Income",
                  tooltip: [0, 1, 2, 3, 4],
                },
              },
              {
                type: "scatter",
                symbolSize: symbolSize,
                xAxisIndex: 2,
                yAxisIndex: 2,
                encode: {
                  x: "Income",
                  y: "Population",
                  tooltip: [0, 1, 2, 3, 4],
                },
              },
              {
                type: "scatter",
                symbolSize: symbolSize,
                xAxisIndex: 3,
                yAxisIndex: 3,
                encode: {
                  x: "Life Expectancy",
                  y: "Population",
                  tooltip: [0, 1, 2, 3, 4],
                },
              },
            ],
          };
          myChart.setOption(option);
        }
      );
    },
    seasonSubmit() {
      // 表单提交
      this.$refs["seasonsForm"].validate((valid) => {
        if (valid) {
          let airlines = [];
          let num = parseInt(airlines.length / 2);
          let sftcRows = [];
          for (let i = 0; i <= num; i += 2) {
            let lis = {
              chgBefore: airlines[i],
              chgAfter: airlines[i + 1],
            };
            sftcRows.push(lis);
          }
          let sftcRowsCode3 = [];
          this.seasonsForm.airlines.forEach((e) => {
            sftcRowsCode3.push(e.field1);
            let data = "processDefinitionKey=" + this.processDefinitionKey;
            FlowApi.startbpmProcess(this.taskId, data, ls)
              .then((res) => {
                if (res.success) {
                  this.seasonVisible = false;
                  this.$message.success("启动成功");
                  this.getList();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(() => {
                this.$message.error("新增失败！");
              });
          });
        } else {
          return false;
        }
      });
    },
  },
};
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

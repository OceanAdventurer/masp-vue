<template>
  <div>
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>

    <el-descriptions
      class="margin-top"
      title="带边框列表"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      class="margin-top"
      title="无边框列表"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
import hlowApi from "@/api/flow";
import Mixintable from "@/mixins/tableMixin";
export default {
  name: "user",
  mixins: [Mixintable],
  data() {
    return {
      // 是否显示序号
      fileUrl: "",
      fileType: "",
      action: "/api/bpm/bpmModel/deploy",
      isErrorUpload: true,
      dataLoading: false,
      searchInfo: {},
      // 操作栏宽度
      optionWidth: 300,
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
      hlowApi.getbpmProcessPage(params)
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
      option = {
        title: {
          text: "Rainfall and Flow Relationship",
          left: "center",
        },
        grid: {
          bottom: 80,
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#505765",
            },
          },
        },
        legend: {
          data: ["Flow", "Rainfall"],
          left: 10,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85,
          },
          {
            type: "inside",
            realtime: true,
            start: 65,
            end: 85,
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: false },
            // prettier-ignore
            data: [ '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00'].map(function (str) {
                return str.replace(' ', '\n');
            }),
          },
        ],
        yAxis: [
          {
            name: "Flow(m^3/s)",
            type: "value",
          },
          {
            name: "Rainfall(mm)",
            nameLocation: "start",
            alignTicks: true,
            type: "value",
            inverse: true,
          },
        ],
        series: [
          {
            name: "Flow",
            type: "line",
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2009/9/12\n7:00",
                  },
                  {
                    xAxis: "2009/9/22\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data: [
                0.97, 0.96, 0.96, 0.95, 0.95, 0.94, 0.94, 0.94],
          },
          {
            name: "Rainfall",
            type: "line",
            yAxisIndex: 1,
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2009/9/10\n7:00",
                  },
                  {
                    xAxis: "2009/9/20\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data: [],
          },
        ],
      };
    }
  }
}
</script>
<style lang="less">
.flow {
  .airlines {
    display: flex;
    .airlines-input {
      margin-right: 0.8vw;
      .el-form-item__content {
        width: 100% !important;
        margin-left: 0 !important;
      }
    }
  }
  .el-image-viewer__mask {
    opacity: 1;
    background: #fff;
  }
  .el-form-item__content {
    width: calc(100% - 100px) !important;
  }
  .Technical_rout {
    .el-form-item__content {
      width: 200px;
    }
  }
}
</style>

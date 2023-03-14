<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import hlowApi from "@/api/flow";
export default {
  name: "user",
  data() {
    return {
      isErrorUpload: true,
      dataLoading: false,
      searchInfo: {},
      fileUrl: "",
      fileType: "",
      action: "/api/bpm/bpmModel/deploy",
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
          this.getChart()
        })
        .catch(() => {
          this.dataLoading = false;
          this.loadingStatus = false;
          this.$message.error("数据加载失败");
        });
    },
    getChart() {
      const easingFuncs = {
        linear: function (k) {
          return k;
        },
        quadraticIn: function (k) {
          return k * k;
        },
        quadraticOut: function (k) {
          return k * (2 - k);
        },
        quadraticInOut: function (k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k;
          }
          return -0.5 * (--k * (k - 2) - 1);
        },
        cubicIn: function (k) {
          return k * k * k;
        },
        cubicOut: function (k) {
          return --k * k * k + 1;
        },
        cubicInOut: function (k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
          }
          return 0.5 * ((k -= 2) * k * k + 2);
        },
        quarticIn: function (k) {
          return k * k * k * k;
        },
        quarticOut: function (k) {
          return 1 - --k * k * k * k;
        },
        quarticInOut: function (k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
          }
          return -0.5 * ((k -= 2) * k * k * k - 2);
        },
        quinticIn: function (k) {
          return k * k * k * k * k;
        },
        quinticOut: function (k) {
          return --k * k * k * k * k + 1;
        },
        sinusoidalInOut: function (k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        },
        exponentialIn: function (k) {
          return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        exponentialOut: function (k) {
          return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        elasticInOut: function (k) {
          var s;
          var a = 0.1;
          var p = 0.4;
          if (k === 0) {
            return 0;
          }
          if (k === 1) {
            return 1;
          }
          if (!a || a < 1) {
            a = 1;
            s = p / 4;
          } else {
            s = (p * Math.asin(1 / a)) / (2 * Math.PI);
          }
          if ((k *= 2) < 1) {
            return (
              -0.5 *
              (a *
                Math.pow(2, 10 * (k -= 1)) *
                Math.sin(((k - s) * (2 * Math.PI)) / p))
            );
          }
          return (
            a *
              Math.pow(2, -10 * (k -= 1)) *
              Math.sin(((k - s) * (2 * Math.PI)) / p) *
              0.5 +
            1
          );
        },
        // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
        backIn: function (k) {
          var s = 1.70158;
          return k * k * ((s + 1) * k - s);
        },
        backOut: function (k) {
          var s = 1.70158;
          return --k * k * ((s + 1) * k + s) + 1;
        },
        backInOut: function (k) {
          var s = 1.70158 * 1.525;
          if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
          }
          return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        },
        // 创建弹跳效果
        bounceIn: function (k) {
          return 1 - easingFuncs.bounceOut(1 - k);
        },
        bounceOut: function (k) {
          if (k < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
          }
        },
        bounceInOut: function (k) {
          if (k < 0.5) {
            return easingFuncs.bounceIn(k * 2) * 0.5;
          }
          return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
        }
      };
      const N_POINT = 30;
      const grids = [];
      const xAxes = [];
      const yAxes = [];
      const series = [];
      const titles = [];
      let count = 0;
      Object.keys(easingFuncs).forEach(function (easingName) {
        var easingFunc = easingFuncs[easingName];
        var data = [];
        for (var i = 0; i <= N_POINT; i++) {
          var x = i / N_POINT;
          var y = easingFunc(x);
          data.push([x, y]);
        }
        grids.push({
          show: true,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 2
        });
        xAxes.push({
          type: 'value',
          show: false,
          min: 0,
          max: 1,
          gridIndex: count
        });
        yAxes.push({
          type: 'value',
          show: false,
          min: -0.4,
          max: 1.4,
          gridIndex: count
        });
        series.push({
          name: easingName,
          type: 'line',
          xAxisIndex: count,
          yAxisIndex: count,
          data: data,
          showSymbol: false,
          animationEasing: easingName,
          animationDuration: 1000
        });
        titles.push({
          textAlign: 'center',
          text: easingName,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          }
        });
        count++;
      });
      var rowNumber = Math.ceil(Math.sqrt(count));
      grids.forEach(function (grid, idx) {
        grid.left = ((idx % rowNumber) / rowNumber) * 100 + 0.5 + '%';
        grid.top = (Math.floor(idx / rowNumber) / rowNumber) * 100 + 0.5 + '%';
        grid.width = (1 / rowNumber) * 100 - 1 + '%';
        grid.height = (1 / rowNumber) * 100 - 1 + '%';
        titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
        titles[idx].top = parseFloat(grid.top) + '%';
      });
      option = {
        title: titles.concat([
          {
            text: 'Different Easing Functions',
            top: 'bottom',
            left: 'center'
          }
        ]),
        grid: grids,
        xAxis: xAxes,
        yAxis: yAxes,
        series: series
      };
    }
  }
}
</script>
<style lang="less">
.IN_manage {
  .el-input--small .el-input__inner {
    padding-left: 30px !important;
  }
}
.demo-ruleForm .time {
  width: 100%;
  margin-bottom: 0;
}
.demo-ruleForm .el-form-item {
  width: 100%;
  display: inline-block;
}
</style>

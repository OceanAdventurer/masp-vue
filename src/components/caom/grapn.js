import React, { Component } from "react";
import echarts from "echarts";
import "echarts/map/js/china.js";
// import { capacityData, capacityData2, coordinateData, capacityDataComp, notOpen } from './dataSource';

class Graph extends Component {
  componentDidMount() {
    const { dataSource } = this.props;
    this.getMapChart(dataSource);
  }

  getMapChart = (dataSource) => {
    let optionData = this.getOption(dataSource);

    //初始化echarts实例
    let myChart = echarts.init(document.getElementById(dataSource.graphId));

    //使用制定的配置项和数据显示图表
    myChart.setOption(optionData);

    // 自适应大小
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  };

  /*
   * 图表的子选项
   */
  getOption = (dataSource) => {
    console.log(dataSource);
    dataSource.data.data.forEach((item, i) => {
      item.category = Number(item.category);
    });

    dataSource.data.link.forEach((item1, j) => {
      if (item1.source + 1 === 1 && item1.target === 1) {
        item1.value = 20000;
      } else {
        item1.value = 100;
      }
    });

    console.log("dataSource.data", dataSource.data);

    let option = {
      title: {
        text: dataSource.title,
      },
      legend: {
        data: dataSource.categories, // 此处不显示根节点OD
      },
      animationDurationUpdate: 500,
      animationEasingUpdate: "quinticInOut",

      series: [
        {
          type: "graph",
          layout: "force",
          draggable: true,
          focusNodeAdjacency: true,
          roam: true,
          categories: [
            { name: "城市对" },
            { name: dataSource.categories[0] },
            { name: dataSource.categories[1] },
            { name: dataSource.categories[2] },
          ],
          emphasis: {
            lineStyle: {
              width: 8,
            },
          },
          symbolSize: function (number) {
            number =
              number + 1 === 1 || number === 1 ? 1 : Math.log(number) * 10;
            return number;
          },
          legendHoverLink: true,
          symbol: "circle",
          force: {
            repulsion: 800,
            gravity: 0.1,
            edgeLength: [800, 10],
            layoutAnimation: true,

            // repulsion: 100,
            // edgeLength: 50
          },
          force: {
            repulsion: 800,
            gravity: 0.1,
            edgeLength: [800, 10],
            layoutAnimation: true,

            // repulsion: 100,
            // edgeLength: 50
          },
          force: {
            repulsion: 800,
            gravity: 0.1,
            edgeLength: [800, 10],
            layoutAnimation: true,

            // repulsion: 100,
            // edgeLength: 50
          },
          force: {
            repulsion: 800,
            gravity: 0.1,
            edgeLength: [800, 10],
            layoutAnimation: true,

            // repulsion: 100,
            // edgeLength: 50
          },
          tooltip: {
            formatter: function (node) {
              // 区分连线和节点，节点上额外显示其他数字
              if (!node.value) {
                return node.data.name;
              } else {
                return node.data.name + ":" + node.data.value.toFixed(2);
              }
            },
          },
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 1,
              curveness: 0.3,
              color: "source",
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          label: {
            position: "right",
            formatter: "{b}",
            textStyle: {
              fontSize: 20,
            },
          },
          data: dataSource.data.data,
          links: dataSource.data.link,
        },
      ],
    };
    return option;
  };

  handleRef = (n) => {
    this.node = n;
  };

  render() {
    let { dataSource } = this.props;

    return (
      <div>
        <div
          ref={this.handleRef}
          id={dataSource.graphId}
          style={{ height: dataSource.height }}
        />
      </div>
    );
  }
}

export default Graph;

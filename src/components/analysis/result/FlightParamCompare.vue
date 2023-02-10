<template>
  <div class="fpc-container df df-fd-r df-jc-fs">
    <!-- 时间点树 -->
    <div v-show="showTreeType === 'timePoint'" class="fpc-left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="timeTreeKeyword" @keyup.enter.native="searchTimeTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTimeTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="fpc-left-tree df df-fd-r df-f1">
        <el-tree
          ref="fpcTreeRef"
          node-key="ID"
          highlight-current
          :data="fpcTreeData"
          :props="defaultFpcTreeProps"
          :default-expanded-keys="defaultTimeExpandedKeys"
          :default-expand-all="false"
          :render-content="renderFpcContent"
          @node-click="fpcNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="timeTreeNodeDesc">说明：</span>
          <span v-show="timeTreeNodeDesc">{{timeTreeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <!-- 工程参数树 -->
    <div v-show="showTreeType === 'enginTreeType'" class="fpc-left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="gcTreeKeyword" @keyup.enter.native="searchGcTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchGcTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="fpc-left-tree df df-fd-r df-f1">
        <el-tree
          ref="fpcGcTreeRef"
          node-key="ID"
          highlight-current
          :data="fpcGcTreeData"
          :props="defaultFpcTreeProps"
          :default-expanded-keys="defaultGcExpandedKeys"
          :default-expand-all="false"
          :render-content="renderFpcContent"
          @node-click="fpcGcNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="gcTreeNodeDesc">说明：</span>
          <span v-show="gcTreeNodeDesc">{{gcTreeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <div class="fpc-middle df df-fd-c">
      <div class="flex-new-top basic-tab df df-fd-r df-f1 w100">
        <div class="fpc-content df df-fd-c">
          <el-tabs v-model="fpcContentActiveName" @tab-click="tabFpContent">
            <el-tab-pane label="可视化配置" name="fpcVsualConfig">
              <div class="m10 df df-fd-c df-jc-fs df-ai-c df-f1">

                <div class="fpc-visual-main-chart df-f1">
                  <div id="fpcVisualChatMain"></div>
                  <!-- <img style="width: 100%; height: 100%;" src="../../../assets/images/dhbcsdbchart.jpg" alt="样例视图"> -->
                </div>

                <div class="m10 df df-fd-c df-jc-fs df-ai-fs fpcVsualConfig-axis">
                  <div class="df df-fe-r df-jc-fs df-ai-c w100 pos-r">
                    <div class="header">时间点</div>

                    <div class="df df-fe-r df-jc-fs df-ai-c df-f1 pos-r" style="margin: 0 13px;">
                      <el-input v-model.number="timeBeforeSecond" size="mini" style="width: 100px;">
                        <template slot="prepend">前</template>
                        <template slot="append">秒</template>
                      </el-input>

                      <div class="visual-axis-text df-f1">{{timePointText}}</div>

                      <el-input v-model.number="timeAfterSecond" size="mini" style="width: 100px;">
                        <template slot="prepend">后</template>
                        <template slot="append">秒</template>
                      </el-input>
                    </div>

                    <el-button type="primary" size="mini" @click="toggleTreeType('timePoint')">时间节点树</el-button>
                  </div>

                  <div class="df df-fe-r df-jc-fs df-ai-c w100 mt20 pos-r">
                    <div class="header">工程参数</div>
                    <div class="visual-axis-text">{{enginParamText}}</div>
                    <el-button type="primary" size="mini" @click="toggleTreeType('enginTreeType')">工程参数树</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="fpc-right df df-fd-c">
          <el-tabs v-model="fpcRightActiveName">
            <el-tab-pane label="属性" name="attr">
              <div class="m10 df df-fd-c">
                <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt10">
                  <span class="df-f1">帧数：</span>
                  <div class="df-f3 hot-words">
                    <el-select
                      v-model="frames"
                      size="mini"
                      >
                      <el-option
                        v-for="item in [1, 2, 4, 8]"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>

              <div class="m10 df df-fd-c">
                <el-checkbox v-model="showAvgLine">显示平均值</el-checkbox>
              </div>

              <div class="m10 df df-fd-c">
                <el-checkbox v-model="showTantile25">显示25分位值</el-checkbox>
              </div>

              <div class="m10 df df-fd-c">
                <el-checkbox v-model="showTantile50">显示50分位值</el-checkbox>
              </div>

              <div class="m10 df df-fd-c">
                <el-checkbox v-model="showTantile75">显示75分位值</el-checkbox>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="fpc-bottom">
        <el-button type="primary" size="mini" @click="submitFlightParam">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import CustomTree from 'components/base/CustomTree'

export default {
  name: 'FlightParamCompare',
  props: {
    flightObj: {
      type: Object,
      // 当为数组类型设置默认值时必须使用数组返回
      default: function () {
        return {}
      }
    }
  },
  data () {
    return { // 以下是此组件的默认值
      fpcTreeData: [], // 树数据
      defaultFpcTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultTimeExpandedKeys: [], // 默认展开的节点的 key 的数组
      timeTreeKeyword: '', // 关键字搜索树数据
      timeTreeNodeDesc: '',

      fpcGcTreeData: [],
      gcTreeKeyword: '',
      gcTreeNodeDesc: '',
      defaultGcExpandedKeys: [],

      showTreeType: 'timePoint', // 树类型 enginTreeType

      timeBeforeSecond: 10, // 时间点前多少秒
      timeAfterSecond: 10, // 时间点后多少秒

      timePointValue: '', // fd2c9f950bac4cb1ac8b4b112d00d66b
      timePointText: '', // TAXI_OUT结束

      enginParamValue: '', // f5891fc9f0524c509f87221f901cd347
      enginParamText: '', // IVV

      frames: 1,
      showAvgLine: false,
      showTantile25: false,
      showTantile50: false,
      showTantile75: false,

      fpcContentActiveName: 'fpcVsualConfig',
      fpcRightActiveName: 'attr'
    }
  },
  watch: {
    // timeTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTimeTreeData()
    //   }
    // },
    // gcTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshGcTreeData()
    //   }
    // }
  },
  created () {
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('openHeaderMenuItem', 'flight_param_compare', null, null) // 修改头部显示效果,显示数据源头部

      this.getTimeTree() // dom渲染完毕加载树数据
      this.getGcTree()

      this.initFpcVisualMainChat()
    })
  },
  destroyed () {

  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },

    getTimeTree () { // 获取左侧树状数据
      this.fpcTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTimepointTree',
        method: 'get',
        params: {
          likeContent: this.timeTreeKeyword
        }
      }).then(response => {
        console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          let data = response.data.result.data
          if (data.length > 0) {
            this.fpcTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
            this.fpcTreeData = []
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultTimeExpandedKeys.push(expandedKey)
          } else {
            this.defaultTimeExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    getGcTree () { // 获取左侧树状数据
      this.fpcGcTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getGpTree',
        method: 'get',
        params: {
          likeContent: this.gcTreeKeyword
        }
      }).then(response => {
        console.log('getGcTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          let data = response.data.result.data
          if (data.length > 0) {
            this.fpcGcTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
            this.fpcGcTreeData = []
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultGcExpandedKeys.push(expandedKey)
          } else {
            this.defaultGcExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    renderFpcContent (h, {node, data, store}) { // tree自定义方法
      // const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
          // addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          // editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          // delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          // saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          // cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    refreshTimeTreeData () {
      if (!this.$util.isDefine(this.timeTreeKeyword)) {
        this.searchTimeTreeData()
      }
    },
    refreshGcTreeData () {
      if (!this.$util.isDefine(this.gcTreeKeyword)) {
        this.searchGcTreeData()
      }
    },
    searchTimeTreeData (flag) { // 关键字搜索树节点
      this.timeTreeNodeDesc = ''
      this.getTimeTree()
    },

    searchGcTreeData () {
      this.gcTreeNodeDesc = ''
      this.getGcTree()
    },

    fpcNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      console.log('FPC@fpcNodeClick:', data)

      if (data.DESCRIPTION) {
        this.timeTreeNodeDesc = data.DESCRIPTION
      } else {
        this.timeTreeNodeDesc = ''
      }

      if (!data.CHILDREN) {
        this.timePointValue = data.ID
        this.timePointText = data.NAME
      }
    },

    fpcGcNodeClick (data) {
      console.log('FPC@fpcGcNodeClick:', data)

      if (data.DESCRIPTION) {
        this.gcTreeNodeDesc = data.DESCRIPTION
      } else {
        this.gcTreeNodeDesc = ''
      }

      if (!data.CHILDREN) {
        this.enginParamValue = data.ID
        this.enginParamText = data.NAME
      }
    },

    toggleTreeType (type) {
      this.showTreeType = type
    },

    tabFpContent () {
      let that = this
      this.$nextTick(() => {
        that.initFpcVisualMainChat() // 初始化可视化配置中图表数据
      })
    },

    initFpcVisualMainChat () {
      // 初始化可视化配置图表
      document.getElementById('fpcVisualChatMain').style.width = document.getElementsByClassName('fpc-visual-main-chart')[0].offsetWidth + 'px'
      console.log(document.getElementById('fpcVisualChatMain').style.width, document.getElementById('fpcVisualChatMain').style.height)
      if (this.fpcVisualConfigCharts) {
        this.fpcVisualConfigCharts.dispose()
        console.log('销毁存在的echarts')
      }
      this.fpcVisualConfigCharts = this.$echarts.init(document.getElementById('fpcVisualChatMain'))

      this.fpcVisualConfigCharts.setOption({
        title: {
          show: false,
          // text: '图表名称',
          left: 'center'
        },
        xAxis: {
          // name: '',
          nameLocation: 'center',
          nameTextStyle: {
            color: '#999999',
            fontSize: 14
          },
          axisLabel: {
            show: true
          },
          axisTick: {
            show: false
          },
          nameGap: 10,
          data: ['', '', '', '', '', '', '', '', '', '']
        },
        yAxis: {
          // name: 'Flights',
          position: 'left',
          nameLocation: 'middle',
          nameTextStyle: {
            color: '#999999',
            fontSize: 14
          },
          nameGap: 40
        },
        series: [{
          type: 'line',
          smooth: true,
          // step: 'middle', // start | middle | end
          data: [12, 23, 34, 24, 43, 45, 67, 46, 54, 65]
        }],
        color: ['#588EE6']
      })

      this.fpcVisualConfigCharts.on('click', function (params) {
        console.log('fpcVisualConfigCharts:', params)
        console.log('bar-name:' + params.name, 'bar-data:' + params.data)
      })
      // window.onresize = this.fpcVisualConfigCharts.resize
    },

    submitFlightParam () {
      console.log('submitFlightParam####: ', this.flightObj.flights, ' | ', this.timePointValue, ' | ', this.timeBeforeSecond, ' | ', this.timeAfterSecond, ' | ', this.enginParamValue)

      if (!this.$util.isDefine(this.timePointValue)) {
        this.$message({
          type: 'warning',
          message: '请选择时间点参数！'
        })
        return false
      }
      if (!this.$util.isDefine(this.timeBeforeSecond)) {
        this.$message({
          type: 'warning',
          message: '请输入时间点偏移量！'
        })
        return false
      }
      if (!this.$util.isDefine(this.timeAfterSecond)) {
        this.$message({
          type: 'warning',
          message: '请输入时间点偏移量！'
        })
        return false
      }

      if (!(/(^[1-9]\d*$)/.test(this.timeBeforeSecond))) {
        this.$message({
          type: 'warning',
          message: '时间点偏移量应为正整数！'
        })
        return false
      }
      if (!(/(^[1-9]\d*$)/.test(this.timeAfterSecond))) {
        this.$message({
          type: 'warning',
          message: '时间点偏移量应为正整数！'
        })
        return false
      }

      if (!this.$util.isDefine(this.enginParamValue)) {
        this.$message({
          type: 'warning',
          message: '请选择工程参数！'
        })
        return false
      }
      if (this.frames === 1) {
        if ((this.timeBeforeSecond + this.timeAfterSecond) > 400) {
          this.$message({
            type: 'warning',
            message: '请确认时间点偏移总数不超过400！'
          })
          return false
        }
      } else if (this.frames === 2) {
        if ((this.timeBeforeSecond + this.timeAfterSecond) * 2 > 400) {
          this.$message({
            type: 'warning',
            message: '请确认时间点偏移总数不超过400！'
          })
          return false
        }
      } else if (this.frames === 4) {
        if ((this.timeBeforeSecond + this.timeAfterSecond) * 4 > 400) {
          this.$message({
            type: 'warning',
            message: '请确认时间点偏移总数不超过400！'
          })
          return false
        }
      } else if (this.frames === 8) {
        if ((this.timeBeforeSecond + this.timeAfterSecond) * 8 > 400) {
          this.$message({
            type: 'warning',
            message: '请确认时间点偏移总数不超过400！'
          })
          return false
        }
      }

      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (this.$util.isNotEmptyObject(submitAnalysisParams.dhbParamObj)) {
        submitAnalysisParams.dhbParamObj = {
          gpID: this.enginParamValue,
          timePointID: this.timePointValue,
          offsetStart: '-' + this.timeBeforeSecond,
          offsetEnd: this.timeAfterSecond,
          frequency: this.frames,
          enginParamText: this.enginParamText,
          timePointText: this.timePointText,
          avg: this.showAvgLine,
          tantile25: this.showTantile25,
          tantile50: this.showTantile50,
          tantile75: this.showTantile75,
          flightIds: this.flightObj.flights.join(',')
        }
      } else {
        submitAnalysisParams['dhbParamObj'] = {
          gpID: this.enginParamValue,
          timePointID: this.timePointValue,
          offsetStart: '-' + this.timeBeforeSecond,
          offsetEnd: this.timeAfterSecond,
          frequency: this.frames,
          enginParamText: this.enginParamText,
          timePointText: this.timePointText,
          avg: this.showAvgLine,
          tantile25: this.showTantile25,
          tantile50: this.showTantile50,
          tantile75: this.showTantile75,
          flightIds: this.flightObj.flights.join(',')
        }
      }

      submitAnalysisParams.isGuide = ''
      submitAnalysisParams.pageUUID = ''
      this.$bus.$emit('submitNewFileDataHandle', submitAnalysisParams, 'newFileDhbComponent')

      // this.$store.commit('SHOW_LOADING', '拼命加载中')
      // this.$axios({
      //   url: '/flightRecords/readMultiFlightData',
      //   method: 'post',
      //   data: {
      //     flightIds: this.flightObj.flights.join(','),
      //     gpID: this.enginParamValue,
      //     timePointID: this.timePointValue,
      //     offsetStart: '-' + this.timeBeforeSecond,
      //     offsetEnd: this.timeAfterSecond,
      //     frequency: this.frames
      //   }
      // }).then(response => {
      //   console.log('submitFlightParam~~~:', response)
      //   let tempObj = JSON.parse(JSON.stringify(this.flightObj))
      //   tempObj['fpcParam'] = {
      //     flightIds: this.flightObj.flights.join(','),
      //     gpID: this.enginParamValue,
      //     timePointID: this.timePointValue,
      //     offsetStart: this.timeBeforeSecond,
      //     offsetEnd: this.timeAfterSecond,
      //     frequency: this.frames,
      //     avg: this.showAvgLine,
      //     tantile25: this.showTantile25,
      //     tantile50: this.showTantile50,
      //     tantile75: this.showTantile75
      //   }
      //   tempObj['fpcParamText'] = {
      //     enginParamText: this.enginParamText,
      //     timePointText: this.timePointText
      //   }
      //   tempObj['fpcParamResult'] = response.data

      //   this.$bus.$emit('openHeaderMenuItem', 'fpc_result_chart', null, null) // 修改头部显示效果
      //   this.$bus.$emit('fpcFlightObjHandle', tempObj)

      //   this.$bus.$emit('analysisAddTab', {enName: 'fpc_result', zhName: '多航班参数对比结果', isClosable: true, parent: 'fpc_result_chart'})

      //   this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
      // }).catch(response => {
      //   this.$store.commit('HIDE_LOADING', '拼命加载中')
      //   this.$message.error('请求响应失败，请稍后重试！')
      // })
    }
  }
}
</script>

<style scoped>
.hide {
  display: none !important;
}
.fpc-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.fpc-left {
  width: 20%;
  height: 100%;
  padding-top: 15px;
  border-right: 1px solid #DDDDDD;
}
.df >>> .el-date-editor.el-input,
.df >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.fpc-left-tree >>> .el-tree__empty-text {
  left: 15px !important;
}
.tree-head-icon {
  margin: -5px 10px 10px;
}
.tree-desc {
  width: 100%;
  height: 85px;
  word-break: break-word;
  border-top: 1px solid #DDDDDD;
}
.tree-desc .content {
  margin: 8px 0 0 8px;
  height: 60px;
  overflow: auto;
}
.tree-desc .view-table-btn-info {
  margin: 8px 0 0 8px;
  height: 60px;
  overflow: auto;
}
.tree-desc .view-table-btn-info span:first-child {
  color: #666666;
  font-size: 12px;
  line-height: 14px;
}
.tree-desc .view-table-btn-info span:last-child {
  color: #333333;
  font-size: 12px;
  line-height: 16px;
}

.fpc-left-tree {
  overflow: auto;
}
.fpc-middle {
  width: 80%;
  height: 100%;
}
.flex-new-top {
  border-bottom: 1px solid #DDDDDD;
}
.fpc-content {
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
}
.fpc-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fpc-content >>> .el-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
.fpc-content >>> .el-tabs__header.is-top {
  height: 50px;
}
.fpc-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fpc-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}

.fpc-right{
  width: 30%;
  height: 100%;
  overflow: auto;
}
.fpc-bottom {
  width: 100%;
  height: 70px;
}

.fpc-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}

.fpc-visual-main-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  max-height: 72%;
  flex: 1;
  overflow: hidden;
}
.fpc-visual-main-chart #fpcVisualChatMain {
  height: 100% !important;
}
.fpc-visual-main-chart span {
  position: relative;
  top: 10px;
  left: 10px;
  color: #555555;
}
.visual-axis-text {
  border: 1px solid #DDDDDD;
  margin: 0 14px 0 0;
  padding: 5px 0 5px 10px;
  color: #9B9B9B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  margin-left: 13px;
  flex: auto;
}
.visual-axis-text:focus, .visual-axis-text:hover {
  border-color: #3A6BB9;
  color: #555555;
}
.visual-axis-line {
  width: 28px;
  height: 11px;
}
.visual-axis-line-up {
  border-top-right-radius: 5px;
  border-top: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-axis-line-down {
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-icon-exchange {
  position: relative;
  right: -98%;
}
.fpcVsualConfig-axis {
  width: 100%;
  height: 130px;
}
.fpcVsualConfig-axis .header {
  width: 60px;
}
.fpcVsualConfig-axis >>> .el-button--primary {
  height: 32px;
}

.fpc-name {
  width: 50px;
}
.chart-name {
  width: 80px;
}

.fpc-table-chart >>> .el-table::before,
.tableConfig-axis >>> .el-table::before {
  height: 0;
}

.fpcVsualConfig-axis >>> .el-input-group__append,
.fpcVsualConfig-axis >>> .el-input-group__prepend {
  padding: 0 8px;
}

.fpcVsualConfig-axis >>> .el-input__inner {
  padding: 0 4px;
  text-align: center;
}
</style>

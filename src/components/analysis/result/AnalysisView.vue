// 飞行纪录视图

<template>
  <div class="analysisView df df-fd-r df-jc-fs df-ai-fs df-f1">
    <div class="left-menu df df-fd-c df-jc-fs df-ai-fs">
      <div :class="[leftMenuItem === 'events' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="events" @click="openLeftMenu('events')">
        <img src="../../../assets/images/icon47_1.png">
        <span>事件</span>
      </div>
      <div :class="[leftMenuItem === 'flight' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="flight" @click="openLeftMenu('flight')">
        <img src="../../../assets/images/icon17_1.png">
        <span>航班</span>
      </div>
      <!-- <div :class="[leftMenuItem === 'navigation' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="navigation" @click="openLeftMenu('navigation')">
        <img src="../../../assets/images/icon21_1.png">
        <span>导航</span>
      </div>
      <div :class="[leftMenuItem === 'operation' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="operation" @click="openLeftMenu('operation')">
        <img src="../../../assets/images/icon22_1.png">
        <span>操作</span>
      </div>
      <div :class="[leftMenuItem === 'weather' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="weather" @click="openLeftMenu('weather')">
        <img src="../../../assets/images/icon23_1.png">
        <span>天气</span>
      </div> -->
      <div :class="[leftMenuItem === 'measurements' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="measurements" @click="openLeftMenu('measurements')">
        <img src="../../../assets/images/icon93_1.png">
        <span>测量</span>
      </div>
    </div>
    <div class="view-tree-content df df-fd-c df-jc-sb">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="view-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          node-key="ID"
          highlight-current
          ref="viewTreeRef"
          :data="viewTreeData"
          :props="defaultViewTreeProps"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="handleViewTreeNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info" v-show="treeNodeDesc">
          <span v-show="treeNodeDesc">说明：</span>
          <span v-show="treeNodeDesc">{{treeNodeDesc}}</span>
        </div>

        <div class="view-table-btn-info" v-show="viewNote">
          <span v-show="viewNote">说明：</span>
          <span v-show="viewNote">{{viewNote}}</span>
        </div>
      </div>
    </div>
    <div class="view-table df df-fd-c h100" style="height:99%">
      <div class="view-table-content df df-fd-r df-f1 w100">
        <div v-show="isEventTable">
          <el-table
            :data="viewTableData"
            :header-row-class-name="headerRowClassNameHandle"
            :cell-class-name="cellClassNameHandle"
            height="100%"
            style="width: 100%;"
            @row-click="viewTableRowClick">
              <el-table-column prop="columnName" label="参数项" width="150" align="left"></el-table-column>
              <el-table-column prop="columnValue" label="值" width="200" align="right">
                <template slot-scope="scope">
                  <div v-html="scope.row.columnValue"></div>
                </template>
              </el-table-column>
          </el-table>
        </div>
        <div v-show="isOtherTable">
          <el-table
            :data="viewTableData"
            :header-row-class-name="headerRowClassNameHandle"
            :cell-class-name="cellClassNameHandle"
            height="100%"
            style="width: 100%;"
            @row-click="viewTableRowClick">
              <el-table-column prop="columnName" label="参数项" width="150" align="left"></el-table-column>
              <el-table-column prop="columnValue" label="值" width="200" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="view-table-btn" style="display: none;">
        <div class="view-table-btn-info">
          <span v-show="viewNote">备注：</span>
          <span v-show="viewNote">{{viewNote}}</span>
        </div>
      </div>
    </div>
    <div class="view-chart-content df df-fd-c df-jc-fs df-ai-fs df-f3 h100 w100">
      <div class="view-chart-btn">
        <div>
          <span>{{this.currentFlightInfoData.flight_no ? this.currentFlightInfoData.flight_no : '无数据'}}</span>
          <span class="font12">({{this.currentFlightInfoData.flight_date ? this.currentFlightInfoData.flight_date : '无数据'}})</span>
        </div>
        <div>
          <span>{{this.currentFlightInfoData.ac_tail ? this.currentFlightInfoData.ac_tail : '无数据'}}</span>
        </div>
        <div>
          <!-- <span class="font12">起飞：</span> -->
          <span>{{this.currentFlightInfoData.airport_name ? this.currentFlightInfoData.airport_name : '无数据'}}</span>
          -
          <span>{{this.currentFlightInfoData.arrival_name ? this.currentFlightInfoData.arrival_name : '无数据'}}</span>
        </div>
        <!-- <div>
          <span class="font12">降落：</span>
          <span>{{this.currentFlightInfoData.arrival_name ? this.currentFlightInfoData.arrival_name : '无数据'}}</span>
        </div> -->
        <el-row>
          <el-button :type="currentView === 'viewChart' ? 'primary' : 'default'" size="mini" @click="changeView('viewChart')">高度轨迹</el-button>
          <el-button :type="currentView === 'viewMap' ? 'primary' : 'default'" size="mini" @click="changeView('viewMap')">高度地图</el-button>
        </el-row>
      </div>
      <div class="view-chart df df-f1 w100" v-show="currentView === 'viewChart'">
        <div id="viewChart" ref="viewChartInfo" class="w100 h100" v-show="flightChart"></div>

        <span v-show="!flightChart" class="viewChart-empty-text">暂无图表数据</span>
      </div>
      <div class="view-chart-map df df-f1 w100" v-show="currentView === 'viewMap'">
<!--
  // 高度地图

        <div id="viewChartMap" ref="viewChartMapInfo" class="w100 h100">
          <span class="viewChart-empty-text">暂无图表数据</span>
        </div>
-->
        <div id="viewChartMap" ref="viewChartMapInfo" class="w100 h100">
          <AnalysisHeightMap ref="analysisHeightMap" :mapLatitudeAndLongitudeData="mapLatitudeAndLongitudeData"></AnalysisHeightMap>
        </div>
      </div>
      <div class="view-pagination">
        <el-pagination
          background
          :page-size="this.pageSize"
          :pager-count="this.pagerCount"
          layout="prev, pager, next, total, jumper"
          :total="this.totalCount"
          @size-change="reloadGetFlightId"
          @current-change="reloadGetFlightId"
          :current-page="fdvCurrentPage"
          @prev-click="reloadGetFlightId"
          @next-click="reloadGetFlightId">
        </el-pagination>

        <!-- <el-button type="primary" size="mini" class="ml20 mr10" @click="postExcelFile">全参导出</el-button> -->
      </div>
    </div>
    <div class="grid-dialog">
      <el-dialog :close-on-click-modal="false"
                 :title="fdvTitle"
                 :visible.sync="dialogFDVVisible"
                 @close="closeFdvDialog"
                 @open="openFdvDialog">
        <div slot="title" class="dialog-title df df-fd-r df-jc-sb df-ai-c w100">
            <div class="header">工程参数视图</div>

            <div class="header-info">
              <span>航班号： {{this.currentFlightInfoData.flight_no ? this.currentFlightInfoData.flight_no : '无数据'}}</span>
              <span>日期： {{this.currentFlightInfoData.flight_date ? this.currentFlightInfoData.flight_date : '无数据'}}</span>
              <span>机号： {{this.currentFlightInfoData.ac_tail ? this.currentFlightInfoData.ac_tail : '无数据'}}</span>
              <span>
                {{this.currentFlightInfoData.airport_name ? this.currentFlightInfoData.airport_name : '无数据'}}
                  -
                {{this.currentFlightInfoData.arrival_name ? this.currentFlightInfoData.arrival_name : '无数据'}}
              </span>
            </div>

        </div>

        <div class="fdv-dialog-left df df-fd-c">

          <el-tabs v-model="eptLeftActiveName" class="df df-fd-c df-f1">
            <el-tab-pane label="工程参数视图" name="eptView">
              <div class="df df-fd-c df-f1">
                <div class="tree-head-icon df df-fd-r">
                  <el-input placeholder="请输入..." size="small" v-model="fdvTreeKeyword" @keyup.enter.native="fdvSearchTreeData">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="fdvSearchTreeData" style="font-size:20px;position:relative;top: 0;cursor:pointer;"></i>
                  </el-input>
                </div>
                <div class="fdv-dialog-tree df df-fd-r df-f1">
                  <el-tree
                    style="width:100%"
                    node-key="ID"
                    ref="fdvDialogTree"
                    highlight-current
                    :data="fdvDialogTreeData"
                    :props="defaultFdvProps"
                    :default-expanded-keys="fdvDefaultExpandedKeys"
                    :default-expand-all="false"
                    :render-content="renderContent"
                    @node-click="fdvHandleNodeClick">
                  </el-tree>
                </div>
                <div class="tree-desc">
                  <div class="view-table-btn-info">
                    <span v-show="fdvTreeNodeDesc">说明：</span>
                    <span v-show="fdvTreeNodeDesc">{{fdvTreeNodeDesc}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="工程参数视图模板" name="eptViewTemplet">
              <div class="df df-fd-c df-f1">
                <div class="tree-head-icon df df-fd-r">
                  <el-input placeholder="请输入..." size="small" v-model="fdvEptTreeKeyword" @keyup.enter.native="getFdvEptTreeData">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="getFdvEptTreeData" style="font-size:20px;position:relative;top: 0;cursor:pointer;"></i>
                  </el-input>
                </div>
                <div class="fdv-dialog-tree df df-fd-r df-f1">
                  <el-tree
                    style="width:100%"
                    node-key="ID"
                    ref="fdvEptDialogTree"
                    highlight-current
                    :data="fdvEptDialogTreeData"
                    :props="defaultFdvProps"
                    :default-expanded-keys="fdvEptDefaultExpandedKeys"
                    :default-expand-all="false"
                    :render-content="renderContent"
                    @node-click="fdvEptHandleNodeClick">
                  </el-tree>
                </div>
                <div class="tree-desc">
                  <div class="view-table-btn-info">
                    <span v-show="fdvEptTreeNodeDesc">说明：</span>
                    <span v-show="fdvEptTreeNodeDesc">{{fdvEptTreeNodeDesc}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>

        <div class="fdv-dialog-right df df-fd-c">
          <div class="df df-fd-r df-jc-sb df-ai-c toolbar">
            <div class="time-box">
              <span class="icon q">起</span>
              <span class="time-title">开始时间</span>
              <el-input v-model="fdvDataZoomMinTime" size="mini" @keyup.enter.native="changeFdvDataZoom" @blur="changeFdvDataZoom" placeholder="请输入..." :disabled="fdvChartDataArr.length === 0"></el-input>
              <div class="time-btns">
                <i class="el-icon-caret-top" @click="addOrCutFdvDataZoom('fdvDataZoomMin', 'add')"></i>
                <i class="el-icon-caret-bottom" @click="addOrCutFdvDataZoom('fdvDataZoomMin', 'cut')"></i>
              </div>
            </div>
            <div class="time-box">
              <span class="icon z">止</span>
              <span class="time-title">结束时间</span>
              <el-input v-model="fdvDataZoomMaxTime" size="mini" @keyup.enter.native="changeFdvDataZoom" @blur="changeFdvDataZoom" placeholder="请输入..." :disabled="fdvChartDataArr.length === 0"></el-input>
              <div class="time-btns">
                <i class="el-icon-caret-top" @click="addOrCutFdvDataZoom('fdvDataZoomMax', 'add')"></i>
                <i class="el-icon-caret-bottom" @click="addOrCutFdvDataZoom('fdvDataZoomMax', 'cut')"></i>
              </div>
            </div>
            <div style="height: 29px; margin-right: 20px;">
              <div class="flight-phase-name">飞行阶段</div>
              <el-select style="width: 150px;" v-model="flightPhaseSelectValue" size="mini" placeholder="请选择过滤条件" @change="getPrecent" :disabled="fdvChartDataArr.length === 0">
                <el-option v-for="item in flightPhaseSelectData" class="filter-attr-input" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="caiyang-rate">
              <div class="title">采样频率</div>
              <el-slider
                v-model="flightRate"
                :min="25"
                :step="25"
                show-stops
                :show-tooltip="false"

                :disabled="fdvChartDataArr.length === 0"
                @change="changeFlightRate"
                style="display: inline-block; width: 140px;"
                >
                <!-- :marks="flightRateMarks" -->
              </el-slider>

              <div class="marks-text" style="left: 72px">速度(1Hz)</div>
              <div class="marks-text" style="right: -50px;">精度(8Hz)</div>
            </div>

            <el-button
              size="small"
              type="primary"
              style="margin-left: auto; width: 40px;"
              v-if="mergeText === '合并'"
              :disabled="mergeParamList.length > 1 ? false : true"
              @click="toggleMerge">

              {{mergeText}}
            </el-button>
            <el-button
              size="small"
              type="primary"
              style="margin-left: auto; width: 40px;"
              v-else-if="mergeText === '拆分'"
              @click="toggleMerge">

              {{mergeText}}
            </el-button>

            <div class="btn-tabs">
              <span :class="{'active':this.showChartOrTable==='chartTypeTab'}" @click="changeShowChartOrTable('chartTypeTab')">图</span>
              <span :class="{'active':this.showChartOrTable==='tableTypeTab'}" @click="changeShowChartOrTable('tableTypeTab')">表</span>
            </div>
          </div>

          <div class="fdv-dialog-chart" @scroll.passive="getScroll($event)" id='resetScrollTop' v-show="showChartOrTable === 'chartTypeTab'">
            <div class="delete-button" v-show="!stateType && isShowDeleteButton">
              <el-checkbox-group v-model="mergeParamList">
              <div class="item df df-fd-c"
                v-for="(item, index) in fdvChartDataArr"
                :key="index"
                :style="{top: 160 * index + 80 + 'px'}"
                >
                <i class="el-icon-circle-close" @click="deleteFdvChartByName(item.legend)"></i>

                <el-checkbox :label="item.legend instanceof Array ? item.legend.join('|') : item.legend" @change="changeCheckBox($event, item.legend)"></el-checkbox>
              </div>
              </el-checkbox-group>
            </div>

            <div id="fdvChartInfoBox" ref="fdvChartInfoBox" class="w100 h100">
              <div class="view-chart-btn" id="photoInfo" style="display: none;">
                <div>
                  <span>{{this.currentFlightInfoData.flight_no ? this.currentFlightInfoData.flight_no : '无数据'}}</span>
                  <span class="font12">({{this.currentFlightInfoData.flight_date ? this.currentFlightInfoData.flight_date : '无数据'}})</span>
                </div>
                <div>
                  <span>{{this.currentFlightInfoData.ac_tail ? this.currentFlightInfoData.ac_tail : '无数据'}}</span>
                </div>
                <div>
                  <span>{{this.currentFlightInfoData.airport_name ? this.currentFlightInfoData.airport_name : '无数据'}}</span>
                  -
                  <span>{{this.currentFlightInfoData.arrival_name ? this.currentFlightInfoData.arrival_name : '无数据'}}</span>
                </div>
              </div>
              <div id="fdvChartInfo" class="w100 h100"
                  @mousedown="changeIsDataZoom"
                  @mousewheel="changeZoomOnMouseWheel($event)"
                  @click.stop.prevent
                  @mousedown.stop.prevent
                  @mouseup.stop.prevent
                  @mouseover.stop.prevent
                  @mousewheel.stop.prevent>
              </div>
            </div>
            <span class="view-chart-empty-text" v-show="fdvChartDataArr.length === 0">暂无数据</span>
          </div>
          <div class="fdv-dialog-table" v-show="showChartOrTable === 'tableTypeTab'">
            <div class="df df-f1" @click.stop.prevent>
              <el-table
                ref="fdvTable"
                :key="tableKey"
                :data="fdvDialogTableDataList.slice((fdvDialogCurrentPage - 1) * fdvDialogPageSize, fdvDialogCurrentPage * fdvDialogPageSize)"
                :header-row-class-name="headerRowClassNameHandle"
                :cell-class-name="cellClassNameHandle"
                height="100%"
                style="width: 100%;"
                @row-dblclick="showCurrentTime"
                >
                <!--
                @header-click="fdvDialogTableHeaderHandle"
                -->
                <el-table-column
                  v-for="(col, index) in fdvDialogColumnData"
                  :key="col.label + index"
                  :prop="col.prop"
                  :label="col.label"
                  title="删除此列">
                </el-table-column>
              </el-table>
            </div>
            <div class="fdv-dialog-pagination">
              <el-pagination
                background
                :key="tablePageKey"
                @current-change="fdvDialogTableCurrentChange"
                :current-page="fdvDialogCurrentPage"
                :page-size="fdvDialogPageSize"
                layout="prev, pager, next, total, jumper"
                :total="fdvDialogTableDataList.length">
              </el-pagination>
            </div>
          </div>
          <div class="file-new-bottom">
            <el-pagination
              background
              :page-size="this.pageSize"
              :pager-count="this.pagerCount"
              layout="prev, pager, next, total, jumper"
              :total="this.totalCount"
              @size-change="reloadGetFlightId"
              @current-change="reloadGetFlightId"
              :current-page="fdvCurrentPage"
              @prev-click="reloadGetFlightId"
              @next-click="reloadGetFlightId">
            </el-pagination>

            <el-button type="primary" v-show='!stateType' @click="saveFdvChartName">保存</el-button>
            <el-button :disabled="exportBtnDisabled" @click.stop="exportFdvChartName">导出</el-button>
            <!-- <el-button icon="el-icon-download" circle type="mini" @click="saveImage('fdvChartInfo', 'dem')"></el-button> -->
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="analysis_view_dialog">
      <el-dialog :close-on-click-modal="false"
                 title="数据清洗"
                 :visible.sync="dataCleanDiaShow"
                 @close="closeFdvDialog('data_clean')"
                 @open="openDataDialog">
                 <!-- width="500px" -->
        <el-form label-width="120px" :rules="cleanDataRules" ref='cleanDataRef' :model='cleanDataForm'>
          <h5>自定义任务名称</h5>
          <el-form-item label="任务名称" prop="taskName">
            <el-input v-model="cleanDataForm.taskName" placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <h5>按缺失值补全方法</h5>
          <el-form-item label='补全方法' prop='imputationValue'>
            <el-select v-model='cleanDataForm.imputationValue'>
              <el-option label="线性填充" value="lfill"></el-option>
              <el-option label="后向填充" value="bfill"></el-option>
              <el-option label="前向填充" value="ffill"></el-option>
            </el-select>
          </el-form-item>
          <h5>按异常值检测与处理方法</h5>
          <el-form-item label='异常值检测方法' prop='outlierDetection'>
            <el-select v-model='cleanDataForm.outlierDetection'>
              <el-option label="统计方法检测" value="3sigma"></el-option>
              <el-option label="聚类方法检测" value="Lof"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label='异常值检测范围' prop='outlierDetectionRange'>
            <el-select v-model='cleanDataForm.outlierDetectionRange'>
              <el-option label="默认" value=""></el-option>
              <el-option label="全局范围检测" value="global"></el-option>
              <el-option label="各个飞行阶段内部检测" value="phase’"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label='异常值处理方法' prop='outliersHandling'>
            <el-select v-model='cleanDataForm.outliersHandling'>
              <el-option label="线性填充" value="lfill"></el-option>
              <el-option label="后向填充" value="bfill"></el-option>
              <el-option label="前向填充" value="ffill"></el-option>
            </el-select>
          </el-form-item>
          <h5>矩阵参数</h5>
          <el-form-item label='矩阵参数Q' prop='matrixParaQ'>
            <el-input type="number" v-model='cleanDataForm.matrixParaQ'></el-input>
          </el-form-item>
          <el-form-item label='矩阵参数R' prop='matrixParaR'>
            <el-input type="number" v-model='cleanDataForm.matrixParaR'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="closeFdvDialog('data_clean')">取消</el-button>
            <el-button @click="cleanData('cleanDataRef')" type='primary'>开始清洗</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import CustomTree from 'components/base/CustomTree'
import '../../../../static/js/bmap.min.js'

const AnalysisHeightMap = () => import('components/analysis/result/AnalysisHeightMap')

export default {
  name: 'AnalysisView',
  props: { // 属性定义
    activeTabName: { // 当前激活的tab名字
      type: String
    }
  },
  data () {
    // var validateParam = (rule, value, callback) => {
    //   console.log(value, 'value---test')
    //   let regex = /^-?\d+(\.\d+)?$/
    //   if (value === '') {
    //     callback(new Error('请输入矩阵参数值'))
    //   } else if (!regex.test(value)) {
    //   console.log(value, 'value---test')
    //     callback(new Error('矩阵参数只能是数字'))
    //   } else {
    //   console.log(value, 'value---test')
    //     callback()
    //   }
    // }
    return {
      leftMenuItem: 'events', // 默认显示的图标
      exportBtnDisabled: false,
      menuItemClass: 'left-menu-item df df-fd-c df-jc-c df-ai-c', // 默认的图标样式
      treeKeyword: '', // 树关键字查询
      treeNodeDesc: '',
      fdvTreeNodeDesc: '',
      fdvEptTreeNodeDesc: '',
      pageSize: 1, // 每页显示条目数
      pagerCount: 5, // 页码按钮的数量
      totalCount: 0, // 总条目数
      fdvCurrentPage: 1,
      viewTreeData: [], // 某个类型树数据
      viewTreeDataObj: { // 所有树数据
        'events': [], // 事件
        'flight': [], // 航班
        'navigation': [], // 导航
        'operation': [], // 操作
        'weather': [], // 天气
        'measurements': [] // 测量
      },
      defaultViewTreeProps: { // 树默认的属性名称
        children: 'CHILDREN',
        label: 'NAME'
      },
      viewTableData: [], // 表格数据
      currentFlightInfoData: {}, // 当前航班信息
      currentFlightId: '', // 当前航班id
      currentNodeId: '', // 当前点击节点的编号
      currentNodeName: '', // 当前点击节点的名字
      currentColumnName: '', // 当前节点的columnName
      currentTableIndex: '', // 当前点击节点的tableIndex
      currentColumnIndex: '', // 当前点击节点的columnIndex
      currentDataSourceName: '', //当前节点的DataSource_Name
      currentVerNo: '', // 已有事件特殊值
      currentFileNo: '', // 已有事件特殊值
      currentBelongStation: '',
      chartAxisArrData: [], // 临时存储图表的数据
      chartXAxisArrData: [],
      chartYAxisArrData: [],
      flightChart: '', // 默认图表
      flightChartMap: '', // 默认图表-->地图
      isLoadFlightChart: true, // 是否首次加载飞行记录视图图表数据
      isEventTable: true, // 事件节点对应表格的默认状态
      isOtherTable: false, // 其他节点对应表格的默认状态
      dimentionObj: { // 事件，测量详情参数类型
        'events': 5,
        'measurements': 3
      },
      dialogFDVVisible: false,
      defaultFdvProps: { // fdv树默认的属性名称
        children: 'CHILDREN',
        label: 'NAME'
      },
      eptLeftActiveName: 'eptView',
      fdvDefaultExpandedKeys: [],
      fdvEptDefaultExpandedKeys: [],
      fdvTreeKeyword: '', // FDV树关键字查询
      fdvEptTreeKeyword: '',
      fdvEptDialogTreeData: [],
      fdvDialogTreeData: [], // FDV数据
      fdvChartDataArr: [], // fdv图表数据
      fdvChart: '', // fdv图表
      listNameArr: [], // 查询时候name当做参数传入
      listIDArr: [],
      currentFdvTreeNodeName: '', // 当前点击的fdv树节点
      isShowDeleteButton: false, // 是否显示删除图表的按钮
      coordRangeArr: [],
      currentView: 'viewChart', // 用于控制两个被展示图表的切换，viewMap：显示高度地图，viewChart：显示高度轨迹
      currentEventRowItem: {},
      exploreData: {},
      exploreTimeData: {},
      mapLatitudeAndLongitudeData: [], // 地图中的经纬度数据
      mapEventData: [], // 地图中的事件数据
      eventDataIndex: '', // 记录已被高亮显示的事件点，用于在取消高亮显示时定位，定位应该取消哪个点
      viewNote: '', // 备注
      flightPhaseSelectValue: '', // 区间下拉框默认值
      checkList: [],
      flightPhaseSelectData: [
        {value: 'all', label: '全航段'},
        {value: '1', label: 'Engine Stopped'},
        {value: '2', label: 'Taxi Out'},
        {value: '3', label: 'Take Off'},
        {value: '4', label: 'Rejected Take Off'},
        {value: '5', label: '2nd Segment'},
        {value: '6', label: 'Initial Climb'},
        {value: '7', label: 'Climb'},
        {value: '8', label: 'Cruise'},
        {value: '9', label: 'Descent'},
        {value: '10', label: 'Approach'},
        {value: '11', label: 'Final Approach'},
        {value: '12', label: 'Landing'},
        {value: '13', label: 'Go Around'},
        {value: '14', label: 'Taxi In'}
        // {value: 'custom', label: '自定义'}
      ],
      chartInfoTool: false,
      currenTime: 0,
      fdvDataZoomMin: 5, // fdv缩放区间默认最小值
      fdvDataZoomMinTime: 0,
      fdvDataZoomMax: 30, // fdv缩放区间默认最大值
      fdvDataZoomMaxTime: 0,
      flightRate: 0,
      flightRateValue: 1,
      flightRateMarks: {
        0: '速度',
        100: '精度'
      },
      mergeText: '合并',
      tempMergeParamList: [],
      mergeParamList: [],
      tableKey: 0,
      tablePageKey: 0,
      fdvDataZoom: [], // fdv缩放组件索引
      mapCenterLangLatp: [], // 地图默认的经纬度
      showChartOrTable: 'chartTypeTab', // 显示图表还是表格 默认显示图表 chart:图表， table:表格
      isChangeDataZoom: false,
      fdvDialogTableDataList: [],
      fdvDialogTableData: [], // fdvDialog中表格数据
      fdvDialogColumnData: [], // fdvDialog中表格的表头数据
      fdvDialogCurrentPage: 1, // fdvDialog中表格的当前页码
      fdvDialogPageSize: 100, // fdvDialog中表格每页显示的数据量
      version_no_before: '',
      fdvTreeKeyword_brfore: '',
      indexInterval: 5,
      fdvChartDataArrCopy: [],
      mergeType: '',
      dataCleanDiaShow: false, // 数据清洗对话框是否展示
      cleanDataForm: {
        taskName: '', // 自定义任务名称可不填
        imputationValue: 'lfill', // 缺失补全法
        outlierDetection: '3sigma', // 异常值检测方法
        // outlierDetectionRange: '', // 异常值检测范围
        matrixParaQ: 0.00005, // 矩阵参数q,有默认值
        matrixParaR: 0.0001, // 矩阵参数r,有默认值
        outliersHandling: 'lfill'// 异常值处理方法
      },
      cleanDataRules: {
        imputationValue: [{ required: true, message: '请选择补全方法', trigger: 'blur' }],
        outlierDetection: [{ required: true, message: '请选择异常值检测方法', trigger: 'blur' }],
        matrixParaQ: [{ required: true, message: '请输入矩阵参数值', trigger: 'blur' }],
        matrixParaR: [{ required: true, message: '请输入矩阵参数值', trigger: 'blur' }],
        outliersHandling: [{ required: true, message: '请选择异常值处理方法', trigger: 'blur' }]
      },
      stateType: '' // 页面是否可编辑
    }
  },
  components: {
    AnalysisHeightMap
  },
  computed: {
    fdvTitle () { // 根据航班编号显示
      return '工程参数视图(航班id：' + this.currentFlightId + ')'
    }
  },
  watch: {
    // treeKeyword (val) { // 树节点关键字
    //   this.$refs.viewTreeRef.filter(val)
    // },
    // fdvTreeKeyword (val) { // 树节点关键字
    //   this.$refs.fdvDialogTree.filter(val)
    // },
    // fdvCurrentPage (newVal, oldVal) {
    //   this.indexInterval = 9999
    //   console.log(newVal)
    //   if (newVal === oldVal) {
    //     return false
    //   }

    //   if (newVal > 999) {
    //     this.pagerCount = 7
    //   } else if (newVal > 99) {
    //     this.pagerCount = 9
    //   } else {
    //     this.pagerCount = 11
    //   }
    // },
    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },

    // fdvTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshFdvTreeData()
    //   }
    // },
    // fdvEptTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshFdvEptTreeData()
    //   }
    // },
    treeNodeDesc (val) {
      if (this.$util.isDefine(val)) {
        this.viewNote = ''
      }
    },
    fdvDialogCurrentPage (val) {
      if (val < 1) {
        this.fdvDialogCurrentPage = 1
      }
    },
    flightRate (val) {
      if (val === 0 || val === 25) {
        this.flightRateValue = 1
      } else if (val === 50) {
        this.flightRateValue = 2
      } else if (val === 75) {
        this.flightRateValue = 4
      } else if (val === 100) {
        this.flightRateValue = 8
      } else {
        this.flightRateValue = 1
      }
    },
    viewNote (val) {
      if (this.$util.isDefine(val)) {
        this.treeNodeDesc = ''
      }
    },
    currentView (newVal, oldVal) {
      console.log(newVal, oldVal)
      if (this.$util.isDefine(newVal) && newVal !== oldVal) {
        if (newVal === 'viewMap') {
          if (this.flightChartMap) {
            this.flightChartMap.dispose()
            console.log('在renderNavigationChart中调用销毁存在的flightChartMap')
          }
          setTimeout(() => {
            this.renderNavigationChart()
          }, 20)
        }
      }
    },
    fdvDataZoomMinTime (newVal, oldVal) {
      this.fdvDialogCurrentPage = 1
      let tempArr = JSON.parse(JSON.stringify(this.fdvDialogTableData))
      let len = (parseInt(this.fdvDataZoomMaxTime) - parseInt(newVal)) * this.flightRateValue
      this.fdvDialogTableDataList = tempArr.splice(parseInt(newVal * this.flightRateValue), len)
    },
    fdvDataZoomMaxTime (newVal, oldVal) {
      this.fdvDialogCurrentPage = 1
      let tempArr = JSON.parse(JSON.stringify(this.fdvDialogTableData))
      let len = (parseInt(newVal) - parseInt(this.fdvDataZoomMinTime)) * this.flightRateValue
      this.fdvDialogTableDataList = tempArr.splice(parseInt(this.fdvDataZoomMinTime * this.flightRateValue), len)
    }
  },
  created () {
    this.stateType = this.$store.state.modelPageType
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.flightInfoData)) {
        let tempDataObj = this.$store.state.analysisResultAllData.flightInfoData
        this.totalCount = parseInt(this.$store.state.analysisResultAllData.flightPageCount) // 点击航班菜单时，把图表下分析总数重新赋值
        this.currentFlightInfoData = tempDataObj
        if (this.$util.isDefine(tempDataObj.flightid)) {
          this.currentFlightId = tempDataObj.flightid
        } else {
          this.currentFlightId = ''
        }
        // TODO: 飞行记录视图按钮
        this.getCompnentAllHandle()
      } else {
        this.currentFlightInfoData = {}
        this.currentFlightId = ''
      }
    })

    const that = this
    this.$bus.$on('showAnalysisViewDialog', () => { // 接收显示表格右侧dom事件
      that.dialogFDVVisible = true
    })

    this.$bus.$on('allParamsExport', () => { // 接收显示表格右侧dom事件
      that.postExcelFile()
    })
    this.$bus.$on('analysis_view_clean_openDia', () => {
      that.dataCleanDiaShow = true
    })
    this.$bus.$on('reloadViewChart', () => { // 重新加载图表
      if (that.isLoadFlightChart) {
        setTimeout(() => {
          that.isLoadFlightChart = false // 再次切换tab时不重新渲染飞行记录视图的图表
          that.getCompnentAllHandle() // 加载树,高度轨迹，高度地图三个数据
        }, 20)
      }
    })

    window.addEventListener('resize', function () {
      setTimeout(() => {
        if (that.flightChart) that.flightChart.resize()
        if (that.fdvChart) that.fdvChart.resize()
      }, 50)
    })

    document.getElementById('app').addEventListener('click', (e) => { // 点击logo重置图表大小
        setTimeout(() => {
          if (document.getElementById('analysisContent') && document.getElementById('analysis_result')) {
            if (document.getElementById('analysisContent').style.display !== 'none' &&
              document.getElementById('analysis_result').style.display !== 'none' &&
              this.activeTabName === 'flightRecordView') {
              console.log('AnalysisView', document.getElementById('analysis_result').style.display, document.getElementById('flightRecordView').style.display)
              let currentId = this.currentView
              if (currentId === 'viewChart') {
                this.resetViewAndMapChartSize('viewChart') // 重置图表大小
                if (that.flightChart) {
                  try {
                    that.flightChart.resize()
                  } catch (error) {
                    console.log(error.message)
                  }
                }
              } else {
                // this.resetViewAndMapChartSize('viewChartMap') // 重置图表大小
                // if (that.flightChartMap) {
                //   that.flightChartMap.resize()
                // }
              }
            }
          }
        }, 50)
      }
    )
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('showAnalysisViewDialog') // 移除自定义事件监听器。
    this.$bus.$off('allParamsExport') // 移除自定义事件监听器。
    this.$bus.$off('reloadViewChart') // 移除自定义事件监听器。
  },
  methods: {
    headerRowClassNameHandle (row) { // 钻取页面表格头部样式
      return 'view_header_row_class'
    },
    cellClassNameHandle ({row, column, rowIndex, columnIndex}) { // 钻取页面表格样式
      if (columnIndex === 0) {
        return 'view_cell_class'
      } else {
        return ''
      }
    },
    openLeftMenu (menuType) { // 点击左侧导航获取相应的树数据且设置显示效果
      this.leftMenuItem = menuType // 设置显示效果
      this.viewTableData = [] // 清空当前表格数据
      this.treeNodeDesc = ''
      this.viewNote = '' // 清空备注的数据
      if (this.viewTreeDataObj[menuType] !== '' && this.viewTreeDataObj[menuType].length > 0) { // 存在则显示数据
        this.viewTreeData = this.viewTreeDataObj[menuType] // 获取树数据
      } else {
        this.viewTreeData = []
      }

      if (menuType === 'events') {
        this.isEventTable = true
        this.isOtherTable = false
      } else {
        this.isEventTable = false
        this.isOtherTable = true
      }
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: true, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: true // 目录是否显示更多按钮
        },
        on: { // 绑定方法
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    openDataDialog () {
      this.dataCleanDiaShow = true
      this.cleanDataForm = {
        taskName: '',
        imputationValue: 'lfill',
        outlierDetection: '3sigma',
        matrixParaQ: 0.00005,
        matrixParaR: 0.0001,
        outliersHandling: 'lfill'
      }
    },
    cleanData (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
          this.$axios({
            url: '/apm/clean',
            method: 'get',
            params: {
              name: this.cleanDataForm.taskName,
              paramBqff: this.cleanDataForm.imputationValue,
              paramQ: this.cleanDataForm.matrixParaQ,
              paramR: this.cleanDataForm.matrixParaR,
              paramYczclff: this.cleanDataForm.outliersHandling,
              paramYczjcff: this.cleanDataForm.outlierDetection,
              fileNo: this.currentFlightInfoData.file_no
            }
          }).then(res => {
            this.$store.commit('HIDE_LOADING', '加载完毕')
            if (res.data.status === '0') {
              this.dataCleanDiaShow = false
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            }
          }).catch(err => {
            this.$store.commit('HIDE_LOADING', '加载完毕')
            console.log(err)
          })
        } else {
          console.log('err submit')
        }
      })
    },
    toggleMerge () {
      if (this.mergeText === '合并') {
        if (this.mergeParamList.length > 1) {
          console.log(this.fdvChartDataArrCopy)
          if (this.mergeType !== 'FirstMergr') {
            this.fdvChartDataArr = this.fdvChartDataArrCopy
            this.indexInterval = 9999
            this.renderFdvChart()
            this.mergeType = 'FirstMergr'
          } else {
            this.renderFdvChart()
          }
          // this.fdvChartDataArr = this.fdvChartDataArrCopy
          // this.indexInterval = 9999
          // this.mergeText = '拆分'
          this.mergeParamList = []
          // this.tempMergeParamList = []
        } else {
          this.$message({
            type: 'warning',
            message: '请选择多条记录！'
          })
        }
      } else {
        // this.mergeText = '合并'
        this.renderFdvChart()

        this.mergeParamList = []
        // this.tempMergeParamList = []
      }
    },
    changeCheckBox (e, legend) {
      console.log(e, '  ', legend)

      if (this.mergeParamList.length === 1 && legend instanceof Array && legend.length > 0) {
        this.mergeText = '拆分'
      } else {
        this.mergeText = '合并'
      }
    },
    changeView (type) { // 地图和轨迹切换效果
      this.currentView = type
    },
    viewTableRowClick (row, event, column) {
      console.log('viewTableRowClick~~@@: ', row, event, column)
      this.treeNodeDesc = ''
      this.viewNote = ''
      let pieceList = []

      let begIndex = 0
      let tempIndex = 0
      console.log(this.currentView)
      if (this.currentView === 'viewChart') { // 图表
        let tempType = row.type
        if (row.columnValue === '未发生') {
          this.renderFlightChart()
          return false
        }
        if (tempType === 'events') {
          let events = row.eventList

          tempIndex = this.flightChart.getOption().xAxis[0].data.length

          if (this.$util.isDefine(events) && events.length > 0) {
            begIndex = parseFloat(events[0].begin)
            events.forEach((item, index) => {
              pieceList.push({
                gte: parseFloat(item.begin),
                lte: parseFloat(item.end),
                color: 'red'
              })
            })
          } else {
            pieceList.push({
              gte: 0,
              lte: 0,
              color: 'red'
            })
          }
        }

        if (tempType === 'event') {
          let beginTime = this.$moment(row.begin).format('HH:mm:ss')
          let endTime = this.$moment(row.end).format('HH:mm:ss')
          let beginFrame = this.exploreTimeData[beginTime]
          let endFrame = this.exploreTimeData[endTime]

          let endIndex = 0

          for (let item in this.exploreData) {
            if (parseFloat(item) === parseFloat(beginFrame)) {
              begIndex = tempIndex
              console.log('index: ' + parseFloat(item) + '  ' + parseFloat(beginFrame))
            } else if (parseFloat(item) === parseFloat(endFrame)) {
              endIndex = tempIndex
              console.log('index: ' + parseFloat(item) + '  ' + parseFloat(endFrame))
            }
            tempIndex++
          }
          if (beginTime === endTime) {
            endIndex = begIndex
          }

          // console.log(beginTime + '\t' + endTime + '\t' + beginFrame + '\t' + endFrame)
          // console.log(begIndex + '\t' + endIndex + '\t' + parseInt(begIndex / tempIndex * 100))

          pieceList.push({
            gte: begIndex,
            lte: endIndex,
            color: 'red'
          })
        }
        if (tempType !== 'events') {
          this.currentEventRowItem = row
          pieceList.push({
              gte: 0,
              lte: 0,
              color: 'red'
            })
        }
        console.log(this.currentEventRowItem, row)
        console.log(pieceList)
        if (JSON.stringify(this.currentEventRowItem.columnValue) === JSON.stringify(row.columnValue)) {
          this.flightChart && this.flightChart.setOption({
            visualMap: {
              pieces: pieceList
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: 0,
                end: 100
              },
              {
                type: 'inside',
                throttle: 100
              }]
          })
          this.flightChart && this.flightChart.dispatchAction({
            type: 'hideTip'
          })

          this.currentEventRowItem = {}
        } else {
          this.flightChart && this.flightChart.setOption({
            visualMap: {
              // pieces: [ {
              //   gte: begIndex,
              //   lte: endIndex,
              //   color: 'red'
              // } ]
              pieces: pieceList
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: parseInt(begIndex / tempIndex * 100),
                end: parseInt(begIndex / tempIndex * 100) + 2
              },
              {
                type: 'inside',
                throttle: 100
              }
            ]
          })
          setTimeout(() => { // 高度轨迹事件提示
            this.flightChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              // position: [10, 10],
              dataIndex: begIndex
            })
          }, 1000)

          this.currentEventRowItem = row
        }

        // this.coordRangeArr = [row.begin, row.end]
        // this.flightChart.dispatchAction({
        //   type: 'brush',
        //   areas: [
        //     {
        //       brushType: 'lineX',
        //       coordRange: [parseFloat(row.begin), parseFloat(row.end)],
        //       xAxisIndex: 0
        //     }
        //   ]
        // })
      } else { // 地图
        const that = this
        if (this.$util.isDefine(that.currentNodeId) && this.leftMenuItem === 'events') { // 只有事件
          if (this.mapEventData.length > 0) {
            let tempDataIndex = 0
            this.mapEventData.forEach((item, index) => {
              if (item.id === that.currentNodeId) {
                tempDataIndex = index
                console.log(tempDataIndex)
              }
            })
            // 取消之前高亮的图形
            this.flightChartMap.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: that.eventDataIndex
            })
            this.eventDataIndex = tempDataIndex // 重新赋值新的事件索引
            //高亮显示图形
            this.flightChartMap.dispatchAction({
              type: 'highlight',
              seriesIndex: 1,
              dataIndex: tempDataIndex
            })
            //显示提示内容
            this.flightChartMap.dispatchAction({
              type: 'showTip',
              seriesIndex: 1,
              dataIndex: tempDataIndex
            })
          }
        }
      }
      this.viewNote = row.dimentionDescription ? row.dimentionDescription : '' // 显示备注    '暂无备注数据'
    },
    handleViewTreeNodeClick (data, currenTreeNode, treeNode) { // 点击树节点查询对应的表格数据
      console.log('handleViewTreeNodeClick:::', data, currenTreeNode, treeNode)
      this.treeNodeDesc = ''
      this.viewNote = ''

      if (data.CHILDREN && !currenTreeNode.expanded) {
        return false
      }

      if (!data.CHILDREN) {
        this.currentNodeId = data.ID // 当前节点编号，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
        if (this.leftMenuItem === 'events' || this.leftMenuItem === 'measurements') {
          this.currentNodeName = data.NAME // 当前节点名字，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentTableIndex = data.RESULT_TABLE_INDEX // 当前节点表格索引，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentColumnIndex = data.RESULT_COLUMN_INDEX // 当前节点列索引，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentVerNo = data.VERNO // 已有事件特殊传值
          this.currentFileNo = data.FILENO // 已有事件特殊传值
          this.currentBelongStation = data.BELONGSTATION

          if (this.leftMenuItem === 'events') {
            let type = data.TYPE ? data.TYPE : this.dimentionObj[this.leftMenuItem]
            this.getDimentionById(data.NAME, data.RESULT_TABLE_INDEX, data.RESULT_COLUMN_INDEX, type, data.ID, data.VERNO, data.FILENO, data.BELONGSTATION)
          } else {
            this.getDimentionById(data.NAME, data.RESULT_TABLE_INDEX, data.RESULT_COLUMN_INDEX, this.dimentionObj[this.leftMenuItem], data.ID, data.VERNO, data.FILENO, data.BELONGSTATION)
          }
        } else if (this.leftMenuItem === 'flight') {
          this.currentColumnName = data.COLUMN_NAME // 当前节点名字，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentNodeName = data.NAME // 当前节点名字，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentDataSourceName = data.DATASOURCE_NAME
          this.getFlightRecordsByName(data.COLUMN_NAME, data.NAME, data.ID, data.DATASOURCE_NAME)
        }

        this.getTreeNoteDescByIDAndType(data.ID, data.TYPE)

        this.flightChart.setOption({
          visualMap: {
            pieces: [ {
              gte: 0,
              lte: 0,
              color: 'red'
            } ]
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              throttle: 100
            }]
        })
        this.flightChart.dispatchAction({
          type: 'hideTip'
        })
        this.currentEventRowItem = {}
      } else {
        if (this.leftMenuItem === 'events' || this.leftMenuItem === 'measurements') {
          let type = this.leftMenuItem === 'events' ? '5' : '3'
          if (data.TYPE === 'CATALOG' && this.$util.isDefine(data.ID)) { // 节点类型为文件夹且id不为空才可以点击
            this.currentNodeName = data.NAME

            if (data.CHILDREN.length > 0 && !data.CHILDREN[0].CHILDREN) {
              this.getTwoDimention(type, data.ID)
            } else {
              this.viewTableData = []
            }
          } else if (data.TYPE === '5' && this.$util.isDefine(data.ID)) {
            this.currentNodeName = data.NAME
            this.getTwoDimention(type, data.ID, this.currentFlightInfoData.file_no)
          }
        } else if (this.leftMenuItem === 'flight') {
          this.currentColumnName = data.COLUMN_NAME // 当前节点名字，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentNodeName = data.NAME // 当前节点名字，根据航班编号重新查询图表数据，同时查询相应的左侧树节点详情数据时使用
          this.currentDataSourceName = data.DATASOURCE_NAME
          this.getFlightRecordsByName(data.COLUMN_NAME, data.NAME, data.ID, data.DATASOURCE_NAME) // TODO
        }
      }
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.searchTreeData()
      }
    },
    searchTreeData (flag) { // 根据关键字查询树节点数据
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.getViewTreeData() // 加载树数据
      // }
      this.openLeftMenu(this.leftMenuItem) // this.leftMenuItem | 'events'
      this.treeNodeDesc = ''
      this.viewNote = ''
      this.getTreeData()
    },
    filterViewTreeNode (value, data) { // 树节点过滤
      if (!value) return true
      try {
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    getTreeData () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let that = this
      this.$axios.all([
        this.$axios.get('/buildTree/getResultEventTree?flightInfoId=' + this.currentFlightId + '&fileNo=' + this.currentFlightInfoData.file_no + '&likeContent=' + this.treeKeyword),
        this.$axios.get('/buildTree/getResultFlightInfoTree?' + 'likeContent=' + this.treeKeyword),
        this.$axios.get('/buildTree/getResultMeasurementTree?' + 'likeContent=' + this.treeKeyword)
      ]).then(this.$axios.spread(function (getResultEventTree, getResultFlightInfoTree, getResultMeasurementTree) {
        // 所有请求现在都执行完成
        let resData = Object.assign({}, getResultEventTree.data.result.data, getResultFlightInfoTree.data.result.data, getResultMeasurementTree.data.result.data)
        let tempObj = JSON.parse(JSON.stringify(getResultMeasurementTree))
        tempObj.data.result.data = resData

        let getResultFlightTree = Object.assign({},
                                                getResultEventTree,
                                                getResultFlightInfoTree,
                                                getResultMeasurementTree,
                                                tempObj)
        that.getResultFlightTreeHandle(getResultFlightTree)

        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      })).catch(response => {
        // 请求失败
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        that.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getCompnentAllHandle () {
      let tempDisabledMenuObj = this.$store.state.isDisabledMenu
      if (!this.$util.isDefine(this.currentFlightId)) {
        tempDisabledMenuObj['analysis_view_fdv'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_export'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_template'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_clean'] = true // 禁用按钮
        this.$store.commit('IS_DISABLED_MENU', tempDisabledMenuObj) // 暂时存储需要修改二级菜单的值
        // 控制二级菜单
        if (this.activeTabName === 'flightRecordView') {
          this.$bus.$emit('openHeaderMenuItem', 'analysis_view', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (this.activeTabName === '2dChart') {
          this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (this.activeTabName === 'tableDetail') {
          this.$bus.$emit('openHeaderMenuItem', 'analysis_table', {}, tempDisabledMenuObj) // 修改头部显示效果
        }
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let that = this
      this.$axios.all([
        // this.$axios.get('/buildTree/getResultFlightTree?flightInfoId=' + this.currentFlightId + '&fileNo=' + this.currentFlightInfoData.file_no),
        this.$axios.get('/buildTree/getResultEventTree?flightInfoId=' + this.currentFlightId + '&fileNo=' + this.currentFlightInfoData.file_no),
        this.$axios.get('/buildTree/getResultFlightInfoTree'),
        this.$axios.get('/buildTree/getResultMeasurementTree'),
        this.$axios.get('/toExplorer/getToExplorerValue?flightId=' + this.currentFlightId),
        this.$axios.get('/toExplorer/getLonpAndLatp?flightId=' + this.currentFlightId + '&fileNo=' + this.currentFlightInfoData.file_no),
        this.$axios.get('/toExplorer/getToExplorerValueByTime?flightId=' + this.currentFlightId)
      //]).then(this.$axios.spread(function (getResultFlightTree, getToExplorerValue, getLonpAndLatp) {
      ]).then(this.$axios.spread(function (getResultEventTree, getResultFlightInfoTree, getResultMeasurementTree, getToExplorerValue, getLonpAndLatp, getToExplorerValueByTime) {
        // 所有请求现在都执行完成
        let resData = Object.assign({}, getResultEventTree.data.result.data, getResultFlightInfoTree.data.result.data, getResultMeasurementTree.data.result.data)
        let tempObj = JSON.parse(JSON.stringify(getResultMeasurementTree))
        tempObj.data.result.data = resData

        let getResultFlightTree = Object.assign({},
                                                getResultEventTree,
                                                getResultFlightInfoTree,
                                                getResultMeasurementTree,
                                                tempObj)
        that.getResultFlightTreeHandle(getResultFlightTree)

        that.getToExplorerValueHandle(getToExplorerValue)
        that.getLonpAndLatpHandle(getLonpAndLatp)
        if (!that.stateType) {
          tempDisabledMenuObj['analysis_view_clean'] = false // 启用按钮
        }
        tempDisabledMenuObj['analysis_view_fdv'] = false // 启用按钮
        tempDisabledMenuObj['analysis_view_export'] = false // 启用按钮
        tempDisabledMenuObj['analysis_view_template'] = false // 启用按钮
        // tempDisabledMenuObj['analysis_view_clean'] = false // 启用按钮
        that.$store.commit('IS_DISABLED_MENU', tempDisabledMenuObj) // 暂时存储需要修改二级菜单的值// 控制二级菜单
        // 控制二级菜单
        if (that.activeTabName === 'flightRecordView') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_view', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (that.activeTabName === '2dChart') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (that.activeTabName === 'tableDetail') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_table', {}, tempDisabledMenuObj) // 修改头部显示效果
        }
        that.exploreData = getToExplorerValue.data.result.data
        that.exploreTimeData = getToExplorerValueByTime.data.result.data
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      })).catch(err => {
        // 请求失败
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        tempDisabledMenuObj['analysis_view_fdv'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_export'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_template'] = true // 禁用按钮
        tempDisabledMenuObj['analysis_view_clean'] = true // 禁用按钮
        that.$store.commit('IS_DISABLED_MENU', tempDisabledMenuObj) // 暂时存储需要修改二级菜单的值// 控制二级菜单
        // 控制二级菜单
        if (that.activeTabName === 'flightRecordView') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_view', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (that.activeTabName === '2dChart') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj) // 修改头部显示效果
        } else if (that.activeTabName === 'tableDetail') {
          that.$bus.$emit('openHeaderMenuItem', 'analysis_table', {}, tempDisabledMenuObj) // 修改头部显示效果
        }
        that.flightChart = ''
        // that.$message.error('请求响应失败，请稍后重试！')
        console.log('getCompnentAllHandle##@@##:  ' + err.message)
      })
    },
    getResultFlightTreeHandle (response) {
      console.log('getResultFlightTree~~~:', response)
      this.viewTableData = [] // 清空当前表格数据
      this.viewTreeData = [] // 清空当前显示的树节点信息
      if (response.data.status === '0') {
        let resultData = response.data.result.data
        if (this.$util.isNotEmptyObject(resultData)) {
          this.viewTreeDataObj = resultData

          // 重新加载当前点击左侧树节点的详情数据
          // if (this.currentNodeName !== '') { // 只有点击了左侧树节点才重新查询
            this.viewTreeData = this.viewTreeDataObj[this.leftMenuItem] // 默认上次类型的树
            if (this.leftMenuItem === 'events' || this.leftMenuItem === 'measurements') {
              let tempType = this.leftMenuItem === 'events' ? '5' : '3'
              if (this.$util.isDefine(this.currentNodeName) &&
                this.$util.isDefine(this.currentTableIndex) &&
                this.$util.isDefine(this.currentColumnIndex) &&
                this.$util.isDefine(this.currentNodeId)) { // 节点重新查询
                this.getDimentionById(this.currentNodeName, this.currentTableIndex, this.currentColumnIndex, this.dimentionObj[this.leftMenuItem], this.currentNodeId, this.currentVerNo, this.currentFileNo, this.currentBelongStation)
              } else { // 文件夹重新查询
                this.getTwoDimention(tempType, this.currentNodeId)
              }
            } else if (this.leftMenuItem === 'flight') {
              this.getFlightRecordsByName(this.currentColumnName, this.currentNodeName, this.currentNodeId, this.currentDataSourceName)
            }
          // } else {
          //   this.viewTreeData = this.viewTreeDataObj['events'] // 默认显示事件类型的树
          // }
        }
      } else if (response.data.status === 'E1001') { // 没有登录
        this.$bus.$emit('logBackInHandle', response.data)
      } else {
        this.$message.error(response.data.message)
      }
    },
    getToExplorerValueHandle (response) {
      console.log('getToExplorerValue~~~:', response)
      if (response.data.status === '0') {
        let resultData = response.data.result.data
        if (this.$util.isNotEmptyObject(resultData)) {
          let xyAxisArrData = []
          let xAxisArr = []
          let yAxisArr = []
          let sortArr = []
          for (let j in resultData) {
            sortArr.push({
              label: j,
              value: resultData[j]
            })
          }
          sortArr.sort((a, b) => {
            return a.label - b.label
          })
          sortArr.forEach(item => {
            xAxisArr.push(item.label)
            yAxisArr.push(item.value)
            xyAxisArrData.push([item.label, item.value])
          })
          this.chartXAxisArrData = xAxisArr
          this.chartYAxisArrData = yAxisArr
          this.chartAxisArrData = xyAxisArrData
          setTimeout(() => {
            this.renderFlightChart() // 渲染图表
          }, 20)
        } else {
          if (this.flightChart) {
            this.$message('暂无图表数据！')
            this.flightChart.dispose()
            this.flightChart = ''
            console.log('在getToExplorerValue调用销毁存在的flightChart')
          }
        }
      } else if (response.data.status === 'E1001') { // 没有登录
        this.$bus.$emit('logBackInHandle', response.data)
      } else {
        this.$message.error(response.data.message)
      }
    },
    getLonpAndLatpHandle (response) {
      console.log('getLongAndLatp~~~:', response)
      if (response.data.status === '0') {
        let mapHeightData = response.data.result.data.mapHeightData
        let eventData = response.data.result.data.eventData

        /* eslint-disable */
        // eventData = [
        //   {
        //     "belong_station": "YN",
        //     "prodesc": "Master Caution",
        //     "enddate": "2019-08-03 07:24:33.0",
        //     "latitude": "25.648845672607422",
        //     "pro_no": "6202",
        //     "severity_class_no": "2",
        //     "file_no": "904286",
        //     "shortname": "MASTER CAUTION",
        //     "ver_no": "407",
        //     "longitude": "100.32148742675781",
        //     "start_date": "2019-08-03 07:24:33.937"
        //   }, {
        //     "belong_station": "YN",
        //     "prodesc": "High load factor during flight",
        //     "enddate": "2019-08-03 06:18:59.0",
        //     "latitude": "30.734081268310547",
        //     "pro_no": "2000",
        //     "severity_class_no": "1",
        //     "file_no": "904286",
        //     "shortname": "HIGH LOAD FACTOR",
        //     "ver_no": "407",
        //     "longitude": "104.09562683105469",
        //     "start_date": "2019-08-03 06:18:59.373"
        //   }, {
        //     "belong_station": "YN",
        //     "prodesc": "Master Caution",
        //     "enddate": "2019-08-03 06:20:40.0",
        //     "latitude": "30.713653564453125",
        //     "pro_no": "6202",
        //     "severity_class_no": "2",
        //     "file_no": "904286",
        //     "shortname": "MASTER CAUTION",
        //     "ver_no": "407",
        //     "longitude": "104.23056030273438",
        //     "start_date": "2019-08-03 06:20:40.937"
        //   }]
          /* eslint-enable */

        if (this.$util.isDefine(mapHeightData) && mapHeightData.length > 0) {
          if (mapHeightData.length > 0) {
            // this.mapLatitudeAndLongitudeData = mapHeightData

            this.$refs.analysisHeightMap.setFlightLine(mapHeightData, eventData)
          } else {
            this.mapLatitudeAndLongitudeData = []
            this.$refs.analysisHeightMap.setFlightLine([], [])
          }

          let tempEventDataArr = []
          if (this.$util.isDefine(eventData) && eventData.length > 0) {
            for (let e = 0, len = eventData.length; e < len; e++) {
              let t = eventData[e]
              if (this.$util.isDefine(t.longitude) && this.$util.isDefine(t.latitude)) {
                // let eObj = {
                //   name: t.shortname,
                //   value: [t.longitude, t.latitude],
                //   desc: t.prodesc,
                //   score: 100,
                //   id: t.pro_no,
                //   belongStation: t.belong_station,
                //   endDate: t.enddate,
                //   fileNo: t.file_no,
                //   latitude: t.latitude,
                //   longitude: t.longitude,
                //   severityClassNo: t.severity_class_no,
                //   startDate: t.start_date,
                //   verNo: t.ver_no
                // }
                // tempEventDataArr.push(eObj)
                tempEventDataArr.push({
                  name: t.shortname,
                  value: [t.longitude, t.latitude]
                })
              }
            }
            this.mapEventData = tempEventDataArr
          } else {
            this.mapEventData = []
          }
          setTimeout(() => {
            this.renderNavigationChart() // 渲染地图数据
          }, 20)
        } else {
          if (this.flightChart) {
            // this.$message('暂无图表数据！')
            this.flightChart.dispose()
            console.log('在getLonpAndLatp中调用销毁存在的flightChart')
          }
        }
      } else if (response.data.status === 'E1001') { // 没有登录
        this.$bus.$emit('logBackInHandle', response.data)
      } else {
        this.$message.error(response.data.message)
      }
    },
    getViewTreeData () { // 获取树节点数据
      if (!this.$util.isDefine(this.currentFlightId)) {
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }
      this.viewTableData = [] // 清空当前表格数据
      this.viewTreeData = [] // 清空当前显示的树节点信息
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/buildTree/getResultFlightTree',
        method: 'get',
        params: {
          flightInfoId: this.currentFlightId,
          fileNo: this.currentFlightInfoData.file_no
        }
      }).then(response => {
        console.log('getResultFlightTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (this.$util.isNotEmptyObject(resultData)) {
            this.viewTreeDataObj = resultData

            // 重新加载当前点击左侧树节点的详情数据
            if (this.currentNodeName !== '') { // 只有点击了左侧树节点才重新查询
              this.viewTreeData = this.viewTreeDataObj[this.leftMenuItem] // 默认上次类型的树
              if (this.leftMenuItem === 'events' || this.leftMenuItem === 'measurements') {
                let tempType = this.leftMenuItem === 'events' ? '5' : '3'
                if (this.$util.isDefine(this.currentNodeName) &&
                  this.$util.isDefine(this.currentTableIndex) &&
                  this.$util.isDefine(this.currentColumnIndex) &&
                  this.$util.isDefine(this.currentNodeId)) { // 节点重新查询
                  this.getDimentionById(this.currentNodeName, this.currentTableIndex, this.currentColumnIndex, this.dimentionObj[this.leftMenuItem], this.currentNodeId, this.currentVerNo, this.currentFileNo, this.currentBelongStation)
                } else { // 文件夹重新查询
                  this.getTwoDimention(tempType, this.currentNodeId)
                }
              } else if (this.leftMenuItem === 'flight') {
                this.getFlightRecordsByName(this.currentColumnName, this.currentNodeName, this.currentNodeId, this.currentDataSourceName)
              }
            } else {
              this.viewTreeData = this.viewTreeDataObj['events'] // 默认显示事件类型的树
            }
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    resetViewAndMapChartSize (id) { // 重置图表和地图元素的大小
      let analysisViewWidth = document.getElementsByClassName('analysisView')[0].offsetWidth
      let viewChartContentWidth = parseInt(analysisViewWidth - 60 - 240 - 350) // document.getElementsByClassName('view-chart-content')[0].offsetWidth
      let viewChartContentHeight = document.getElementsByClassName('view-chart-content')[0].offsetHeight
      let viewPaginationHeight = document.getElementsByClassName('view-pagination')[0].offsetHeight
      let viewChartBtnHeight = document.getElementsByClassName('view-chart-btn')[0].offsetHeight
      let viewHeight = parseInt(viewChartContentHeight - viewPaginationHeight - viewChartBtnHeight) + 'px'
      document.getElementById(id).style.width = viewChartContentWidth + 'px'
      document.getElementById(id).style.height = viewHeight
      console.log(id + '@@@$$$~~~:', document.getElementById(id).style.width, document.getElementById(id).style.height)
    },
    renderFlightChart () { // 显示图表数据
      if (this.chartAxisArrData.length <= 0) return
      if (this.flightChart) {
        this.flightChart.dispose()
        console.log('在renderFlightChart中调用销毁存在的flightChart')
      }
      // 重置容器大小
      this.resetViewAndMapChartSize('viewChart')
      this.flightChart = this.$echarts.init(document.getElementById('viewChart'))
      this.flightChart.setOption({
        xAxis: {
          type: 'category',
          data: this.chartXAxisArrData
        },
        yAxis: {
          type: 'value',
          axisTick: {
            inside: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            inside: false,
            formatter: '{value}\n'
          },
          z: 10
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 12
          }
        },
        visualMap: {
          show: false,
          type: 'piecewise',
          dimension: 0, // x轴
          seriesIndex: 0,
          outOfRange: {
            color: '#409EFF'
          },
          pieces: [{
            gte: 0,
            lte: 0,
            color: 'red'
          }]
        },
        dataZoom: [
        {
          show: true,
          realtime: true
        },
        {
          type: 'inside',
          throttle: 100,
          start: 0,
          end: 100
        }],
        toolbox: {
          feature: {
            brush: {
              type: []
            }
          }
        },
        brush: {
          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          },
          toolbox: ['']
        },
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#409EFF'
            }
          },
          data: this.chartYAxisArrData, // this.chartAxisArrData,
          areaStyle: {}
        }]
      })
    },
    renderNavigationChart () { // 显示地图图表数据
      if (this.mapLatitudeAndLongitudeData.length <= 0) return
      // 重置容器大小
      this.resetViewAndMapChartSize('viewChartMap')
      if (this.flightChartMap) {
        this.flightChartMap.dispose()
        console.log('在renderNavigationChart中调用销毁存在的flightChartMap')
      }
      /*
      this.flightChartMap = this.$echarts.init(document.getElementById('viewChartMap'))

      this.flightChartMap.setOption({
        bmap: {
          center: this.mapCenterLangLatp,
          // center: [126.4439, 37.4536],
          zoom: 5,
          roam: true
        },
        // tooltip: {
        //   trigger: 'item'
        // },
        series: [{
          type: 'lines',
          name: 'mapLine',
          coordinateSystem: 'bmap',
          data: this.mapLatitudeAndLongitudeData,
          polyline: true,
          lineStyle: {
            normal: {
              color: '#c23531',
              opacity: 1,
              width: 3
            }
          }
        }, {
          type: 'scatter',
          coordinateSystem: 'bmap',
          name: 'mapScatter',
          data: this.mapEventData,
          // symbolSize: function (val, params) {
          //   return params.data.score / 5
          // },
          symbolSize: 20,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          },
          tooltip: {
            formatter: function (e) {
              return '名称:' + e.data.name + '<br/> 备注:' + e.data.desc
            }
          }
        }]
      })
      // 获得百度地图实例对象 BMAP_NORMAL_MAP：地图, BMAP_SATELLITE_MAP：卫星, BMAP_HYBRID_MAP ：混合
      let bmap = this.flightChartMap.getModel().getComponent('bmap').getBMap()
      bmap.setMapType(BMAP_SATELLITE_MAP)
      */
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    reloadGetFlightId (val) { // 重新提交分析参数获取新的航班编号
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (submitAnalysisParams.isGuide === '1') { // 添加辅助线标识
        submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
      }

      this.fdvCurrentPage = val

      try {
        this.fdvChart.clear()
        this.fdvChart.dispose()
      } catch (error) {
        this.fdvChart = ''
      }

      // this.flightPhaseSelectValue = ''
      this.fdvChartDataArr = [] // 清空fdv图表数据

      submitAnalysisParams.pageNo = val // 重新赋值页数，查询新的航班编号
      submitAnalysisParams.tablePageSize = 0 // 设置表格详情的页码为0，后台便于查询航班的分页数据
      submitAnalysisParams.tablePageNum = 0
      submitAnalysisParams['tableType'] = 0
      console.log('reloadGetFlightId@submitAnalysisParams~~~:', submitAnalysisParams)
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: '/submit/submitAnalysis',
        method: 'post',
        data: JSON.stringify(submitAnalysisParams),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('analysisView@submitAnalysis~~~:', response)
        if (response.data.status === '0') {
          let target = document.getElementById('resetScrollTop')
          if (target) {
            target.scrollTop = 0
          }
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            let tempUrl = ''
            if (resUrl.indexOf('7777') > -1) {
              tempUrl = resUrl
            } else {
              tempUrl = window.location.origin + resUrl
            }
            window.location.href = tempUrl
            return false
          }
          // 处理返回的结构，显示图表
          let tempFlightInfoData = response.data.result.data.flightInfo // 航班信息数据
          let tempPageSize = response.data.result.data.pageSize // 航班总数
          let tempAnalysisResultAllDataObj = this.$store.state.analysisResultAllData // 临时存储store中存放的分析结果数据
          if (this.$util.isDefine(tempFlightInfoData) && this.$util.isNotEmptyObject(tempFlightInfoData) && this.$util.isDefine(tempPageSize)) {
            this.currentFlightInfoData = tempFlightInfoData // 赋值当前的航班信息
            console.log('赋值当前的航班信息')
            // this.fdvSearchTreeData()
            tempAnalysisResultAllDataObj.flightInfoData = tempFlightInfoData // 重新赋值store中的航班信息数据
            tempAnalysisResultAllDataObj.flightPageCount = tempPageSize // 重新赋值store中的航班数量
            if (this.$util.isDefine(tempFlightInfoData.flightid)) {
              this.currentFlightId = tempFlightInfoData.flightid
            } else {
              this.currentFlightId = ''
            }
          } else {
            console.log('清除数据123456789000000')
            this.currentFlightInfoData = {}
            this.currentFlightId = ''
            tempAnalysisResultAllDataObj.flightInfoData = {} // 清空store中的航班信息数据
            tempAnalysisResultAllDataObj.flightPageCount = 0 // 清空store中的航班数量
          }

          this.$store.commit('ANALYSIS_RESULT_ALL_DATA', tempAnalysisResultAllDataObj) // 更新store中航班数据

          if (this.currentFlightId) {
            // TODO: 工程参数视图分页
            if (this.dialogFDVVisible) {
              // this.openFdvDialog()

              const tempObj = {
                flightId: this.currentFlightId,
                ids: this.$util.distinctArray(this.listIDArr).join(','),
                flightRate: this.flightRateValue
              }
              if (tempObj.ids !== '') {
                this.getFdvById(tempObj)
              }

              // this.getPrecent()

              // if (this.$store.state.analysisParamsId !== '') {
              //   let tempObj = {
              //     flightId: this.currentFlightId,
              //     analysisId: this.$store.state.analysisParamsId,
              //     flightRate: this.flightRateValue
              //   }
              //   this.getFdvById(tempObj)
              // }
            } else {
              this.getCompnentAllHandle() // 加载树,高度轨迹，高度地图三个数据
            }
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
            this.$message({
              type: 'warning',
              message: '没有航班号，暂时无法查询数据！'
            })
            return false
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }, response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getFlightRecordsByName (colName, name, id, dsName) { // 获取航班信息树节点对应的数据
      if (!this.$util.isDefine(this.currentFlightId)) {
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }
      let tempParams = {}
      if (this.$util.isDefine(colName) && this.$util.isDefine(dsName)) { // 子节点类型
        tempParams = {
          flightId: this.currentFlightId,
          columnName: colName,
          dataSourceName: dsName,
          likeContent: this.treeKeyword
        }
      } else if (this.$util.isDefine(id)) {
        tempParams = {
          flightId: this.currentFlightId,
          treeId: id,
          likeContent: this.treeKeyword
        }
      } else {
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/flightRecords/getFlightRecordsByName',
        method: 'get',
        params: tempParams
      }).then(response => {
        console.log('getFlightRecordsByName~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            let tempArr = []
            if (this.$util.isDefine(colName) && this.$util.isDefine(dsName)) { // 子节点类型
              for (let i = 0; i < resultData.length; i++) {
                tempArr.push({'columnName': name, 'columnValue': resultData[i].columnname ? resultData[i].columnname : '无数据'})
              }
            } else { // 文件夹类型
              for (let i = 0; i < resultData.length; i++) {
                tempArr.push({'columnName': resultData[i].columnname ? resultData[i].columnname : '', 'columnValue': resultData[i].value ? resultData[i].value : '无数据'})
              }
            }
            if (tempArr.length > 0) {
              this.viewNote = tempArr[0].dimentionDescription ? tempArr[0].dimentionDescription : '' // 默认显示第一条备注 | '暂无数据'
              this.viewTableData = tempArr
            } else {
              this.viewNote = ''
              this.viewTableData = []
            }
          } else {
            this.viewNote = ''
            this.viewTableData = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    getTreeNoteDescByIDAndType (id, type) {
      // this.$store.commit('SHOW_LOADING', '正在加载字段说明...')
      this.$axios({
        url: '/flightRecords/getDimentionDesc',
        method: 'get',
        params: {
          id: id,
          type: type
        }
      }).then(response => {
        // this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        console.log('getCheckboxData~~~', response)
        if (response.data.status === '0') {
          let desc = response.data.result.data[0].DESCRIPTION
          if (this.$util.isDefine(desc)) {
            this.treeNodeDesc = desc
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    getDimentionById (name, tableIndex, columnIndex, typeVal, id, vno, fno, bs) { // 获取测量和事件类型树节点对应的数据
      if (!this.$util.isDefine(this.currentFlightId)) {
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/flightRecords/getDimentionById',
        method: 'get',
        params: {
          id: this.currentFlightId,
          tableIndex: tableIndex,
          tableColumnIndex: columnIndex,
          type: typeVal, // 3:测量, 5:事件
          dimentionId: id,
          verNo: vno,
          fileNo: fno,
          belongStation: bs
        }
      }).then(response => {
        console.log('getDimentionById~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            let tempArr = []
            for (let i = 0; i < resultData.length; i++) {
              if (this.leftMenuItem === 'events') {
                let tempColumnValue = ''
                if (resultData[i].columnname === '已发生') {
                  let events = resultData[i].events
                  if (events.length > 0) {
                    events.forEach((item, index) => {
                      tempColumnValue += '开始:' + item.begin +
                                         '<br>结束:' + item.end +
                                         '<br>事件等级:' + item.level +
                                        //  '<br>严重程度:' + resultData[i].columnname +
                                         '<br>'
                      if (index < events.length - 1) {
                        tempColumnValue += '------------<br>'
                      }
                    })
                  } else {
                    tempColumnValue = resultData[i].columnname
                  }

                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'events', eventList: events})
                } else if (resultData[i].columnname === '未发生') {
                  let tempColumnValue = resultData[i].columnname
                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'events', eventList: []})
                } else {
                  if (resultData[i].begin === resultData[i].end) {
                    tempColumnValue = '时间点:' + resultData[i].begin + '<br>值:' + resultData[i].columnname
                  } else {
                    tempColumnValue = '开始:' + resultData[i].begin + '<br>结束:' + resultData[i].end + '<br>值:' + resultData[i].columnname
                  }

                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'event', begin: resultData[i].begin, end: resultData[i].end})
                }
              } else {
                if (resultData[i].columnname !== '') {
                  tempArr.push({'columnName': name, 'columnValue': resultData[i].columnname, 'dimentionDescription': resultData[i].dimentionDescription, type: 'measurements'})
                }
              }
            }
            if (tempArr.length > 0) {
              this.viewNote = tempArr[0].dimentionDescription ? tempArr[0].dimentionDescription : '' // 默认显示第一条备注 '暂无数据'
              this.viewTableData = tempArr
            } else {
              this.viewNote = ''
              this.viewTableData = []
            }
          } else {
            this.viewNote = ''
            this.viewTableData = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getTwoDimention (typeVal, id, fileNo) { // 获取测量和事件类型树节点为文件的夹对应的数据
      if (!this.$util.isDefine(this.currentFlightId)) {
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/flightRecords/getTwoDimention',
        method: 'get',
        params: {
          id: this.currentFlightId,
          type: typeVal, // 3:测量, 5:事件
          profileId: id
          //, fileNo: fileNo
        }
      }).then(response => {
        console.log('getTwoDimention~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            let tempArr = []
            for (let i = 0; i < resultData.length; i++) {
              if (this.leftMenuItem === 'events') {
                let tempColumnValue = ''
                if (resultData[i].columnname === '已发生') {
                  let events = resultData[i].events
                  if (events.length > 0) {
                    events.forEach((item, index) => {
                      tempColumnValue += '开始:' + item.begin +
                                         '<br>结束:' + item.end +
                                         '<br>事件等级:' + item.level +
                                        //  '<br>严重程度:' + resultData[i].columnname +
                                         '<br>'
                      if (index < events.length - 1) {
                        tempColumnValue += '------------<br>'
                      }
                    })
                  } else {
                    tempColumnValue = resultData[i].columnname
                  }

                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'events', eventList: events})
                } else if (resultData[i].columnname === '未发生') {
                  let tempColumnValue = resultData[i].columnname
                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'events', eventList: []})
                } else {
                  tempColumnValue = '开始:' + resultData[i].begin + '<br>结束:' + resultData[i].end + '<br>严重程度:' + resultData[i].columnname

                  tempArr.push({'columnName': resultData[i].name, 'columnValue': tempColumnValue, 'dimentionDescription': resultData[i].dimentionDescription, type: 'event', begin: resultData[i].begin, end: resultData[i].end})
                }
              } else {
                if (resultData[i].columnname !== '') {
                  tempArr.push({'columnName': resultData[i].name, 'columnValue': resultData[i].columnname, 'dimentionDescription': resultData[i].dimentionDescription, type: 'measurements'})
                }
              }
            }
            if (tempArr.length > 0) {
              this.viewNote = tempArr[0].dimentionDescription ? tempArr[0].dimentionDescription : '' // 默认显示第一条备注 | '暂无数据'
              this.viewTableData = tempArr
            } else {
              this.viewNote = ''
              this.viewTableData = []
            }
          } else {
            this.viewNote = ''
            this.viewTableData = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    fdvHandleNodeClick (data) { // FDV点击树节点查询对应的表格数据
      console.log('fdvHandleNodeClick:', data)
      this.mergeParamList = []

      let tempParams = {}
      this.fdvTreeNodeDesc = ''
      if (!data.CHILDREN) {
        this.currentFdvTreeNodeName = data.NAME // 查询数据失败时使用，listNameArr删除此节点名字

        this.listNameArr.forEach((n, index) => { // 删除重复的数据
          if (n === data.NAME) {
            this.listNameArr.splice(index, 1)
          }
        })
        this.listIDArr.forEach((n, index) => { // 删除重复的数据
          if (n === data.ID) {
            this.listIDArr.splice(index, 1)
          }
        })

        this.listNameArr.push(data.NAME) // 添加数据
        this.listIDArr.push(data.ID) // 添加数据

        // if (data.RESULT_TABLE_INDEX && data.RESULT_COLUMN_INDEX) { // 分析参数
        //   tempParams = {
        //     flightId: this.currentFlightId,
        //     id: data.ID,
        //     listName: this.$util.distinctArray(this.listNameArr).join(','),
        //     flightRate: this.flightRateValue
        //   }
        //   this.getFdvById(tempParams)
        // } else { // 工程参数
        //   tempParams = {
        //     flightId: this.currentFlightId,
        //     listName: this.$util.distinctArray(this.listNameArr).join(','),
        //     flightRate: this.flightRateValue
        //   }
        //   this.getFdvById(tempParams)
        // }

        tempParams = {
          flightId: this.currentFlightId,
          ids: this.$util.distinctArray(this.listIDArr).join(','),
          // listName: this.$util.distinctArray(this.listNameArr).join(','),
          flightRate: this.flightRateValue
        }
        if (tempParams.ids !== '') {
          this.getFdvById(tempParams)
        }
        // this.$store.commit('SHOW_LOADING', '正在加载字段说明...')
        this.$axios({
          url: '/flightRecords/getDimentionDesc',
          method: 'get',
          params: {
            id: data.ID,
            type: data.TYPE
          }
        }).then(response => {
          // this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          console.log('getCheckboxData~~~', response)
          if (response.data.status === '0') {
            let desc = response.data.result.data[0].DESCRIPTION
            if (this.$util.isDefine(desc)) {
              this.fdvTreeNodeDesc = desc
            }
          } else if (response.data.status === 'E1001') { // 没有登录
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          this.$message.error('请求响应失败，请稍后重试！')
        })
      } else {
        // this.$message({ type: 'warning', message: '文件夹类型节点不能查询！' })
        return false
      }
    },

    fdvEptHandleNodeClick (data) {
      console.log('fdvEptHandleNodeClick:', data)

      // PARAM_CONTENT
      let tempParams = {}
      this.fdvTreeNodeDesc = ''
      if (!data.CHILDREN && this.$util.isDefine(data.PARAM_CONTENT)) {
        let pcList = data.PARAM_CONTENT.split(',')
        this.listIDArr = [...pcList]

        // pcList.forEach((n, index) => { // 删除重复的数据
        //   let tempItem = n
        //   this.listIDArr.forEach((j, jNo) => { // 删除重复的数据
        //     if (tempItem === j) {
        //       this.listIDArr.splice(jNo, 1)
        //     }
        //   })
        // })

        // pcList.forEach((n, index) => {
        //   this.listIDArr.push(n)
        // })
        let desc = data.DESCRIPTION
        if (this.$util.isDefine(desc)) {
          this.fdvTreeNodeDesc = desc
        }

        tempParams = {
          flightId: this.currentFlightId,
          ids: this.$util.distinctArray(this.listIDArr).join(','),
          flightRate: this.flightRateValue
        }
        if (tempParams.ids !== '') {
          this.getFdvById(tempParams)
        }
      } else {
        return false
      }
    },
    refreshFdvTreeData () {
      if (!this.$util.isDefine(this.fdvTreeKeyword)) {
        this.fdvTreeNodeDesc = ''
        this.fdvSearchTreeData()
      }
    },
    refreshFdvEptTreeData () {
      if (!this.$util.isDefine(this.fdvEptTreeKeyword)) {
        this.fdvTreeNodeDesc = ''
        this.getFdvEptTreeData()
      }
    },
    fdvSearchTreeData (flag) { // FDV根据关键字查询树节点数据
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.fdvSearchTreeData() // 加载树数据
      // }
      this.fdvTreeNodeDesc = ''
      // this.getFdvTreeData()
      console.log(123456789)
      console.log(this.currentFlightInfoData)
      if (this.version_no_before === this.currentFlightInfoData.version_no && this.fdvTreeKeyword === this.fdvTreeKeyword_brfore) {
        return
      }
      let params = {}
      if (this.currentFlightInfoData.version_no) {
        params = {
          likeContent: this.fdvTreeKeyword,
          version_no: this.currentFlightInfoData.version_no
        }
      } else {
        params = {
          likeContent: this.fdvTreeKeyword
        }
      }
      console.log(params)
      this.fdvDialogTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/buildTree/getFdvTree',
        method: 'get',
        params: params
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          this.version_no_before = this.currentFlightInfoData.version_no
          this.fdvTreeKeyword_brfore = this.fdvTreeKeyword
          let resultData = response.data.result.data
          if (this.$util.isNotEmptyObject(resultData)) {
            this.fdvDialogTreeData = resultData
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.fdvDefaultExpandedKeys.push(expandedKey)
          } else {
            this.fdvDefaultExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    filterFdvTreeNode (value, data) { // FDV树节点过滤
      if (!value) return true
      try {
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    closeFdvDialog (type) {
      if (type) {
        this.dataCleanDiaShow = false
      } else {
        this.fdvTreeKeyword_brfore = ''
        this.version_no_before = '' //清除version_no_before
        console.log('关闭1233333333333333333333333333333333333333333333333333')
        this.fdvTreeKeyword = ''
        this.fdvEptTreeKeyword = ''
        this.reloadGetFlightId(this.fdvCurrentPage)
      }
    },
    openFdvDialog () { // FDV打开后回调方法
      if (this.fdvChart) {
        this.fdvChart.dispose()
        this.fdvChart = ''
        this.fdvChartDataArr = [] // 清空fdv图表数据
        document.getElementById('fdvChartInfo').style = ''
        console.log('在openFdvDialog中调用销毁存在的fdvChart')
      }

      this.showChartOrTable = 'chartTypeTab'
      this.eptLeftActiveName = 'eptView'
      this.fdvTreeKeyword = ''
      this.fdvEptTreeKeyword = ''
      this.fdvTreeNodeDesc = ''
      this.fdvDataZoomMinTime = 0
      this.fdvDataZoomMaxTime = 0
      this.flightRate = 1
      // this.getFdvTreeData() // 加载fdv树数据
      // this.getFdvEptTreeData()
      this.getFdvTreesData()

      this.listNameArr = [] // 请空值
      this.listIDArr = []
      this.mergeText = '合并'
      this.mergeParamList = []
      this.tempMergeParamList = []
      this.flightPhaseSelectValue = '' // 清空区间下拉框的值

      // 清空表格数据
      this.fdvDialogColumnData = []
      this.fdvDialogTableData = []
      this.fdvDialogTableDataList = []
    },

    getFdvTreesData () {
      console.log('获得左侧树节点')
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.fdvDialogTreeData = []
      this.fdvEptDialogTreeData = []

      let that = this
      console.log(123456789)
      console.log(this.version_no_before)
      console.log(this.currentFlightInfoData.version_no)
      console.log(this.fdvTreeKeyword)
      console.log(this.fdvTreeKeyword_brfore)
      if (this.version_no_before === this.currentFlightInfoData.version_no && this.fdvTreeKeyword === this.fdvTreeKeyword_brfore) {
        return
      }
      let params = {}
      console.log(this.currentFlightInfoData)
      if (this.currentFlightInfoData.version_no) {
        params = {
          likeContent: this.fdvTreeKeyword,
          version_no: this.currentFlightInfoData.version_no
        }
      } else {
        params = {
          likeContent: this.fdvTreeKeyword
        }
      }
      this.version_no_before = this.currentFlightInfoData.version_no
      this.fdvTreeKeyword_brfore = this.fdvTreeKeyword
      this.$axios.all([
        this.$axios({
          url: '/buildTree/getFdvTree',
          method: 'get',
          params: params
        }),
        this.$axios({
          url: '/paramtemplate/tree',
          method: 'get',
          params: {
            likeContent: this.fdvEptTreeKeyword
          }
        })
      ]).then(this.$axios.spread(function (getResultFdvTree, getResultFdvEptTree) {
        let fdvTreeList = getResultFdvTree.data.result.data
        if (that.$util.isNotEmptyObject(fdvTreeList)) {
          that.fdvDialogTreeData = fdvTreeList
          that.getFdvByAnalysisId() // 查询分析参数对应的fdv图表数据
        }

        let fdvEptTreeList = getResultFdvEptTree.data
        if (fdvEptTreeList.length > 0) {
          that.fdvEptDialogTreeData = fdvEptTreeList
        }

        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }))
      // .catch(response => {
      //   that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      //   that.$message.error('请求响应失败，请稍后重试！')
      // })
    },

    getFdvTreeData () { // FDV获取树节点数据
      this.fdvDialogTreeData = []
      console.log('获得左侧的树节点')
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let params = {}
      if (this.currentFlightInfoData.version_no) {
        params = {
          version_no: this.currentFlightInfoData.version_no
        }
      } else {
        params = {}
      }
      this.$axios({
        url: '/buildTree/getFdvTree',
        method: 'get',
        params: params
      }).then(response => {
        console.log('getFdvTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (this.$util.isNotEmptyObject(resultData)) {
            this.fdvDialogTreeData = resultData
            this.getFdvByAnalysisId() // 查询分析参数对应的fdv图表数据
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getFdvEptTreeData () { // 获取树节点数据
      this.fdvEptDialogTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/paramtemplate/tree',
        method: 'get',
        params: {
          likeContent: this.fdvEptTreeKeyword
        }
      }).then(response => {
        console.log('getFdvEptTreeData~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框

        let resultData = response.data
        if (resultData.length > 0) {
          this.fdvEptDialogTreeData = resultData
        }

        // let expandedKey = response.data.result['expanded-key']
        // if (this.$util.isDefine(expandedKey)) {
        //   this.fdvEptDefaultExpandedKeys.push(expandedKey)
        // } else {
        //   this.fdvEptDefaultExpandedKeys = []
        // }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getFdvById (tempParams) { // FDV获取工程参数或者分析参数的图表数据
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/toExplorer/getFdvById',
        method: 'get',
        params: tempParams
      }).then(response => {
        console.log('getFdvById~~~:', response)
        this.fdvChartDataArrCopy = []
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          // let namesData = response.data.result.idnames

          if (resultData.length > 0) {
            this.fdvChartDataArr = []
            this.listNameArr = []
            // this.listIDArr = []

            let tempColsArr = [] // 临时存放表格的列名
            let tempRowsArr = [] // 临时存放表格的行数据
            let tempDataObj = {}
            tempColsArr.push({prop: 'name', label: '时间(s)'})
            for (let i = 0; i < resultData.length; i++) {
              let chartData = resultData[i].data
              let columnName = resultData[i].columnName
              tempColsArr.push({prop: columnName, label: columnName + '(x)'})
              if (this.$util.isNotEmptyObject(chartData)) {
                let xAxisArr = []
                let yAxisArr = []
                let sortArr = []
                for (let j in chartData) {
                  sortArr.push({
                    label: j,
                    value: chartData[j]
                  })
                }
                sortArr.sort((a, b) => {
                  return a.label - b.label
                })
                sortArr.forEach(item => {
                  xAxisArr.push(item.label)
                  yAxisArr.push(item.value)
                })
                tempDataObj['name'] = xAxisArr
                tempDataObj[columnName] = yAxisArr
                // 删除fdvChartDataArr中重复的数据
                this.fdvChartDataArr.forEach((n, index) => {
                  if (n.legend === columnName) {
                    this.fdvChartDataArr.splice(index, 1)
                  }
                })
                // 向fdvChartDataArr中增加数据
                this.fdvChartDataArr.push({legend: columnName, yAxisData: yAxisArr, xAxisData: xAxisArr})
                // 删除listNameArr中重复的数据
                this.listNameArr.forEach((n, index) => {
                  if (n === columnName) {
                    this.listNameArr.splice(index, 1)
                    // this.listIDArr.splice(index, 1)
                  }
                })

                // 向listNameArr中增加数据
                this.listNameArr.push(columnName) // 查询使用

                // this.listIDArr.push(namesData[columnName])

                // 销毁已经创建的图表
                if (this.fdvChart) {
                  this.fdvChart.dispose()
                  console.log('在getFdvById中调用销毁存在的fdvChart')
                }
              }
            }
            // 只有fdvChartDataArr有数据才渲染图表
            if (this.fdvChartDataArr.length > 0) {
              setTimeout(() => {
                this.fdvChartDataArrCopy = this.fdvChartDataArr
                this.renderFdvChart() // 渲染fdv图表数据
                if (this.fdvChartDataArr.length > 0) {
                  if (!this.$util.isDefine(this.flightPhaseSelectValue)) {
                    this.flightPhaseSelectValue = '3'
                    this.getPrecent()
                    this.fdvChart.resize()
                  } else {
                    this.getPrecent()
                    this.fdvChart.resize()
                  }

                  // this.fdvDialogCurrentPage = Math.ceil(parseInt(this.fdvDataZoomMinTime * this.flightRateValue) / 100)
                  this.fdvDialogCurrentPage = 1
                }
              }, 20)
            }
            let tempLen = tempDataObj['name'] // 默认使用name的值
            for (let t = 0; t < tempLen.length; t++) {
              let obj = {}
              for (let c in tempColsArr) {
                obj[tempColsArr[c]['prop']] = tempDataObj[tempColsArr[c]['prop']][t]
              }
              tempRowsArr.push(obj)
            }
            if (tempColsArr.length > 0 && tempRowsArr.length > 0) {
              this.fdvDialogColumnData = tempColsArr
              this.fdvDialogTableData = tempRowsArr
            }

            if (this.fdvDialogTableData.length > 0) {
              this.tableKey = this.$util.generateUUID()
              this.tablePageKey = this.$util.generateUUID()
              this.fdvDialogCurrentPage = 1

              let tempDList = JSON.parse(JSON.stringify(this.fdvDialogTableData))
              // this.fdvDialogTableDataList = tempDList.splice(this.fdvDataZoomMinTime, this.fdvDataZoomMaxTime - this.fdvDataZoomMinTime)

              let len = parseInt(this.fdvDataZoomMaxTime) * this.flightRateValue - parseInt(this.fdvDataZoomMinTime) * this.flightRateValue
              this.fdvDialogTableDataList = tempDList.splice(parseInt(this.fdvDataZoomMinTime) * this.flightRateValue, len)

              this.$refs.fdvTable.doLayout()
            }
          } else {
            // 清空表格数据
            this.fdvDialogColumnData = []
            this.fdvDialogTableData = []
            this.fdvDialogTableDataList = []

            // 清空图表数据
            this.fdvChartDataArr = []
            this.fdvChart.clear()

            // this.listNameArr = []
            // this.listIDArr = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (response.data.status === '-1') {
          this.$message.warning('当前节点暂无数据！')
        } else {
          this.$message.error(response.data.message)
        }

        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }).catch(response => {
        this.listNameArr.forEach((n, index) => {
          if (n === this.currentFdvTreeNodeName) {
            // this.listNameArr.splice(index, 1)
            // this.listIDArr.splice(index, 1)
          }
        })
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        // this.$message.error('请求响应失败，请稍后重试！') // 用户针对这块不想出现错误信息，则修改成：暂无数据
        this.$message('暂无数据！')
      })
    },
    getFdvByAnalysisId () { // 根据分析参数编号查询fdv图表数据
      if (this.$store.state.analysisParamsId !== '') {
        // this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        // /toExplorer/getFdvInfo?id=this.$store.state.analysisParamsId
        this.$axios({
          url: '/toExplorer/getFdvInfo?id=' + this.$store.state.analysisParamsId,
          method: 'get'
        }).then(response => {
          console.log('getFdvInfo~~~:', response)
          // this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框

          if (this.$util.isDefine(response.data.FDVCOLUMNNAME)) {
            let alsIDList = response.data.FDVCOLUMNNAME.split(',')

            this.listIDArr = [...alsIDList]
            const tempObj = {
              flightId: this.currentFlightId,
              ids: this.$util.distinctArray(this.listIDArr).join(','),
              flightRate: this.flightRateValue
            }
            if (tempObj.ids !== '') {
              this.getFdvById(tempObj)
            }
          }
        }).catch(response => {
          // this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('请求响应失败，请稍后重试！')
        })

        // let tempObj = {
        //   flightId: this.currentFlightId,
        //   analysisId: this.$store.state.analysisParamsId,
        //   flightRate: this.flightRateValue
        // }
        // this.getFdvById(tempObj)
      }
    },
    getScroll (event) {
      console.log(event)
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight
      if (this.fdvChartDataArrCopy.length > this.indexInterval) {
        if (scrollBottom < 40) {
         this.indexInterval = 9999
         this.fdvChartDataArr = this.fdvChartDataArrCopy
         this.renderFdvChart()
        //  event.target.scrollTop = 200
        }
      }
    },
    renderFdvChart () { // 渲染飞行记录视图航班图表
      let that = this
      let fdvLegend = []
      let fdvDataZoom = []
      let fdvGrid = []
      let fdvXAxis = []
      let fdvYAxis = []
      let fdvSeries = []
      console.log(this.indexInterval)
      console.log(this.fdvChartDataArr)
      let tempChartData = JSON.parse(JSON.stringify(this.fdvChartDataArr)).splice(0, this.indexInterval)
      let tempIndex = 0

      let cfData = []

      if (that.mergeText === '拆分' && that.mergeParamList.length === 1) {
        tempChartData.forEach((n, index) => {
          let tLegend = n.legend
          let yData = n.yAxisData
          let xData = n.xAxisData

          if (tLegend instanceof Array && tLegend.join('|') === that.mergeParamList[0]) {
            tempIndex = index

            for (let i = 0; i < tLegend.length; i++) {
              cfData.push({
                legend: tLegend[i],
                xAxisData: xData,
                yAxisData: yData[i]
              })
            }
          }
        })

        tempChartData.splice(tempIndex, 1)
        for (let i = 0; i < cfData.length; i++) {
          tempChartData.splice(tempIndex + i, 0, cfData[i])
        }

        this.tempMergeParamList.forEach((n, index) => {
          console.log(JSON.stringify(n), JSON.stringify(that.mergeParamList[0].split('|')))
          let parentArry = JSON.stringify(n)
          let childArry = JSON.stringify(that.mergeParamList[0].split('|'))
          console.log(childArry)
          let newArry = JSON.parse(childArry).filter(val => {
            return parentArry.indexOf(val) > -1
          })
          if (newArry.length === JSON.parse(childArry).length) {
            that.tempMergeParamList.splice(index, 1)
          }
        })
      }

      if (this.mergeParamList.length > 1) {
        let tempMergeList = []
        tempChartData.forEach((n, index) => {
          let legend = ''
          if (n.legend instanceof Array) {
            legend = n.legend.join('|')
          } else {
            legend = n.legend
          }

          if (that.mergeParamList.includes(legend)) {
            tempMergeList.push(legend)
          }
        })
        console.log(tempMergeList)
        that.mergeParamList = tempMergeList

        tempChartData.forEach((n, index) => {
          let legend = ''
          if (n.legend instanceof Array) {
            legend = n.legend.join('|')
          } else {
            legend = n.legend
          }

          if (that.mergeParamList.includes(legend) && legend === that.mergeParamList[0]) {
            if (n.yAxisData[0] instanceof Array) {
              tempChartData[index] = {
                legend: n.legend,
                xAxisData: n.xAxisData,
                yAxisData: n.yAxisData
              }
            } else {
              tempChartData[index] = {
                legend: [legend],
                xAxisData: n.xAxisData,
                yAxisData: [n.yAxisData]
              }
            }

            tempIndex = index
          } else if (that.mergeParamList.includes(legend)) {
            if (legend.indexOf('|') > 0) {
              let tl = legend.split('|')
              tl.forEach((item, num) => {
                tempChartData[tempIndex].legend.push(item)
              })
            } else {
              tempChartData[tempIndex].legend.push(legend)
            }

            if (n.yAxisData[0] instanceof Array) {
              n.yAxisData.forEach((item, num) => {
                tempChartData[tempIndex].yAxisData.push(item)
              })
            } else {
              tempChartData[tempIndex].yAxisData.push(n.yAxisData)
            }
          }
        })

        // 记录合并操作 删除重复的操作
        let ttMPL = []
        console.log(that.mergeParamList)
        that.mergeParamList.forEach((i, num) => {
          tempChartData.forEach((n, index) => {
            let legend = ''
            if (n.legend instanceof Array) {
              legend = n.legend.join('|')
            } else {
              legend = n.legend
            }
            if (legend === i) {
              tempChartData.splice(index, 1)
            }
          })

          if (i.indexOf('|') > 0) {
            let tArray = i.split('|')

            that.tempMergeParamList.forEach((j, jnum) => {
              if (JSON.stringify(tArray) === JSON.stringify(j)) {
                that.tempMergeParamList.splice(jnum, 1)
              }
            })
            ttMPL = ttMPL.concat(tArray)
          } else {
            ttMPL.push(i)
          }
        })

        that.tempMergeParamList.push(ttMPL)
      }

      if (!this.$util.isNotEmptyObject(this.mergeParamList) && this.$util.isNotEmptyObject(this.tempMergeParamList)) {
        console.log(that.tempMergeParamList)
        this.tempMergeParamList.forEach((tmp, tmpNum) => {
          let tempMergeList = []
          tempChartData.forEach((n, index) => {
            let legend = ''
            if (n.legend instanceof Array) {
              legend = n.legend.join('|')
            } else {
              legend = n.legend
            }

            if (tmp.includes(legend)) {
              tempMergeList.push(legend)
            }
          })
          console.log(tempMergeList)
          console.log(tempChartData)
          tempChartData.forEach((n, index) => {
            let legend = ''
            if (n.legend instanceof Array) {
              legend = n.legend.join('|')
            } else {
              console.log(n.legend)
              legend = n.legend
            }
            if (tempMergeList.includes(legend) && legend === tempMergeList[0]) {
              if (n.yAxisData[0] instanceof Array) {
                tempChartData[index] = {
                  legend: n.legend,
                  xAxisData: n.xAxisData,
                  yAxisData: n.yAxisData
                }
              } else {
                tempChartData[index] = {
                  legend: [legend],
                  xAxisData: n.xAxisData,
                  yAxisData: [n.yAxisData]
                }
              }

              tempIndex = index
            } else if (tempMergeList.includes(legend)) {
              if (legend.indexOf('|') > 0) {
                let tl = legend.split('|')
                tl.forEach((item, num) => {
                  tempChartData[tempIndex].legend.push(item)
                })
              } else {
                tempChartData[tempIndex].legend.push(legend)
              }

              if (n.yAxisData[0] instanceof Array) {
                n.yAxisData.forEach((item, num) => {
                  tempChartData[tempIndex].yAxisData.push(item)
                })
              } else {
                tempChartData[tempIndex].yAxisData.push(n.yAxisData)
              }
            }
          })
          console.log(tempMergeList)
          if (tempMergeList.length > 1) {
            tempMergeList.forEach((i, num) => {
            tempChartData.forEach((n, index) => {
              let legend = ''
              if (n.legend instanceof Array) {
                console.log(n.legend)
                legend = n.legend.join('|')
                console.log(legend)
              } else {
                legend = n.legend
              }
              console.log(i)
              if (legend === i) {
                tempChartData.splice(index, 1)
              }
            })
          })
          }
        })
      }

      for (let i = 0; i < tempChartData.length; i++) {
        let fdv = tempChartData[i]
        let legend = ''
        if (fdv.legend instanceof Array) {
          legend = fdv.legend.join('|')
        } else {
          legend = fdv.legend
        }
        fdvLegend.push(legend)
        fdvDataZoom.push(i)
        fdvGrid.push({left: 50, right: 50, top: 160 * i + 80, height: 100})
        fdvXAxis.push({gridIndex: i, type: 'category', boundaryGap: false, axisLine: {onZero: true}, data: fdv.xAxisData})
        fdvYAxis.push({gridIndex: i, name: legend, type: 'value', scale: true, nameTextStyle: {padding: [0, 0, 0, 150]}})

        if (fdv.yAxisData[0] instanceof Array) {
          for (let j = 0; j < fdv.yAxisData.length; j++) {
            fdvSeries.push({name: fdv.legend[j], type: 'line', xAxisIndex: i, yAxisIndex: i, symbolSize: 8, hoverAnimation: false, data: fdv.yAxisData[j]})
          }
        } else {
          fdvSeries.push({name: legend, type: 'line', xAxisIndex: i, yAxisIndex: i, symbolSize: 8, hoverAnimation: false, data: fdv.yAxisData})
        }
      }

      this.fdvChartDataArr = JSON.parse(JSON.stringify(tempChartData))
      // tempChartData = JSON.parse(JSON.stringify(tempChartData)).slice(0, this.indexInterval)
      this.mergeParamList = []

      this.fdvDataZoom = fdvDataZoom
      let fdvChartOption = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 12
          },
          axisPointer: {
            animation: false
          },
          formatter: (params) => {
            // console.log(params)

            let newParams = []
            let tooltipString = []
            newParams = [...params]
            newParams.sort((a, b) => {
              return a.seriesIndex - b.seriesIndex
            })
            newParams.forEach((p) => {
              let cont = p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>'
              tooltipString.push(cont)
            })
            return params[0].axisValueLabel + '<br/>' + tooltipString.join('')

            // ==== 使用工具
            // const newParams = []
            // let paramsData = _.sortBy(params, 'value') // 根据value值升序，_.sortBy为lodash的方法
            // paramsData = _.reverse(paramsData) // 将数据降序，_.reverse为lodash的方法
            // paramsData.forEach((p) => {
            //   // p.marker为对应数据线的颜色的圆点
            //   // p.seriesName为对应数据的数据名称
            //   // p.value为对应数据的值
            //   const cont = p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>'
            //   newParams.push(cont)
            // })
            // return _.join(newParams, '') // 这里是需要将数组转化成字符串显示，如果不转化，每个数据前面都会出现一个逗号（，），_.join为lodash的方法
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'}
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: this.fdvDataZoomMin,
            end: this.fdvDataZoomMax,
            xAxisIndex: fdvDataZoom,
            zoomOnMouseWheel: false,
            height: 30,
            top: 10
          }, {
            type: 'inside',
            realtime: true,
            start: this.fdvDataZoomMin,
            end: this.fdvDataZoomMax,
            zoomOnMouseWheel: false,
            xAxisIndex: fdvDataZoom
          }
        ],
        grid: fdvGrid,
        xAxis: fdvXAxis,
        yAxis: fdvYAxis,
        series: fdvSeries
      }

      // 重置容器大小
      if (this.showChartOrTable === 'chartTypeTab') {
        // document.getElementById('fdvChartInfo').style.width = document.getElementsByClassName('fdv-dialog-chart')[0].offsetWidth - 20 + 'px'
        // document.getElementById('fdvChartInfoBox').style.width = document.getElementsByClassName('fdv-dialog-chart')[0].offsetWidth - 20 + 'px'
      } else {
        document.getElementById('fdvChartInfo').style.width = document.getElementsByClassName('fdv-dialog-table')[0].offsetWidth - 20 + 'px'
      }
      document.getElementById('fdvChartInfo').style.height = this.fdvChartDataArr.length * 210 + 'px'
      // document.getElementById('fdvChartInfo').style.overflow = 'auto'

      document.getElementById('fdvChartInfoBox').style.height = this.fdvChartDataArr.length * 210 + 40 + 'px'

      console.log(document.getElementById('fdvChartInfo').style.width, document.getElementById('fdvChartInfo').style.height)

      this.fdvChart = this.$echarts.init(document.getElementById('fdvChartInfo'))

      that.fdvChart.clear()

      setTimeout(() => {
        that.fdvChart.setOption(fdvChartOption)
        that.isShowDeleteButton = true // 显示删除按钮
        that.fdvChart.resize()
      }, 50)

      this.fdvChart.off('click')
      this.fdvChart.off('mouseover')
      this.fdvChart.off('datazoom')

      this.fdvChart.on('click', (params) => {
        that.isChangeDataZoom = true
        // let tempTime = parseInt(params.name)

        // that.flightPhaseSelectValue = ''
        // that.currenTime = tempTime
        // that.fdvDataZoomMinTime = tempTime
        // that.fdvDataZoomMaxTime = tempTime

        // that.fdvDialogCurrentPage = Math.ceil(tempTime * this.flightRateValue / 100)
        that.fdvDialogCurrentPage = 1
      })

      this.fdvChart.on('mouseover', (params) => {
        that.isChangeDataZoom = true
      })
      this.fdvChart.on('mousedown', (params) => {
        that.isChangeDataZoom = true
      })
      this.fdvChart.on('mouseup', (params) => {
        that.isChangeDataZoom = true
      })

      this.fdvChart.on('datazoom', (params) => {
        console.log(JSON.stringify(params))
        // if (parseInt(params.start) !== parseInt(that.fdvDataZoomMin) || parseInt(params.end.toString()) !== parseInt(that.fdvDataZoomMax)) {
        //   that.flightPhaseSelectValue = '自定义'
        // }
        if (that.isChangeDataZoom) {
          that.flightPhaseSelectValue = '自定义'

          if (params.batch && params.batch.length > 0) {
            params = params.batch[0]
          }

          that.fdvDataZoomMin = params.start
          that.fdvDataZoomMax = params.end

          that.currenTime = Math.round(that.fdvChartDataArr[0].xAxisData.length * params.start / this.flightRateValue / 100)
          that.fdvDataZoomMinTime = Math.round(that.fdvChartDataArr[0].xAxisData.length * params.start / this.flightRateValue / 100)
          that.fdvDataZoomMaxTime = Math.round(that.fdvChartDataArr[0].xAxisData.length * params.end / this.flightRateValue / 100)

          // that.fdvDialogCurrentPage = Math.ceil(parseInt(that.fdvDataZoomMinTime * that.flightRateValue) / 100)
          that.fdvDialogCurrentPage = 1
        }
      })
    },
    saveFdvChartName () { // 保存fdv图表数据
      if (this.$store.state.analysisParamsId === '') {
        this.$message({
          type: 'warning',
          message: '没有分析编号无法保存！'
        })
        return false
      }
      // if (this.listNameArr.length <= 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '没有数据无法保存！'
      //   })
      //   return false
      // }
      // if (this.listIDArr.length <= 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '没有数据无法保存！'
      //   })
      //   return false
      // }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/toExplorer/saveFdvInfo',
        method: 'post',
        params: {
          id: this.$store.state.analysisParamsId,
          listName: this.$util.distinctArray(this.listIDArr).join(',')
          // listName: this.$util.distinctArray(this.listNameArr).join(',')
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then(response => {
        console.log('saveFdvInfo~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          this.$message({
            message: '数据保存成功！',
            type: 'success'
          })
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    exportFdvChartName () { // 导出fdv图表数据
      if (this.showChartOrTable === 'chartTypeTab') {
        if (this.fdvChartDataArr.length <= 0) {
          this.$message({
            type: 'warning',
            message: '没有图表数据无法导出！'
          })
          return false
        }
        this.exportBtnDisabled = true
        setTimeout(() => {
          this.saveImage('fdvChartInfoBox', '工程参数视图_图表')
        }, 500)
      } else {
        if (this.listNameArr.length <= 0) {
          this.$message({
            type: 'warning',
            message: '没有数据无法导出！' // 没有表格数据无法导出
          })
          return false
        }
        this.$store.commit('SHOW_LOADING', '正在导出数据，请稍等！')
        this.$axios({
          url: '/export/exportFdv',
          method: 'get',
          params: {
            flightId: this.currentFlightId,
            listName: this.$util.distinctArray(this.listNameArr).join(','),
            start: this.fdvDataZoomMinTime,
            end: this.fdvDataZoomMaxTime
          },
          responseType: 'blob'
        }).then(response => {
          console.log('exportFdv~~~:', response)
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          let contentDispositionStr = response.headers['content-disposition']
          let contentDispositionArr = contentDispositionStr.split('=')
          let fileName = contentDispositionArr[1] // 获取文件名字
          let blobType = response.headers['content-type'] // 获取类型
          let blob = new Blob([response.data], {type: blobType})
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          this.$message({
            message: '数据导出成功！',
            type: 'success'
          })
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    deleteFdvChartByName (name) { // 通过名字删除图表中的数据
      let that = this
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 销毁图表
        if (that.fdvChart) {
          that.fdvChart.dispose()
          console.log('在deleteFdvChartByName中调用销毁存在的fdvChart')
        }

        that.mergeParamList = []

        that.tempMergeParamList.forEach((n, index) => {
         if (JSON.stringify(n) === JSON.stringify(name)) {
           that.tempMergeParamList.splice(index, 1)
         }
        })

        if (name.indexOf('|') > 0) {
          // 删除对应的数据
          that.fdvChartDataArr.forEach((n, index) => {
            if (n.legend === name) {
              that.fdvChartDataArr.splice(index, 1)
            }
          })

          let nameList = name.split('|')
          nameList.forEach((n, index) => {
            that.removeNameItem(n)
          })
        } else if (name instanceof Array) {
          // 删除对应的数据
          that.fdvChartDataArr.forEach((n, index) => {
            if (JSON.stringify(n.legend) === JSON.stringify(name)) {
              that.fdvChartDataArr.splice(index, 1)
            }
          })

          name.forEach((n, index) => {
            that.removeNameItem(n)
          })
        } else {
          // 删除对应的数据
          that.fdvChartDataArr.forEach((n, index) => {
            if (n.legend === name) {
              that.fdvChartDataArr.splice(index, 1)
            }
          })

          that.listNameArr.forEach((n, index) => {
            if (n === name) {
              that.listNameArr.splice(index, 1)
              that.listIDArr.splice(index, 1)
            }
          })

          // TODO: deleteFdvChartByName
          that.fdvDialogColumnData.forEach((n, index) => {
            if (n.prop === name) {
              that.fdvDialogColumnData.splice(index, 1)
            }
          })
          that.fdvDialogTableData = that.fdvDialogTableData.map((n, index) => {
            let tempObj = n
            delete tempObj[name]
            return tempObj
          })
        }

        if (that.listNameArr.length > 0) {
          // const tempObj = {
          //   flightId: this.currentFlightId,
          //   listName: this.$util.distinctArray(this.listNameArr).join(','),
          //   flightRate: this.flightRateValue
          // }
          // this.getFdvById(tempObj)

          this.renderFdvChart()
          this.fdvChart.resize()
        } else {
          this.flightPhaseSelectValue = ''
          this.fdvDialogColumnData = []
          this.fdvDialogTableData = []
          this.fdvDialogTableDataList = []

          this.fdvDataZoomMinTime = 0
          this.fdvDataZoomMaxTime = 0

          this.flightRate = 0
          this.flightRateValue = 1

          that.listNameArr = []
          that.listIDArr = []

          this.tempMergeParamList = []
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除操作！'
        })
      })
    },
    removeNameItem (name) {
      let that = this
      // 删除对应的数据
      // this.fdvChartDataArr.forEach((n, index) => {
      //   if (n.legend === name) {
      //     this.fdvChartDataArr.splice(index, 1)
      //   }
      // })

      that.listNameArr.forEach((n, index) => {
        if (n === name) {
          that.listNameArr.splice(index, 1)
          that.listIDArr.splice(index, 1)
        }
      })

      // // TODO: deleteFdvChartByName
      that.fdvDialogColumnData.forEach((n, index) => {
        if (n.prop === name) {
          that.fdvDialogColumnData.splice(index, 1)
        }
      })
      that.fdvDialogTableData = that.fdvDialogTableData.map((n, index) => {
        let tempObj = n
        delete tempObj[name]
        return tempObj
      })
    },
    changeFlightRate () { // 改变采集频率
      console.log(this.flightRate + ' === ' + this.flightRateValue)
      console.log(this.listNameArr)
      if (this.listNameArr.length > 0) {
        const tempObj = {
          flightId: this.currentFlightId,
          ids: this.$util.distinctArray(this.listIDArr).join(','),
          // listName: this.$util.distinctArray(this.listNameArr).join(','),
          flightRate: this.flightRateValue
        }
        if (tempObj.ids !== '') {
          this.getFdvById(tempObj)
        }
      }
    },
    changeIsDataZoom () {
      this.isChangeDataZoom = true
    },
    getPrecent () { // 获取区间的大小
      this.isChangeDataZoom = false
      if (!this.$util.isDefine(this.currentFlightId)) {
        this.$message({
          type: 'warning',
          message: '没有航班号，暂时无法查询数据！'
        })
        return false
      }

      if (this.flightPhaseSelectValue === 'all') {
        this.fdvChart.dispatchAction({
          type: 'dataZoom',
          dataZoomIndex: 0,
          start: parseFloat(0),
          end: parseFloat(100)
        })
        this.fdvDataZoomMin = 0
        this.fdvDataZoomMinTime = parseInt(this.fdvChartDataArr[0].xAxisData.length * 0 / this.flightRateValue / 100)
        this.fdvDataZoomMax = 100
        this.fdvDataZoomMaxTime = parseInt(this.fdvChartDataArr[0].xAxisData.length * 100 / this.flightRateValue / 100)
        this.currenTime = this.fdvDataZoomMinTime

        this.fdvDialogCurrentPage = 1
        this.fdvChart.resize()

        return false
      }

      if (this.flightPhaseSelectValue === '自定义') {
        this.isChangeDataZoom = true

        setTimeout(() => {
          this.changeFdvDataZoom()
        }, 500)
        return false
      }

      this.$store.commit('HIDE_LOADING', '拼命加载中!')
      let _self = this
      let load = this.openLoading()

      this.$axios({
        url: '/toExplorer/getPrecent',
        method: 'get',
        params: {
          flightId: this.currentFlightId,
          flightPhase: this.flightPhaseSelectValue
        }
      }).then(response => {
        console.log('getPrecent~~~:', response)

        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (_self.$util.isNotEmptyObject(resultData)) {
            let minValue = resultData.start
            let maxValue = resultData.end
            if (_self.$util.isDefine(minValue) && _self.$util.isDefine(maxValue)) {
              if (_self.$util.isNotEmptyObject(_self.fdvChartDataArr)) {
                if (_self.fdvChartDataArr[0].xAxisData.length > 0) {
                  _self.fdvDataZoomMin = minValue
                  _self.fdvDataZoomMinTime = parseInt(_self.fdvChartDataArr[0].xAxisData.length * minValue / _self.flightRateValue / 100)
                  _self.fdvDataZoomMax = maxValue
                  _self.fdvDataZoomMaxTime = parseInt(_self.fdvChartDataArr[0].xAxisData.length * maxValue / _self.flightRateValue / 100)
                  _self.currenTime = _self.fdvDataZoomMinTime
                }
              }

              if (_self.fdvChart) {
                _self.fdvChart.dispatchAction({
                  type: 'dataZoom',
                  dataZoomIndex: 0,
                  start: parseFloat(minValue),
                  end: parseFloat(maxValue)
                })

                // _self.fdvChart.resize()
              }
              // _self.fdvDialogCurrentPage = Math.ceil(parseInt(_self.fdvDataZoomMinTime * this.flightRateValue) / 100)
              _self.fdvDialogCurrentPage = 1
            }
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }

        if (load) {
          setTimeout(() => {
            _self.closeLoading(load)
          }, 2000)
        }
      }).catch(response => {
        this.$message.error('请求响应失败，请稍后重试！')

        if (load) {
          setTimeout(() => {
            _self.closeLoading(load)
          }, 2000)
        }
      })
    },
    changeShowChartOrTable (type) { // fdvdialog中表格和图表切换标识
      this.showChartOrTable = type
      if (type === 'chartTypeTab') {
        setTimeout(() => {
          this.renderFdvChart()
          this.fdvChart.resize()
        }, 300)
      }
      // else {
      //   let tempParams = {
      //     flightId: this.currentFlightId,
      //     ids: this.$util.distinctArray(this.listIDArr).join(','),
      //     flightRate: this.flightRateValue
      //   }
      //   this.getFdvById(tempParams)
      // }
    },
    changeZoomOnMouseWheel1 (event) {
      this.isChangeDataZoom = true
    },
    changeZoomOnMouseWheel (event) {
      // .originalEvent.wheelDelta
      let delta = (event.wheelDelta && (event.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
                  (event.detail && (event.detail > 0 ? -1 : 1)) // firefox

      this.isChangeDataZoom = true
      if (delta > 0) {
        console.log('====向上滚')

        if (this.fdvDataZoomMin.toString() === '0' && this.fdvDataZoomMax.toString() === '100') {
          return false
        }

        this.fdvDataZoomMin = parseInt(this.fdvDataZoomMin) - 1
        this.fdvDataZoomMax = parseInt(this.fdvDataZoomMax) + 1

        if (this.fdvDataZoomMin < 0) {
          this.fdvDataZoomMin = 0
        }
        if (this.fdvDataZoomMax > 100) {
          this.fdvDataZoomMax = 100
        }
      } else if (delta < 0) {
        console.log('====向下滚')

        if (this.fdvDataZoomMin.toString() === this.fdvDataZoomMax.toString()) {
          return false
        }

        this.fdvDataZoomMin = parseInt(this.fdvDataZoomMin) + 1
        this.fdvDataZoomMax = parseInt(this.fdvDataZoomMax) - 1

        if (this.fdvDataZoomMin > this.fdvDataZoomMax) {
          this.fdvDataZoomMin = this.fdvDataZoomMax
        }
      }

      this.fdvChart.dispatchAction({
        type: 'dataZoom',
        dataZoomIndex: 0,
        start: parseInt(this.fdvDataZoomMin),
        end: parseInt(this.fdvDataZoomMax)
      })
    },
    fdvDialogTableCurrentChange (val) { // 改变当前页
      console.log(`当前页: ${val}`)
      this.fdvDialogCurrentPage = val
    },
    fdvDialogTableHeaderHandle (column, ev) { // 表格删除某列
      let name = column.property
      this.deleteFdvChartByName(name)
    },
    /*
     * 保存图片的方法（即按钮点击触发的方法）
     * 第一个参数为需要保存的div的id名
     * 第二个参数为保存图片的名称
     */
    saveImage (divText, imgText) {
      // document.getElementById('photoInfo').style.display = 'flex'
      this.$store.commit('SHOW_LOADING', '正在导出图表，请稍等！')

      let canvasID = this.$refs[divText]
      let that = this
      let a = document.createElement('a')
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'

        let blob = that.$util.dataURLToBlob(dom.toDataURL('image/png'))
        a.setAttribute('href', URL.createObjectURL(blob))
        //这块是保存图片操作  可以设置保存的图片的信息
        a.setAttribute('download', imgText + '.png')
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blob)

        document.body.removeChild(dom)
        document.body.removeChild(a)
        // that.chartInfoTool = false
        // document.getElementById('photoInfo').style.display = 'none'

        setTimeout(() => {
          that.$store.commit('HIDE_LOADING', '拼命加载中!')
          that.exportBtnDisabled = false
        }, 4 * 1000)
      })
    },

    postExcelFile (params, url) { // params是post请求需要的参数，url是请求url地址
      params = this.currentFlightId
      url = '/DSAP/flightRecords/downloadCsv'

      this.$store.commit('SHOW_LOADING', '正在导出数据，请稍等！')
      let form = document.createElement('form')
      form.style.display = 'none'
      form.action = url
      form.method = 'post'
      form.target = '_blank'
      document.body.appendChild(form)

      form.innerHTML = '<input name="flightInfoId" id="flightInfoId" value="' + params + '" />'

      form.submit()
      form.remove()
      this.dialogExportVisible = false

      setTimeout(() => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      }, 4 * 1000)
    },

    changeFdvDataZoom () {
      console.log(this.fdvDataZoomMinTime, this.fdvDataZoomMaxTime)
      // let reg = /-?\d+(\.\d+)?/g
      // -?\\d+(\\.\\d+) | \\d+(\\.\\d+)
      this.flightPhaseSelectValue = '自定义'
      this.currenTime = this.fdvDataZoomMinTime
      let reg = new RegExp('^[\\d+(\\.\\d+)]*$')
      if (!(reg.test(this.fdvDataZoomMinTime))) {
        this.$message.warning('开始时间输入错误！')
        return false
      }
      if (!(reg.test(this.fdvDataZoomMaxTime))) {
        this.$message.warning('结束时间输入错误！')
        return false
      }
      if (parseFloat(this.fdvDataZoomMinTime) > parseFloat(this.fdvDataZoomMaxTime)) {
        this.$message.warning('开始时间必须小于结束时间！')
        return false
      }
      if (this.fdvChartDataArr.length < 1) { // && this.fdvChartDataArr[0] && this.fdvChartDataArr[0].xAxisData && this.fdvChartDataArr[0].xAxisData.length < 1
        return false
      }

      this.fdvChart.dispatchAction({
        type: 'dataZoom',
        dataZoomIndex: 0,
        start: parseFloat(this.fdvDataZoomMinTime * this.flightRateValue / this.fdvChartDataArr[0].xAxisData.length * 100), //.toFixed(2)
        end: parseFloat(this.fdvDataZoomMaxTime * this.flightRateValue / this.fdvChartDataArr[0].xAxisData.length * 100)
      })
      // this.fdvDialogCurrentPage = Math.ceil(parseInt(this.fdvDataZoomMinTime * this.flightRateValue) / 100)
      this.fdvDialogCurrentPage = 1
    },
    addOrCutFdvDataZoom (obj, type) {
      if (this.listNameArr.length <= 0) {
        return false
      }

      if (obj === 'fdvDataZoomMin') {
        if (type === 'add') {
          this.fdvDataZoomMinTime = parseFloat(this.fdvDataZoomMinTime) + 1
        } else {
          this.fdvDataZoomMinTime = parseFloat(this.fdvDataZoomMinTime) - 1
        }
      } else {
        if (type === 'add') {
          this.fdvDataZoomMaxTime = parseFloat(this.fdvDataZoomMaxTime) + 1
        } else {
          this.fdvDataZoomMaxTime = parseFloat(this.fdvDataZoomMaxTime) - 1
        }
      }

      this.changeFdvDataZoom()
    },
    showCurrentTime (value) {
      console.log(value)
      this.currenTime = value['name']
      this.changeShowChartOrTable('chartTypeTab')

      this.fdvDataZoomMinTime = value['name']
      this.fdvDataZoomMaxTime = value['name']

      this.fdvChart.dispatchAction({
        type: 'dataZoom',
        dataZoomIndex: 0,
        start: 0,
        end: 100
      })
      this.fdvChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: parseFloat(value['name']) - 1
      })
    },

    // Loading加载
    openLoading () {
      const loading = this.$loading({
        lock: true,
        text: '正在渲染图表...',
        spinner: 'el-icon-loading',
        background: 'hsla(0,0%,100%,.4)'
      })
      return loading
    },
    closeLoading (loading) {
      loading.close()
    }
  }
}
</script>

<style >
  .el-loading-spinner i {
    font-size: 44px;
  }
/* 窗口高度大于800px */
@media screen and (min-width: 850px) {
  .analysisView .view-pagination {
    display: flex;
    justify-content: center;
  }
  .analysisView .view-chart-content .el-pagination button {
    margin: 0 2px;
  }
  .analysisView .view-chart-content .el-pagination .el-pagination__total {
    margin-right: 2px;
  }
  .analysisView .view-chart-content .el-pagination .el-pagination__jump {
    margin-left: 0;
  }
  .analysisView .view-chart-content .el-pagination .el-pager .more {
    margin: 0 2px;
  }
  .analysisView .view-chart-content .el-pagination .el-pager .number,
  .analysisView .view-chart-content .el-pagination .btn-prev,
  .analysisView .view-chart-content .el-pagination .btn-next {
    margin: 0 2px;
    min-width: 20px;
  }
  .analysisView .view-pagination .el-pagination {
    height: 35px;
    margin-top: 15px;
    display: flex;
    overflow-x: auto;
  }
  .analysisView .view-pagination .el-pagination .el-pagination__editor {
    width: 32px;
  }
}
</style>
<style scoped>
.left-menu {
  height: 100%;
  width: 60px;
  background: #F9F9F9;
}
/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .left-menu-item {
    width: 60px;
    height: 84px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .left-menu-item {
    width: 60px;
    height: 60px;
  }
}
.left-menu-item img {
  width: 24px;
  height: 24px;
  margin-bottom: 12px;
}
.show-menu {
  position: relative;
  opacity: 1;
  background: #ffffff;
  border-left: 2px solid #3A6BB9;
}
.show-menu::before {
  content: '';
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: #2F4B77;
  position: absolute;
  top: 40%;
  left: 0;
}

.hide-menu {
  opacity: .5;
}
.view-table {
  border-left: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
  width: 350px;
  z-index: 100;
}
.view-table-btn {
  height: 80px;
  width: 100%;
  overflow: auto;
}

.tree-head-icon {
  margin: 10px 10px 5px;
}
.tree-desc {
  width: 100%;
  height: 80px;
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

.view-table-btn-info {
  margin: 10px 20px 0 20px;
}
.view-table-btn-info span:first-child {
  color: #666666;
  font-size: 12px;
  line-height: 14px;
}
.view-table-btn-info span:last-child {
  color: #333333;
  font-size: 12px;
  line-height: 16px;
}
.view-table-btn button {
  width: 124px;
  height:26px;
  padding: 3px 20px;
  border-radius: 4px;
  color: #1E3354;
}

.view-table-content >>> .el-table {
  color: #333333;
  font-size: 12px;
}
.view-table-content >>> .el-table td, .view-table-content >>> .el-table th {
  padding: 8px 0;
  font-weight: normal;
}
.view-table-content >>> .el-table .cell {
  line-height: 14px;
}
.view-table-content >>> .view_header_row_class {
  color: #2A436F;
  font-size: 12px;
  line-height: 14px;
  height: 30px;
  background: #F9F9F9;
}
.view-tree >>> .el-tree__empty-text,
.fdv-dialog-tree >>> .el-tree__empty-text {
  /* left: 15px !important; */
  font-size: 12px;
}
.view-table-content >>> .view_cell_class {
  color: #999999;
}
.view-table-content >>> tr:hover>td {
  color: #3A6BB9;
  background: rgba(58,107,185,0.10);
}
.view-tree-content {
  width: 240px;
  height: 100%;
}
.view-tree {
  overflow: auto;
}
.view-tree::-webkit-scrollbar{
   width: 8px;
  height: 8px;
}
.view-tree::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cccccc;
}
.view-tree  >>> .tree-text-line {
  width: 140px !important;
}
.view-pagination {
  /* display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center; */
  height: 80px;
  border-top: 1px solid #e5e5e5;
  width: 100%;
}
.view-pagination >>> .el-pagination {
  white-space: inherit;
}
.view-pagination >>> .el-pagination > * {
  margin-bottom: 8px;
}
.view-chart {
  position: relative;
}
.view-chart-btn {
  position: relative;
  z-index: 99;
  width: 100%;
  background: #F9F9F9;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  line-height: 31px;
  height: 31px;
}
.view-chart-empty-text {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  color: #909399;
}
.grid-dialog >>> .el-dialog {
  margin: 5vh auto 0 !important;
  width: 95%;
  height: 90vh;
  display: flex;
  flex-direction: column;
}
.grid-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 90%;
  flex: 1;
}

.analysis_view_dialog >>> .el-dialog__body {
  padding: 15px 20px;
}
.analysis_view_dialog >>> .el-dialog__body h5 {
  margin: 0;
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
  background: #eee;
}
.analysis_view_dialog >>> .el-dialog__body .el-form {
  max-height: 300px;
  overflow: auto;
}
.analysis_view_dialog >>> .el-form-item .el-form-item__content .el-select .el-input {
  width: 100% !important;
}
.analysis_view_dialog >>> .el-form-item .el-form-item__content .el-select,
.analysis_view_dialog >>> .el-form-item .el-form-item__content .el-input {
  width: 50% !important;
}
/*
.grid-dialog >>> .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
} */
.grid-dialog >>> .el-dialog__headerbtn {
  top: 10px !important;
}
.grid-dialog >>> .el-dialog__header {
  padding: 5px 20px !important;
  border-bottom: 1px solid #DDDDDD;
}
.fdv-dialog-left {
  width: 20%;
  height: 100%;
  border-right: 1px solid #DDDDDD;
}
.fdv-dialog-left .tree-footer-icon {
  margin-bottom: 0;
}
.fdv-dialog-tree {
  overflow: auto;
}
.fdv-dialog-tree >>> .tree-text-line {
  width: 150px !important;
}
.fdv-dialog-right {
  position: relative;
  width: 78%;
  height: 100%;
  margin: 0 auto;
}
.fdv-dialog-chart {
  position: relative;
  overflow: auto;
  width: 100%;
  display: flex;
  flex: 1;
}
.fdv-dialog-table {
  position: relative;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fdv-chart {
  width: 98%;
  height: 30%;
  margin: 10px;
  border: 1px solid #DDDDDD;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.viewChart-empty-text {
  position: relative;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  color: #909399;
}
.view-chart .viewChart-empty-text {
  position: absolute;
}
.file-new-bottom {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.file-new-bottom button {
  padding: 0;
  margin: 0 10px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 100px;
  height: 34px;
}
.delete-button .item {
  position: absolute;
  right: 15px;
  font-size: 30px;
  z-index: 9999999;
}

.delete-button .item i {
  transform: scale(.8)
}

.delete-button .item >>> .el-checkbox {
  margin-left: 7px;
}

.delete-button .item >>> .el-checkbox__label {
  display: none;
}

.dialog-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  width: 95%;

  box-sizing: border-box;
  height: 35px;
  font-size: 12px;
  color: #9B9B9B;
}
.dialog-title .header {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  color: #555555;
  margin-right: 20px;
}
.dialog-title .header-info span {
  padding-right: 15px;
}

.toolbar {
  margin: 10px 10px;
  box-sizing: border-box;

  /* align-self: flex-end; */
}

.toolbar >>> .el-button--small, .el-button--small.is-round {
  padding: 9px 5px;
}

.time-box {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 12px;
  color: #555555;

  margin-right: 20px;
}
.time-box >>> .el-input {
  width: 85px;
}

.time-box >>> .el-input__inner {
  padding: 0 8px;
}

.time-box .icon {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 20px;
}
.time-box .icon.q {
  background: #74C881;
}
.time-box .icon.z {
  background: #FF0000;
}

.time-title {
  display: block;
  margin: 0 10px;
}

.time-box .time-btns {
  position: absolute;
  top: 2px;
  right: 5px;
  box-sizing: border-box;
}
.time-box .time-btns i {
  display: block;
  cursor: pointer;
  font-size: 12px;
  width: 12px;
  height: 12px;
}

.flight-phase-name {
  margin-right: 10px;
  float: left;
  height: 29px;
  line-height: 29px;
}

.caiyang-rate {
  display: flex;
  position: relative;
}
.caiyang-rate  .title {
  margin-right: 15px;
  height: 29px;
  line-height: 29px;
}
.caiyang-rate >>> .el-slider__bar {
  background-color: transparent !important;
}
.caiyang-rate >>> .el-slider__runway {
  margin: 12px 0;
}

.caiyang-rate .marks-text {
  position: absolute;
  transform: translateX(-50%);
  font-size: 12px;
  color: #909399;
  top: 20px;
}

.current-time {
  margin-left:auto;
  margin-right: 14px;
  font-size: 12px;
  color: #9B9B9B;
}
.current-time strong {
  color: #FF0000;
}

.btn-tabs {
  display: flex;
  margin-left: 10px;
  font-size: 12px;
  color: #1E3354;
  text-align: center;
  cursor: pointer;
}
.btn-tabs span {
  display: inline-block;
  width: 40px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #DDDDDD;
  box-sizing: border-box;
}
.btn-tabs span.active {
  background: #3A6BB9;
  color: #FFFFFF;
  border: none;
}

/* 清除百度地图的下边备案信息 */
.view-chart-map >>> .BMap_cpyCtrl {
  display: none !important;
}
/* 清除百度地图下边logo */
.view-chart-map >>> .anchorBL {
  display: none !important;
}
.fdv-dialog-pagination {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.w20 {
  width: 20%;
}
.w80 {
  width: 80%;
}
.fdv-dialog-tabs {
  width: 20%;
  height: 100%;
}
.fdv-dialog-tabs .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fdv-dialog-tabs >>> .el-tabs__header.is-top {
  height: 50px;
}
.fdv-dialog-tabs >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fdv-dialog-tabs >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}

.view-pagination >>> .el-pagination__editor.el-input,
.fdv-dialog-pagination >>> .el-pagination__editor.el-input {
  vertical-align: top;
}

.toolbar .el-button--small{
  width: 40px !important;
}

</style>

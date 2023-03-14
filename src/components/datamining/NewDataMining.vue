<template>
  <div class="file-new-container df df-fd-r df-jc-fs">
    <div class="file-new-left cm_tab_file_new_left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="mini" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="file-new-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="fileNewTreeRef"
          node-key="ID"
          highlight-current
          :data="fileNewTreeData"
          :props="defaultFileNewTreeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="fileNewNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="treeNodeDesc">说明：</span>
          <span v-show="treeNodeDesc">{{treeNodeDesc}}</span>
        </div>
      </div>
    </div>
    <div class="file-new-middle cm_tab_file_new_main df df-fd-c">
      <div class="flex-new-top basic-tab df df-fd-r df-f1 w100">
        <div class="file-new-content cm_main_content df df-fd-c">
          <el-tabs ref="anayTabs" v-model="fileNewContentActiveName" @tab-click="tabFileNewContent">
            <el-tab-pane label="筛选配置" name="filterConfig">
              <div class="filter-config-table">
                <el-table
                  :row-style="{height:'38px'}"
                  :cell-style="{padding:'0px'}"
                  :header-row-style="{height:'38px'}"
                  :header-cell-style="{padding:'0px'}"
                  :data="filterCfgData"
                  style="width: 100%;"
                  height="100%"
                  highlight-current-row
                  fit
                  @row-click="filterConfigTableRowHandle"
                  :header-row-class-name="headerRowClassName"
                  :row-class-name="tableRowClassName">
                  <el-table-column prop="name" label="参数" width="400"></el-table-column>
                  <el-table-column prop="filter" label="过滤条件" width="auto"></el-table-column>
                  <!--
                  <el-table-column
                    label="过滤条件"
                    width="auto">
                    <template slot-scope="scope">
                      <div class="cell" :title="scope.row.filter">{{ scope.row.filter }}</div>
                    </template>
                  </el-table-column>
                   -->
                  <el-table-column label="" width="50" align="center">
                    <template slot-scope="scope" v-if="scope.row['type'] != 9999">
                      <div class="icon-delete tab-icon-set row-icon-group" @click.stop="filterRowDelete(scope.$index, filterCfgData)"></div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据配置" name="dataConfig">
              <div class="filter-config-table">
                  <el-table
                    :row-style="{height:'38px'}"
                    :cell-style="{padding:'0px'}"
                    :header-row-style="{height:'38px'}"
                    :header-cell-style="{padding:'0px'}"
                    :data="dataConfigTableData"
                    style="width: 100%;"
                    height="100%"
                    highlight-current-row
                    fit
                    @row-click="dataConfigTableRowHandle"
                    :header-row-class-name="headerRowClassName"
                    :row-class-name="tableRowClassName">
                    <el-table-column prop="name" label="参数"></el-table-column>
                    <el-table-column label="" width="50" align="center">
                      <template slot-scope="scope" v-if="scope.row['type'] != 9999">
                        <div class="icon-delete tab-icon-set row-icon-group" @click.stop="dataConfigRowDelete(scope.$index, dataConfigTableData)"></div>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="file-new-right cm_main_attr df df-fd-c">
          <el-tabs v-model="fileNewRightActiveName">
            <el-tab-pane label="属性" name="attr">
              <!-- 新建挖掘名称 -->
              <div class="m20 df df-fd-c df-jc-fs df-ai-c">
                <div class="df df-fd-r df-jc-fs df-ai-c w100">
                  <span class="file-name">名称：</span>
                  <div class="df-f1" style="min-width: 0;">
                    <el-input
                      placeholder="请输入新建挖掘名称"
                      v-model="fileNewName"
                      size="mini"
                      @change="changeFileNewName">
                      <!--
                      @blur="blurFileNewName" -->
                      <i class="el-icon-close m10" slot="suffix" @click="closeFileNewNameInput"></i>
                    </el-input>
                  </div>
                </div>

                <div class="alert-info" style="margin-top: 15px;" v-show="!isSubmit && alertTitleName !== ''">
                  <el-alert
                    :title="alertTitleName"
                    type="error"
                    :closable="false"
                    show-icon>
                  </el-alert>
                </div>
              </div>

              <!-- 筛选配置属性 -->
              <div v-show="fileNewContentActiveName === 'filterConfig'">
                <!-- 筛选配置属性中数据权限 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 9999">
                  <div class="mb10 mt10">数据权限：</div>
                  <div class="df df-fd-c df-jc-fs df-ai-fs w100 view-power" style="margin-left: -10px;">
                    <el-tree
                      node-key="id"
                      :data="viewPowerData"
                      :props="defaultViewPowerData"
                      @node-click="dataViewPowerClick">
                    </el-tree>
                  </div>
                </div>
                <!-- 筛选配置属性中第二种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 2">

                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1">
                    <span class="df-f1">查询方式: </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="1">模糊查询</el-radio>
                      <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="2">精确查询</el-radio>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-fs df-ai-c mt20">
                    <span class="df-f1">{{inputTypeName}}：</span>
                    <div class="df-f3">
                      <el-input size="mini" placeholder="请输入内容" v-model="inputTypeNameValue"  @change="changeInputTypeNameValue"></el-input>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="inputTypeNameValueFlag" @change="changeInputTypeNameValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="inputTypeNameValueFlag" @change="changeInputTypeNameValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第三种类型 -->
                <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 3">
                  <el-radio v-model="attrOneRadio" label="1" class="mb10" @change="changeAttrOneRadio">筛选条件</el-radio>
                  <div class="standardRadio" v-show="attrOneRadio === '1'" >
                    <el-select size="mini" v-model="standardSelectValue" placeholder="请选择过滤条件" @change="changeStandardSelectValue">
                      <el-option v-for="item in standardSelectData"
                                 class="filter-attr-input"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input size="mini"
                              v-model="standardMinValue"
                              v-show="parseInt(standardSelectValue) > 0"
                              @change="changeStandardMinValue"
                              @blur="blurStandardMinValue"
                              placeholder="请输入内容"
                              autofocus
                              class="filter-attr-input mt10">
                    </el-input>
                    <el-input size="mini"
                              v-model="standardMaxValue"
                              v-show="parseInt(standardSelectValue) > 6"
                              @change="changeStandardMaxValue"
                              @blur="blurStandardMaxValue"
                              placeholder="请输入内容"
                              class="filter-attr-input mt10">
                    </el-input>
                  </div>
                </div>
                <!-- 筛选配置属性中第四种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 4">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">逻辑值：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="logicalValue"
                                 placeholder="请选择"
                                 @change="changeLogicalValue">
                        <el-option
                          v-for="item in logicalValueListData"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第五种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 5">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">事件：</span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="eventHappenValueFlag" @change="changEventHappenValueFlag" label="1">已发生</el-radio>
                      <el-radio v-model="eventHappenValueFlag" @change="changEventHappenValueFlag" label="0">未发生</el-radio>
                    </div>
                  </div>

                  <div v-if="eventHappenValueFlag === '1'" class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span>事件等级：</span>
                    <el-select size="mini"
                               v-model="eventLevelValue"
                               value-key="VALUE"
                               placeholder="请选择"
                               multiple
                               collapse-tags
                               @change="changEventLevelValue">
                      <el-option
                        v-for="item in eventLevelData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!-- 筛选配置属性中第五种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 51">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="notHotWordsSearchValue"
                                 value-key="value"
                                 placeholder="请选择"
                                 multiple
                                 @change="changeNotHotWordsSearchValueEvent51">
                        <el-option
                          v-for="item of notHotWordsSearchData"
                          :key="`${item.columnname}${item.value}`"
                          :label="item.columnname"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div v-if="eventHappenValueFlag === '1'" class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span>事件等级：</span>
                    <el-select size="mini"
                               v-model="eventLevelValue"
                               value-key="VALUE"
                               placeholder="请选择"
                               multiple
                               collapse-tags
                               @change="changEventLevelValue51">
                      <el-option
                        v-for="item in eventLevelData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!-- 筛选配置属性中第五种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 52">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{hotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="hotWordsSearchValue"
                                 filterable
                                 remote
                                 multiple
                                 reserve-keyword
                                 placeholder="请输入关键词"
                                 :remote-method="hotWordsSearchMethod"
                                 :loading="hotWordsSearchLoading"
                                 @change="changeHotWordsSearchValueEvent">
                        <el-option
                          v-for="item of hotWordsSearchListData"
                          :key="`${item.columnname}${item.PRO_NO}`"
                          :label="item.columnname"
                          :value="item.PRO_NO">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span>事件等级：</span>
                    <el-select size="mini"
                               v-model="agsEventLevelValue"
                               placeholder="请选择"
                               multiple
                               collapse-tags
                               @change="changAgsEventLevelValue">
                      <el-option
                        v-for="item in agsEventLevelData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!-- 筛选配置属性中第六种类型 -->
                <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 6">
                  <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="3" class="mb10 mt10 w100">按时间段查询</el-radio>
                  <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="4" class="mb10 mt10 w100">按时间点查询</el-radio>

                  <div class="df df-fd-c df-jc-fs df-ai-fs w100" v-show="attrSixRadio === '3'">
                    <div class="df df-fd-r df-jc-c df-ai-c">
                      <span class="file-name">开始</span>
                      <el-date-picker
                        v-if="currentFilterConfigRowAttrName === 'FLIGHT_DATE'"
                        v-model="accordDayStartDate"
                        @change="changeAccordDayStartDate"
                        @blur="blurAccordDayStartDate"
                        type="date"
                        placeholder="选择开始日期"
                        default-time="00:00:00"
                        class="df-f1 mt10 mb10">
                      </el-date-picker>
                      <el-date-picker
                        v-else
                        v-model="accordDayStartDate"
                        @change="changeAccordDayStartDate"
                        @blur="blurAccordDayStartDate"
                        type="datetime"
                        placeholder="选择开始日期"
                        default-time="00:00:00"
                        class="df-f1 mt10 mb10">
                      </el-date-picker>
                    </div>
                    <div class="df df-fd-r df-jc-c df-ai-c">
                      <span class="file-name">结束</span>
                      <el-date-picker
                        v-if="currentFilterConfigRowAttrName === 'FLIGHT_DATE'"
                        v-model="accordDayEndDate"
                        @change="changeAccordDayEndDate"
                        @blur="blurAccordDayEndDate"
                        type="date"
                        placeholder="选择结束日期"
                        default-time="23:59:59"
                        class="df-f1">
                      </el-date-picker>
                      <el-date-picker
                        v-else
                        v-model="accordDayEndDate"
                        @change="changeAccordDayEndDate"
                        @blur="blurAccordDayEndDate"
                        type="datetime"
                        placeholder="选择结束日期"
                        default-time="23:59:59"
                        class="df-f1">
                      </el-date-picker>
                    </div>
                  </div>

                  <div class="df df-fd-c df-jc-fs df-ai-fs w100 data-point" v-show="attrSixRadio === '4'">
                    <el-select size="mini" v-model="dataPointY" multiple collapse-tags @change="changeDataPointType" placeholder="年">
                      <!-- <el-option
                        v-for="item in [2017, 2018, 2019]"
                        :key="item"
                        :label="item + '年'"
                        :value="item"
                        size="mini">
                      </el-option> -->
                      <el-option
                        v-for="item in yearList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select size="mini" v-model="dataPointM" multiple collapse-tags @change="changeDataPointType" placeholder="月">
                      <el-option
                        v-for="item in 12"
                        :key="item"
                        :label="item + '月'"
                        :value="item"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select size="mini" v-model="dataPointD" multiple collapse-tags @change="changeDataPointType" placeholder="日">
                      <el-option
                        v-for="item in 31"
                        :key="item"
                        :label="item + '日'"
                        :value="item"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select size="mini" v-model="dataPointH" multiple collapse-tags @change="changeDataPointType" placeholder="小时" v-show="currentFilterConfigRowAttrName !== 'FLIGHT_DATE'">
                      <el-option
                        v-for="item in 24"
                        :key="item"
                        :label="item - 1 + '点'"
                        :value="item - 1"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select size="mini" v-model="dataPointQ" multiple collapse-tags @change="changeDataPointType" placeholder="季度">
                      <el-option
                        v-for="item in dataPointQArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select size="mini" v-model="dataPointW" multiple collapse-tags @change="changeDataPointType" placeholder="星期">
                      <el-option
                        v-for="item in dataPointWArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!-- 筛选配置属性中第七种类型 非搜索类型-->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 7">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20" v-if="currentFilterConfigRowAttrName === 'FLIGHT_UNIT_NAME'">
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="notHotWordsSearchValue"
                                 value-key="VALUE"
                                 placeholder="请选择"
                                 multiple
                                 @change="changeNotHotWordsSearchValueJD">
                        <el-option
                          v-for="item in notHotWordsSearchData"
                          :key="item.VALUE"
                          :label="item.COLUMNNAME"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20" v-else>
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="notHotWordsSearchValue"
                                 placeholder="请选择"
                                 multiple
                                 @change="changeNotHotWordsSearchValue">
                        <el-option
                          v-for="item in notHotWordsSearchData"
                          :key="item.columnname"
                          :label="item.columnname"
                          :value="item.columnname">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="notHotWordsSearchValueFlag" @change="changeNotHotWordsSearchValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="notHotWordsSearchValueFlag" @change="changeNotHotWordsSearchValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第八种类型 搜索类型-->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 8 || currentFilterConfigRowAttr === 9">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{hotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select size="mini"
                                 v-model="hotWordsSearchValue"
                                 filterable
                                 remote
                                 multiple
                                 reserve-keyword
                                 placeholder="请输入关键词"
                                 :remote-method="hotWordsSearchMethod"
                                 :loading="hotWordsSearchLoading"
                                 @change="changeHotWordsSearchValue">
                        <el-option
                          v-for="item in hotWordsSearchListData"
                          :key="item.columnname"
                          :label="item.columnname"
                          :value="item.columnname">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20" v-show="currentFilterConfigRowAttr === 8">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="hotWordsSearchValueFlag" @change="changeHotWordsSearchValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="hotWordsSearchValueFlag" @change="changeHotWordsSearchValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中错误提示语-->
                <div class="alert-info m20" v-show="!isSubmit && alertTitle !== ''">
                  <el-alert
                    :title="alertTitle"
                    type="error"
                    :closable="false"
                    show-icon>
                  </el-alert>
                </div>
              </div>
              <div v-show="fileNewContentActiveName === 'dataConfig'">
                <DataConfigProperties @emitSelectData="getAlgorSelect" :form1="propertiesForm" ref="dataConfigPropertiesRef"></DataConfigProperties>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="file-new-bottom">
        <el-button @click="submitDataMining" type="primary" size="mini"  :disabled="!dataConfigTableData || dataConfigTableData.length === 0">提交</el-button>
        <el-button @click="assemblyNewFileParams(true)" type="primary" size="mini">保存</el-button>
        <el-button @click="lookupKey" type="primary" size="mini" :disabled="!dataConfigTableData || dataConfigTableData.length === 0">查看相关性分析</el-button>

      </div>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'
import DataConfigProperties from 'components/datamining/DataConfigProperties.vue'
import Sortable from 'sortablejs'

export default {
  name: 'NewFile',
  data () {
    return { // 以下是此组件的默认值
      filterData: {},
      propertiesForm: {
        algorSelect: '', // 算法选择
        normal: '', // 归一化
        fitIntercept: true, // 是否拟合截距
        regParam: 0, // 正则类型
        regCoeff: '', // 正则系数
        miniConfidence: '',
        miniSupport: '',
        stepSize: 10,
        numIterations: 100,
        miniBatchFraction: 1,
        runs: 1,
        k: 2,
        features: undefined, // 选中的标签列
        solver: 'auto', // 求解数
        elasticNetParam: 0, // 弹性参数
        numPartitions: 10,
        minConfidence: 0.1,
        minSupport: 0.2,
        maxIter: 10 // 最大迭代次数
      },
      filterCfgData: [], // 筛选配置表格
      filterCfgDataObj: {}, // 临时存储选中的筛选配置表格数据，在最后提交时使用
      dataConfigTableData: [],
      dataConfigTableDataObj: {},
      pageSize: 10, // 每页显示条目数
      pagerCount: 11, // 页码按钮的数量
      totalCount: 0, // 总条目数
      fileNewTreeData: [], // 树数据
      defaultFileNewTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
      treeNodeToMenuItem: { // 树的一级节点对应数据源二级菜单
        'CEAIR_PROFILE': 'analysis_dataSource_profile',
        '航班信息': 'analysis_dataSource_flight'
      },
      agsEventLevelValue: ['1', '2', '3', '4'],
      eventLevelValue: [],
      eventLevelMap: {},
      eventLevelMapZn: {},
      isSubmit: false,
      eventLevelData: [
        {value: '0', label: '高'},
        {value: '1', label: '中'},
        {value: '2', label: '低'}
      ],
      agsEventLevelData: [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'}

      ],
      alertTitle: '',
      logicalValue: '',
      hotWordsSearchValue: [], // 筛选配置第八类属性中下拉框选中值
      hotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第八类属性中下拉框选中值
      hotWordsSearchData: [], // 筛选配置第八类属性中下拉框数据
      hotWordsSearchListData: [], // 筛选配置第八类属性中下拉框数据集合
      hotWordsSearchLoading: false, //
      attrSevenRadio: '', // 可视化配置第二类属性radio值
      visualConfigAxisOneText: '在左侧数据库中选择参数', // 可视化配置轴1的文本值
      visualConfigAxisOneTextName: '维度', // 可视化配置轴1的文本名字
      visualConfigAxisOneValue: '', // 可视化配置轴1对应左侧tree中node的id值
      visualConfigAxisOneSql: '', // 对应左侧tree中RESULT_COLUMN_INDEX/COLUMNNAME
      visualConfigAxisOneSqlValue: '', // 对应左侧tree中RESULT_COLUMN_INDEX/COLUMNNAME组装后的值
      visualConfigAxisOneTableIndex: '', // 对应左侧tree中TableIndex
      visualConfigAxisOneFormat: '', // 轴类型， 左侧tree中type值对应轴格式类型
      visualConfigAxisOneFormatData: '', // 轴格式化类型值
      visualConfigAxisOneDataSourceName: '', // 轴的对应的tree中的dataSourceName
      visualConfigAxisOneTreeType: '', // 轴1对应左侧tree中的type值
      visualConfigAxisOneColumnType: '', // 轴值类型type值
      visualConfigAxisTwoText: '在左侧数据库中选择参数',
      visualConfigAxisTwoTextName: '测量',
      visualConfigAxisTwoValue: '',
      visualConfigAxisTwoSql: '',
      visualConfigAxisTwoSqlValue: '',
      visualConfigAxisTwoTableIndex: '',
      visualConfigAxisTwoFormat: '',
      visualConfigAxisTwoFormatData: '',
      visualConfigAxisTwoDataSourceName: '',
      visualConfigAxisTwoTreeType: '',
      visualConfigAxisTwoColumnType: '',
      visualConfigAxisThreeText: '在左侧数据库中选择参数',
      visualConfigAxisThreeTextName: '测量',
      visualConfigAxisThreeValue: '',
      visualConfigAxisThreeSql: '',
      visualConfigAxisThreeSqlValue: '',
      visualConfigAxisThreeTableIndex: '',
      visualConfigAxisThreeFormat: '',
      visualConfigAxisThreeFormatData: '',
      visualConfigAxisThreeDataSourceName: '',
      visualConfigAxisThreeTreeType: '',
      visualConfigAxisThreeColumnType: '',
      currentAxisStyle: '', // 轴默认显示颜色值为空
      treeKeyword: '', // 关键字搜索树数据
      treeNodeDesc: '',
      copyDefaultExpandedKeys: [],
      fileNewContentActiveName: 'filterConfig', // 中间tab显示值, filterConfig:筛选配置，visualConfig:可视化配置
      fileNewRightActiveName: 'attr', // 右边tab显示值，attr:属性
      isShowAttr: true, // 默认true，显示筛选配置的属性，false则显示可视化配置的属性
      visualConfigCharts: '', // 可视化配置图表
      visualConfigChartsName: '', // 可视化配置图表标题
      isShowVisualConfigThreeAxis: false, // 是否显示可视化配置中的轴3
      currentFilterConfigRowId: '', // 当前选中筛选配置表格中的某行编号
      currentFilterConfigRowName: '', // 当前选中筛选配置表格中的某行名字
      currentFilterConfigRowAttr: 1, // 筛选配置属性的显示
      currentFilterConfigRowAttrName: '',
      fileNewName: '', // 新建分析名称
      editDataMining: {},
      viewPowerData: [],
      viewPowerDataObj: {
        id: 'viewPowerID',
        // name: 'viewPowerNAME',
        name: '',
        type: 9999,
        parentId: 'viewPowerPID',
        columnName: 'viewPowerCNAME',
        columnType: 'viewPowerCTYPE',
        dataSourceName: 'viewPowerDSNAME',
        resultColumnIndex: '',
        resultTableIndex: '',
        // filter: 'viewPowerFILTER',
        filter: '',
        filterConditions: {},
        fileNewName: ''
      },
      defaultViewPowerData: {
        label: 'lable',
        children: 'children',
        isLeaf: 'leaf'
      },
      inputTypeName: '文本框', // 筛选配置第二类文本框的名字
      inputTypeNameValue: '', // 筛选配置第二类文本框的值
      inputTypeNameValueFlag: '1', // 查询条件是否包含 筛选配置第二类文本框的值
      inputTypeNameQueryType: '1', // 筛选配置第二类文本框的查询类型
      alertTitleName: '',
      attrOneRadio: '', // 筛选配置第三类属性radio值
      standardSelectValue: '', // 筛选配置第三类属性中下拉框选中的值
      standardSelectData: [ // 筛选配置第三类属性中下拉框数据
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '小于' },
        { value: '4', label: '小于等于' },
        { value: '5', label: '大于' },
        { value: '6', label: '大于等于' },
        { value: '7', label: '参数1<=x<=参数2' },
        { value: '8', label: '参数1<=x<参数2' },
        { value: '781', label: '参数1<x<=参数2' },
        { value: '782', label: '参数1<x<参数2' },
        { value: '9', label: 'x<=参数1或x>=参数2' },
        { value: '9101', label: 'x<参数1或x>=参数2' },
        { value: '9102', label: 'x<=参数1或x>参数2' },
        { value: '10', label: 'x<参数1或x>参数2' }
      ],
      standardSelectArray: [ // 筛选配置第三类属性中下拉框数据
        '等于', '不等于', '小于', '小于等于', '大于', '大于等于'
      ],
      standardMinValue: '', // 筛选配置第三类属性中输入框最小值
      standardMaxValue: '', // 筛选配置第三类属性中输入框最大值
      logicalValueListData: [ // 筛选配置第四类属性中下拉框数据
        { value: '0', label: '否（0 或 0.0）' },
        { value: '1', label: '是（1 或 1.0）' }
      ],
      eventHappenValueFlag: '1', // 筛选配置第五类属性中  事件是否发生
      attrSixRadio: '', // 筛选配置第六类属性radio值
      accordDayStartDate: '', // 筛选配置第六类属性中按天范围开始日期
      accordDayEndDate: '', // 筛选配置第六类属性中按天范围结束日期
      // dataPointYArr: [
      //   {value: 2017, label: '2017年'},
      //   {value: 2018, label: '2018年'},
      //   {value: 2019, label: '2019年'}
      // ],
      dataPointY: [], // 时间点 - 年
      dataPointMArr: [
        {value: 1, label: '1月'},
        {value: 2, label: '2月'},
        {value: 3, label: '3月'},
        {value: 4, label: '4月'},
        {value: 5, label: '5月'},
        {value: 6, label: '6月'},
        {value: 7, label: '7月'},
        {value: 8, label: '8月'},
        {value: 9, label: '9月'},
        {value: 10, label: '10月'},
        {value: 11, label: '11月'},
        {value: 12, label: '12月'}
      ],
      dataPointM: [], // 时间点 - 月
      dataPointDArr: [],
      dataPointD: [], // 时间点 - 日
      dataPointHArr: [
        {value: 0, label: '点'},
        {value: 1, label: '点'},
        {value: 2, label: '点'},
        {value: 3, label: '点'},
        {value: 4, label: '点'},
        {value: 5, label: '点'},
        {value: 6, label: '点'},
        {value: 7, label: '点'},
        {value: 8, label: '点'},
        {value: 9, label: '点'},
        {value: 10, label: '点'},
        {value: 11, label: '点'},
        {value: 12, label: '点'},
        {value: 13, label: '点'},
        {value: 14, label: '点'},
        {value: 15, label: '点'},
        {value: 16, label: '点'},
        {value: 17, label: '点'},
        {value: 18, label: '点'},
        {value: 19, label: '点'},
        {value: 20, label: '点'},
        {value: 21, label: '点'},
        {value: 22, label: '点'},
        {value: 23, label: '点'}
      ],
      dataPointH: [], // 时间点 - 小时
      dataPointQArr: [
        {value: 1, label: '第一季度'},
        {value: 2, label: '第二季度'},
        {value: 3, label: '第三季度'},
        {value: 4, label: '第四季度'}
      ],
      dataPointQ: [], // 时间点 - 季度
      dataPointWArr: [
        {value: 2, label: '星期一'},
        {value: 3, label: '星期二'},
        {value: 4, label: '星期三'},
        {value: 5, label: '星期四'},
        {value: 6, label: '星期五'},
        {value: 7, label: '星期六'},
        {value: 1, label: '星期日'}
      ],
      dataPointWObj: {
        2: '一',
        3: '二',
        4: '三',
        5: '四',
        6: '五',
        7: '六',
        1: '日'
      },
      axisForamtObj: { // 轴格式化类型
        '2': 'textFormat', // 文本
        '3': 'decimalFormat', // 数值
        '6': 'dateFormat' // 日期
      },
      axisForamtDataObj: {
        'textFormat': '1',
        'decimalFormat': '2',
        'dateFormat': 'YYYY/MM/dd' // 轴类型默认格式
      },
      expressionData: { // 默认条件表达式值
        'attrOneRadio': {
          '1': {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '781': '781',
            '782': '782',
            '9101': '9101',
            '9102': '9102'
          }
        },
        'attrTwoRadio': '11',
        'attrFourRadio': '4',
        'attrSixRadio': {
          '3': '37',
          '4': '38'
        },
        'attrSevenRadio': '12',
        'attrEightRadio': '13'
      },
      dataPointW: [], // 时间点 - 星期
      notHotWordsSearchName: '', // 筛选配置第七类属性中文本值
      notHotWordsSearchValue: [], // 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchData: [], // 筛选配置第七类属性中下拉框数据集合
      hotWordsSearchName: '', // 筛选配置第八类属性中文本值
      yearList: [],
      dataMining: {ID: ''},
      managerTreeData: [] // 树状数据
    }
  },
  props: ['profileId1', 'dataMining1', 'editDataMining1'],
  watch: {
    visualConfigChartsName (newVal, oldVal) { // 可视化配置图表名称
      if (newVal !== oldVal) {
        //this.initVisualChart()
        // this.visualConfigCharts.setOption({title: {text: newVal}})
      }
    },
    // treeKeyword (val) { // 树节点关键字
    //   //console.log('treeKeyword:', val)
    //   this.$refs.fileNewTreeRef.filter(val)
    // },
    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },
    copySaveTreeKeyword (newVal, oldVal) {
      if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
        this.refreshCopySaveTreeData()
      }
    },
    isShowVisualConfigThreeAxis (newVal, oldVal) { // 监控是否显示第三轴
      if (this.$util.isDefine(newVal) && newVal !== oldVal) {
        if (newVal) {
          this.visualConfigAxisOneTextName = '维度1'
          this.visualConfigAxisTwoTextName = '维度2'
          this.visualConfigAxisThreeTextName = '测量'
        } else {
          this.visualConfigAxisOneTextName = '维度'
          this.visualConfigAxisTwoTextName = '测量'
          this.visualConfigAxisThreeTextName = ''
        }
        //this.initVisualChart()
      }
    },
    twoAggregation (newVal, oldVal) {
      //console.log(newVal, oldVal)
      if (!this.$util.isDefine(newVal)) {
        if (this.isShowVisualConfigThreeAxis) {
          if (this.visualConfigAxisThreeFormat === 'decimalFormat') {
            this.visualConfigAxisThreeFormatData = 2
          }
        } else {
          if (this.visualConfigAxisTwoFormat === 'decimalFormat') {
            this.visualConfigAxisTwoFormatData = 2
          }
        }
      }
    }
  },
  created () {
    this.getViewPowerData()
  },
  components: {
    DataConfigProperties
  },
  computed: {
    tableConfigExampleData () { // 算出表格配置中样例中表格数据
      let tempData = []
      let tempObj = {}
      this.tableConfigData.map((item, index) => {
        let tempName = ''
        if (item.name === '请在左侧数据库中选择列名') {
          tempName = '列名' + index
        } else {
          tempName = item.name
        }
        tempObj[tempName] = 'value'
      })
      tempData.push(tempObj)
      return tempData
    },
    tableConfigColumnData () { // 算出表格配置中样例中表格列名数据
      let tempData = []
      this.tableConfigData.map((item, index) => {
        let tempName = ''
        if (item.name === '请在左侧数据库中选择列名') {
          tempName = '列名' + index
        } else {
          tempName = item.name
        }
        tempData.push({enName: tempName, zhName: tempName})
      })
      return tempData
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dataPointYArr()
      this.fileNewContentActiveName = 'filterConfig'
      // if (this.$util.isNotEmptyObject(this.$store.state.eventStoreData)) {
      //   this.$refs.anayTabs.$children[0].$refs.tabs[1].style.display = 'none'
      //   this.$refs.anayTabs.$children[0].$refs.tabs[2].style.display = 'none'
      // }
      this.profileId = this.profileId1
      this.dataMining = this.dataMining1
      this.fileNewName = this.dataMining.DATA_MINING_NAME
      this.editDataMining = JSON.parse(JSON.stringify(this.editDataMining1))
      if (JSON.stringify(this.editDataMining) !== '{}' && JSON.stringify(this.editDataMining.createStep) !== '{}') {
        this.filterCfgData = this.editDataMining.createStep.filterConfigTableData
        this.filterCfgDataObj = this.editDataMining.createStep.filterConfigTableDataObj
        this.flightFilter = JSON.stringify(this.editDataMining.flightFilter)
        this.dataConfigTableData = this.editDataMining.createStep.dataConfigTableData
        this.setDataConfigObj(this.editDataMining.createStep)
        this.$refs.dataConfigPropertiesRef.form = this.editDataMining.createStep.propertiesFormData
        let featuresList = []
        for (let i = 0; i < this.dataConfigTableData.length; i++) {
          featuresList.push({label: this.dataConfigTableData[i]['name'], value: this.dataConfigTableData[i]['name']})
        }
        this.$refs.dataConfigPropertiesRef.featuresList = featuresList
      }
      this.getTree() // dom渲染完毕加载树数据
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('changeFileNewExpandedStatus') // 移除自定义事件监听器。
  },
  methods: {
    setDataConfigObj (v) {
      this.dataConfigTableDataObj = {}
      let data = v.dataConfigTableData
      for (let i = 0; i < data.length; i++) {
        this.dataConfigTableDataObj[data[i].dataId] = JSON.parse(JSON.stringify(data[i]))
      }
    },
    dataPointYArr () {
      let years = []
      let year = new Date().getFullYear()
      for (let i = 2017; i <= year; i++) {
        years.push({value: i, label: i + '年'})
      }
      this.yearList = years
    },
    changAgsEventLevelValue (value) {
      let tempStr = value.join(',')

      if (value.length === 0) {
        tempStr = `${['1', '2', '3', '4'].join(',')}`
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = this.hotWordsSearchValue.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    getAlgorSelect () {
    },
    getViewPowerData () { // TODO: 获取筛选配置的数据权限
      let that = this
      this.$axios({
        url: 'userRight/getUserRightByTOId'
      }).then(response => {
        //console.log('getViewPowerData~~~:', response)
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (!that.$util.isNotEmptyObject(resultData)) {
            return false
          }
          if (resultData.tree.length > 0) {
            that.viewPowerData = resultData.tree
          }

          let dataRight = resultData.dataRight
          if (that.$util.isDefine(dataRight.name) && dataRight.value.length > 0) {
            that.viewPowerDataObj['name'] = dataRight.name
            that.viewPowerDataObj['filter'] = dataRight.value.join(', ')

            this.filterCfgData.unshift(that.viewPowerDataObj)
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          that.logBackIn(response.data)
        }
      }) //.catch(response => {
      //   that.$message.error('数据权限获取失败! ')
      // })
    },
    rowDropSort () { // 行拖拽排序
      // TODO: 表格排序功能
      const $tbody = document.querySelector('.tableConfig-axis .el-table__body-wrapper tbody') // el-table__body-wrapper
      const _this = this
      Sortable.create($tbody, {
        // handle: 'tr',
        animation: 150, // 动画参数
        onStart () {
          _this.tableConfigDataObj = {}
          _this.currentTableConfigRowObj = {}
        },
        // onEnd: function (evt) { //拖拽完毕之后发生该事件
        //   //console.log('onEnd.foo:', [evt.item, evt.from])
        // }
        onEnd (evt) {
          // let _tableConfigData = _this.tableConfigData

          // let oldObj = _this.tableConfigData[oldIndex] // ['tableConfigRowId']
          // let newObj = _this.tableConfigData[newIndex] // ['tableConfigRowId']
          // let newTcData = _tableConfigData.map((item, i) => {
          //   let tempObj = JSON.parse(JSON.stringify(item))
          //   if (i === oldIndex) {
          //     tempObj['tableConfigRowId'] = newObj['tableConfigRowId']
          //   } else if (i === newIndex) {
          //     tempObj['tableConfigRowId'] = oldObj['tableConfigRowId']
          //   }
          //   return tempObj
          // })
          // _this.tableConfigData = newTcData

          let newIndex = evt.newIndex
          let oldIndex = evt.oldIndex
          let $tr = $tbody.children[newIndex]
          let $oldTr = $tbody.children[oldIndex]

          if (!_this.$util.isDefine(newIndex) || !_this.$util.isDefine(newIndex) || newIndex === oldIndex) {
            return false
          }

          // 先删除移动的节点
          $tbody.removeChild($tr)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
              $tbody.insertBefore($tr, $oldTr)
          } else {
              $tbody.insertBefore($tr, $oldTr.nextSibling)
          }
          // 更新 tableConfigData 数组
          const currRow = _this.tableConfigData.splice(oldIndex, 1)[0]
          _this.tableConfigData.splice(newIndex, 0, currRow)

          let _tableConfigData = _this.tableConfigData
          _this.tableConfigData = []

          let newTcData = _tableConfigData.map((item, i) => {
            let tempObj = JSON.parse(JSON.stringify(item))
            tempObj['tableConfigRowId'] = i + 1
            return tempObj
          })

          _this.tableConfigData = [...newTcData]
          _this.$forceUpdate()

          // 下一个tick就会走patch更新
          let tempTableConfigDataObj = {}
          newTcData.forEach((item, index) => {
            item['tableConfigRowId'] = index + 1
            tempTableConfigDataObj[item['id']] = item

            if (item['name' === '请在左侧数据库中选择列名']) {
              this.currentTableConfigRowObj = item
            }
          })
          _this.tableConfigDataObj = tempTableConfigDataObj
        }
      })
    },
    moveUpRow (index, row) { // 上移行
      let that = this
      //console.log('上移###：', index, row)
      //console.log(that.tableConfigData[index])
      if (index > 0) {
        let upDate = that.tableConfigData[index - 1]
        that.tableConfigData.splice(index - 1, 1)
        that.tableConfigData.splice(index, 0, upDate)

        let _tableConfigData = that.tableConfigData
        that.tableConfigData = []

        let newTcData = _tableConfigData.map((item, i) => {
          let tempObj = JSON.parse(JSON.stringify(item))
          tempObj['tableConfigRowId'] = i + 1
          return tempObj
        })

        that.tableConfigData = [...newTcData]
        that.$forceUpdate()

        // 下一个tick就会走patch更新
        let tempTableConfigDataObj = {}
        newTcData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        that.tableConfigDataObj = tempTableConfigDataObj
      } else {
        this.$message({
          message: '已经是第一条，不可上移!',
          type: 'warning'
        })
      }
    },
    moveDownRow (index, row) { // 下移行
      let that = this
      //console.log('下移###：', index, row)
      if ((index + 1) === that.tableConfigData.length) {
        this.$message({
          message: '已经是最后一条，不可下移！',
          type: 'warning'
        })
      } else {
        //console.log(index)
        let downDate = that.tableConfigData[index + 1]
        that.tableConfigData.splice(index + 1, 1)
        that.tableConfigData.splice(index, 0, downDate)

        let _tableConfigData = that.tableConfigData
        that.tableConfigData = []

        let newTcData = _tableConfigData.map((item, i) => {
          let tempObj = JSON.parse(JSON.stringify(item))
          tempObj['tableConfigRowId'] = i + 1
          return tempObj
        })

        that.tableConfigData = [...newTcData]
        that.$forceUpdate()

        // 下一个tick就会走patch更新
        let tempTableConfigDataObj = {}
        newTcData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        that.tableConfigDataObj = tempTableConfigDataObj
      }
    },
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
    getTree () { // 获取左侧树状数据
      this.fileNewTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTreeDataming',
        method: 'get',
        params: {
          likeContent: this.treeKeyword
        }
      }).then(response => {
        //console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
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
          let data = response.data.result.data
          if (data.length > 0) {
            this.fileNewTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultExpandedKeys.push(expandedKey)
          } else {
            this.defaultExpandedKeys = []
          }

          // if (this.$util.isNotEmptyObject(data)) {
          //   let tempTreeData = []
          //   for (let i in data) {
          //     for (let j = 0; j < data[i].length; j++) {
          //       tempTreeData.push(data[i][j])
          //     }
          //   }
          //   //console.log(JSON.stringify(tempTreeData))
          //   this.fileNewTreeData = tempTreeData
          // } else {
          //   this.$message({
          //     message: '暂无相关数据!',
          //     type: 'warning'
          //   })
          // }
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
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
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
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    renderCopySaveContent (h, {node, data, store}) {
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: false, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
        }
      })
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.searchTreeData()
      }
    },
    searchTreeData (flag) { // 关键字搜索树节点
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.getTree() // 加载树数据
      // }
      this.treeNodeDesc = ''
      this.getTree()
    },
    filterFileNewNode (value, data) { // 树节点过滤
      try {
        //console.log('filterFileNewNode~~value:', value, data, data.LIKENAME.indexOf(value))
        if (!value) return true
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    expandedTreeNodeStatus (en, zh) { // 点击一级菜单‘数据源’的子菜单，修改对应树节点展开或折叠状态
      let nodesMapObj = this.$refs.fileNewTreeRef.store.nodesMap
      if (this.$util.isNotEmptyObject(nodesMapObj)) {
        for (let i in nodesMapObj) {
          this.$refs.fileNewTreeRef.store.nodesMap[i].expanded = false
        }
        this.defaultExpandedKeys = [this.menuItemToTreeNode[en]]
      }
    },
    fileNewNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      //console.log('NewFile@fileNewNodeClick:', data)
      this.treeNodeDesc = ''
      // 在筛选配置的tab中，点击左侧树节点时把数据显示到中间表格中，并存储
      if (this.fileNewContentActiveName === 'filterConfig') {
        if (!data.CHILDREN) { // || data.CHILDREN.length === 0
          if (this.filterCfgDataObj[data.ID]) {
            this.$message({
              message: '筛选配置中已经存在！',
              type: 'warning'
            })
            return false
          } else {
            const tempNodeObj = {
              id: data.ID + '_' + new Date().getTime(),
              name: data.NAME,
              type: data.TYPE,
              parentId: data.PARENTID ? data.PARENTID : '',
              columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
              columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
              dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
              resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
              resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
              filter: data.TYPE === '5' ? '事件' : '',
              filterConditions: {},
              fileNewName: ''
            }
            if (data.COLUMNNAME && (data.TYPE === '7' || data.TYPE === '8' || data.TYPE === '9')) { // 当type为7,8,9时需要从后端获取对应属性中下拉框的值
              this.getHotWordsSearchData(data.TYPE, data.COLUMNNAME)
              this.currentFilterConfigRowAttrName = data.COLUMNNAME
            }
            this.filterCfgData.push(tempNodeObj)
            this.filterCfgDataObj[tempNodeObj.id] = tempNodeObj
            this.filterConfigTableRowHandle(tempNodeObj)
            this.totalCount = this.filterCfgData.length // 赋值分页总条数
          }
        }
      } else if (this.fileNewContentActiveName === 'dataConfig') { // 数据配置的属性，没有选择轴时点击左侧树节点时则提示
        if (!data.CHILDREN) { // || data.CHILDREN.length === 0
          if (this.dataConfigTableDataObj[data.ID]) {
            this.$message({
              message: '数据配置中已经存在！',
              type: 'warning'
            })
            return false
          } else {
            const tempNodeObj = {
              id: data.ID,
              dataId: data.ID,
              name: data.NAME,
              type: data.TYPE,
              parentId: data.PARENTID ? data.PARENTID : '',
              columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
              columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
              dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
              resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
              resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
              filter: data.TYPE === '5' ? '事件' : '',
              filterConditions: {},
              fileNewName: ''
            }
            if (data.COLUMNNAME && (data.TYPE === '7' || data.TYPE === '8' || data.TYPE === '9')) { // 当type为7,8,9时需要从后端获取对应属性中下拉框的值
              this.getHotWordsSearchData(data.TYPE, data.COLUMNNAME)
              this.currentFilterConfigRowAttrName = data.COLUMNNAME
            }
            this.dataConfigTableData.push(tempNodeObj)
            this.dataConfigTableDataObj[tempNodeObj.dataId] = JSON.parse(JSON.stringify(tempNodeObj))
            this.dataConfigTableRowHandle(tempNodeObj)
            this.totalCount = this.dataConfigTableData.length // 赋值分页总条数
              let featuresList = []
              let obj = {}
              for (let i = 0; i < this.dataConfigTableData.length; i++) {
                obj = {label: this.dataConfigTableData[i].name, value: this.dataConfigTableData[i].name}
                featuresList.push(obj)
              }
              this.$refs.dataConfigPropertiesRef.featuresList = featuresList
          }
        }
      } else if (this.fileNewContentActiveName === 'visualConfig') { // 在可视化配置tab中，没有选择轴时点击左侧树节点时则提示
        if (!this.currentAxisStyle) { // 没有选择轴类型，直接点击节点
          this.$message({
            message: '请选择可视化配置中的轴值',
            type: 'warning'
          })
          return false
        }
        // data.TYPE === '4' ||
        if (data.TYPE === '5' || data.TYPE === '9' || data.TYPE === 'CATALOG' || data.CHILDREN) { // 逻辑值，事件, 目录类型节点不支持轴选择
          return false
        }

        let axisValue = ''
        let axisSql = ''
        let axisSqlValue = ''
        let axisTableIndex = ''
        if (data.COLUMNNAME) {
          axisValue = data.ID
          axisSql = data.COLUMNNAME
          axisSqlValue = data.COLUMNNAME
          axisTableIndex = ''
        } else {
          axisValue = data.ID
          axisSql = data.RESULT_COLUMN_INDEX
          axisSqlValue = 'g' + data.RESULT_COLUMN_INDEX
          axisTableIndex = data.RESULT_TABLE_INDEX
        }

        let isFlightDate = false
        if (data.COLUMNNAME === 'FLIGHT_DATE') {
          isFlightDate = true
          this.axisDateArr = this.axisDateArrDate
        } else {
          this.axisDateArr = this.axisDateArrDateTime
        }

        // 点击左侧树节点是显示对应轴的值
        if (this.currentAxisStyle === 'one') {
          this.visualConfigAxisOneText = data.NAME
          this.visualConfigAxisOneValue = axisValue
          this.visualConfigAxisOneSql = axisSql
          this.visualConfigAxisOneSqlValue = axisSqlValue
          this.visualConfigAxisOneTableIndex = axisTableIndex
          this.visualConfigAxisOneFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisOneFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisOneFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisOneDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisOneTreeType = data.TYPE
          this.visualConfigAxisOneColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({xAxis: {name: data.NAME}})
          // //this.initVisualChart()
        } else if (this.currentAxisStyle === 'two') {
          this.visualConfigAxisTwoText = data.NAME
          this.visualConfigAxisTwoValue = axisValue
          this.visualConfigAxisTwoSql = axisSql
          this.visualConfigAxisTwoSqlValue = axisSqlValue
          this.visualConfigAxisTwoTableIndex = axisTableIndex
          this.visualConfigAxisTwoFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisTwoFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisTwoFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisTwoDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisTwoTreeType = data.TYPE
          this.visualConfigAxisTwoColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({yAxis: {name: data.NAME}})
          //this.initVisualChart()
        } else if (this.currentAxisStyle === 'three') {
          this.visualConfigAxisThreeText = data.NAME
          this.visualConfigAxisThreeValue = axisValue
          this.visualConfigAxisThreeSql = axisSql
          this.visualConfigAxisThreeSqlValue = axisSqlValue
          this.visualConfigAxisThreeTableIndex = axisTableIndex
          this.visualConfigAxisThreeFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisThreeFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisThreeFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisThreeDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisThreeTreeType = data.TYPE
          this.visualConfigAxisThreeColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({zAxis: {name: data.NAME}})
          //this.initVisualChart()
        }
      } else if (this.fileNewContentActiveName === 'tableConfig') { // 表格配置的tab
        if (!data.CHILDREN) { // || data.CHILDREN.length === 0
          if (this.tableConfigDataObj[data.ID]) {
            this.$message({
              message: '表格配置中已经存在！',
              type: 'warning'
            })
            return false
          }

          if (!this.$util.isNotEmptyObject(this.currentTableConfigRowObj)) {
            let modifyFlag = true
            this.tableConfigData.forEach((item, index) => {
              if (item['name'] === '请在左侧数据库中选择列名') {
                this.currentTableConfigRowObj = item
                modifyFlag = false
              }
            })
            if (modifyFlag) this.addTableConfigRowData() // 如果没有选择当前行，就执行新增
          }

          let tempTableConfigData = this.tableConfigData
          this.tableConfigData = []

          let tempTableConfigRowId = this.currentTableConfigRowObj['tableConfigRowId']
          let tempID = this.currentTableConfigRowObj['id']
          let tempTableData = []

          const tempNodeObj = {
            tableConfigRowId: tempTableConfigRowId,
            id: data.ID,
            name: data.NAME,
            type: data.TYPE,
            columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
            columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
            dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
            resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
            resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : ''
          }
          delete this.tableConfigDataObj[tempID] // 先删除已经存在的数据
          this.currentTableConfigRowObj = tempNodeObj // 更新当前选择行的数据
          this.tableConfigDataObj[data.ID] = tempNodeObj // 更新表格配置对象中的数据

          tempTableConfigData.forEach((item, index) => { // 更新表格配置的数据
            if (item.tableConfigRowId === tempTableConfigRowId) {
              item = tempNodeObj
            }
            item['tableConfigRowId'] = index + 1
            tempTableData.push(item)
          })
          this.tableConfigData = tempTableData
          this.currentTableConfigRowObj = {} // 添加后清空当前选择的行
        }
      }

      if (!data.CHILDREN && this.$util.isDefine(data.RESULT_COLUMN_INDEX) && this.$util.isDefine(data.RESULT_TABLE_INDEX)) {
        this.$store.commit('SHOW_LOADING', '正在加载字段说明...')
        this.$axios({
          url: '/flightRecords/getDimentionDesc',
          method: 'get',
          params: {
            id: data.ID,
            type: data.TYPE
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          //console.log('getCheckboxData~~~', response)
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
      }

      if (!data.CHILDREN) {
        this.$axios({
          url: '/buildTree/getUsedParamDataming',
          method: 'get',
          params: {
            val: JSON.stringify(data)
          }
        }).then(response => {
          // //console.log('getCheckboxData~~~', response)
          // if (response.data.status === '0') {

          // } else if (response.data.status === 'E1001') { // 没有登录
          //   this.$bus.$emit('logBackInHandle', response.data)
          // } else {
          //   this.$message.error(response.data.message)
          // }
          // this.getTree()
        }).catch(response => {
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    getHotWordsSearchData (type, columnName) { // 获取热词搜索的数据且放到数据仓库中，防止同样参数重复调用接口
      let self = this

      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj || {} // 获取临时放到数据仓库中热词搜索的数据
      if (!hotWordsSearchObj[type + '-' + columnName]) { // 数据仓库中不存在当前点击节点的数据则从后台获取
        this.$store.commit('SHOW_LOADING', '正在加载热词数据...')
        this.$axios({
          url: '/buildTree/getCheckboxData',
          method: 'get',
          params: {
            type: type,
            name: columnName
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          //console.log('getCheckboxData~~~', response)
          if (response.data.status === '0') {
            let dataObj = response.data.result
            if (this.$util.isNotEmptyObject(dataObj)) {
              let dataArr = dataObj.data
              if (dataArr.length > 0) {
                dataArr = dataArr.filter((item) => {
                  return item.columnname || item.COLUMNNAME
                })
                if (parseInt(type) === 7 || parseInt(type) === 51) {
                  self.notHotWordsSearchData = dataArr
                } else if (parseInt(type) === 8 || parseInt(type) === 9 || parseInt(type) === 52) {
                  self.hotWordsSearchData = dataArr
                }
                hotWordsSearchObj[type + '-' + columnName] = dataArr
                this.$store.commit('HOT_WORDS_SEARCH_OBJ', hotWordsSearchObj) // 更新数据仓库中的热词搜索数据
              }
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
      }
    },
    hotWordsSearchMethod (query) { // 筛选配置中根据关键字获取热词搜索的数据
      //console.log('hotWordsSearchMethod~~~~~~~~', query)
      if (query !== '') {
        this.hotWordsSearchLoading = true
        setTimeout(() => {
          this.hotWordsSearchLoading = false
          if (this.hotWordsSearchData.length > 0) {
            this.hotWordsSearchListData = this.hotWordsSearchData.filter(item => {
              if (item.columnname && item.columnname !== '') {
                return item.columnname.toLowerCase().indexOf(query.toLowerCase()) > -1
              }
            })
          }
        }, 200)
      } else {
        this.hotWordsSearchListData = []
      }
    },
    tabFileNewContent (tab, event) { // 中间tab标签点击方法
      setTimeout(() => {
        //this.initVisualChart() // 初始化可视化配置中图表数据
      }, 500)
    },
    filterRowDelete (index, rows) { // 筛选配置中表格删除行
      //console.log('delete', index, rows)

      delete this.filterCfgDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)

      if (this.filterCfgData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentFilterConfigRowAttr = 1
        this.currentFilterConfigRowAttrName = ''
        this.filterCfgDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      } else if (this.filterCfgData.length > 0) {
        //this.filterConfigTableRowHandle(this.filterCfgData[this.filterCfgData.length - 1])
        this.filterConfigTableRowHandle(this.filterCfgData[0])
      }
    },
    dataConfigRowDelete (index, rows) { // 筛选配置中表格删除行
      //console.log('delete', index, rows)

      delete this.dataConfigTableDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)

      if (this.filterCfgData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentDataConfigRowAttr = 1
        this.currenDataConfigRowAttrName = ''
        this.dataConfigTableDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      } else if (this.dataConfigTableData.length > 0) {
        //this.filterConfigTableRowHandle(this.filterCfgData[this.filterCfgData.length - 1])
        this.dataConfigTableRowHandle(this.dataConfigTableData[0])
      }
      let featuresList = []
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
        featuresList.push({label: this.dataConfigTableData[i]['name'], value: this.dataConfigTableData[i]['name']})
      }
      this.$refs.dataConfigPropertiesRef.featuresList = featuresList
    },
    // 点击筛选配置列表的行触发事件
    filterConfigTableRowHandle (value) { // 1.设置筛选配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
      // //console.log('filterConfigTableRowHandle:', value)

      this.alertTitle = '' // 清空错误提示信息
      this.logicalValue = ''
      this.hotWordsSearchValue = [] // 清空已经存在的热词搜索数据
      this.hotWordsSearchData = [] // 清空已经存在的某种类型热词搜索原始数据集合
      this.hotWordsSearchListData = [] // 清空上次筛选下的数据
      this.notHotWordsSearchValue = [] // 清空已经存在的非热词搜索数据
      this.notHotWordsSearchData = [] // 清空已经存在的非热词搜索数据集合
      this.isSubmit = true // 恢复提交按钮的状态
      this.currentFilterConfigRowAttr = parseInt(value.type) // 显示某个类型的属性
      this.currentFilterConfigRowAttrName = value.columnName
      this.currentFilterConfigRowId = value.id // 设置选中某行的编号
      this.currentFilterConfigRowName = value.name // 设置选中某行的名字
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj // 获取热词搜索中的数据
      if (this.$util.isNotEmptyObject(this.filterCfgDataObj[value.id])) { // 临时对象中存在当前节点的数据
        // 替换点击节点时存储到表格的默认数据
        let tempRowDataObj = this.filterCfgDataObj[value.id]
        let tempFilterStr = '' // 临时存储显示表格中的过滤参数值
        let tempTableObj = {}
        if (this.$util.isNotEmptyObject(tempRowDataObj.filterConditions)) { // 多次点击当前行
          tempTableObj = tempRowDataObj.filterConditions
        } else { // 第一次点击当前行
          let tempColumnName = value.columnName
          if (this.filterCfgDataObj[value.id]['type'] === '2' &&
            this.filterCfgDataObj[value.id]['columnType'] === 'NUMBER') { // 文本类型节点，且值类型是数值类型
            tempColumnName = 'cast(' + value.columnName + ' as varchar)'
          }
          tempTableObj = { // 更新过滤条件
            condition: '',
            paramId: value.id,
            paramName: value.name,
            paramType: value.type,
            attrRadioFlag: '',
            attrRadioValue: '',
            operatordId: '',
            selectValueOne: '',
            selectValueTwo: '',
            selectValueThree: '',
            paramValueOne: '',
            paramValueTwo: '',
            paramValueThree: '',
            // isIncluded: '',
            resultColumnIndex: value.resultColumnIndex,
            resultTableIndex: value.resultTableIndex,
            columnName: tempColumnName,
            dataSourceNameValue: value.dataSourceName
          }
        }
        if (this.filterCfgDataObj[value.id]['type'] === '5') { // 事件类型
          // tempFilterStr = '事件'
          // if (this.$util.isNotEmptyObject(tempTableObj)) {
          //   if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
          //     tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
          //   }
          // }
          if (value.filter === '未发生') {
            this.eventLevelValue = []
            this.eventHappenValueFlag = '0'
          } else { // 已发生，事件，已发生[xxx]
            this.eventHappenValueFlag = '1'
            this.queryEventLevelById(value)
          }
          // tempTableObj.selectValueOne = tempFilterStr
          tempTableObj.operatordId = '5'
          // tempTableObj['filterName'] = tempFilterStr
        } else if (this.filterCfgDataObj[value.id]['type'] === '2') { // 文本类型
          this.inputTypeName = value.name
        } else if (this.filterCfgDataObj[value.id]['type'] === '7' ||
          this.filterCfgDataObj[value.id]['type'] === '51') { // 不是热词搜索类型
          this.notHotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }
        } else if (this.filterCfgDataObj[value.id]['type'] === '8' ||
          this.filterCfgDataObj[value.id]['type'] === '9' ||
          this.filterCfgDataObj[value.id]['type'] === '52') { // 热词搜索类型
          this.hotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.hotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }
        } else if (this.filterCfgDataObj[value.id]['type'] === 3 || this.filterCfgDataObj[value.id]['type'] === '3') {
          if (!value.filter) { // type = 3 时 如果filter为空 清空筛选方式的值
            this.attrOneRadio = ''
            this.standardSelectValue = ''
            this.standardMinValue = ''
            this.standardMaxValue = ''
          }
        }
        this.resetFilterTableConditionsData(value.id, tempTableObj, tempFilterStr, false) // 替换显示过滤参数值
        // this.resetDefaultData() // 重置属性中默认值
        if (this.$util.isNotEmptyObject(value.filterConditions)) {
          //console.log(JSON.stringify(value))
          let tempObj = value.filterConditions
          if (!this.$util.isDefine(tempObj.attrRadioValue)) {
            return true
          }
          if (value.type === '3') { //  type = 3 ，这里说明filter不为空，取出值回显
            this.attrOneRadio = tempObj.attrRadioValue
            this.standardSelectValue = tempObj.selectValueOne
            this.standardMinValue = tempObj.paramValueOne
            this.standardMaxValue = tempObj.paramValueTwo
          } else if (value.type === '6') {
            this.attrSixRadio = tempObj.attrRadioValue
            if (tempObj.attrRadioFlag === '3') {
              this.accordDayStartDate = tempObj.paramValueOne
              this.accordDayEndDate = tempObj.paramValueTwo
            } else {
              let dateObj = JSON.parse('{' + tempObj.condition + '}')
              if (!this.$util.isNotEmptyObject(dateObj)) {
                return
              }
              // "year":[2017,2018],"month":[1,2],"day":[],"hour":[],"quarter":[],"dayofweek":[]
              this.dataPointY = dateObj.year
              this.dataPointM = dateObj.month
              this.dataPointD = dateObj.day
              this.dataPointH = dateObj.hour
              this.dataPointQ = dateObj.quarter
              this.dataPointW = dateObj.dayofweek
            }
          }
        }
      }
    },
    queryEventLevelById (value) {
      let id = value.id
      id = id.split('_')[0]
      this.$axios({
        url: '/apm/getProfileEventLevelByEventId',
        method: 'get',
        params: {id: id}
      }).then(response => {
        let data = response.data
        let eventLevelData = []
        let obj = {}
        let eventLevelMap = {}
        let eventLevelMapZn = {}
        for (let i = 0; i < data.length; i++) {
          obj = {}
          obj['value'] = data[i]['EVENT_LEVEL']
          obj['label'] = data[i]['EVENT_CAPTION']
          eventLevelData.push(obj)
          eventLevelMap[data[i]['EVENT_LEVEL']] = data[i]['EVENT_CAPTION']
          eventLevelMapZn[data[i]['EVENT_CAPTION']] = data[i]['EVENT_LEVEL']
        }
        this.eventLevelData = eventLevelData
        this.eventLevelMap = eventLevelMap
        this.eventLevelMapZn = eventLevelMapZn
        // 赋值
        if (value.filter && value.filter !== '已发生' && value.filter !== '事件') {
          let name = value.filter.replace('已发生', '').replace('[', '').replace(']', '')
          name = name.split(',')
          let val = []
          if (name.length > 0) {
            for (let i = 0; i < name.length; i++) {
              val.push(this.eventLevelMapZn[name[i]])
            }
            this.eventLevelValue = val
          } else {
            this.eventLevelValue = []
          }
        } else {
          this.eventLevelValue = []
          this.eventHappenValueFlag = '1'
        }
      }).catch(response => {
      })
    },
    dataConfigTableRowHandle (value) { // 1.设置数据配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
        //console.log('dataConfigTableRowHandle:', value)
        this.alertTitle = '' // 清空错误提示信息
        this.logicalValue = ''
        this.hotWordsSearchValue = [] // 清空已经存在的热词搜索数据
        this.hotWordsSearchData = [] // 清空已经存在的某种类型热词搜索原始数据集合
        this.hotWordsSearchListData = [] // 清空上次筛选下的数据
        this.notHotWordsSearchValue = [] // 清空已经存在的非热词搜索数据
        this.notHotWordsSearchData = [] // 清空已经存在的非热词搜索数据集合
        this.isSubmit = true // 恢复提交按钮的状态
        this.currentDataConfigRowAttr = parseInt(value.type) // 显示某个类型的属性
        this.currentDataConfigRowAttrName = value.columnName
        this.currentDataConfigRowId = value.id // 设置选中某行的编号
        this.currentDataConfigRowName = value.name // 设置选中某行的名字
        let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj // 获取热词搜索中的数据
        if (this.$util.isNotEmptyObject(this.dataConfigTableDataObj[value.id])) { // 临时对象中存在当前节点的数据
          // 替换点击节点时存储到表格的默认数据
          let tempRowDataObj = this.dataConfigTableDataObj[value.id]
          let tempFilterStr = '' // 临时存储显示表格中的过滤参数值
          let tempTableObj = {}
          if (this.$util.isNotEmptyObject(tempRowDataObj.filterConditions)) { // 多次点击当前行
            tempTableObj = tempRowDataObj.filterConditions
          } else { // 第一次点击当前行
            let tempColumnName = value.columnName
            if (this.dataConfigTableDataObj[value.id]['type'] === '2' &&
              this.dataConfigTableDataObj[value.id]['columnType'] === 'NUMBER') { // 文本类型节点，且值类型是数值类型
              tempColumnName = 'cast(' + value.columnName + ' as varchar)'
            }
            tempTableObj = { // 更新过滤条件
              condition: '',
              paramId: value.id,
              paramName: value.name,
              paramType: value.type,
              attrRadioFlag: '',
              attrRadioValue: '',
              operatordId: '',
              selectValueOne: '',
              selectValueTwo: '',
              selectValueThree: '',
              paramValueOne: '',
              paramValueTwo: '',
              paramValueThree: '',
              // isIncluded: '',
              resultColumnIndex: value.resultColumnIndex,
              resultTableIndex: value.resultTableIndex,
              columnName: tempColumnName,
              dataSourceNameValue: value.dataSourceName
            }
          }
          if (this.dataConfigTableDataObj[value.id]['type'] === '5') { // 事件类 型
            tempFilterStr = '事件'
            if (this.$util.isNotEmptyObject(tempTableObj)) {
              if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
                tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
              }
            }

            tempTableObj.selectValueOne = tempFilterStr
            tempTableObj.operatordId = '5'
            tempTableObj['filterName'] = tempFilterStr
          } else if (this.dataConfigTableDataObj[value.id]['type'] === '2') { // 文本类型
            this.inputTypeName = value.name
          } else if (this.dataConfigTableDataObj[value.id]['type'] === '7') { // 不是热词搜索类型
            this.notHotWordsSearchName = value.name
            if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
              this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
            } else {
              this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
            }
          } else if (this.dataConfigTableDataObj[value.id]['type'] === '8' || this.dataConfigTableDataObj[value.id]['type'] === '9') { // 热词搜索类型
            this.hotWordsSearchName = value.name
            if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
              this.hotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
            } else {
              this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
            }
          }
          this.resetFilterTableConditionsData(value.id, tempTableObj, tempFilterStr, false) // 替换显示过滤参数值
          this.resetDefaultData() // 重置属性中默认值

          if (this.$util.isNotEmptyObject(value.filterConditions)) {
            //console.log(JSON.stringify(value))
            let tempObj = value.filterConditions
            if (!this.$util.isDefine(tempObj.attrRadioValue)) {
              return true
            }

            if (value.type === '3') {
              this.attrOneRadio = tempObj.attrRadioValue
              this.standardSelectValue = tempObj.selectValueOne
              this.standardMinValue = tempObj.paramValueOne
              this.standardMaxValue = tempObj.paramValueTwo
            } else if (value.type === '6') {
              this.attrSixRadio = tempObj.attrRadioValue
              if (tempObj.attrRadioFlag === '3') {
                this.accordDayStartDate = tempObj.paramValueOne
                this.accordDayEndDate = tempObj.paramValueTwo
              } else {
                let dateObj = JSON.parse('{' + tempObj.condition + '}')
                if (!this.$util.isNotEmptyObject(dateObj)) {
                  return
                }
                // "year":[2017,2018],"month":[1,2],"day":[],"hour":[],"quarter":[],"dayofweek":[]
                this.dataPointY = dateObj.year
                this.dataPointM = dateObj.month
                this.dataPointD = dateObj.day
                this.dataPointH = dateObj.hour
                this.dataPointQ = dateObj.quarter
                this.dataPointW = dateObj.dayofweek
              }
            }
          }
        }
        let featuresList = []
        for (let i = 0; i < this.dataConfigTableData.length; i++) {
          featuresList.push({label: this.dataConfigTableData[i]['name'], value: this.dataConfigTableData[i]['name']})
        }
        this.$refs.dataConfigPropertiesRef.featuresList = featuresList
    },
    closeFileNewNameInput (ev) { // 清除筛选配置属性中文本框输入的值
      this.fileNewName = ''
    },
    closeVisualConfigChartsName (ev) { // 清除可视化配置第一类属性中文本框输入的值
      //console.log('visualConfigChartsName', ev)
      this.visualConfigChartsName = ''
    },
    resetDefaultData () { // 重置默认数据
      this.resetAttrOneDefaultData(true, true) // 筛选配置第三类属性
      this.resetAttrSixDefaultData(true) // 筛选配置第六类
      this.resetAttrTwoDefaultData(true) // 筛选配置第二类
      this.HotWordsSearchValueFlag = '1'
      this.notHotWordsSearchValueFlag = '1'
      this.eventHappenValueFlag = '1'
      this.eventLevelValue = []
    },
    resetAttrTwoDefaultData (flag) { // 重置筛选配置第二类属性的值
      if (flag) {
        this.inputTypeNameValue = ''
        this.inputTypeNameQueryType = '1'
        this.inputTypeNameValueFlag = '1'
      }
    },
    resetAttrOneDefaultData (flag, selectFlag) { // 重置筛选配置第三类属性的值
      if (flag) {
        this.attrOneRadio = '' // 筛选配置第三类属性radio值
      }
      if (selectFlag) {
        this.standardSelectValue = '' // 筛选配置第三类属性中下拉框选中的值
      }
      this.standardMinValue = '' // 筛选配置第三类属性中输入框最小值
      this.standardMaxValue = '' // 筛选配置第三类属性中输入框最大值
    },
    resetAttrSixDefaultData (flag) { // 重置筛选配置第六类属性的值
      if (flag) {
        this.attrSixRadio = '' // 筛选配置第六类属性radio值
      }
      this.accordDayStartDate = '' // 筛选配置第六类属性中按天范围开始日期
      this.accordDayEndDate = '' // 筛选配置第六类属性中按天范围结束日期

      this.dataPointY = []
      this.dataPointM = []
      this.dataPointD = []
      this.dataPointH = []
      this.dataPointQ = []
      this.dataPointW = []
    },
    resetFilterTableConditionsData (rowId, obj, filterStr, flag) { // 重置筛选配置表格中的数据
      let tempTableData = []
      this.filterCfgData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.filterCfgDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      this.filterCfgData = tempTableData // 临时数组重新复制给表格数据
    },
    clearCurrentAxisData (type) { // 清空选中当前轴的数据
      this.currentAxisStyle = '' // 清除选中轴的信息
      if (type === 'one') {
        this.visualConfigAxisOneText = ''
        this.visualConfigAxisOneValue = ''
        this.visualConfigAxisOneSql = ''
        this.visualConfigAxisOneSqlValue = ''
        this.visualConfigAxisOneTableIndex = ''
        this.visualConfigAxisOneFormat = ''
        this.visualConfigAxisOneFormatData = ''
        this.visualConfigAxisOneDataSourceName = ''
        this.visualConfigAxisOneTreeType = ''
        this.visualConfigAxisOneColumnType = ''
        this.intervalNum = ''
      } else if (type === 'two') {
        if (this.visualConfigAxisTwoFormat === 'decimalFormat') { // 如果轴2是数值，则清空时同时也清空聚合函数的值
          this.twoAggregation = ''
        }
        this.visualConfigAxisTwoText = ''
        this.visualConfigAxisTwoValue = ''
        this.visualConfigAxisTwoSql = ''
        this.visualConfigAxisTwoSqlValue = ''
        this.visualConfigAxisTwoTableIndex = ''
        this.visualConfigAxisTwoFormat = ''
        this.visualConfigAxisTwoFormatData = ''
        this.visualConfigAxisTwoDataSourceName = ''
        this.visualConfigAxisTwoTreeType = ''
        this.visualConfigAxisTwoColumnType = ''
      } else if (type === 'three') {
        this.visualConfigAxisThreeText = ''
        this.visualConfigAxisThreeValue = ''
        this.visualConfigAxisThreeSql = ''
        this.visualConfigAxisThreeSqlValue = ''
        this.visualConfigAxisThreeTableIndex = ''
        this.visualConfigAxisThreeFormat = ''
        this.visualConfigAxisThreeFormatData = ''
        this.visualConfigAxisThreeDataSourceName = ''
        this.visualConfigAxisThreeTreeType = ''
        this.visualConfigAxisThreeColumnType = ''
        this.twoAggregation = ''
      }
    },
    addThreeAxis () { // 可视化配置中添加第三轴
      if (this.isShowVisualConfigThreeAxis) {
        this.isShowVisualConfigThreeAxis = false
        this.clearCurrentAxisData('three')
      } else {
        this.isShowVisualConfigThreeAxis = true
        this.clearCurrentAxisData('three')
      }
      ////this.initVisualChart()
    },
    initVisualChart () {
      // 初始化可视化配置图表
      // 重置容器大小
      const elementVC = document.getElementById('visualChart')
      // const elementFVC = document.getElementsByClassName('file-visual-chart')[0]

      if (elementVC) {
        elementVC.style.width = document.getElementsByClassName('file-visual-chart')[0].offsetWidth + 'px'
        //console.log(elementVC.style.width, elementVC.style.height)
      }
      // let pH = elementFVC.parentNode.offsetHeight
      // let nH = elementFVC.offsetHeight

      // elementVC.style.width.style.height = (pH - 150) + 'px'

      if (this.visualConfigCharts) {
        this.visualConfigCharts.dispose()
        //console.log('销毁存在的echarts')
      }
      this.visualConfigCharts = this.$echarts.init(document.getElementById('visualChart'))
      if (this.isShowVisualConfigThreeAxis) {
        let serData = [[0, 0, 13], [0, 1, 6], [0, 2, 9]]
        this.visualConfigCharts.setOption({
          title: {
            show: true,
            text: this.visualConfigChartsName || '请输入图表名称',
            left: 'center',
            textStyle: {
              fontSize: 12
            }
          },
          tooltip: {},
          xAxis3D: {
            type: 'category',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisOneText
          },
          yAxis3D: {
            type: 'category',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisTwoText
          },
          zAxis3D: {
            type: 'value',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisThreeText
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            axisPointer: { show: false },
            light: {
              main: { intensity: 1.2 },
              ambient: { intensity: 0.3 }
            }
          },
          color: ['#588EE6'],
          series: [{
            type: 'bar3D',
            barSize: 15,
            data: serData.map(function (item) {
              return {value: [item[0], item[1], item[2]]}
            })
          }]
        })
      } else {
        this.visualConfigCharts.setOption({
          title: {
            show: true,
            text: this.visualConfigChartsName || '请输入图表名称',
            left: 'center',
            textStyle: {
              fontSize: 12
            }
          },
          xAxis: {
            name: this.visualConfigAxisOneText,
            nameLocation: 'center',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
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
            name: this.visualConfigAxisTwoText,
            position: 'left',
            nameLocation: 'middle',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            nameGap: 40
          },
          series: [{
            type: 'bar',
            data: [12, 23, 34, 24, 43, 45, 67, 46, 54, 65]
          }],
          color: ['#588EE6']
        })
      }

      this.visualConfigCharts.on('click', function (params) {
        //console.log('visualConfigCharts:', params)
        //console.log('bar-name:' + params.name, 'bar-data:' + params.data)
      })
      // window.onresize = this.visualConfigCharts.resize()
      // window.onresize = this.visualConfigCharts.resize
    },
    changeVisualAxisValue () {
      // 可视化配置中轴1与轴2切换方法
      // 2018/12/18 轴1和轴2切换时，不进行为空校验
      let twoText = this.visualConfigAxisTwoText
      let twoValue = this.visualConfigAxisTwoValue
      let twoSql = this.visualConfigAxisTwoSql
      let twoSqlValue = this.visualConfigAxisTwoSqlValue
      let twoTableIndex = this.visualConfigAxisTwoTableIndex
      let twoFormat = this.visualConfigAxisTwoFormat
      let twoFormatData = this.visualConfigAxisTwoFormatData
      let twoDataSourceName = this.visualConfigAxisTwoDataSourceName
      let twoTreeType = this.visualConfigAxisTwoTreeType
      let twoColumnType = this.visualConfigAxisTwoColumnType

      let oneText = this.visualConfigAxisOneText
      let oneValue = this.visualConfigAxisOneValue
      let oneSql = this.visualConfigAxisOneSql
      let oneSqlValue = this.visualConfigAxisOneSqlValue
      let oneTableIndex = this.visualConfigAxisOneTableIndex
      let oneFormat = this.visualConfigAxisOneFormat
      let oneFormatData = this.visualConfigAxisOneFormatData
      let oneDataSourceName = this.visualConfigAxisOneDataSourceName
      let oneTreeType = this.visualConfigAxisOneTreeType
      let oneColumnType = this.visualConfigAxisOneColumnType

      this.visualConfigAxisTwoText = oneText
      this.visualConfigAxisTwoValue = oneValue
      this.visualConfigAxisTwoSql = oneSql
      this.visualConfigAxisTwoSqlValue = oneSqlValue
      this.visualConfigAxisTwoTableIndex = oneTableIndex
      this.visualConfigAxisTwoFormat = oneFormat
      this.visualConfigAxisTwoFormatData = oneFormatData
      this.visualConfigAxisTwoDataSourceName = oneDataSourceName
      this.visualConfigAxisTwoTreeType = oneTreeType
      this.visualConfigAxisTwoColumnType = oneColumnType

      this.visualConfigAxisOneText = twoText
      this.visualConfigAxisOneValue = twoValue
      this.visualConfigAxisOneSql = twoSql
      this.visualConfigAxisOneSqlValue = twoSqlValue
      this.visualConfigAxisOneTableIndex = twoTableIndex
      this.visualConfigAxisOneFormat = twoFormat
      this.visualConfigAxisOneFormatData = twoFormatData
      this.visualConfigAxisOneDataSourceName = twoDataSourceName
      this.visualConfigAxisOneTreeType = twoTreeType
      this.visualConfigAxisOneColumnType = twoColumnType

      // this.visualConfigCharts.setOption({xAxis: {name: twoText}, yAxis: {name: oneText}})

      if (this.visualConfigAxisOneFormat !== 'decimalFormat') { // 轴1不是数值类型时则清空区间数量的值
        this.intervalNum = ''
      }

      if (this.visualConfigAxisTwoFormat !== 'decimalFormat') { // 轴2不是数值时则清空聚合函数的值
        this.twoAggregation = ''
      }
    },
    updateAxisDateArr (name, event) {
      if ((name === 'one' && this.visualConfigAxisOneText === '航班日期') ||
          (name === 'two' && this.visualConfigAxisTwoText === '航班日期') ||
          (name === 'three' && this.visualConfigAxisThreeText === '航班日期')
      ) {
        this.axisDateArr = this.axisDateArrDate
      } else {
        this.axisDateArr = this.axisDateArrDateTime
      }
    },
    selectCurrentAxis (name) { // 选中某个轴
      this.currentAxisStyle = name
    },
    addTableConfigRowData () { // 表格配置添加列名数据
      const tempRowObj = {
        tableConfigRowId: this.tableConfigData.length + 1, // 页面显示的序号
        id: '',
        name: '请在左侧数据库中选择列名',
        columnName: '',
        dataSourceName: '',
        resultColumnIndex: '',
        resultTableIndex: ''
      }
      this.currentTableConfigRowObj = tempRowObj // 新增后默认选中
      this.tableConfigData.push(tempRowObj)
    },
    tableConfigRowDelete (index, rows) { // 删除表格配置中的数据
      if (rows[index]['id'] !== '') {
        delete this.tableConfigDataObj[rows[index]['id']]
      }

      rows.splice(index, 1)
      this.tableConfigData = rows

      if (this.tableConfigData.length === 0) { // 表格配置无数据时清空默认数据
        this.tableConfigDataObj = {}
        this.currentTableConfigRowObj = {}
      } else if (this.tableConfigData.length > 0) {
        // this.currentTableConfigRowObj = this.tableConfigData[0]

        let tempTableConfigData = this.tableConfigData
        let tempTableConfigDataObj = this.tableConfigDataObj
        let tempTableData = []
        this.tableConfigData = []
        this.tableConfigDataObj = {}
        tempTableConfigData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableData.push(item)

          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        this.tableConfigData = tempTableData
        this.tableConfigDataObj = tempTableConfigDataObj
        this.currentTableConfigRowObj = {}
      }
    },
    tableConfigRowHandle (value) { // 表格配置中选中某行
      this.currentTableConfigRowObj = value
    },
    changeFileNewName (value) { // 筛选配置→属性→新建挖掘名称
      this.fileNewName = value
      // if (this.$util.isDefine(this.currentFilterConfigRowId)) { // 如果用户只选择一个筛选条件，且点击了筛选条件所在行
      //   this.filterCfgDataObj[this.currentFilterConfigRowId]['fileNewName'] = value
      // } else { // 如果用户只选择一个筛选条件，没有点击了筛选条件所在行，则取数据的第一条
      //   this.filterCfgDataObj[this.filterCfgData[0]['id']]['fileNewName'] = value
      // }
    },
    blurFileNewName (event) { // 新建分析名字失去焦点后校验
      // let reg = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$')
      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 ]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      let str = this.fileNewName // .replace(/(^\s*)|(\s*$)/g, '')
      if (!reg.test(str)) {
        this.alertTitleName = '新建分析的名字只含有汉字、数字、字母，前后不能有空格！'
        this.isSubmit = false
        return false
      } else if (!reg1.test(str)) {
        this.alertTitleName = '新建分析的名字不能有连续的空格！'
        this.isSubmit = false
        return false
      } else {
        this.alertTitleName = ''
        this.isSubmit = true
      }
    },
    dataViewPowerClick (value) {
      //console.log(value)
    },
    changeInputTypeNameValue (value) { // 筛选配置→属性二→文本输入值
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = value
      let tempSqlStr = ''
      let isNotFlag = this.inputTypeNameValueFlag === '1' ? '' : 'not '

      if (this.inputTypeNameQueryType === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + value + '%\'' // 模糊查询
        if (this.inputTypeNameValueFlag !== '1') {
          tempStr = '(不包含)' + tempStr
        }
      } else if (this.inputTypeNameQueryType === '2') {
        if (this.inputTypeNameValueFlag === '1') {
          tempSqlStr = ' = \'' + value + '\'' // 包含
        } else {
          tempSqlStr = ' <> \'' + value + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValue = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeInputTypeNameQueryType (value) { // 筛选配置→属性二→文本输入值的查询类型单选框
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = this.inputTypeNameValue
      let tempSqlStr = ''
      let isNotFlag = this.inputTypeNameValueFlag === '1' ? '' : 'not '

      if (value === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + this.inputTypeNameValue + '%\'' // 模糊查询
      } else if (value === '2') {
        if (this.inputTypeNameValueFlag === '1') {
          tempSqlStr = ' = \'' + this.inputTypeNameValue + '\'' // 包含
          if (this.inputTypeNameValueFlag !== '1') {
            tempStr = '(不包含)' + tempStr
          }
        } else {
          tempSqlStr = ' <> \'' + this.inputTypeNameValue + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameQueryType = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeInputTypeNameValueFlag (value) { // 筛选配置→属性二→文本输入值的查询类型 是否包含筛选条件开关
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = this.inputTypeNameValue
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      if (this.inputTypeNameQueryType === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + this.inputTypeNameValue + '%\'' // 模糊查询
        if (value !== '1') {
          tempStr = '(不包含)' + tempStr
        }
      } else if (this.inputTypeNameQueryType === '2') {
        if (value === '1') {
          tempSqlStr = ' = \'' + this.inputTypeNameValue + '\'' // 包含
        } else {
          tempSqlStr = ' <> \'' + this.inputTypeNameValue + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValueFlag = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrOneRadio (value) { // 筛选配置→属性三
      let expressionId = this.expressionData['attrOneRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrOneRadio = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    changeStandardSelectValue (value) { // 筛选配置→属性三→标准→下拉框
      let expressionId = this.expressionData['attrOneRadio'][this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag']][value]
      this.resetAttrOneDefaultData(false, false)
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurStandardMinValue (event) { // 筛选配置→属性三→标准→文本框最小值→失去焦点
      //console.log('blurStandardMinValue', event)
      if (parseFloat(this.standardMinValue).toString() === 'NaN') {
        this.alertTitle = '参数' + this.standardMinValue + '不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (parseInt(this.standardSelectValue) > 6) {
        this.blurStandardMaxValue(event)
      }
    },
    changeStandardMinValue (value) { // 筛选配置→属性三→标准→文本框最小值
      const minStrArr = ['等于', '不等于', '小于', '小于等于', '大于', '大于等于']
      const minSymbolArr = ['=', '!=', '<', '<=', '>', '>=']
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterCfgDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterCfgDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (parseInt(this.standardSelectValue) < 7) {
        if (value !== '') { // 每次选择下拉框时都会触发最大值和最小值的改变，在这里判断最小值不为空时显示条件值
          tempStr = minStrArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value) // 拼接过滤条件值
          tempSqlStr = 'cast(' + tempSqlType + ' as double) ' + minSymbolArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value)
        }
      } else if (this.standardMaxValue !== '') {
        if (this.standardSelectValue === '7') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '8') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9') {
          tempStr = 'x<=' + this.$util.dealInputNumValue(value) + '或x>=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '10') {
          tempStr = 'x<' + this.$util.dealInputNumValue(value) + '或x>' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '781') {
          tempStr = this.$util.dealInputNumValue(value) + '<x<=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '782') {
          tempStr = this.$util.dealInputNumValue(value) + '<x<' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9101') {
          tempStr = 'x<' + this.$util.dealInputNumValue(value) + '或x>=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9102') {
          tempStr = 'x<=' + this.$util.dealInputNumValue(value) + '或x>' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(this.standardMaxValue)
        }
      }
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$util.dealInputNumValue(value)
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMaxValue (event) { // 筛选配置→属性三→标准→文本框最大值→失去焦点
      //console.log('blurStandardMinValue', event)
      if (!this.$util.isDefine(this.standardMinValue)) {
        this.alertTitle = '请输入参数1'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (parseFloat(this.standardMaxValue).toString() === 'NaN') {
        this.alertTitle = '参数2不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.standardSelectValue === '7' || this.standardSelectValue === '8') {
        if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能等于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }

        if (this.$util.dealInputNumValue(this.standardMinValue) > this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能小于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
      if (this.standardSelectValue === '9' || this.standardSelectValue === '10') {
        // if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
        //   this.alertTitle = '参数2不能等于参数1'
        //   this.isSubmit = false
        //   return false
        // } else {
        //   this.isSubmit = true
        //   this.alertTitle = ''
        // }

        // if (this.$util.dealInputNumValue(this.standardMinValue) < this.$util.dealInputNumValue(this.standardMaxValue)) {
        //   this.alertTitle = '参数1不能小于参数2'
        //   this.isSubmit = false
        //   return false
        // } else {
        //   this.isSubmit = true
        //   this.alertTitle = ''
        // }
      }
    },
    changeStandardMaxValue (value) { // 筛选配置→属性三→标准→文本框最大值
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterCfgDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterCfgDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (this.standardSelectValue === '7') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<=' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '8') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9') {
        tempStr = 'x<=' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>=' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '10') {
        tempStr = 'x<' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '781') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<x<=' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '782') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<x<' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9101') {
        tempStr = 'x<' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>=' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9102') {
        tempStr = 'x<=' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(value)
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$util.dealInputNumValue(value)
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeLogicalValue (value) { // 筛选配置→属性四
      //console.log('changeLogicalValue@@@@~: ' + value)
      let tempStr = ''
      let tempSqlStr = ''
      if (value === 1 || value === '1') {
        tempSqlStr = '= 1'
        tempStr = '是'
      } else {
        tempSqlStr = '= 0'
        tempStr = '否'
      }
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrFourRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrSixRadio (value) { // 筛选配置→属性六
      let expressionId = this.expressionData['attrSixRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrSixRadio = value
      this.resetAttrSixDefaultData(false)
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurAccordDayStartDate (event) { // 开始日期失去焦点校验
      //console.log('blurAccordDayStartDate', event)
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']

      if (!this.$util.isDefine(this.accordDayStartDate)) { // 点击开始日期后没有选择值
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.accordDayEndDate) { // 存在结束日期
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() && columnName !== 'FLIGHT_DATE') {
          this.alertTitle = '开始日期不能等于结束日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          this.alertTitle = '结束日期不能早于开始日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
    },
    changeAccordDayStartDate (value) { // 筛选配置→属性六→按天→开始日期
      let tempStr = ''
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']

      if (columnName === 'FLIGHT_DATE') {
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      } else {
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() || new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      }

      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        if (columnName === 'FLIGHT_DATE') {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD')
        } else {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss') + '\''
      if (columnName === 'FLIGHT_DATE') {
        tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).add(1, 'days').format('YYYY-MM-DD') + '\''
      }

      this.accordDayStartDate = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') : this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurAccordDayEndDate (event) { // 结束日期失去焦点校验
      //console.log('blurAccordDayEndDate', event)
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']

      if (!this.$util.isDefine(this.accordDayStartDate)) { // 直接设置结束日期没有设置开始日期
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (!this.$util.isDefine(this.accordDayEndDate)) { // 点击开始日期但是没有选择值
        this.alertTitle = '请选择结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() && columnName !== 'FLIGHT_DATE') {
        this.alertTitle = '开始日期不能等于结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
        this.alertTitle = '结束日期不能早于开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
    },
    changeHotWordsSearchValueEvent (value) { // 筛选配置→AGS事件
      // let _names = []
      // let _vals = []
      // value.forEach((item, index) => {
      //   _names.push(item.columnname.trim())
      //   _vals.push(item.PRO_NO)
      // })

      let tempStr = value.join(',')
      let tempSqlStr = value.join(',')

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = this.agsEventLevelValue.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },

    changEventHappenValueFlag (value) { // 筛选配置→属性五 value == eventHappenValueFlag
      let tempStr = ''
      let condition = ''
      if (this.eventHappenValueFlag === '1') { // 已发生
        if (this.eventLevelValue.length === 0) {
          tempStr = '已发生'
          condition = ''
        } else {
        for (let i = 0; i < this.eventLevelValue.length; i++) {
          if (i === 0) {
            tempStr = this.eventLevelMap[this.eventLevelValue[i]]
          } else {
            tempStr += ',' + this.eventLevelMap[this.eventLevelValue[i]]
          }
        }
        tempStr = `已发生[${tempStr}]`
        condition = this.eventLevelValue.join(',')
      }
      } else {
        tempStr = '未发生'
        condition = '-1'
      }
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = condition
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAccordDayEndDate (value) { // 筛选配置→属性六→按天→结束日期
      let tempStr = ''
      let columnName = this.filterCfgDataObj[this.currentFilterConfigRowId]['columnName']

      if (columnName === 'FLIGHT_DATE') {
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      } else {
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() || new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      }

      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        if (columnName === 'FLIGHT_DATE') {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD')
        } else {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss') + '\''
      if (columnName === 'FLIGHT_DATE') {
        tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).add(1, 'days').format('YYYY-MM-DD') + '\''
      }
      this.accordDayEndDate = value
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayEndDate).format('YYYY-MM-DD') : this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeDataPointType () {
      this.isSubmit = true

      let years = this.dataPointY
      let months = this.dataPointM
      let dailys = this.dataPointD
      let hours = this.dataPointH
      let quarters = this.dataPointQ
      let weeks = this.dataPointW

      let dataPoinObj = {
        year: this.$util.isNotEmptyObject(years) ? years : [],
        month: this.$util.isNotEmptyObject(months) ? months : [],
        day: this.$util.isNotEmptyObject(dailys) ? dailys : [],
        hour: this.$util.isNotEmptyObject(hours) ? hours : [],
        quarter: this.$util.isNotEmptyObject(quarters) ? quarters : [],
        dayofweek: this.$util.isNotEmptyObject(weeks) ? weeks : []
      }

      let tempStr = []
      if (this.$util.isNotEmptyObject(years)) {
        tempStr.push('年：' + years.join(', '))
      }
      if (this.$util.isNotEmptyObject(months)) {
        tempStr.push('月：' + months.join(', '))
      }
      if (this.$util.isNotEmptyObject(dailys)) {
        tempStr.push('日：' + dailys.join(', '))
      }
      if (this.$util.isNotEmptyObject(hours)) {
        tempStr.push('时：' + hours.join(', '))
      }
      if (this.$util.isNotEmptyObject(quarters)) {
        tempStr.push('季度：' + quarters.join(', '))
      }
      if (this.$util.isNotEmptyObject(weeks)) {
        let wStr = []
        weeks.forEach((item, index) => {
          wStr.push(this.dataPointWObj[item])
        })
        tempStr.push('星期：' + wStr.join(', '))
      }

      let tt = JSON.stringify(dataPoinObj)

      //console.log(JSON.stringify(dataPoinObj), ' ', tempStr.join('； '))
      //console.log(tt.substring(1, tt.length - 1))

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr.join('； ')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = ''
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tt.substring(1, tt.length - 1)
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr.join('； ')
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr.join('； '), true)
    },
    changeNotHotWordsSearchValue (value) { // 筛选配置→属性七→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.notHotWordsSearchValueFlag === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.notHotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueJD (value) {
      let _names = []
      let _vals = []
      value.forEach((item, index) => {
        _names.push(item.COLUMNNAME.trim())
        _vals.push(item.VALUE)
      })

      let tempStr = _names.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.notHotWordsSearchValueFlag === '1' ? '' : 'not '

      let sqls = []
      _vals.forEach((item, index) => {
        sqls.push('vw.FLIGHT_UNIT_CODE ' + isNotFlag + 'like \'' + item + '%\'')
      })
      tempSqlStr = '(' + sqls.join(' or ') + ')'

      if (this.notHotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueFlag (value) { // 筛选配置→属性七→下拉框 是否包含筛选条件开关
      let tData = this.notHotWordsSearchValue
      let tempStr = tData.join(',')
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + tData.join("','") + "')"

      if (this.currentFilterConfigRowAttrName === 'FLIGHT_UNIT_NAME') {
        let _names = []
        let _vals = []
        this.notHotWordsSearchValue.forEach((item, index) => {
          _names.push(item.COLUMNNAME.trim())
          _vals.push(item.VALUE)
        })
        let sqls = []
        _vals.forEach((item, index) => {
          sqls.push('vw.FLIGHT_UNIT_CODE ' + isNotFlag + 'like \'' + item + '%\'')
        })
        tempSqlStr = '(' + sqls.join(' or ') + ')'
        tempStr = _names.join(',')
      }

      if (value !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValue (value) { // 筛选配置→属性八→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.hotWordsSearchValueFlag === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.hotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValueFlag (value) { // 筛选配置→属性八→下拉框 是否包含筛选条件开关
      let tData = this.hotWordsSearchValue
      let tempStr = tData.join(',')
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + tData.join("','") + "')"
      if (value !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventLevelValue (value) {
      let tempStr = ''
      let condition = ''
      if (this.eventHappenValueFlag === '1') { // 已发生
        if (value.length === 0) {
          tempStr = '已发生'
          condition = ''
        } else {
          for (let i = 0; i < value.length; i++) {
            if (i === 0) {
              tempStr = this.eventLevelMap[value[i]]
            } else {
              tempStr += ',' + this.eventLevelMap[value[i]]
            }
          }
          tempStr = `已发生[${tempStr}]`
          condition = value.join(',')
        }
      } else {
        tempStr = '未发生'
        condition = '-1'
      }
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = condition
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueEvent51 (value) {
      let _names = []
      let _vals = []
      value.forEach((item, index) => {
        _names.push(item.columnname.trim())
        _vals.push(item.value)
      })

      let tempStr = ''

      let evLevel = this.eventLevelValue

      if (this.eventLevelValue.length === 0) {
        evLevel = ['高', '中', '低']
      }

      tempStr = `已选事件: ${_names.join(',')}, 已选事件等级: ${evLevel.join(',')}`

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = evLevel.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventLevelValue51 (value) { // type === 51  事件
      if (value.length === 0) {
        value = ['高', '中', '低']
      }

      let tempStr = ''

      let _names = []
      let _vals = []
      this.notHotWordsSearchValue.forEach((item, index) => {
        _names.push(item.columnname.trim())
        _vals.push(item.value)
      })

      tempStr = `已选事件: ${_names.join(',')}, 已选事件等级: ${value.join(',')}`

      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = value.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterCfgDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    setConfigAttrValue (obj) { // 设置配置的属性值
      let operatordId = obj.operatordId
      let filterStr = ''
      this.currentFilterConfigRowId = obj.paramId
      if (operatordId === '1' || operatordId === '2' || operatordId === '3' || operatordId === '6' || operatordId === '5') {
        filterStr = this.standardSelectArray[parseInt(operatordId) - 1] + obj.paramValueOne
        this.setAttrOneRadio(obj)
      } else if (operatordId === '4') {
        filterStr = obj.filterName
        // this.setAttrOneRadio(obj)
      } else if (operatordId === '7') {
        filterStr = obj.paramValueOne + ' <= x <= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '8') {
        filterStr = obj.paramValueOne + ' <= x < ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '781') {
        filterStr = obj.paramValueOne + ' < x <= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '782') {
        filterStr = obj.paramValueOne + ' < x < ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9') {
        filterStr = 'x <= ' + obj.paramValueOne + ' 或 ' + ' x >= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '10') {
        filterStr = 'x < ' + obj.paramValueOne + ' 或 ' + ' x > ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9101') {
        filterStr = 'x < ' + obj.paramValueOne + ' 或 ' + ' x >= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9102') {
        filterStr = 'x <= ' + obj.paramValueOne + ' 或 ' + ' x > ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '11') { // 文本值
        filterStr = obj.paramValueOne
      } else if (operatordId === '12') { // 非热词搜索
        filterStr = obj.selectValueOne
      } else if (operatordId === '13') { // 热词搜索
        filterStr = obj.selectValueOne
      } else if (operatordId === '37') {
        this.attrSixRadio = obj.attrRadioFlag
        this.accordDayStartDate = obj.paramValueOne
        this.accordDayEndDate = obj.paramValueTwo
        if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
          filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD HH:mm:ss')
          if (obj.columnName === 'FLIGHT_DATE') {
            filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD')
          }
        }
      } else if (operatordId === '38') {
        this.attrSixRadio = obj.attrRadioFlag

        filterStr = obj.paramValueOne
      }

      const tempObj = {
        id: obj.paramId,
        name: obj.paramName,
        type: obj.paramType,
        filter: filterStr,
        filterConditions: obj,
        resultColumnIndex: obj.resultColumnIndex,
        resultTableIndex: obj.resultTableIndex,
        columnName: obj.columnName,
        dataSourceName: obj.dataSourceNameValue
      }
      return tempObj
    },
    setAttrOneRadio (obj) { // 设置筛选配置中数值类型的值
      this.attrOneRadio = obj.attrRadioFlag
      this.standardSelectValue = obj.selectValueOne
      this.standardMinValue = obj.paramValueOne
      if (parseInt(obj.selectValueOne) > 6) {
        this.standardMaxValue = obj.paramValueTwo
      }
    },
    assemblyNewFileParams (type) { // 组装提交新建需要的参数
      const paramStr = {
        axisOne: '',
        axisOneValue: '',
        axisOneName: '',
        axisOneTreeId: '',
        axisOneTableIndex: '',
        axisOneDataSourceName: '',
        axisOneTreeType: '',
        axisOneColumnType: '',
        axisTwo: '',
        axisTwoValue: '',
        axisTwoName: '',
        axisTwoTreeId: '',
        axisTwoTableIndex: '',
        axisTwoDataSourceName: '',
        axisTwoTreeType: '',
        axisTwoColumnType: '',
        axisThree: '',
        axisThreeValue: '',
        axisThreeName: '',
        axisThreeTreeId: '',
        axisThreeTableIndex: '',
        axisThreeDataSourceName: '',
        axisThreeTreeType: '',
        axisThreeColumnType: '',
        notNull: '', // 筛选配置+轴
        tableIndex: '', // 筛选条件+轴
        fileNewName: '',
        pageNo: '', // 航班编号的页码
        pageUUID: '',
        filter: [],
        chartName: '',
        intervalNum: '',
        oneFormat: '',
        oneFormatData: '',
        twoFormat: '',
        twoFormatData: '',
        threeFormat: '',
        threeFormatData: '',
        dataSourceName: '', // 筛选配置+轴
        twoAggregation: '',
        isSort: '',
        sortNum: '',
        sortType: '',
        tableDataIndex: '', // 筛选条件+表格配置
        tableDataSoucreName: '', // 筛选条件+表格配置
        tableColumnName: '',
        tableColumnZhName: '',
        tableConfig: [],
        tablePageSize: 0, // 分析结果中表格详情的当前页码
        tablePageNum: 100, // 分析结果中表格详情的每页显示数量
        xAsixDataList: '', // 添加辅助线专用，x轴数据集合
        isGuide: '' // 是否时添加辅助线调用的标识，1：表示是添加辅助线调用的，其他传空值
      }

      let notNullArr = []
      let tableIndexArr = []
      let dataSourceNameArr = []
      let tempTableDataIndex = [] // 筛选条件+表格配置
      let tempTableDataSoucreName = [] // 筛选条件+表格配置

    // if (!type) {  }

      if (this.visualConfigAxisOneValue === '' &&
        this.visualConfigAxisTwoValue === '' &&
        this.visualConfigAxisThreeValue === '' &&
        !this.$util.isNotEmptyObject(this.tableConfigDataObj) &&
        this.filterCfgData.length === 0 &&
        !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      // if (this.visualConfigAxisOneValue === '' &&
      //   this.visualConfigAxisTwoValue === '' &&
      //   this.visualConfigAxisThreeValue === '' &&
      //   !this.$util.isNotEmptyObject(this.tableConfigDataObj) &&
      //   !type) {
      //   this.$message({
      //     // message: '请选择轴类型',
      //     message: '请选择可视化配置或表格配置',
      //     type: 'warning'
      //   })
      //   return false
      // }

      if (this.filterCfgData.length === 0 && !this.$util.isNotEmptyObject(this.tableConfigDataObj) && !type) { // 如果存在表格配置数据则不需要验证
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }
      if (this.filterCfgData.length === 1 && (this.filterCfgData[0].type === 9999 || this.filterCfgData[0].type === '9999') && !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      if (!(this.visualConfigAxisOneValue === '' && this.visualConfigAxisTwoValue === '' && this.visualConfigAxisThreeValue === '') &&
        this.$util.isNotEmptyObject(this.tableConfigDataObj) &&
        this.filterCfgData.length === 0 &&
        !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      // this.blurStandardMinValue()
      // if (parseInt(this.standardSelectValue) > 6) {
      //   this.blurStandardMaxValue()
      // }

      // if (this.filterCfgData.length > 0) {
        paramStr.axisOneName = this.visualConfigAxisOneText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisOneText
        paramStr.axisOne = this.visualConfigAxisOneSql
        paramStr.axisOneValue = this.visualConfigAxisOneSqlValue
        paramStr.axisOneTableIndex = this.visualConfigAxisOneTableIndex
        paramStr.axisOneTreeId = this.visualConfigAxisOneValue
        paramStr.axisOneDataSourceName = this.visualConfigAxisOneDataSourceName
        paramStr.axisOneTreeType = this.visualConfigAxisOneTreeType
        paramStr.axisOneColumnType = this.visualConfigAxisOneColumnType
        paramStr.axisTwoName = this.visualConfigAxisTwoText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisTwoText
        paramStr.axisTwo = this.visualConfigAxisTwoSql
        paramStr.axisTwoTableIndex = this.visualConfigAxisTwoTableIndex
        paramStr.axisTwoValue = this.visualConfigAxisTwoSqlValue
        paramStr.axisTwoTreeId = this.visualConfigAxisTwoValue
        paramStr.axisTwoDataSourceName = this.visualConfigAxisTwoDataSourceName
        paramStr.axisTwoTreeType = this.visualConfigAxisTwoTreeType
        paramStr.axisTwoColumnType = this.visualConfigAxisTwoColumnType
        paramStr.axisThreeName = this.visualConfigAxisThreeText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisThreeText
        paramStr.axisThree = this.visualConfigAxisThreeSql
        paramStr.axisThreeTableIndex = this.visualConfigAxisThreeTableIndex
        paramStr.axisThreeValue = this.visualConfigAxisThreeSqlValue
        paramStr.axisThreeTreeId = this.visualConfigAxisThreeValue
        paramStr.axisThreeDataSourceName = this.visualConfigAxisThreeDataSourceName
        paramStr.axisThreeTreeType = this.visualConfigAxisThreeTreeType
        paramStr.axisThreeColumnType = this.visualConfigAxisThreeColumnType
        paramStr.chartName = this.visualConfigChartsName
        paramStr.intervalNum = this.intervalNum
        paramStr.twoAggregation = this.twoAggregation ? this.twoAggregation : 'count'
        paramStr.isSort = this.sortChecked
        paramStr.sortNum = this.sortNum
        paramStr.sortType = this.sortType
        paramStr.oneFormat = this.visualConfigAxisOneFormat
        paramStr.oneFormatData = (this.visualConfigAxisOneFormat === 'textFormat' && this.visualConfigAxisOneFormatData === '1') ? 'like \'%' + this.visualConfigAxisOneFormatData + '%\'' : this.visualConfigAxisOneFormatData

        paramStr.twoFormat = this.visualConfigAxisTwoFormat
        if (this.isShowVisualConfigThreeAxis) {
          paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : this.visualConfigAxisTwoFormatData
        } else {
          if (this.twoAggregation) {
            paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : this.visualConfigAxisTwoFormatData
          } else {
            paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : ''
          }
        }

        paramStr.threeFormat = this.visualConfigAxisThreeFormat
        if (this.isShowVisualConfigThreeAxis) {
          if (this.twoAggregation) {
            paramStr.threeFormatData = (this.visualConfigAxisThreeFormat === 'textFormat' && this.visualConfigAxisThreeFormatData === '1') ? 'like \'%' + this.visualConfigAxisThreeFormatData + '%\'' : this.visualConfigAxisThreeFormatData
          } else {
            paramStr.threeFormatData = (this.visualConfigAxisThreeFormat === 'textFormat' && this.visualConfigAxisThreeFormatData === '1') ? 'like \'%' + this.visualConfigAxisThreeFormatData + '%\'' : ''
          }
        } else {
          paramStr.threeFormat = ''
          paramStr.threeFormatData = ''
        }

        // 轴1和轴2类型为数值，可以相同
        if (!type && this.visualConfigAxisOneFormat !== '' && this.visualConfigAxisTwoFormat !== '' && this.visualConfigAxisOneFormat === this.visualConfigAxisTwoFormat && this.visualConfigAxisOneFormat !== 'decimalFormat' && this.visualConfigAxisTwoFormat !== 'decimalFormat') {
          let tempMsg = this.visualConfigAxisOneTextName + '的轴类型和' + this.visualConfigAxisTwoTextName + '的轴类型相同，请重新选择'
          this.$message({
            message: tempMsg,
            type: 'warning'
          })
          return false
        }
        if (!type && this.visualConfigAxisTwoValue !== '' && this.visualConfigAxisTwoTextName === '测量' && this.visualConfigAxisTwoFormat !== 'decimalFormat') {
          this.$message({
            message: '测量轴的值必须是测量值，请重新选择！',
            type: 'warning'
          })
          return false
        }
        if (this.isShowVisualConfigThreeAxis && this.visualConfigAxisThreeValue === '') {
          paramStr.axisThree = '1' // 第三轴显示则值为空，提交时此参数设置为1
        }
        if (!type && this.visualConfigAxisThreeValue !== '' && this.visualConfigAxisThreeTextName === '测量' && this.visualConfigAxisThreeFormat !== 'decimalFormat') {
          this.$message({
            message: '测量轴的值必须是测量值，请重新选择！',
            type: 'warning'
          })
          return false
        }

        this.filterCfgData.forEach((item, index) => { // 处理提交参数
          if (item.type === 9999 || item.type === '9999') {
            return true
          }
          // item.type !== '4' &&
          if (this.$util.isNotEmptyObject(item.filterConditions)) {
            paramStr.filter.push(item.filterConditions)

            if (this.$util.isDefine(item.dataSourceName)) {
              dataSourceNameArr.push(item.dataSourceName)
              tempTableDataSoucreName.push(item.dataSourceName)
            }

            if (this.$util.isDefine(item.resultColumnIndex) && this.$util.isDefine(item.resultTableIndex)) { // 挖掘参数
              notNullArr.push('g' + item.resultColumnIndex)
              tableIndexArr.push(item.resultTableIndex)
              tempTableDataIndex.push(item.resultTableIndex)
            }

            if (this.$util.isDefine(item.columnName)) {
              // 如果节点的dataSourceName的值不为'hive_vw_snapshot_flight_info_parquet'，notNull的参数就是dataSourceName.columnName
              if (item.dataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(item.dataSourceName)) {
                notNullArr.push(item.dataSourceName + '.' + item.columnName)
              } else {
                notNullArr.push(item.columnName)
              }
            }

            if (!this.$util.isDefine(item.filter) && !type) {
              this.isSubmit = false // 只要参数条件有一个为空，则不能提交
              this.filterNames.push(item.name)
            }
          } else {
            if ((!this.$util.isDefine(item.filter) || !this.$util.isNotEmptyObject(item.filterConditions)) && !type) {
              this.isSubmit = false // 只要参数条件有一个为空，则不能提交
              this.filterNames.push(item.name)
            }
          }
        })

        if (this.$util.isDefine(this.visualConfigAxisOneSql) && this.$util.isDefine(this.visualConfigAxisOneSqlValue)) {
          if (this.visualConfigAxisOneDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisOneDataSourceName)) {
            notNullArr.push(this.visualConfigAxisOneDataSourceName + '.' + this.visualConfigAxisOneSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisOneSqlValue)
          }
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoSql) && this.$util.isDefine(this.visualConfigAxisTwoSqlValue)) {
          if (this.visualConfigAxisTwoDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisTwoDataSourceName)) {
            notNullArr.push(this.visualConfigAxisTwoDataSourceName + '.' + this.visualConfigAxisTwoSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisTwoSqlValue)
          }
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeSql) && this.$util.isDefine(this.visualConfigAxisThreeSqlValue)) {
          if (this.visualConfigAxisThreeDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisThreeDataSourceName)) {
            notNullArr.push(this.visualConfigAxisThreeDataSourceName + '.' + this.visualConfigAxisThreeSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisThreeSqlValue)
          }
        }

        if (this.$util.isDefine(this.visualConfigAxisOneTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisOneTableIndex)
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisTwoTableIndex)
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisThreeTableIndex)
        }

        if (this.$util.isDefine(this.visualConfigAxisOneDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisOneDataSourceName)
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisTwoDataSourceName)
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisThreeDataSourceName)
        }
        paramStr.notNull = this.$util.distinctArray(notNullArr).join(',')
        paramStr.tableIndex = this.$util.distinctArray(tableIndexArr).join(',')
        paramStr.dataSourceName = this.$util.distinctArray(dataSourceNameArr).join(',')
      // }

      if (this.$util.isNotEmptyObject(this.tableConfigDataObj)) {
        let tempTableColumnName = []
        let tempTableColumnZhName = []
        let tempTableConfig = []
        let tempTableConfigDataObj = this.tableConfigDataObj
        for (let i in tempTableConfigDataObj) {
          let item = tempTableConfigDataObj[i]
          if (item.resultTableIndex !== '') {
            tempTableDataIndex.push(item.resultTableIndex)
          }
          if (item.dataSourceName !== '') {
            tempTableDataSoucreName.push(item.dataSourceName)
          }
          if (item.columnName !== '' && item.resultColumnIndex === '') {
            tempTableColumnName.push(item.columnName)
          }
          if (item.resultColumnIndex !== '' && item.columnName === '') {
            tempTableColumnName.push('g' + item.resultColumnIndex)
          }
          if (item.name !== '') {
            tempTableColumnZhName.push(item.name)
          }
          tempTableConfig.push(item) // 临时存放有数据的行
        }
        paramStr.tableDataIndex = this.$util.distinctArray(tempTableDataIndex).join(',')
        paramStr.tableDataSoucreName = this.$util.distinctArray(tempTableDataSoucreName).join(',')
        paramStr.tableColumnName = tempTableColumnName.join(',')
        paramStr.tableColumnZhName = tempTableColumnZhName.join(',')
        paramStr.tableConfig = tempTableConfig
      }

      paramStr.fileNewName = this.fileNewName
      //console.log('assemblyNewFileParams:', JSON.stringify(paramStr))

      if (type === 'copy') {
        if (this.copySaveName === '') {
          this.$message({
            message: '请输入分析名字！',
            type: 'warning'
          })
          return false
        } else {
          let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
          let reg1 = new RegExp('^((?! {2,}).)+$')

          if (!reg.test(this.copySaveName)) {
            this.$message({
              message: '挖掘名称只含有汉字、数字、字母，前后不能有空格！',
              type: 'warning'
            })
            return false
          } else if (!reg1.test(this.copySaveName)) {
            this.$message({
              message: '挖掘名称不能有连续的空格！',
              type: 'warning'
            })
            return false
          }
        }
        if (this.csTreeNodeId === '') {
          this.$message({
            message: '请选择节点！',
            type: 'warning'
          })
          return false
        }
        paramStr.fileNewName = this.copySaveName
        return false
      }

      if (type) { // 保存
        if (this.fileNewName === '') { // 挖掘名称校验
          this.$message({
            message: '请输入挖掘名称！',
            type: 'warning'
          })
          return false
        } else {
          // let reg = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$')
          let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
          let reg1 = new RegExp('^((?! {2,}).)+$')
          if (!reg.test(this.fileNewName)) {
            this.$message({
              message: '新挖掘名称只含有汉字、数字、字母，前后不能有空格！',
              type: 'warning'
            })
            return false
          } else if (!reg1.test(this.fileNewName)) {
            this.$message({
              message: '挖掘名称不能有连续的空格！',
              type: 'warning'
            })
            return false
          }
        }
        this.saveDataMinIng(paramStr) // 添加挖掘参数数据
      }

      if (this.isSubmit) { // 是否允许提交或者保存
        if (!type) { // 提交
          this.$store.commit('SUBMIT_NEWFILE_TAB_ACTIVE', this.tabActiveResult[this.fileNewContentActiveName])
          this.$bus.$emit('submitNewFileDataHandle', paramStr, 'newFileComponent') // 调用提交新建方法，此方法在Manager.vue中, 第三个参数表示从哪个功能提交的
        }
      } else {
        if (!type) {
          if (this.filterNames.length > 0) {
            this.$message({
              message: '筛选条件[ ' + this.filterNames[0] + ' ]输入有误！',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '筛选条件输入有误！',
              // message: '请选择一行筛选条件！',
              type: 'warning'
            })
          }
          this.filterNames = []
          return false
        }
      }
    },
    refreshCopySaveTreeData () {
      if (!this.$util.isDefine(this.copySaveTreeKeyword)) {
        this.getTreeData()
      }
    },
    getTreeData () { // 获取树节点数据
      this.managerTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/analysisRecordCategory/queryAnalysisRecordCategory',
        method: 'get',
        params: {
          likeContent: this.copySaveTreeKeyword
        }
      }).then(response => {
        ////console.log('QueryAnalysisRecordCategory~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
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
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            this.managerTreeData = resultData
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.copyDefaultExpandedKeys.push(expandedKey)
          } else {
            this.copyDefaultExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        // this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    saveDataMinIng (param) { // 保存挖掘参数
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      var url = '/dm/addDataMining'
      if (this.dataMining && this.dataMining.ID) { // 存在分析管理传过来的挖掘参数，走修改
         url = '/dm/updateDataMining'
      }
      var paramStr = {
        id: this.dataMining.ID,
        dataMiningName: this.fileNewName,
        dataMiningType: this.$refs.dataConfigPropertiesRef.form.algorSelect,
        dataMiningDescription: this.dataMiningDescription,
        profileId: this.profileId
      }
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        var dataRes = response.data
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          // this.$message({
          //   message: dataRes.message,
          //   type: 'success'
          // })
          if (dataRes.value) {
            this.dataMining.ID = dataRes.value
          }
          this.$bus.$emit('changeTabData', {zhName: this.fileNewName, enName: 'dataMining_file_new', parent: 'dataMining_mining'})
          this.$bus.$emit('saveDataMinIngEmit')
          if (this.dataConfigTableData.length === 0 && this.filterCfgData.length === 0) { // 如果没有配置数据和筛选配置直接提示保存成功
            this.$store.commit('HIDE_LOADING', '拼命加载中')
            this.$message({
              message: dataRes.message,
              type: 'success'
            })
          } else {
            let type = this.$refs.dataConfigPropertiesRef.form.algorSelect
            this.updateModelConfig(param, type)
          }
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中')
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
      })
    },
    updateFlightFilter (param) {
      this.flightFilter = JSON.stringify(param['filter'])
      if (this.flightFilter && this.flightFilter.length > 0) {
      let paramStr = {
          id: this.dataMining.ID,
          filter: this.flightFilter,
          createStep: '{"dataConfigTableData": ' + JSON.stringify(this.dataConfigTableData) + ', "propertiesFormData":' + JSON.stringify(this.$refs.dataConfigPropertiesRef.form) + ', "filterConfigTableData":' + JSON.stringify(this.filterCfgData) + ', "filterConfigTableDataObj": ' + JSON.stringify(this.filterCfgDataObj) + ', "dataConfigTableDataObj": ' + JSON.stringify(this.dataConfigTableDataObj) + '}'
        }
        paramStr = this.$qs.stringify(paramStr)
        // 保存节点到数据库
        this.$axios.post('/dm/updateFlightFilter', paramStr).then((response) => {
          this.$store.commit('HIDE_LOADING', '拼命加载中')
          var dataRes = response.data
          if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (dataRes.status === '0') {
            this.$message({
              message: dataRes.message,
              type: 'success'
            })
          } else {
            this.$message.error(dataRes.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中')
        })
      } else {
        // dataconfig不为空 且执行成功后，filter为空，则直接提示成功。
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message({
          message: '成功',
          type: 'success'
        })
      }
    },
    // 判断是否为数字，和小数
    isNumber (val) {
      var regPos = /^\d+(\.\d+)?$/
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
      return false
      }
    },
    // 数据配置
    updateModelConfig (param, type) {
      if (this.dataConfigTableData && this.dataConfigTableData.length > 0) {
        // {ids:[],type:linear,"normal":"0","regParam":"0","elasticNetParam":"","maxIter":"","solver":"","fitIntercep":""}
      let ids = []
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
          ids.push(this.dataConfigTableData[i]['dataId'])
        }
        let obj = {'ids': ids, 'idArray': this.dataConfigTableData}
        if (type === 'linear') { // 线性回归
          // if (this.$refs.dataConfigPropertiesRef.form.features === undefined || this.$refs.dataConfigPropertiesRef.form.features === '') {
          //   this.$message.error('选中的标签列不能为空')
          //   return false
          // }
          if (!this.isNumber(this.$refs.dataConfigPropertiesRef.form.regParam) || this.$refs.dataConfigPropertiesRef.form.regParam * 1 > 1 || this.$refs.dataConfigPropertiesRef.form.regParam * 1 < 0) {
            this.$message.error('正则函数类型的范围是[0,1]的数')
            return false
          }
          if (!this.isNumber(this.$refs.dataConfigPropertiesRef.form.elasticNetParam) || this.$refs.dataConfigPropertiesRef.form.elasticNetParam * 1 > 1 || this.$refs.dataConfigPropertiesRef.form.elasticNetParam * 1 < 0) {
            this.$message.error('弹性参数的取值范围是[0,1]')
            return false
          }
          obj['type'] = type
          obj['normal'] = this.$refs.dataConfigPropertiesRef.form.normal
          obj['regParam'] = this.$refs.dataConfigPropertiesRef.form.regParam
          obj['maxIter'] = this.$refs.dataConfigPropertiesRef.form.maxIter
          obj['elasticNetParam'] = this.$refs.dataConfigPropertiesRef.form.elasticNetParam
          obj['solver'] = this.$refs.dataConfigPropertiesRef.form.solver
          obj['features'] = this.$refs.dataConfigPropertiesRef.form.features
          obj['fitIntercep'] = this.$refs.dataConfigPropertiesRef.form.fitIntercep
        } else if (type === 'kmeans') { // kmeans
          if (!this.$refs.dataConfigPropertiesRef.form.k) {
            this.$store.commit('HIDE_LOADING', '拼命加载中')
            this.$message.error('k值不能为空')
            return
          }
          obj['type'] = type
          obj['normal'] = this.$refs.dataConfigPropertiesRef.form.normal
          obj['maxIter'] = this.$refs.dataConfigPropertiesRef.form.maxIter
          obj['k'] = this.$refs.dataConfigPropertiesRef.form.k
          obj['runs'] = this.$refs.dataConfigPropertiesRef.form.runs
        } else if (type === 'svm') { // 支持向量机
          // if (this.$refs.dataConfigPropertiesRef.form.features === undefined || this.$refs.dataConfigPropertiesRef.form.features === '') {
          //   this.$message.error('选中的标签列不能为空')
          //   return false
          // }
        obj['type'] = type
        obj['normal'] = this.$refs.dataConfigPropertiesRef.form.normal
        obj['regParam'] = this.$refs.dataConfigPropertiesRef.form.regParam
        obj['stepSize'] = this.$refs.dataConfigPropertiesRef.form.stepSize
        obj['miniBatchFraction'] = this.$refs.dataConfigPropertiesRef.form.miniBatchFraction
        obj['features'] = this.$refs.dataConfigPropertiesRef.form.features
        obj['numIterations'] = this.$refs.dataConfigPropertiesRef.form.numIterations
      } else if (type === 'fpgrowth') { // fpgrowth
        obj['type'] = type
        obj['normal'] = this.$refs.dataConfigPropertiesRef.form.normal
        obj['miniConfidence'] = this.$refs.dataConfigPropertiesRef.form.miniConfidence
        obj['miniSupport'] = this.$refs.dataConfigPropertiesRef.form.miniSupport
      }
      var paramStr = {
          id: this.dataMining.ID,
          config: JSON.stringify(obj),
          createStep: '{"dataConfigTableData": ' + JSON.stringify(this.dataConfigTableData) + ', "propertiesFormData":' + JSON.stringify(this.$refs.dataConfigPropertiesRef.form) + ', "filterConfigTableData":' + JSON.stringify(this.filterCfgData) + ', "filterConfigTableDataObj": ' + JSON.stringify(this.filterCfgDataObj) + ', "dataConfigTableDataObj": ' + JSON.stringify(this.dataConfigTableDataObj) + '}'
        }
        paramStr = this.$qs.stringify(paramStr)
        // 保存节点到数据库
        this.$axios.post('/dm/updateModelConfig', paramStr).then((response) => {
          var dataRes = response.data
          if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (dataRes.status === '0') {
            // this.$message({
            //   message: dataRes.message,
            //   type: 'success'
            // })
            this.updateFlightFilter(param)
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中')
            this.$message.error(dataRes.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中')
        })
      } else { // 如果没有配置上面的，则直接走下面的
        this.updateFlightFilter(param)
      }
    },
    // 提交计算
    submitDataMining () {
      let type = this.$refs.dataConfigPropertiesRef.form.algorSelect
      if ((type === 'linear' || type === 'svm') && (this.$refs.dataConfigPropertiesRef.form.features === undefined || this.$refs.dataConfigPropertiesRef.form.features === '')) {
        this.$message.error('选中的标签列不能为空')
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在提交...')
      this.$axios.get('/dm/submitDataMining', {params: {id: this.dataMining.ID}}).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        if (response.data.status === '0') {
          this.$message.success('已成功添加，待运行成功后，可查看建模结果')
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    },
    // 查看相关性
    lookupKey () {
      this.$bus.$emit('dataMiningAddTab', {enName: 'analysis_results', zhName: '分析结果', isClosable: true, parent: 'dataMining_mining', count: 0, dataConfigTableData: this.dataConfigTableData, filterCfgData: this.filterCfgData, flightFilter: this.flightFilter})
    },
    managerTreeNodeHandleClick (data, node, nodeCommpent) { // 树节点点击事件
      if (!data.CHILDREN && !data.isAdd && !data.status) { // 如果不是目录,且节点不在编辑中，则点击节点时候获取分析子集数据
        ////console.log(JSON.stringify(data))
        this.csTreeNodeId = data.ID
      } else {
        this.csTreeNodeId = ''
      }
    }
  }
}
</script>
<style>
.el-date-picker {
  width: 290px;
}
.el-date-picker__header {
  margin: 6px;
}
.el-picker-panel__content {
  margin: 8px;
}
.el-date-picker .el-picker-panel__content {
  width: 265px;
}
.el-time-panel {
  left:unset;
  right: -6px;
}
</style>
<style scoped>
.hide {
  display: none !important;
}
.file-new-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-new-left {
  width: 20%;
  height: 100%;
  padding-top: 15px;
  /* border-right: 1px solid #DDDDDD; */
}
.df >>> .el-date-editor.el-input,
.df >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.file-new-left-tree >>> .el-tree__empty-text {
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

.file-new-left-tree {
  overflow: auto;
}
.file-new-middle {
  width: 80%;
  height: 100%;
}
.flex-new-top {
  border-bottom: 1px solid #DDDDDD;
}
.file-new-content {
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
  border-left: 1px solid #DDDDDD;
}
.file-new-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.file-new-content >>> .el-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
/* .file-new-content >>> .el-tabs__header.is-top {
  height: 50px;
} */
.file-new-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.file-new-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.filter-config-table {
  display: flex;
  flex: 1;
}
.filter-config-table >>> .el-table::before {
  height: 0;
}
.filter-config-pagination{
    padding: 24px 10px 24px 0;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.file-new-right{
  width: 30%;
  height: 100%;
  overflow: auto;
}
.file-new-bottom {
  width: 100%;
  height: 70px;
}

.file-new-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}
.row-icon-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.filter-config-table .row-icon-group{
  display: none;
}
.standardRadio {
  width: 240px;
}
.standardRadio > .el-select {
  display: block;
}
.test-value {
  padding: 15px 0 10px 0;
}
.attr-tip{
  font-size: 12px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 18px;
}
.search-key-str {
  font-size: 12px;
  color: #555555;
  letter-spacing: 0;
}
.filter-attr-input {
  width: 240px;
}
.filter-attr-input-small {
  width: 110px;
}
.filter-attr-input-line{
  font-size:12px;
  color:#DDDDDD;
  line-height:14px;
  width:16px;
  height:14px;
  margin: 0 1px;
  text-align:center;
}
.attr-edit {
  position: absolute;
  margin: 0;
  top: 35px;
  right: -30px;
}
.add-zhou-c {
  color: #437ACF;
}
.add-zhou-g {
  color: #DDDDDD;
}
.file-visual-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  max-height: 72%;
  flex: 1;
  overflow: hidden;
}
.file-visual-chart #visualChart {
  height: 100% !important;
}
.file-visual-chart span {
  position: relative;
  top: 10px;
  left: 10px;
  color: #555555;
}
.visual-axis-text {
  border: 1px solid #DDDDDD;
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
.visualConfig-axis {
  width: 100%;
  height: 130px;
}
.file-name {
  width: 50px;
}
.chart-name {
  width: 80px;
}
.alert-info {
  position: relative;
  top: -15px;
}
.alert-info >>> .el-alert--error {
  background-color: #FFFFFF;
}

.hot-words >>> .el-select{
  width: 100%;
}

/* 表格配置样式开始 */
.file-table-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  height: 185px;
}
.tableConfig-axis {
  width: 100%;
}
/*!* 窗口高度大于800px *!
@media screen and (min-height: 800px) {
  .file-table-chart {
    min-height: 100px;
    max-height: 419px;
  }
  .tableConfig-axis {
    height: 290px;
  }
}
!* 窗口高度小于800px *!
@media screen and (max-height: 800px) {
  .file-table-chart {
    min-height: 100px;
    max-height: 212px;
  }
  .tableConfig-axis {
    height: 200px;
  }
}*/
.table-config-empty {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.view-power >>> .el-tree {
  width: 100%;
}

.data-point1 {
  /* 要创建一个 flex 容器，只需要将一个 display: flex 属性添加到一个元素上。
     默认情况下，所有的直接子元素都被认为是 flex 项，并从左到右依次排列在一行中。
     如果 flex 项的宽度总和大于容器，那么 flex 项将按比例缩小，直到它们适应 flex 容器宽度 */
  display: flex;

  /* flex-direction 决定主轴的方向 row(默认)|row-reverse|column|column-reverse*/
  /* flex-direction: row; */

  /* flex-wrap决定当排列不下时是否换行以及换行的方式,nowrap(默认)|wrap|wrap-reverse */
  /* flex-wrap:wrap; */

  /* flex-flow是lex-direction和flex-wrap的简写形式，如：row wrap|column wrap-reverse等。默认值为row nowrap，即横向排列 不换行 */
  flex-flow: row wrap;

  /* !当主轴沿水平方向时!justify-content,决定item在主轴上的对齐方式，可能的值有flex-start（默认），flex-end，center，space-between，space-around */
  justify-content: start;
  /* !主轴水平时!决定了item在交叉轴上的对齐方式，可能的值有flex-start|flex-end|center|baseline|stretch */
  align-items: flex-start;
}
.data-point >>> .el-select {
  /*width: 80px;*/
  /*margin-right: 4px;*/
  margin-top: 6px;
}

.tree-content {
  position: relative;
  margin: 15px auto;
  border: 0px solid red;
  height: 280px;
  overflow: auto;
}

.file-table-chart >>> .el-table::before,
.tableConfig-axis >>> .el-table::before {
  height: 0;
}
</style>

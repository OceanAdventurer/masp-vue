<template>
  <div class="file-new-container df df-fd-r df-jc-fs df-f1">
    <div class="file-new-left">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="file-new-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="fileNewTreeRef"
          node-key="ID"
          :highlight-current="true"
          :data="fileNewTreeData"
          :props="defaultFileNewTreeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="fileNewNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="file-new-middle df df-fd-c">
      <div class="flex-new-top basic-tab df df-fd-r df-f1 w100">
        <div class="file-new-content">
          <div class="df df-fd-r df-jc-sb df-ai-c add-subline-info">
            <div>注：推荐用户建立不超过5条辅助线，数量过多将导致运行缓慢。</div>
            <div class="add-subline-text df df-jc-c df-ai-c" @click="chooseCurrentSubline('','add')">
              <i class="add-subline-icon"></i>
              <span>新增辅助线</span>
            </div>
          </div>
          <div v-for="sub in sublineParamData" :key="sub.id" v-show="sub.useStatus"
            :class="['subline-info', currentSubline === 'sub' + sub.id && currentSublineStatus ? 'sub-hei' : '']"
            :style="{ 'border': '2px solid ' + sub.colorValue }"
            >
            <div class="df df-jc-sb df-ai-c bor-bot">
              <div class="add-subline-text">{{sub.title}}</div>
              <div class="df">
                <div class="tab-icon-set icon-delete mr20" @click.stop="chooseCurrentSubline('sub' + sub.id, 'delete')"></div>
                <div :class="['tab-icon-set', currentSubline === 'sub' + sub.id && currentSublineStatus ? 'icon-pack-up1' : 'icon-pack-an1']"
                  @click.stop="chooseCurrentSubline('sub' + sub.id, 'select')"></div>
              </div>
            </div>
            <div class="">
              <el-table
                :row-style="{height:'38px'}"
                :cell-style="{padding:'0px'}"
                :header-row-style="{height:'38px'}"
                :header-cell-style="{padding:'0px'}"
                :data="filterConfigTableData"
                style="width: 100%;"
                height="240"
                highlight-current-row
                @row-click="filterConfigTableRowHandle"
                :header-row-class-name="headerRowClassName"
                :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="参数" width="400"></el-table-column>
                <el-table-column prop="filter" label="过滤条件" width="auto"></el-table-column>
                <el-table-column label="" width="50" align="center">
                  <template slot-scope="scope">
                    <div class="icon-delete tab-icon-set row-icon-group" @click.stop="filterRowDelete(scope.$index, filterConfigTableData)"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="file-new-right df df-fd-c">
          <el-tabs v-model="sublineActiveTab">
            <el-tab-pane label="属性" name="sublineAttr">
              <!-- 新建辅助线名称 -->
              <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === ''">
                <div class="subline-name mb10">辅助线名称</div>
                <div class="df-f1">
                  <el-input
                    placeholder="请输入辅助线名称"
                    v-model="sublineName"
                    size="small"
                    @blur="blurSublineName"
                    @change="changeSublineName">
                  </el-input>
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
                    <el-input placeholder="请输入内容" v-model="inputTypeNameValue" size="small" @change="changeInputTypeNameValue"></el-input>
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
                  <el-select v-model="standardSelectValue" placeholder="请选择过滤条件" @change="changeStandardSelectValue">
                    <el-option v-for="item in standardSelectData"
                      class="filter-attr-input"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input
                    v-model="standardMinValue"
                    v-show="parseInt(standardSelectValue) > 0 && parseInt(standardSelectValue) !== 9999"
                    @change="changeStandardMinValue"
                    @blur="blurStandardMinValue"
                    placeholder="请输入内容"
                    autofocus
                    class="filter-attr-input mt10">
                  </el-input>
                  <el-input
                    v-model="standardMaxValue"
                    v-show="parseInt(standardSelectValue) > 6 && parseInt(standardSelectValue) !== 9999"
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
                    <el-select
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
              <!-- 筛选配置属性中第五种类型 type = 5 -->
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
                  <el-select
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

              <!-- 筛选配置属性中第五种类型 type = 51 -->
              <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 51">
                <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                  <span class="df-f1">{{notHotWordsSearchName}}：</span>
                  <div class="df-f3 hot-words">
                    <el-select
                      v-model="notHotWordsSearchValue"
                      value-key="value"
                      placeholder="请选择"
                      multiple
                      collapse-tags
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

                <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                  <span>事件等级：</span>
                  <el-select
                    v-model="eventLevelValue"
                    value-key="value"
                    placeholder="请选择"
                    multiple
                    collapse-tags
                    @change="changEventLevelValue51">
                    <el-option
                      v-for="item in eventLevelData"
                      :key="item.value"
                      :label="item.label"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <!-- 筛选配置属性中第五种类型 type = 52 -->
              <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 52">
                <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                  <span class="df-f1">{{hotWordsSearchName}}：</span>
                  <div class="df-f3 hot-words">
                    <el-select
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
                  <el-select
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
                <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="3" class="mb10 mt10">按时间段查询</el-radio>
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
                  <el-select v-model="dataPointY" multiple collapse-tags @change="changeDataPointType" placeholder="年">
                    <el-option
                      v-for="item in dataPointYArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      size="mini">
                    </el-option>
                  </el-select>

                  <el-select v-model="dataPointM" multiple collapse-tags @change="changeDataPointType" placeholder="月">
                    <el-option
                      v-for="item in 12"
                      :key="item"
                      :label="item + '月'"
                      :value="item"
                      size="mini">
                    </el-option>
                  </el-select>

                  <el-select v-model="dataPointD" multiple collapse-tags @change="changeDataPointType" placeholder="日">
                    <el-option
                      v-for="item in 31"
                      :key="item"
                      :label="item + '日'"
                      :value="item"
                      size="mini">
                    </el-option>
                  </el-select>

                  <el-select v-model="dataPointH" multiple collapse-tags @change="changeDataPointType" placeholder="小时" v-show="currentFilterConfigRowAttrName !== 'FLIGHT_DATE'">
                    <el-option
                      v-for="item in 24"
                      :key="item"
                      :label="item - 1 + '点'"
                      :value="item - 1"
                      size="mini">
                    </el-option>
                  </el-select>

                  <el-select v-model="dataPointQ" multiple collapse-tags @change="changeDataPointType" placeholder="季度">
                    <el-option
                      v-for="item in dataPointQArr"
                      :key="item.value"
                      :label=item.label
                      :value="item.value"
                      size="mini">
                    </el-option>
                  </el-select>

                  <el-select v-model="dataPointW" multiple collapse-tags @change="changeDataPointType" placeholder="星期">
                    <el-option
                      v-for="item in dataPointWArr"
                      :key="item.value"
                      :label=item.label
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
                    <el-select
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
                    <el-select
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
                    <el-select
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
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="file-new-bottom">
        <el-button @click="submitSublineParams">提交</el-button>
        <el-button @click="submitSublineParams('save')">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  name: 'SublineParam', // 辅助线参数
  data () {
    return { // 以下是此组件的默认值
      fileNewTreeData: [], // 树数据
      defaultFileNewTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
      treeKeyword: '', // 关键字搜索树数据
      isShowAttr: true, // 默认true，显示筛选配置的属性，false则显示可视化配置的属性
      filterConfigTableData: [], // 筛选配置表格
      filterConfigTableDataObj: {}, // 临时存储选中的筛选配置表格数据，在最后提交时使用
      currentFilterConfigRowId: '', // 当前选中筛选配置表格中的某行编号
      currentFilterConfigRowName: '', // 当前选中筛选配置表格中的某行名字
      currentFilterConfigRowAttr: '', // 筛选配置属性的显示
      currentFilterConfigRowAttrName: '',

      inputTypeName: '文本框', // 筛选配置第二类文本框的名字
      inputTypeNameValue: '', // 筛选配置第二类文本框的值
      inputTypeNameValueFlag: '1', // 查询条件是否包含 筛选配置第二类文本框的值
      inputTypeNameQueryType: '1', // 筛选配置第二类文本框的查询类型
      attrOneRadio: '', // 筛选配置第三类属性radio值
      standardSelectValue: '', // 筛选配置第三类属性中下拉框选中的值
      standardSelectData: [ // 筛选配置第三类属性中下拉框数据
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '小于' },
        { value: '4', label: '小于等于' },
        { value: '5', label: '大于' },
        { value: '6', label: '大于等于' },
        { value: '9999', label: '非空' },
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
      logicalValue: '',
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
      dataPointW: [], // 时间点 - 星期
      notHotWordsSearchName: '', // 筛选配置第七类属性中文本值
      notHotWordsSearchValue: [], // 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchData: [], // 筛选配置第七类属性中下拉框数据集合
      hotWordsSearchName: '', // 筛选配置第八类属性中文本值
      hotWordsSearchValue: [], // 筛选配置第八类属性中下拉框选中值
      hotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第八类属性中下拉框选中值
      hotWordsSearchData: [], // 筛选配置第八类属性中下拉框数据
      hotWordsSearchListData: [], // 筛选配置第八类属性中下拉框数据集合
      hotWordsSearchLoading: false, //

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
            '9102': '9102',
            '9999': '9999'
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
      // 事件相关参数
      eventLevelData: [
        {value: '高', label: '高'},
        {value: '中', label: '中'},
        {value: '低', label: '低'}
      ],
      agsEventLevelData: [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'}

      ],
      agsEventLevelValue: ['1', '2', '3', '4'],
      // eventLevelValue: ['高', '中', '低'],
      eventLevelValue: [],

      changeFilterParamsFilp: '',
      isSubmit: true, // 是否允许提交
      alertTitle: '',
      currentSubline: 'sub1', // 当前选中的辅助线. 默认是第一条
      currentSublineStatus: false, // 当前选中的辅助线展开或者收起状态，默认收起
      sublineParamData: [
        {
          id: 1,
          title: '辅助线1',
          colorValue: '#DF5593',
          tableData: [],
          tableDataObj: {},
          useStatus: true,
          selectStatus: false
        }
        // , {
        //   id: 2,
        //   title: '辅助线2',
        //   colorValue: '#DEBC6D',
        //   tableData: [],
        //   tableDataObj: {},
        //   useStatus: true,
        //   selectStatus: false
        // }, {
        //   id: 3,
        //   title: '辅助线3',
        //   colorValue: '#3BBBD7',
        //   tableData: [],
        //   tableDataObj: {},
        //   useStatus: true,
        //   selectStatus: false
        // }, {
        //   id: 4,
        //   title: '辅助线4',
        //   colorValue: '#BEBEBE',
        //   tableData: [],
        //   tableDataObj: {},
        //   useStatus: true,
        //   selectStatus: false
        // }, {
        //   id: 5,
        //   title: '辅助线5',
        //   colorValue: '#7F3BD7',
        //   tableData: [],
        //   tableDataObj: {},
        //   useStatus: true,
        //   selectStatus: false
        // }
      ],
      addSublineArr: [], // 删除之后的数据放到这里，再次新增时顺序增加
      sublineActiveTab: 'sublineAttr', // 右侧激活的属性状态
      sublineName: '', // 辅助线的名称
      filterNames: []
    }
  },
  watch: {
    // treeKeyword (val) { // 树节点关键字
    //   this.$refs.fileNewTreeRef.filter(val)
    // }

    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },
    filterConfigTableData () {
      console.log('computed @@ filterConfigTableData: ' + this.filterConfigTableData)
      this.sublineParamData.map((item) => {
        if ('sub' + item.id === this.currentSubline) {
          item.tableData = this.filterConfigTableData
          // item.tableDataObj = this.filterConfigTableDataObj
        }
      })
    },

    filterConfigTableDataObj () {
      console.log('computed @@ filterConfigTableDataObj: ' + this.filterConfigTableDataObj)
      this.sublineParamData.map((item) => {
        if ('sub' + item.id === this.currentSubline) {
          // item.tableData = this.filterConfigTableData
          item.tableDataObj = this.filterConfigTableDataObj
        }
      })
    }
  },
  computed: {
    dataPointYArr () {
      let years = []
      let year = new Date().getFullYear()
      for (let i = 2017; i <= year; i++) {
        years.push({value: i, label: i + '年'})
      }
      return years
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getTree() // dom渲染完毕加载树数据
      this.initSublineParams() // 初始化参数
    })
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
    getTree () { // 获取左侧树状数据
      this.fileNewTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTree',
        method: 'get',
        params: {
          likeContent: this.treeKeyword,
          EVENT_PROFILE: this.$store.state.eventStoreData.ID
        }
      }).then(response => {
        console.log('gettree~~~:', response)
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
          let data = response.data.result
          if (this.$util.isNotEmptyObject(data)) {
            let tempTreeData = []
            for (let i in data) {
              for (let j = 0; j < data[i].length; j++) {
                tempTreeData.push(data[i][j])
              }
            }
            this.fileNewTreeData = tempTreeData
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
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
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
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
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.getTree()
      }
    },
    searchTreeData (flag) { // 关键字搜索树节点
      this.getTree()
    },
    filterFileNewNode (value, data) { // 树节点过滤
      if (!value) return true
      try {
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    fileNewNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      // 在筛选配置的tab中，点击左侧树节点时把数据显示到中间表格中，并存储
      if (data.TYPE === 'PROFILE') {
        return false
      }

      if (!data.CHILDREN) { //  || data.CHILDREN.length === 0
        if (!this.$util.isDefine(this.sublineName)) {
          this.$message({
            message: '请选择辅助线！',
            type: 'warning'
          })
          return false
        }

        if (this.filterConfigTableDataObj[data.ID]) {
          this.$message({
            message: '筛选配置中已经存在！',
            type: 'warning'
          })
          return false
        }

        const tempNodeObj = {
          // id: data.ID + '_' + new Date().getTime(),
          id: data.ID,
          name: data.NAME,
          type: data.TYPE,
          parentId: data.PARENTID ? data.PARENTID : '',
          columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
          columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
          dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
          resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
          resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
          filter: data.TYPE === '5' ? '已发生 ' : '',
          filterConditions: {}
        }
        if (data.COLUMNNAME &&
            (data.TYPE === '7' ||
            data.TYPE === '8' ||
            data.TYPE === '9' ||
            data.TYPE === '51' ||
            data.TYPE === '52')) { // 当type为7,8,9时需要从后端获取对应属性中下拉框的值
          this.getHotWordsSearchData(data.TYPE, data.COLUMNNAME)
          this.currentFilterConfigRowAttrName = data.COLUMNNAME
        }
        this.filterConfigTableData.push(tempNodeObj)
        this.filterConfigTableDataObj[tempNodeObj.id] = tempNodeObj
      }
    },
    getHotWordsSearchData (type, columnName) { // 获取热词搜索的数据且放到数据仓库中，防止同样参数重复调用接口
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj || {}// 获取临时放到数据仓库中热词搜索的数据
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
          console.log('getCheckboxData~~~:', response)
          if (response.data.status === '0') {
            let dataObj = response.data.result
            if (this.$util.isNotEmptyObject(dataObj)) {
              let dataArr = dataObj.data
              if (dataArr.length > 0) {
                dataArr = dataArr.filter((item) => {
                  return item.columnname
                })
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
    filterRowDelete (index, rows) { // 筛选配置中表格删除行
      console.log('filterRowDelete~~: ', index, rows)

      delete this.filterConfigTableDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)

      if (this.filterConfigTableData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentFilterConfigRowAttr = 1
        this.currentFilterConfigRowAttrName = ''
        this.filterConfigTableDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      }
    },
    filterConfigTableRowHandle (value, column, event) { // 1.设置筛选配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
      event.stopPropagation() // 阻止单击事件继续传播

      console.log('filterConfigTableRowHandle~~: ', value)

      this.alertTitle = '' // 清空错误提示信息
      this.logicalValue = ''
      this.hotWordsSearchValue = [] // 清空已经存在的热词搜索数据
      this.hotWordsSearchData = [] // 清空已经存在的热词搜索数据集合
      this.hotWordsSearchListData = [] // 清空上次筛选下的数据
      this.notHotWordsSearchValue = [] // 清空已经存在的非热词搜索数据
      this.notHotWordsSearchData = [] // 清空已经存在的非热词搜索数据集合
      this.isSubmit = true // 恢复提交按钮的状态
      this.currentFilterConfigRowAttr = parseInt(value.type) // 显示某个类型的属性
      this.currentFilterConfigRowAttrName = value.columnName
      this.currentFilterConfigRowId = value.id // 设置选中某行的编号
      this.currentFilterConfigRowName = value.name // 设置选中某行的名字
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj // 获取热词搜索中的数据
      if (this.$util.isNotEmptyObject(this.filterConfigTableDataObj[value.id])) {
        // 替换点击节点时存储到表格的默认数据
        let tempRowDataObj = this.filterConfigTableDataObj[value.id]
        let tempFilterStr = '' // 临时存储显示表格中的过滤参数值
        let tempTableObj = {}
        if (this.$util.isNotEmptyObject(tempRowDataObj.filterConditions)) { // 多次点击当前行
          tempTableObj = tempRowDataObj.filterConditions
        } else { // 第一次点击当前行
          let tempColumnName = value.columnName
          if (this.filterConfigTableDataObj[value.id]['type'] === '2' &&
            this.filterConfigTableDataObj[value.id]['columnType'] === 'NUMBER') { // 文本类型节点，且值类型是数值类型
            tempColumnName = 'cast(' + value.columnName + ' as varchar)'
          }
          tempTableObj = {
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
            resultColumnIndex: value.resultColumnIndex,
            resultTableIndex: value.resultTableIndex,
            columnName: tempColumnName,
            dataSourceNameValue: value.dataSourceName
          }
        }
        if (this.filterConfigTableDataObj[value.id]['type'] === '5') { // 事件类型
          // tempFilterStr = '事件'
          // if (this.$util.isNotEmptyObject(tempTableObj)) {
          //   if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
          //     tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
          //   }
          // }
          tempTableObj.operatordId = '5'
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '2') { // 文本类型
          this.inputTypeName = value.name
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '7' ||
                   this.filterConfigTableDataObj[value.id]['type'] === '51') { // 不是热词搜索类型
          // this.notHotWordsSearchName = value.name
          // this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          this.notHotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }

          if (this.filterConfigTableDataObj[value.id]['type'] === '51') {
            this.getEventLevelData(value.columnName)
          }
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '8' ||
                   this.filterConfigTableDataObj[value.id]['type'] === '9' ||
                   this.filterConfigTableDataObj[value.id]['type'] === '52') { // 热词搜索类型
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
          console.log(JSON.stringify(value))
          let tempObj = value.filterConditions

          if (value.type === '51') {
            // if (this.$util.isNotEmptyObject(tempObj.paramValueOne)) {
            //   this.notHotWordsSearchValue = tempObj.paramValueOne
            // }
            if (this.$util.isDefine(tempObj.filterName)) {
              let tempFilterName = tempObj.filterName.substr(6, tempObj.filterName.indexOf('; 已选事件等级: ') - 6)
              let plist = tempFilterName.split(',')
              let slist = tempObj.selectValueOne.split(',')
              let tlist = []
              if (tempFilterName.length > 1 && plist.length > 0) {
                plist.forEach((item, i) => {
                  tlist.push({
                    columnname: item,
                    value: slist[i]
                  })
                })
                this.notHotWordsSearchValue = tlist
              }

              let tempLevName = tempObj.filterName.substr(tempObj.filterName.indexOf('; 已选事件等级: ') + 10)
              let alist = tempLevName.split(',')
              let blist = tempObj.selectValueTwo.split(',')
              let clist = []

              if (tempLevName.length > 1 && alist.length > 0) {
                alist.forEach((item, i) => {
                  clist.push({
                    label: item,
                    value: blist[i]
                  })
                })
                this.eventLevelValue = clist
              }
            }

            // if (this.$util.isDefine(tempObj.selectValueTwo)) {
            //   if (this.eventLevelValue !== tempObj.selectValueTwo.split(',')) {
            //     this.eventLevelValue = tempObj.selectValueTwo.split(',')
            //   }
            // }
          } else if (value.type === '52') {
            if (this.$util.isDefine(tempObj.selectValueOne)) {
              this.hotWordsSearchValue = tempObj.selectValueOne.split(',')
            }
            if (this.$util.isDefine(tempObj.selectValueTwo)) {
              this.agsEventLevelValue = tempObj.selectValueTwo.split(',')
            }
          }

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
    resetDefaultData () { // 重置默认数据
      this.resetAttrOneDefaultData(true, true) // 筛选配置第三类属性
      this.resetAttrSixDefaultData(true) // 筛选配置第六类
      this.resetAttrTwoDefaultData(true) // 筛选配置第二类
      this.HotWordsSearchValueFlag = '1'
      this.notHotWordsSearchValueFlag = '1'
    },
    resetAttrTwoDefaultData (flag) { // 重置筛选配置第二类属性的值
      if (flag) {
        this.inputTypeNameValue = ''
        this.inputTypeNameQueryType = '1'
        this.inputTypeNameValueFlag = '1'

        this.eventHappenValueFlag = '1'
        // this.eventLevelValue = ['高', '中', '低']
        this.eventLevelValue = []
        this.agsEventLevelValue = ['1', '2', '3', '4']
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
      this.filterConfigTableData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.filterConfigTableDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      this.filterConfigTableData = tempTableData // 临时数组重新复制给表格数据
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
      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValue = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameQueryType = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValueFlag = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrOneRadio (value) { // 筛选配置→属性三
      let expressionId = this.expressionData['attrOneRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrOneRadio = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    changeStandardSelectValue (value) { // 筛选配置→属性三→标准→下拉框
      let expressionId = this.expressionData['attrOneRadio'][this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag']][value]
      this.resetAttrOneDefaultData(false, false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      // this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
      if (value === '9999') {
        this.isSubmit = true
        this.alertTitle = ''

        let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
        let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
        let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
        let tempCName = ''
        if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
          tempCName = columnName
        } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
          tempCName = columnName
        } else {
          tempCName = 'g' + columnIndex
        }

        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempCName
        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = `length(${tempCName}) > 0`
        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = '非空'
        this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '非空', true)
      } else {
        this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
      }
    },
    blurStandardMinValue (event) { // 筛选配置→属性三→标准→文本框最小值→失去焦点
      if (parseFloat(this.standardMinValue).toString() === 'NaN') {
        this.alertTitle = '参数1不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
    },
    changeStandardMinValue (value) { // 筛选配置→属性三→标准→文本框最小值
      const minStrArr = ['等于', '不等于', '小于', '小于等于', '大于', '大于等于']
      const minSymbolArr = ['=', '!=', '<', '<=', '>', '>=']
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMaxValue (event) { // 筛选配置→属性三→标准→文本框最大值→失去焦点
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
        //
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
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
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

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeLogicalValue (value) { // 筛选配置→属性四
      console.log('changeLogicalValue@@@@~: ' + value)
      let tempStr = ''
      let tempSqlStr = ''
      if (value === 1 || value === '1') {
        tempSqlStr = '= 1'
        tempStr = '是'
      } else {
        tempSqlStr = '= 0'
        tempStr = '否'
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrFourRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },

    changEventLevelValue51 (value) { // type === 51  事件
      // if (value.length === 0) {
      //   value = ['高', '中', '低']
      // }

      let tempStr = ''

      let _names = []
      let _vals = []
      this.notHotWordsSearchValue.forEach((item, index) => {
        _names.push(item.columnname.trim())
        _vals.push(item.value)
      })

      let levelName = value.map((item) => {
        return item.label
      })
      let levelValue = value.map((item) => {
        return item.value
      })

      tempStr = `已选事件: ${_names.join(',')}; 已选事件等级: ${levelName.join(',')}`

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = levelValue.join(',')
      // this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = JSON.stringify(this.notHotWordsSearchValue)

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      let levelName = evLevel.map((item) => {
        return item.label
      })
      let levelValue = evLevel.map((item) => {
        return item.value
      })

      // if (this.eventLevelValue.length === 0) {
      //   evLevel = ['高', '中', '低']
      // }

      tempStr = `已选事件: ${_names.join(',')}; 已选事件等级: ${levelName.join(',')}`

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = levelValue.join(',')
      // this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = JSON.stringify(value)

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changAgsEventLevelValue (value) {
      let tempStr = value.join(',')

      if (value.length === 0) {
        tempStr = `${['1', '2', '3', '4'].join(',')}`
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = this.hotWordsSearchValue.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = this.agsEventLevelValue.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventLevelValue (value) {
      let tempStr = value.join(',')
      let tempSqlStr = ''

      if (this.eventHappenValueFlag === '1') {
        tempStr = `已发生[${tempStr}]`
        tempSqlStr = value.join(',')

        // if (value.length === 0) {
        //   tempSqlStr = ['高', '中', '低'].join(',')
        //   tempStr = `已发生[${['高', '中', '低'].join(',')}]`
        // }
      } else {
        tempStr = '未发生'
        tempSqlStr = '0'
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventHappenValueFlag (value) { // 筛选配置→属性五
      let tempStr = ''
      let tempSqlStr = ''

      if (value === '1') {
        // this.eventLevelValue = ['高', '中', '低']
        tempStr = `已发生[${this.eventLevelValue.join(',')}]`
        tempSqlStr = this.eventLevelValue.join(',')
      } else {
        tempStr = '未发生'
        tempSqlStr = '0'
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },

    changeAttrSixRadio (value) { // 筛选配置→属性六
      let expressionId = this.expressionData['attrSixRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrSixRadio = value
      this.resetAttrSixDefaultData(false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurAccordDayStartDate (event) {
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') : this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurAccordDayEndDate (event) {
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
    changeAccordDayEndDate (value) { // 筛选配置→属性六→按天→结束日期
      let tempStr = ''
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayEndDate).format('YYYY-MM-DD') : this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      console.log(JSON.stringify(dataPoinObj), ' ', tempStr.join('； '))

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr.join('； ')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tt.substring(1, tt.length - 1)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr.join('； ')
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr.join('； '), true)
    },
    changeNotHotWordsSearchValue (value) { // 筛选配置→属性七→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.notHotWordsSearchValueFlag === '1' ? '' : 'not '
      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.notHotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValue (value) { // 筛选配置→属性八→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.hotWordsSearchValueFlag === '1' ? '' : 'not '
      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.hotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    chooseCurrentSubline (name, type) { // 辅助线执行新增删除等操作
      console.log(name, type, this.currentSubline)
      if (name !== this.currentSubline) { // 重新馨辅助线的展开或者收起状态
        this.currentSublineStatus = false
      }

      if (type === 'select') {
        this.currentSublineStatus = !this.currentSublineStatus
        this.currentSubline = name
        this.currentFilterConfigRowAttr = '' // 默认显示辅助线名称
        this.resetDefaultData() // 重置属性中默认值
        this.sublineParamData.map((item) => {
          if ('sub' + item.id === name) {
            this.filterConfigTableData = item.tableData
            this.filterConfigTableDataObj = item.tableDataObj
            this.sublineName = item.title
            item.selectStatus = true
          }
        })
      }
      if (type === 'status') { // 辅助线内容展开或者收起状态
        this.currentSublineStatus = !this.currentSublineStatus
      }
      if (type === 'delete') { // 删除辅助线
        if (this.addSublineArr.length === this.sublineParamData.length - 1) {
          this.$message({
            message: '至少有1条辅助线！',
            type: 'warning'
          })
          return false
        }
        this.sublineParamData.map((item) => { // 修改辅助线的状态
          if ('sub' + item.id === name) {
            item.useStatus = false
            item.selectStatus = false
            item.tableData = []
            item.tableDataObj = []
            this.addSublineArr.push(item.id)
          }
        })
        this.addSublineArr = this.$util.distinctArray(this.addSublineArr) // 去重
        this.addSublineArr.sort((a, b) => { // 排序
          if (a > b) {
            return 1
          } else if (a < b) {
            return -1
          } else {
            return 0
          }
        })
      }
      if (type === 'add') { // 添加辅助线
        if (this.sublineParamData.length - this.addSublineArr.length > 4) {
          this.$message({
            message: '建议添加最多5条辅助线！',
            type: 'warning'
          })
        }
        if (this.addSublineArr.length === 0) {
          this.sublineParamData.push({
            id: parseInt(this.sublineParamData.length + 1),
            title: '辅助线' + parseInt(this.sublineParamData.length + 1),
            // colorValue: '#' + (Math.random() * 0xffffff << 0).toString(16),
            colorValue: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6),
            tableData: [],
            tableDataObj: {},
            useStatus: true,
            selectStatus: false
          })
          // return false
        }
        name = this.addSublineArr[0] // 添加数组中第一个
        this.sublineParamData.map((item) => {
          if (item.id === name) {
            item.useStatus = true
            item.selectStatus = false
            this.addSublineArr.splice(0, 1)
          }
        })
      }
    },
    changeSublineName (value) { // 筛选配置→属性→新建分析名称
      this.sublineName = value
      this.sublineParamData.map((item) => {
        if ('sub' + item.id === this.currentSubline) {
          item.title = this.sublineName
        }
      })
    },
    blurSublineName (event) { // 新建分析名字失去焦点后校验
      let reg = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$')
      if (!reg.test(this.sublineName)) {
        this.alertTitle = '辅助线的名字只含有汉字、数字、字母！'
        this.isSubmit = false
        return false
      } else {
        this.alertTitle = ''
        this.isSubmit = true
      }
    },
    initSublineParams () { // 初始化分析参数
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))

      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let tempFilterList = submitAnalysisParams.filterList
        let tempSublineNameColor = submitAnalysisParams.sublineNameColor
        if (this.$util.isDefine(tempFilterList) && this.$util.isDefine(tempSublineNameColor) && tempFilterList.length > 0 && tempSublineNameColor.length > 0) {
          tempFilterList.shift()
          tempSublineNameColor.shift()

          tempFilterList.forEach((item, index) => {
            if (index > 0) {
              this.chooseCurrentSubline('', 'add')
            }
          })

          let tempSublineDataObj = {}
          tempSublineNameColor.map((item, index) => {
            let tempFilterArr = tempFilterList[index]
            let tempTableData = []
            let tempTableObj = {}
            if (tempFilterArr.length > 0) {
              let tempTableDataArr = []
              let tempTableDataObj = {}
              tempFilterArr.map((f) => {
                let tempObj = this.setConfigAttrValue(f)
                tempTableDataArr.push(tempObj)
                tempTableDataObj[tempObj.id] = tempObj
              })
              tempTableData = tempTableDataArr
              tempTableObj = tempTableDataObj
            }
            this.sublineParamData[index]['colorValue'] = item.sublineColor
            tempSublineDataObj[item.sublineColor] = {title: item.sublineName, colorValue: item.sublineColor, tableData: tempTableData, tableDataObj: tempTableObj, selectStatus: true}
          })
          this.sublineParamData.map((s) => {
            if (tempSublineDataObj[s.colorValue]) {
              s.title = tempSublineDataObj[s.colorValue]['title']
              s.colorValue = tempSublineDataObj[s.colorValue]['colorValue']
              s.tableData = tempSublineDataObj[s.colorValue]['tableData']
              s.tableDataObj = tempSublineDataObj[s.colorValue]['tableDataObj']
              s.selectStatus = tempSublineDataObj[s.colorValue]['selectStatus']
            }
          })
        }
      }
    },
    getEventLevelData (params) {
      const that = this
      let tempEventLevelValue = []

      this.eventLevelData = []

      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')

      if (params.length > 32) {
        params = params.substring(params.length - 32)
      }
      this.$axios({
        url: '/apm/getProfileEventLevel',
        method: 'get',
        params: {
          id: params
        }
      }).then(response => {
        console.log('getEventLevelData~~~:', response)
        let resData = response.data

        if (resData.length > 0) {
          resData.forEach((item, index) => {
            that.eventLevelData.push({
              value: item.EVENT_LEVEL,
              label: item.EVENT_CAPTION
            })

            tempEventLevelValue.push(item.EVENT_LEVEL)
          })

          if (that.eventLevelValue.length < 1) {
            that.eventLevelValue = tempEventLevelValue
          }
        }

        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    setConfigAttrValue (obj) { // 设置配置的属性值
      let operatordId = obj.operatordId
      let filterStr = ''
      this.currentFilterConfigRowId = obj.paramId
      if (operatordId === '1' || operatordId === '2' || operatordId === '3' || operatordId === '6') {
        filterStr = this.standardSelectArray[parseInt(operatordId) - 1] + obj.paramValueOne
        this.setAttrOneRadio(obj)
      } else if (operatordId === '5') {
        filterStr = obj.filterName
        if (filterStr === '已发生') {
          this.eventHappenValueFlag = '1'
        } else {
          this.eventHappenValueFlag = '0'
        }
      } else if (operatordId === '51') {
        filterStr = obj.filterName
      } else if (operatordId === '52') {
        filterStr = obj.filterName
      } else if (operatordId === '4') {
        filterStr = obj.filterName
        // filterStr = obj.selectValueOne
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
      } else if (operatordId === '9999') {
        filterStr = '非空'
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
        filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD HH:mm:ss')
        if (obj.columnName === 'FLIGHT_DATE') {
          filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD')
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
    submitSublineParams (type) { // 组装提交新建需要的参数
      let filterParamsObj = {}
      let filterArr = []
      let notNullArr = []
      let tableIndexArr = []
      let dataSourceNameArr = []
      let sublineCount = 0 // 辅助线的数量
      let sublineParamCount = 0 // 辅助线参数的数量
      let sublineNameColorArr = [] // 辅助线的名字和颜色
      this.sublineParamData.map((subItem) => {
        if (subItem.selectStatus) {
          if (subItem.tableData.length > 0) {
            let tempFilterArr = []
            sublineNameColorArr.push({sublineName: subItem.title, sublineColor: subItem.colorValue})

            subItem.tableData.map((item) => { // 处理提交参数
              // item.type !== '4' &&
              if (this.$util.isNotEmptyObject(item.filterConditions)) {
                tempFilterArr.push(item.filterConditions)

                if (this.$util.isDefine(item.dataSourceName)) {
                  dataSourceNameArr.push(item.dataSourceName)
                }

                if (this.$util.isDefine(item.resultColumnIndex) && this.$util.isDefine(item.resultTableIndex)) { // 分析参数
                  notNullArr.push('g' + item.resultColumnIndex)
                  tableIndexArr.push(item.resultTableIndex)
                }

                if (this.$util.isDefine(item.columnName)) {
                  // 如果节点的dataSourceName的值不为'hive_vw_snapshot_flight_info_parquet'，notNull的参数就是dataSourceName.columnName
                  if (item.dataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(item.dataSourceName)) {
                    notNullArr.push(item.dataSourceName + '.' + item.columnName)
                  } else {
                    notNullArr.push(item.columnName)
                  }
                }

                if (!this.$util.isDefine(item.filter)) {
                  this.isSubmit = false // 只要参数条件有一个为空，则不能提交
                  this.filterNames.push(item.name)
                }
              } else {
                if (!this.$util.isDefine(item.filter) || !this.$util.isNotEmptyObject(item.filterConditions)) {
                  this.isSubmit = false // 只要参数条件有一个为空，则不能提交
                  this.filterNames.push(item.name)
                }
              }
            })
            filterArr.push(tempFilterArr)
          } else {
            sublineParamCount++
          }
        } else {
          sublineCount++
        }
      })
      notNullArr = notNullArr.join(',')
      tableIndexArr = tableIndexArr.join(',')
      dataSourceNameArr = this.$util.distinctArray(dataSourceNameArr).join(',')
      filterParamsObj = {filterArr: filterArr, notNullArr: notNullArr, tableIndexArr: tableIndexArr, dataSourceNameArr: dataSourceNameArr, sublineNameColor: sublineNameColorArr}
      console.log('sublineParam@submitSublineParams:', JSON.stringify(filterParamsObj))
      if (sublineCount === (this.sublineParamData.length)) {
        this.$message({
          message: '至少添加一条辅助线！',
          type: 'warning'
        })
        return false
      }

      if (sublineParamCount > 0) {
        this.$message({
          message: '请选择筛选条件！',
          type: 'warning'
        })
        return false
      }

      if (this.isSubmit) {
        if (type === 'save') {
          this.resaveAnalysisParams(filterParamsObj)
        } else {
          this.resubmitAnalysisParams(filterParamsObj)
        }
      } else {
        if (this.filterNames.length > 0) {
          this.$message({
            message: '筛选条件[ ' + this.filterNames[0] + ' ]输入有误！',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '筛选条件输入有误！',
            type: 'warning'
          })
        }
        this.filterNames = []
        return false
      }
    },
    resaveAnalysisParams (paramsObj) {
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
      let mainSubline = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams)).filter
      if (this.$util.isDefine(mainSubline)) {
        this.$store.commit('MAIN_SUBLINE', mainSubline)
      } else {
        mainSubline = JSON.parse(JSON.stringify(this.$store.state.mainSubline))
      }

      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let newFilterArr = paramsObj.filterArr // 配置参数
        let tempSublineNameColorArr = paramsObj.sublineNameColor // 辅助线的颜色和名字
        let tempNotNullStr = paramsObj.notNullArr
        let tempTableIndexStr = paramsObj.tableIndexArr
        let dataSourceNameStr = paramsObj.dataSourceNameArr
        if (tempSublineNameColorArr.length > 0) {
          submitAnalysisParams.sublineNameColor = tempSublineNameColorArr
        } else {
          submitAnalysisParams.sublineNameColor = []
        }

        if (newFilterArr.length > 0) {
          submitAnalysisParams.filterList = newFilterArr
        } else {
          submitAnalysisParams.filterList = []
        }

        if (this.$util.isDefine(tempNotNullStr)) {
          let tempStr = tempNotNullStr + ',' + submitAnalysisParams.notNull
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.notNull = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.notNull = submitAnalysisParams.notNull
        }

        if (this.$util.isDefine(tempTableIndexStr)) {
          let tempStr = tempTableIndexStr + ',' + submitAnalysisParams.tableIndex
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.tableIndex = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.tableIndex = submitAnalysisParams.tableIndex
        }

        if (this.$util.isDefine(dataSourceNameStr)) {
          let tempStr = dataSourceNameStr + ',' + submitAnalysisParams.dataSourceName
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.dataSourceName = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.dataSourceName = submitAnalysisParams.dataSourceName
        }

        submitAnalysisParams.isGuide = '1' // 1表示添加辅助线

        submitAnalysisParams.filterList.unshift(mainSubline)
        submitAnalysisParams.sublineNameColor.unshift({sublineColor: '#3A6BB9', sublineName: '主数据线'})

        // submitAnalysisParams.filter = [] // 清空单个筛选配置参数
        submitAnalysisParams.dhbParamObj = {}

        this.$store.commit('SHOW_LOADING', '拼命加载中')
        this.$axios({
          url: '/analysisRecord/addAnalysisRecord',
          method: 'post',
          data: {
            name: submitAnalysisParams.fileNewName ? submitAnalysisParams.fileNewName : this.$store.state.analysisParams.NAME,
            analysisRecordCategoryId: this.$util.isDefine(this.$store.state.tempManagerTreeNodeId) ? this.$store.state.tempManagerTreeNodeId : this.$store.state.managerTreeNodeId,
            content: submitAnalysisParams,
            event_profile: this.$store.state.eventStoreData,
            id: this.$store.state.analysisParamsId
          },
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }).then(response => {
          console.log('AddAnalysisRecord~~~:', response)
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          if (response.data.status === '0') {
            this.$message({
              type: 'success',
              message: '数据保存成功!'
            })
            this.$bus.$emit('reloadGetAnalysisRecord') // 重新查询分析管理页面分析子集数据，更新表格数据
          } else if (response.data.status === 'E1001') { // 没有登录
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    resubmitAnalysisParams (paramsObj) { // 重新提交分析参数
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      let mainSubline = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams)).filter
      if (this.$util.isDefine(mainSubline)) {
        this.$store.commit('MAIN_SUBLINE', mainSubline)
      } else {
        mainSubline = JSON.parse(JSON.stringify(this.$store.state.mainSubline))
      }

      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let newFilterArr = paramsObj.filterArr // 配置参数
        let tempSublineNameColorArr = paramsObj.sublineNameColor // 辅助线的颜色和名字
        let tempNotNullStr = paramsObj.notNullArr
        let tempTableIndexStr = paramsObj.tableIndexArr
        let dataSourceNameStr = paramsObj.dataSourceNameArr
        if (tempSublineNameColorArr.length > 0) {
          submitAnalysisParams.sublineNameColor = tempSublineNameColorArr
        } else {
          submitAnalysisParams.sublineNameColor = []
        }

        if (newFilterArr.length > 0) {
          submitAnalysisParams.filterList = newFilterArr
        } else {
          submitAnalysisParams.filterList = []
        }

        if (this.$util.isDefine(tempNotNullStr)) {
          let tempStr = tempNotNullStr + ',' + submitAnalysisParams.notNull
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.notNull = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.notNull = submitAnalysisParams.notNull
        }

        if (this.$util.isDefine(tempTableIndexStr)) {
          let tempStr = tempTableIndexStr + ',' + submitAnalysisParams.tableIndex
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.tableIndex = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.tableIndex = submitAnalysisParams.tableIndex
        }

        if (this.$util.isDefine(dataSourceNameStr)) {
          let tempStr = dataSourceNameStr + ',' + submitAnalysisParams.dataSourceName
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.dataSourceName = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.dataSourceName = submitAnalysisParams.dataSourceName
        }

        submitAnalysisParams.isGuide = '1' // 1表示添加辅助线

        submitAnalysisParams.filterList.unshift(mainSubline)
        submitAnalysisParams.sublineNameColor.unshift({sublineColor: '#3A6BB9', sublineName: '主数据线'})

        // submitAnalysisParams.filter = [] // 清空单个筛选配置参数
        submitAnalysisParams.dhbParamObj = {}

        this.dialogSublineVisible = false

        this.$store.commit('SUBMIT_NEWFILE_TAB_ACTIVE', 'analysis_chart')
        this.$bus.$emit('submitNewFileDataHandle', submitAnalysisParams, 'addSublineComponent') // 调用提交新建方法，此方法在Manager.vue中, 第三个参数表示从哪个功能提交的
      }
    }
  }
}
</script>
<style scoped>
.file-new-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.file-new-left {
  position: relative;
  width: 20%;
  height: 100%;
  border-right: 1px solid #DDDDDD;
}
.tree-head-icon {
  margin: 5px 10px 10px;
}
.df >>> .el-date-editor.el-input,
.df >>> .el-date-editor.el-input__inner {
  width: 100%;
}

.file-new-left-tree {
  overflow: auto;
  height: 90%;
}
.file-new-middle {
  position: relative;
  width: 80%;
  height: 100%;
}
.flex-new-top {
  border-bottom: 1px solid #DDDDDD;
}
.file-new-content {
  position: relative;
  border-right: 1px solid #DDDDDD;
  width: 70%;
  overflow: auto;
}
.file-new-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
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
.filter-config-pagination{
  padding: 24px 10px 24px 0;
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.file-new-right{
  position: relative;
  width: 30%;
  height: 100%;
  overflow: auto;
}
.file-new-bottom {
  position: relative;
  width: 100%;
  height: 70px;
}

.file-new-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  color: #FFFFFF;
  background: #437ACF;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}
.row-icon-group{
  display: none;
}
.standardRadio {
  width: 240px;
}
.standardRadio > .el-select {
  display: block;
}
.file-name {
  width: 50px;
}

.add-subline-info {
  height: 50px;
  padding: 0 20px;
}
.add-subline-info:first-child {
  color: #999999;
  font-size: 12px;
}
.add-subline-text {
  color: #2A436F;
  font-size: 12px;
  cursor: pointer;
}
.add-subline-icon {
  position: relative;
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #2A436F;
  margin-right: 10px;
}
.add-subline-icon::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 5px;
  left: 3px;
  width: 10px;
  height: 2px;
  background-color: #2A436F;
}
.add-subline-icon::after {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 5px;
  left: 3px;
  width: 10px;
  height: 2px;
  background-color: #2A436F;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.subline-info {
  height: 50px;
  margin-bottom: 20px;
  overflow: hidden;
  -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
  transition: all .3s cubic-bezier(.645,.045,.355,1);
}
.bor1 {
  border: 2px solid #DF5593;
}
.bor2 {
  border: 2px solid #DEBC6D ;
}
.bor3 {
  border: 2px solid #3BBBD7 ;
}
.bor4 {
  border: 2px solid #BEBEBE;
}
.bor5 {
  border: 2px solid #7F3BD7;
}
.bor-box {
  box-shadow: #ddd 0px 0px 5px 2px;
}
.sub-hei {
  height: 300px;
}
.bor-bot {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #DDDDDD;
  padding: 0 20px;
}
.data-point >>> .el-select {
  /*width: 80px;*/
  /*margin-right: 4px;*/
  margin-top: 6px;
}
</style>

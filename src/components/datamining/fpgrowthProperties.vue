<template>
<div style="width: 100%;">
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
</template>

<script>
export default {
  name: 'fpgrowthProperties',
  data () {
    return {
      agsEventLevelValue: ['1', '2', '3', '4'],
      eventLevelValue: ['高', '中', '低'],
      isSubmit: false,
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
      nodeData: []
    }
  },
  props: ['data', 'dataConfigTableDataObj', 'dataConfigTableData'],
  watch: {
    data () {
      this.filterConfigTableRowHandle(this.data)
    }
  },
  mounted () {
    this.dataPointYArr()
  },
  destroyed () {
  },
  methods: {
    filterConfigTableRowHandle (value) { // 1.设置筛选配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
      console.log('filterConfigTableRowHandle:', value)

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
        if (this.dataConfigTableDataObj[value.id]['type'] === '5') { // 事件类型
          // tempFilterStr = '事件'
          // if (this.$util.isNotEmptyObject(tempTableObj)) {
          //   if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
          //     tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
          //   }
          // }

          // tempTableObj.selectValueOne = tempFilterStr
          tempTableObj.operatordId = '5'
          // tempTableObj['filterName'] = tempFilterStr
        } else if (this.dataConfigTableDataObj[value.id]['type'] === '2') { // 文本类型
          this.inputTypeName = value.name
        } else if (this.dataConfigTableDataObj[value.id]['type'] === '7' ||
          this.dataConfigTableDataObj[value.id]['type'] === '51') { // 不是热词搜索类型
          this.notHotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }
        } else if (this.dataConfigTableDataObj[value.id]['type'] === '8' ||
          this.dataConfigTableDataObj[value.id]['type'] === '9' ||
          this.dataConfigTableDataObj[value.id]['type'] === '52') { // 热词搜索类型
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
    },
    blurAccordDayStartDate (event) { // 开始日期失去焦点校验
      console.log('blurAccordDayStartDate', event)
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') : this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrSixRadio (value) { // 筛选配置→属性六
      let expressionId = this.expressionData['attrSixRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrSixRadio = value
      this.resetAttrSixDefaultData(false)
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = this.hotWordsSearchValue.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrFourRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    resetDefaultData () { // 重置默认数据
      this.resetAttrOneDefaultData(true, true) // 筛选配置第三类属性
      this.resetAttrSixDefaultData(true) // 筛选配置第六类
      this.resetAttrTwoDefaultData(true) // 筛选配置第二类
      this.HotWordsSearchValueFlag = '1'
      this.notHotWordsSearchValueFlag = '1'
      this.eventHappenValueFlag = '1'
      this.eventLevelValue = ['高', '中', '低']
    },
    changeStandardMinValue (value) { // 筛选配置→属性三→标准→文本框最小值
      const minStrArr = ['等于', '不等于', '小于', '小于等于', '大于', '大于等于']
      const minSymbolArr = ['=', '!=', '<', '<=', '>', '>=']
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$util.dealInputNumValue(value)
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMinValue (event) { // 筛选配置→属性三→标准→文本框最小值→失去焦点
      console.log('blurStandardMinValue', event)
      if (parseFloat(this.standardMinValue).toString() === 'NaN') {
        this.alertTitle = '参数1不是有效数值'
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
    changeStandardMaxValue (value) { // 筛选配置→属性三→标准→文本框最大值
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$util.dealInputNumValue(value)
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMaxValue (event) { // 筛选配置→属性三→标准→文本框最大值→失去焦点
      console.log('blurStandardMinValue', event)
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
    changeStandardSelectValue (value) { // 筛选配置→属性三→标准→下拉框
      let expressionId = this.expressionData['attrOneRadio'][this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag']][value]
      this.resetAttrOneDefaultData(false, false)
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    changeAttrOneRadio (value) { // 筛选配置→属性三
      let expressionId = this.expressionData['attrOneRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrOneRadio = value
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    resetFilterTableConditionsData (rowId, obj, filterStr, flag) { // 重置筛选配置表格中的数据
      let tempTableData = []
      this.dataConfigTableData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.dataConfigTableDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      // TODO this.dataConfigTableData = tempTableData // 临时数组重新复制给表格数据
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
          console.log('getCheckboxData~~~', response)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    hotWordsSearchMethod (query) { // 筛选配置中根据关键字获取热词搜索的数据
      console.log('hotWordsSearchMethod~~~~~~~~', query)
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
    dataViewPowerClick (value) {
      console.log(value)
    },
    blurAccordDayEndDate (event) { // 结束日期失去焦点校验
      console.log('blurAccordDayEndDate', event)
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      let columnName = this.dataConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayEndDate).format('YYYY-MM-DD') : this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      console.log(tt.substring(1, tt.length - 1))

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr.join('； ')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = ''
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tt.substring(1, tt.length - 1)
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr.join('； ')
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr.join('； '), true)
    },
    changEventLevelValue (value) {
      let tempStr = value.join(',')
      let tempSqlStr = ''

      if (this.eventHappenValueFlag === '1') {
        tempStr = `已发生[${tempStr}]`
        tempSqlStr = value.join(',')

        if (value.length === 0) {
          tempSqlStr = ['高', '中', '低'].join(',')
          tempStr = `已发生[${['高', '中', '低'].join(',')}]`
        }
      } else {
        tempStr = '未发生'
        tempSqlStr = '0'
      }

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = evLevel.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
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

      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = value.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.dataConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    }
  }
}
</script>

<style scoped>

</style>

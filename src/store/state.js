const state = {
  showLoading: false, // 加载框状态，默认值：true,显示
  loadingText: '拼命加载中', // loading提示语
  userInfo: '', // 用户信息
  userMenuList: {}, // 用户菜单列表
  analysisParams: {}, // 分析管理中分析子集配置参数
  analysisParamsId: '', // 保存分析参数生产的编号
  copyAnalysisParamsId: '',
  eventStoreData: {}, // 所属事件库对象
  managerTreeNodeId: '', // 分析管理树节点的编号
  hotWordsSearchObj: {}, // 热词搜索下拉框数据集合
  isDisabledMenu: {}, // 是否禁用二级菜单
  managerDisabledMenu: {},
  managerHideMenu: {},
  anaVTHidedMenu: {},
  anaVTDisabledMenu: {},
  menuEditStatus: true,
  submitNewFileTabActive: '',
  analysisResultAllData: { // 所有图表数据对象
    barLinePieData: {}, // 柱状图,折线图,饼状图饼状图
    barStackData: {}, // 堆叠图
    scatterData: {}, // 散点图, 3D散点图
    candleData: {}, // 蜡烛图
    barThreeData: {}, // 3D柱状图
    submitAnalysisParams: {}, // 分析参数
    sublineAnalysisParams: {}, // 添加辅助线的导出需要第一次的分析参数
    sublineBarLinePieData: {}, // 添加辅助线的表格显示需要第一次的基础图表数据
    sublineBarThreeData: {}, // 添加辅助线的表格显示需要第一次的3D柱状图数据
    flightPageCount: 0, // 航班编号分页总数
    flightInfoData: {}, // 飞行记录视图航班信息
    summaryData: {}, // 分析结果数据汇总
    tableData: {} // 分析结果中表格详情数据
  },
  mainSubline: [],
  paramTwoStatus: '', //分析参数数据状态
  modelPageType: '', // 模型是否可编辑
  isHasPermission: 'N', // 是否有航司权限
  analysisType: '' // 当前模型分析类型
}

export default state

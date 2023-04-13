export const menuData = {
  headerTwoData: { // 头部一级菜单的总数据
    dataTable: [ // 左侧数据菜单数据
      { enName: 'repository', zhName: '版本库', parent: 'dataTable', isShow: true },
      { enName: 'dataClean', zhName: '数据清洗', parent: 'dataTable', isShow: true },
      { enName: 'dataStatic', zhName: '数据完整度', parent: 'dataTable', isShow: true },
      { enName: 'unmatchedFlights', zhName: '未匹配航班', parent: 'dataTable', isShow: true }
    ],
    paramOne: [ // 左侧工程参数菜单数据
      { enName: 'file', zhName: '工程参数', parent: 'paramOne', isShow: true },
      { enName: 'oneDimensionalFunction', zhName: '工程算法', parent: 'paramOne', isShow: true },
       { enName: 'systemFunction', zhName: '系统函数', parent: 'paramOne', isShow: true },
      { enName: 'intelligentMatching', zhName: '智能匹配', parent: 'paramOne', isShow: true }
    ],
    paramTwo: [ // 左侧分析参数菜单数据
      { enName: 'paramLibray', zhName: '分析参数', parent: 'paramTwo', isShow: true },
      { enName: 'algorithmsLibrary', zhName: '分析算法', parent: 'paramTwo', isShow: true },
      { enName: 'systemFunction', zhName: '系统函数', parent: 'paramTwo', isShow: true }
    ],
    analysis: [ // 左侧分析菜单数据
      { enName: 'file', zhName: '文件', parent: 'analysis', isShow: true },
      { enName: 'dataSource', zhName: '数据源', parent: 'analysis', isShow: false },
      { enName: 'chart', zhName: '图表', parent: 'analysis', isShow: false },
      { enName: 'view', zhName: '飞行记录视图', parent: 'analysis', isShow: false },
      { enName: 'none', zhName: '', parent: 'analysis', isShow: false }
    ],
    dataMining: [
      { enName: 'mining', zhName: '数据挖掘', parent: 'dataMining', isShow: true }
    ],
    weather: [
      { enName: 'flight', zhName: '航班天气', parent: 'weather', isShow: true },
      { enName: 'airport', zhName: '机场天气', parent: 'weather', isShow: true }
    ],
    paramEvent: [ // 左侧分析菜单数据
      { enName: 'eventLibrary', zhName: '事件库', parent: 'paramEvent', isShow: true }
    ],
    safetyMonitor: [ // 左侧设置菜单数据
      { enName: 'stats', zhName: '数据统计', parent: 'safetyMonitor', isShow: true },
      { enName: 'userLog', zhName: '用户日志', parent: 'safetyMonitor', isShow: true },
      { enName: 'userData', zhName: '用户数据', parent: 'safetyMonitor', isShow: true }
    ],
    modelRuntime: [ // 左侧设置菜单数据
      { enName: 'approve', zhName: '模型运行', parent: 'modelRuntime', isShow: true }
    ],
    runtimeManage: [ // 左侧设置菜单数据
      { enName: 'handle', zhName: '模型办理', parent: 'runtimeManage', isShow: true },
      { enName: 'approve', zhName: '模型审批', parent: 'runtimeManage', isShow: false },
      { enName: 'onlineOffline', zhName: '上下线管理', parent: 'runtimeManage', isShow: false }
    ],
    setting: [ // 左侧设置菜单数据
      { enName: 'set', zhName: '权限设置', parent: 'setting', isShow: true },
      { enName: 'category', zhName: '目录配置', parent: 'setting', isShow: true }
    ],
    changeLog: [ // 左侧设置菜单数据
      { enName: 'change', zhName: '变更日志', parent: 'changeLog', isShow: true }
    ],
    todoList: [ // 左侧设置菜单数据
      { enName: 'todo', zhName: '问题反馈', parent: 'todoList', isShow: true }
    ],
    app: [ // 左侧设置菜单数据
      { enName: 'classify', zhName: 'APP分类', parent: 'app', isShow: true }
    ]
  },
  headerData: {
    dataTable_repository: [ // 数据-版本库
      { disabledImgUrl: require('assets/images/icon40_0.png'), showImgUrl: require('assets/images/icon40_1.png'), zhName: '导入', enName: 'dataTable_version_list_Import', isShow: true, isDisabled: true, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新增', enName: 'dataTable_version_detail_Add', isShow: false, isDisabled: true, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'dataTable_version_detail_Delete', isShow: false, isDisabled: true, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon57_0.png'), showImgUrl: require('assets/images/icon57_1.png'), zhName: '同步更新', enName: 'dataTable_version_detail_synchronousUpdate', isShow: false, isDisabled: true, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon57_0.png'), showImgUrl: require('assets/images/icon57_1.png'), zhName: '', enName: 'dataTable_version_detail', isShow: false, isDisabled: false, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon57_0.png'), showImgUrl: require('assets/images/icon57_1.png'), zhName: '版本列表', enName: 'dataTable_version_list', isShow: false, isDisabled: false, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] }
      // { disabledImgUrl: require('assets/images/icon57_0.png'), showImgUrl: require('assets/images/icon57_1.png'), zhName: '数据完整度', enName: 'dataTable_data_statics', isShow: true, isDisabled: false, parent: 'dataTable_repository', isDropdown: false, dropdownItem: [] }
    ],
    dataTable_unmatchedFlights: [ // 数据-未匹配航班
      { disabledImgUrl: require('assets/images/icon57_0.png'), showImgUrl: require('assets/images/icon57_1.png'), zhName: '未匹配航班', enName: 'dataTable_unmatchedFlights_menu', isShow: true, isDisabled: false, parent: 'dataTable_unmatchedFlights', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon57_2.png'), showImgUrl: require('assets/images/icon57_2.png'), zhName: '未匹配源文件', enName: 'dataTable_unmatchedCSV_menu', isShow: true, isDisabled: false, parent: 'dataTable_unmatchedFlights', isDropdown: false, dropdownItem: [] }
    ],
    dataTable_dataClean: [ // 数据-数据清洗
      { disabledImgUrl: require('assets/images/icon59_0.png'), showImgUrl: require('assets/images/icon59_1.png'), zhName: '查看清洗记录', enName: 'dataTable_dataClean_list', isShow: true, isDisabled: false, parent: 'dataTable_dataClean', isDropdown: false, dropdownItem: [] }
    ],
    dataTable_dataStatic: [
      { disabledImgUrl: require('assets/images/icon59_0.png'), showImgUrl: require('assets/images/icon59_1.png'), zhName: '查看数据完整度', enName: 'dataTable_data_statics', isShow: true, isDisabled: false, parent: 'dataTable_dataStatic', isDropdown: false, dropdownItem: [] }
    ],
    paramOne_file: [ // 工程参数-文件
      // { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新建工程参数', enName: 'paramOne_file_new', isShow: true, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon40_0.png'), showImgUrl: require('assets/images/icon40_1.png'), zhName: '导入', enName: 'paramOne_file_import', isShow: true, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] }
      // { disabledImgUrl: require('assets/images/icon104_0.png'), showImgUrl: require('assets/images/icon104_1.png'), zhName: '执行清洗', enName: 'paramOne_file_performClean', isShow: true, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] }
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加目录', enName: 'paramOne_add_catalog', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '添加工程参数', enName: 'paramOne_file_new', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'paramOne_file_edit', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon107_0.png'), showImgUrl: require('assets/images/icon107_1.png'), zhName: '新增算法', enName: 'paramOne_add_suanfa', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/edit_0.png'), showImgUrl: require('assets/images/edit_1.png'), zhName: '编辑算法', enName: 'paramOne_edit_suanfa', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/clear_0.png'), showImgUrl: require('assets/images/clear_1.png'), zhName: '清空映射关系', enName: 'paramOne_clear_suanfa', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'paramOne_file_remove', isShow: false, isDisabled: false, parent: 'paramOne_file', isDropdown: false, dropdownItem: [] }
    ],
    paramOne_oneDimensionalFunction: [ // 工程参数-工程算法
      // { disabledImgUrl: require('assets/images/icon106_0.png'), showImgUrl: require('assets/images/icon106_1.png'), zhName: '新建计算参数', enName: 'paramOne_oneDimensionalFunction_new', isShow: true, isDisabled: false, parent: 'paramOne_oneDimensionalFunction', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon105_0.png'), showImgUrl: require('assets/images/icon105_1.png'), zhName: '工程算法', enName: 'paramOne_oneDimensionalFunction_manager', isShow: true, isDisabled: false, parent: 'paramOne_oneDimensionalFunction', isDropdown: false, dropdownItem: [] }
    ],
    paramOne_systemFunction: [ // 系统函数
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '系统函数', enName: 'paramOne_system_param', isShow: true, isDisabled: false, parent: 'paramOne_systemFunction', isDropdown: false, dropdownItem: [] }
    ],
    paramOne_intelligentMatching: [ // 智能匹配
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '智能匹配', enName: 'intelligent_matching_select', isShow: true, isDisabled: false, parent: 'paramOne_intelligentMatching', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/init_pipei_0.png'), showImgUrl: require('assets/images/init_pipei_1.png'), zhName: '初始化匹配', enName: 'intelligent_param_matching_init', isShow: false, isDisabled: false, parent: 'paramOne_intelligentMatching', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '参数匹配', enName: 'intelligent_param_matching', isShow: false, isDisabled: false, parent: 'paramOne_intelligentMatching', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/clear_0.png'), showImgUrl: require('assets/images/clear_1.png'), zhName: '清空映射关系', enName: 'paramOne_intelligentMatching_clear', isShow: false, isDisabled: false, parent: 'paramOne_intelligentMatching', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/save_0.png'), showImgUrl: require('assets/images/save_1.png'), zhName: '保存', enName: 'intelligent_matching_save', isShow: false, isDisabled: false, parent: 'paramOne_intelligentMatching', isDropdown: false, dropdownItem: [] }
    ],
    paramTwo_paramLibray: [ // 分析参数-参数库
      //  { disabledImgUrl: require('assets/images/icon42_0.png'), showImgUrl: require('assets/images/icon42_1.png'), zhName: '总参数库', enName: 'paramTwo_paramLibray_all', isShow: true, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      //   { disabledImgUrl: require('assets/images/icon43_0.png'), showImgUrl: require('assets/images/icon43_1.png'), zhName: '标准参数库', enName: 'paramTwo_paramLibray_standard', isShow: true, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '个人参数库', enName: 'paramTwo_paramLibray_personal', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      //  { disabledImgUrl: require('assets/images/icon48_0.png'), showImgUrl: require('assets/images/icon48_1.png'), zhName: '主题', enName: 'paramTwo_paramLibray_theme', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      //  { disabledImgUrl: require('assets/images/icon55_0.png'), showImgUrl: require('assets/images/icon55_1.png'), zhName: '配置绑定关系', enName: 'paramTwo_algorithmsLibrary_new', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon51_0.png'), showImgUrl: require('assets/images/icon51_1.png'), zhName: '配置', enName: 'paramTwo_paramLibray_config', isShow: true, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      //  { disabledImgUrl: require('assets/images/icon52_0.png'), showImgUrl: require('assets/images/icon52_1.png'), zhName: '配置处理', enName: 'paramTwo_paramLibray_configDeal', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      //  { disabledImgUrl: require('assets/images/icon53_0.png'), showImgUrl: require('assets/images/icon53_1.png'), zhName: '选择试飞模式', enName: 'paramTwo_paramLibray_flightMode', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '计算结果', enName: 'paramTwo_calculation_results', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加目录', enName: 'paramTwo_paramLibray_add_catalog1', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/create_new_2.png'), showImgUrl: require('assets/images/create_new.png'), zhName: '添加分析参数库', enName: 'paramTwo_paramLibray_add_param_library', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'paramTwo_delete_profile', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon133_0.png'), showImgUrl: require('assets/images/icon133_1.png'), zhName: '查看', enName: 'paramTwo_file_edit_look', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/edit_0.png'), showImgUrl: require('assets/images/edit_1.png'), zhName: '编辑', enName: 'paramTwo_file_edit', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'paramTwo_file_rename', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'paramTwo_delete_node', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加目录', enName: 'paramTwo_paramLibray_add_catalog2', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon111_0.png'), showImgUrl: require('assets/images/icon111.png'), zhName: '添加筛选方式', enName: 'paramTwo_edit_filter', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon45_0.png'), showImgUrl: require('assets/images/icon45_1.png'), zhName: '添加时间点', enName: 'paramTwo_edit_timePoint', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon_sjd_0.png'), showImgUrl: require('assets/images/icon9.png'), zhName: '添加时间段', enName: 'paramTwo_edit_timeSlot', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon93_0.png'), showImgUrl: require('assets/images/icon93_1.png'), zhName: '添加测量值', enName: 'paramTwo_edit_measureValue', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon94_0.png'), showImgUrl: require('assets/images/icon94_1.png'), zhName: '添加逻辑值', enName: 'paramTwo_edit_logicalValue', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/add_event_0.png'), showImgUrl: require('assets/images/add_event_1.png'), zhName: '添加事件', enName: 'paramTwo_edit_event', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/link_large_2.png'), showImgUrl: require('assets/images/link_large_1.png'), zhName: '链接', enName: 'paramTwo_edit_link', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'paramTwo_del_catalog', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon54_0.png'), showImgUrl: require('assets/images/icon_binding.png'), zhName: '查看', enName: 'paramTwo_paramLibray_param_binding_look', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon54_0.png'), showImgUrl: require('assets/images/icon_binding.png'), zhName: '绑定', enName: 'paramTwo_paramLibray_param_binding', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon54_0.png'), showImgUrl: require('assets/images/icon_binding.png'), zhName: '编辑绑定', enName: 'paramTwo_paramLibray_param_edit_binding', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon107_0.png'), showImgUrl: require('assets/images/icon107_1.png'), zhName: '新建算法', enName: 'paramTwo_algorithmsLibrary_new', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/edit_0.png'), showImgUrl: require('assets/images/edit_1.png'), zhName: '编辑算法', enName: 'paramTwo_algorithmsLibrary_new_edit', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/clear_0.png'), showImgUrl: require('assets/images/clear_1.png'), zhName: '清空映射关系', enName: 'paramTwo_algorithmsLibrary_new_remove', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'paramTwo_edit', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'paramTwo_delete', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/link_large_2.png'), showImgUrl: require('assets/images/compute_start.png'), zhName: '开始计算', enName: 'paramTwo_edit_compute', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/share_0.png'), showImgUrl: require('assets/images/share_1.png'), zhName: '分享', enName: 'paramTwo_share', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/share_0.png'), showImgUrl: require('assets/images/share_1.png'), zhName: '取消分享', enName: 'paramTwo_share_cancle', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon59_0.png'), showImgUrl: require('assets/images/icon59_1.png'), zhName: '配置清洗规则', enName: 'paramTwo_clean', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/clear_0.png'), showImgUrl: require('assets/images/clear_1.png'), zhName: '开始清洗分析参数', enName: 'paramEtlTwo_dimension', isShow: false, isDisabled: false, parent: 'paramTwo_paramLibray', isDropdown: false, dropdownItem: [] }
    ],
    paramTwo_algorithmsLibrary: [ // 分析参数-算法库
      //  { disabledImgUrl: require('assets/images/icon42_0.png'), showImgUrl: require('assets/images/icon42_1.png'), zhName: '总算数库', enName: 'paramTwo_algorithmsLibrary_all', isShow: true, isDisabled: false, parent: 'paramTwo_algorithmsLibrary', isDropdown: false, dropdownItem: [] },
      //  { disabledImgUrl: require('assets/images/icon43_0.png'), showImgUrl: require('assets/images/icon43_1.png'), zhName: '标准算数库', enName: 'paramTwo_algorithmsLibrary_standard', isShow: true, isDisabled: false, parent: 'paramTwo_algorithmsLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '算法库', enName: 'paramTwo_algorithmsLibrary_personal', isShow: true, isDisabled: false, parent: 'paramTwo_algorithmsLibrary', isDropdown: false, dropdownItem: [] }
      ],
    paramTwo_systemFunction: [ // 系统函数
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '系统函数', enName: 'paramTwo_system_param', isShow: true, isDisabled: false, parent: 'paramTwo_systemFunction', isDropdown: false, dropdownItem: [] }
      ],
    paramEvent_eventLibrary: [ // 事件库
      { disabledImgUrl: require('assets/images/icon108_0.png'), showImgUrl: require('assets/images/icon108_1.png'), zhName: '系统函数', enName: 'event_system_param', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'eventLibrary_rname', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加目录', enName: 'event_add_catalog', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '添加事件库', enName: 'event_library_add', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除目录', enName: 'event_delete_catalog', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon133_0.png'), showImgUrl: require('assets/images/icon133_1.png'), zhName: '查看', enName: 'event_profile_look', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/edit_0.png'), showImgUrl: require('assets/images/edit_1.png'), zhName: '编辑', enName: 'event_profile_edit', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'event_profile_rename', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'event_delete_profile', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '添加事件的页面', enName: 'event_add_profile_page', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/add_event_0.png'), showImgUrl: require('assets/images/add_event_1.png'), zhName: '添加事件', enName: 'profile_event_add', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/def_level_0.png'), showImgUrl: require('assets/images/def_level_0.png'), zhName: '等级设置', enName: 'event_definition_level', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/event_1.png'), showImgUrl: require('assets/images/event_2.png'), zhName: '定义事件', enName: 'profile_event_definition', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'event_delete_event', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/clear_0.png'), showImgUrl: require('assets/images/clear_1.png'), zhName: '清空映射关系', enName: 'event_clear_suanfa', isShow: false, isDisabled: true, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/link_large_2.png'), showImgUrl: require('assets/images/compute_start.png'), zhName: '开始计算', enName: 'eventLibrary_jisuan_event', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/share_0.png'), showImgUrl: require('assets/images/share_1.png'), zhName: '分享', enName: 'eventLibrary_share_event', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/share_0.png'), showImgUrl: require('assets/images/share_1.png'), zhName: '取消分享', enName: 'eventLibrary_share_event_cancle', isShow: false, isDisabled: false, parent: 'paramEvent_eventLibrary', isDropdown: false, dropdownItem: [] }
    ],
    analysis_file: [ // 分析-文件
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新建分析', enName: 'analysis_file_new', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新建事件分析', enName: 'analysis_event_file_new', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新建多航班参数对比', enName: 'analysis_dhbcsdb', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加分析目录', enName: 'tree_catalog_add', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/create_new_2.png'), showImgUrl: require('assets/images/create_new.png'), zhName: '添加分析节点', enName: 'tree_node_add', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'tree_node_edit', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon_paste_0.png'), showImgUrl: require('assets/images/icon_paste.png'), zhName: '粘贴', enName: 'tree_node_paste', isShow: false, isDisabled: true, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'tree_node_delete', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon9_0.png'), showImgUrl: require('assets/images/icon9_1.png'), zhName: '打印', enName: 'analysis_file_print', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'analysis_file_export', isShow: false, isDisabled: false, parent: 'analysis_file', isDropdown: true, dropdownItem: [{ name: '拷贝到剪贴板' }, { name: '保存图像' }, { name: '导出图表数据' }, { name: '导出复选框中选中数据区' }, { name: '导出分析集' }, { name: '导出参考集' }] }
    ],
    analysis_dataSource: [],
    analysis_none: [],
    analysis_dataSource1: [ // 分析-数据源
      { disabledImgUrl: require('assets/images/icon13_0.png'), showImgUrl: require('assets/images/icon13_1.png'), zhName: '总数据源', enName: 'analysis_dataSource_allDataSource', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon14_0.png'), showImgUrl: require('assets/images/icon14_1.png'), zhName: 'profile', enName: 'analysis_dataSource_profile', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon15_0.png'), showImgUrl: require('assets/images/icon15_1.png'), zhName: '下载', enName: 'analysis_dataSource_download', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon16_0.png'), showImgUrl: require('assets/images/icon16_1.png'), zhName: '下载审查', enName: 'analysis_dataSource_downloadReview', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon17_0.png'), showImgUrl: require('assets/images/icon17_1.png'), zhName: '航班', enName: 'analysis_dataSource_flight', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon18_0.png'), showImgUrl: require('assets/images/icon18_1.png'), zhName: '航班审查', enName: 'analysis_dataSource_flightReview', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon19_0.png'), showImgUrl: require('assets/images/icon19_1.png'), zhName: '机场', enName: 'analysis_dataSource_airport', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon20_0.png'), showImgUrl: require('assets/images/icon20_1.png'), zhName: '数据', enName: 'analysis_dataSource_data', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon21_0.png'), showImgUrl: require('assets/images/icon21_1.png'), zhName: '导航', enName: 'analysis_dataSource_navigation', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon22_0.png'), showImgUrl: require('assets/images/icon22_1.png'), zhName: '操作', enName: 'analysis_dataSource_operation', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon23_0.png'), showImgUrl: require('assets/images/icon23_1.png'), zhName: '天气', enName: 'analysis_dataSource_weather', isShow: true, isDisabled: false, parent: 'analysis_dataSource', isDropdown: false, dropdownItem: [] }
    ],

    analysis_chart: [ // 分析-图表
      { disabledImgUrl: require('assets/images/icon24_0.png'), showImgUrl: require('assets/images/icon24_1.png'), activeImgUrl: require('assets/images/icon24_2.png'), zhName: '柱状图', enName: 'analysis_chart_bar', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon25_0.png'), showImgUrl: require('assets/images/icon25_1.png'), activeImgUrl: require('assets/images/icon25_2.png'), zhName: '饼状图', enName: 'analysis_chart_pie', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon26_0.png'), showImgUrl: require('assets/images/icon26_1.png'), activeImgUrl: require('assets/images/icon26_2.png'), zhName: '折线图', enName: 'analysis_chart_line', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon27_0.png'), showImgUrl: require('assets/images/icon27_1.png'), activeImgUrl: require('assets/images/icon27_2.png'), zhName: '堆叠图', enName: 'analysis_chart_barStack', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon28_0.png'), showImgUrl: require('assets/images/icon28_1.png'), activeImgUrl: require('assets/images/icon28_2.png'), zhName: '散点图', enName: 'analysis_chart_scatter', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon29_0.png'), showImgUrl: require('assets/images/icon29_1.png'), activeImgUrl: require('assets/images/icon29_2.png'), zhName: '蜡烛图', enName: 'analysis_chart_boxplot', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon30_0.png'), showImgUrl: require('assets/images/icon30_1.png'), activeImgUrl: require('assets/images/icon30_2.png'), zhName: '3D柱状图', enName: 'analysis_chart_bar3D', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon31_0.png'), showImgUrl: require('assets/images/icon31_1.png'), activeImgUrl: require('assets/images/icon31_2.png'), zhName: '3D散点图', enName: 'analysis_chart_scatter3D', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon34_0.png'), showImgUrl: require('assets/images/icon34_1.png'), activeImgUrl: require('assets/images/icon34_1.png'), zhName: '样式', enName: 'analysis_chart_style', isShow: false, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon110_0.png'), showImgUrl: require('assets/images/icon110_1.png'), activeImgUrl: require('assets/images/icon110_2.png'), zhName: '添加辅助线', enName: 'analysis_chart_subline', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon37_0.png'), showImgUrl: require('assets/images/icon37_1.png'), activeImgUrl: require('assets/images/icon37_2.png'), zhName: '钻取', enName: 'analysis_chart_drillDown', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), activeImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'analysis_chart_export', isShow: true, isDisabled: true, parent: 'analysis_chart', isDropdown: false, dropdownItem: [] }
    ],
    analysis_grid: [ // 分析-表格
      { disabledImgUrl: require('assets/images/icon35_0.png'), showImgUrl: require('assets/images/icon35_1.png'), zhName: '属性', enName: 'analysis_grid_attr', isShow: false, isDisabled: false, parent: 'analysis_grid', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon34_0.png'), showImgUrl: require('assets/images/icon34_1.png'), zhName: '样式', enName: 'analysis_grid_style', isShow: false, isDisabled: false, parent: 'analysis_grid', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon37_0.png'), showImgUrl: require('assets/images/icon37_1.png'), zhName: '钻取', enName: 'analysis_grid_drillDown', isShow: false, isDisabled: false, parent: 'analysis_grid', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'analysis_grid_export', isShow: true, isDisabled: true, parent: 'analysis_grid', isDropdown: false, dropdownItem: [] }
    ],
    analysis_view: [ // 分析-飞行记录视图
      { disabledImgUrl: require('assets/images/icon132_0.png'), showImgUrl: require('assets/images/icon132_1.png'), zhName: '工程参数视图', enName: 'analysis_view_fdv', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '全参导出', enName: 'analysis_view_export', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon124.png'), showImgUrl: require('assets/images/icon124.png'), zhName: '工程参数视图模版', enName: 'analysis_view_template', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/data_clean.png'), showImgUrl: require('assets/images/data_clean.png'), zhName: '参数清洗', enName: 'analysis_view_clean', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] }
    ],
    analysis_table: [ // 分析-表格详情
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'analysis_table_export', isShow: true, isDisabled: false, parent: 'analysis_table', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon131_0.png'), showImgUrl: require('assets/images/icon131_1.png'), zhName: '多航班工程参数对比', enName: 'flight_param_compare', isShow: true, isDisabled: true, parent: 'analysis_table', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '全参导出', enName: 'analysis_table_allParamExport', isShow: true, isDisabled: true, parent: 'analysis_table', isDropdown: false, dropdownItem: [] }
    ],

    dataMining_mining: [ // 数据挖掘
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '添加目录', enName: 'dataMining_catalog_new', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '添加节点', enName: 'dataMining_children_new', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'dataMining_catalog_del', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '新建挖掘', enName: 'dataMining_file_new', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon6_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'dataMining_file_rename', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'dataMining_file_delete', isShow: false, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] }
      // { disabledImgUrl: require('assets/images/icon2_0.png'), showImgUrl: require('assets/images/icon2_1.png'), zhName: '建模结果', enName: 'dataMining_file_reult', isShow: true, isDisabled: false, parent: 'dataMining_mining', isDropdown: false, dropdownItem: [] }
    ],
    modeing_result: [],

    flight_param_compare: [], // 多航班参数对比
    fpc_result_view: [ // 分析-飞行记录视图
      { disabledImgUrl: require('assets/images/icon132_0.png'), showImgUrl: require('assets/images/icon132_1.png'), zhName: '工程参数视图', enName: 'analysis_view_fdv', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '全参导出', enName: 'analysis_view_export', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon124.png'), showImgUrl: require('assets/images/icon124.png'), zhName: '工程参数视图模版', enName: 'analysis_view_template', isShow: true, isDisabled: false, parent: 'analysis_view', isDropdown: false, dropdownItem: [] }
    ],
    fpc_result_grid: [
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'fpc_result_grid_export', isShow: true, isDisabled: true, parent: 'fpc_result_grid', isDropdown: false, dropdownItem: [] }
    ],
    fpc_result_chart: [],
    fpc_result_flinfo: [
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '导出', enName: 'fpc_result_flinfo_export', isShow: true, isDisabled: false, parent: 'fpc_result_flinfo', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '多航班工程参数对比', enName: 'fpc_result_flinfo_dhbgcsdb', isShow: true, isDisabled: true, parent: 'fpc_result_flinfo', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon12_0.png'), showImgUrl: require('assets/images/icon12_1.png'), zhName: '全参导出', enName: 'fpc_result_flinfo_allParamExport', isShow: true, isDisabled: true, parent: 'fpc_result_flinfo', isDropdown: false, dropdownItem: [] }
    ],
    analysis_view_template: [ // 工程参数视图模版
      { disabledImgUrl: require('assets/images/icon122_0.png'), showImgUrl: require('assets/images/icon122_1.png'), zhName: '修改模版', enName: 'analysis_view_template_edit', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] },
      // { disabledImgUrl: require('assets/images/icon123_0.png'), showImgUrl: require('assets/images/icon123_1.png'), zhName: '重命名', enName: 'analysis_view_template_rename', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon119_0.png'), showImgUrl: require('assets/images/icon119_1.png'), zhName: '删除', enName: 'analysis_view_template_remove', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon121_0.png'), showImgUrl: require('assets/images/icon121_1.png'), zhName: '新建模版', enName: 'analysis_view_template_create', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon120_0.png'), showImgUrl: require('assets/images/icon120_1.png'), zhName: '设为公用', enName: 'analysis_view_template_common', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon118_0.png'), showImgUrl: require('assets/images/icon118_1.png'), zhName: '取消公用', enName: 'analysis_view_template_uncommon', isShow: false, isDisabled: false, parent: 'analysis_view_template', isDropdown: false, dropdownItem: [] }
    ],

    setting_set: [ // 设置-权限设置
      { disabledImgUrl: require('assets/images/icon112_0.png'), showImgUrl: require('assets/images/icon112_1.png'), zhName: '角色权限', enName: 'setting_group_permissions', isShow: true, isDisabled: false, parent: 'setting_set', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon113_0.png'), showImgUrl: require('assets/images/icon113_1.png'), zhName: '用户角色', enName: 'setting_role_permissions', isShow: true, isDisabled: false, parent: 'setting_set', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/sensitive_info200.png'), showImgUrl: require('assets/images/sensitive_info200.png'), zhName: '敏感航班', enName: 'setting_flight_sensitive', isShow: true, isDisabled: false, parent: 'setting_set', isDropdown: false, dropdownItem: [] }
    ],
    setting_category: [ // 设置-目录配置
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '公共树配置', enName: 'setting_analysis_parameter_category', isShow: true, isDisabled: false, parent: 'setting_category', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '创建目录', enName: 'setting_create_catalog', isShow: false, isDisabled: false, parent: 'setting_category', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/create_new_2.png'), showImgUrl: require('assets/images/create_new.png'), zhName: '创建下级目录', enName: 'setting_create_next_catalog', isShow: false, isDisabled: false, parent: 'setting_category', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/icon107_0.png'), showImgUrl: require('assets/images/icon6_1.png'), zhName: '重命名', enName: 'setting_edit_catalog', isShow: false, isDisabled: false, parent: 'setting_category', isDropdown: false, dropdownItem: [] },
      { disabledImgUrl: require('assets/images/remove_large_2.png'), showImgUrl: require('assets/images/remove_large_1.png'), zhName: '删除', enName: 'setting_remove_catalog', isShow: false, isDisabled: false, parent: 'setting_category', isDropdown: false, dropdownItem: [] }
    ],

    // 天气三级菜单
    // weather_flight: [ // 航班天气
    //   { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '航班天气', enName: 'flight_weather', isShow: false, isDisabled: false, parent: 'weather_flight', isDropdown: false, dropdownItem: [] }
    // ],
    // weather_airport: [ // 机场天气
    //   { disabledImgUrl: require('assets/images/file_large_2.png'), showImgUrl: require('assets/images/file_large_1.png'), zhName: '机场天气', enName: 'airport_weather', isShow: false, isDisabled: false, parent: 'weather_airport', isDropdown: false, dropdownItem: [] }
    // ],

    event_store_result: [],
    changeLog_change: [],
    todoList_todo: [],
    app_classify: []
  }
}

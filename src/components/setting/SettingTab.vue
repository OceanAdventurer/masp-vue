<template>
  <div class="header-tab" v-if="settingTabs.length > 0">
    <el-tabs v-model="settingTabsValue" type="card" @tab-remove="removeSettingTab" @tab-click="clickSettingTab">
      <el-tab-pane
        v-for="item in settingTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'setting_group_permissions'">
          <GroupPermissions2></GroupPermissions2>
        </div>
        <div v-else-if="item.content === 'setting_role_permissions'">
          <RolePermissions></RolePermissions>
        </div>
        <div v-else-if="item.content === 'setting_flight_sensitive'">
          <SensitiveFlight></SensitiveFlight>
        </div>
        <!--目录配置-->
        <div v-else-if="item.content === 'setting_analysis_parameter_category'">
          <AnalysisParameterCategory  ref="mychild"></AnalysisParameterCategory>
        </div>
        <div v-else>
          {{ item.title }}
          {{ item.content }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const GroupPermissions2 = () => import('components/setting/GroupPermissions2')
// const GroupPermissions = () => import('components/setting/GroupPermissions')
const RolePermissions = () => import('components/setting/RolePermissions')
const SensitiveFlight = () => import('components/setting/SensitiveFlight')
const AnalysisParameterCategory = () => import('components/setting/category/AnalysisParameterCategory')

export default {
  data () {
    return {
      fileNewTreeArr: [],
      isAddTreeNode: false, // 当前节点编辑状态
      treeData: {},
      treeNode: {},
      settingTabsValue: '1',
      settingTabs: [],
      tabIndex: 1
    }
  },
  components: {
    // GroupPermissions,
    RolePermissions,
    GroupPermissions2,
    AnalysisParameterCategory,
    SensitiveFlight
  },
  mounted () {
    this.$bus.$on('settingAddTab', (obj) => {
      console.log(obj.enName, obj.zhName, obj.isClosable)
      this.addSettingTab(obj)
    })
    // 获取传过来的值
    this.$bus.$on('getAnlysiParamCategoryTreeData', (treeData, treeNode, fileNewTreeArr) => {
      this.treeData = treeData
      this.treeNode = treeNode
      this.fileNewTreeArr = fileNewTreeArr
      this.isAddTreeNode = false // 每次点击节点的时候，说明可以新增节点，将其设置为false
    })
    this.$bus.$on('setAddTreeStatus', (status) => {
      this.isAddTreeNode = status
    })
    this.addSettingTab({enName: 'setting_group_permissions', zhName: '角色权限', isClosable: false, parent: 'setting_set'})
  },
  props: [
    'menuListObj'
  ],
  methods: {
    addSettingTab (obj) { // 添加tab标签
      if (obj.enName === 'setting_create_catalog') { //  添加目录
        this.$refs.mychild[0].addNodeFun(this.treeData, this.treeNode, 'catalog')
      } else if (obj.enName === 'setting_create_next_catalog') { // 分析参数库 添加节点目录
        this.$refs.mychild[0].addNodeFun(this.treeData, this.treeNode, 'node')
      } else if (obj.enName === 'setting_edit_catalog') { // 重命名
        this.$refs.mychild[0].editTreeNode(this.treeData, this.treeNode, 'edit_category')
      } else if (obj.enName === 'setting_remove_catalog') { // 刪除
        this.$refs.mychild[0].delTreeNode(this.treeData, this.treeNode)
      } else {
        if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.settingTabs)) {
          this.settingTabsValue = this.settingTabs.filter(s => s.title === obj.zhName)[0].name
          return false // 已经存在tab标签，再次点击时不再添加
        }
        let newTabName = ++this.tabIndex + ''
        this.settingTabs.push({
          title: obj.zhName,
          name: newTabName,
          content: obj.enName,
          isClosable: obj.isClosable,
          enName: obj.enName,
          parent: obj.parent
        })
        this.settingTabsValue = newTabName
      }
    },
    removeSettingTab (targetName) { // 关闭tab标签
      let tabs = this.settingTabs
      let activeName = this.settingTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.settingTabsValue = activeName
      this.settingTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickSettingTab (vc) { // 点击tab标签获取实例
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      var attrObj = vc.$attrs
      if (attrObj.id === 'setting_analysis_parameter_category') {
        hideMenuObj = this.$refs.mychild[0].hideMenuObj
      }
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', attrObj.parent, hideMenuObj, disabledMenuObj) // 修改头部显示效果
    }
  }
}
</script>

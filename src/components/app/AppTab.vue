<template>
  <div class="header-tab" v-if="appTabs.length > 0">
    <el-tabs v-model="appTabsValue" type="card" @tab-remove="removeAppTab" @tab-click="clickAppTab">
      <el-tab-pane
        v-for="item in appTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
      <div v-if="item.content === 'app_collect'">
        <AppCollect></AppCollect>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const AppCollect = () => import('components/app/AppCollect')

export default {
  name: 'AppTab',
  data () {
     return {
      appTabsValue: '1',
      appTabs: [],
      tabIndex: 1
    }
  },
  components: {
    AppCollect
  },
  mounted () {
    this.addAppTab({enName: 'app_collect', zhName: 'APP', isClosable: false, parent: 'app_classify'})
  },
  props: [
    'menuListObj'
  ],
  methods: {
    addAppTab (obj) { // 添加tab标签
        let newTabName = ++this.tabIndex + ''
        this.appTabs.push({
          title: obj.zhName,
          name: newTabName,
          content: obj.enName,
          isClosable: obj.isClosable,
          enName: obj.enName,
          parent: obj.parent
        })
        this.appTabsValue = newTabName
    },
    removeAppTab (targetName) { // 关闭tab标签
      let tabs = this.appTabs
      let activeName = this.appTabsValue
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
      this.appTabsValue = activeName
      this.appTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickAppTab (vc) { // 点击tab标签获取实例
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      var attrObj = vc.$attrs

      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', attrObj.parent, hideMenuObj, disabledMenuObj) // 修改头部显示效果
    }
  }
}
</script>

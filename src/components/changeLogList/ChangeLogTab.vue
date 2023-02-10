<template>
  <div class="header-tab" v-if="changeLogTabs.length > 0">
    <el-tabs v-model="changeLogTabsValue" type="card" @tab-remove="removeChangeLogTab" @tab-click="clickChangeLogTab">
      <el-tab-pane
        v-for="item in changeLogTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'changeLog_grid'">
          <ChangeLogGrid></ChangeLogGrid>
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
const ChangeLogGrid = () => import('components/changeLogList/ChangeLogGrid')

export default {
  data () {
    return {
      changeLogTabsValue: '1',
      changeLogTabs: [],
      tabIndex: 1
    }
  },
  components: {
    ChangeLogGrid
  },
  mounted () {
    this.$bus.$on('changeLogListAddTab', (obj) => {
      console.log(obj.enName, obj.zhName, obj.isClosable)
      this.addChangeLogTab(obj)
    })
    this.addChangeLogTab({enName: 'changeLog_grid', zhName: '变更日志', isClosable: false, parent: 'changeLog_change'})
  },
  methods: {
    addChangeLogTab (obj) { // 添加tab标签
      if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.changeLogTabs)) {
        this.changeLogTabsValue = this.changeLogTabs.filter(s => s.title === obj.zhName)[0].name
        return false // 已经存在tab标签，再次点击时不再添加
      }
      let newTabName = ++this.tabIndex + ''
      this.changeLogTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.changeLogTabsValue = newTabName
    },
    removeChangeLogTab (targetName) { // 关闭tab标签
      let tabs = this.changeLogTabs
      let activeName = this.changeLogTabsValue
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
      this.changeLogTabsValue = activeName
      this.changeLogTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickChangeLogTab (vc) { // 点击tab标签获取实例
      var attrObj = vc.$attrs
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', attrObj.parent, hideMenuObj, disabledMenuObj) // 修改头部显示效果
    }
  }
}
</script>

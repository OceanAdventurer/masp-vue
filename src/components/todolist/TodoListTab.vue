<template>
  <div class="header-tab" v-if="todoTabs.length > 0">
    <el-tabs v-model="todoTabsValue" type="card" @tab-remove="removeTodoTab" @tab-click="clickTodoTab">
      <el-tab-pane
        v-for="item in todoTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'todo_grid'">
          <TodoGrid></TodoGrid>
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
const TodoGrid = () => import('components/todolist/TodoGrid')

export default {
  data () {
    return {
      todoTabsValue: '1',
      todoTabs: [],
      tabIndex: 1
    }
  },
  components: {
    TodoGrid
  },
  mounted () {
    this.$bus.$on('todoListAddTab', (obj) => {
      console.log(obj.enName, obj.zhName, obj.isClosable)
      this.addTodoTab(obj)
    })
    this.addTodoTab({enName: 'todo_grid', zhName: '问题反馈', isClosable: false, parent: 'todoList_todo'})
  },
  methods: {
    addTodoTab (obj) { // 添加tab标签
      if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.todoTabs)) {
        this.todoTabsValue = this.todoTabs.filter(s => s.title === obj.zhName)[0].name
        return false // 已经存在tab标签，再次点击时不再添加
      }
      let newTabName = ++this.tabIndex + ''
      this.todoTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.todoTabsValue = newTabName
    },
    removeTodoTab (targetName) { // 关闭tab标签
      let tabs = this.todoTabs
      let activeName = this.todoTabsValue
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
      this.todoTabsValue = activeName
      this.todoTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickTodoTab (vc) { // 点击tab标签获取实例
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

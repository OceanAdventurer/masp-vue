<template>
  <div class="tree-expand">
    <div class="tree-info" v-show="!data.status">
      <div class="tree-img-set tree-folder" v-show="data.CHILDREN"></div>
      <div class="tree-img-set-link link-folder" v-if="data.LINK_DIMENSION_ID !== null && data.TYPE !== 'CATALOG'"></div>
      <span v-if="data.TWO_DIMENSION_DESCRIPTION">
         <div class="tree-label" :title="data.TWO_DIMENSION_DESCRIPTION">
        <div>{{data.NAME}}</div>
      </div>
      </span>
      <span v-else>
          <div style="color: royalblue;" v-if="data.LINK_DIMENSION_ID !== null && data.TYPE !== 'CATALOG'"  :title="data.DESCRIPTION ? data.DESCRIPTION : data.NAME">
        <div class="tree-label-1">{{data.NAME}}</div>
         </div>
        <div class="tree-label"   v-else :title="data.DESCRIPTION ? data.DESCRIPTION : data.NAME">
        <div>{{data.NAME}}</div>
        </div>
      </span>
    </div>
    <div class="tree-btn-group" v-show="showTreeMore">
      <div class="tree-img-set tree-more"></div>
      <div class="tree-btn">
        <div class="tree-btn-arrow"></div>
        <!-- 添加子目录 -->
<!--        <div v-show="data.CHILDREN" class="tree-info" @click.stop="addTreeNode(data,node,'catalog')">-->
<!--          <div class="tree-img-set tree-btn-plus-p"></div>-->
<!--          <div class="tree-label" title="添加目录">添加目录</div>-->
<!--        </div>-->
        <!-- 事件 -->
        <div v-show="data.CHILDREN " class="tree-info" @click.stop="openTwoMenu(data, node, 'profile_event_add')">
          <div class="tree-img-set tree-btn-event"></div>
          <div class="tree-label" title="添加事件">添加事件</div>
        </div>
        <!--链接-->
<!--        <div v-show="data.CHILDREN" class="tree-info" @click.stop="openTwoMenu(data, node, 'paramTwo_edit_link')">-->
<!--          <div class="tree-img-set tree-btn-link"></div>-->
<!--          <div class="tree-label" title="链接">链接</div>-->
<!--        </div>-->
        <!--根目录不显示图标-->
        <div v-show="data.IS_ROOT && data.IS_ROOT === 'false'" class="tree-info" @click.stop="openTwoMenu(data, node, 'paramTwo_del_catalog')">
          <div class="tree-img-set tree-btn-delete"></div>
          <div class="tree-label" title="删除">删除</div>
        </div>
<!--
        <div v-show="data.CHILDREN" class="tree-img-set tree-btn-copy" @click.stop="openTwoMenu(data, node, 'paramTwo_edit_copy')" title="复制"></div>
-->
        <!--新增算法）-->
<!--       <div v-show="!data.CHILDREN && isCurrentUser && !data.LINK_DIMENSION_ID" class="tree-info" @click.stop="openTwoMenu(data, node, 'paramTwo_algorithmsLibrary_new')">-->
<!--          <div class="tree-img-set tree-btn-add-suanfa"></div>-->
<!--          <div class="tree-label" title="新增算法">新增算法</div>-->
<!--        </div>-->
<!--        <div v-show="!data.CHILDREN && data.BINDCOUNT > 0 && !data.LINK_DIMENSION_ID && isCurrentUser" class="tree-info" @click.stop="openTwoMenu(data, node, 'paramTwo_algorithmsLibrary_new_edit')">-->
<!--          <div class="tree-img-set tree-btn-edit"></div>-->
<!--          <div class="tree-label" title="编辑算法">编辑算法</div>-->
<!--        </div>-->
<!--        <div v-show="!data.CHILDREN && data.BINDCOUNT > 0 && !data.LINK_DIMENSION_ID && isCurrentUser" class="tree-info" @click.stop="openTwoMenu(data, node, 'paramTwo_algorithmsLibrary_new_remove')">-->
<!--          <div class="tree-img-set tree-btn-clear-suanfa"></div>-->
<!--          <div class="tree-label" title="清空映射关系">清空映射关系</div>-->
<!--        </div>-->
        <!--删除分析函数-->
        <div v-show="!data.CHILDREN && isCurrentUser" class="tree-info" @click.stop="openTwoMenu(data, node, 'event_delete_event')">
          <div class="tree-img-set tree-btn-delete"></div>
          <div class="tree-label" title="删除">删除</div>
        </div>
        <!--开始计算-->
        <div v-show="!data.CHILDREN && !data.LINK_DIMENSION_ID && isCurrentUser" class="tree-info" @click.stop="openTwoMenu(data, node, 'eventLibrary_jisuan_event')">
          <div class="tree-img-set compute-start"></div>
          <div class="tree-label" title="开始计算">开始计算</div>
        </div>
        <div v-show="!data.CHILDREN && !data.LINK_DIMENSION_ID && isCurrentUser" class="tree-info" @click.stop="openTwoMenu(data, node, 'eventLibrary_share_event')">
        <div class="tree-img-set tree-btn-share"></div>
        <div class="tree-label" title="分享">分享</div>
      </div>
      </div>
    </div>
    <div class="df df-fd-r" v-show="data.status">
      <input
        maxlength="50"
        style="width: 100px;"
        v-model="data.NAME"
        autofocus
        :ref="'treeInput'+data.ID"
        :placeholder="inputValue"
        class="input_inner-set"
        @keyup.enter="saveTreeNode(data,node)"
      />
      <el-button size="mini" type="primary" @click="saveTreeNode(data,node)" style=" height: 20px; width: 46px;padding: 0;">保存</el-button>
      <el-button size="mini" type="default" @click="cancelTreeNode(data,node)" style=" height: 20px; width: 46px;padding: 0;">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData: this.data
    }
  },
  computed: {
    inputValue: function () { // 根据节点类型显示不同的默认值
      var inputStr = '请输入内容'
      if (this.data.nodeType === 'catalog') {
        inputStr = '请输入目录名称'
      } else if (this.data.nodeType === 'node') {
        inputStr = '请输入节点名称'
      }
      return inputStr
    },
    showTreeMore: function () {
      if (!this.data.status && this.isShowMore) { // 如果开启显示更多按钮，在判断是否自己
        if (!this.isCurrentUser) { // 不是自己
          if (this.data.CHILDREN) { // 如果是有子节点，表示自己为父节点，父节点不现实 更多 子节点显示更多
            return false
          } else {
            return true
          }
        } else {
          if (this.isShowMoreForNode) { // 子节点是否显示更多按钮的标识，true:显示，false: 隐藏
            return true
          } else if (this.isShowMoreForCatalog) { // 目录是否显示更多按钮的标识，true:显示，false: 隐藏
            if (this.data.CHILDREN) { // 目录有子节点显示，没有隐藏
              return true
            } else {
              return false
            }
          }
        }
      }
    }
  },
  props: [
    'treeRootName',
    'data',
    'node',
    'paramTwo_edit_timePoint',
    'paramTwo_edit_timeSlot',
    'paramTwo_edit_measureValue',
    'paramTwo_edit_logicalValue',
    'moduleType',
    'isShowEdit',
    'isShowDelete',
    'isShowMore',
    'isShowMoreForNode',
    'isShowMoreForCatalog',
    'isCurrentUser'
  ],
  methods: {
    addTreeNode (data, node, type) { // 新增
      // alert('x ' + JSON.stringify(data))
      // alert(type)
      console.log('addTreeNodeHandle', data, node, type)
      this.$emit('addTreeNodeHandle', data, node, type)
    },
    saveTreeNode (data, node) { // 保存编辑中的NODE
      console.log('saveTreeNodeHandle', data, node)
      this.$emit('saveTreeNodeHandle', data, node)
    },
    openTwoMenu (data, node, type) { // 打开二级菜单
      console.log('openTwoMenuHandle', data, node, type)
      this.$emit('openTwoMenuHandle', data, node, type) //  点击之后显示时间点页面等等
      this.$emit('paramTwoAddTabEdit', {enName: type, zhName: node.label}) // 点击子节点之后获取到值传过去，点击headerTwo编辑的时候动态给tab赋值
    },
    cancelTreeNode (data, node) { // 取消编辑中的NODE
      console.log('cancelTreeNodeHandle', data, node)
      this.$emit('cancelTreeNodeHandle', data, node)
    },
    editTreeNode (data, node, type) { // 编辑
      console.log('editTreeNodeHandle', data, node)
      this.$emit('editTreeNodeHandle', data, node, type)
    }
  },
  mounted () { // 点击其他目录节点时新增，则input重新获取焦点
    var self = this
    this.$nextTick(() => {
      this.$refs['treeInput' + self.data.ID].focus()
    })
  }
}
</script>
<style scoped>
  .tree-img-set {
    background-size: cover;
    width: 16px !important;
    height: 15px;
    margin: 5px 0;
  }
  .tree-img-set-link {
    background-size: cover;
    width: 16px !important;
    height: 16px;
    margin: 5px 0;
  }
  .tree-expand {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 24px;
  }
  .tree-info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .link-folder {
    background-image: url(../../assets/images/link_large_1.png);
  }
  .tree-folder {
    background-image: url(../../assets/images/icon68.png);
    margin-right: 5px;
    width: 16px;
  }
  .tree-more {
    background-image: url(../../assets/images/icon72.png);
    position: absolute;
    right: 20px;
  }
  .tree-btn-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    display: none;
  }
  .tree-expand:hover .tree-btn-group {
    display: flex;
  }
  .tree-btn {
    display: block;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 15px;
    border-radius: 2px;
    background: #FFFFFF;
    box-shadow:0px 0px 1px 1px #DDDDDD;
    display: none;
    z-index: 99;
  }
  .tree-btn-group:hover .tree-btn {
    display: block;
  }
  .tree-btn-arrow::after,.tree-btn-arrow::before {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #FFFFFF;
    position: absolute;
    top: -18px;
    content: "";
    right: 6px;
  }
  .tree-btn-arrow::before {
    border-bottom-color: #DDDDDD;
    right: 6px;
    top: -20px;
  }

  .tree-btn-plus-p {
    background-image: url(../../assets/images/icon73.png);
  }
  .tree-btn-plus-c {
    background-image: url(../../assets/images/icon74.png);
  }

  .tree-btn-bd {
    background-image: url(../../assets/images/icon55_1.png);
  }
  .tree-btn-edit {
    background-image: url(../../assets/images/icon70.png);
  }
  .tree-btn-clear-suanfa {
    background-image: url(../../assets/images/clear_1.png);
  }
  .tree-btn-add-suanfa {
    background-image: url(../../assets/images/icon107_1.png);
  }
  .tree-btn-share {
    background-image: url(../../assets/images/share_1.png);
  }
  .tree-btn-delete {
    background-image: url(../../assets/images/icon55_1.png);
  }
  .input_inner-set {
    position: relative;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    border: 1px solid #DDDDDD;
    color: #555555;
    font-size: 12px;
    padding: 0 10px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .tree-btn-point {
    background-image: url(../../assets/images/icon45_1.png);
  }
  .tree-btn-slot{
    background-image: url(../../assets/images/icon9.png);
  }
  .tree-btn-filter{
    background-image: url(../../assets/images/icon41_1.png);
  }
  /* .tree-btn-period {
     background-image: url(../../assets/images/icon93_1.png);
   }*/
  .tree-btn-metric {
    background-image: url(../../assets/images/icon93_1.png);
  }
  .tree-btn-event {
    background-image: url(../../assets/images/icon22_1.png);
  }
  .tree-btn-link {
    background-image: url(../../assets/images/link_large_1.png);
  }
  .compute-start{
    background-image: url(../../assets/images/compute_start.png);
  }
  .tree-btn-copy{
    background-image: url(../../assets/images/small_copy.png);
  }
  .tree-btn-boolean {
    background-image: url(../../assets/images/icon94_1.png);
  }
  .tree-label-1{
    margin-left: 6px;
  }
  .tree-btn-group .tree-btn .tree-label {
    padding-left: 10px;
  }
  .tree-btn-group .tree-btn .tree-info {
    text-align: left;
    margin: 0 8px;
    overflow: hidden;
  }
</style>

<script>
import CustomTree from 'components/base/CustomTree'

export default {
  name: 'data_mining',

  data () {
    return {
      pageSize: 10, // 每页显示条目数
      pagerCount: 11, // 页码按钮的数量
      totalCount: 0, // 总条目数
      dmTreeData: [], // 树数据
      defaultFileNewTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
      treeNodeToMenuItem: { // 树的一级节点对应数据源二级菜单
        'CEAIR_PROFILE': 'analysis_dataSource_profile',
        '航班信息': 'analysis_dataSource_flight'
      },
      treeKeyword: '', // 关键字搜索树数据
      treeNodeDesc: '',

      dmConfigTableData: [], // 筛选配置表格
      dmTableDataObj: {}, // 临时存储选中的筛选配置表格数据，在最后提交时使用
      regParam: '',
      elasticNetParam: '',
      t: ''
    }
  },

  watch: {
    treeKeyword (newVal, oldVal) {
      if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
        this.refreshTreeData()
      }
    }
  },

  created () {

  },

  destroyed () {

  },

  mounted () {
    this.$nextTick(() => {
      this.getTree() // dom渲染完毕加载树数据
    })
  },

  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.searchTreeData()
      }
    },
    searchTreeData () { // 关键字搜索树节点
      this.treeNodeDesc = ''
      this.getTree()
    },
    getTree () { // 获取左侧树状数据
      this.dmTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/apm/getAllTree',
        method: 'get',
        params: {
          parentId: 0,
          twoDimensionTypes: '3,4',
          searchContent: this.treeKeyword
        }
      }).then(response => {
        console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框

        let data = response.data
        if (this.$util.isNotEmptyObject(data)) {
          this.dmTreeData = data
        } else {
          this.$message({
            message: '暂无相关数据!',
            type: 'warning'
          })
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    dmNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      console.log('DM@dmNodeClick:', data)
      this.treeNodeDesc = ''

      if (!data.CHILDREN) { // || data.CHILDREN.length === 0
        if (this.dmTableDataObj[data.ID]) {
          this.$message({
            message: '配置中已经存在！',
            type: 'warning'
          })
          return false
        } else {
          const tempNodeObj = {
            id: data.ID + '_' + new Date().getTime(),
            tid: data.ID,
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

          this.dmConfigTableData.push(tempNodeObj)
          this.dmTableDataObj[tempNodeObj.id] = tempNodeObj
          this.totalCount = this.dmConfigTableData.length // 赋值分页总条数
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
          console.log('getCheckboxData~~~', response)
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
    },
    filterRowDelete (index, rows) { // 筛选配置中表格删除行
      console.log('delete', index, rows)

      delete this.dmTableDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)

      if (this.dmConfigTableData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentFilterConfigRowAttr = 1
        this.currentFilterConfigRowAttrName = ''
        this.dmTableDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      } else if (this.dmConfigTableData.length > 0) {
        this.dmConfigTableRowHandle(this.dmConfigTableData[0])
      }
    },
    dmConfigTableRowHandle (value) {
      console.log('dmConfigTableRowHandle:', value)
    },
    resetDmConditionsData (rowId, obj, filterStr, flag) {
      let tempTableData = []
      this.dmConfigTableData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.dmTableDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      this.dmConfigTableData = tempTableData // 临时数组重新复制给表格数据
    },
    assemblyDmParams () {
      if (this.$util.isNotEmptyObject(this.dmTableDataObj)) {
        let tempDm = []
        let tempDmDataObj = JSON.parse(JSON.stringify(this.dmTableDataObj))

        for (let i in tempDmDataObj) {
          let item = tempDmDataObj[i]

          tempDm.push({
            'id': item.tid,
            'type': item.type
          }) // 临时存放有数据的行
        }

        // this.$message({
        //   message: tempDm,
        //   duration: 0,
        //   showClose: true
        // })
        // alert(JSON.stringify(tempDm))

        // /dsap/apm/submitLinearRegresion?ids=[{"id":"aaa","type"="twoDimension"}]&regParam=0.1&elasticNetParam=1

        let form = document.createElement('form')
        form.style.display = 'none'
        form.action = '/dsap/apm/submitLinearRegresion'
        form.method = 'post'
        form.target = '_blank'
        document.body.appendChild(form)
        let str = JSON.stringify(tempDm)
        let reg = new RegExp('"', 'g')
        form.innerHTML = '<input name="ids" id="ids" value="' + str.replace(reg, '&quot;') + '" />'
        form.innerHTML += '<input name="regParam" id="regParam" value="' + this.regParam + '" />'
        form.innerHTML += '<input name="elasticNetParam" id="elasticNetParam" value="' + this.elasticNetParam + '" />'

        form.submit()
        form.remove()
      }
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
    }
  }
}
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.data-mining {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.data-mining .data-mining-left {
  width: 20%;
  height: 100%;
  padding-top: 15px;
  border-right: 1px solid #DDDDDD;
}

.df >>> .el-date-editor.el-input,
.df >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.data-mining-left-tree >>> .el-tree__empty-text {
  left: 15px !important;
}
.tree-head-icon {
  margin: -5px 10px 10px;
}
.tree-head-icon i {
  font-size: 20px;
  position: relative;
  top: 0;
  cursor: pointer;
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
  font-size: 14px;
  line-height: 16px;
}

.data-mining-left-tree {
  overflow: auto;
}

.dm-wrap-content {
  position: relative;
}
.dm-wrap-content .dm-wrap-content-main {
  border-right: 1px solid #DDDDDD;
}
.dm-wrap-content-main .dm-config-table {
  position: relative;
}
.dm-wrap-content-main .dm-config-table >>> .el-table::before {
  height: 0;
}
.dm-wrap-content .dm-wrap-content-right {
  width: 30%;
  height: 100%;
  overflow: auto;
}

.dm-wrap-bottom {
  border-top: 1px solid #DDDDDD;
  height: 85px;
}
.dm-wrap-bottom button {
  padding: 0;
  margin: 25px;
  float: right;
  font-size: 16px;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}
.dm-wrap-bottom .group-input-box {
  padding: 0;
  margin: 25px;
  float: left;
  font-size: 16px;
  border-radius: 4px;
  line-height: 22px;
  width: 300px;
  height: 34px;
}
.dm-wrap-bottom .group-input-box > * {
  margin-right: 10px;
}

.clearfix {
  display: table;

}

.clearfix:before, .clearfix:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}

.clearfix {
  _zoom: 1;
}
</style>

<template>
  <div class="data-mining df df-fd-r df-jc-fs">
    <div class="data-mining-left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData"></i>
        </el-input>
      </div>
      <div class="data-mining-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="dmTreeRef"
          node-key="ID"
          accordion
          highlight-current
          :data="dmTreeData"
          :props="defaultFileNewTreeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="dmNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="treeNodeDesc">说明：</span>
          <span v-show="treeNodeDesc">{{treeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <div class="df df-f1 df-fd-c">
      <div class="dm-wrap-content df df-f1 df-fd-r df-jc-fs">
        <div class="dm-wrap-content-main df-f1">
          <div class="dm-config-table w100 h100">
            <el-table
              :data="dmConfigTableData"
              style="width: 100%;"
              height="100%"
              highlight-current-row
              fit
              @row-click="dmConfigTableRowHandle"
              :header-row-class-name="headerRowClassName"
              :row-class-name="tableRowClassName">
              <el-table-column prop="name" label="参数" width="auto"></el-table-column>

              <el-table-column label="" width="50" align="center">
                <template slot-scope="scope" v-if="scope.row['type'] != 9999">
                  <div class="icon-delete tab-icon-set row-icon-group" @click.stop="filterRowDelete(scope.$index, dmConfigTableData)"></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="dm-wrap-content-right df df-fd-c"></div>
      </div>

      <div class="dm-wrap-bottom clearfix">
        <div class="group-input-box df df-fd-r">
          <el-input
            size="mini"
            placeholder="regParam"
            v-model="regParam">
          </el-input>
          <el-input
            size="mini"
            placeholder="elasticNetParam"
            v-model="elasticNetParam">
          </el-input>
        </div>

        <el-button type="primary" size="mini" @click="assemblyDmParams">提交</el-button>
      </div>
    </div>

  </div>
</template>

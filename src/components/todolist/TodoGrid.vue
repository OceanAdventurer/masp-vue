<template>
  <div class="df df-fd-c todo-wrapper">

    <div class="df df-fd-c problem-form">
      <div class="df df-fd-r w100">
        <span style="width: 80px;">问题描述</span>
        <div class="df-f1 problem-desc">
          <el-input type="textarea" :rows="3" v-model="problemDesc" placeholder="请在此输入问题描述"></el-input>
        </div>
      </div>

      <div class="df df-fd-r df-jc-fs df-ai-c mt15">
        <span style="width: 72px;">类别</span>
        <div class="type-list">
          <el-select
            v-model="todoTypeValue"
            placeholder="请选择"
            value-key="value"
            size="mini"
            clearable
          >
            <el-option
              v-for="item in todoTypes"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </div>

        <div class="btn-submit">
          <el-button type="primary" :disabled="todoTypeValue === '' || problemDesc === ''" size="mini" @click="addTodo">我要提问</el-button>
        </div>
      </div>

    </div>

    <div class="df df-fd-c df-f1">
      <div class="df df-fd-r df-jc-fe df-ai-c list-toolbar">
        <div class="show-more" @click="toggleMore">
          <a>{{ showMoreText }}</a>
        </div>

        <div class="df df-fd-r df-jc-fs df-ai-c">
          <span>类别</span>
          <div class="type-list">
            <el-select
              v-model="searchTodoTypeValue"
              placeholder="请选择"
              value-key="value"
              size="mini"
              clearable
              @change="changeSearchTodoTypeValue"
            >
              <el-option
                v-for="item in todoTypes"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="df df-fd-r df-jc-fs df-ai-c ml40">
          <span>状态</span>
          <div class="type-list" style="width: 100px;">
            <el-select
              v-model="statusValue"
              placeholder="请选择"
              value-key="value"
              size="mini"
              clearable
              @change="changeStatusValue"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="df df-fd-r ml40">
          <el-input placeholder="请输入..." size="small" v-model="todoKeyword" @keyup.enter.native="queryTodoList">
            <i slot="suffix"
              class="el-input__icon el-icon-search"
              @click="queryTodoList"
              style="font-size: 20px; position: relative; top: 0; cursor: pointer;"></i>
          </el-input>
        </div>
      </div>

      <div class="table-content df-f1">
        <el-table
          border
          highlight-current-row
          :data="todoGridTableData"
          ref="todoTable"
          height="100%"
          style="width: 100%;"
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName"
          @row-click="expandChange" :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="expandChange">
          <!-- expand：折叠面板 -->
          <el-table-column type="expand" width="30" fixed="left"><!--  v-if="false" -->
            <template slot-scope="props">
              <div>
                <span style="width: 100px;">问题描述：</span> {{ props.row.CONTENT }}
              </div>
              <div style="margin-top: 10px;">
                <span style="width: 100px;">回复：</span> {{ props.row.REPLY }}
              </div>
            </template>
          </el-table-column>

          <el-table-column key="1" type="index" label="序号" align='center' width="50"></el-table-column>
          <!-- <el-table-column key="2" prop="CONTENT" label="问题描述" min-width="180"></el-table-column> -->
          <el-table-column key="2" prop="CONTENT" label="问题描述" min-width="180">
            <template slot-scope="scope">
              <div class="ellipsis">{{ scope.row.CONTENT }}</div>
            </template>
          </el-table-column>
          <el-table-column key="3" prop="TYPE" label="类别" width="100"></el-table-column>
          <el-table-column key="4" v-if="isShowAllColumn" prop="CREATE_USER" label="提报人" width="100"></el-table-column>
          <el-table-column key="5" v-if="isShowAllColumn" prop="CREATE_TIME" label="提报时间" width="180"></el-table-column>
          <el-table-column key="6" prop="STATUS" label="状态" width="100">
            <template slot-scope="scope">
              <!-- <div :style="{'color': getStatusColor(scope.row.STATUS)}">{{ scope.row.STATUS }}</div> -->
              <div :style="{'color': statusColorNameList[scope.row.STATUS]}">{{ scope.row.STATUS }}</div>
            </template>
          </el-table-column>
          <el-table-column key="7" prop="REPLY" label="回复" min-width="180">
            <template slot-scope="scope">
              <div class="ellipsis">{{ scope.row.REPLY }}</div>
            </template>
          </el-table-column>
          <el-table-column key="8" v-if="isShowAllColumn" prop="REPLY_TIME" label="回复时间" width="180"></el-table-column>
        </el-table>
      </div>

      <div class="pagination-content">
        <el-pagination
          background
          @size-change="tableSizeChange"
          @current-change="tableCurrentChange"
          @prev-click="tableCurrentChange"
          @next-click="tableCurrentChange"
          :current-page="tableCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="tablePageSize"
          layout="sizes, prev, pager, next, total"
          :total="tablePageCount">
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'TodoGrid',
  props: { // 属性定义
    activeTabName: { // 当前激活的tab名字
      type: String
    }
  },
  data () {
    return {
      todoGridTableData: [],
      tableCurrentPage: 1,
      tablePageCount: 0,
      tablePageSize: 10,

      isShowAllColumn: false,
      problemDesc: '',
      todoTypes: [
        {
          value: 'data',
          label: '数据'
        },
        {
          value: 'paramOne',
          label: '工程参数'
        },
        {
          value: 'paramTwo',
          label: '分析参数'
        },
        {
          value: 'analysis',
          label: '分析模块'
        },
        {
          value: 'power',
          label: '权限'
        },
        {
          value: 'view',
          label: '界面'
        },
        {
          value: 'consultant',
          label: '咨询方'
        },
        {
          value: 'other',
          label: '其他'
        }
      ],
      todoTypeValue: '',
      // 数据，工程参数，分析参数，分析模块，权限，界面，咨询方，其他

      showMoreText: '显示更多',
      searchTodoTypeValue: '',
      statusList: [
        {
          value: 'submitted',
          label: '已提交'
        },
        {
          value: 'accepted',
          label: '已接受'
        },
        {
          value: 'processing',
          label: '处理中'
        },
        {
          value: 'toBeDiscussed',
          label: '待商榷'
        },
        {
          value: 'completed',
          label: '已完成'
        },
        {
          value: 'noDisposa',
          label: '不处理'
        }
      ],
      statusValue: '',

      todoKeyword: '',

      statusColorList: {
        submitted: '#9999FF',
        accepted: '#4CBCD8',
        processing: '#437ACF',
        toBeDiscussed: '#DA477F',
        completed: '#555555'
      },
      statusColorNameList: {
        '已提交': '#9999FF',
        '已接受': '#4CBCD8',
        '处理中': '#437ACF',
        '待商榷': '#DA477F',
        '已完成': '#555555'
      },
      // 已提交，已接受，处理中，待商榷，已完成

      // 获取row的key值
      getRowKeys (row) {
        return row.ID
      },
      expands: []
    }
  },
  created () {
    this.queryTodoList()
  },
  mounted () {
    this.$nextTick(() => {
      // this.queryTodoList(this.tableCurrentPage, this.tablePageSize)

      this.$refs.todoTable.doLayout()
    })
  },
  methods: {
    getStatusColor (status) {
      return this.statusColorNameList[status]
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    tableSizeChange (val) {
      this.tablePageSize = val
      this.tableCurrentPage = 1
      // this.tableCurrentChange(1)

      this.queryTodoList()
    },
    tableCurrentChange (val) {
      console.log(`第 ${val} 页`)
      this.tableCurrentPage = val

      this.queryTodoList()
    },
    changeSearchTodoTypeValue (value) {
      this.tableCurrentPage = 1

      this.queryTodoList()
    },
    changeStatusValue (value) {
      this.tableCurrentPage = 1
      this.queryTodoList()
    },
    // 初始化
    queryTodoList () {
      console.log('queryTodoList~~~: ', this.tableCurrentPage, this.tablePageSize, this.searchTodoTypeValue.label, this.statusValue.label, this.todoKeyword)
      let that = this
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')

      this.$axios({
        // url: 'todo/getTodoList?pageNo=' + this.tableCurrentPage + '&pageSize=' + this.tablePageSize
        url: 'todo/getTodoList',
        params: {
          pageNo: this.tableCurrentPage,
          pageSize: this.tablePageSize,
          type: this.searchTodoTypeValue.label,
          status: this.statusValue.label,
          searchContent: this.todoKeyword
        }
      }).then(response => {
        console.log('queryTodoList~~~:', response)

        let data = response.data
        if (that.$util.isDefine(data) && that.$util.isNotEmptyObject(data)) {
          that.todoGridTableData = data.content
          that.tablePageCount = data.recordCount
        }

        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(response => {
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        // that.$message.error('问题反馈列表数据加载失败! ')
      })
    },
    addTodo () {
      var that = this
      that.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      that.$axios({
        url: 'todo/addTodo',
        method: 'post',
        params: {
          content: this.problemDesc,
          type: this.todoTypeValue.label
        },
        headers: {
          // 'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('addTodo~~~:', response)

        if (response.data.status === '0') {
          that.$message({
            type: 'success',
            message: '提交成功!'
          })
          that.problemDesc = ''
          that.todoTypeValue = ''

          that.tableCurrentPage = 1
          that.queryTodoList()
        } else if (response.data.status === 'E1001') { // 没有登录
          that.$bus.$emit('logBackInHandle', response.data)
        } else {
          that.$message.error(response.data.message)
        }

        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(response => {
        that.$message.error('提交失败! ')
        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    toggleMore () {
      if (this.showMoreText === '显示更多') {
        this.showMoreText = '隐藏更多'
        this.isShowAllColumn = true
      } else {
        this.showMoreText = '显示更多'
        this.isShowAllColumn = false
      }
    },
    expandChange (row) {
      console.log(row)

      // this.problemDesc = row.CONTENT
      let temp = this.expands
      this.expands = []
      this.expands.push(row.ID)
      if (temp.length === 1 && temp[0] === row.ID) { // 收起展开行
        this.expands = []
      }

      this.$refs.todoTable.doLayout()
    }
  }
}
</script>
<style scoped>
.mt15 {
  margin-top: 15px;
}
.ml40 {
  margin-left: 40px;
}
.todo-wrapper {
  position: relative;
  height: 99%;
  margin: 2px 20px;
  box-sizing: border-box;
}
.problem-form {
  box-sizing: border-box;
  height: 145px;
  padding-bottom: 20px;
  border-bottom: 1px solid #DDDDDD;
}

.problem-desc >>> .el-textarea__inner {
  resize: none;
  height: 80px;
}

.type-list {
  margin-left: 8px;
}

.btn-submit {
  margin-left: auto;
}
.show-more {
  margin-right: auto;
  cursor: pointer;
}
.show-more > a {
  outline: none;
  font-size: 12px;
  color: #3A6BB9;
  text-decoration: underline;
}

.list-toolbar {
  position: relative;
  height: 70px;
  box-sizing: border-box;
}

.list-toolbar >>> .el-input__inner {
  height: 30px;
  line-height: 30px;
}

.list-toolbar > div {
  box-sizing: border-box;
}

.table-content {
  position: relative;
  width: 100%;
}
.pagination-content {
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.ellipsis {
  display: block;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.table-content >>> .el-table__expanded-cell {
  line-height: 1.4;
}
.table-content >>> .el-table__expanded-cell span {
  display: inline-block;
  text-align: right;
  font-size: 14px;
  color: #b3b2b2;
}
</style>

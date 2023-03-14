<template>
  <div class="df df-fd-r change-log-wrapper">

    <div class="df df-fd-c change-log-table">

      <div class="table-content df-f1" v-if="!timer">
        <el-table
          border
          highlight-current-row
          :data="changeLogGridTableData"
          ref="changeLogTable"
          height="100%"
          style="width: 100%;"
          @row-click="showRowContent"
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName"
          :row-key="getRowKeys">

          <!-- <el-table-column key="1" type="index" label="序号" align='center' width="50"></el-table-column> -->
          <el-table-column key="7" prop="VERSION" label="版本号" width="120"></el-table-column>
          <el-table-column key="3" prop="CREATE_TIME" label="日期" min-width="240"></el-table-column>
        </el-table>
      </div>

      <div class="pagination-content" style="display: none;">
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

    <div class="df df-fd-c change-log-content df-f1">
      <h4 style="margin-top: 0;">变更内容</h4>

      <div class="context df df-fd-c df-f1">
        <div v-for="(item, index) in contentList" :key=getKey(index)>
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ChangeLogGrid',
  props: { // 属性定义
    activeTabName: { // 当前激活的tab名字
      type: String
    }
  },
  data () {
    return {
      changeLogGridTableData: [],
      tableCurrentPage: 1,
      tablePageCount: 0,
      tablePageSize: 10,

      contentList: [],

      timer: false,
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      screenOffSetWidth: document.body.offsetWidth, // (包括边线的宽)
      screenOffSetHeight: document.body.offsetHeight, // (包括边线的宽)

      // 获取row的key值
      getRowKeys (row) {
        return row.ID
      },
      getKey (i) {
        return 'contentList' + i
      }
    }
  },
  created () {
    this.queryChangeLogList()
  },
  mounted () {
    this.$nextTick(() => {
      // this.queryChangeLogList(this.tableCurrentPage, this.tablePageSize)

      this.$refs.changeLogTable.doLayout()
    })

    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
  },
  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenWidth)

          that.timer = false
          that.$forceUpdate()
          if (that.$refs.changeLogTable) {
            that.$refs.changeLogTable.doLayout()
          }
        }, 400)
      }
    }
  },
  methods: {
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

      this.queryChangeLogList()
    },
    tableCurrentChange (val) {
      console.log(`第 ${val} 页`)
      this.tableCurrentPage = val

      this.queryChangeLogList()
    },
    showRowContent (row) {
      console.log(row)
      this.contentList = row.CONTENT.split('|')
    },
    // 初始化
    queryChangeLogList () {
      console.log('queryChangeLogList~~~: ', this.tableCurrentPage, this.tablePageSize)
      let that = this
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')

      this.$axios({
        url: 'system/changelog',
        params: {
          pageNo: this.tableCurrentPage,
          pageSize: this.tablePageSize
        }
      }).then(response => {
        console.log('queryChangeLogList~~~:', response)

        let data = response.data
        if (that.$util.isDefine(data) && that.$util.isNotEmptyObject(data)) {
          that.changeLogGridTableData = data
          that.tablePageCount = data.length

          this.contentList = data[0].CONTENT.split('|')
        }

        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(response => {
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        // that.$message.error('问题反馈列表数据加载失败! ')
      })
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
.change-log-wrapper {
  position: relative;
  height: 98%;
  margin: 2px 20px;
  box-sizing: border-box;
}

.change-log-table {
  width: 420px;
}

.change-log-content {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
.change-log-content > .context {
  min-height: 80%;
  overflow-y: auto;
}

.change-log-content > .context > div {
  font-size: 12px;
  line-height: 24px;
  margin-top: 8px;
  box-sizing: border-box;
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
.table-content >>> .el-table__body-wrapper {
  overflow-y: auto;
}
</style>

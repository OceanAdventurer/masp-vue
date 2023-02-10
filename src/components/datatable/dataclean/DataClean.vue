<template>
  <div class="pos-a w100 h100 df df-fd-c">
    <div class="df df-jc-fe mt10 mr10 mb10">
      <div>
        <el-input placeholder="请输入航班ID或FILE_NO" v-model="fltkeyword" type='number' @keyup.enter.native="searchData" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" size="small">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData" style="font-size: 24px;"></i>
        </el-input>
      </div>
    </div>
    <div class="df df-f1" style="padding: 0px 10px;">
      <el-table
        border
        :data="referenceData"
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        height="540px"
        width="100%"
        :header-row-class-name="headerRowClassName"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column prop="FLT_ID" label="航班ID"></el-table-column>
        <el-table-column prop="COLUMN_NAME" label="列名"></el-table-column>
        <el-table-column prop="CONDITIONSTR" label="处理条件"></el-table-column>
        <el-table-column prop="CREATE_TIME_STR" label="时间"></el-table-column>
      </el-table>
    </div>
    <div class="data-clean-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 20 ,30, 50]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next, total"
        :total="recodeCouont">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      fltkeyword: '',
      currentPage: 1,
      pagesize: 15,
      referenceData: [],
      recodeCouont: 0,
      selectValue: '',
      multipleSelection: []
    }
  },
  components: {
  },
  methods: {
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj['dataTable_dataClean_list'] = true
      if (this.$util.dataTableEditAuthority) {
        disabledMenuObj['dataTable_dataClean_list'] = false
      } else {
        disabledMenuObj['dataTable_dataClean_list'] = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'dataTable_dataClean', hideMenuObj, disabledMenuObj)
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    del (ids) {
      // alert(ids)
    },
    handleSizeChange (size) {
      this.pagesize = size
      this.readData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.readData()
    },
    fileNewNodeClick (data) {
      console.log(data)
    },
    tabFileNewContent (tab, event) {
      console.log(tab, event)
    },
    filterRowDelete (index, rows) { // 删除行
      console.log('delete', index, rows)
      rows.splice(index, 1)
    },
    tabFileNewRight (tab, event) {
      console.log(tab, event)
    },
    closeChartNameInput (ev) {
      console.log('ev', ev)
      this.chartName = ''
    },
    handleSelectChange (val) {
      console.log('select', val)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    searchData () {
      this.currentPage = 1
      this.readData()
    },
    readData () {
      this.$store.commit('SHOW_LOADING', '拼命加载中！')
      this.$axios({
        url: '/etl/record',
        method: 'get',
        params: {
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          keyword: this.fltkeyword
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.referenceData = response.data.data
        this.recodeCouont = response.data.count
        // 成功后的逻辑
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('加载数据失败！')
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.readData()
    })

    const that = this
    this.$bus.$on('reloadDataCleanData', () => {
      that.readData()
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('reloadDataCleanData') // 移除自定义事件监听器。
  },
  watch: {
    // fltkeyword: function (val) {
    //   var pattD = new RegExp('^[0-9]*$')
    //   var pattW = new RegExp('[^0-9]')
    //   if (!pattD.test(val)) {
    //     console.log(1)
    //     this.$nextTick(function () {
    //       this.fltkeyword = val.replace(pattW, '')
    //     })
    //   }
    // }
  }
}
</script>
<style scoped>
.data-clean-pagination {
    position: relative;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
}

.pos-a .df .el-table{
  height: 100% !important;
}
</style>

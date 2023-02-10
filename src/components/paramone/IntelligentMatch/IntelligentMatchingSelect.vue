<style scoped>
.tab_file_new {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 78vh;
  width: 100%;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #fff;
  background-color: #2A436F;
  border-color: #2A436F;
  box-shadow: -1px 0 0 0 #2A436F;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: 1px solid #DCDFE6;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
</style>
<!-- 写入公共样式文件中并引入到main.js中-->
<style>
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #fff;
  background-color: #2A436F;
  border-color: #2A436F;
  box-shadow: -1px 0 0 0 #2A436F;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: 1px solid #DCDFE6;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
.el-form-item {
  margin-bottom: 0;
}
.el-table::before {
height: 0px;
}
.el-table th>.cell{
  font-size: 12px;
}
</style>
<template>
  <!-- 工程参数主界面 -->
  <div class="tab_file_new">
    <el-form ref="form" style="width: 100%; margin: 20px 20px 20px 20px;">
      <el-table :data="tableData" highlight-current-row border
                :header-row-style="headerRowStyle" :header-cell-style="{height:'38px',padding:'5px'}" :row-style="{height:'38px'}" :cell-style="{padding:'5px'}" height="99%">
        <el-table-column prop="modelId" label="版本号"  width="200"></el-table-column>
        <el-table-column prop="modelName" label="对应机型" width="350"></el-table-column>
        <el-table-column prop="totalCount" label="原始参数个数" width="150"></el-table-column>
        <el-table-column prop="bindingScale" label="匹配度" width="150"></el-table-column>
        <el-table-column prop="progressRate" label="初始化智能匹配进度">
          <div slot-scope="scope">
            <el-progress :percentage="parseFloat(scope.row.progressRate.toFixed(2) * 100)"></el-progress>
          </div>
        </el-table-column>
        <el-table-column label="操作"  width="100">
          <div slot-scope="scope">
            <div  @click="lookDetail(scope.$index, scope.row)" title="查看详情" class="icon-pipei tab-icon-set" style="float: left"></div>
          </div>
        </el-table-column>
      </el-table>
<!--      <div class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;margin-top: 10px;">-->
<!--        <el-pagination-->
<!--          background-->
<!--          @size-change="changePageSize"-->
<!--          @current-change="getLibraryVersion"-->
<!--          :current-page="pageNo"-->
<!--          :page-sizes="[10, 15, 20, 30]"-->
<!--          :page-size="pageSize"-->
<!--          layout="sizes, prev, pager, next,total, jumper"-->
<!--          :total="totalCount">-->
<!--        </el-pagination>-->
<!--      </div>-->
    </el-form>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isExcute: false,
      userInfo: {},
      paramOneEditAuthority: false,
      headerRowStyle: {
        'color': '#2A436F',
        'font-size': '14px',
        'line-height': '16px',
        'height': '30px',
        'background': '#F9F9F9'
      },
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      tableData: []
    }
  },
  watch: {
  },
  props: [],
  mounted () {
    this.$nextTick(() => {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.userInfo = JSON.parse(window.sessionStorage.getItem('MSAP-userInfo'))
      if (this.userInfo) {
        this.setperm()
      } else {
        setTimeout(() => {
          this.setperm()
        }, 1000)
      }
      this.setMenue()
    })
    this.isExcute = true
    this.getLibraryVersion(1)
    if (this.isExcute) {
      setInterval(() => {
        this.getLibraryVersionInterval(1)
      }, 15000)
    }
  },
  methods: {
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj.intelligent_matching_select = true
      hideMenuObj.intelligent_param_matching_init = false
      hideMenuObj.intelligent_param_matching = false
      hideMenuObj.intelligent_matching_save = false
      hideMenuObj.paramOne_intelligentMatching_clear = false
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_intelligentMatching', hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    setperm () {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('MSAP-userInfo'))
      for (let i = 0; i < this.userInfo.menuList.length; i++) {
        if (this.userInfo.menuList[i]['ID'] === '7001' || this.userInfo.menuList[i]['ID'] === 7001) { // 如果是7001 则表示有工程参数编辑权限
          this.paramOneEditAuthority = true
          break
        }
      }
    },
    // 查询版本库
    getLibraryVersion (pageNo) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/paramSimilarity/bindingStatistics', {params: {}}).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        this.tableData = response.data
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    },
    // 定時器
    getLibraryVersionInterval (pageNo) {
      if (this.isExcute) {
        this.$axios.get('/paramSimilarity/bindingStatistics', {params: {}}).then(response => {
          this.tableData = response.data
        }).catch(response => {
        })
      }
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.getLibraryVersion(1)
    },
    lookDetail (inde, row) {
      this.$bus.$emit('paramOneAddTab', {enName: 'intelligent_matching_list', zhName: row.modelId, isClosable: true, parent: 'paramOne_intelligentMatching', count: 0, data: row, paramOneEditAuthority: this.paramOneEditAuthority})
    }
  }
}
</script>

<template>
  <div class="model_run_time w100 h100">
    <div class="model_type_title">
      模型类别：<el-select v-model="modelType"  @change='queryTable'>
        <el-option
           v-for='item in typeList'
           :key='item.code'
           :label='item.name'
           :value="item.code"
        >
          {{item.name}}
        </el-option>
      </el-select>
      <!-- <el-radio-group v-model="modelType" v-for='item in typeList' :key='item.code' @input='queryTable'>
        <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
      </el-radio-group> -->
    </div>
    <!-- v-if='onlineModelList.length > 0' -->
    <div class="manager-table df df-fd-r w100" id="managerTableRef" >
        <el-table
          ref="managerTableCon"
          :data="onlineModelList"
          height="100%"
          width="100%"
          border
          highlight-current-row
          fit>
          <el-table-column prop="modelName" label="模型名称" align="left"></el-table-column>
          <!-- <el-table-column prop="modelType" label="分析类型" align="left"></el-table-column> -->
          <el-table-column prop="modelState" label="模型状态" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                {{scope.row.modelState === '70' ? '已上线' : scope.row.modelState}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="modelUser" label="提交人" align="left"></el-table-column>
          <!-- <el-table-column prop="onlineTime" label="上线时间" width="160"></el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="opt_col">
                <span @click="checkDetail(scope.row)">查看模型</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="model_run_time_table_pagination df df-jc-fe df-ai-c">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      onlineModelList: [],
      modelType: '',
      typeList: [],
      pageSize: 20,
      pageNo: 1,
      total: 0
    }
  },
  components: {},
  created () {
    this.getTypeList()
    this.modelType = '0001'
  },
  mounted () {
    this.queryTable()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageNo = val
      this.queryTable()
    },
    getTypeList () {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/modelMotion/getModelCategory',
        method: 'get'
        }).then(res => {
        if (res.status === 200) {
          let list = res.data || []
          this.typeList = list
        } else {
          this.$message.error('操作失败，请稍后重试！')
        }
        this.$store.commit('HIDE_LOADING', '加载中！')
      }).catch(err => {
        console.log(err)
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    checkDetail (row) {
      this.$bus.$emit('sendingInfo', {
        treeType: row.treeType,
        treeNode: row.treeNode,
        treeName: row.treeName,
        name: row.modelName,
        type: 'detail'
      })
    },
    queryTable (val) {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/modelMotion/showModelPageList',
        method: 'post',
        data: {
          categoryType: this.modelType,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        }).then(res => {
        if (res.status === 200) {
          this.onlineModelList = res.data.content || []
          this.pageNo = res.data.pageNo
          this.pageSize = res.data.pageSize
          this.total = res.data.recordCount
        } else {
          this.onlineModelList = []
          this.$message.error('操作失败，请稍后重试！')
          this.pageNo = 1
          this.pageSize = 20
          this.total = 0
        }
        this.$store.commit('HIDE_LOADING', '加载中！')
      }).catch(err => {
        console.log(err)
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
      this.$bus.$off('sendingInfo') // 移除自定义事件监听器。
    }
  }
}
</script>
<style scoped>
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
.model_run_time {
  padding: 0 10px;
  box-sizing: border-box;
}
.model_run_time .model_type_title {
  padding-left: 5px;
  height: 54px;
  line-height: 54px;
}
.model_run_time .model_type_title .el-radio-group {
  margin-right: 10px;
}
.model_run_time .manager-table {
  width: 100%!important;
  height: calc(100% - 135px);
  margin: 0;
}
.model_run_time .model_run_time_table_pagination {
  margin-top: 10px;
}
</style>
<style>
.model_run_time .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #437ACF;
  border-color: #437ACF;
}
</style>

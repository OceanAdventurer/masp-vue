<template>
  <div class="model_run_time w100 h100">
    <div class="model_type_title">
      <el-radio-group v-model="modelType" v-for='item in typeList' :key='item.code' @input='queryTable' size="small">
        <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
      </el-radio-group>
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
          <!-- :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName" -->
          <el-table-column prop="modelName" label="模型名称" align="left"></el-table-column>
          <!-- <el-table-column prop="modelType" label="分析类型" align="left"></el-table-column> -->
          <el-table-column prop="modelState" label="模型状态" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                {{scope.row.modelState === '70' ? '已上线' : '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="modelUser" label="提交人" align="left"></el-table-column>
          <!-- <el-table-column prop="onlineTime" label="上线时间" width="160"></el-table-column> -->
          <el-table-column label="操作" width="150" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                <el-button class="opt-button" size="mini" round @click="checkDetail(scope.row)">查看模型</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="model-approve-table-pagination df df-jc-fe df-ai-c">
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
const ModelApprove = () => import('components/modelRuntime/ModelApprove')

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
  components: {
    ModelApprove
  },
  created () {
    this.getTypeList()
    this.modelType = '0001'
  },
  mounted () {
    this.$bus.$on('modelRuntimeMenu', (val) => {
      this.queryTable()
    })
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
        type: 'view'
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
  .model_run_time .model_type_title {
    padding: 20px 10px ;
  }
  .model_run_time .model_type_title .el-radio-group {
    margin-right: 10px;
  }
  .model_run_time .manager-table {
    min-height: 300px;
    height: calc(100% - 150px);
  }
</style>

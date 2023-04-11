<template>
  <div class="safe_content w100 h100">
    <div class="model_type_title">
      <el-radio-group v-model="modelType" v-for='item in typeList' :key='item.code' @change='queryTable'>
        <el-radio-button :label="item.name" ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="manager-table df df-fd-r" id="managerTableRef" v-if='onlineModelList.length > 0'>
        <el-table
          ref="managerTableCon"
          :data="onlineModelList"
          height="100%"
          width="100%"
          highlight-current-row
          fit>
          <!-- :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName" -->
          <el-table-column prop="NAME" label="名称" width="auto" align="left"></el-table-column>
          <el-table-column prop="TYPE" label="分析类型" width="90" align="left"></el-table-column>
          <el-table-column prop="CREATETIME" label="修改日期" align="left" width="160"></el-table-column>
          <!-- <el-table-column label="操作" width="150" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                <div class="icon-edit tab-icon-set mr10" title="编辑分析" v-show="scope.row.modelState == '' || scope.row.modelState == '待审批'" @click="managerRowEdit(scope.row)"></div>
                <div class="icon-view tab-icon-set mr10" title="提交分析" @click="managerRowView(scope.row)"></div>
                <div class="icon-copy tab-icon-set mr10" title="复制分析" @click="managerRowCopy(scope.row)"></div>
                <div class="el-icon-upload tab-icon-set mr10" title="发布分析" v-show="scope.row.modelState == ''" @click="managerRowPublish(scope.row)"></div>
                <div class="el-icon-document tab-icon-set mr10" title="审批详情" v-show="scope.row.modelState == '待审批'" @click="managerRowDetail(scope.row)"></div>
                <div class="icon-delete tab-icon-set mr10" title="删除分析" v-show="scope.row.modelState == ''" @click="managerRowDelete(scope.$index, managerTableData)"></div>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
  </div>
</template>
<script>
const ModelApprove = () => import('components/modelRuntime/ModelApprove')

export default {
  data () {
    return {
      onlineModelList: [],
      modelType: '0001',
      typeList: []
    }
  },
  components: {
    ModelApprove
  },
  created () {
      this.getTypeList()
  },
  mounted () {
    this.$bus.$on('modelRuntimeMenu', (val) => {
      this.tabName = val
      this.queryTable()
    })
  },
  methods: {
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
    queryTable () {
      let modelType = this.modelType
      console.log(modelType, 'v---test')
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
</style>

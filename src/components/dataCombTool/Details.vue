
<template>
  <div class="data_verification w100 h100">
    <Loading v-show="showLoading"></Loading>
    <el-form ref="filtersRef" :model= "filtersForm" :rules="filtersRules" label-width="80px">
      <el-row>
        <el-col :span=8>
          <el-form-item label="版本库" prop="modelId">
            <el-select
              v-model="filtersForm.modelId"
              @change='queryTableInfo'
              filterable
              multiple
              placeholder="请选择版本库"
            >
              <el-option
                v-for="item in versionLibraryList"
                :key="item.ID"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=9>
          <el-form-item label="查询字段" prop="paramName" class='fixCol'>
            <el-select v-model="filtersForm.searchNames" multiple placeholder="请选择字段名">
              <el-option
                v-for="item in queryNameList"
                :key="item.value"
                :value="item.label">
              </el-option>
            </el-select>
            <el-input v-model="filtersForm.paramName" placeholder="请输入参数名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=4>
          <el-form-item label="匹配范围" prop="matchRange">
            <el-select v-model="filtersForm.matchRange" value-key='label' placeholder="请选择匹配范围">
              <el-option
                v-for="item in matchOptions"
                :key="item.value"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=2 :offset="1">
          <el-button type='primary' icon="el-icon-search" @click="queryTableInfo">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="table_container">
      <div class="table_content">
        <div class="table_wrapper">
          <el-table
            :row-style="{height:'38px'}"
            :cell-style="{height:'38px'}"
            :cell-class-name="getCellClassName"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            :data="paramTableData"
            height="100%"
            stripe
            @cell-click='checkDetail'
            fit
            border
            :header-row-class-name="headerRowClassName"
            :row-class-name="tableRowClassName">
            <el-table-column prop="NAME_IN_CSV" label="参数名" show-overflow-tooltip min-width="80"></el-table-column>
            <el-table-column prop="CHINESE_NAME" label="中文名" show-overflow-tooltip min-width="80"></el-table-column>
            <el-table-column prop="DESCRIPTION" label="描述" min-width="120">
            </el-table-column>
            <el-table-column
              v-for="(col, idx) in filtersForm.modelId"
              :key='idx' :label="col+''"
              min-width="100">
              <template slot-scope="scope">
                <div class="row-icon-group icon_bind" v-if='scope.row[col] && scope.row[col].gpId'>
                    <!-- <div>{{scope.row[col].gpId}}</div> -->
                  <el-button @click.stop='clickShowDia(scope, "unconnect")' icon='el-icon-scissors'>解绑</el-button>
                </div>
                <div class="row-icon-group icon_bind" v-else-if='scope.row[col] && scope.row[col].paramId'>
                  <el-button @click.stop='handleBinding(scope)' icon='el-icon-connection'>绑定</el-button>
                </div>
                <div class="row-icon-group icon_bind" v-else-if='scope.row[col] && !scope.row[col].paramId'>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail_content h100">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{pparName}}详情</span>
              <el-button type="primary" icon="el-icon-top-right" @click="goCheck">去验证</el-button>
            </div>
            <div v-for="detail in paramDetailList" :key="detail.value" class="text item">
              {{detail.label}}：{{detail.value}}
            </div>
          </el-card>
        </div>
      </div>
    <el-form ref="gpFiltersRef" :model= "gpFiltersForm" label-width="100px">
      <el-row>
        <el-col :span=6>
          <el-form-item label="工程参数名" prop="gpParamName">
            <el-input v-model="gpFiltersForm.gpParamName" placeholder="请输入工程参数名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=2 :offset="1">
          <el-button type='primary' icon="el-icon-search" @click="queryGpTableInfo">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
      <div class="table_content gp_table">
        <div class="table_wrapper">
          <el-table
            ref='selectTable'
            :data="engineeringTableData"
            :key='toggleIndex'
            fit
            border
            stripe
            highlight-current-row
            @row-click='handleSelectionChange'
            @current-change="handleCurrentChange"
            :row-class-name="tableRowClass">
            <el-table-column label='单选' width="55">
              <template slot-scope="scope">
                <el-radio v-model='selectedVal' :label='scope.row.ID'>&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="GP_NAME" label="参数名"></el-table-column>
            <el-table-column prop="GP_CHINESE_NAME" label="描述" width="280"></el-table-column>
            <el-table-column  v-for="(col, idx) in filtersForm.modelId" :key='idx' :label="col+''">
              <template slot-scope="scope">
                <div class="row-icon-group">
                  <div>{{scope.row[col]}}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail_content h100">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{selectedData.name}}详情</span>
            </div>
            <div class="text item">
              <!-- <p>ID：{{selectedData.gpId}}</p> -->
              <p>单位：{{selectedData.UNIT}}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <!-- 取消绑定对话框 -->
      <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">
        <span>是否确定解绑？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleBinding(rowData, 'unconnect')">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
const Loading = () => import('components/base/Loading')
/* eslint-disable */
export default {
  name: 'Details',
  data () {
    return {
      filtersForm: { // 筛选条件集合
        modelId: [], // 版本库字段
        paramName: '', // 参数名称
        searchNames: [], // 查询字段
        matchRange: '模糊'
      },
      gpFiltersForm: {
        gpParamName: ''
      },
      dialogVisible: false,
      rowData: {},
      options: [],
      versionLibraryList: [], // 版本库列表，后端获取
      queryNameList: [
        {label: '参数名', value: 'paramName'},
        {label: '中文名', value: 'chName'},
        {label: '描述', value: 'desc'}
      ],
      matchOptions: [
        {label: '头部', value: 1},
        {label: '尾部', value: 2},
        {label: '精确', value: 3},
        {label: '模糊', value: 4}
      ],
      filtersRules: { // 必填规则
        modelId: [
          { required: true, message: '请选择版本库', trigger: 'change' }
        ],
        paramName: [
          { required: true, message: '请输入参数名', trigger: 'blur' }
        ],
        matchRange: [
          { required: true, message: '请选择匹配范围', trigger: 'change' }
        ]
      },
      paramDetailList: [],
      pparName: null, // 参数名
      engineeringTableData: [], // 工程参数表格数据
      paramTableData: [], // 参数列表
      slectedModel: '', // 选中的版本库跳转页面
      slectedPara: '', // 选中的参数跳转页面
      toggleIndex: 0, // 表格新增、删除列避免样式错乱
      labelList: [
        {'chName': '描述', 'enName': 'ppar_description'},
        {'chName': '单位', 'enName': 'ppar_units'},
        {'chName': '频率', 'enName': 'ppar_update_rate'},
        {'chName': '最大值', 'enName': 'ppar_word_range_max'},
        {'chName': '最小值', 'enName': 'ppar_word_range_min'}
        ],
        selectedData: {}, //选中的工程参数数据
        selectedRow: [], //被选中的行
        selectedVal: '', // 选中行的值
        colId: '' // 选中单元格id 避免反复点击反复调接口
    }
  },
  computed: {
    ...mapState(['showLoading'])
  },
  components: {
    Loading
  },
  created () {},
  mounted () {
    this.queryLibraryList()
    // this.filtersForm.modelId = [1043, 1615, 10357]
    // this.filtersForm.paramName = 'RAL*'
  },
  methods: {
    getCellClassName({column}) {
      if (column.label === '描述') {
        return 'desc'
      } else {
        return ''
      }
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    tableRowClass ({row, rowIndex}) { // 表格行样式
      row.index = rowIndex
      return 'table-row-class'
    },
    goCheck () { // 点击去验证，跳转到验证页面
      if (this.slectedModel && this.slectedPara) {
        window.open(`/pm/index.html#/dataVerify?modelId=${this.slectedModel}&paramName=${this.slectedPara}`, '_blank')
      } else {
        this.$message.warning('请选择一个参数')
      }
    },

    clickShowDia(col) {
      this.rowData = {}
      this.dialogVisible = !this.dialogVisible
      this.rowData = col
    },
    handleBinding ({row, column}, unconnect) { // 进行绑定操作
      const {label, gpId, name} = this.selectedData
      if(!gpId && !unconnect) {
        this.$message.error('请先选择要绑定的工程参数')
        return
      }
      let paramId = row[column.label].paramId
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        baseURL: '/pm',
        url: '/parameterMatching/bingGp',
        method: 'get',
        params: {
          gpId: unconnect ? '' : gpId,
          paramId
        }
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '加载中！')
        if (res.status === 200) {
          this.$message.success("操作成功")
          this.selectedData = {}
          this.selectedRow = []
          this.selectedVal = ''
          this.dialogVisible = false
          this.queryTableInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求响应失败，请稍后重试！')
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    checkDetail (row, col, cell, e) { // 点击单元格查询参数详情
      const {modelId} = this.filtersForm
      const {NAME_IN_CSV:name} = row
      let label = Number(col.label) || '' // 版本库名称
      if (modelId.includes(label)) { // 判断当前选中的单元格是否是版本库列
        this.pparName = name
        this.slectedModel = label // 选中单元格验证所需参数
        this.slectedPara = name // 选中单元格验证所需参数
        if (this.colId === row[label].paramId) { // 阻止反复点击同一参数查询详情
          return
        }
        if (!row[label].paramId) { // 阻止反复点击同一参数查询详情
          this.paramDetailList = [{label: '版本库', value: label}]
          return
        }
        this.colId = row[label].paramId
        this.$store.commit('SHOW_LOADING', '加载中...')
        this.$axios({
          baseURL: '/pm',
          url: '/parameterMatching/searchParamDetailByAlpha',
          method: 'get',
          params: {
            modelId: label,
            paramName: this.pparName
          }
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '加载中！')
          if (res.status === 200) {
            this.toggleIndex++
            const {data={}} = res
            if (data.ppar_name) {
              let list = []
              for (let o in data) {
                if (o === 'ppar_name') {
                  this.pparName = data[o]
                } else {
                  list.push({label: o, value: data[o]})
                }
              }
              let arr = []
              list.forEach(item => {
                this.labelList.forEach(label => {
                  if (item.label === label.enName) {
                    arr.push({label: label.chName, value: item.value})
                  }
                })
              })
              arr.unshift({label: '版本库', value: label})
              this.paramDetailList = arr
            } else {
              this.paramDetailList = [{label: '版本库', value: label}]
            }
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('请求响应失败，请稍后重试！')
          this.$store.commit('HIDE_LOADING', '加载中！')
        })
        }
    },
    queryLibraryList () { // 查询版本库列表
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        baseURL: '/pm',
        url: '/parameterMatching/getModels',
        method: 'get'
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '加载中！')
        if (res.status === 200) {
          const {data = []} = res
          this.versionLibraryList = data
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求响应失败，请稍后重试！')
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    queryTableInfo (val) { // 查询参数列表数据
      if (this.filtersForm.modelId.length === 0) {
        this.resetTableInfo() // 清空所有数据
      }
      this.$refs['filtersRef'].validate(valid => {
         if (valid) { // 查询table数据
            let para = this.filtersForm.modelId.join(',')
            let nameList = []
            this.filtersForm.searchNames.forEach(item => {
              this.queryNameList.forEach(name => {
                if (item === name.label) {
                  nameList.push(name.value)
                }
              })
            })
            let typeNum = this.filtersForm.matchRange === '头部' ? 1 : this.filtersForm.matchRange === '尾部' ? 2 :
              this.filtersForm.matchRange === '精确' ? 3 : 4
            let searchNames = nameList.join(',')
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              baseURL: '/pm',
              url: '/parameterMatching/searchParamBindingStatus',
              method: 'get',
              params: {
                pattern: this.filtersForm.paramName,
                modelIds: para,
                searchNames,
                type: typeNum
              }
            }).then(res => {
              if (res.status === 200) {
                const {data = []} = res
                this.paramTableData = data || []
              } else {
                this.paramTableData = []
              }
              this.$store.commit('HIDE_LOADING', '加载中！')
            }).catch(err => {
              console.log(err)
              this.paramTableData = []
              // this.$message.error('请求响应失败，请稍后重试！')
              this.$store.commit('HIDE_LOADING', '加载中！')
            })
          } else {
            console.log('error submit!!')
            return false
          }
      })
    },
    queryGpTableInfo () {
      this.$refs['gpFiltersRef'].validate(valid => {
         if (valid) { // 查询table数据
            let para = this.filtersForm.modelId.join(',')
            console.log(para, 'para-----test');
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              baseURL: '/pm',
              url: '/parameterMatching/getGpBindStatus',
              method: 'get',
              params: {
                pattern: this.gpFiltersForm.gpParamName,
                modelIds: para
              }
            }).then(res => {
              if (res.status === 200) {
                const {data = []} = res
                this.engineeringTableData = data || []
              } else {
                this.engineeringTableData = []
              }
              this.$store.commit('HIDE_LOADING', '加载中！')
            }).catch(err => {
              console.log(err)
              this.engineeringTableData = []
              this.$store.commit('HIDE_LOADING', '加载中！')
            })
          } else {
            console.log('error submit!!')
            return false
          }
      })
    },
    resetTableInfo () {
      this.paramTableData = []
      this.engineeringTableData = []
      this.slectedModel = ''
      this.slectedPara = ''
      this.paramDetailList = []
      this.pparName = ''
      this.selectedData = {}
    },
    handleCurrentChange (val) { // 高亮选中行
      this.currentRow = val
    },
    handleSelectionChange (a, b) { // 选中工程参数某一行，进行绑定操作
      let label = b.labelName
      const {GP_NAME: name, ID:gpId, UNIT} = a
      label = label === '单选' ? this.filtersForm.modelId[0] : label
      this.selectedVal = gpId
      this.selectedRow = this.engineeringTableData.filter((item) => item.gpId === gpId)
      this.selectedData = {label, gpId, name, UNIT} 
    }
  },
  destroyed () {}
}
</script>
<style scoped>
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
.data_verification {
  padding: 4px;
  box-sizing: border-box;
}
.data_verification .icon_bind .el-button {
  width: 60px;
  height: 28px;
  padding: 0;
  /* background: url('../../assets/images/binding.png') center no-repeat; */
}
.data_verification .el-form-item__content .el-select {
  width: 100%;
}
.data_verification .table_container {
  height: calc(100% - 80px);
}
.data_verification .table_container h6 {
  background-color: rgba(48, 66, 108, 0.1);
  padding: 10px 4px;
  margin: 0;
  margin-bottom: 4px;
}
.data_verification .table_container .table_content {
  display: flex;
  height: calc(60% - 15px);
  margin-bottom: 5px;
  /* margin-bottom: 4px; */
}
.data_verification .table_container .table_content.gp_table {
  margin-bottom: 4px;
  height: calc(40% - 10px);
}
.data_verification .el-form .el-row .el-col .el-form-item {
  margin-bottom: 16px;
}
.data_verification .table_container .el-form .el-row .el-col .el-form-item {
  margin-bottom: 5px; 
}
/* .data_verification .table_container .el-form .el-row {
  background-color: rgba(48, 66, 108, 0.1);
} */
.data_verification .table_container .table_content .table_wrapper {
  height: 100%;
  width: calc(100% - 310px);
}
.data_verification .table_container .table_content .detail_content {
  box-sizing: border-box;
  width: 310px;
  padding-left: 4px;
}
.data_verification .table_container .table_content .detail_content .el-card {
  height: 100%;
}
.data_verification .table_container .table_content .detail_content .el-card .el-card__header {
  height: 46px;
  padding: 10px 20px;
}
.data_verification .table_container .table_content .detail_content .el-card .el-card__header .clearfix {
  height: 25px;
  line-height: 25px;
}
.data_verification .table_container .table_content .detail_content .el-card .el-card__header .clearfix span {
  font-weight: 700;
}
.data_verification .table_container .table_content .detail_content .el-card .el-button {
  float: right;
  padding: 5px 8px;
}
.data_verification .table_container .table_content .detail_content .el-card .el-card__body .text {
  margin: 15px 0;
}
.data_verification .el-button--primary.is-active, .el-button--primary:active,
.data_verification .el-button--primary:focus {
  background-color: #2A436F;
  border-color: #2A436F;
  background: #2A436F;
}
.data_verification .icon_bind .el-button.is-active, .el-button:active,
/* .data_verification .el-button:focus, */
.data_verification .el-button:hover {
  border-color: #2A436F;
  background: #fff;
  color: #2A436F;
}
.data_verification .icon_bind .el-button:focus {
  border: 1px solid #DCDFE6;
  background: #fff;
  color: #606266;
}
/* .row-icon-group:hover {
  line-height: 38px!important;
} */
</style>
<style>
.data_verification .el-table__body-wrapper td {
  /* height: 24px; */
}
.data_verification .el-form .el-row .el-col .fixCol .el-form-item__content {
  display: flex;
}
.data_verification .el-form .el-row .el-col .fixCol .el-form-item__content .el-select {
  flex: 3;
  margin-right: 5px;
}
.data_verification .el-form .el-row .el-col .fixCol .el-form-item__content .el-input {
  flex: 1;
}
.data_verification .el-table__body-wrapper {
  height: calc(100% - 38px)!important;
  overflow: auto;
  /* height: 100%; */
}
.data_verification .table_container .table_content .table_wrapper .el-table .el-table__body-wrapper .el-table__body .el-table__row td {
  padding: 0;
}
.data_verification .table_container .table_content .table_wrapper .el-table {
  height: 100%;
}
/* .data_verification .table_container .table_content .table_wrapper .el-table .el-table__body-wrapper {
  overflow: auto;
} */
.data_verification .table_container .table_content .table_wrapper .el-table .el-table__body-wrapper .el-table__body .el-table__row td.desc .cell {
  /* overflow-x: scroll;
  word-break: break-all;
  white-space: pre;
  text-overflow: unset; */
  /* height: 38px;
  line-height: 38px!important; */
}
.data_verification .table_container .table_content .table_wrapper .el-table .el-table__body-wrapper .el-table__body .el-table__row td .cell {
  /* overflow-x: scroll;
  word-break: break-all;
  white-space: pre;
  text-overflow: unset;
  height: 38px;
  line-height: 38px!important; */
  /* overflow: hidden; tooltip样式，配合show-overflow-tooltip属性使用 */
  /* white-space: nowrap; tooltip样式，配合show-overflow-tooltip属性使用 */
  /* text-overflow: ellipsis; tooltip样式，配合show-overflow-tooltip属性使用 */
}
.data_verification .table_container .table_content .table_wrapper .el-table .el-table__body-wrapper .el-table__body .el-table__row td .cell:hover {
  /* line-height: 38px!important; */
}
/* .el-table .el-table__body tr:hover div.row-icon-group,
 .table-row-class-name.current-row div.row-icon-group {
  line-height: 38px!important;
  white-space: nowrap;
  display: block;
} */
/* .el-table .el-table__body div.row-icon-group {
  white-space: nowrap;
}
 .table-row-class-name.current-row div.row-icon-group {
  line-height: 38px!important;
  white-space: nowrap;
  display: block;
} */
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: rgba(173, 171, 171, 0.5);
    border-radius: 20px;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: rgba(173, 171, 171, 0);
}

</style>
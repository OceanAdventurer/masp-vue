<style scoped>
.tab_file_new {
  height: 78vh;
  padding-left: 20px;
  padding-right: 20px;
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
.el-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
  width: 19%;
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
.el-form-item {
  margin-bottom: 0;
}
.el-table::before {
  height: 0px;
}
.gccsm:hover>select {
  display: block;
}
td .el-input__inner {
  border: none;
}
td [class*=" el-icon-"], [class^=el-icon-] {
  /* font-family: element-icons!important; */
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<template>
  <!-- 工程参数主界面 -->
  <div class="tab_file_new">
    <el-form ref="form" :model="formData" style=" margin: 5px 10px 20px 10px;height: 97%;">
      <!--      <el-form-item label="当前版本库:" style="width: 20%"  label-width="90px">-->
      <!--        <el-input v-model="libraryVersion" size="mini" readonly="readonly"></el-input>-->
      <!--      </el-form-item>-->
      <el-radio-group v-model="unbind" style="width: 50%; float:left;margin-bottom: 10px;margin-top: 10px;" size="mini">
        <el-radio-button label="1">未匹配</el-radio-button>
        <el-radio-button label="2">已匹配</el-radio-button>
      </el-radio-group>
      <el-form-item label="推荐绑定方式："  label-width="130px" style="width: 45%;float: right;">
        <el-select v-model="bindingWay" placeholder="请选择" size="mini" multiple style="width: 65%">
          <el-option
            v-if="item.value !== 'MANUAL_MATCH'"
            v-for="item in libraryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="keyword" placeholder="请输入关键字搜索" size="mini" @keyup.enter.native="queryData(1)" style="width: 33%">
          <i class="el-icon-search el-input__icon"  slot="suffix"  @click="queryData(1)"> </i>
        </el-input>
      </el-form-item>
      <el-table :data="tableData"  :header-row-style="headerRowStyle" :header-cell-style="{height:'38px'}" border
                @selection-change="selectionChange"   @row-click="rowClick" :row-class-name="tableRowClassName"
                :row-style="{height:'35px'}" :cell-style="{padding:'5px'}" height="85%">
        <el-table-column  type="selection"  width="55"></el-table-column>
        <el-table-column prop="mdName" label="原始参数名"  width="200"></el-table-column>
        <el-table-column prop="description" label="原始参数描述"></el-table-column>
        <el-table-column prop="gpName" label="工程参数名" class="gccsm" width="200">
          <div slot-scope="scope" >
            <!--没有绑定并且点击匹配的时候显示下拉框-->
            <div v-if="unbind === 1 || unbind === '1'">
              <el-select
                remote
                reserve-keyword
                :remote-method="getGongchengParamList"
                @change="changeGp(scope.$index, scope.row.gpName)"
                :loading="loading"
                filterable clearable
                v-model="scope.row.gpName"  placeholder="请选择" size="mini">
                <el-option    v-for="item in searchGpList"  :key="item.GPID"  :label="item.GPNAME"  :value="item.GPNAME">  </el-option>
              </el-select>
            </div>
            <div v-else> {{scope.row.gpName}}</div>
          </div>
        </el-table-column>
        <el-table-column prop="gpDescription"  label="工程参数名描述" > </el-table-column>
        <el-table-column prop="similarityDesc"  label="推荐绑定方式" width="120">
          <div slot-scope="scope">
            {{libraryListMap[scope.row.similarityDesc]}}
          </div>
        </el-table-column>
        <el-table-column  prop="similarity" label="可信度" width="80"> </el-table-column>
        <el-table-column prop="" label="新增参数" width="80" v-if="(unbind === 1 || unbind === '1') && this.paramOneEditAuthority1 === true">
          <div slot-scope="scope">
            <div title="新增参数" @click="addGongChengParam(scope.$index, scope.row)" class="el-icon-plus tab-icon-set" style="float: left"></div>
          </div>
        </el-table-column>
      </el-table>
      <div class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;height: 10%;">
        <el-pagination
          background
          @size-change="changePageSize"
          @current-change="queryData"
          :current-page="pageNo"
          :page-sizes="[50, 100, 150,200,300]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,total, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-form>
    <el-dialog
      title="新增工程参数"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="dialogFormData">
        <el-form-item label="工程参数名称:" style="width: 100%"  label-width="120px">
          <el-input v-model="dialogFormData.gongchengparam" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="对应目录:" style="width: 100%;"  label-width="120px">
          <!--          <el-input  v-model="mineStatus"  placeholder="请选择" >-->
          <!--            <el-tree-->
          <!--              :default-expanded-keys="expandedKeys"-->
          <!--              :data="gongchengData" node-key="ID" :props="defaultTreeProps" highlight-current-->
          <!--              @node-click="handleNodeClick"  :render-content="renderContent"  @check-change="handleCheckChange"-->
          <!--              ref="tree">-->
          <!--            </el-tree>-->
          <!--          </el-input>-->
          <el-select v-model="dialogFormData.catalogName" placeholder="请选择"  collapse-tags @change="selectChange" size="mini" style="width: 100%;">
            <el-option  :value="dialogFormData.catalogId" :label="dialogFormData.catalogName" style="height: 200px;overflow-y: auto ">
              <el-tree
                :default-expanded-keys="expandedKeys"
                :data="gongchengData" node-key="ID" :props="defaultTreeProps" highlight-current
                @node-click="handleNodeClick"  :render-content="renderContent"  @check-change="handleCheckChange"
                ref="tree">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工程参数描述:" style="width: 100%"  label-width="120px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="dialogFormData.description">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGongCheng">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  data () {
    return {
      tableCurrentIndex: 0,
      loading: false,
      searchGpList: [],
      isPiPei: false,
      gongchengData: [],
      expandedKeys: [], // 需要展开的数组
      dialogFormData: {
        // gongchengparamId: '',
        gongchengparam: '',
        description: '',
        catalogId: '',
        catalogName: ''
      },
      tableIndex: 0,
      dialogVisible: false,
      headerRowStyle: {
        'color': '#2A436F',
        'background': '#F9F9F9'
      },
      hideMenuObj: {},
      disabledMenuObj: {},
      selectData: [],
      keyword: '',
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      matching: {},
      pageSize: 100,
      pageNo: 1,
      totalCount: 0,
      unbind: 1, // unbind Boolean 否 是否只显示未绑定工程参数的原始参数项 true
      libraryVersion: '',
      paramOneEditAuthority1: false,
      libraryList: [],
      libraryListMap: {},
      bindingWay: '',
      tableData: [], // 需要显示到界面的
      AfterNatchingData: [], // 匹配后的源数据
      formData: {
        currentLibrary: ''
      }
    }
  },
  watch: {
    unbind () {
      this.keyword = ''
      this.bindingWay = ''
      this.setMenue()
      this.queryData(1)
    },
    bindingWay () {
      if (this.unbind === 1 || this.unbind === '1') {
        this.bindWaySelect()
      } else {
        this.queryData(1)
      }
    }
  },
  props: ['currentLibraryVersion', 'matchingData', 'paramOneEditAuthority'],
  mounted () {
    this.$bus.$off('intelligent_param_matching') // 移除自定义事件监听器。
    this.$bus.$off('intelligent_matching_save') // 移除自定义事件监听器。
    this.$bus.$off('paramOne_intelligentMatching_clear') // 移除自定义事件监听器。
    this.$bus.$off('intelligent_param_matching_init') // 移除自定义事件监听器。
    this.matching = this.matchingData
    this.libraryVersion = this.currentLibraryVersion
    this.paramOneEditAuthority1 = this.paramOneEditAuthority
    this.setMenue()
    this.similarityTypeSelect()
    this.queryData(1)
    // 初始化
    this.$bus.$on('intelligent_param_matching_init', (data, node) => {
      this.initPiPei()
    })
    // 智能匹配
    this.$bus.$on('intelligent_param_matching', (data, node) => {
      this.pipei()
    })
    // 保存
    this.$bus.$on('intelligent_matching_save', (data, node) => {
      this.saveZhiNengPiPei()
    })
    // 清空
    this.$bus.$on('paramOne_intelligentMatching_clear', (data, node) => {
      this.clearZhiNengPiPei()
    })
    this.getGpTree()
  },
  methods: {
    bindWaySelect () {
      let list = []
      if (this.bindingWay && this.bindingWay.length > 0) {
        let obj = {}
        for (let index = 0; index < this.bindingWay.length; index++) {
          for (let i = 0; i < this.AfterNatchingData.length; i++) { // 从原匹配的数据中筛选
            obj = this.AfterNatchingData[i]
            if (obj['similarityDesc']) {
              // console.log('aaaaaaa', obj['similarityDesc'])
              if (obj['similarityDesc'] === this.bindingWay[index]) { // 如果选中的绑定方式和tableList 中的一致则将其放入list，tablist中为空或者不等于选中的绑定方式的被过滤掉
                list.push(obj)
              }
            }
          }
        }
        this.tableData = list
        // this.queryData()
      } else { // 如果选择的为空，直接取匹配后的所有源数据
        this.tableData = JSON.parse(JSON.stringify(this.AfterNatchingData)) // 把默认匹配的数据给显示出来
      }
    },
    getGongchengParamList (query) {
      this.searchGpList = []
      if (query && query.length > 1) {
        this.loading = true
        setTimeout(() => {
          this.mappedArr = []
          this.$axios.get('/paramSimilarity/gpSelect', {params: {keyword: query}}).then(response => {
            this.searchGpList = response.data
            this.loading = false
          }).catch(response => {
            this.loading = false
          })
        }, 200)
      } else {
        this.searchGpList = []
      }
    },
    changeGp (index, gpName) {
      this.tableCurrentIndex = index
      let gp = {}
      if (gpName === undefined || gpName === '') {
        this.tableData[this.tableCurrentIndex].gpId = ''
        this.tableData[this.tableCurrentIndex].gpName = ''
        this.tableData[this.tableCurrentIndex].gpDescription = ''
      } else {
        for (let i = 0; i < this.searchGpList.length; i++) {
          gp = this.searchGpList[i]
          if (gpName === gp.GPNAME) { // 工程参数名不会重复的，因此只要相等就可以取出其他数据并赋值
            this.tableData[this.tableCurrentIndex].gpId = gp.GPID
            this.tableData[this.tableCurrentIndex].gpName = gp.GPNAME
            this.tableData[this.tableCurrentIndex].gpDescription = gp.GPDESCRIPTION
            break
          }
        }
        this.searchGpList = []
      }
    },
    rowClick (row) {
      this.tableCurrentIndex = row.index
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    selectChange (e) {
      var arrNew = []
      var dataLength = this.mineStatusValue.length
      var eleng = e.length
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].label) {
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew) //设置勾选的值
    },
    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes(true, true) //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = []
      let arr = []
      res.forEach(item => {
        arrLabel.push(item.label)
        arr.push(item)
      })
      this.mineStatusValue = arr
      this.mineStatus = arrLabel
      console.log('arr:' + JSON.stringify(arr))
      console.log('arrLabel:' + arrLabel)
    },
    handleNodeClick (data, node, nodeCommpent) {
      this.dialogFormData.catalogName = data.NAME
      this.dialogFormData.catalogId = data.ID
    },
    getGpTree () {
      this.$axios.get('/apm/getGpCatalog?parentId=0', {params: {}}).then(response => {
        this.gongchengData = response.data.data
      }).catch(response => {
      })
    },
    // 添加工程参数
    addGongChengParam (index, row) {
      this.tableIndex = index
      this.dialogVisible = true
      // // 新增则情空，编辑赋值，需要判断
      this.dialogFormData.description = ''
      this.dialogFormData.gongchengparam = ''
      // 对应目录ID和名称
      this.dialogFormData.catalogId = ''
      this.dialogFormData.catalogName = ''
    },
    saveGongCheng () {
      if (!this.dialogFormData.gongchengparam) {
        this.$message.error('工程参数名不能为空!')
        return false
      }
      if (!this.dialogFormData.catalogId) {
        this.$message.error('对应目录不能为空!')
        return false
      }
      let url = ''
      // if (this.dialogFormData.gongchengparamId) {
      //    url = '/apm/addGp'
      // } else {
      // }
      url = '/apm/addGp'
      var paramStr = {gpName: this.dialogFormData.gongchengparam, cataLogId: this.dialogFormData.catalogId, description: this.dialogFormData.description}
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        var dataRes = response.data
        if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          let gongchengparamId = dataRes.GPID // 返回工程参数ID
          this.tableData[this.tableIndex].gpDescription = this.dialogFormData.description
          this.tableData[this.tableIndex].gpName = this.dialogFormData.gongchengparam
          this.tableData[this.tableIndex].gpId = gongchengparamId
          // 设置目录id和nam
          this.tableData[this.tableIndex].catalogId = this.dialogFormData.catalogId
          this.tableData[this.tableIndex].catalogName = this.dialogFormData.catalogName
          this.dialogVisible = false
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$message.error('很遗憾，节点保存失败!')
      })
    },
    // 清空
    clearZhiNengPiPei () {
      let bindings = []
      let obj = {}
      let data = this.selectData // 选中的数据
      let count = 0
      for (let i = 0; i < data.length; i++) {
        obj = {}
        obj.modelId = data[i].modelId
        obj.mdId = data[i].mdId
        obj.gpId = data[i].gpId
        obj.gpName = data[i].gpName
        if (obj.gpId) {
          bindings.push(obj)
          count++
        }
      }
      if (count === 0) {
        this.$message.error('请选中后清空')
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在清空映射关系...') // 隐藏加载框
      this.$axios.post('/paramSimilarity/unbindMutiple', bindings,
        {
          headers: {
            'Content-type': 'application/json'
          }
        }).then((response) => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        let data = response.data
        if (data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: data.message
          })
          this.queryData(1)
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    isNotNull (v) {
      if (v !== null && v !== undefined && v !== '') {
        return true
      } else return false
    },
    // 保存
    saveZhiNengPiPei () {
      let bindings = []
      let obj = {}
      let data = this.selectData // 选中的数据
      if (!data || data.length === 0) {
        this.$message.error('请选中要保存的参数')
        return false
      } else {
        let repetitionData = data.map(item => {
          return item.gpName
        })
        if (this.isRepetition(repetitionData)) {
         this.$message.error('工程参数名重复')
          return false
        }
      }
      console.log(data)
      let count = 0
      let mdNames = ''
      let savedMap = {}
      for (let i = 0; i < data.length; i++) {
        obj = {}
        obj.modelId = data[i].modelId
        obj.mdId = data[i].mdId
        obj.gpId = data[i].gpId
        obj.gpName = data[i].gpName
        console.log(obj)
        if (obj.gpId) {
          savedMap[obj.mdId] = obj.mdId
          bindings.push(obj)
        } else {
          if (mdNames === '') {
            mdNames = data[i]['mdName']
          } else {
            if (count < 2) {
              mdNames += ',' + data[i]['mdName']
            }
            count++
          }
        }
      }
      // let num = data.length * 1 - count * 1
      if (this.isNotNull(mdNames)) {
        this.$message.error('原始参数名为: 【' + mdNames + '...】的工程参数名未映射')
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在绑定中...') // 隐藏加载框
      this.$axios.post('/paramSimilarity/bindMutiple', bindings,
        {
          headers: {
            'Content-type': 'application/json'
          }
        }).then((response) => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        let data = response.data
        if (data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: data.message
          })
          if (this.tableData.length - bindings.length <= 0) { // 如果绑定的和源数据长度一样表示全部保存完毕了，直接查所有
            this.bindingWay = ''
            if (this.AfterNatchingData.length > 0) {
              this.queryFrontForSaved(savedMap)
            } else { // 页面缓存的数据没了查后台
              this.queryData(1)
            }
          } else {
            this.queryFrontForSaved(savedMap)
          }
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    // 判断数组中的数据是否重复
    isRepetition (nums) {
      let tmpSet = new Set(nums)
       console.log(tmpSet)
      let newNums = Array.from(tmpSet)
      console.log(nums.length, newNums.length)
      if (nums.length === newNums.length) {
          return false
      } else {
          return true
      }
    },
    // 页面保存后，如果前段有数据则直接从前段获取数据
    queryFrontForSaved (savedMap) {
      let newAfterList = []
      for (let i = 0; i < this.AfterNatchingData.length; i++) { // 从原匹配的数据中判断是否存在map，如果不存在则表示还没保存掉
        if (!savedMap[this.AfterNatchingData[i]['mdId']]) {
          newAfterList.push(this.AfterNatchingData[i])
        }
      }
      this.AfterNatchingData = newAfterList // 原匹配数据为最新没保存的数据
      this.bindWaySelect()
    },
    initPiPei () {
      this.$confirm('是否确认对该库进行初始化智能匹配?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$confirm('原有初始化智能匹配的计算数据将被清空，重新计算，是否仍要提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SHOW_LOADING', '初始化中，请稍等！') // 隐藏加载框
          this.$axios.get('/paramSimilarity/renew', {params: {modelId: this.currentLibraryVersion, mdIds: ''}}).then(response => {
            this.$store.commit('HIDE_LOADING', '初始化中，请稍等！') // 隐藏加载框
            var dataRes = response.data
            if (dataRes.status === '0') {
              this.$message({
                message: dataRes.message,
                type: 'success'
              })
              this.$bus.$emit('closeThisTab', 'intelligent_matching_list')
            } else if (response.data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.$message.error(response.data.message)
            }
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '初始化中，请稍等！') // 隐藏加载框
          })
        })
      })
    },
    pipei () {
      if (this.matching.progressRate === 1) {
        this.isPiPei = true
        this.$store.commit('SHOW_LOADING', '正在匹配中，请稍等！') // 隐藏加载框
        setTimeout(() => {
          let data = this.selectData // 选中的数据
          if (!data || data.length === 0) {
            data = this.tableData
          }
          let candidates = {}
          for (let i = 0; i < this.tableData.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (data[j].mdId === this.tableData[i].mdId) {
                if (data[j]['candidates'] && data[j]['candidates'] !== null) {
                  // NAME_CONSISTENT>NAME_SIMILAR>NOTE_SIMILAR
                  candidates = data[j]['candidates']
                  if (candidates.NAME_CONSISTENT && candidates.NAME_CONSISTENT.length > 0) {
                    this.tableData[i].gpId = candidates.NAME_CONSISTENT[0].gpId
                    this.tableData[i].gpName = candidates.NAME_CONSISTENT[0].gpName
                    this.tableData[i].gpDescription = candidates.NAME_CONSISTENT[0].gpDescription
                    this.tableData[i].similarity = candidates.NAME_CONSISTENT[0].similarity
                    this.tableData[i].similarityDesc = candidates.NAME_CONSISTENT[0].similarityDesc
                  } else if (candidates.NAME_SIMILAR && candidates.NAME_SIMILAR.length > 0) {
                    this.tableData[i].gpId = candidates.NAME_SIMILAR[0].gpId
                    this.tableData[i].gpName = candidates.NAME_SIMILAR[0].gpName
                    this.tableData[i].gpDescription = candidates.NAME_SIMILAR[0].gpDescription
                    this.tableData[i].similarity = candidates.NAME_SIMILAR[0].similarity
                    this.tableData[i].similarityDesc = candidates.NAME_SIMILAR[0].similarityDesc
                  } else if (candidates.NOTE_SIMILAR && candidates.NOTE_SIMILAR.length > 0) {
                    this.tableData[i].gpId = candidates.NOTE_SIMILAR[0].gpId
                    this.tableData[i].gpName = candidates.NOTE_SIMILAR[0].gpName
                    this.tableData[i].gpDescription = candidates.NOTE_SIMILAR[0].gpDescription
                    this.tableData[i].similarity = candidates.NOTE_SIMILAR[0].similarity
                    this.tableData[i].similarityDesc = candidates.NOTE_SIMILAR[0].similarityDesc
                  }
                }
                break
              }
            }
          }
          this.AfterNatchingData = JSON.parse(JSON.stringify(this.tableData))
          this.$store.commit('HIDE_LOADING', '正在匹配中，请稍等！')
        }, 800)
      } else {
        this.$message.error('当前版本库还未初始化')
      }
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.queryData(1)
    },
    selectionChange (v) {
      this.selectData = v
    },
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj.intelligent_matching_select = false // 隐藏智能匹配选择
      if (this.unbind === 1 || this.unbind === '1') {
        hideMenuObj.intelligent_param_matching_init = true
        hideMenuObj.intelligent_param_matching = true
        hideMenuObj.intelligent_matching_save = true
      } else {
        hideMenuObj.paramOne_intelligentMatching_clear = true
      }
      if (this.paramOneEditAuthority1 === false) {
        disabledMenuObj.intelligent_param_matching_init = true
        disabledMenuObj.intelligent_param_matching = true
        disabledMenuObj.intelligent_matching_save = true
        disabledMenuObj.paramOne_intelligentMatching_clear = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_intelligentMatching', hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    similarityTypeSelect () {
      this.$axios.get('/paramSimilarity/similarityTypeSelect', {params: {}}).then(response => {
        this.libraryList = response.data
        for (let i = 0; i < this.libraryList.length; i++) {
          this.libraryListMap[this.libraryList[i]['value']] = this.libraryList[i]['label']
        }
      }).catch(response => {
      })
    },
    // 自定义子节点内容
    renderContent (h, {node, data, store}) {
      var that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          type: 'paramone', // 工程参数
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowEdit: false, // 是否显示编辑按钮
          isShowDelete: false, //删除按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法 data node store type是当前节点信息
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          openTreeNodeHandle: ((data, node, type) => that.openNodeFun(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node, type) => that.cancelNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node, type) => that.deleteNodeFun(data, node, type))
        }
      })
    },
    queryData (page) {
      if (this.unbind === 1) {
        this.bindingWay = ''
      }
      let bindWay = []
      if (this.bindingWay !== '') {
        bindWay = this.bindingWay.join(',')
      }
      this.tableData = []
      this.isPiPei = false
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let unbind = !!(this.unbind === 1 || this.unbind === '1')
      this.$axios.get('/paramSimilarity/page', {params: {similarityTypes: bindWay, modelId: this.libraryVersion, unbind: unbind, keyword: this.keyword, pageNo: page, pageSize: this.pageSize}}).then(response => {
        let data = response.data
        this.tableData = data.content
        this.AfterNatchingData = data.content
        this.pageSize = data.pageSize
        this.pageNo = data.pageNo
        this.totalCount = data.recordCount
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    }
  }
}
</script>

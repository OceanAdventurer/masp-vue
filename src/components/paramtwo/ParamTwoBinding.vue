<style scoped>
  .bindingTable {
    width: 99%;
    margin: 10px auto 15px;
    overflow: auto;
    height: 100%;
  }
 .bindingTable .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
   padding-right: 0px;
 }

 .bindingTable .el-table .cell, .el-table th div {
   padding-right: 0px;
   overflow: hidden;
    text-overflow: ellipsis;
  }
  .list_mapped {
    color: #409EFF;
    cursor: pointer;
  }
</style>
<template>
    <!--编辑-->
    <div class="bindingTable">
        <el-table :data="bindingLibrary" height="98%" highlight-current-row  width="100%" border fit
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        ref="multipleTable"
        v-show="!isLinkParam && isCurrentUser"
        @selection-change="selectionMapping">
        <el-table-column  type="selection"  width="55"></el-table-column>
         <el-table-column  prop="versionLibrary" width="250px"   label="版本库">
          <template slot-scope="scope">
            {{scope.row.versionLibrary}} （{{scope.row.planeType}}）
           </template>
        </el-table-column>
        <el-table-column  prop="mapping"    label="映射">
          <template slot-scope="scope">
            <span class="list_mapped"   @click="handleEdit(scope.$index, scope.row)" :title="scope.row.mapping">{{scope.row.mapping}}</span>
          </template>
        </el-table-column>
            <el-table-column   width="50px"  label="操作">
          <template slot-scope="scope">
<!--            <div-->
<!--              @click="handleAdd(scope.$index, scope.row)" class="icon-create-new-praram-suanfa tab-icon-set mr10" style="float: left; " title="新建分析参数"></div>-->
<!--            <div-->
<!--              @click="handleEdit(scope.$index, scope.row)" class="icon-edit tab-icon-set mr10" style="float: left" title="编辑"></div>-->
<!--            <div-->
<!--              @click="handleDelete(scope.$index, scope.row)" class="icon-delete-small tab-icon-set mr10" style="float: left" title="删除"></div>-->
            <div
              @click="copyScript(scope.$index, scope.row)" class="icon-copy-small tab-icon-set" style="float: left" title="复制"></div>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        v-loading="bindLoadidng"
        :data="bindingLibrary"
        border
        height="98%"
        header-align ="center"
        style="width: 100%;"
        @selection-change="selectionMapping"
        v-show="isLinkParam || !isCurrentUser"
      >
         <el-table-column  prop="versionLibrary"   width="250px"  label="版本库">
          <template slot-scope="scope">
            {{scope.row.versionLibrary}} （{{scope.row.planeType}}）
           </template>
        </el-table-column>
        <el-table-column  prop="mapping"    label="映射"  >
          <template slot-scope="scope">
            <span class="list_mapped"   @click="handleEdit(scope.$index, scope.row)" :title="scope.row.mapping">{{scope.row.mapping}}</span>
          </template>
        </el-table-column>
        <el-table-column     width="50" label="操作">
          <template slot-scope="scope">
            <div
              @click="copyScript(scope.$index, scope.row)" class="icon-copy-small tab-icon-set mr10" style="float: left" title="复制"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        paramDetailData: '',
        isCurrentUser: false,
        isLinkParam: false,
        libraryList: [], // 所有的版本 库
        bindingLibrary: [], // 绑定的版本库
        bindLoadidng: false,
        scriptType: '',
        twoDimensionName: '',
        saveReturnTwoDimensionId: 0,
        profileCatalogId: '',
        paramManager: '',
        modelIds: '',
        multipleSelection: [] // 选中版本库映射的数据
      }
    },
    props: ['saveReturnTwoDimensionId1bd', 'profileCatalogId1', 'paramManagerObj', 'scriptType1bd', 'twoDimensionNamebd', 'currentUser', 'linkparam', 'paramDetail', 'hideMenuObj', 'disabledMenuObj'], // saveReturnTwoDimensionId1 分析参数的 id scriptType1 类型 1，时间点。twoDimensionName
    watch: {
      // 点击参数子节点的时候触发
      saveReturnTwoDimensionId1bd () {
        if (this.saveReturnTwoDimensionId1bd) {
          this.saveReturnTwoDimensionId = this.saveReturnTwoDimensionId1bd
          this.twoDimensionName = this.twoDimensionNamebd
          this.isCurrentUser = this.currentUser
          this.isLinkParam = this.linkparam
          this.profileCatalogId = this.profileCatalogId1
          this.scriptType = this.scriptType1bd
          this.paramManager = this.paramManagerObj
          this.paramDetailData = this.paramDetail
          this.getAllModels()
        } else {
          this.bindingLibrary = []
          this.libraryList = []
        }
      },
      scriptType1bd () {
        this.scriptType = this.scriptType1bd
      }
    },
    mounted () {
      this.$bus.$off('paramTwo_algorithmsLibrary_new_remove_emit') // 移除自定义事件监听器。
      // 点击tab页面的清空，接受后清空
      this.$bus.$on('paramTwo_algorithmsLibrary_new_remove_emit', () => {
        this.clearTwoDimensionRelation(this.modelIds, true)
      })
    },
    methods: {
      // 查询版本库
      getAllModels () {
        this.bindLoadidng = true
        this.$axios.get('/apm/getAllModels', {params: {}}).then(response => {
          let data = response.data
          this.bindLoadidng = false
          if (data && data.length > 0) {
              if (data.status !== null && data.status !== '' && data.status === 'E1001') {
               this.$router.push({path: '/'})
             } else {
                this.libraryList = data
              this.getBindRelation()
            }
          } else {
            this.bindLoadidng = false
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.bindLoadidng = false
        })
      },
      // 查询绑定的版本库
      getBindRelation () {
        this.$axios(
          {
            url: '/apm/getBindRelation',
            method: 'get',
            params: {
              twoDimensionId: this.saveReturnTwoDimensionId
            }
          }
        ).then(response => {
          this.bindLoadidng = false
          if (response.data.status !== null && response.data.status !== undefined) {
            this.$message.error(response.data.message)
          } else {
            let tempList = []
              for (let i = 0; i < this.libraryList.length; i++) { // 循环所有的版本库
                let ID = this.libraryList[i].ID // 取出id
                let DESCRIPTION = this.libraryList[i].DESCRIPTION
                let createSteps = ''
                let mapping = ''
                  if (JSON.stringify(response.data) !== '{}' && response.data[ID] !== null && response.data[ID] !== undefined) {
                   createSteps = response.data[ID].CREATE_STEPS // 根据id获取到  createSteps
                   mapping = response.data[ID].SCRIPT_CONTENT // 根据id获取到  SCRIPT_CONTENT
                }
                if (this.isNotNull(createSteps) && this.isJSONStr(createSteps)) {
                  createSteps = createSteps.replace(/[\n\r]/g, '<br>')
                  createSteps = JSON.parse(createSteps)
                }
                tempList.push({
                  versionLibrary: ID,
                  planeType: DESCRIPTION,
                  createSteps: this.getValue(createSteps),
                  mapping: this.getValue(mapping)
                })
              }
              this.bindingLibrary = tempList
            // 发送默认数据
            this.$bus.$emit('emitDataToParamSaveAfter', {
              currentUser: this.isCurrentUser,
              isLinkParam: this.isLinkParam,
              scriptType: this.scriptType,
              profileCatalogId: this.profileCatalogId,
              paramManagerObj: this.paramManager,
              twoDimensionParamId: this.saveReturnTwoDimensionId,
              twoDimensionName: this.twoDimensionName,
              bindingLibrary: this.bindingLibrary,
              multipleSelection: this.multipleSelection
            })
          }
        }).catch(response => {
          this.bindLoadidng = false
          this.$message.error('数据加载失败！')
        })
      },
      isNotNull (v) {
        if (v !== null && v !== undefined && v !== '') {
          return true
        } else return false
      },
      isJSONStr (str) {
      if (typeof str === 'string') {
          try {
            // var obj = JSON.parse(str)
            if (str.indexOf('{') > -1) {
              return true
            } else {
              return false
            }
          } catch (e) {
            console.log(e)
            return false
          }
        }
        return false
      },
      getValue (v) {
        if (v === null || v === undefined || v === '') {
          return ''
        }
        return v
      },
      //选中版本库映射
      selectionMapping (arr) {
        this.multipleSelection = arr
        let modelIds = ''
        let modelId = ''
        let needDisabled = true // 默认是禁用的
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].mapping) { // 如果是绑定，则取消 禁用
            needDisabled = false
          }
          modelId = arr[i].versionLibrary
          if (i === 0) {
            modelIds = modelId
          } else {
            modelIds += ',' + modelId
          }
        }
        this.modelIds = modelIds
        this.$bus.$emit('emitShowMenue', needDisabled) // 选中后改变菜单
        // 发送选中数据
        this.$bus.$emit('emitDataToParamSaveAfter', {
          currentUser: this.isCurrentUser,
          isLinkParam: this.isLinkParam,
          scriptType: this.scriptType,
          profileCatalogId: this.profileCatalogId,
          paramManagerObj: this.paramManager,
          twoDimensionParamId: this.saveReturnTwoDimensionId,
          twoDimensionName: this.twoDimensionName,
          bindingLibrary: this.bindingLibrary,
          multipleSelection: this.multipleSelection
        })
        // 将值传到新建tab， "点击二级菜单"需要用
        // createSteps 这里选中的时候，不确定 他的值。这个值如果是单个编辑在paramTable 中取值。如果是 多个编辑在check 页面取值
        // this.$bus.$emit('param_two_binding_select_librarys', {banbenkuIds: this.multipleSelection, twoDimensionNamebd: this.twoDimensionName, scriptType: this.scriptType, saveReturnTwoDimensionId: this.saveReturnTwoDimensionId, edit: false, isLinkParam: this.isLinkParam, isCurrentUser: this.isCurrentUser})
        // console.log('------------------' + this.multipleSelection)
      },
      // 点击新增单个算法按钮
      handleAdd (index, obj) {
        let arr = []
        arr.push(obj)
        this.$bus.$emit('emitDataToParamSaveAfter', {
          currentUser: this.isCurrentUser,
          isLinkParam: this.isLinkParam,
          scriptType: this.scriptType,
          profileCatalogId: this.profileCatalogId,
          paramManagerObj: this.paramManager,
          twoDimensionParamId: this.saveReturnTwoDimensionId,
          twoDimensionName: this.twoDimensionName,
          bindingLibrary: this.bindingLibrary,
          multipleSelection: this.multipleSelection
        })
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_algorithmsLibrary_new', zhName: '新建分析参数算法', isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
      },
      // 点击编辑算法按钮
      handleEdit (index, obj) {
        if (obj.mapping) {
          let arr = []
          arr.push(obj)
          // this.$bus.$emit('param_two_binding_select_librarys', { banbenkuIds: arr,
          //   twoDimensionNamebd: this.twoDimensionName,
          //   scriptType: this.scriptType,
          //   saveReturnTwoDimensionId: this.saveReturnTwoDimensionId,
          //   edit: true,
          //   createSteps: obj.createSteps,
          //   mapping: obj.mapping,
          //   isLinkParam: this.isLinkParam,
          //   isCurrentUser: this.isCurrentUser
          // })
          this.multipleSelection = arr
          this.$bus.$emit('emitDataToParamSaveAfter', {
            currentUser: this.isCurrentUser,
            isLinkParam: this.isLinkParam,
            scriptType: this.scriptType,
            profileCatalogId: this.profileCatalogId,
            paramManagerObj: this.paramManager,
            twoDimensionParamId: this.saveReturnTwoDimensionId,
            twoDimensionName: this.twoDimensionName,
            bindingLibrary: this.bindingLibrary,
            multipleSelection: this.multipleSelection
          })
          this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_algorithmsLibrary_new_edit',
            zhName: this.twoDimensionName,
            isClosable: true,
            parent: 'paramTwo_paramLibray',
            count: 0
          })
        } else { // 否则直接跳转到新增
          this.handleAdd(index, obj)
        }
      },
      // 复制脚本
      copyScript (index, obj) {
        if (obj.mapping) {
          var _input = document.createElement('input')
          _input.value = obj.mapping
          document.body.appendChild(_input)
          _input.select()
          document.execCommand('Copy')
          document.body.removeChild(_input)
          this.$message({
            type: 'success',
            message: '复制成功'
          })
        }
      },
      // 删除单个
      handleDelete (index, obj) {
        if (obj.mapping !== null && obj.mapping !== undefined && obj.mapping !== '') {
          let modelid = obj.versionLibrary
          this.clearTwoDimensionRelation(modelid, true)
        } else {
          this.$message.error('该版本库无算法!')
        }
      },
      // 删除 绑定映射关系。
      clearTwoDimensionRelation (modelIds, flag) {
        if (!modelIds) {
          this.$message.error('至少选中一个版本库！')
        } else {
          if (flag) {
            this.$confirm('您确定要解除绑定吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.commit('SHOW_LOADING', '正在清空映射关系') // 打开加载提示框
              this.$axios(
                {
                  url: '/apm/bindTwoDimensionRelation?twoDimensionId=' + this.saveReturnTwoDimensionId + '&modelIds=' + modelIds + '&creatorId=0',
                  method: 'post',
                  headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                  },
                  data: {
                    json: '{}',
                    steps: '{}'
                  }
                }
              ).then(response => {
                this.$store.commit('HIDE_LOADING', '正在清空映射关系') // 打开加载提示框
                var data = response.data
                if (data.status === '0') {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.getAllModels()
                } else if (data.status === 'E1001') {
                  this.$router.push({path: '/'})
                } else {
                  this.$message.error(data.message)
                }
              }).catch(response => {
                this.$store.commit('HIDE_LOADING', '正在清空映射关系') // 打开加载提示框
                this.$message.error('删除绑定失败！')
              })
            })
          } else {
            this.$store.commit('HIDE_LOADING', '正在清空映射关系') // 打开加载提示框
            this.$message.error('该版本库无算法！')
          }
        }
      }
    }
  }
</script>

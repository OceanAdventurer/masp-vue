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
        <el-table :data="bindingLibrary" height="98%" highlight-current-row  width="100%" border     ref="multipleTable"
                  @selection-change="selectionMapping">
        <el-table-column  type="selection"  width="55"></el-table-column>
         <el-table-column  prop="versionLibrary" width="70"   label="版本库">
          <template slot-scope="scope">
            {{scope.row.versionLibrary}}
           </template>
        </el-table-column>
          <el-table-column  prop="versionLibrary" width="170px"   label="机型">
          <template slot-scope="scope">
            {{scope.row.planeType}}
           </template>
        </el-table-column>
        <el-table-column  prop="mapping"    label="映射">
          <template slot-scope="scope">
            <span class="list_mapped"   @click="handleEdit(scope.$index, scope.row)" :title="scope.row.mapping">{{scope.row.mapping}}</span>
          </template>
        </el-table-column>
<!--            <el-table-column   width="50px"  label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <div-->
<!--              @click="copyScript(scope.$index, scope.row)" class="icon-copy-small tab-icon-set" style="float: left" title="复制"></div>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
<!--      <el-table-->
<!--        v-loading="bindLoadidng"-->
<!--        :data="bindingLibrary"-->
<!--        border-->
<!--        height="calc(78vh - 8%)"-->
<!--        header-align ="center"-->
<!--        style="width: 100%;"-->
<!--        @selection-change="selectionMapping"-->
<!--        v-show="isLinkParam || !isCurrentUser"-->
<!--      >-->
<!--         <el-table-column  prop="versionLibrary"   width="250px"  label="版本库">-->
<!--          <template slot-scope="scope">-->
<!--            {{scope.row.versionLibrary}} （{{scope.row.planeType}}）-->
<!--           </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column  prop="mapping"    label="映射"  >-->
<!--          <template slot-scope="scope">-->
<!--            <span class="list_mapped"   @click="handleEdit(scope.$index, scope.row)" :title="scope.row.mapping">{{scope.row.mapping}}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column     width="50" label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <div-->
<!--              @click="copyScript(scope.$index, scope.row)" class="icon-copy-small tab-icon-set mr10" style="float: left" title="复制"></div>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
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
        hideMenuObj: {}, // 隐藏的
        disabledMenuObj: {}, // 禁用的按钮
        twoDimensionName: '',
        twoDimensionParamId: 0,
        profileCatalogId: '',
        paramManager: '',
        modelIds: '',
        multipleSelection: [] // 选中版本库映射的数据
      }
    },
    props: ['twoDimensionParamId1', 'profileCatalogId1', 'paramManagerObj', 'scriptType1bd', 'twoDimensionNamebd', 'currentUser', 'linkparam', 'paramDetail'], // twoDimensionParamId1 分析参数的 id scriptType1 类型 1，时间点。twoDimensionName
    watch: {
      // 点击参数子节点的时候触发
      twoDimensionNamebd () {
        this.getBindData()
      },
      scriptType1bd () {
        this.scriptType = this.scriptType1bd
      }
    },
    mounted () {
      this.$bus.$off('event_clear_suanfa') // 移除自定义事件监听器。
      this.$bus.$on('event_clear_suanfa', () => {
        this.clearData()
      })
      setTimeout(() => {
        this.getBindData()
      }, 500)
    },
    methods: {
      getBindData () {
        this.multipleSelection = []
        // 清空选中
        this.$bus.$emit('clearMultipleSelection')
        if (this.twoDimensionParamId1) {
          this.twoDimensionParamId = this.twoDimensionParamId1
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
      // 查询版本库
      getAllModels () {
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        this.bindLoadidng = true
        this.$axios.get('/apm/getAllModels', {params: {}}).then(response => {
          this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
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
          this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
          this.$message.error('数据加载失败ssss!')
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
              twoDimensionId: this.twoDimensionParamId
            }
          }
        ).then(response => {
          this.bindLoadidng = false
          if (response.data.status !== null && response.data.status !== undefined) {
            this.$message.error(response.data.message)
          } else {
            let resData = {}
            let tempList = []
              for (let i = 0; i < this.libraryList.length; i++) { // 循环所有的版本库
                let ID = this.libraryList[i].ID // 取出id
                let DESCRIPTION = this.libraryList[i].DESCRIPTION
                let createSteps = ''
                let mapping = ''
                  if (JSON.stringify(response.data) !== '{}' && response.data[ID] !== null && response.data[ID] !== undefined) {
                    resData = response.data[ID]
                    createSteps = resData.CREATE_STEPS // 根据id获取到  createSteps
                    console.log('creatorId', createSteps['creatorId'])
                    mapping = createSteps['creatorId'] * 1 === 16 ? resData.SCRIPT_CONTENT : createSteps['ky'] // 如果是脚本编辑则取 SCRIPT_CONTENT 中的数据，其他的取ky的数据 （其他的需要显示中文名称，存储在ky中）
                  }
                  // 如果是字符串类型，则先移除里面的 \\ 并且转化为json对象
                // if (this.isNotNull(createSteps) && this.isJSONStr(createSteps)) {
                //   console.log('createSteps', JSON.stringify(createSteps))
                //   createSteps = createSteps.replace(/[\n\r]/g, '<br>')
                //   console.log('createSteps3', JSON.stringify(createSteps))
                //   createSteps = JSON.parse(createSteps)
                // }
                tempList.push({
                  versionLibrary: ID,
                  planeType: DESCRIPTION,
                  createSteps: this.getValue(createSteps),
                  mapping: this.getValue(mapping)
                })
              }
              this.bindingLibrary = tempList
          }
        }).catch(response => {
          this.bindLoadidng = false
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
            if (str.indexOf('{') > -1 && str.indexOf('}') > -1) {
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
        let hashBind = false
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].mapping) {
            hashBind = true
          }
          modelId = arr[i].versionLibrary
          if (i === 0) {
            modelIds = modelId
          } else {
            modelIds += ',' + modelId
          }
        }
        this.modelIds = modelIds
        this.$bus.$emit('emithashBind', hashBind)
        // 发送选中数据
        this.$bus.$emit('emitDataToEventSaveAfter', {
          currentUser: this.isCurrentUser,
          isLinkParam: this.isLinkParam,
          scriptType: this.scriptType,
          profileCatalogId: this.profileCatalogId,
          paramManagerObj: this.paramManager,
          twoDimensionParamId: this.twoDimensionParamId,
          twoDimensionName: this.twoDimensionName,
          bindingLibrary: this.bindingLibrary,
          multipleSelection: this.multipleSelection
        })
      },
      // 点击新增单个算法按钮
      handleAdd (index, obj) {
        let arr = []
        arr.push(obj)
        this.$bus.$emit('emitDataToEventSaveAfter', {
          currentUser: this.isCurrentUser,
          isLinkParam: this.isLinkParam,
          scriptType: this.scriptType,
          profileCatalogId: this.profileCatalogId,
          paramManagerObj: this.paramManager,
          twoDimensionParamId: this.twoDimensionParamId,
          twoDimensionName: this.twoDimensionName,
          bindingLibrary: this.bindingLibrary,
          multipleSelection: this.multipleSelection
        })
        this.$bus.$emit('paramEventAddTab', {enName: 'profile_event_definition', zhName: this.twoDimensionName, isClosable: true, parent: 'paramEvent_eventLibrary', count: 0})
      },
      // 点击编辑算法按钮
      handleEdit (index, obj) {
        if (obj.mapping) {
          let arr = []
          arr.push(obj)
          // this.$bus.$emit('param_two_binding_select_librarys', { banbenkuIds: arr,
          //   twoDimensionNamebd: this.twoDimensionName,
          //   scriptType: this.scriptType,
          //   twoDimensionParamId: this.twoDimensionParamId,
          //   edit: true,
          //   createSteps: obj.createSteps,
          //   mapping: obj.mapping,
          //   isLinkParam: this.isLinkParam,
          //   isCurrentUser: this.isCurrentUser
          // })
          this.multipleSelection = arr
          this.$bus.$emit('emitDataToEventSaveAfter', {
            currentUser: this.isCurrentUser,
            isLinkParam: this.isLinkParam,
            scriptType: this.scriptType,
            profileCatalogId: this.profileCatalogId,
            paramManagerObj: this.paramManager,
            twoDimensionParamId: this.twoDimensionParamId,
            twoDimensionName: this.twoDimensionName,
            bindingLibrary: this.bindingLibrary,
            multipleSelection: this.multipleSelection
          })
          this.$bus.$emit('paramEventAddTab', {enName: 'profile_event_definition', zhName: this.twoDimensionName, isClosable: true, parent: 'paramEvent_eventLibrary', count: 0})
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
          this.clearData(modelid, true)
        } else {
          this.$message.error('该版本库无算法!')
        }
      },
      // 删除 绑定映射关系。
      clearData () {
        let modelIds = ''
        console.log('xxvx', this.multipleSelection)
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === 0) {
            modelIds = this.multipleSelection[i]['versionLibrary']
          } else {
            modelIds += ',' + this.multipleSelection[i]['versionLibrary']
          }
        }
        if (!modelIds) {
          this.$message.error('至少选中一个版本库！')
        } else {
          this.$confirm('确定要清空所选版本库的映射关系?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit('SHOW_LOADING', '正在清空!')
            this.$axios(
              {
                url: '/apm/bindEventRelation?twoDimensionId=' + this.twoDimensionParamId + '&modelIds=' + modelIds + '&creatorId=0',
                method: 'post',
                data: {
                  json: '{}',
                  steps: '{}'
                },
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                }
              }
            ).then(response => {
              this.$store.commit('HIDE_LOADING', '拼命加载中!')
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
              this.$store.commit('HIDE_LOADING', '拼命加载中!')
            })
          })
        }
      }
    }
  }
</script>

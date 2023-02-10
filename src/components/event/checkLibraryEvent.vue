<style scoped>
  .clearfix {
    display: table;

  }

  .clearfix:before, .clearfix:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
  }

  .clearfix {
    _zoom: 1;
  }

  .tab_file_new1 {
    display: flex;
    flex-direction: row;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .el-step__head.is-finish {
    color: #2A436F;
    border-color: #2A436F;
  }

  .el-step__title.is-finish {
    color: #2A436F;
  }

  .tab_file_new {
    position: relative;
  }

  .library-new-bottom {
    padding-top: 15px;
    width: 100%;
    height: 10%;
    border-top: solid 1px #DDDDDD;
    padding-right: 15%;
  }

  .library-new-left {
    width: 73%;
    float: left;
    height: 100%;
    padding: 0px 5px;
    border-right: solid 1px #dddddd;
  }

  .library-new-right {
    width: 25%;
    float: left;
    height: 100%;
  }

  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 10px;
  }

  .running-jobs {
    color: #8c939d;
    font-size: 12px;
  }

  .el-table__row {
    line-height: 20px;
    height: 20px;
  }

  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 15px;
  }

  .el-table td,
  .el-table th {
    padding: 10px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }

  .dialog_content_list .el-table td,
  .dialog_content_list .el-table th {
    padding: 0px;
  }

  .dialog_content_list .cell {
    height: 15px;
    line-height: 15px;
  }

  .el-table-column {
    width: 100%;
  }

  .headerFixedBtn {
    position: fixed;
    right: 60px;
  }

  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    height: 800px;
  }

  /* 窗口高度大于800px */
  @media screen and (min-height: 800px) {
    .headerFixedBtn {
      top: 0px;
    }
  }

  /* 窗口高度小于800px */
  @media screen and (max-height: 800px) {
    .headerFixedBtn {
      top: -5px;
    }
  }

  .el-button + .el-button {
    margin-left: 0px;
  }

  .binding {
    padding-left: 30%;
    padding-top: 14%;
    width: 100%;
  }
</style>
<style>
  .el-step__title.is-process {
    color: #c0c4cc;
    font-weight: 100;
    font-size: 12px;
    line-height: 38px;
  }

  .el-step__head.is-process {
    color: #c0c4cc;
    border-color: #c0c4cc;
  }

  #paramTwoSavedAfter .left_tree_oneParam {
    overflow: auto;
    overflow-x: auto;
    height: 331px;
    border: 1px solid #ebeef5;
  }

  #paramTwoSavedAfter .left_tree_time_point {
    overflow: auto;
    overflow-x: auto;
    height: 331px;
    border: 1px solid #ebeef5;
  }

  .left_tree1 {
    overflow: auto;
    overflow-x: auto;
    height: 423px;
    border: 1px solid #ebeef5;
  }

  .left_tree_bind {
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
    cursor: pointer;
    border: 1px solid #ebeef5;
  }

  .el-step__head.is-finish {
    color: #2A436F;
    border-color: #2A436F;
  }

  .el-step__title.is-finish {
    color: #2A436F;
  }

</style>
<template>
  <div style="width: 100%;height: 100%">
    <div style=" border-bottom: solid 1px #DDDDDD;height: 100%;">
      <div class="binding">
        <el-radio-group v-model="selectLibraryType">
          <div v-for="item in LibraryParam" :key="item.value"   style="line-height: 30px;">>
              <el-radio :label="item.value">{{item.name}}</el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>
    <div style="float: right; margin-top: 20px;height: 15%;margin-right:25px">
      <el-button type="primary" style="float: left;margin-left: 10px;width:90px;height:34px" @click="nextStep" size="mini">下一步</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        LibraryParam: [], // 选择根据算法分组的版本库，
        selectLibraryType: '1', // 选中的算法mapping
        scriptType: '',
        saveReturnTwoDimensionId: '',
        twoDimensionName: '',
        libraryIdList: '', // 选中的版本库对应算法
        isLinkParam: false,
        suanFaMap: {},
        libraryMaps: {} // 存放版本库对应的算法，key为版本库，value为 planType 和算法
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    props: ['libraryIds', 'linkParam', 'isCurrentUser'],
    mounted () {
      this.libraryIdList = this.libraryIds
      this.isLinkParam = this.linkParam
      this.getLibrarySelectData()
    },
    methods: {
      getLibrarySelectData () {
        let map = {}
        for (let i = 0; i < this.libraryIdList.length; i++) {
          let suanfa = this.libraryIdList[i].mapping
          let versionLibrary = this.libraryIdList[i].versionLibrary + ''
          let createSteps = this.libraryIdList[i].createSteps
          if (suanfa !== null && suanfa !== undefined && suanfa !== '') {
            this.suanFaMap[suanfa] = createSteps
            if (i === 0) {
              map[suanfa] = versionLibrary
            } else {
              let versionLibraryValue = map[suanfa] // 根据算法获取版本库，如果不为空，则说明一个算法有多个版本库，用/隔开版本库，并存入map key 为算法
              if (versionLibraryValue) {
                versionLibraryValue += '/' + versionLibrary
                map[suanfa] = versionLibraryValue
              } else { // 否则直接存入map
                map[suanfa] = versionLibrary // key  为算法， value 为版本库 (单个)
              }
            }
          }
        }
        let index = 0
        Object.keys(map).forEach(suanfaKey => {
          if (index === 0) {
            this.selectLibraryType = suanfaKey
            index++
          }
          let libraryIds = map[suanfaKey]
          let obj = {'name': '以' + libraryIds + '版本库为基础进行算法编辑', 'value': suanfaKey}
          this.LibraryParam.push(obj)
        })
        this.LibraryParam.push({'name': '新建算法覆盖所有已选版本库', 'value': '1'})
      },
      // // 上一步，跳转到绑定页面去
      // prevStep () {
      //   this.$emit('lastPageEmit', this.selectLibraryType)
      // },
      // 下一步 新建或者编辑算法界面
      nextStep () {
        // 选中radio 后 跳转到算法界面
        if (this.selectLibraryType === '') {
          this.$message.error('选中后才能进入下一步')
        } else {
          this.$emit('nextEventPageEmit', this.selectLibraryType, this.suanFaMap[this.selectLibraryType])
        }
      },
      getObjData (versionLibrary) {
        let v = this.libraryMaps[versionLibrary]
        let arr = v.split('@')
        let obj = {
          versionLibrary: versionLibrary,
          planeType: arr[0],
          mapping: arr[1],
          createSteps: JSON.parse(arr[2])
        }
        return obj
      }
    }
  }
</script>

<style scoped>
  .library-content-all{
    width: 100%;
    height: 100%;
    position: absolute;
   }
  .library-new-top{
    width: 100%;
    height: 90%;
   }
  .library-new-bottom{
    width: 100%;
    height: 10%;
    border-top: solid 1px #DDDDDD;
  }
  .library-new-left{
    width: 75%;
    float: left;
    height: 100%;
    padding: 0px 5px;
  }
  .library-new-right{
    width: 24%;
    float: left;
    height: 100%;
    border-left: solid 1px #DDDDDD;
  }
  .point-ylgx{
    margin-top: 20px;
  }
  /* 窗口高度大于800px */
  @media screen and (min-height: 800px) {
    .left-menu-item {
      width: 60px;
      height: 84px;
    }
  }
  /* 窗口高度小于800px */
  @media screen and (max-height: 800px) {
    .left-menu-item {
      width: 60px;
      height: 60px;
    }
  }
  .left-menu {
    height: 100%;
    width: 100%;
    background: #F9F9F9;
    padding-top: 10px;
  }

  .left-menu-item img {
    width: 24px;
    height: 24px;
    margin-bottom: 12px;
  }
  .show-menu {
    position: relative;
    opacity: 1;
  }
  .show-menu::after {
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: #2F4B77;
    position: absolute;
    top: 45%;
    right: 0;
  }

  .hide-menu {
    opacity: .5;
  }
</style>
<style>
  .library-new-left .el-tabs__header is-top {
    height:6%;
  }
.library-new-left .el-tabs .el-tabs__content {
  /* height: 94%; */
  height: 100%;
}
</style>
<template>
  <div class="library-content-all">
    <!--新建分析参数左边菜单-->
    <div style="width: 4%;float: left;height: 100%;">
     <div class="left-menu df df-fd-c df-jc-fs df-ai-fs">
       <div v-show="ShowMenueTypeByd.timePoint" :class="[leftMenuItem === 'filter' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="filter" @click="openLeftMenu('filter')">
         <img src="../../assets/images/icon111.png">
         <span>筛选方式</span>
       </div>
      <div v-show="ShowMenueTypeByd.timePoint" :class="[leftMenuItem === 'timePoint' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="timePoint" @click="openLeftMenu('timePoint')">
        <img src="../../assets/images/icon45_1.png">
        <span>时间点</span>
      </div>
       <div v-show="ShowMenueTypeByd.timeSlot" :class="[leftMenuItem === 'timeSlot' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="timeSlot" @click="openLeftMenu('timeSlot')">
         <img src="../../assets/images/icon9.png">
         <span>时间段</span>
       </div>
      <div v-show="ShowMenueTypeByd.measuredValue" :class="[leftMenuItem === 'measuredValue' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="measuredValue" @click="openLeftMenu('measuredValue')">
        <img src="../../assets/images/icon93_1.png">
        <span>测量值</span>
      </div>
      <div v-show="ShowMenueTypeByd.logicalValue" :class="[leftMenuItem === 'logicalValue' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="logicalValue" @click="openLeftMenu('logicalValue')">
        <img src="../../assets/images/icon94_1.png">
        <span>逻辑值</span>
      </div>
      <div :class="[leftMenuItem === 'operation' ? 'show-menu' : 'hide-menu',menuItemClass]" ref="operation" @click="openLeftMenu('operation')">
        <img src="../../assets/images/icon22_1.png">
        <span>事件</span>
      </div>
    </div>
    </div>
    <div style="width: 96%;float: left;height: 100%;">
      <span v-if="leftMenuItem === 'timePoint' ">
        <!--时间点-->
        <ParamTwoEditTimePoint :sid="sid"  :scriptType="scriptType"></ParamTwoEditTimePoint>
      </span>
      <span v-if="leftMenuItem === 'timeSlot' ">
        <!--时间 段-->
        <ParamTwoTimeSlott :sid="sid"  :scriptType="scriptType"></ParamTwoTimeSlott>
      </span>
      <span v-else-if="leftMenuItem === 'measuredValue'">
        <!--测量值-->
        <ParamTwoLibraryMeasure  :sid="sid" :scriptType="scriptType"></ParamTwoLibraryMeasure>
      </span>
      <span v-else-if="leftMenuItem === 'logicalValue'">
        <!--逻辑值-->
        <ParamTwoLibraryLogicalValue  :sid="sid" :scriptType="scriptType"></ParamTwoLibraryLogicalValue>
      </span>
      <span v-else-if= "leftMenuItem === 'filter'">
        <!--筛选方式-->
        <ParamTwoAlgorithmFilter  :sid="sid" :scriptType="scriptType"></ParamTwoAlgorithmFilter>
      </span>
       <span v-else-if= "leftMenuItem === 'operation'">
        <!--事件-->
        <ParamTwoOperation  :sid="sid" :scriptType="scriptType"></ParamTwoOperation>
      </span>
    </div>
  </div>
</template>
<script>
const ParamTwoEditTimePoint = () => import('components/paramtwo/ParamTwoEditTimePoint')
const ParamTwoLibraryMeasure = () => import('components/paramtwo/ParamTwoLibraryMeasure')
const ParamTwoLibraryLogicalValue = () => import('components/paramtwo/ParamTwoLibraryLogicalValue')
const ParamTwoAlgorithmFilter = () => import('components/paramtwo/ParamTwoAlgorithmFilter')
const ParamTwoOperation = () => import('components/paramtwo/ParamTwoOperation')
const ParamTwoTimeSlott = () => import('components/paramtwo/ParamTwoTimeSlott')

export default {
  data () {
    return {
      childCreatorList: [],
      returnData: {
      },
      sid: '',
      childCreatorId: '',
      leftMenuItem: '', // 选中的图标
      menuItemClass: 'left-menu-item df df-fd-c df-jc-c df-ai-c', // 默认的图标样式
      scriptType: '', // 1 时间点，2测量值， 3逻辑值， 4逻辑值 5事件， 0筛选方式
      editScriptType: '',
      typeMap: {
        'timePoint': '1', // 时间点
        'timeSlot': '2', // 时间段 interval
        'measuredValue': '3', // 测量值 3
        'logicalValue': '4', // 逻辑值4
        'operation': '5', // 事件5
        'filter': '0'
      },
      // 根据返回的 type 显示默认图标用
      typeMapById: {
        '1': 'timePoint',
        '3': 'measuredValue',
        '4': 'logicalValue',
        '5': 'operation',
        '2': 'timeSlot',
        '0': 'filter'
      },
      // 根据返回的 type 显示默认图标用
      ShowMenueTypeByd: {
        'timePoint': false,
        'timeSlot': false,
        'measuredValue': false,
        'logicalValue': false,
        'operation': false,
        'filter': false
      }
    }
  },
  components: {
    ParamTwoEditTimePoint,
    ParamTwoLibraryMeasure,
    ParamTwoLibraryLogicalValue,
    ParamTwoAlgorithmFilter,
    ParamTwoOperation,
    ParamTwoTimeSlott
  },
  props: ['scriptId'], // 根据scriptId 查询分析函数详细信息
  mounted () {
    this.getChildCreator()
    this.sid = this.scriptId
  },
  methods: {
    // 点击菜单
    openLeftMenu (menuType) {
      // this.sid = '' // 不清空之前的数据
       var type = this.typeMap[menuType]
       this.leftMenuItem = menuType
       this.scriptType = type
       if (this.editScriptType !== null && this.editScriptType !== undefined && this.editScriptType !== '' && this.scriptType === this.editScriptType) {
         this.sid = this.scriptId
       } else {
        this.sid = ''
      }
    },
    getChildCreator () {
      this.$axios.get('/apm/getChildCreator', {params: {id: '-1'}}).then(response => {
        this.childCreatorList = []
        var data = response.data
        // console.log('data' + data[0].ID)
        if (data.length > 0) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            for (var i = 0; i < data.length; i++) {
              if (this.typeMapById[data[i].ID] !== null || this.typeMapById[data[i].ID] !== undefined) {
                this.ShowMenueTypeByd[this.typeMapById[data[i].ID]] = true
              }
            }
         /*   if (data[0].ID === '0' || data[0].ID === 0) {
              this.filter = true
            } if (data[1].ID === '1' || data[1].ID === 1) {
              this.timePoint = true
            } if (data[2].ID === '3' || data[2].ID === 3) {
              this.measuredValue = true
            } if (data[3].ID === '4' || data[3].ID === 4) {
              this.logicalValue = true
            } if (data[4].ID === '5' || data[3].ID === 5) {
              this.operation = true
            }*/
          }
        }
        if (this.sid !== null && this.sid !== undefined && this.sid !== '') {
          this.getTwoDimensionScriptById()
        } else {
          this.scriptType = 0 // 默认
          this.leftMenuItem = this.typeMapById[this.scriptType]
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    // 修改时 获取到选中菜单的数据
    getTwoDimensionScriptById () {
      this.$axios.get('/apm/getTwoDimensionScriptById', {params: {id: this.sid}}).then(response => {
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.scriptType = data.type
          this.leftMenuItem = this.typeMapById[data.type]
          this.editScriptType = data.type
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
      })
    }
  }
}

</script>

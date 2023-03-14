<style scoped>
.leve-left {
  width:75%;float: left; padding: 10px 10px 10px 40px; border-right: solid 1px #DDDDDD; height: 80vh;
}
.template {
  width: 100%;height: 150px
}
.template-title {
  width: 14%;float: left;padding-top: 3px;
}

.template-content {
  width: 86%;float: left;
}
.template-img {
  width: 60%;cursor: pointer; border: solid 1px white;
}
.template-img-active {
  width: 60%;cursor: pointer;border: solid 1px #253B63
}

.defintion-level-content {
  width: 99%;
}
.tab_level {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 78vh;
  width: 100%;
}

.defintion-level-content .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding-right: 0px;
}

.defintion-level-content .el-table .cell, .el-table th div {
  padding-right: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab-profile {
  width: 100%;
}
td .el-input__inner {
  border: 1px solid #FFF;
}
</style>
<style>
.tableConfig >>> .el-table::before {
  height: 0;
}
td .el-input__inner {
  border: 1px solid #FFF;
}
.row-icon-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.filter-config-table .row-icon-group{
  display: none;
}
.tableConfig {
  height: calc(80vh - 125px);
  width: 100%;
  overflow: auto;
}
.bottomBtn {
  position: relative;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btnBottom {
}
</style>
<template>
  <!--编辑-->
  <div class="tab_level">
    <div class="leve-left">
      <el-tabs v-model="activeName" v-show="IsShowTab"  class="tab-profile">
        <el-tab-pane :label="tabProfileLabel" name="first">
          <div style="font-size: 10px; color: #3A6BB9">
            <p>备注: 事件库等级名称可自定义修改（类型可从右侧选择）</p>
            <p> 事件等级序号最多为10，从01到10表示事件严重程度从低到高。</p>
            <p> 事件库等级确认保存后不可修改</p>
          </div>
          <p>当前事件等级模板：<span style="font-size: 10px; color: #3A6BB9">{{levelName}}</span></p>
          <div class="tableConfig" style="height: calc(80vh - 190px);">
            <el-table
              border
              fit
              height="100%"
              width="100%"
              :data="tableData" highlight-current-row
              :header-row-style="headerRowStyle" :header-cell-style="{height:'38px',padding:'0px'}" :row-style="{height:'38px'}" :cell-style="{padding:'0px'}" >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="" label="请设置事件等级" >
                <div slot-scope="scope">
                  <el-input v-model="scope.row.level" placeholder="自定义" @change="chageData"></el-input>
                </div>
              </el-table-column>
              <el-table-column prop="" label="比较" width="300"></el-table-column>
              <el-table-column prop="" label="操作" width="200">
                <div slot-scope="scope">
                  <div class="row-icon-group">
                    <div class="icon-pack-up tab-icon-set mr10" title="上移"  @click.stop="moveUpRow(scope.$index, scope.row)"></div>
                    <div class="icon-pack-an tab-icon-set mr10" title="下移"  @click.stop="moveDownRow(scope.$index, scope.row)"></div>
                    <div class="icon-pack-top tab-icon-set mr10" title="置顶"  @click.stop="moveTopRow(scope.$index, scope.row)"></div>
                    <div class="icon-delete tab-icon-set mr10" title="删除" @click.stop="tableConfigRowDelete(scope.$index, tableData)"></div>
                  </div>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="btnBottom" style="margin-top: 10px;text-align: right;">
            <el-button type="primary" size="mini" @click.stop="addTabeData()">新增</el-button>
            <el-button type="primary" size="mini"  :disabled="disabledBtn" @click="saveTemp">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="width: 22%;float: left;">
      <div style=" padding: 10px 10px 10px 10px">
        <div class="template">
          <div class="template-title">
            I型
          </div>
          <div class="template-content">
            <img src="../../../assets/images/moban1.png"  :class="templateImg1"  @click="checkTemplate(1)"></div>
        </div>
        <div class="template">
          <div class="template-title">
            II型
          </div>
          <div class="template-content">
            <img src="../../../assets/images/moban2.png" :class="templateImg2"  @click="checkTemplate(2)"></div>
        </div>
        <div class="template">
          <div class="template-title">
            III型
          </div>
          <div class="template-content">
            <img src="../../../assets/images/moban3.png" :class="templateImg3"   @click="checkTemplate(3)"></div>
        </div>
        <div class="template">
          <div class="template-title">
            自定义
          </div>
          <div class="template-content">
            <img src="../../../assets/images/muban4.png" :class="templateImg4"   @click="checkTemplate(4)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      templateImg1: 'template-img ', // 选中 template-img-active
      templateImg2: 'template-img',
      templateImg3: 'template-img',
      templateImg4: 'template-img',
      moban1: [{level: '低级'}, {level: '中级'}, {level: '高级'}],
      moban2: [{level: '一级'}, {level: '二级'}, {level: '三级'}],
      moban3: [{level: 'A'}, {level: 'B'}, {level: 'C'}],
      moban4: [{level: ''}, {level: ''}, {level: ''}],
      profileId1: '',
      disabledBtn: true,
      nowMoban: 0,
      headerRowStyle: {
        'color': '#2A436F',
        'font-size': '10px',
        'line-height': '16px',
        'height': '30px',
        'background': '#F9F9F9'
      },
      tableData: [],
      IsShowTab: true,
      levelName: 'I型',
      activeName: 'first',
      tabProfileLabel: '事件等级'
    }
  },
  props: ['profileId'],
  watch: {
    nowMoban () {
      this.checkDisableBtn()
    }
  },
  mounted () {
    this.profileId1 = this.profileId
    this.rowDropSort()
    this.getProfileEventLevel()
  },
  methods: {
    // 模板默认是没有选中的
    getdefaultTemplateImg () {
      this.templateImg1 = 'template-img'
      this.templateImg2 = 'template-img'
      this.templateImg3 = 'template-img'
      this.templateImg4 = 'template-img'
    },
    checkTemplate (n) {
      this.getdefaultTemplateImg()
      this.nowMoban = n
      switch (n) {
        case 1:
          this.templateImg1 = 'template-img-active'
          this.levelName = 'I型'
          this.tableData = JSON.parse(JSON.stringify(this.moban1))
          break
        case 2:
          this.templateImg2 = 'template-img-active'
          this.levelName = 'II型'
          this.tableData = JSON.parse(JSON.stringify(this.moban2))
          break
        case 3:
          this.templateImg3 = 'template-img-active'
          this.levelName = 'III型'
          this.tableData = JSON.parse(JSON.stringify(this.moban3))
          break
        case 4:
          this.templateImg4 = 'template-img-active'
          this.levelName = '自定义'
          this.tableData = JSON.parse(JSON.stringify(this.moban4))
          break
      }
    },
    getProfileEventLevel () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getProfileEventLevel', {params: {id: this.profileId}}).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        var data = response.data
        if (data && data.length > 0) {
          let obj = {}
          for (let i = 0; i < data.length; i++) {
            obj = {}
            obj['level_index'] = data[i]['EVENT_LEVEL']
            obj['level'] = data[i]['EVENT_CAPTION']
            this.tableData.push(obj)
          }
          this.tableData.sort(this.$util.compare('level_index'))
          this.disabledBtn = false
        } else {
          this.tableData = [{level: '低级'}, {level: '中级'}, {level: '高级'}] // 默认显示模板1
          this.checkTemplate(1) // 选中模板1
        }
      }).catch(response => {
      })
    },
    chageData () {
      this.checkDisableBtn()
    },
    checkDisableBtn () {
      this.disabledBtn = true // 默认禁用
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['level']) {
          this.disabledBtn = false // 如果有一个值不为空则不禁用
          break
        }
      }
    },
    addTabeData () {
      if (this.tableData.length === 10) {
        this.$message({
          message: '最多只能创建10个!',
          type: 'warning'
        })
      } else {
        let obj = {level: ''}
        this.tableData.push(obj)
      }
    },
    // 保存
    saveTemp () {
      this.$bus.$emit('saveTempEmit', this.tableData)
    },
    tableConfigRowDelete (index, rows) {
      rows.splice(index, 1)
      this.checkDisableBtn()
    },
    rowDropSort () { // 行拖拽排序
      const $tbody = document.querySelector('.tableConfig tbody')
      const _this = this
      Sortable.create($tbody, {
        // handle: 'tr',
        animation: 150, // 动画参数
        onStart () {
          _this.tableDataObj = {}
          _this.currentTableConfigRowObj = {}
        },
        onEnd (evt) {
          let newIndex = evt.newIndex
          let oldIndex = evt.oldIndex
          let $tr = $tbody.children[newIndex]
          let $oldTr = $tbody.children[oldIndex]

          if (!_this.$util.isDefine(newIndex) || !_this.$util.isDefine(newIndex) || newIndex === oldIndex) {
            return false
          }

          // 先删除移动的节点
          $tbody.removeChild($tr)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
            $tbody.insertBefore($tr, $oldTr)
          } else {
            $tbody.insertBefore($tr, $oldTr.nextSibling)
          }
          // 更新 tableData 数组
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)

          let _tableData = _this.tableData
          _this.tableData = []

          let newTcData = _tableData.map((item, i) => {
            let tempObj = JSON.parse(JSON.stringify(item))
            tempObj['rowId'] = i + 1
            return tempObj
          })

          _this.tableData = [...newTcData]
          _this.$forceUpdate()

          // 下一个tick就会走patch更新
          let temptableDataObj = {}
          newTcData.forEach((item, index) => {
            item['rowId'] = index + 1
            temptableDataObj[item['id']] = item
            if (item['name' === '请在左侧数据库中选择列名']) {
              this.currentTableConfigRowObj = item
            }
          })
          _this.tableDataObj = temptableDataObj
        }
      })
    },
    moveTopRow (index, row) { // 置顶
      let that = this
      if (index > 0) {
        that.tableData.splice(index, 1)
        that.tableData.splice(0, 0, row)
      } else {
        this.$message({
          message: '已经是第一条，不可置顶!',
          type: 'warning'
        })
      }
    },
    moveUpRow (index, row) { // 上移行
      let that = this
      if (index > 0) {
        that.tableData.splice(index, 1)
        that.tableData.splice(index - 1, 0, row)
        // let upDate = that.tableData[index - 1]
        // that.tableData.splice(index - 1, 1)
        // that.tableData.splice(index, 0, upDate)
        // let _tableData = that.tableData
        // that.tableData = []
        //
        // let newTcData = _tableData.map((item, i) => {
        //   let tempObj = JSON.parse(JSON.stringify(item))
        //   tempObj['rowId'] = i + 1
        //   return tempObj
        // })
        //
        // that.tableData = [...newTcData]
        // that.$forceUpdate()
        //
        // // 下一个tick就会走patch更新
        // let temptableDataObj = {}
        // newTcData.forEach((item, index) => {
        //   item['rowId'] = index + 1
        //   temptableDataObj[item['id']] = item
        //
        //   if (item['name' === '请在左侧数据库中选择列名']) {
        //     this.currentTableConfigRowObj = item
        //   }
        // })
        // that.tableDataObj = temptableDataObj
      } else {
        this.$message({
          message: '已经是第一条，不可上移!',
          type: 'warning'
        })
      }
    },
    moveDownRow (index, row) { // 下移行
      let that = this
      console.log('下移###：', index, row)
      if ((index + 1) === that.tableData.length) {
        this.$message({
          message: '已经是最后一条，不可下移！',
          type: 'warning'
        })
      } else {
        that.tableData.splice(index, 1)
        that.tableData.splice(index + 1, 0, row)
        // console.log(index)
        // let downDate = that.tableData[index + 1]
        // that.tableData.splice(index + 1, 1)
        // that.tableData.splice(index, 0, downDate)
        //
        // let _tableData = that.tableData
        // that.tableData = []
        //
        // let newTcData = _tableData.map((item, i) => {
        //   let tempObj = JSON.parse(JSON.stringify(item))
        //   tempObj['rowId'] = i + 1
        //   return tempObj
        // })
        // that.tableData = [...newTcData]
        // that.$forceUpdate()
        // // 下一个tick就会走patch更新
        // let temptableDataObj = {}
        // newTcData.forEach((item, index) => {
        //   item['rowId'] = index + 1
        //   temptableDataObj[item['id']] = item
        //
        //   if (item['name' === '请在左侧数据库中选择列名']) {
        //     this.currentTableConfigRowObj = item
        //   }
        // })
        // that.tableDataObj = temptableDataObj
      }
    }
  }
}
</script>

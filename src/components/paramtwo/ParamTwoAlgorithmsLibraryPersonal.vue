<style scoped>
  .rule_delete {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    background-image: url(../../assets/images/icon71.png);
    background-size: cover;
    cursor: pointer;
  }
  .analysis_alg .oneDimesional-content-list{
    padding: 0 10px;
    height: calc(100% - 100px);
    margin-bottom: 8px;
    overflow: hidden;
  }
</style>
<style>
  .oneDimesional-content-list .el-table td,
  .oneDimesional-content-list .el-table th {
    /*表格行高*/
    font-size: 12px;
    /* text-align: center; */
  }
  /*.oneDimesional-content-list th {*/
  /*  border: solid 1px #eeeeee;*/
  /*}*/
  /*.oneDimesional-content-list td {*/
  /*  border: solid 1px #eeeeee;*/
  /*  float: left;*/
  /*  margin-top: -2px;*/
  /*  line-height: 35px;*/
  /*  padding-left: 10px;*/
  /*}*/
  .clonum1 {
    width: 25%;
  }
  .clonum2 {
    width: 20%;
  }
  .clonum3 {
    width: 7%;
  }
  .clonum4 {
    width: 15%;
  }
  .clonum5 {
    width: 25%;
  }
  .content_page {
    float: right;
    margin-right: 15px;
    margin-top: 10px;
  }
  .content_page_pag .el-pagination .el-pagination__jump .el-pagination__editor {
    height: 20px;
  }
</style>
<template>
  <div class="container analysis_alg h100">
    <div style="width: 100%;height:48px">
      <el-input v-model="keywords" placeholder="请输入关键字搜索" size="small"
                @keyup.enter.native="searchTwoDimesional()" style="float: right;margin: 8px 10px;width: 200px;font-size: 12px;">
        <i class="el-icon-search el-input__icon"
           slot="suffix"
           @click="searchTwoDimesional()">
        </i>
      </el-input>
      <el-select @change="selectChange()" v-model="selectValue" placeholder="请选择" size="small"  style="float: right;margin: 8px 10px;width: 100px;font-size: 12px;">
        <el-option
          v-for="item in typesList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="oneDimesional-content-list">
      <el-table
        v-loading="loading"
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        :data="OneDimesnisonalData"
        border
        :span-method="objectSpanMethod"
        style="width: 100%" height="100%">
        <el-table-column
          label="算法" width="350" prop="suanfa">
          <div slot-scope="data">
            <span type="text" :title="data.row.suanfa">{{data.row.suanfa}}</span>
          </div>
        </el-table-column>
        <el-table-column
          label="参数库" width="100" prop="suanfa">
          <div slot-scope="data">
            <span type="text" :title="data.row.canshuku">{{data.row.canshuku}}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80">
          <div slot-scope="data">
            {{typeMap[data.row.type]}}
          </div>
        </el-table-column>
        <el-table-column
          prop="param"
          width="200"
          label="分析参数">
          <div slot-scope="data">
            <el-link type="primary" style="color:#409EFF;cursor: pointer" :title="data.row.param" @click="clickParam(data.row)">{{data.row.param}}</el-link>
          </div>
        </el-table-column>
        <el-table-column
          prop="librarys"
          label="版本库">
        </el-table-column>
      </el-table>
    </div>
    <div class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;margin-right: 15px;height:32px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="currentChangeClick"
        :current-page="pageNo"
        :page-sizes="[5, 10, 15, 20, 30, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next,total, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        OneDimesnisonalData: [],
        selectValue: '',
        typesList: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '筛选方式',
            value: '0'
          },
          {
            label: '时间点',
            value: '1'
          },
          {
            label: '时间段',
            value: '2'
          },
          {
            label: '测量值',
            value: '3'
          },
          {
            label: '逻辑值',
            value: '4'
          },
          {
            label: '事件',
            value: '5'
          }
        ],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0,
        keywords: '',
        spanArr: [],
        cskArr: [],
        pos: 0,
        rowIndex: 0,
        type: '',
        typeMap: {
          '0': '筛选方式',
          '1': '时间点',
          '2': '时间段',
          '3': '测量值',
          '4': '逻辑值',
          '5': '事件'
        },
        userId: '1'
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getTwoDimesnisonal(1)
      })
    },
    watch: {
      // keywords () {
      //   this.getTwoDimesnisonal(1)
      // }
    },
    methods: {
      clickParam (obj) {
        let isLinkParam = false
        if (obj.linkTwoDimesnisonalId) {
          isLinkParam = true
        }
        // 下面的数据跳转到新增编辑界面时需要用到
        this.$bus.$emit('param_suanfa_back_param_edit', {
          isCurrentUser: true,
          isLinkParam: isLinkParam,
          backProfileCatalogId: '1',
          paramManagerObj: {NAME: obj.canshuku, ID: obj.canshukuId},
          twoDimensionNamebd: obj.param,
          scriptType: obj.type,
          saveReturnTwoDimensionId: obj.paramId
        })
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit', zhName: obj.param, isClosable: true, parent: 'paramTwo_paramLibray', count: 0, goback: 'ParamTwoSavedAfter'})
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getTwoDimesnisonal(1) // 改变页面大小之后重新查询一次。
      },
      selectChange () {
        this.getTwoDimesnisonal(1)
      },
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex]
          return {
            rowspan: _row,
            colspan: 1
          }
        }
        if (columnIndex === 1) {
          const _row = this.cskArr[rowIndex]
          return {
            rowspan: _row,
            colspan: 1
          }
        }
      },
      getTwoDimesnisonal (page) {
        this.loading = true
        this.$axios.get('/apm/getUserScripts', {
          params: {
            name: this.keywords,
            type: this.selectValue,
            pageNo: page,
            pageSize: this.pageSize
          }
        })
          .then(response => {
            if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              console.log(response.data)
              let data = response.data.content
              this.OneDimesnisonalData = []
              for (var i = 0; i < data.length; i++) {
                let relation = data[i].RELATION
                let suanfa = data[i].SCRIPT
                let type = ''
                let paramId = ''
                let param = ''
                let linkdparam = ''
                Object.keys(relation).forEach(key => {
                  let canshukuArr = key.split('$')
                  let obj = relation[key]
                  Object.keys(obj).forEach(key1 => {
                    let arr = key1.split('$')
                    paramId = arr[0]
                    type = arr[1]
                    linkdparam = arr[2]
                    param = arr[3]
                    let librarys = obj[key1]
                    this.OneDimesnisonalData.push({
                      suanfa: suanfa,
                      canshuku: canshukuArr[1],
                      canshukuId: canshukuArr[0],
                      suanfaCanShuku: suanfa + '@' + key,
                      paramId: paramId,
                      type: type,
                      linkTwoDimesnisonalId: linkdparam,
                      param: param,
                      librarys: JSON.stringify(librarys).replace('["', '').replace(/\$/g, '（').replace(/","/g, '） ').replace('"]', '）')
                    })
                    console.log(this.OneDimesnisonalData)
                  })
                })
              }
              this.loading = false
              this.getSpanArr(this.OneDimesnisonalData)
              this.pageSize = response.data.pageSize
              this.pageNo = response.data.pageNo
              this.totalCount = response.data.recordCount
            }
          }).catch(response => {})
      },
      // 合并单元格计算
      getSpanArr (data) {
        let arrSuanfa = []
        let arrCanShuku = []
        let contactDot = 0
        let cskDot = 0
        this.OneDimesnisonalData.forEach((item, index) => {
          item.index = index
          if (index === 0) {
            arrSuanfa.push(1)
            arrCanShuku.push(1)
          } else {
            if (item.suanfa === this.OneDimesnisonalData[index - 1].suanfa) {
              arrSuanfa[contactDot] += 1
              arrSuanfa.push(0)
              if (item.suanfaCanShuku === this.OneDimesnisonalData[index - 1].suanfaCanShuku) {
                arrCanShuku[cskDot] += 1
                arrCanShuku.push(0)
              } else {
                arrCanShuku.push(1)
                cskDot = index
              }
            } else {
              arrSuanfa.push(1)
              contactDot = index
              arrCanShuku.push(1)
              cskDot = index
            }
          }
        })
        this.spanArr = arrSuanfa
        this.cskArr = arrCanShuku
      },
      deleteData (obj) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/apm/deleteTwoDimensionScript', {
            params: {
              id: obj.id
            }
          }).then(response => {
            let data = response.data
            if (data.status === '0') {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.getTwoDimesnisonal(this.pageNo)
            } else if (data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.$message.error(data.message)
            }
          }).catch(response => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      searchTwoDimesional () {
        this.getTwoDimesnisonal(1)
      },
      currentChangeClick (page) {
        this.getTwoDimesnisonal(page)
      }
    }
  }
</script>

<style scoped>
  .rule_delete {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    background-image: url(../../assets/images/icon71.png);
    background-size: cover;
    cursor: pointer;
  }
</style>
<style>
  .oneDimesional-content-list{
    padding: 0 10px;
  }
  .oneDimesional-content-list .el-table td,
  .oneDimesional-content-list .el-table th {
    /*表格行高*/
    font-size: 12px;
    /* padding: 3px 0px; */
    padding: 3px 0px 3px 10px;
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
  .el-table .success-row {
    background: #eeeeee;
  }
</style>
<template>
  <div class="container">
    <div style="width: 100%;">
      <el-input v-model="keywords" placeholder="请输入关键字搜索" size="small"
                @keyup.enter.native="searchTwoDimesional()" style="float: right;margin: 8px 10px;width: 200px;font-size: 12px;">
        <i class="el-icon-search el-input__icon"
           slot="suffix"
           @click="searchTwoDimesional()">
        </i>
      </el-input>
    </div>
    <div class="oneDimesional-content-list">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        v-loading="loadding"
        :data="functionDataList"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%" height="73vh">
        <el-table-column
          label="函数名" width="100" prop="suanfa">
          <div slot-scope="data">
            <span type="text" :title="data.row.METHOD_NAME">{{data.row.METHOD_NAME}}</span>
          </div>
        </el-table-column>
        <el-table-column
          label="METHOD_BEF_ORE_TYPE" width="200" prop="suanfa">
          <div slot-scope="data">
            {{data.row.METHOD_BEFORE_TYPE}}
          </div>
        </el-table-column>
        <el-table-column
          prop="type"
          label="METHOD_OUT_TYPE"
          width="200">
          <div slot-scope="data">
            {{data.row.METHOD_OUT_TYPE}}
          </div>
        </el-table-column>
        <el-table-column
          prop="METHOD_DESCRIPTION"
          width="200"
          label="描述">
          <!--          <div slot-scope="data">-->
          <!--            {{data.row.METHOD_DESCRIPTION}}-->
          <!--          </div>-->
        </el-table-column>
        <el-table-column
          prop="EXAMPLE"
          label="举例">
        </el-table-column>
      </el-table>
    </div>
    <div v-if="totalCount > 10" class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;margin-right: 15px;margin-top: 10px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="currentChangeClick"
        :current-page="pageNo"
        :page-sizes="[10, 15, 20, 30, 50]"
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
        loadding: false,
        functionDataList: [],
        detail: '',
        pageSize: 10,
        pageNo: 1,
        totalCount: 0,
        keywords: '',
        pos: 0,
        rowIndex: 0
      }
    },
    props: ['dataDetail'],
    mounted () {
      this.detail = this.dataDetail
      this.getSystemFunctionTree()
    },
    watch: {
      dataDetail () {
        this.detail = this.dataDetail
        this.getSystemFunctionTree()
      }
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (row.METHOD_NAME === this.detail) {
          return 'success-row'
        }
        return ''
      },
      // 获取系统函数
      getSystemFunctionTree () {
        this.loadding = true
        this.functionDataList = []
        this.$axios.get('/apm/searchOneDimensionMethods', {params: {searchContent: this.keywords}}).then(response => {
          var data = response.data
          if (data.length > 0) {
            this.loadding = false
            if (this.detail) { // 不为空的话则将选中的行放在第一行
              let selectDataArr = []
              let newDataArr = []
              let obj = {}
              for (let i = 0; i < data.length; i++) {
                obj = data[i]
                if (obj.METHOD_NAME === this.detail) {
                  selectDataArr.push(obj)
                } else {
                  newDataArr.push(obj)
                }
              }
              if (selectDataArr) {
                 this.functionDataList = selectDataArr.concat(newDataArr)
              }
            } else {
              this.functionDataList = data
            }
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.loadding = false
          }
        }).catch(response => {
          this.loadding = false
          this.$message.error('数据加载失败!')
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        // this.getTwoDimesnisonal(1) // 改变页面大小之后重新查询一次。
      },
      selectChange () {
      },
      searchTwoDimesional () {
        this.getSystemFunctionTree()
      },
      currentChangeClick (page) {
      }
    }
  }
</script>

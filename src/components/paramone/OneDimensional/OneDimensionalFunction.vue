<style scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.left_filter_refresh {
  background-image: url(../../../assets/images/icon67.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.oneDimesional-content-list {
  margin-left: 20px;
  height: calc(100% - 90px);
  overflow: hidden;
  margin-bottom: 8px;
}
</style>
<style>
.content_page_pag .el-pagination .el-pagination__jump .el-pagination__editor {
  height: 20px;
}
</style>
<template>
  <div class="container">
    <div style="width: 100%;height:48px">
      <el-input v-model="keywords" placeholder="请输入关键字搜索" size="small"
                @keyup.enter.native="searchOneDimesional()" style="float: right;margin: 8px 10px;width: 200px;font-size: 12px;">
        <i class="el-icon-search el-input__icon"
           slot="suffix"
           @click="searchOneDimesional()">
        </i>
      </el-input>
    </div>
    <div class="oneDimesional-content-list">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        border
        :data="OneDimesnisonalData" height="100%" width="100%">
        <el-table-column label="算法">
          <div slot-scope="data">
            <span type="text" :title="data.row.tableMapped">{{data.row.tableMapped}}</span>
          </div>
        </el-table-column>
       <el-table-column prop="canshuku" label="工程参数" width="200">
         <div slot-scope="data">
         <el-link type="primary" style="color:#409EFF;cursor: pointer" :title="data.row.canshuku" @click="clickParam(data.row)">{{data.row.canshuku}}</el-link>
         </div>
       </el-table-column>
        <el-table-column prop="librarys" label="版本库">
          <div slot-scope="data">
            {{data.row.tableRepository}} （{{data.row.tablePlane}}）
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;margin-right: 15px;height: 32px">
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
      OneDimesnisonalData: [],
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      keywords: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getOneDimesnisonal(1)
    })
  },
  methods: {
    getOneDimesnisonal (page) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getScripts', {
        params: {
          searchContent: this.keywords,
          pageNo: page,
          pageSize: this.pageSize
        }
      }).then(response => {
        let data = response.data
        this.OneDimesnisonalData = []
        if (data) {
          this.OneDimesnisonalData = []
          let content = data.content
          let suanfa = ''
          let canshukuArr = ''
          for (var i = 0; i < content.length; i++) {
            let relation = content[i].RELATION
             suanfa = content[i].SCRIPT
            Object.keys(relation).forEach(key => {
              canshukuArr = key.split('$')
              let arr = relation[key]
              for (let j = 0; j < arr.length; j++) {
                 let arrValue = arr[j].split('$')
                 let libraryId = arrValue[0]
                 let fairType = arrValue[1]
                this.OneDimesnisonalData.push({
                    ID: canshukuArr[0],
                    tableMapped: suanfa,
                    canshuku: canshukuArr[1],
                    tableRepository: libraryId,
                    tablePlane: fairType
                })
              }
            })
          }
          this.pageSize = data.pageSize
          this.pageNo = data.pageNo
          this.totalCount = data.recordCount
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    searchOneDimesional () {
      this.getOneDimesnisonal(1)
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getOneDimesnisonal(this.pageNo)
    },
    currentChangeClick (page) {
      this.getOneDimesnisonal(page)
    },
    refresh () {
      this.getOneDimesnisonal(1)
    },
    // 点击编辑工程函数，显示tab
    clickParam (obj) {
      let arr = []
      arr.push(obj)
      this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_add_suanfa', zhName: obj.canshuku, isClosable: true, parent: 'paramOne_file', count: 0, libraryList: arr})
      // 并且传值到编辑页面
    }
  }
}
</script>

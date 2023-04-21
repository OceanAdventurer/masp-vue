<template>
  <div>
    <el-button v-show="false">新增版本库</el-button>
    <el-dialog title="新版本导入" :visible.sync="upload_DialogVisible">
      <el-upload
        class="upload-demo"
        action=""
        ref="upload"
        :multiple="false"
        :on-change="handleUploadChange"
        :auto-upload="false"
        :before-upload="before_upload"
        :file-list="upload_filelist">
        <div slot="tip" style="margin-top:20px">请选择CSV格式文件，第一行内容为NAME,DESCRIPTION,FREQUENCY</div>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">预览文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="warning" @click="clearUpload">清空</el-button>
      </el-upload>
      <div v-show="upload_preview_list.length != 0" style="margin-top: 10px;">
        版本号:
        <el-input v-model="upload_id" clearable size="small"/>
        版本名称:
        <el-input v-model="upload_name" clearable size="small"/>
        对应机型:
        <el-input v-model="upload_description" clearable size="small"/>
        <el-table :data="upload_preview_list" style="width: 100%;" height="400">
          <el-table-column prop="NAME" label="字段"></el-table-column>
          <el-table-column prop="DESCRIPTION" label="描述"></el-table-column>
          <el-table-column prop="FREQUENCY" label="频率"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upload_cancle">取 消</el-button>
        <el-button type="primary" @click="upload_confirm">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="版本库修改" :visible.sync="edit_DialogVisible">
      <el-form :model="edit_data">
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-input v-model="edit_data.ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="版本名称" :label-width="formLabelWidth">
          <el-input v-model="edit_data.NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应机型" :label-width="formLabelWidth">
          <el-input v-model="edit_data.DESCRIPTION" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialogCancle">取 消</el-button>
        <el-button type="primary" @click="closeEditDialogAndUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pos-a w100 h100 df df-fd-c">
      <div class="df df-jc-fe mt10 mr10 mb10">
        <!-- <el-checkbox-group v-model="statusCheckList" style="padding-right:1cm;" @change="changeStatus">
          <el-checkbox-button v-for="s in status" :label="s" :key="s" border></el-checkbox-button>
        </el-checkbox-group> -->
        <el-select v-model="statusChecked" size="small" placeholder="请选择" style="padding-right:1cm;" @change="changeStatus">
          <el-option
            v-for="item in status"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div class="version-list-input">
          <el-input placeholder="请输入..." v-model="keyword" size="small" @keyup.enter.native="search">
            <!-- <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData('treeKey')" style="font-size: 24px;"></i> -->
          </el-input>
        </div>
      </div>
      <div class="df df-f1" style="padding:0px 10px">
        <el-table
          :data="referenceData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :row-style="{height:'38px'}"
          :header-row-style="{height:'38px'}"
          :header-cell-style="{padding:'0px'}"
          :cell-style="{padding:'0px'}"
          height="100%"
          border
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="clickEditDialog">
          <el-table-column prop="ID" label="版本号"></el-table-column>
          <el-table-column prop="NAME" label="版本名称"></el-table-column>
          <el-table-column prop="DESCRIPTION" label="对应机型"></el-table-column>
          <el-table-column prop="ENABLE" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.ENABLE === 0 || scope.row.ENABLE === '0'">
                停用
              </div>
              <div v-else>
                启用
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="ENABLE" v-if="this.hasMenue">
            <template slot-scope="scope">
              <div class="opt_col">
                <span @click="openModelDetail(scope.row.ID)">查看</span>&nbsp;&nbsp;
                <span @click="switchModelStatus(scope.row.ID)" v-if="scope.row.ENABLE === 0 || scope.row.ENABLE === '0'">启用</span>
                <span @click="switchModelStatus(scope.row.ID)" v-else>停用</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="AAA" v-else>
            <template slot-scope="scope">
              <div class="opt_col">
                <span @click="openModelDetail(scope.row.ID)">查看</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="version-list-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 20, 30, 50]"
          :page-size="pagesize"
          layout="sizes, prev, pager, next, total"
          :total="referenceData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

const Loading = () => import('components/base/Loading')

export default {
  data () {
    return {
      hideMenuObj: {},
      disabledMenuObj: {},
      hasMenue: false,
      URL: 'dataTable',
      dataTableEditAuthority: false,
      isOperation: false,
      timer: null,
      keyword: '',
      currentPage: 1,
      pagesize: 15,
      referenceData: [],
      selectValue: '',
      multipleSelection: [],
      upload_filelist: [],
      upload_DialogVisible: false,
      upload_preview_list: [],
      upload_id: '',
      upload_name: '',
      upload_description: '',
      edit_DialogVisible: false,
      edit_data: {
        ID: '',
        NAME: '',
        DESCRIPTION: ''
      },
      formLabelWidth: '120px',
      statusChecked: '全部',
      status: ['全部', '启用', '停用']
    }
  },
  created () {
    const that = this
    this.$bus.$on('import_showDialog', () => {
      that.showDialog()
    })

    this.$bus.$on('reloadVersionListData', () => {
      this.changeStatus(this.statusChecked)
    })
  },
  mounted () {
    // this.changeStatus(this.statusChecked)
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('import_showDialog') // 移除自定义事件监听器。
    this.$bus.$off('reloadVersionListData') // 移除自定义事件监听器。
  },
  components: {
    Loading
  },
  methods: {
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj['dataTable_version_list_Import'] = true // 顯示菜單
      disabledMenuObj['dataTable_version_list_Import'] = !this.$util.dataTableEditAuthority
      // this.hideMenuObj = hideMenuObj
      // this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'dataTable_repository', hideMenuObj, disabledMenuObj)
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    clearUpload () {
      this.upload_filelist = []
      this.upload_preview_list = []
      this.$message('清空成功')
    },
    showDialog () {
      this.upload_filelist = []
      this.upload_preview_list = []
      this.upload_id = ''
      this.upload_name = ''
      this.upload_description = ''
      this.upload_DialogVisible = true
    },
    openModelDetail (modelID) { // 点击二级菜单打开tab标签页
      this.isOperation = true
      this.$bus.$emit('dataTableAddTab', {enName: 'dataTable_version_detail', zhName: '版本详情', isClosable: true, parent: parent, count: 0, modelID: modelID})
      // this.$bus.$emit('openModelDetail', 'dataTable_version_detail', modelID + ' 版本库详情', true, modelID)
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    fileNewNodeClick (data) {
      console.log(data)
    },
    tabFileNewContent (tab, event) {
      console.log(tab, event)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    searchTreeData (flag) {
    },
    before_upload (file) {
      let vc = this
      let formData = new FormData()
      formData.append('file', file)
      vc.$axios.post('/etl/model/upload', formData).then(response => {
        if (response.data.status === 'E1001') {
          vc.$bus.$emit('logBackInHandle', response.data)
        } else if (response.data.message) {
          vc.$message(response.data.message)
        } else {
          vc.upload_preview_list = response.data.list
        }
      }, function () {
        vc.$message('上传失败')
      })
      return false
    },
    submitUpload () {
      if (this.upload_filelist.length === 0) {
        this.$message('未选择任何文件')
        return false
      }
      this.$refs.upload.submit()
    },
    upload_confirm () {
      this.upload_DialogVisible = false
      let vc = this
      let formData = new FormData()
      formData.append('JSON', JSON.stringify(this.upload_preview_list))
      formData.append('MODEL_ID', this.upload_id)
      formData.append('NAME', this.upload_name)
      formData.append('DESCRIPTION', this.upload_description)
      vc.$axios.post('/etl/model/import', formData).then(response => {
        if (response.data.status === 'E1001') {
          vc.$bus.$emit('logBackInHandle', response.data)
        } else {
          vc.$message(response.data.message)
        }
      }, function () {
        console.log('failed')
      })
    },
    upload_cancle () {
      this.upload_DialogVisible = false
      this.upload_preview_list = []
    },
    clickEditDialog (row, event, column) {
      if (this.$util.dataTableEditAuthority) {
        if (this.isOperation) { // 点击行的按钮会触发这个事件，如果是true说明是点击按钮触发的，直接将其改为false即可，下次点击行则为false则操作
          this.isOperation = false
        } else {
          this.edit_DialogVisible = true
          this.edit_data.ID = row.ID
          this.edit_data.NAME = row.NAME
          this.edit_data.DESCRIPTION = row.DESCRIPTION
        }
      }
    },
    closeEditDialogAndUpdate () {
      this.edit_DialogVisible = false
      let vc = this
      let formData = new FormData()
      formData.append('ID', this.edit_data.ID)
      formData.append('NAME', this.edit_data.NAME)
      formData.append('DESCRIPTION', this.edit_data.DESCRIPTION)
      vc.$axios.post('/etl/model/edit', formData).then(response => {
        if (response.data.status === 'E1001') {
          vc.$bus.$emit('logBackInHandle', response.data)
        } else {
          vc.$message(response.data.message)
          vc.changeStatus(vc.statusChecked)
        }
      }).catch(() => {
        vc.$message('执行失败，请检查')
      })
    },
    closeEditDialogCancle () {
      this.edit_DialogVisible = false
      this.edit_data = {ID: '', NAME: '', DESCRIPTION: ''}
    },
    switchModelStatus (id) {
      this.isOperation = true
      this.$axios({
        url: '/etl/model/switchStatus',
        method: 'get',
        params: {
          MODEL_ID: id
        }
      }).then(response => {
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.success(response.data.message)
          this.changeStatus(this.statusChecked)
        }
      }).catch(response => {
        this.$message.error(response.data.message)
      })
    },
    handleUploadChange (file, fileList) {
      this.upload_filelist = fileList.slice(-1)
    },
    changeStatus (value) {
      this.hasMenue = this.$util.dataTableEditAuthority
      let tmpList = []
      this.$axios.get('/etl/model?keyword=' + this.keyword).then(response => {
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          tmpList = response.data
          if (value === '启用') {
            tmpList = tmpList.filter(t => t.ENABLE === 1)
          } else if (value === '停用') {
            tmpList = tmpList.filter(t => t.ENABLE === 0)
          }
          this.referenceData = tmpList
        }
      })
      this.currentPage = 1
    },
    search () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.changeStatus(this.statusChecked)
      }, 300)
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style scoped>
.version-list-pagination {
    position: relative;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
}

</style>

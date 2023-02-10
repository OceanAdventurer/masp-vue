<template>
  <div class="margin-top-10 version-name">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div class="fleet-dialog">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="demo-ruleForm"
          center
        >
          <el-form-item label="版本名" prop="versionName">
            <el-input
              v-model="ruleForm.versionName"
              style="width: 200px"
              @keyup.native="ruleForm.versionName = ruleForm.versionName"
            ></el-input>
          </el-form-item>
          <el-form-item label="标准航段时间版本" prop="standardTimeVersionId">
            <el-select
              v-model="ruleForm.standardTimeVersionId"
              style="width: 200px"
              clearable
              placeholder="请选择航季"
            >
              <el-option
                v-for="item in versionTypeAll"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              style="width: 200px"
              @keyup.native="ruleForm.remark = ruleForm.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 检索 -->
    <app-search-warp
      :buttonInfo="buttonInfo"
      :addSearchButtonText="'导入'"
      :hasAddSearch="true"
      :hasDownloadFile="true"
      :label-width="80"
      @subSearch="handleSearch"
      @subClear="handleClear"
      @subAdd="handleAdd"
      @subExport="handleExport"
    >
      <app-search-item label="版本名:">
        <el-input
          v-model="versionName"
          placeholder="请输入版本名"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>

      <app-search-item label="航季:">
        <el-select v-model="season" clearable>
          <el-option
            v-for="item in seasonOption"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          ></el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="数据来源:">
        <el-select v-model="source" clearable>
          <el-option
            v-for="item in sourceOption"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          ></el-option>
        </el-select>
      </app-search-item>
    </app-search-warp>

    <!-- 数据展示 -->
    <el-card class="margin-top-10" v-loading="loading">
      <app-table
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
        :dailyVersionButton="true"
        :isHasButtons="false"
        @addRemark="addRemark"
      />
    </el-card>
    <confirm-dialog
      :dialogVisible="dialogVisibleDelete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    ></confirm-dialog>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import DailyPlan from '@/api/dailyPlan'
import confirmDialog from '@/plugins/components/confirmDialog.vue'
import { mapGetters } from 'vuex'

const defaultSearch = {
  account: '',
  queryBeginTime: '',
  queryEndTime: '',
  hostName: '',
  hostIp: '',
  time: []
}

export default {
  components: { confirmDialog },
  name: 'Home',
  mixins: [tableMixin],
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      versionType: '', // 版本类型
      versionName: '',
      remark: '',
      title: '',
      ruleFormData: {
        versionName: '',
        season: '',
        status: '',
        standardTimeVersionId: '',
        fileList: [],
        remark: ''
      },
      rules: {
        versionName: [
          { required: true, message: '请输入日计划版本名', trigger: 'blur' }
        ],
        season: [{ required: true, message: '请输入航季', trigger: 'blur' }],
        standardTimeVersionId: [
          { required: true, message: '请选择标准航段时间版本', trigger: 'blur' }
        ],
        upload: [{ required: true, validator: this.validateFiles }]
      },
      dialogVisible: false,
      search: { ...defaultSearch },
      optionWidth: 120,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // console.log(DefaultPageInfo)
      const params = {
        season: this.season,
        sourceType: this.source,
        status: this.status,
        // version: this.version,
        remark: this.remark,
        type: this.versionType,
        versionName: this.versionName,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.loading = true
      await DailyPlan.getVersionPage(params)
        .then(res => {
          this.loading = false
          if (res.success) {
            this.listQueryParams.total = res.data.total
            this.tableData = res.data.list
            this.tableData.map((item, index) => {
              if (item.createdAt) {
                this.tableData[index].createdAt = this.getData(item.createdAt)
              }
              if (item.modifiedAt) {
                this.tableData[index].modifiedAt = this.getData(item.modifiedAt)
              }
              if (item.endDate) {
                this.tableData[index].endDate = this.getTimeDate(item.endDate)
              }
              if (item.beginDate) {
                this.tableData[index].beginDate = this.getTimeDate(
                  item.beginDate
                )
              }
              if (item.operationList.length > 0) {
                this.tableData[index].operationList = this.getMenuIcon(
                  item.operationList
                )
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    addRemark(e) {
      let info = {
        remark: e.remark,
        versionId: e.id
      }
      this.loading = true
      DailyPlan.versionAddRemark(info)
        .then(res => {
          this.loading = false
          if (res.success) {
            this.$message.success('修改成功！')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.listQueryParams.limit = 10
      this.season = ''
      this.source = ''
      this.status = ''
      //   this.version = ''
      this.versionType = ''
      this.versionName = ''
      this.remark = ''
      this.getList()
    },
  }
}
</script>
<style scoped>
.upload-demo {
  width: 240px;
}
</style>

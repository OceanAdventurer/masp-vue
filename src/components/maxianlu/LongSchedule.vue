<template>
  <div class="margin-top-10 TF">
    <div v-if="isShow">
      <!-- 数据展示 -->
      <div
        class="margin-top-10"
        style="margin-bottom: 10px"
        v-loading="downLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-card>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="text_h">计划使用时刻</h4>
              <a-table
                size="small"
                :columns="columns"
                :pagination="false"
                :data-source="longScheduleData"
                ><template
                  v-for="col in [
                    'fri',
                    'mon',
                    'sat',
                    'sun',
                    'thu',
                    'tue',
                    'wed'
                  ]"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <div :key="col">
                    <div v-if="col == 'mon'">
                      <div @click="getTimeFlow(text, record, '1')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'tue'">
                      <div @click="getTimeFlow(text, record, '2')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'wed'">
                      <div @click="getTimeFlow(text, record, '3')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'thu'">
                      <div @click="getTimeFlow(text, record, '4')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'fri'">
                      <div @click="getTimeFlow(text, record, '5')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'sat'">
                      <div @click="getTimeFlow(text, record, '6')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'sun'">
                      <div @click="getTimeFlow(text, record, '7')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </a-table>
            </div>
            <div class="flex-item">
              <h4 class="text_h">时刻库</h4>
              <a-table
                size="small"
                :columns="columns"
                :pagination="false"
                :data-source="dbDate"
              >
                <template
                  v-for="col in [
                    'fri',
                    'mon',
                    'sat',
                    'sun',
                    'thu',
                    'tue',
                    'wed'
                  ]"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <div :key="col">
                    <div v-if="col == 'mon'">
                      <div @click="getDBTimeFlow(text, record, '1')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'tue'">
                      <div @click="getDBTimeFlow(text, record, '2')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'wed'">
                      <div @click="getDBTimeFlow(text, record, '3')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'thu'">
                      <div @click="getDBTimeFlow(text, record, '4')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'fri'">
                      <div @click="getDBTimeFlow(text, record, '5')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'sat'">
                      <div @click="getDBTimeFlow(text, record, '6')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                    <div v-else-if="col == 'sun'">
                      <div @click="getDBTimeFlow(text, record, '7')">
                        <span>{{ text }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </a-table>
            </div>
            <div class="flex-item">
              <h4 class="text_h">差值</h4>
              <a-table
                size="small"
                :columns="columns"
                :pagination="false"
                :data-source="differenceData"
              >
              </a-table>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import LongSchedule from '@/api/longSchedule'

export default {
  name: 'User',
  mixins: [tableMixin],
  data() {
    return {
      flightType: '',
      flightTypeSelect: [],
      DBversionId: '',
      dbType: 'dbDate',
      paramsData: {},
      isShow: true,
      contrastVersionId: '',
      longScheduleData: [],
      dbDate: [],
      differenceData: [],
      depOrArr: 'all',
      airport: '',
      thislongScheduleId: '',
      options: [],
    }
  },
  methods: {
    changeThislongScheduleId() {
      this.dbDateVersionId = ''
      this.dbType = 'longSchedule'
      this.DBversionId = this.contrastVersionId
    },
    changeDbDataVersionId() {
      this.contrastVersionId = ''
      this.dbType = 'dbDate'
      this.DBversionId = this.dbDateVersionId
    },
    getList() {
      if (this.airport == '') {
        this.$message.warning('请输入机场')
        return false
      }
      const params = {
        flightType: this.flightType.join(','),
        longScheduleVersionId: this.thislongScheduleId,
        longScheduleContrastVersionId: this.contrastVersionId,
        dbDateVersionId: this.dbDateVersionId,
        airport: this.airport,
        depOrArr: this.depOrArr,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.downLoading = true
      LongSchedule.longScheduleSlotFlowContrast(params)
        .then(res => {
          if (res && res.success) {
            this.downLoading = false
          } else {
            this.downLoading = false
            this.$message.error('数据加载失败')
          }
        })
        .catch(() => {
          this.downLoading = false
          this.$message.error('数据加载失败')
        })
    },
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.flex-container .flex-item {
  width: 32%;
}
.text_h {
  font-size: 15px;
  text-align: center;
  background: #f9f9f9;
  margin-bottom: 0;
  border: 1px solid #e8e8e8;
  border-bottom: none;
}
</style>

<template>
  <div class="clean-rules-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item class="form-item-first">
        <div>分类</div>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.type" placeholder="请选择"  @change="changePlatForm">
          <el-option
            v-for="(item, index) in cleanRuleTables"
            :key="index"
            :label="item.label"
            :value="item.type">
          </el-option>
        </el-select>
        <el-select v-model="form.ruleType" placeholder="请选择" v-if="form.type == 'THRESHOLD'" @change="changeRule">
          <el-option
            v-for="(item, index) in thresholdData"
            :key="index"
            :label="item.operateDesc"
            :value="item.operate">
          </el-option>
        </el-select>
        <span v-if="form.type == 'THRESHOLD' ">
          <span v-if="form.ruleType != 'RANGE'">
            <el-input maxlength="9" v-model="value1"></el-input>
          </span>
          <span v-else>
            <el-input maxlength="9" v-model="value1"></el-input>
            -
            <el-input maxlength="9" v-model="value2"></el-input>
          </span>
        </span>
        <span v-if="form.type == 'NORMAL DISTRIBUTION'">
          {{ normalDistributionData.operateDesc || ""}}，上限
          <el-input maxlength="9" v-model="value1"></el-input>
          %，下限
          <el-input maxlength="9" v-model="value2"></el-input>
          %
        </span>
        <span v-if="form.type == 'STD DEV'">
          {{ stddevData.operateDesc || ""}}
          <el-input maxlength="9" v-model="value1"></el-input>
          σ
        </span>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['cleanShow', 'twoDimensionParamId', 'paramDetailData'],
  data () {
    return {
      form: {
        type: '',
        ruleType: ''
      },
      thresholdData: {},
      normalDistributionData: {},
      stddevData: {},
      value1: '',
      value2: '',
      cleanRuleTables: []
    }
  },
  mounted () {
    let form = ''
    if (this.paramDetailData.etlConfig) {
      form = {
        type: this.paramDetailData.etlConfig.CATEGORY,
        ruleType: this.paramDetailData.etlConfig.OPERATE
      }
      this.value1 = this.paramDetailData.etlConfig.VALUE1
      this.value2 = this.paramDetailData.etlConfig.VALUE2
    }
    this.init(form)
  },
  methods: {
    // 修改分类规则
    changeRule () {
      this.value1 = ''
      this.value2 = ''
      if (this.paramDetailData.etlConfig && this.form.ruleType === this.paramDetailData.etlConfig.OPERATE) {
        this.value1 = this.paramDetailData.etlConfig.VALUE1
        this.value2 = this.paramDetailData.etlConfig.VALUE2
      }
    },
    // 修改分类
    changePlatForm () {
      this.value1 = ''
      this.value2 = ''
      this.form.ruleType = ''
      let type = this.cleanRuleTables.find(item => item.type === this.form.type)
      if (this.paramDetailData.etlConfig) {
        let rule = type.value.find(item => item.operate === this.paramDetailData.etlConfig.OPERATE)
        if (rule) this.form.ruleType = rule.operate
        if (this.paramDetailData.etlConfig.CATEGORY === this.form.type) {
          this.value1 = this.paramDetailData.etlConfig.VALUE1
          this.value2 = this.paramDetailData.etlConfig.VALUE2
        }
      }
    },
    init (form) {
      this.treeLoading = true
      this.$axios.get('/apm/getEtlProperties').then(response => {
        this.treeLoading = false
        let respData = JSON.parse(JSON.stringify(response.data))
        let handleData = []
        respData.forEach(item => {
          let index = handleData.findIndex(item1 => item1.type === item.type)
          if (index === -1) {
            item.value = [item.value]
            handleData.push(item)
          } else {
            handleData[index].value.push(item.value)
          }
        })
        this.$nextTick(() => {
          if (form) {
            this.form = form
          } else {
            this.form = {
              type: 'THRESHOLD',
              ruleType: 'GT'
            }
          }
          this.cleanRuleTables = handleData
          this.thresholdData = handleData.find(item => item.type === 'THRESHOLD').value
          this.normalDistributionData = handleData.find(item => item.type === 'NORMAL DISTRIBUTION').value[0] || {}
          this.stddevData = handleData.find(item => item.type === 'STD DEV').value[0] || {}
        })
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.tableLoading = false
      })
    },
    // 清洗规则数据校验
    confirmNumber (num, type) {
      let reg
      if (type === 1) {
        // 匹配最多2位小数的浮点数(阈值)
        reg = /^(-?\d+)(\.\d{1,2})?$/
      } else if (type === 2) {
        // 匹配0-100浮点数(分布舍弃)
        reg = /^(\d?\d(\.\d*)?|100)$/
      } else if (type === 3) {
        // 匹配最多2位小数的正浮点数(标准差)
        reg = /^\d+(\.\d{1,2})?$/
      }
      if (num !== '') {
        if (!reg.test(num)) {
          this.$message.error('请输入正确数字！')
          return false
        }
      }
      return true
    },
    cancel () {
      this.$emit('update:cleanShow', false)
    },
    save () {
      let param = {
        twoDimensionId: this.twoDimensionParamId,
        value1: this.value1,
        value2: this.value2
      }
      let type = this.cleanRuleTables.find(item => item.type === this.form.type)
      let rule = {}
      if (this.form.type !== 'THRESHOLD') {
        rule = type.value[0]
        param['apmEtlPropertyId'] = rule.id
        if (this.form.type === 'NORMAL DISTRIBUTION') {
          if (param.value1 && param.value2) {
            this.$message.error('按照分布，舍弃上/下限，上限和下限可以只填一个!')
            return
          }
          if (!this.value1 && !this.value2) {
            this.$message.error('按照分布，舍弃上/下限，请填写上限值或者下限值!')
            return
          }
          let res = this.confirmNumber(this.value1, 2)
          if (!res) return
          let res1 = this.confirmNumber(this.value2, 2)
          if (!res1) return
        } else {
          if (!this.value1) {
            this.$message.error('按标准差，删除，请输入值!')
            return
          }
          let res = this.confirmNumber(this.value1, 3)
          if (!res) return
        }
      }
      if (this.form.type === 'THRESHOLD') {
        rule = type.value.find(item => item.operate === this.form.ruleType)
        param['apmEtlPropertyId'] = rule.id
        if (rule.operate === 'RANGE') {
          if (!this.value1) {
            this.$message.error('请设置阈值范围值左边值！')
            return
          }
          if (!this.value2) {
            this.$message.error('请设置阈值范围值右边值！')
            return
          }
        } else {
          if (!this.value1 && !this.value2) {
            this.$message.error(`请设置阈值${rule.operateDesc}值！`)
            return
          }
        }
        if (this.value1 && this.value2) {
          if (parseFloat(param.value1) >= parseFloat(param.value2)) {
            this.$message.error('设置阈值范围值左边数据必须小于右边数据！')
            return
          }
        }
        let res = this.confirmNumber(this.value1, 1)
        if (!res) return
        let res1 = this.confirmNumber(this.value2, 1)
        if (!res1) return
      }
      this.$axios.post('/apm/addTwoDimensionEtlConfig', this.$qs.stringify(param)).then(response => {
        let data = response.data
        this.treeLoading = false
        if (data['status']) {
          if (response.data.status === 'E5000') {
            this.$message.error(response.data.message)
          } else {
            this.$message.success(response.data.message)
          }
          this.$emit('refreshCleanRule', this.twoDimensionParamId)
        }
      }).catch(response => {
        this.$message.error('数据保存失败!')
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped>
.clean-rules-container {
  height: 150px;
}
.clean-rules-container >>> .el-input {
  width: 15%;
}
.clean-rules-container >>> .el-select .el-input {
  width: 100%;
}
.clean-rules-container >>> .el-form-item__content {
  margin-left: 5px !important;
}
.clean-rules-container >>> .form-item-first {
  margin-bottom: 0px;
}
</style>

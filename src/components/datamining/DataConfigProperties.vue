<style>
.mylabel{
  width: 90%;
  margin-top: 10px;
}
.myinput {
  width: 100%;
  margin-top: 10px;
}
.properties {
  width: 87%;
  padding-left: 22px;
}
</style>
<template>
  <div class="properties">
    <div>
      <el-form ref="form" :model="form" label-width="120px">
           <div class="mylabel">算法选择：</div>
        <div class="myinput">
           <el-select v-model="form.algorSelect" placeholder="请选择" size="mini" style="width: 100%;" @change="changeData">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="mylabel" v-show="form.algorSelect !== '' && form.algorSelect !== 'fpgrowth'">归一化：</div>
        <div class="myinput" v-show="form.algorSelect !== '' && form.algorSelect !== 'fpgrowth'">
          <el-select v-model="form.normal" placeholder="请选择" size="mini" style="width: 100%;">
            <el-option   v-for="item in guiyihuaLisst" :key="item.value"  :label="item.label"   :value="item.value"></el-option>
          </el-select>
        </div>
        <!---以上每个都有-->
        <div class="mylabel" v-show="form.algorSelect === 'linear' || form.algorSelect === 'svm'">正则函数类型：范围是[0,1]的数：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear' || form.algorSelect === 'svm'" >
          <el-input v-model="form.regParam"  clearable size="mini"   @blur="validateRegParam"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'linear'">弹性参数：取值区间[0,1]：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear'">
          <el-input v-model="form.elasticNetParam"  clearable size="mini" @blur="validateElasticNetParam"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'linear' || form.algorSelect === 'kmeans'">最大迭代次数：范围是>=0的整数：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear' || form.algorSelect === 'kmeans'">
          <el-input v-model="form.maxIter"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'linear'">求解器：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear'">
            <el-select v-model="form.solver" placeholder="请选择" size="mini" style="width: 100%;">
              <el-option
                v-for="item in solverList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'linear'">是否拟合截距：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear'">
            <el-select v-model="form.fitIntercept" placeholder="请选择" size="mini" style="width: 100%;">
              <el-option
                v-for="item in fitInterceptList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'svm'">迭代次数：范围是>=0的整数：</div>
        <div class="myinput" v-show="form.algorSelect === 'svm'">
          <el-input v-model="form.numIterations"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'svm'">迭代步伐大小：</div>
        <div class="myinput" v-show="form.algorSelect === 'svm'">
          <el-input v-model="form.stepSize"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'svm'">训练批次大小：</div>
        <div class="myinput" v-show="form.algorSelect === 'svm'">
          <el-input v-model="form.miniBatchFraction"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'linear' || form.algorSelect === 'svm'">选中的标签列：</div>
        <div class="myinput" v-show="form.algorSelect === 'linear' || form.algorSelect === 'svm'">
          <el-select v-model="form.features" placeholder="请选择" size="mini" style="width: 100%;">
            <el-option
              v-for="item in featuresList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'kmeans'">K值：范围是>=2的整数：</div>
        <div class="myinput" v-show="form.algorSelect === 'kmeans'">
          <el-input v-model="form.k"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'kmeans'">runs：</div>
        <div class="myinput" v-show="form.algorSelect === 'kmeans'">
          <el-input v-model="form.runs"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'fpgrowth'">最低支持度：范围是[0,1]的小数：</div>
        <div class="myinput" v-show="form.algorSelect === 'fpgrowth'" @blur="minSupport">
          <el-input v-model="form.minSupport"  clearable size="mini" @blur="minSupport"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'fpgrowth'">最小可信度：范围是[0,1]的小数：</div>
        <div class="myinput" v-show="form.algorSelect === 'fpgrowth'">
          <el-input v-model="form.minConfidence"  clearable size="mini"  @blur="minConfidence"></el-input>
        </div>
        <div class="mylabel" v-show="form.algorSelect === 'fpgrowth'">数据分区：</div>
        <div class="myinput" v-show="form.algorSelect === 'fpgrowth'">
          <el-input v-model="form.numPartitions"  clearable size="mini"   oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Manager',
  data () {
    return {
      rules: {
        model: [{required: false, message: '请输入产品型号', trigger: 'blur'}],
        number: [{required: false, message: '请输入出货数量', trigger: 'blur'}]
      },
      form: {},
      fitInterceptList: [{value: true, label: '是'}, {value: false, label: '否'}],
      solverList: [{value: 'auto', label: 'auto'}, {value: 'l-bfgs', label: 'l-bfgs'}, {value: 'sgd', label: 'sgd'}],
      guiyihuaLisst: [{value: 0, label: '0均值标准化'}, {value: 1, label: '离差标准化'}],
      featuresList: [],
      options: [{value: 'linear', label: '线性回归'}, {value: 'svm', label: 'svm'}, {value: 'kmeans', label: 'kmeans'}, {value: 'fpgrowth', label: 'fpgrowth'}],
      zchstypeList: [{value: '0', label: '0'}, {value: '[0-1]', label: '[0-1]'}]
    }
  },
  props: ['form1'],
  watch: {
  },
  mounted () {
    this.form = this.form1
  },
  destroyed () {
  },
  methods: {
    validateElasticNetParam () {
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.form.elasticNetParam) || this.form.elasticNetParam > 1 || this.form.elasticNetParam < 0) {
        this.$message({
          type: 'error',
          message: '请输入0-1之间的数字',
          showClose: true
        })
        this.form.elasticNetParam = 0
        return false
      }
     },
    validateRegParam () {
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.form.regParam) || this.form.regParam > 1 || this.form.regParam < 0) {
        this.$message({
          type: 'error',
          message: '请输入0-1之间的数字',
          showClose: true
        })
        this.form.regParam = 0
        return false
      }
     },
    minSupport () {
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.form.minSupport) || this.form.minSupport > 1 || this.form.minSupport < 0) {
        this.$message({
          type: 'error',
          message: '请输入0-1之间的数字',
          showClose: true
        })
        this.form.minSupport = 0
        return false
      }
     },
    minConfidence () {
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.form.minConfidence) || this.form.minConfidence > 1 || this.form.minConfidence < 0) {
        this.$message({
          type: 'error',
          message: '请输入0-1之间的数字',
          showClose: true
        })
        this.form.minConfidence = 0
        return false
      }
     },
    changeData () {
     this.$emit('emitSelectData')
    }
  }
}
</script>
<style scoped>
.manager {
  font-size: 12px;
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>

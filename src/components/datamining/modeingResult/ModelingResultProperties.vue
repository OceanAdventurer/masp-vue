
<style scoped>
* {
  box-sizing: border-box;
}
.bt {
  border-bottom: 1px solid #DDDDDD;
}

.base-result-content {
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
}
.base-result-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.base-result-content >>> .el-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
.base-result-content >>> .el-tabs__header.is-top {
  height: 50px;
}
.base-result-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.base-result-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}

.base-result-right{
  width: 30%;
  height: 100%;
  overflow: auto;
}

.modeing-data-set {
  margin-left: 10px;
}
.modeing-data-title {
  position: relative;
  padding: 20px 5px 10px 0;
  font-size: 12px;
  border-bottom: 1px solid #dddddd;
}
.modeing-type {
  width: 135px;
}
.modeing-name {
  min-width: 0;
  padding-left: 5px;
}
.modeing-name-text {
  width: 155px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.modeing-data-title::before {
  top: 25px;
  right: 8px;
  border-top-color: #999999;
  position: absolute;
  transform: rotate(0deg);
  transition: all 0.3s;
}
.modeing-data-title.active:after {
  top: 15px;
  transform: rotate(180deg);
  transition: all 0.3s;
}
.modeing-data-title.active:before {
  top: 13px;
  transform: rotate(180deg);
  transition: all 0.3s;
}
.modeing-item-list {
  height: 0;
  position: relative;
  overflow: hidden;
  transition: height 0.6s;
}
.modeing-item-list.active {
  height: auto;
}
.modeing-item {
  margin-top: 16px;
}
.modeing-item-name {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 12px;
  margin-right: 10px;
}

.base-result-bottom {
  width: 100%;
  height: 70px;
}

.base-result-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}

.modeing-content {
  overflow-x: hidden;
  overflow-y: auto;
}

.c-r {
  color: red;
}
.c-l {
  color: green;
}

.table-wrapper {
  margin-top: 10px;
  /* border: 1px solid #DDDDDD; */
  /* border-bottom: none; */
}

.table-wrapper >>> .el-table::before {
  height: 0;
}

.xhg-charts {
  position: relative;

  margin-top: 10px;
  height: 340px;

  border: 1px solid #ddd
}

.chart-boxs {
  margin-top: 10px;
}

.xlj-charts {
  position: relative;

  height: 340px;

  width: 50%;
  margin-right: 20px;

  border: 1px solid #ddd
}
</style>
<template>
  <div class="df df-fd-c" style="padding-right: 5px;">
    <div class="modeing-data-set">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">名称:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text">{{resultData['dataMiningName']}}</div>
        </div>
      </div>
    </div>

    <div class="modeing-data-set">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">算法:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text">{{ resultData['dataMiningType'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set"  v-show="resultData.dataMiningType !== '' && resultData.dataMiningType !== 'fpgrowth'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">归一化:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text" v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData'] && resultData['createStep']['propertiesFormData']['normal'] == 0">0均值标准化</div>
          <div class="modeing-name-text" v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']  && resultData['createStep']['propertiesFormData']['normal'] == 1">离差标准化</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'linear'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">弹性参数：取值区间(ElasticNetParam):</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['elasticNetParam'] }}</div>
        </div>
      </div>
    </div>

    <div class="modeing-data-set"  v-show="resultData.dataMiningType === 'linear' || resultData.dataMiningType === 'svm'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">正则系数(regParam):</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['regParam'] }}</div>
        </div>
      </div>
    </div>

    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'linear' ||resultData.dataMiningType === 'kmeans' || resultData.dataMiningType === 'svm'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">最大迭代次数(Maxlter):</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['maxIter'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'linear'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">求解器:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['solver'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'linear'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">是否拟合截距:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">
            <span v-if="resultData['createStep']['propertiesFormData']['fitIntercept'] === true || resultData['createStep']['propertiesFormData']['fitIntercept'] === 'true'">
              是
            </span>
            <span v-else>否</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'svm'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">迭代步伐大小:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['stepSize'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'svm'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">训练批次大小:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['miniBatchFraction'] }}</div>
        </div>
      </div>
    </div>

    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'linear' || resultData.dataMiningType === 'svm'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">选中标签列:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">
            {{resultData['createStep']['propertiesFormData']['features']}}
          </div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'kmeans'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">k值:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['k'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'kmeans'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">runs:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['runs'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'fpgrowth'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">最低支持度：范围是[0,1]的小数:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['minSupport'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'fpgrowth'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">最小可信度：范围是[0,1]的小数:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['minConfidence'] }}</div>
        </div>
      </div>
    </div>
    <div class="modeing-data-set" v-show="resultData.dataMiningType === 'fpgrowth'">
      <div class="df df-fd-r modeing-data-title">
        <div class="modeing-type">数据分区:</div>
        <div class="modeing-name df-f1">
          <div class="modeing-name-text"  v-if="resultData['createStep'] && resultData['createStep']['propertiesFormData']">{{ resultData['createStep']['propertiesFormData']['numPartitions'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 这里存放数据
    return {
      resultData: {}
    }
  },
  props: ['data'],
  mounted () {
    this.resultData = this.data
  }
}
</script>

<style scoped>

</style>

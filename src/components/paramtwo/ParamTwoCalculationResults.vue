<style scoped>
  .all_content {
    top: 0px;
    width: 100%;
    background-color: #e4e7ed66;
    overflow: auto;
    height: 80vh;
  }

  .result-top {
    margin: 15px 15px 15px 15px;
    background-color: rgba(42, 67, 112, 1);
    height: 30px;
    line-height: 30px;
    color: white;
  }
  .result-top-content {
    margin: 15px 15px 15px 15px;
    background-color: white;
    height: 60px;
    line-height: 60px;
  }
  .script-content {
    margin: 15px 15px 15px 15px;
    padding: 15px 15px 15px 15px;
    background-color: white;
    height: 280px;
  }
.script-param{
  margin: 15px 15px 15px 15px;
  padding: 15px 15px 15px 15px;
  background-color: white;
  height: 40px;
}
  .result-table{
    margin: 15px 15px 15px 15px;
    padding: 15px 15px 15px 15px;
    background-color: white;
    height: 60vh;
}
  .result-top-td {
    float: left;
    width: 20%;
    text-align: center;
  }
  .row-library {
    height: 16px;
    font-weight: 700;
    font-style: normal;
    clear: both;
    width: 100%;
    line-height: 16px;
    font-size: 12px;
    color: #1E1E1E;
  }
  .result-label {
    height: 16px; font-weight: 400; font-style: normal;  font-size: 12px; margin-top: 15px;
  }
  .label_name {
    float: left;
    width: 65px;
    height: 32px;
    line-height: 32px;
  }

  .label_text {
    float: left;
  }
</style>
<template>
  <div class="all_content" v-loading="saveContentLoding">
    <div class="result-top">
      <div class="result-top-td">
        航班号
      </div>
      <div class="result-top-td">
        机号
      </div>
      <div class="result-top-td">
        航班日期
      </div>
      <div class="result-top-td">
        起飞机场
      </div>
      <div class="result-top-td">
        降落机场
      </div>
    </div>
    <div class="result-top-content">
      <div class="result-top-td">
        <span v-if="data.test_data && data.test_data.length > 0">
          {{this.data.test_data[0]['FLIGHT_NO']}}
        </span>
      </div>
      <div class="result-top-td">
      <span v-if="data.test_data && data.test_data.length > 0 && data.test_data[0]['AC_TAIL']">
        {{this.data.test_data[0]['AC_TAIL']}}
      </span>
      </div>
      <div class="result-top-td">
        <span v-if="data.test_data && data.test_data.length > 0 && this.data.test_data[0]['FLIGHT_DATE']">
        {{data.test_data[0]['FLIGHT_DATE']}}
        </span>
      </div>
      <div class="result-top-td">
      <span v-if="data.test_data && data.test_data.length > 0 && this.data.test_data[0]['FLIGHT_DATE']">
        {{data.test_data[0]['ARRIVAL_AIRPORT_FULLNAME']}}
      </span>
      </div>
      <div class="result-top-td">
      <span v-if="data.test_data && data.test_data.length > 0 && this.data.test_data[0]['FLIGHT_DATE']">
        {{this.data.test_data[0]['DEPARTURE_AIRPORT_FULLNAME']}}
    </span>
      </div>
    </div>
    <div class="script-content">
       <div class="row-library">
         版本库：{{data.libraryData}}
       </div>
       <div class="result-label">
         脚本内容：
       </div>
       <div style="margin-top: 10px;">
         <iframe id="ifid" ref="iframe" src="/DSAP/static/groovyIDE/index2.html" width="100%" style="height:100px;width: 100%;"  ></iframe>
       </div>
       <div class="my-row" style="margin-top: 10px;">
         <el-button type="primary" size="small" @click="this.getResultData">执行脚本</el-button>
       </div>
       <div class="result-label">
         执行结果：
       </div>
       <div style="margin-top: 10px;">
         <el-input readonly="readonly" type="input" size="small"    placeholder="执行结果" v-model="data.result">
         </el-input>
       </div>
    </div>
    <div class="script-param">
      <div class="label_name">时间段：</div>
      <div class="label_text"                    style="width: 30%;">
        <el-input v-model="lines" size="small" placeholder="请输入内容,多个时间段请用“,”分隔（如1-100,1000-1002）"></el-input>
      </div>
<!--      <div class="label_name" style="margin-left: 15px;width: 77px">飞行阶段：</div>-->
<!--      <div class="label_text">-->
<!--        <el-select v-model="data.data" size="small"     multiple placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in data.list"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </div>-->
      <div class="label_name" style="margin-left: 15px;width: 77px">原始参数：</div>
      <div class="label_text" style="width: 30%;">
        <el-select
          style="width: 100%;"
          multiple
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          v-model="keywords" placeholder="请输入" size="small"
          filterable clearable   :loading="loading" @change="mappedChange">
          <el-option v-for="item in mappedArr" :key="item.value" :label="item.label" :value="item.label"></el-option>
        </el-select>
<!--        <el-select v-model="keywords" size="small" style="width: 100%"-->
<!--                    multiple-->
<!--                    filterable placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in mappedArr"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
      </div>
      <div class="label_text" style="margin-left: 15px;">
        <el-button type="primary" size="small" v-model="showTable" @click="preview()">预览</el-button>
      </div>
    </div>
    <div class="result-table" v-show="showTable">
      <el-table v-loading="tabloading"
        :data="tableData"
        stripe
        style="width: 98%;height: 60vh;overflow-y: auto;overflow-x: auto">
        <el-table-column
          v-for="(item,index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :render-header="renderheader"
        ></el-table-column>
      </el-table>
    </div>
    </div>
</template>
<script>
  function checkEditor (vue, val) {
    if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
      vue.saveContentLoding = false
      vue.$refs.iframe.contentWindow.insertMethod(val)
    } else {
      setTimeout(function () {
        checkEditor(vue, val)
      }, 500)
    }
  }
  export default {
    data () {
      return {
        tableColumns: [{prop: '', label: ''}],
        loading: false,
        tabloading: false,
        lines: '',
        keywords: '',
        saveContentLoding: true,
        mappedArr: [],
        data: {
          timeSolt: '',
          scriptContent: '',
          result: '',
          profileId: '',
          test_data: [{
            FLIGHT_NO: '',
            AC_TAIL: '',
            ARRIVAL_AIRPORT_FULLNAME: '',
            DEPARTURE_AIRPORT_FULLNAME: '',
            FLIGHT_DATE: ''
          }]
        },
        showTable: false,
        tableData: []
      }
    },
    watch: {
      keywords (v) {
        this.remoteMethod(v)
      }
    },
    props: ['resultData'],
    components: {},
    mounted () {
      console.log('进入 ParamTwoCalculationResults页面')
      this.data.scriptContent = this.resultData.scriptContent
      this.data.profileId = this.resultData.profileId
      this.data.test_data = this.resultData.test_data
      this.data.libraryData = this.resultData.libraryData
      this.setValue(this.data)
    },
    methods: {
      mappedChange (v) {
      },
      // 从服务器加载映射数据
      remoteMethod (query) {
        let para = query.length > 0 ? query.join(',') : ''
        if (query) {
          this.loading = true
          setTimeout(() => {
            this.mappedArr = []
            this.$axios.get('/apm/getModelColumn', {params: {modelId: this.data.libraryData, columnName: para}}).then(response => {
              var data = response.data
              if (data['status']) {
                if (response.data.status === 'E1001') {
                  this.$bus.$emit('logBackInHandle', response.data)
                }
                this.loading = false
              }
              if (data.length > 0) {
                this.mappedArr = []
                for (var obj of data) {
                  this.mappedArr.push({ value: obj.ID, label: obj.NAME_IN_CSV })
                }
                this.loading = false
              }
              this.loading = false
            }).catch(response => {
              this.loading = false
            })
          }, 200)
        } else {
          this.mappedArr = []
        }
      },
      getResultData () {
        let scriptContent = this.$refs.iframe.contentWindow.editor.getValue()
        this.$axios(
          {
            url: '/apm/testFlightTwo',
            method: 'post',
            params: {
              fltId: this.data['test_data'][0]['ID'],
              profileId: this.data.profileId,
              scriptContent: scriptContent
            }
          }
        ).then(response => {
          if (response.data[0].value) {
            this.data.result = response.data[0].value
          } else {
            this.data.result = response.data
          }
        }).catch(response => {
        })
      },
      setValue (data) {
        checkEditor(this, this.data.scriptContent)
      },
      renderheader (h, { column, $index }) {
        column.minWidth = 110
        return h('div', {style: {width: '100%', paddingLeft: 0, lineHeight: '25px'}}, [
          h('span', {style: {display: 'block'}}, column.label.split(' ')[0]),
          h('span', {style: {display: 'block'}}, column.label.split(' ')[1])
        ])
      },
        preview () {
        if (!this.showTable) {
          this.showTable = true
        }
          if (this.lines && this.keywords) {
          this.tabloading = true
          this.$axios(
            {
              url: '/etl/cutCSV',
              method: 'post',
              params: {
                id: this.data['test_data'][0]['ID'],
                all: 1,
                lines: this.lines,
                datas: this.keywords.join(',')
              }
            }
          ).then(response => {
            this.tabloading = false
            if (response.data) {
              let arr1 = JSON.parse(this.$util.csvJSON(response.data))
              this.tableData = []
              this.tableColumns = []
              let obj = {}
              for (let i = 0; i < arr1.length; i++) {
                obj = {}
                Object.keys(arr1[i]).forEach((key) => {
                  if (key === '') {
                    obj['xuhao'] = arr1[i][key]
                  } else {
                    obj[key] = arr1[i][key]
                  }
                })
                this.tableData.push(obj)
              }
              // 设置动态的header
              if (this.tableData && this.tableData.length > 0) {
                Object.keys(this.tableData[0]).forEach((key) => {
                  this.tableColumns.push({prop: key, label: key === 'xuhao' ? '序号' : key}) // prop 为属性，label 为名称
                })
              }
            }
          }).catch(response => {
            this.tabloading = false
          })
        }
      }
    }
  }
</script>

<template>
  <div class="margin-top-10">
    <el-card class="executionRate-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="航季:" prop="season" class="executionRate-season">
          <el-select v-model="ruleForm.season" placeholder="请选择">
            <el-option
              v-for="item in seasonList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始日期:"
          prop="beginDate"
          class="executionRate-startTime"
        >
          <el-date-picker
            v-model="ruleForm.beginDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="结束日期:"
          prop="endDate"
          class="executionRate-endTime"
        >
          <el-date-picker
            v-model="ruleForm.endDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="航班号:"
          prop="party"
          v-if="isShow"
          class="executionRate-airport"
        >
          <el-input v-model="ruleForm.flightNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="机场:" prop="party" class="executionRate-airport">
          <el-input
            v-model="ruleForm.airport"
            @keyup.native="
              ruleForm.airport = ruleForm.airport
                .replace(/[^a-zA-Z]/g, '')
                .toUpperCase()
            "
            clearable
            placeholder=""
          ></el-input>
          <!-- <el-select
            v-model="ruleForm.airport"
            filterable
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in code4List"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="航段:" class="executionRate-segment" v-if="isShow">
          <el-input
            clearable
            v-model="ruleForm.routeBegin"
            @keyup.native="
              ruleForm.routeBegin = ruleForm.routeBegin
                .replace(/[^a-zA-Z]/g, '')
                .toUpperCase()
            "
            style="width: 50px; margin-right: 10px"
          ></el-input>
          <!-- <el-select
            v-model="ruleForm.routeBegin"
            filterable
            clearable
            placeholder="请选择"
            style="width: 80px; margin-right: 10px"
          >
            <el-option
              v-for="item in code4List"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <el-input
            clearable
            v-model="ruleForm.routeEnd"
            @keyup.native="
              ruleForm.routeEnd = ruleForm.routeEnd
                .replace(/[^a-zA-Z]/g, '')
                .toUpperCase()
            "
            style="width: 50px; margin-right: 10px"
          ></el-input>
          <!-- <el-checkbox v-model="ruleForm.flow"></el-checkbox> -->
          <!-- <el-select
            v-model="ruleForm.routeEnd"
            filterable
            clearable
            placeholder="请选择"
            style="width: 80px; margin-right: 10px"
          >
            <el-option
              v-for="item in code4List"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
        <!-- <el-form-item
          label="排除日期:"
          prop="time"
          class="executionRate-outData"
        >
          <el-date-picker
            v-model="ruleForm.excludeDate"
            :disabled="ruleForm.flow"
            type="daterange"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item> -->

        <el-form-item label="启用豁免期:">
          <el-select
            v-model="ruleForm.exemptState"
            placeholder="请选择"
            clearable
          >
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option label="执行率" value="执行率"></el-option>
            <el-option label="剩余总量" value="剩余总量"></el-option>
            <el-option label="剩余红线量" value="剩余红线量"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="ruleForm.codeType" placeholder="三字码">
            <el-option label="三字码" value="code3"></el-option>
            <el-option label="四字码" value="code4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="expansion" placeholder="展开">
            <el-option label="展开" value="展开"></el-option>
            <el-option label="折叠" value="折叠"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="executionRate-button">
          <el-button
            v-if="buttonType.indexOf('subSearch') > -1"
            size="small"
            @click="handleSearch('ruleForm')"
          >
            <i class="fa fa-search" /> 搜索
          </el-button>
          <el-button
            v-if="buttonType.indexOf('subClear') > -1"
            size="small"
            @click="handleRepeat()"
          >
            <i class="fa fa-repeat" /> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="loadingStatus"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import { DefaultPageInfo } from "@/utils/table";
import SoltManage from "@/api/soltManage";
import Database from "@/api/dataBase";
var data = new Date();
var month =
  data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
var lastMonth = data.getMonth() < 9 ? "0" + data.getMonth() : data.getMonth();
var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
export default {
  name: "Home",
  mixins: [tableMixin],
  watch: {
    expansion(now) {
      if (now == "展开") {
        this.getList();
      } else {
        this.expandedRowKeys = [];
      }
    },
  },
  data() {
    return {
      expansion: "展开",
      expandedRowKeys: [],
      antData: [],
      columns: [],
      depAirport: "depAirport",
      arrAirport: "arrAirport",
      isShow: true,
      label: "",
      tableDataTwo: [],
      tableDataTwoTotal: [],
      redLineRateList: {},
      loadingStatus: false,
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      activeName: "first",
      rate: 0.85,
      seasonList: [],
      code4List: [],
      // labelPosition: 'left',
      ruleForm: {
        flightNo: "",
        airport: "",
        season: "",
        frequency: [],
        excludeDate: [],
        routeBegin: "",
        routeEnd: "",
        exemptState: "",
        beginDate: data.getFullYear() + "-" + lastMonth + "-" + "01",
        endDate: data.getFullYear() + "-" + month + "-" + date,
        type: "执行率",
        codeType: "code3",
      },
      rules: {
        beginDate: [{ required: true, message: "请选择开始日期" }],
        endDate: [{ required: true, message: "请选择结束日期" }],
        season: [{ required: true, message: "请输入航季" }],
      },
      // 操作栏宽度
      optionWidth: 150,
      // 是否显示序号
      isShowNumber: false,
      //是否显示操
      isHasButtons: false,
      // 操作栏按钮
      formInline: {
        user: "",
        region: "",
      },
      params: {
        ...DefaultPageInfo,
      },
      buttonType: "",
    };
  },
  created() {
    this.getSeasonSelect();
    let buttonInfo = JSON.parse(sessionStorage.buttonInfo).filter((e) => {
      return e.path == this.$route.path;
    });
    this.buttonType = buttonInfo
      .map((e) => {
        return e.buttonType;
      })
      .join(",");
  },
  methods: {},
};
</script>

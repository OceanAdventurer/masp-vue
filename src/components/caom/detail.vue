<template>
  <div class="margin-top-10">
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      :buttonInfo="buttonInfoDet"
      :hasDownloadFile="false"
      :hasReturn="true"
      :hasAddSearch="false"
      :has-upload-search="false"
      :uploadButtonText="'导出'"
      @subUpload="handleUpload"
      @subAdd="handleAdd"
      @subSearch="handleSearch"
      @subReturn="handleReturn"
      @subClear="handleClear"
      @subExport="handleExport"
    >
      <!-- <app-search-item label="航季:">
        <el-select v-model="season" placeholder="请选择">
          <el-option
            v-for="item in seasonList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item> -->
      <!-- <app-search-item label="管理局:">
        <el-select v-model="caacId" placeholder="请选择">
          <el-option
            v-for="item in caccList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item> -->
      <app-search-item label="航班号:">
        <el-input
          v-model="flightNo"
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="机型:">
        <el-input
          v-model="aircraftType"
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>

      <app-search-item label="机场1:">
        <el-input
          v-model="airport1"
          @keyup.native="
            airport1 = airport1.replace(/[^a-zA-Z]/g, '').toUpperCase()
          "
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="机场2:">
        <el-input
          v-model="airport2"
          @keyup.native="
            airport2 = airport2.replace(/[^a-zA-Z]/g, '').toUpperCase()
          "
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>

      <app-search-item label="机场3:">
        <el-input
          v-model="airport3"
          @keyup.native="
            airport3 = airport3.replace(/[^a-zA-Z]/g, '').toUpperCase()
          "
          placeholder=""
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="版本名称:">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in versionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="">
        <el-select v-model="search.codeType" placeholder="三字码">
          <el-option label="三字码" value="code3"></el-option>
          <el-option label="四字码" value="code4"></el-option>
        </el-select>
      </app-search-item>
    </app-search-warp>
    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="loadingStatus"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <app-table
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import { DefaultPageInfo } from "@/utils/table";
import SoltManage from "@/api/soltManage";

const defaultSearch = {
  account: "",
  queryBeginTime: "",
  queryEndTime: "",
  hostName: "",
  hostIp: "",
  time: [],
  codeType: "code3",
};

export default {
  name: "Home",
  mixins: [tableMixin],
  data() {
    return {
      loadingStatus: false,
      versionList: [],
      value: "",
      title: "",
      aircraftType: "",
      flightNo: "",
      season: "",
      caacId: "",
      airport1: "",
      airport2: "",
      airport3: "",
      caccList: [],
      seasonList: [],
      fjList: [],
      flightTypeList: [],
      ruleForm: {
        aircraftType: "",
        airline: "",
        airport1: "",
        airport2: "",
        airport3: "",
        arrivalTime1: "",
        arrivalTime2: "",
        beginDate: "",
        endDate: "",
        departureTime1: "",
        departureTime2: "",
        fj: "",
        flightNo: "",
        flightType: "",
        frequency: "",
        season: "",
      },
      dialogVisible: false,
      search: { ...defaultSearch },
      // 操作栏宽度
      optionWidth: 150,
      // 是否显示序号
      isShowNumber: false,
      isHasButtons: false,
      isHasButtonIcon: false,
      // 操作栏按钮
      buttonsName: {
        normal: ["导出"],
        icon: ["sign-out"],
      },
      formInline: {
        user: "",
        region: "",
      },
      params: {
        ...defaultSearch,
        ...DefaultPageInfo,
      },
    };
  },
};
</script>
<style lang="less">
.demo-ruleForm .time .el-input--small .el-input__inner {
  padding-left: 30px !important;
}
.table-head {
  width: 100%;
  .el-input__suffix {
    display: none;
  }
}
</style>

<style scoped>
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.demo-ruleForm .time {
  margin-bottom: 0;
}
</style>
<style lang="less">
.demo-ruleForm .time .el-input--small .el-input__inner {
  padding-left: 30px !important;
}
</style>

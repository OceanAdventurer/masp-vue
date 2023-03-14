<template>
  <div class="app-search-warp">
    <!-- 数据检索 -->
    <el-card style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <slot />
      </el-form>
      <!-- 检索按钮 -->
      <el-row>
        <div class="search-component">
          <el-button
            size="small"
            v-for="(item, i) in buttonInfo"
            :key="i"
            @click="buttonEvent(item.buttonType)"
          >
            <i :class="'fa ' + item.icon" /> {{ item.resourceName }}
          </el-button>
          <el-button
            v-if="hasdleSearch"
            size="small"
            :loading="searchLoading"
            @click="handleSearch"
          >
            <i class="fa fa-search" /> {{ searchButtonText }}
          </el-button>
          
          <el-button v-if="hasClearSearch" size="small" @click="handleClear">
            <i class="fa fa-repeat" /> {{ clearSearchButtonText }}
          </el-button>

          <el-button v-if="hasAddSearch" size="small" @click="handleAdd">
            <i class="fa fa-plus" /> {{ addSearchButtonText }}
          </el-button>

          <el-button v-if="hasBatchSearch" size="small" @click="handleBatchAdd">
            <i v-if="hasBatchSearchText == '同步'" class="fa fa-refresh" />{{
              hasBatchSearchText
            }}
          </el-button>

          <el-button v-if="hasUploadSearch" size="small" @click="handleUpload">
            <i class="fa fa-upload" /> {{ uploadButtonText }}
          </el-button>

          <el-button
            v-if="hasSCRUploadSearch"
            size="small"
            style="width:90px"
            @click="handleSCRUpload"
          >
            <i class="fa fa-upload" />
            {{ uploadSCRButtonText }}
          </el-button>

          <el-button v-if="hasCopyFile" size="small" @click="handleCopy">
            <i class="fa fa-copy" /> {{ copyButtonText }}
          </el-button>

          <el-button
            v-if="hasAircraftUtilization"
            size="small"
            style="width: 110px"
            @click="handleAircraftUtilization"
          >
            <i class="fa fa-star-half-o" /> {{ aircraftUtilization }}
          </el-button>
          <el-button
            v-if="hasFlights"
            size="small"
            style="width: 90px"
            @click="handleFlights"
          >
            <i class="fa fa-fighter-jet" /> {{ flights }}
          </el-button>
          <el-button
            v-if="hasManyPlanes"
            size="small"
            style="width: 100px"
            @click="handleManyPlanes"
          >
            <i class="fa fa-plane" /> {{ manyPlanes }}
          </el-button>

          <el-button
            v-if="hasDownloadFile"
            size="small"
            style="width: 100px"
            @click="handleExport"
          >
            <i class="fa fa-download" /> {{ downloadButtonText }}
          </el-button>

          <el-button
            v-if="hasDownVersion"
            size="small"
            style="width: 100px"
            @click="handleVersion"
          >
            <i class="fa fa-download" /> {{ downVersion }}
          </el-button>

          <el-button
            v-if="hasExport"
            size="small"
            style="width: 100px"
            @click="hadExport"
          >
            <i class="fa fa-download" /> {{ exportButtonText }}
          </el-button>

          <el-button
            v-if="hasGenerated"
            size="small"
            style="width: 100px"
            @click="handleMessageGenerated"
          >
            <i class="fa fa-plus-square" /> 报文生成
          </el-button>
          <el-button
            v-if="hasReport"
            size="small"
            style="width: 120px"
            @click="handleReport"
          >
            <i class="fa fa-plus-square" /> 生成衔接报告
          </el-button>
          <!-- dailyForm 日常计划表单操作 -->
          <slot name="dailyFromBtn"></slot>
          <slot name="Resource"></slot>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppSearchWarp',
  props: {
    buttonInfo: {
      default: () => {
        return []
      },
      type: Array
    },
    searchButtonText: {
      default: '查询',
      type: String
    },
    clearSearchButtonText: {
      default: '重置',
      type: String
    },
    addSearchButtonText: {
      default: '新增',
      type: String
    },
    hasBatchSearchText: {
      default: '批量新增',
      type: String
    },
    uploadSCRButtonText: {
      default: 'SCR合并',
      type: String
    },
    uploadButtonText: {
      default: '上传',
      type: String
    },
    copyButtonText: {
      default: '复制',
      type: String
    },
    updateVersion: {
      default: '更新版本',
      type: String
    },
    goBack: {
      default: '返回',
      type: String
    },
    aircraftUtilization: {
      default: '飞机利用率',
      type: String
    },
    flights: {
      default: '航班量',
      type: String
    },
    manyPlanes: {
      default: '飞机数量',
      type: String
    },
    downloadButtonText: {
      default: '下载模板',
      type: String
    },
    downVersion: {
      default: '下载版本',
      type: String
    },
    exportButtonText: {
      default: '导出',
      type: String
    },
    hasdleSearch: {
      default: true,
      type: Boolean
    },
    hasClearSearch: {
      default: true,
      type: Boolean
    },
    hasAddSearch: {
      default: false,
      type: Boolean
    },
    hasBatchSearch: {
      default: false,
      type: Boolean
    },
    hasSCRUploadSearch: {
      default: false,
      type: Boolean
    },
    hasUploadSearch: {
      default: false,
      type: Boolean
    },
    hasCopyFile: {
      default: false,
      type: Boolean
    },
    hasUpdate: {
      default: false,
      type: Boolean
    },
    hsaDisabled: {
      default: false,
      type: Boolean
    },
    hasReturn: {
      default: false,
      type: Boolean
    },
    hasExport: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    console.log(this.buttonInfo)
  },
  methods: {
    buttonEvent(type) {
      console.log(type)
      this.$emit(type)
    },
    // 筛选事件
    handleSearch() {
      this.$emit('subSearch')
    },
    // 清除事件
    handleClear() {
      this.$emit('subClear')
    },
    // 新增
    handleAdd() {
      this.$emit('subAdd')
    },
    // 新增
    handleBatchAdd() {
      this.$emit('subBatchAdd')
    },
    // 合并
    handleSCRUpload() {
      this.$emit('subSCRUpload')
    },
    // 上传
    handleUpload() {
      this.$emit('subUpload')
    },
    // 返回
    handleReturn() {
      this.$emit('subReturn')
    },
    //刷新版本
    handleUpdate() {
      this.$emit('subUpdate')
    },
    //报文生成
    handleMessageGenerated() {
      this.$emit('subMessageGenerated')
    },
    //衔接报告
    handleReport() {
      this.$emit('subReport')
    },
    // 飞机利用率
    handleAircraftUtilization() {
      this.$emit('subAircraftUtilization')
    },
    // 航班量
    handleFlights() {
      this.$emit('subFlights')
    },
    // 飞机数量
    handleManyPlanes() {
      this.$emit('subManyPlanes')
    },
    // 日计划甘特图复制
    handleCopy() {
      this.$emit('subCopy')
    },
    // 下载模板
    handleExport() {
      this.$emit('subExport')
    },
    //下载版本
    handleVersion() {
      this.$emit('subVersion')
    },
    //导出
    hadExport() {
      this.$emit('hadExport')
    }
  }
}
</script>
<style lang="scss">
.search-component {
  .el-button {
    height: 30px;
  }
}
</style>

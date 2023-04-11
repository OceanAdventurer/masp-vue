<template>
  <div class="file-new-container df df-fd-r df-jc-fs">
    <div v-if="showTreeType === 'timePoint'" class="file-new-left cm_tab_file_new_left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="timeTreeKeyword" @keyup.enter.native="searchTimeTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTimeTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="fpc-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="fpcTreeRef"
          node-key="ID"
          highlight-current
          :data="fpcTreeData"
          :props="defaultFpcTreeProps"
          :default-expanded-keys="defaultTimeExpandedKeys"
          :default-expand-all="false"
          :render-content="renderFpcContent"
          @node-click="fpcNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="timeTreeNodeDesc">说明：</span>
          <span v-show="timeTreeNodeDesc">{{timeTreeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <div v-else-if="showTreeType === 'enginTreeType'"  class="file-new-left cm_tab_file_new_left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="gcTreeKeyword" @keyup.enter.native="searchGcTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchGcTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="fpc-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="fpcGcTreeRef"
          node-key="ID"
          highlight-current
          :data="fpcGcTreeData"
          :props="defaultFpcTreeProps"
          :default-expanded-keys="defaultGcExpandedKeys"
          :default-expand-all="false"
          :render-content="renderFpcContent"
          @node-click="fpcGcNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="gcTreeNodeDesc">说明：</span>
          <span v-show="gcTreeNodeDesc">{{gcTreeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <div v-else class="file-new-left cm_tab_file_new_left df df-fd-c">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="file-new-left-tree df df-fd-r df-f1">
        <el-tree
          style="width:100%"
          ref="fileNewTreeRef"
          node-key="ID"
          highlight-current
          :data="fileNewTreeData"
          :props="defaultFileNewTreeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="fileNewNodeClick">
        </el-tree>
      </div>
      <div class="tree-desc">
        <div class="view-table-btn-info">
          <span v-show="treeNodeDesc">说明：</span>
          <span v-show="treeNodeDesc">{{treeNodeDesc}}</span>
        </div>
      </div>
    </div>

    <div class="file-new-middle cm_tab_file_new_main df df-fd-c">
      <div class="flex-new-top basic-tab df df-fd-r df-f1 w100">
        <div class="file-new-content cm_main_content df df-fd-c">
          <el-tabs ref="anayTabs" v-model="fileNewContentActiveName" @tab-click="tabFileNewContent">
            <el-tab-pane label="筛选配置" name="filterConfig">
              <div class="filter-config-table">
                <el-table
                  :row-style="{height:'38px'}"
                  :cell-style="{padding:'0px'}"
                  :header-row-style="{height:'38px'}"
                  :header-cell-style="{padding:'0px'}"
                  :data="filterConfigTableData"
                  style="width: 100%;"
                  height="100%"
                  highlight-current-row
                  fit
                  @row-click="filterConfigTableRowHandle"
                  :header-row-class-name="headerRowClassName"
                  :row-class-name="tableRowClassName">
                  <el-table-column prop="name" label="参数" width="400"></el-table-column>
                  <el-table-column prop="filter" label="过滤条件" width="auto"></el-table-column>
                  <!--
                  <el-table-column
                    label="过滤条件"
                    width="auto">
                    <template slot-scope="scope">
                      <div class="cell" :title="scope.row.filter">{{ scope.row.filter }}</div>
                    </template>
                  </el-table-column>
                  -->
                  <el-table-column label="" width="50" align="center">
                    <template slot-scope="scope" v-if="scope.row['type'] != 9999">
                      <div class="icon-delete tab-icon-set row-icon-group" @click.stop="filterRowDelete(scope.$index, filterConfigTableData)"></div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="分类配置" name="classConfig" class="classConfig" style="width: 95%" v-if="analysisType === '航班分析'">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分组选择" style="margin-top:20px">
                  <div class="class-axis-text" :style="currentAxisStyle === 'four' ? currentAxisStyleObj : ''" @click="selectCurrentAxis('four')">{{ classConfigAxisFourText }}</div>
                  <i class="el-icon-close" style="font-size: 13px;position: absolute;top: 9px;right: 15px;color:#C0C4CC" @click="clearCurrentAxisData('four')"></i>
                </el-form-item>
                <el-form-item label="小数位数" class="export_quantity" v-if="isDecimal">
                  <el-select v-model="form.exportGroupNum" placeholder="请选择小数位数">
                    <el-option label=0 value=0></el-option>
                    <el-option label=1 value=1></el-option>
                    <el-option label=2 value=2></el-option>
                    <el-option label=3 value=3></el-option>
                    <el-option label=4 value=4></el-option>
                    <el-option label=5 value=5></el-option>
                    <el-option label=6 value=6></el-option>
                    <el-option label=7 value=7></el-option>
                    <el-option label=8 value=8></el-option>
                    <el-option label=9 value=9></el-option>
                    <el-option label=10 value=10></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期类型" v-if="isDate">
                  <el-select v-model="form.exportGroupFormat" placeholder="请选择日期类型">
                    <el-option label="YYYY" value="YYYY"></el-option>
                    <el-option label="YYYY/MM" value="YYYY/MM"></el-option>
                    <el-option label="YYYY/MM/dd" value="YYYY/MM/dd"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="排序选择">
                  <div class="class-axis-text" :style="currentAxisStyle === 'five' ? currentAxisStyleObj : ''" @click="selectCurrentAxis('five')">{{ classConfigAxisFiveText }}</div>
                  <i class="el-icon-close" style="font-size: 13px;position: absolute;top: 9px;right: 15px;color:#C0C4CC" @click="clearCurrentAxisData('five')"></i>
                </el-form-item>
                <el-form-item label="排序方式">
                  <el-select v-model="form.exportSort" placeholder="请选择排序方式">
                    <el-option label="正序" value="asc"></el-option>
                    <el-option label="倒序" value="desc"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="排序数量" class="export_quantity">
                  <el-input v-model="form.exportGroupCount"
                  size="small"
                  placeholder="请输入正整数">
                  <i class="el-icon-close m10" slot="suffix" @click="clearExportGroupCount"></i>
                  </el-input>
                </el-form-item>
                <el-form-item class="classConfig_zone">
                  <el-checkbox v-model="form.checkedTimeZone">按东八区时区处理（系统默认按照UTC时间）</el-checkbox>
                </el-form-item>
                <el-form-item class="description_text">
               <div>分类配置可实现功能</div>
                  如分组选择-PF姓名，排序选择-航班日期，排序方式-正序，排序数量-30，提交分析后，即得到每个飞行员最近飞的30个航班
                <div>即：基于分组选择的参数，按照正序/倒序，根据排序选择中所选的参数，取满足条件的前/后几个航班</div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="contentType === 'analysis_dhbcsdb'" label="可视化配置" name="visualConfigDhb">
              <div class="m10 df df-fd-c df-jc-fs df-ai-c df-f1">

                <div class="fpc-visual-chart df-f1">
                  <div id="fpcVisualChat"></div>
                  <!-- <img style="width: 100%; height: 100%;" src="../../../assets/images/dhbcsdbchart.jpg" alt="样例视图"> -->
                </div>

                <div class="m10 df df-fd-c df-jc-fs df-ai-fs visualConfig-axis">
                  <div class="df df-fe-r df-jc-fs df-ai-c w100 pos-r">
                    <div class="header">时间点</div>

                    <div class="df df-fe-r df-jc-fs df-ai-c df-f1 pos-r" style="margin: 0 13px;">
                      <el-input v-model.number="timeBeforeSecond" size="mini" style="width: 100px;">
                        <template slot="prepend">前</template>
                        <template slot="append">秒</template>
                      </el-input>

                      <div class="visual-axis-text df-f1">{{timePointText}}</div>

                      <el-input v-model.number="timeAfterSecond" size="mini" style="width: 100px;">
                        <template slot="prepend">后</template>
                        <template slot="append">秒</template>
                      </el-input>
                    </div>

                    <el-button type="primary" size="mini" @click="toggleTreeType('timePoint')">时间节点树</el-button>
                  </div>

                  <div class="df df-fe-r df-jc-fs df-ai-c w100 mt20 pos-r">
                    <div class="header">工程参数</div>
                    <div class="visual-axis-text">{{enginParamText}}</div>
                    <el-button type="primary" size="mini" @click="toggleTreeType('enginTreeType')">工程参数树</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-else label="可视化配置" name="visualConfig">
              <div class="m10 df df-fd-c df-jc-fs df-ai-c df-f1">
                <div class="file-visual-chart df-f1">
                  <div id="visualChart"></div>
                </div>
                <div class="m10 df df-fd-c df-jc-fs df-ai-fs visualConfig-axis">
                  <div class="df df-fe-r df-jc-fs df-ai-c w100 pos-r">
                    <div>{{visualConfigAxisOneTextName}}</div>
                    <div class="visual-axis-text" :style="currentAxisStyle === 'one' ? currentAxisStyleObj : ''" @click="selectCurrentAxis('one')">{{ visualConfigAxisOneText }}</div>
                    <i slot="suffix" class="el-input__icon el-icon-close" @click="clearCurrentAxisData('one')" style="font-size: 20px;position: absolute;top: -3px;right: 45px;"></i>
                    <div class="visual-axis-line visual-axis-line-up"></div>
                  </div>
                  <div class="icon-exchange tab-icon-set visual-icon-exchange" @click="changeVisualAxisValue"></div>
                  <div class="df df-fe-r df-jc-fs df-ai-c mb10 w100 pos-r">
                    <div>{{visualConfigAxisTwoTextName}}</div>
                    <div class="visual-axis-text" :style="currentAxisStyle === 'two' ? currentAxisStyleObj : ''" @click="selectCurrentAxis('two')">{{ visualConfigAxisTwoText }}</div>
                    <i slot="suffix" class="el-input__icon el-icon-close" @click="clearCurrentAxisData('two')" style="font-size: 20px;position: absolute;top: -3px;right: 45px;"></i>
                    <div class="visual-axis-line visual-axis-line-down"></div>
                  </div>
                  <div class="df df-fe-r df-jc-fs df-ai-c w100 pos-r cm" v-show="isShowVisualConfigThreeAxis">
                    <div>{{visualConfigAxisThreeTextName}}&nbsp;&nbsp;</div>
                    <div class="visual-axis-text mr10" :style="currentAxisStyle === 'three' ? currentAxisStyleObj : ''" @click="selectCurrentAxis('three')">{{ visualConfigAxisThreeText }}</div>
                    <i slot="suffix" class="el-input__icon el-icon-close" @click="clearCurrentAxisData('three')" style="font-size: 20px;position: absolute;top: -3px;right: 45px;"></i>
                    <div class="icon-delete tab-icon-set" @click="addThreeAxis"></div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="表格配置" name="tableConfig">
              <div class="m10 df df-fd-c df-jc-fs df-ai-c df-f1">
                <div class="file-table-chart pos-r">
                  <el-table
                    :row-style="{height:'38px'}"
                    :cell-style="{padding:'0px'}"
                    :header-row-style="{height:'38px'}"
                    :header-cell-style="{padding:'0px'}"
                    :data="tableConfigExampleData"
                    :header-row-class-name="headerRowClassName"
                    :cell-class-name="tableRowClassName"
                    height="100%"
                    style="width: 100%;">
                    <el-table-column
                      v-for="(col, index) in tableConfigColumnData"
                      :key="index"
                      :prop="col.enName"
                      :label="col.zhName"
                      width="auto">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="m10 df df-fd-c df-jc-fs df-ai-fs df-f1 tableConfig-axis">
                  <el-table
                    :row-style="{height:'38px'}"
                    :cell-style="{padding:'0px'}"
                    :header-row-style="{height:'38px'}"
                    :header-cell-style="{padding:'0px'}"
                    :data="tableConfigData"
                    height="100%"
                    width="100%"
                    highlight-current-row
                    fit
                    @row-click="tableConfigRowHandle"
                    :header-row-class-name="headerRowClassName"
                    :row-class-name="tableRowClassName">
                    <el-table-column prop="tableConfigRowId" label="序号" align="left" width="80"></el-table-column>
                    <el-table-column prop="name" label="列名" align="left" width="auto"></el-table-column>
                    <el-table-column label="操作" align="left" width="100">
                      <template slot-scope="scope">
                        <div class="row-icon-group">
                          <div class="icon-delete tab-icon-set mr10" title="删除" @click.stop="tableConfigRowDelete(scope.$index, tableConfigData)"></div>

                          <div class="icon-pack-up tab-icon-set mr10" title="上移"
                              :style="{ visibility: scope.$index === 0 ? 'hidden' : '' }"
                              @click.stop="moveUpRow(scope.$index, scope.row)">
                          </div>
                          <div class="icon-pack-an tab-icon-set mr10" title="下移"
                              :style="{ visibility: scope.$index === (tableConfigData.length-1) ? 'hidden' : '' }"
                              @click.stop="moveDownRow(scope.$index, scope.row)">
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="file-new-right cm_main_attr df df-fd-c">
          <el-tabs ref="rightAttrTabs" v-model="fileNewRightActiveName">
            <el-tab-pane label="属性" name="attr">
              <!-- 新建分析名称 -->
              <div class="m20 df df-fd-c df-jc-fs df-ai-c">
                <div class="df df-fd-r df-jc-fs df-ai-c w100">
                  <div style="width: 37px">
                    <span >名称：</span>
                  </div>
                  <div class="df-f1" style="min-width: 0;width: calc(100% - 37px)">
                    <el-input
                      placeholder="请输入新建分析名称"
                      v-model="fileNewName"
                      size="small"
                      @change="changeFileNewName">
                      <!--
                      @blur="blurFileNewName" -->
                      <i class="el-icon-close m10" slot="suffix" @click="closeFileNewNameInput"></i>
                    </el-input>
                  </div>
                </div>

                <div class="alert-info" style="margin-top: 15px;" v-show="!isSubmit && alertTitleName !== ''">
                  <el-alert
                    :title="alertTitleName"
                    type="error"
                    :closable="false"
                    show-icon>
                  </el-alert>
                </div>
              </div>

              <div v-if="this.$util.isNotEmptyObject(this.$store.state.eventStoreData)" class="m20 df df-fd-c df-jc-fs df-ai-c">
                <div class="df df-fd-r df-jc-fs df-ai-c w100">
                  <span class="file-name">所属事件库：</span>
                  <div class="df-f1" style="min-width: 0;" @click="openEventDialog">
                    <el-input
                      placeholder="请选择事件库"
                      v-model="eventName"
                      readonly
                      size="small">
                    </el-input>
                  </div>
                </div>
              </div>

              <!-- 筛选配置属性 -->
              <div v-show="fileNewContentActiveName === 'filterConfig'">
                <!-- 筛选配置属性中数据权限 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 9999">
                  <div class="mb10 mt10">数据权限：</div>
                  <div class="df df-fd-c df-jc-fs df-ai-fs w100 view-power" style="margin-left: -10px;">
                    <el-tree
                      node-key="id"
                      :data="viewPowerData"
                      :props="defaultViewPowerData"
                      @node-click="dataViewPowerClick">
                    </el-tree>
                  </div>
                </div>
                <!-- 筛选配置属性中第二种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 2">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1">
                    <span class="df-f1">查询方式: </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="1">模糊查询</el-radio>
                      <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="2">精确查询</el-radio>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-fs df-ai-c mt20">
                    <span class="df-f1">{{inputTypeName}}：</span>
                    <div class="df-f3">
                      <el-input placeholder="请输入内容" v-model="inputTypeNameValue" size="small" @change="changeInputTypeNameValue"></el-input>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="inputTypeNameValueFlag" @change="changeInputTypeNameValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="inputTypeNameValueFlag" @change="changeInputTypeNameValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第三种类型 -->
                <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 3">
                  <el-radio v-model="attrOneRadio" label="1" class="mb10" @change="changeAttrOneRadio">筛选条件</el-radio>
                  <div class="standardRadio" v-show="attrOneRadio === '1'" >
                    <el-select v-model="standardSelectValue" placeholder="请选择过滤条件" @change="changeStandardSelectValue">
                      <el-option v-for="item in standardSelectData"
                        class="filter-attr-input"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input
                      v-model="standardMinValue"
                      v-show="parseInt(standardSelectValue) > 0 && parseInt(standardSelectValue) !== 9999"
                      @change="changeStandardMinValue"
                      @blur="blurStandardMinValue"
                      placeholder="请输入内容"
                      autofocus
                      class="filter-attr-input mt10">
                    </el-input>
                    <el-input
                      v-model="standardMaxValue"
                      v-show="parseInt(standardSelectValue) > 6 && parseInt(standardSelectValue) !== 9999"
                      @change="changeStandardMaxValue"
                      @blur="blurStandardMaxValue"
                      placeholder="请输入内容"
                      class="filter-attr-input mt10">
                    </el-input>
                  </div>
                </div>
                <!-- 筛选配置属性中第四种类型 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 4">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">逻辑值：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="logicalValue"
                        placeholder="请选择"
                        @change="changeLogicalValue">
                        <el-option
                          v-for="item in logicalValueListData"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第五种类型 type = 5 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 5">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">事件：</span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="eventHappenValueFlag" @change="changEventHappenValueFlag" label="1">已发生</el-radio>
                      <el-radio v-model="eventHappenValueFlag" @change="changEventHappenValueFlag" label="0">未发生</el-radio>
                    </div>
                  </div>

                  <div v-if="eventHappenValueFlag === '1'" class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span>事件等级：</span>
                    <el-select
                      v-model="eventLevelValue"
                      value-key="VALUE"
                      placeholder="请选择"
                      multiple
                      collapse-tags
                      @change="changEventLevelValue">
                      <el-option
                        v-for="item in eventLevelData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!-- 筛选配置属性中第五种类型 type = 51 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 51">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="notHotWordsSearchValue"
                        value-key="value"
                        placeholder="请选择"
                        multiple
                        collapse-tags
                        @change="changeNotHotWordsSearchValueEvent51">
                        <el-option
                          v-for="item of notHotWordsSearchData"
                          :key="`${item.columnname}${item.value}`"
                          :label="item.columnname"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">事件等级：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="eventLevelValue"
                        value-key="value"
                        placeholder="请选择"
                        multiple
                        collapse-tags
                        @change="changEventLevelValue51">
                        <el-option
                          v-for="item in eventLevelData"
                          :key="item.value"
                          :label="item.label"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>

                <!-- 筛选配置属性中第五种类型 type = 52 -->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 52">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{hotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="hotWordsSearchValue"
                        filterable
                        remote
                        multiple
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="hotWordsSearchMethod"
                        :loading="hotWordsSearchLoading"
                        @change="changeHotWordsSearchValueEvent">
                        <el-option
                          v-for="item of hotWordsSearchListData"
                          :key="`${item.columnname}${item.PRO_NO}`"
                          :label="item.columnname"
                          :value="item.PRO_NO">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">事件等级：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="agsEventLevelValue"
                        placeholder="请选择"
                        multiple
                        collapse-tags
                        @change="changAgsEventLevelValue">
                        <el-option
                          v-for="item in agsEventLevelData"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>

                <!-- 筛选配置属性中第六种类型 -->
                <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 6">
                  <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="3" class="mb10 mt10 w100">按时间段查询</el-radio>
                  <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="4" class="mb10 mt10 w100">按时间点查询</el-radio>
                  <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="11" class="mb10 mt10 w100">按动态时间查询</el-radio>

                  <div class="df df-fd-c df-jc-fs df-ai-fs w100" v-show="attrSixRadio === '3'">
                    <div class="df df-fd-r df-jc-c df-ai-c">
                      <span class="file-name">开始</span>
                      <el-date-picker
                        v-if="currentFilterConfigRowAttrName === 'FLIGHT_DATE'"
                        v-model="accordDayStartDate"
                        @change="changeAccordDayStartDate"
                        @blur="blurAccordDayStartDate"
                        type="date"
                        placeholder="选择开始日期"
                        default-time="00:00:00"
                        class="df-f1 mt10 mb10">
                      </el-date-picker>
                      <el-date-picker
                        v-else
                        v-model="accordDayStartDate"
                        @change="changeAccordDayStartDate"
                        @blur="blurAccordDayStartDate"
                        type="datetime"
                        placeholder="选择开始日期"
                        default-time="00:00:00"
                        class="df-f1 mt10 mb10">
                      </el-date-picker>
                    </div>
                    <div class="df df-fd-r df-jc-c df-ai-c">
                      <span class="file-name">结束</span>
                      <el-date-picker
                        v-if="currentFilterConfigRowAttrName === 'FLIGHT_DATE'"
                        v-model="accordDayEndDate"
                        @change="changeAccordDayEndDate"
                        @blur="blurAccordDayEndDate"
                        type="date"
                        placeholder="选择结束日期"
                        default-time="23:59:59"
                        class="df-f1">
                      </el-date-picker>
                      <el-date-picker
                        v-else
                        v-model="accordDayEndDate"
                        @change="changeAccordDayEndDate"
                        @blur="blurAccordDayEndDate"
                        type="datetime"
                        placeholder="选择结束日期"
                        default-time="23:59:59"
                        class="df-f1">
                      </el-date-picker>
                    </div>
                  </div>

                  <div class="df df-fd-c df-jc-fs df-ai-fs w100 data-point" v-show="attrSixRadio === '4'">
                    <el-select v-model="dataPointY" multiple collapse-tags @change="changeDataPointType" placeholder="年">
                      <!-- <el-option
                        v-for="item in [2017, 2018, 2019]"
                        :key="item"
                        :label="item + '年'"
                        :value="item"
                        size="mini">
                      </el-option> -->
                      <el-option
                        v-for="item in dataPointYArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select v-model="dataPointM" multiple collapse-tags @change="changeDataPointType" placeholder="月">
                      <el-option
                        v-for="item in 12"
                        :key="item"
                        :label="item + '月'"
                        :value="item"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select v-model="dataPointD" multiple collapse-tags @change="changeDataPointType" placeholder="日">
                      <el-option
                        v-for="item in 31"
                        :key="item"
                        :label="item + '日'"
                        :value="item"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select v-model="dataPointH" multiple collapse-tags @change="changeDataPointType" placeholder="小时" v-show="currentFilterConfigRowAttrName !== 'FLIGHT_DATE'">
                      <el-option
                        v-for="item in 24"
                        :key="item"
                        :label="item - 1 + '点'"
                        :value="item - 1"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select v-model="dataPointQ" multiple collapse-tags @change="changeDataPointType" placeholder="季度">
                      <el-option
                        v-for="item in dataPointQArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>

                    <el-select v-model="dataPointW" multiple collapse-tags @change="changeDataPointType" placeholder="星期">
                      <el-option
                        v-for="item in dataPointWArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="mini">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="df df-fd-c df-jc-fs df-ai-fs w100 data-point" v-show="attrSixRadio === '11'"><el-select v-model="dynamicTime">
                      <el-option
                        v-for="item in dynamicRange"
                        :key='item.value'
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <!-- <ul class='dynamic_time'>
                      <li v-for="item in testRange" :key='item.value'>
                        <span @click="changeDynamicData('-')">-</span><el-input type='number' v-model='item.dynamicTime'></el-input><span @click="changeDynamicData('+')">+</span>{{item.label}}
                      </li>
                    </ul> -->
                  </div>
                </div>
                <!-- 筛选配置属性中第七种类型 非搜索类型-->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 7">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20" v-if="currentFilterConfigRowAttrName === 'FLIGHT_UNIT_NAME'">
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="notHotWordsSearchValue"
                        value-key="VALUE"
                        placeholder="请选择"
                        multiple
                        @change="changeNotHotWordsSearchValueJD">
                        <el-option
                          v-for="item in notHotWordsSearchData"
                          :key="item.VALUE"
                          :label="item.COLUMNNAME"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20" v-else>
                    <span class="df-f1">{{notHotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="notHotWordsSearchValue"
                        placeholder="请选择"
                        multiple
                        @change="changeNotHotWordsSearchValue">
                        <el-option
                          v-for="item in notHotWordsSearchData"
                          :key="item.columnname"
                          :label="item.columnname"
                          :value="item.columnname">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="notHotWordsSearchValueFlag" @change="changeNotHotWordsSearchValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="notHotWordsSearchValueFlag" @change="changeNotHotWordsSearchValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中第八种类型 搜索类型-->
                <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 8 || currentFilterConfigRowAttr === 9">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
                    <span class="df-f1">{{hotWordsSearchName}}：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="hotWordsSearchValue"
                        filterable
                        remote
                        multiple
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="hotWordsSearchMethod"
                        :loading="hotWordsSearchLoading"
                        @change="changeHotWordsSearchValue">
                        <el-option
                          v-for="item in hotWordsSearchListData"
                          :key="item.columnname"
                          :label="item.columnname"
                          :value="item.columnname">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="df df-fd-r df-jc-sa df-ai-c mt20" v-show="currentFilterConfigRowAttr === 8">
                    <span class="df-f2">上述已筛选条件 </span>
                    <div class="df-f3" style="text-align: right;">
                      <el-radio v-model="hotWordsSearchValueFlag" @change="changeHotWordsSearchValueFlag" label="1">包含</el-radio>
                      <el-radio v-model="hotWordsSearchValueFlag" @change="changeHotWordsSearchValueFlag" label="0">不包含</el-radio>
                    </div>
                  </div>
                </div>
                <!-- 筛选配置属性中错误提示语-->
                <div class="alert-info m20" v-show="!isSubmit && alertTitle !== ''">
                  <el-alert
                    :title="alertTitle"
                    type="error"
                    :closable="false"
                    show-icon>
                  </el-alert>
                </div>
              </div>
              <!-- 可视化配置属性-->
              <div v-show="fileNewContentActiveName === 'visualConfig'">
                <div class="m20 df df-fd-c df-jc-fs df-ai-fs">
                  <div class="df df-fd-r df-jc-fs df-ai-c w100">
                    <span class="chart-name">图表名称：</span>
                    <div class="df-f1" style="min-width: 0;">
                      <el-input placeholder="请输入图表名称" v-model="visualConfigChartsName" size="small">
                        <i class="el-icon-close m10" slot="suffix" @click="closeVisualConfigChartsName"></i>
                      </el-input>
                    </div>
                  </div>
                  <div class="mt20 df df-fd-r df-jc-fs df-ai-c cp" @click="addThreeAxis" v-show="!isShowVisualConfigThreeAxis">
                    <div class="icon-add tab-icon-set mr10"></div>
                    <div class="add-zhou-c">添加第三轴</div>
                  </div>
                  <div class="mt20 df df-fd-r df-jc-fs df-ai-c cp" v-show="isShowVisualConfigThreeAxis">
                    <div class="icon-add-gray tab-icon-set mr10"></div>
                    <div class="add-zhou-g">添加第三轴</div>
                  </div>
                  <!-- 区间数量  轴1的格式化类型为数值时才显示 -->
                  <div v-show="visualConfigAxisOneFormat === 'decimalFormat' || (visualConfigAxisTwoFormat === 'decimalFormat' && isShowVisualConfigThreeAxis === true)" class="df df-fd-r df-jc-fs df-ai-c mt20">
                    <span class="chart-name">区间数量：</span>
                    <div class="df-f1">
                      <el-select v-model="intervalNum" placeholder="请选择" size="small">
                        <el-option v-for="item in intervalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <!--轴1 格式化类型和值-->
                  <div class="w100 mt20">
                    <!--文本格式
                    <div v-show="visualConfigAxisOneFormat === 'textFormat'" class="df df-fd-r">
                      <div class="df-f1">{{visualConfigAxisOneTextName}} - 文本：</div>
                      <div class="df df-fd-r df-jc-sa df-ai-c df-f3">
                        <el-radio v-model="visualConfigAxisOneFormatData" label="1">模糊查询</el-radio>
                        <el-radio v-model="visualConfigAxisOneFormatData" label="2">精确查询</el-radio>
                      </div>
                    </div> -->
                    <!-- 数值格式-->
                    <div v-show="visualConfigAxisOneFormat === 'decimalFormat'" class="df df-fd-c">
                      <div>{{visualConfigAxisOneTextName}} - 数值：</div>
                      <div class="df df-fd-r df-jc-fs df-ai-c">
                        <div class="df-f123">小数保留位数：</div>
                        <div class="df-f3">
                          <el-select v-model="visualConfigAxisOneFormatData" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in axisNumArr"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <!--日期格式-->
                    <div v-show="visualConfigAxisOneFormat === 'dateFormat'" class="df df-fd-r df-jc-fs df-ai-c">
                      <div class="df-f1">{{visualConfigAxisOneTextName}} - 日期：</div>
                      <div class="df-f3">
                        <el-select v-model="visualConfigAxisOneFormatData" @focus="updateAxisDateArr('one')" placeholder="请选择" size="small">
                          <el-option
                            v-for="item in axisDateArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <!--轴2 格式化类型和值-->
                  <div class="w100 mt20">
                    <!--文本格式
                    <div v-show="visualConfigAxisTwoFormat === 'textFormat'" class="df df-fd-r">
                      <div class="df-f1">{{visualConfigAxisTwoTextName}} - 文本：</div>
                      <div class="df df-fd-r df-jc-sa df-ai-c df-f3">
                        <el-radio v-model="visualConfigAxisTwoFormatData" label="1">模糊查询</el-radio>
                        <el-radio v-model="visualConfigAxisTwoFormatData" label="2">精确查询</el-radio>
                      </div>
                    </div> -->
                    <!--数值格式-->
                    <div v-show="visualConfigAxisTwoFormat === 'decimalFormat' && (twoAggregation != '' || isShowVisualConfigThreeAxis)">
                      <div>{{visualConfigAxisTwoTextName}} - 数值：</div>
                      <div class="df df-fd-r df-jc-fs df-ai-c">
                        <div class="df-f123">小数保留位数：</div>
                        <div class="df-f3">
                          <el-select v-model="visualConfigAxisTwoFormatData" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in axisNumArr"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <!--日期格式-->
                    <div v-show="visualConfigAxisTwoFormat === 'dateFormat'" class="df df-fd-r df-jc-fs df-ai-c">
                      <div class="df-f1">{{visualConfigAxisTwoTextName}} - 日期：</div>
                      <div class="df-f3">
                        <el-select v-model="visualConfigAxisTwoFormatData" @focus="updateAxisDateArr('two')" placeholder="请选择" size="small">
                          <el-option
                            v-for="item in axisDateArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <!--轴3 格式化类型和值-->
                  <div class="w100">
                    <!--文本格式
                    <div v-show="visualConfigAxisThreeFormat === 'textFormat'" class="df df-fd-r mt20">
                      <div class="df-f1">{{visualConfigAxisThreeTextName}} - 文本：</div>
                      <div class="df df-fd-r df-jc-sa df-ai-c df-f3">
                        <el-radio v-model="visualConfigAxisThreeFormatData" label="1">模糊查询</el-radio>
                        <el-radio v-model="visualConfigAxisThreeFormatData" label="2">精确查询</el-radio>
                      </div>
                    </div> -->
                    <!--数值格式-->
                    <div v-show="visualConfigAxisThreeFormat === 'decimalFormat' && twoAggregation != ''" class="mt20">
                      <div>{{visualConfigAxisThreeTextName}} - 数值：</div>
                      <div class="df df-fd-r df-jc-fs df-ai-c">
                        <div class="df-f123">小数保留位数：</div>
                        <div class="df-f3">
                          <el-select v-model="visualConfigAxisThreeFormatData" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in axisNumArr"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <!--日期格式-->
                    <div v-show="visualConfigAxisThreeFormat === 'dateFormat'" class="df df-fd-r df-jc-fs df-ai-c mt20">
                      <div class="df-f1">{{visualConfigAxisThreeTextName}} - 日期：</div>
                      <div class="df-f3">
                        <el-select v-model="visualConfigAxisThreeFormatData" @focus="updateAxisDateArr('three')" placeholder="请选择" size="small">
                          <el-option
                            v-for="item in axisDateArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div v-show="(visualConfigAxisTwoFormat === 'decimalFormat' && isShowVisualConfigThreeAxis === false) || visualConfigAxisThreeFormat === 'decimalFormat'" class="df df-fd-r df-jc-fs df-ai-c mt20 w100">
                    <div class="df-f123">聚合函数：</div>
                    <div class="df-f3">
                      <el-select v-model="twoAggregation" clearable placeholder="请选择" size="small">
                        <el-option
                          v-for="item in twoAggregationArr"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="df df-fd-r df-jc-fs df-ai-c" style="margin: 20px 0 4px;">
                    <div class="df-f1"><el-checkbox v-model="sortChecked">对测量排序TOP</el-checkbox></div>
                  </div>
                  <div class="df df-fd-r df-jc-fs df-ai-c" v-show="sortChecked">
                    <div class="df-f1">
                      <el-select v-model="sortNum" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in [5,10,15,20,25,30]"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="df-f3" style="margin-left: 10px;">
                      <el-select v-model="sortType" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in sortTypeArr"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>

              <div v-show="fileNewContentActiveName === 'visualConfigDhb'">
                <div class="m20 df df-fd-c">
                  <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt10">
                    <span class="df-f1">帧数：</span>
                    <div class="df-f3 hot-words">
                      <el-select
                        v-model="frames"
                        size="mini"
                        >
                        <el-option
                          v-for="item in [1, 2, 4, 8]"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>

                <div class="m20 df df-fd-c">
                  <el-checkbox v-model="showAvgLine">显示平均值</el-checkbox>
                </div>

                <div class="m20 df df-fd-c">
                  <el-checkbox v-model="showTantile25">显示25分位值</el-checkbox>
                </div>

                <div class="m20 df df-fd-c">
                  <el-checkbox v-model="showTantile50">显示50分位值</el-checkbox>
                </div>

                <div class="m20 df df-fd-c">
                  <el-checkbox v-model="showTantile75">显示75分位值</el-checkbox>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="file-new-bottom">
        <el-button @click="assemblyNewFileParams(false)" type="primary" size="mini">查看</el-button>
        <el-button @click="assemblyNewFileParams(true)" type="primary" size="mini">保存</el-button>
        <el-button @click="openCopySaveDialog" type="primary" size="mini">另存为</el-button>
      </div>
    </div>

    <div class="copy-save-dialog">
      <el-dialog :close-on-click-modal="false" title="请选择" :visible.sync="dialogCopySaveVisible">
        <div class="cs-dialog-content">
          <div class="search-box">
            <el-input placeholder="请输入..." size="small" v-model="copySaveTreeKeyword" @keyup.enter.native="getTreeData">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
            </el-input>
          </div>

          <div class="tree-content">
            <el-tree
              node-key="ID"
              :highlight-current="true"
              ref="managerTreeRef"
              :props="defaultProps"
              :data="managerTreeData"
              :default-expanded-keys="copyDefaultExpandedKeys"
              :default-expand-all="false"
              :render-content="renderCopySaveContent"
              @node-click="managerTreeNodeHandleClick">
            </el-tree>
          </div>

          <div class="df df-fd-r df-jc-fs df-ai-c w100">
            <span class="file-name">分析名  </span>
            <div class="df-f1" style="min-width: 0;">
              <el-input
                placeholder="请输入分析名"
                v-model="copySaveName"
                size="small"
                clearable>
              </el-input>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="assemblyNewFileParams('copy')">保 存</el-button>
        </div>
      </el-dialog>
    </div>

    <div v-if="this.$util.isNotEmptyObject(this.$store.state.eventStoreData)" class="event-dialog">
      <el-dialog :close-on-click-modal="false" title="切换事件库" :visible.sync="dialogEventVisible" @open="openEventDialog">
        <div class="event-dialog-content">
          <div class="search-box">
            <el-input placeholder="请输入..." size="small" v-model="eventTreeKeyword" @keyup.enter.native="getEventTreeData">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getEventTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
            </el-input>
          </div>

          <div class="tree-content">
            <el-tree
              node-key="ID"
              :highlight-current="true"
              ref="eventTreeRef"
              :props="defaultProps"
              :data="eventTreeData"
              :default-expanded-keys="eventDefaultExpandedKeys"
              :default-expand-all="false"
              :render-content="renderEventContent"
              @node-click="eventTreeNodeHandleClick">
            </el-tree>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeEventDialog()">取  消</el-button>
          <el-button type="primary" size="mini" @click="toggleEventParams()">确  定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'
import Sortable from 'sortablejs'

export default {
  name: 'NewFile',
  props: {
    contentType: {
      type: String
    },
    analysisType: {
      type: String
    }
  },
  data () {
    return { // 以下是此组件的默认值
      isDecimal: false,
      isDate: false,
      form: {
        exportGroupNum: '',
        exportGroupFormat: '',
        exportSort: '',
        exportGroupCount: '',
        checkedTimeZone: true
      },
      dynamicTime: 'threeDays',
      dynamicRange: [
        {value: 'today', label: '当天'},
        {value: 'threeDays', label: '3天'},
        {value: 'fiveDays', label: '5天'},
        {value: 'week', label: '一周'},
        {value: 'month', label: '一个月'},
        {value: 'threeMonths', label: '三个月'},
        {value: 'halfYear', label: '半年'},
        {value: 'nineMonths', label: '九个月'},
        {value: 'year', label: '一年'}
      ],
      testRange: [
        {index: 0, value: 'h', label: '小时', disabled: false, dynamicTime: 0},
        {index: 1, value: 'day', label: '天', disabled: false, dynamicTime: 0},
        {index: 2, value: 'month', label: '月', disabled: false, dynamicTime: 0},
        {index: 3, value: 'year', label: '年', disabled: false, dynamicTime: 0}
      ],
      pageSize: 10, // 每页显示条目数
      pagerCount: 11, // 页码按钮的数量
      totalCount: 0, // 总条目数
      fileNewTreeData: [], // 树数据
      defaultFileNewTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
      treeNodeToMenuItem: { // 树的一级节点对应数据源二级菜单
        'CEAIR_PROFILE': 'analysis_dataSource_profile',
        '航班信息': 'analysis_dataSource_flight'
      },
      menuItemToTreeNode: { // 数据源二级菜单对应树的一级节点
        'analysis_dataSource_allDataSource': '', // 总数据源
        'analysis_dataSource_profile': 'CEAIR_PROFILE', // profile
        'analysis_dataSource_download': '', // 下载
        'analysis_dataSource_downloadReview': '', // 下载审查
        'analysis_dataSource_flight': '航班信息', // 航班
        'analysis_dataSource_flightReview': '', // 航班审查
        'analysis_dataSource_airport': '', // 机场
        'analysis_dataSource_data': '', // 数据
        'analysis_dataSource_navigation': '', // 导航
        'analysis_dataSource_operation': '', // 操作
        'analysis_dataSource_weather': '' // 天气
      },
      treeKeyword: '', // 关键字搜索树数据
      treeNodeDesc: '',
      copyDefaultExpandedKeys: [],
      fileNewContentActiveName: 'filterConfig', // 中间tab显示值, filterConfig:筛选配置，visualConfig:可视化配置
      fileNewRightActiveName: 'attr', // 右边tab显示值，attr:属性
      isShowAttr: true, // 默认true，显示筛选配置的属性，false则显示可视化配置的属性
      visualConfigCharts: '', // 可视化配置图表
      visualConfigChartsName: '', // 可视化配置图表标题
      isShowVisualConfigThreeAxis: false, // 是否显示可视化配置中的轴3
      filterConfigTableData: [], // 筛选配置表格
      filterConfigTableDataObj: {}, // 临时存储选中的筛选配置表格数据，在最后提交时使用
      currentFilterConfigRowId: '', // 当前选中筛选配置表格中的某行编号
      currentFilterConfigRowName: '', // 当前选中筛选配置表格中的某行名字
      currentFilterConfigRowAttr: 1, // 筛选配置属性的显示
      currentFilterConfigRowAttrName: '',
      fileNewName: '', // 新建分析名称
      viewPowerData: [],
      viewPowerDataObj: {
        id: 'viewPowerID',
        // name: 'viewPowerNAME',
        name: '',
        type: 9999,
        parentId: 'viewPowerPID',
        columnName: 'viewPowerCNAME',
        columnType: 'viewPowerCTYPE',
        dataSourceName: 'viewPowerDSNAME',
        resultColumnIndex: '',
        resultTableIndex: '',
        // filter: 'viewPowerFILTER',
        filter: '',
        filterConditions: {},
        fileNewName: ''
      },
      defaultViewPowerData: {
        label: 'lable',
        children: 'children',
        isLeaf: 'leaf'
      },
      inputTypeName: '文本框', // 筛选配置第二类文本框的名字
      inputTypeNameValue: '', // 筛选配置第二类文本框的值
      inputTypeNameValueFlag: '1', // 查询条件是否包含 筛选配置第二类文本框的值
      inputTypeNameQueryType: '1', // 筛选配置第二类文本框的查询类型
      attrOneRadio: '', // 筛选配置第三类属性radio值
      standardSelectValue: '', // 筛选配置第三类属性中下拉框选中的值
      standardSelectData: [ // 筛选配置第三类属性中下拉框数据
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '小于' },
        { value: '4', label: '小于等于' },
        { value: '5', label: '大于' },
        { value: '6', label: '大于等于' },
        { value: '9999', label: '非空' },
        { value: '7', label: '参数1<=x<=参数2' },
        { value: '8', label: '参数1<=x<参数2' },
        { value: '781', label: '参数1<x<=参数2' },
        { value: '782', label: '参数1<x<参数2' },
        { value: '9', label: 'x<=参数1或x>=参数2' },
        { value: '9101', label: 'x<参数1或x>=参数2' },
        { value: '9102', label: 'x<=参数1或x>参数2' },
        { value: '10', label: 'x<参数1或x>参数2' }
      ],
      standardSelectArray: [ // 筛选配置第三类属性中下拉框数据
        '等于', '不等于', '小于', '小于等于', '大于', '大于等于'
      ],
      standardMinValue: '', // 筛选配置第三类属性中输入框最小值
      standardMaxValue: '', // 筛选配置第三类属性中输入框最大值
      logicalValue: '',
      logicalValueListData: [ // 筛选配置第四类属性中下拉框数据
        { value: '0', label: '否（0 或 0.0）' },
        { value: '1', label: '是（1 或 1.0）' }
      ],
      eventHappenValueFlag: '1', // 筛选配置第五类属性中  事件是否发生
      attrSixRadio: '', // 筛选配置第六类属性radio值
      accordDayStartDate: '', // 筛选配置第六类属性中按天范围开始日期
      accordDayEndDate: '', // 筛选配置第六类属性中按天范围结束日期
      // dataPointYArr: [
      //   {value: 2017, label: '2017年'},
      //   {value: 2018, label: '2018年'},
      //   {value: 2019, label: '2019年'}
      // ],
      dataPointY: [], // 时间点 - 年
      dataPointMArr: [
        {value: 1, label: '1月'},
        {value: 2, label: '2月'},
        {value: 3, label: '3月'},
        {value: 4, label: '4月'},
        {value: 5, label: '5月'},
        {value: 6, label: '6月'},
        {value: 7, label: '7月'},
        {value: 8, label: '8月'},
        {value: 9, label: '9月'},
        {value: 10, label: '10月'},
        {value: 11, label: '11月'},
        {value: 12, label: '12月'}
      ],
      dataPointM: [], // 时间点 - 月
      dataPointDArr: [],
      dataPointD: [], // 时间点 - 日
      dataPointHArr: [
        {value: 0, label: '点'},
        {value: 1, label: '点'},
        {value: 2, label: '点'},
        {value: 3, label: '点'},
        {value: 4, label: '点'},
        {value: 5, label: '点'},
        {value: 6, label: '点'},
        {value: 7, label: '点'},
        {value: 8, label: '点'},
        {value: 9, label: '点'},
        {value: 10, label: '点'},
        {value: 11, label: '点'},
        {value: 12, label: '点'},
        {value: 13, label: '点'},
        {value: 14, label: '点'},
        {value: 15, label: '点'},
        {value: 16, label: '点'},
        {value: 17, label: '点'},
        {value: 18, label: '点'},
        {value: 19, label: '点'},
        {value: 20, label: '点'},
        {value: 21, label: '点'},
        {value: 22, label: '点'},
        {value: 23, label: '点'}
      ],
      dataPointH: [], // 时间点 - 小时
      dataPointQArr: [
        {value: 1, label: '第一季度'},
        {value: 2, label: '第二季度'},
        {value: 3, label: '第三季度'},
        {value: 4, label: '第四季度'}
      ],
      dataPointQ: [], // 时间点 - 季度
      dataPointWArr: [
        {value: 2, label: '星期一'},
        {value: 3, label: '星期二'},
        {value: 4, label: '星期三'},
        {value: 5, label: '星期四'},
        {value: 6, label: '星期五'},
        {value: 7, label: '星期六'},
        {value: 1, label: '星期日'}
      ],
      dataPointWObj: {
        2: '一',
        3: '二',
        4: '三',
        5: '四',
        6: '五',
        7: '六',
        1: '日'
      },
      dataPointW: [], // 时间点 - 星期
      notHotWordsSearchName: '', // 筛选配置第七类属性中文本值
      notHotWordsSearchValue: [], // 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchData: [], // 筛选配置第七类属性中下拉框数据集合
      hotWordsSearchName: '', // 筛选配置第八类属性中文本值
      hotWordsSearchValue: [], // 筛选配置第八类属性中下拉框选中值
      hotWordsSearchValueFlag: '1', // 查询条件是否包含 筛选配置第八类属性中下拉框选中值
      hotWordsSearchData: [], // 筛选配置第八类属性中下拉框数据
      hotWordsSearchListData: [], // 筛选配置第八类属性中下拉框数据集合
      hotWordsSearchLoading: false, //
      attrSevenRadio: '', // 可视化配置第二类属性radio值
      visualConfigAxisOneText: '在左侧数据库中选择参数', // 可视化配置轴1的文本值
      visualConfigAxisOneTextName: '维度', // 可视化配置轴1的文本名字
      visualConfigAxisOneValue: '', // 可视化配置轴1对应左侧tree中node的id值
      visualConfigAxisOneSql: '', // 对应左侧tree中RESULT_COLUMN_INDEX/COLUMNNAME
      visualConfigAxisOneSqlValue: '', // 对应左侧tree中RESULT_COLUMN_INDEX/COLUMNNAME组装后的值
      visualConfigAxisOneTableIndex: '', // 对应左侧tree中TableIndex
      visualConfigAxisOneFormat: '', // 轴类型， 左侧tree中type值对应轴格式类型
      visualConfigAxisOneFormatData: '', // 轴格式化类型值
      visualConfigAxisOneDataSourceName: '', // 轴的对应的tree中的dataSourceName
      visualConfigAxisOneTreeType: '', // 轴1对应左侧tree中的type值
      visualConfigAxisOneColumnType: '', // 轴值类型type值
      visualConfigAxisTwoText: '在左侧数据库中选择参数',
      classConfigAxisFourText: '在左侧数据库中选择参数',
      classConfigAxisFourObj: {},
      classConfigAxisFiveText: '在左侧数据库中选择参数',
      classConfigAxisFiveObj: {},
      visualConfigAxisTwoTextName: '测量',
      visualConfigAxisTwoValue: '',
      visualConfigAxisTwoSql: '',
      visualConfigAxisTwoSqlValue: '',
      visualConfigAxisTwoTableIndex: '',
      visualConfigAxisTwoFormat: '',
      visualConfigAxisTwoFormatData: '',
      visualConfigAxisTwoDataSourceName: '',
      visualConfigAxisTwoTreeType: '',
      visualConfigAxisTwoColumnType: '',
      visualConfigAxisThreeText: '在左侧数据库中选择参数',
      visualConfigAxisThreeTextName: '测量',
      visualConfigAxisThreeValue: '',
      visualConfigAxisThreeSql: '',
      visualConfigAxisThreeSqlValue: '',
      visualConfigAxisThreeTableIndex: '',
      visualConfigAxisThreeFormat: '',
      visualConfigAxisThreeFormatData: '',
      visualConfigAxisThreeDataSourceName: '',
      visualConfigAxisThreeTreeType: '',
      visualConfigAxisThreeColumnType: '',
      currentAxisStyle: '', // 轴默认显示颜色值为空
      currentAxisStyleObj: { // 轴选择后显示的样式
        background: 'rgba(58,107,185, .1)'
      },
      axisForamtObj: { // 轴格式化类型
        '2': 'textFormat', // 文本
        '3': 'decimalFormat', // 数值
        '6': 'dateFormat' // 日期
      },
      axisForamtDataObj: {
        'textFormat': '1',
        'decimalFormat': '2',
        'dateFormat': 'YYYY/MM/dd' // 轴类型默认格式
      },
      expressionData: { // 默认条件表达式值
        'attrOneRadio': {
          '1': {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '781': '781',
            '782': '782',
            '9101': '9101',
            '9102': '9102',
            '9999': '9999'
          }
        },
        'attrTwoRadio': '11',
        'attrFourRadio': '4',
        'attrSixRadio': {
          '3': '37',
          '4': '38',
          '11': '39'
        },
        'attrSevenRadio': '12',
        'attrEightRadio': '13'
      },
      isSubmit: true, // 是否允许提交
      alertTitle: '',
      alertTitleName: '',
      intervalArr: [ // 区间数量数组
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'},
        {value: '6', label: '6'},
        {value: '7', label: '7'},
        {value: '8', label: '8'},
        {value: '9', label: '9'},
        {value: '10', label: '10'}
      ],
      intervalNum: '10', // 区间数量默认值
      axisNumArr: [ // 数值数组
        {value: '0', label: '0'},
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'},
        {value: '6', label: '6'},
        {value: '7', label: '7'},
        {value: '8', label: '8'},
        {value: '9', label: '9'},
        {value: '10', label: '10'}
      ],
      axisDateArr: [ // 日期数组
        {value: 'YYYY', label: 'YYYY'},
        {value: 'YYYY/MM', label: 'YYYY/MM'},
        {value: 'YYYY/MM/dd', label: 'YYYY/MM/dd'},
        {value: 'YYYY/MM/dd HH', label: 'YYYY/MM/dd HH'},
        {value: 'YYYY/MM/dd HH:mm', label: 'YYYY/MM/dd HH:mm'},
        {value: 'YYYY/MM/dd HH:mm:ss', label: 'YYYY/MM/dd HH:mm:ss'},
        {value: 'quarter', label: 'Quarter'},
        {value: 'month', label: 'Month'},
        {value: 'dayofweek', label: 'Week'},
        {value: 'day', label: 'Day'},
        {value: 'hour', label: 'Hour'}
      ],
      axisDateArrDate: [ // 日期数组
        {value: 'YYYY', label: 'YYYY'},
        {value: 'YYYY/MM', label: 'YYYY/MM'},
        {value: 'YYYY/MM/dd', label: 'YYYY/MM/dd'},
        {value: 'quarter', label: 'Quarter'},
        {value: 'month', label: 'Month'},
        {value: 'dayofweek', label: 'Week'},
        {value: 'day', label: 'Day'}
      ],
      axisDateArrDateTime: [ // 日期数组
        {value: 'YYYY', label: 'YYYY'},
        {value: 'YYYY/MM', label: 'YYYY/MM'},
        {value: 'YYYY/MM/dd', label: 'YYYY/MM/dd'},
        {value: 'YYYY/MM/dd HH', label: 'YYYY/MM/dd HH'},
        {value: 'YYYY/MM/dd HH:mm', label: 'YYYY/MM/dd HH:mm'},
        {value: 'YYYY/MM/dd HH:mm:ss', label: 'YYYY/MM/dd HH:mm:ss'},
        {value: 'quarter', label: 'Quarter'},
        {value: 'month', label: 'Month'},
        {value: 'dayofweek', label: 'Week'},
        {value: 'day', label: 'Day'},
        {value: 'hour', label: 'Hour'}
      ],
      twoAggregation: '', // 聚合函数默认值
      twoAggregationArr: [ // 聚合函数数组
        {'label': '求和', 'value': 'sum'},
        // {'label': '方差', 'value': 'variance'},
        {'label': '标准差', 'value': 'stddev'},
        {'label': '平均值', 'value': 'avg'},
        {'label': '最大值', 'value': 'max'},
        {'label': '最小值', 'value': 'min'},
        {'label': '中位值', 'value': 'appx_median'}
        // {'label': '分组', 'value': 'groupBy'} // 服务端报错，暂时隐藏
      ],
      sortChecked: false,
      sortTypeArr: [ // 聚合函数数组
        {'label': '由大到小', 'value': 'DESC'},
        {'label': '由小到大', 'value': 'ASC'}
      ],
      sortType: 'DESC',
      sortNum: 10,
      tableConfigData: [ // 表格配置数据
        {
          tableConfigRowId: 1, // 页面显示的序号
          id: '',
          name: '请在左侧数据库中选择列名',
          columnName: '',
          dataSourceName: '',
          resultColumnIndex: '',
          resultTableIndex: ''
        }
      ],
      tableConfigDataObj: {}, // 临时存储表格配置数据对象
      currentTableConfigRowObj: { // 临时存储选中表格配置中某行信息
        tableConfigRowId: 1, // 页面显示的序号
        id: '',
        name: '请在左侧数据库中选择列名',
        columnName: '',
        dataSourceName: '',
        resultColumnIndex: '',
        resultTableIndex: ''
      },
      tabActiveResult: {
        filterConfig: 'analysis_view',
        visualConfig: 'analysis_chart',
        tableConfig: 'analysis_table'
      },
      eventLevelData: [
        {value: '高', label: '高'},
        {value: '中', label: '中'},
        {value: '低', label: '低'}
      ],
      agsEventLevelData: [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'}

      ],
      agsEventLevelValue: ['1', '2', '3', '4'],
      // eventLevelValue: ['高', '中', '低'],
      eventLevelValue: [],
      filterNames: [],
      dialogCopySaveVisible: false,
      copySaveName: '',
      copySaveTreeKeyword: '',
      defaultProps: { // 树节点默认的属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      csTreeNodeId: '',
      managerTreeData: [], // 树状数据

      // 事件库选择
      dialogEventVisible: false,
      eventTreeData: [],
      eventTreeKeyword: '',
      eventDefaultExpandedKeys: [],
      eventName: this.$store.state.eventStoreData.NAME,
      eventStoreObj: {},
      treeEventObj: {},

      // 多航班参数分析
      fpcTreeData: [], // 树数据
      defaultFpcTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultTimeExpandedKeys: [], // 默认展开的节点的 key 的数组
      timeTreeKeyword: '', // 关键字搜索树数据
      timeTreeNodeDesc: '',

      fpcGcTreeData: [],
      gcTreeKeyword: '',
      gcTreeNodeDesc: '',
      defaultGcExpandedKeys: [],

      showTreeType: '', // 树类型 enginTreeType

      timeBeforeSecond: 10, // 时间点前多少秒
      timeAfterSecond: 10, // 时间点后多少秒

      timePointValue: '', // fd2c9f950bac4cb1ac8b4b112d00d66b
      timePointText: '', // TAXI_OUT结束

      enginParamValue: '', // f5891fc9f0524c509f87221f901cd347
      enginParamText: '', // IVV

      frames: 1,
      showAvgLine: false,
      showTantile25: false,
      showTantile50: false,
      showTantile75: false
    }
  },
  watch: {
    visualConfigChartsName (newVal, oldVal) { // 可视化配置图表名称
      if (newVal !== oldVal) {
        this.initVisualChart()
        // this.visualConfigCharts.setOption({title: {text: newVal}})
      }
    },
    // treeKeyword (val) { // 树节点关键字
    //   console.log('treeKeyword:', val)
    //   this.$refs.fileNewTreeRef.filter(val)
    // },

    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },
    // copySaveTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshCopySaveTreeData()
    //   }
    // },
    isShowVisualConfigThreeAxis (newVal, oldVal) { // 监控是否显示第三轴
      if (this.$util.isDefine(newVal) && newVal !== oldVal) {
        if (newVal) {
          this.visualConfigAxisOneTextName = '维度1'
          this.visualConfigAxisTwoTextName = '维度2'
          this.visualConfigAxisThreeTextName = '测量'
        } else {
          this.visualConfigAxisOneTextName = '维度'
          this.visualConfigAxisTwoTextName = '测量'
          this.visualConfigAxisThreeTextName = ''
        }
        this.initVisualChart()
      }
    },
    // timeTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTimeTreeData()
    //   }
    // },
    // gcTreeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshGcTreeData()
    //   }
    // },
    twoAggregation (newVal, oldVal) {
      console.log(newVal, oldVal)
      if (!this.$util.isDefine(newVal)) {
        if (this.isShowVisualConfigThreeAxis) {
          if (this.visualConfigAxisThreeFormat === 'decimalFormat') {
            this.visualConfigAxisThreeFormatData = 2
          }
        } else {
          if (this.visualConfigAxisTwoFormat === 'decimalFormat') {
            this.visualConfigAxisTwoFormatData = 2
          }
        }
      }
    }
  },
  created () {
    this.getViewPowerData()
  },
  computed: {
    dataPointYArr () {
      let years = []
      let year = new Date().getFullYear()
      for (let i = 2017; i <= year; i++) {
        years.push({value: i, label: i + '年'})
      }
      return years
    },
    tableConfigExampleData () { // 算出表格配置中样例中表格数据
      let tempData = []
      let tempObj = {}
      this.tableConfigData.map((item, index) => {
        let tempName = ''
        if (item.name === '请在左侧数据库中选择列名') {
          tempName = '列名' + index
        } else {
          tempName = item.name
        }
        tempObj[tempName] = 'value'
      })
      tempData.push(tempObj)
      return tempData
    },
    tableConfigColumnData () { // 算出表格配置中样例中表格列名数据
      let tempData = []
      this.tableConfigData.map((item, index) => {
        let tempName = ''
        if (item.name === '请在左侧数据库中选择列名') {
          tempName = '列名' + index
        } else {
          tempName = item.name
        }
        tempData.push({enName: tempName, zhName: tempName})
      })
      return tempData
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$util.isNotEmptyObject(this.$store.state.eventStoreData)) {
        // this.$refs.anayTabs.$children[0].$refs.tabs[1].style.display = 'none'
        // this.$refs.anayTabs.$children[0].$refs.tabs[2].style.display = 'none'
      }

      this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', null, null) // 修改头部显示效果,显示数据源头部
      this.getTree() // dom渲染完毕加载树数据
      this.getTimeTree() // dom渲染完毕加载树数据
      this.getGcTree()
      this.rowDropSort()
    })

    let tempAnalysisParams = this.$store.state.analysisParams
    if (this.$util.isNotEmptyObject(tempAnalysisParams)) {
      if (this.$util.isDefine(tempAnalysisParams.ANALYSISCATEGORYID)) { // 初始化分析管理传来的分析参数数据
        this.initNewFileParams(JSON.parse(JSON.stringify(tempAnalysisParams)).CONTENT)
      } else {
        this.initNewFileParams(tempAnalysisParams)
      }
    } else {
      if (this.$util.isDefine(this.viewPowerDataObj.name) && this.$util.isDefine(this.viewPowerDataObj.filter)) {
        this.filterConfigTableData.unshift(this.viewPowerDataObj)
      }
    }

    // 监听window的resize事件．在浏览器窗口变化时再设置下可视化配置图表宽高．
    const that = this
    window.addEventListener('resize', function () {
      if (that.visualConfigCharts) {
        that.visualConfigCharts.resize()
      }
      // that.initVisualChart()
    })

    this.$bus.$on('changeFileNewExpandedStatus', (enName, zhName) => { // 改变树节点展开和折叠状态
      that.expandedTreeNodeStatus(enName, zhName)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('changeFileNewExpandedStatus') // 移除自定义事件监听器。
  },
  methods: {
    getViewPowerData () { // TODO: 获取筛选配置的数据权限
      let that = this
      this.$axios({
        url: 'userRight/getUserRightByTOId'
      }).then(response => {
        console.log('getViewPowerData~~~:', response)
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (!that.$util.isNotEmptyObject(resultData)) {
            return false
          }
          if (resultData.tree.length > 0) {
            that.viewPowerData = resultData.tree
          }

          let dataRight = resultData.dataRight
          if (that.$util.isDefine(dataRight.name) && dataRight.value.length > 0) {
            that.viewPowerDataObj['name'] = dataRight.name
            that.viewPowerDataObj['filter'] = dataRight.value.join(', ')

            this.filterConfigTableData.unshift(that.viewPowerDataObj)
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          that.logBackIn(response.data)
        }
      }) //.catch(response => {
      //   that.$message.error('数据权限获取失败! ')
      // })
    },
    changeDynamicData (mark) {
      let num = this.dynamicTime
      if (mark === '-') {
        this.dynamicTime = num--
      } else {
        this.dynamicTime = num++
      }
      console.log(mark, this.dynamicTime, 'test----changeDynamicData')
    },
    rowDropSort () { // 行拖拽排序
      // TODO: 表格排序功能
      const $tbody = document.querySelector('.tableConfig-axis .el-table__body-wrapper tbody') // el-table__body-wrapper
      const _this = this
      Sortable.create($tbody, {
        // handle: 'tr',
        animation: 150, // 动画参数
        onStart () {
          _this.tableConfigDataObj = {}
          _this.currentTableConfigRowObj = {}
        },
        // onEnd: function (evt) { //拖拽完毕之后发生该事件
        //   console.log('onEnd.foo:', [evt.item, evt.from])
        // }
        onEnd (evt) {
          // let _tableConfigData = _this.tableConfigData

          // let oldObj = _this.tableConfigData[oldIndex] // ['tableConfigRowId']
          // let newObj = _this.tableConfigData[newIndex] // ['tableConfigRowId']
          // let newTcData = _tableConfigData.map((item, i) => {
          //   let tempObj = JSON.parse(JSON.stringify(item))
          //   if (i === oldIndex) {
          //     tempObj['tableConfigRowId'] = newObj['tableConfigRowId']
          //   } else if (i === newIndex) {
          //     tempObj['tableConfigRowId'] = oldObj['tableConfigRowId']
          //   }
          //   return tempObj
          // })
          // _this.tableConfigData = newTcData

          let newIndex = evt.newIndex
          let oldIndex = evt.oldIndex
          let $tr = $tbody.children[newIndex]
          let $oldTr = $tbody.children[oldIndex]

          if (!_this.$util.isDefine(newIndex) || !_this.$util.isDefine(newIndex) || newIndex === oldIndex) {
            return false
          }

          // 先删除移动的节点
          $tbody.removeChild($tr)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
              $tbody.insertBefore($tr, $oldTr)
          } else {
              $tbody.insertBefore($tr, $oldTr.nextSibling)
          }
          // 更新 tableConfigData 数组
          const currRow = _this.tableConfigData.splice(oldIndex, 1)[0]
          _this.tableConfigData.splice(newIndex, 0, currRow)

          let _tableConfigData = _this.tableConfigData
          _this.tableConfigData = []

          let newTcData = _tableConfigData.map((item, i) => {
            let tempObj = JSON.parse(JSON.stringify(item))
            tempObj['tableConfigRowId'] = i + 1
            return tempObj
          })

          _this.tableConfigData = [...newTcData]
          _this.$forceUpdate()

          // 下一个tick就会走patch更新
          let tempTableConfigDataObj = {}
          newTcData.forEach((item, index) => {
            item['tableConfigRowId'] = index + 1
            tempTableConfigDataObj[item['id']] = item

            if (item['name' === '请在左侧数据库中选择列名']) {
              this.currentTableConfigRowObj = item
            }
          })
          _this.tableConfigDataObj = tempTableConfigDataObj
        }
      })
    },
    moveUpRow (index, row) { // 上移行
      let that = this
      console.log('上移###：', index, row)
      console.log(that.tableConfigData[index])
      if (index > 0) {
        let upDate = that.tableConfigData[index - 1]
        that.tableConfigData.splice(index - 1, 1)
        that.tableConfigData.splice(index, 0, upDate)

        let _tableConfigData = that.tableConfigData
        that.tableConfigData = []

        let newTcData = _tableConfigData.map((item, i) => {
          let tempObj = JSON.parse(JSON.stringify(item))
          tempObj['tableConfigRowId'] = i + 1
          return tempObj
        })

        that.tableConfigData = [...newTcData]
        that.$forceUpdate()

        // 下一个tick就会走patch更新
        let tempTableConfigDataObj = {}
        newTcData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        that.tableConfigDataObj = tempTableConfigDataObj
      } else {
        this.$message({
          message: '已经是第一条，不可上移!',
          type: 'warning'
        })
      }
    },
    moveDownRow (index, row) { // 下移行
      let that = this
      console.log('下移###：', index, row)
      if ((index + 1) === that.tableConfigData.length) {
        this.$message({
          message: '已经是最后一条，不可下移！',
          type: 'warning'
        })
      } else {
        console.log(index)
        let downDate = that.tableConfigData[index + 1]
        that.tableConfigData.splice(index + 1, 1)
        that.tableConfigData.splice(index, 0, downDate)

        let _tableConfigData = that.tableConfigData
        that.tableConfigData = []

        let newTcData = _tableConfigData.map((item, i) => {
          let tempObj = JSON.parse(JSON.stringify(item))
          tempObj['tableConfigRowId'] = i + 1
          return tempObj
        })

        that.tableConfigData = [...newTcData]
        that.$forceUpdate()

        // 下一个tick就会走patch更新
        let tempTableConfigDataObj = {}
        newTcData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        that.tableConfigDataObj = tempTableConfigDataObj
      }
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    getTree () { // 获取左侧树状数据
      this.fileNewTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTree',
        method: 'get',
        params: {
          likeContent: this.treeKeyword,
          EVENT_PROFILE: this.$store.state.eventStoreData.ID
        }
      }).then(response => {
        console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            let tempUrl = ''
            if (resUrl.indexOf('7777') > -1) {
              tempUrl = resUrl
            } else {
              tempUrl = window.location.origin + resUrl
            }
            window.location.href = tempUrl
            return false
          }
          let data = response.data.result.data
          if (data.length > 0) {
            this.fileNewTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultExpandedKeys.push(expandedKey)
          } else {
            this.defaultExpandedKeys = []
          }

          // if (this.$util.isNotEmptyObject(data)) {
          //   let tempTreeData = []
          //   for (let i in data) {
          //     for (let j = 0; j < data[i].length; j++) {
          //       tempTreeData.push(data[i][j])
          //     }
          //   }
          //   console.log(JSON.stringify(tempTreeData))
          //   this.fileNewTreeData = tempTreeData
          // } else {
          //   this.$message({
          //     message: '暂无相关数据!',
          //     type: 'warning'
          //   })
          // }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    renderCopySaveContent (h, {node, data, store}) {
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: false, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
        }
      })
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.searchTreeData()
      }
    },
    searchTreeData (flag) { // 关键字搜索树节点
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.getTree() // 加载树数据
      // }
      this.treeNodeDesc = ''
      this.getTree()
    },
    filterFileNewNode (value, data) { // 树节点过滤
      try {
        console.log('filterFileNewNode~~value:', value, data, data.LIKENAME.indexOf(value))
        if (!value) return true
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    expandedTreeNodeStatus (en, zh) { // 点击一级菜单‘数据源’的子菜单，修改对应树节点展开或折叠状态
      let nodesMapObj = this.$refs.fileNewTreeRef.store.nodesMap
      if (this.$util.isNotEmptyObject(nodesMapObj)) {
        for (let i in nodesMapObj) {
          this.$refs.fileNewTreeRef.store.nodesMap[i].expanded = false
        }
        this.defaultExpandedKeys = [this.menuItemToTreeNode[en]]
      }
    },
    fileNewNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      console.log('NewFile@fileNewNodeClick:', data)
      this.treeNodeDesc = ''

      if (data.TYPE === 'PROFILE') {
        return false
      }
      console.log(this.fileNewContentActiveName)
      // 在筛选配置的tab中，点击左侧树节点时把数据显示到中间表格中，并存储
      if (this.fileNewContentActiveName === 'filterConfig') {
        if (!data.CHILDREN) { // || data.CHILDREN.length === 0
          if (this.filterConfigTableDataObj[data.ID]) {
            this.$message({
              message: '筛选配置中已经存在！',
              type: 'warning'
            })
            return false
          } else {
            const tempNodeObj = {
              id: data.ID + '_' + new Date().getTime(),
              name: data.NAME,
              type: data.TYPE,
              parentId: data.PARENTID ? data.PARENTID : '',
              columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
              columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
              dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
              resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
              resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
              // filter: data.TYPE === '5' ? '事件' : '',
              filter: data.TYPE === '5' ? '已发生 ' : '',
              // filter: '',
              filterConditions: {},
              fileNewName: '',
              isSecret: data.IS_SECRET // 是否加密
            }
            if (data.COLUMNNAME &&
                (data.TYPE === '7' ||
                data.TYPE === '8' ||
                data.TYPE === '9' ||
                data.TYPE === '51' ||
                data.TYPE === '52')) { // 当type为7,8,9时需要从后端获取对应属性中下拉框的值
              this.getHotWordsSearchData(data.TYPE, data.COLUMNNAME)
              this.currentFilterConfigRowAttrName = data.COLUMNNAME
            }
            this.filterConfigTableData.push(tempNodeObj)
            this.filterConfigTableDataObj[tempNodeObj.id] = tempNodeObj
            this.filterConfigTableRowHandle(tempNodeObj)
            this.totalCount = this.filterConfigTableData.length // 赋值分页总条数

            if (data.TYPE === '5') {
              this.changEventHappenValueFlag('1')
            }
          }
        }
      } else if (this.fileNewContentActiveName === 'visualConfig') { // 在可视化配置tab中，没有选择轴时点击左侧树节点时则提示
        if (!this.currentAxisStyle) { // 没有选择轴类型，直接点击节点
          this.$message({
            message: '请选择可视化配置中的轴值',
            type: 'warning'
          })
          return false
        }
        // data.TYPE === '4' ||
        if (data.TYPE === '5' || data.TYPE === '51' || data.TYPE === '52' || data.TYPE === '9' || data.TYPE === 'CATALOG' || data.CHILDREN) { // 逻辑值，事件, 目录类型节点不支持轴选择
          if ((!this.$util.isNotEmptyObject(this.$store.state.eventStoreData)) && (data.TYPE === '51' || data.TYPE === '52')) {
            this.$message({
              message: '轴类型不能选择事件参数！',
              type: 'warning'
            })
            return false
          }

          if (this.$util.isNotEmptyObject(this.$store.state.eventStoreData) && data.TYPE === '51') {
            if (this.currentAxisStyle === 'one') {
              if (this.isShowVisualConfigThreeAxis) {
                if (data.NAME === this.visualConfigAxisTwoText) {
                  return false
                }
              }

              this.visualConfigAxisOneText = data.NAME
              this.visualConfigAxisOneValue = data.ID
              this.visualConfigAxisOneSql = data.ID
              this.visualConfigAxisOneSqlValue = ''
              this.visualConfigAxisOneTableIndex = ''
              this.visualConfigAxisOneFormat = ''

              this.visualConfigAxisOneDataSourceName = ''
              this.visualConfigAxisOneTreeType = 'event'
              this.visualConfigAxisOneColumnType = data.ID
            } else if (this.currentAxisStyle === 'two') {
              if (this.visualConfigAxisTwoTextName === '测量') {
                this.$message({
                  message: '测量轴类型不能选择事件参数！',
                  type: 'warning'
                })
                return false
              }
              if (this.isShowVisualConfigThreeAxis) {
                if (data.NAME === this.visualConfigAxisOneText) {
                  return false
                }
              }

              this.visualConfigAxisTwoText = data.NAME
              this.visualConfigAxisTwoValue = data.ID
              this.visualConfigAxisTwoSql = data.ID
              this.visualConfigAxisTwoSqlValue = ''
              this.visualConfigAxisTwoTableIndex = ''
              this.visualConfigAxisTwoFormat = ''

              this.visualConfigAxisTwoDataSourceName = ''
              this.visualConfigAxisTwoTreeType = 'event'
              this.visualConfigAxisTwoColumnType = data.ID
            }

            this.initVisualChart()
          }

          if (data.TYPE === '5' && !this.$util.isNotEmptyObject(this.$store.state.eventStoreData) && !this.$util.isDefine(data.EVENT_PROFILE)) {
            if (this.currentAxisStyle === 'one') {
              if (this.isShowVisualConfigThreeAxis) {
                if (data.NAME === this.visualConfigAxisTwoText) {
                  return false
                }
              }

              this.visualConfigAxisOneText = data.NAME
              this.visualConfigAxisOneValue = data.ID
              this.visualConfigAxisOneSql = data.ID
              this.visualConfigAxisOneSqlValue = ''
              this.visualConfigAxisOneTableIndex = ''
              this.visualConfigAxisOneFormat = ''

              this.visualConfigAxisOneDataSourceName = ''
              this.visualConfigAxisOneTreeType = 'event'
              this.visualConfigAxisOneColumnType = data.ID
            } else if (this.currentAxisStyle === 'two') {
              if (this.visualConfigAxisTwoTextName === '测量') {
                return false
              }
              if (this.isShowVisualConfigThreeAxis) {
                if (data.NAME === this.visualConfigAxisOneText) {
                  return false
                }
              }

              this.visualConfigAxisTwoText = data.NAME
              this.visualConfigAxisTwoValue = data.ID
              this.visualConfigAxisTwoSql = data.ID
              this.visualConfigAxisTwoSqlValue = ''
              this.visualConfigAxisTwoTableIndex = ''
              this.visualConfigAxisTwoFormat = ''

              this.visualConfigAxisTwoDataSourceName = ''
              this.visualConfigAxisTwoTreeType = 'event'
              this.visualConfigAxisTwoColumnType = data.ID
            }

            this.initVisualChart()
          }
          return false
        }

        let axisValue = ''
        let axisSql = ''
        let axisSqlValue = ''
        let axisTableIndex = ''
        if (data.COLUMNNAME) {
          axisValue = data.ID
          axisSql = data.COLUMNNAME
          axisSqlValue = data.COLUMNNAME
          axisTableIndex = ''
        } else {
          axisValue = data.ID
          axisSql = data.RESULT_COLUMN_INDEX
          axisSqlValue = 'g' + data.RESULT_COLUMN_INDEX
          axisTableIndex = data.RESULT_TABLE_INDEX
        }

        let isFlightDate = false
        if (data.COLUMNNAME === 'FLIGHT_DATE') {
          isFlightDate = true
          this.axisDateArr = this.axisDateArrDate
        } else {
          this.axisDateArr = this.axisDateArrDateTime
        }
        console.log(this.currentAxisStyle)
        // 点击左侧树节点是显示对应轴的值
        if (this.currentAxisStyle === 'one') {
          this.visualConfigAxisOneText = data.NAME
          this.visualConfigAxisOneValue = axisValue
          this.visualConfigAxisOneSql = axisSql
          this.visualConfigAxisOneSqlValue = axisSqlValue
          this.visualConfigAxisOneTableIndex = axisTableIndex
           console.log(this.axisForamtObj[data.TYPE])
          this.visualConfigAxisOneFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisOneFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisOneFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisOneDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisOneTreeType = data.TYPE
          this.visualConfigAxisOneColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({xAxis: {name: data.NAME}})
          this.initVisualChart()
        } else if (this.currentAxisStyle === 'two') {
          this.visualConfigAxisTwoText = data.NAME
          console.log(axisValue)
          this.visualConfigAxisTwoValue = axisValue
          this.visualConfigAxisTwoSql = axisSql
          this.visualConfigAxisTwoSqlValue = axisSqlValue
          this.visualConfigAxisTwoTableIndex = axisTableIndex
          console.log(this.axisForamtObj[data.TYPE])
          this.visualConfigAxisTwoFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisTwoFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisTwoFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisTwoDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisTwoTreeType = data.TYPE
          this.visualConfigAxisTwoColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({yAxis: {name: data.NAME}})
          this.initVisualChart()
        } else if (this.currentAxisStyle === 'three') {
          this.visualConfigAxisThreeText = data.NAME
          this.visualConfigAxisThreeValue = axisValue
          this.visualConfigAxisThreeSql = axisSql
          this.visualConfigAxisThreeSqlValue = axisSqlValue
          this.visualConfigAxisThreeTableIndex = axisTableIndex
          this.visualConfigAxisThreeFormat = this.axisForamtObj[data.TYPE] ? this.axisForamtObj[data.TYPE] : ''
          if (isFlightDate) {
            this.visualConfigAxisThreeFormatData = 'YYYY/MM/dd'
          } else {
            this.visualConfigAxisThreeFormatData = this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] ? this.axisForamtDataObj[this.axisForamtObj[data.TYPE]] : ''
          }
          this.visualConfigAxisThreeDataSourceName = data.DATASOURCE_NAME ? data.DATASOURCE_NAME : ''
          this.visualConfigAxisThreeTreeType = data.TYPE
          this.visualConfigAxisThreeColumnType = data.COLUMNTYPE ? data.COLUMNTYPE : ''

          // this.visualConfigCharts.setOption({zAxis: {name: data.NAME}})
          this.initVisualChart()
        }
      } else if (this.fileNewContentActiveName === 'tableConfig') { // 表格配置的tab
        if (!data.CHILDREN) { // || data.CHILDREN.length === 0
          if (data.TYPE === '5' || data.TYPE === '51' || data.TYPE === '52') {
            this.$message({
              message: '表格详情不能添加事件参数！',
              type: 'warning'
            })
            return false
          }
          if (this.tableConfigDataObj[data.ID]) {
            this.$message({
              message: '表格配置中已经存在！',
              type: 'warning'
            })
            return false
          }

          if (!this.$util.isNotEmptyObject(this.currentTableConfigRowObj)) {
            let modifyFlag = true
            this.tableConfigData.forEach((item, index) => {
              if (item['name'] === '请在左侧数据库中选择列名') {
                this.currentTableConfigRowObj = item
                modifyFlag = false
              }
            })
            if (modifyFlag) this.addTableConfigRowData() // 如果没有选择当前行，就执行新增
          }

          let tempTableConfigData = this.tableConfigData
          this.tableConfigData = []

          let tempTableConfigRowId = this.currentTableConfigRowObj['tableConfigRowId']
          let tempID = this.currentTableConfigRowObj['id']
          let tempTableData = []

          const tempNodeObj = {
            tableConfigRowId: tempTableConfigRowId,
            id: data.ID,
            name: data.NAME,
            type: data.TYPE,
            columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
            columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
            dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
            resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
            resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
            isSecret: data.IS_SECRET
          }
          delete this.tableConfigDataObj[tempID] // 先删除已经存在的数据
          this.currentTableConfigRowObj = tempNodeObj // 更新当前选择行的数据
          this.tableConfigDataObj[data.ID] = tempNodeObj // 更新表格配置对象中的数据

          tempTableConfigData.forEach((item, index) => { // 更新表格配置的数据
            if (item.tableConfigRowId === tempTableConfigRowId) {
              item = tempNodeObj
            }
            item['tableConfigRowId'] = index + 1
            tempTableData.push(item)
          })
          this.tableConfigData = tempTableData
          this.currentTableConfigRowObj = {} // 添加后清空当前选择的行
        }
      } else if (this.fileNewContentActiveName === 'classConfig') {
        console.log('分类配置')
        if (this.currentAxisStyle === 'four') {
          if (data.type === data.TYPE === '5' || data.TYPE === '51' || data.TYPE === '52') {
            this.$message.warning('不能选择事件类型参数')
          } else if (!isNaN(data.TYPE - 1)) {
            this.classConfigAxisFourText = data.NAME
            this.classConfigAxisFourObj = {
              id: data.ID,
              name: data.NAME,
              type: data.TYPE,
              columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
              columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
              dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
              resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
              resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : ''
            }
            if (data.TYPE === '3') {
              this.isDecimal = true
              this.isDate = false
            } else if (data.TYPE === '6') {
              this.isDecimal = false
              this.isDate = true
            } else {
              this.isDecimal = false
              this.isDate = false
            }
          }
        }
        if (this.currentAxisStyle === 'five') {
          if (data.type === data.TYPE === '5' || data.TYPE === '51' || data.TYPE === '52') {
            this.$message.warning('不能选择事件类型参数')
          } else if (!isNaN(data.TYPE - 1)) {
            this.classConfigAxisFiveText = data.NAME
            // this.classConfigAxisFiveObj = data
            this.classConfigAxisFiveObj = {
              id: data.ID,
              name: data.NAME,
              type: data.TYPE,
              columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
              columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
              dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
              resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
              resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : ''
            }
          }
        }
      }
      if (!data.CHILDREN && this.$util.isDefine(data.RESULT_COLUMN_INDEX) && this.$util.isDefine(data.RESULT_TABLE_INDEX)) {
        this.$store.commit('SHOW_LOADING', '正在加载字段说明...')
        this.$axios({
          url: '/flightRecords/getDimentionDesc',
          method: 'get',
          params: {
            id: data.ID,
            type: data.TYPE
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          console.log('getDimentionDesc~~~', response)
          if (response.data.status === '0') {
            let desc = response.data.result.data[0].DESCRIPTION
            if (this.$util.isDefine(desc)) {
              this.treeNodeDesc = desc
            }
          } else if (response.data.status === 'E1001') { // 没有登录
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }

      if (!data.CHILDREN) {
        this.$axios({
          url: '/buildTree/getLateUseparam',
          method: 'get',
          params: {
            val: JSON.stringify(data)
          }
        }).then(response => {
          // if (response.data.status === '0') {

          // } else if (response.data.status === 'E1001') { // 没有登录
          //   this.$bus.$emit('logBackInHandle', response.data)
          // } else {
          //   this.$message.error(response.data.message)
          // }
          // this.getTree()
        }).catch(response => {
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    getHotWordsSearchData (type, columnName) { // 获取热词搜索的数据且放到数据仓库中，防止同样参数重复调用接口
      let self = this

      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj || {} // 获取临时放到数据仓库中热词搜索的数据
      if (!hotWordsSearchObj[type + '-' + columnName]) { // 数据仓库中不存在当前点击节点的数据则从后台获取
        this.$store.commit('SHOW_LOADING', '正在加载热词数据...')
        this.$axios({
          url: '/buildTree/getCheckboxData',
          method: 'get',
          params: {
            type: type,
            name: columnName
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          console.log('getCheckboxData~~~', response)
          if (response.data.status === '0') {
            let dataObj = response.data.result
            if (this.$util.isNotEmptyObject(dataObj)) {
              let dataArr = dataObj.data
              if (dataArr.length > 0) {
                dataArr = dataArr.filter((item) => {
                  return item.columnname || item.COLUMNNAME
                })
                if (parseInt(type) === 7 || parseInt(type) === 51) {
                  self.notHotWordsSearchData = dataArr
                } else if (parseInt(type) === 8 || parseInt(type) === 9 || parseInt(type) === 52) {
                  self.hotWordsSearchData = dataArr
                }
                hotWordsSearchObj[type + '-' + columnName] = dataArr
                this.$store.commit('HOT_WORDS_SEARCH_OBJ', hotWordsSearchObj) // 更新数据仓库中的热词搜索数据
              }
            }
          } else if (response.data.status === 'E1001') { // 没有登录
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    hotWordsSearchMethod (query) { // 筛选配置中根据关键字获取热词搜索的数据
      console.log('hotWordsSearchMethod~~~~~~~~', query)
      if (query !== '') {
        this.hotWordsSearchLoading = true
        setTimeout(() => {
          this.hotWordsSearchLoading = false
          if (this.hotWordsSearchData.length > 0) {
            this.hotWordsSearchListData = this.hotWordsSearchData.filter(item => {
              if (item.columnname && item.columnname !== '') {
                return item.columnname.toLowerCase().indexOf(query.toLowerCase()) > -1
              }
            })
          }
        }, 200)
      } else {
        this.hotWordsSearchListData = []
      }
    },
    tabFileNewContent (tab, event) { // 中间tab标签点击方法
      if (tab.name === 'visualConfigDhb') {
        this.toggleTreeType('timePoint')
      } else {
        this.toggleTreeType('')
      }
      setTimeout(() => {
        if (this.contentType === 'analysis_dhbcsdb') {
          this.initFpcVisualChat()
        } else {
          this.initVisualChart() // 初始化可视化配置中图表数据
        }
      }, 500)
    },
    filterRowDelete (index, rows) { // 筛选配置中表格删除行
      console.log('delete', index, rows)

      delete this.filterConfigTableDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)

      if (this.filterConfigTableData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentFilterConfigRowAttr = 1
        this.currentFilterConfigRowAttrName = ''
        this.filterConfigTableDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      } else if (this.filterConfigTableData.length > 0) {
        //this.filterConfigTableRowHandle(this.filterConfigTableData[this.filterConfigTableData.length - 1])
        this.filterConfigTableRowHandle(this.filterConfigTableData[0])
      }
    },
    filterConfigTableRowHandle (value) { // 1.设置筛选配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
      console.log('filterConfigTableRowHandle:', value)

      this.alertTitle = '' // 清空错误提示信息
      this.logicalValue = ''
      this.hotWordsSearchValue = [] // 清空已经存在的热词搜索数据
      this.hotWordsSearchData = [] // 清空已经存在的某种类型热词搜索原始数据集合
      this.hotWordsSearchListData = [] // 清空上次筛选下的数据
      this.notHotWordsSearchValue = [] // 清空已经存在的非热词搜索数据
      this.notHotWordsSearchData = [] // 清空已经存在的非热词搜索数据集合
      this.isSubmit = true // 恢复提交按钮的状态
      this.currentFilterConfigRowAttr = parseInt(value.type) // 显示某个类型的属性
      this.currentFilterConfigRowAttrName = value.columnName
      this.currentFilterConfigRowId = value.id // 设置选中某行的编号
      this.currentFilterConfigRowName = value.name // 设置选中某行的名字
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj // 获取热词搜索中的数据
      if (this.$util.isNotEmptyObject(this.filterConfigTableDataObj[value.id])) { // 临时对象中存在当前节点的数据
        // 替换点击节点时存储到表格的默认数据
        let tempRowDataObj = this.filterConfigTableDataObj[value.id]
        let tempFilterStr = '' // 临时存储显示表格中的过滤参数值
        let tempTableObj = {}
        if (this.$util.isNotEmptyObject(tempRowDataObj.filterConditions)) { // 多次点击当前行
          tempTableObj = tempRowDataObj.filterConditions
        } else { // 第一次点击当前行
          let tempColumnName = value.columnName
          if (this.filterConfigTableDataObj[value.id]['type'] === '2' &&
            this.filterConfigTableDataObj[value.id]['columnType'] === 'NUMBER') { // 文本类型节点，且值类型是数值类型
            tempColumnName = 'cast(' + value.columnName + ' as varchar)'
          }
          tempTableObj = { // 更新过滤条件
            condition: '',
            paramId: value.id,
            paramName: value.name,
            paramType: value.type,
            attrRadioFlag: '',
            attrRadioValue: '',
            operatordId: '',
            selectValueOne: '',
            selectValueTwo: '',
            selectValueThree: '',
            paramValueOne: '',
            paramValueTwo: '',
            paramValueThree: '',
            // isIncluded: '',
            resultColumnIndex: value.resultColumnIndex,
            resultTableIndex: value.resultTableIndex,
            columnName: tempColumnName,
            dataSourceNameValue: value.dataSourceName
          }
        }
        if (this.filterConfigTableDataObj[value.id]['type'] === '5') { // 事件类型
          // tempFilterStr = '事件'
          // if (this.$util.isNotEmptyObject(tempTableObj)) {
          //   if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
          //     tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
          //   }
          // }

          // tempTableObj.selectValueOne = tempFilterStr
          tempTableObj.operatordId = '5'
          // tempTableObj['filterName'] = tempFilterStr
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '2') { // 文本类型
          this.inputTypeName = value.name
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '7' ||
                   this.filterConfigTableDataObj[value.id]['type'] === '51') { // 不是热词搜索类型
          this.notHotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }

          if (this.filterConfigTableDataObj[value.id]['type'] === '51') {
            this.getEventLevelData(value.columnName, value.filterConditions)
          }
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '8' ||
                  this.filterConfigTableDataObj[value.id]['type'] === '9' ||
                  this.filterConfigTableDataObj[value.id]['type'] === '52') { // 热词搜索类型
          this.hotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.hotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.getHotWordsSearchData(value.type, value.columnName) // 重新查询热词
          }
        }
        this.resetFilterTableConditionsData(value.id, tempTableObj, tempFilterStr, false) // 替换显示过滤参数值
        this.resetDefaultData() // 重置属性中默认值

        if (this.$util.isNotEmptyObject(value.filterConditions)) {
          console.log(JSON.stringify(value))
          let tempObj = value.filterConditions

          if (value.type === '51') {
            // if (this.$util.isNotEmptyObject(tempObj.paramValueOne)) {
            //   this.notHotWordsSearchValue = tempObj.paramValueOne
            // }
            if (this.$util.isDefine(tempObj.filterName)) {
              let tempFilterName = tempObj.filterName.substr(6, tempObj.filterName.indexOf('; 已选事件等级: ') - 6)
              let plist = tempFilterName.split(',')
              let slist = tempObj.selectValueOne.split(',')
              let tlist = []
              if (tempFilterName.length > 1 && plist.length > 0) {
                plist.forEach((item, i) => {
                  tlist.push({
                    columnname: item,
                    value: slist[i]
                  })
                })
                this.notHotWordsSearchValue = tlist
              }

              // let tempLevName = tempObj.filterName.substr(tempObj.filterName.indexOf('; 已选事件等级: ') + 10)
              // let alist = tempLevName.split(',')
              // let blist = tempObj.selectValueTwo.split(',')
              // let clist = []

              // if (tempLevName.length > 1 && alist.length > 0) {
              //   alist.forEach((item, i) => {
              //     clist.push({
              //       label: item,
              //       value: blist[i]
              //     })
              //   })
              //   this.eventLevelValue = clist
              // }
            }

            // if (this.$util.isDefine(tempObj.selectValueTwo)) {
            //   if (this.eventLevelValue !== tempObj.selectValueTwo.split(',')) {
            //     this.eventLevelValue = tempObj.selectValueTwo.split(',')
            //   }
            // }
          } else if (value.type === '52') {
            if (this.$util.isDefine(tempObj.selectValueOne)) {
              this.hotWordsSearchValue = tempObj.selectValueOne.split(',')
            }
            if (this.$util.isDefine(tempObj.selectValueTwo)) {
              this.agsEventLevelValue = tempObj.selectValueTwo.split(',')
            }
          }

          if (!this.$util.isDefine(tempObj.attrRadioValue)) {
            return true
          }

          if (value.type === '3') {
            this.attrOneRadio = tempObj.attrRadioValue
            this.standardSelectValue = tempObj.selectValueOne
            this.standardMinValue = tempObj.paramValueOne
            this.standardMaxValue = tempObj.paramValueTwo
          } else if (value.type === '6') {
            this.attrSixRadio = tempObj.attrRadioValue
            if (tempObj.attrRadioFlag === '3') {
              this.accordDayStartDate = tempObj.paramValueOne
              this.accordDayEndDate = tempObj.paramValueTwo
            } else {
              let dateObj = JSON.parse('{' + tempObj.condition + '}')
              if (!this.$util.isNotEmptyObject(dateObj)) {
                return
              }
              // "year":[2017,2018],"month":[1,2],"day":[],"hour":[],"quarter":[],"dayofweek":[]
              this.dataPointY = dateObj.year
              this.dataPointM = dateObj.month
              this.dataPointD = dateObj.day
              this.dataPointH = dateObj.hour
              this.dataPointQ = dateObj.quarter
              this.dataPointW = dateObj.dayofweek
            }
          }
        }
      }
    },
    closeFileNewNameInput (ev) { // 清除筛选配置属性中文本框输入的值
      this.fileNewName = ''
    },
    closeVisualConfigChartsName (ev) { // 清除可视化配置第一类属性中文本框输入的值
      console.log('visualConfigChartsName', ev)
      this.visualConfigChartsName = ''
    },
    resetDefaultData () { // 重置默认数据
      this.resetAttrOneDefaultData(true, true) // 筛选配置第三类属性
      this.resetAttrSixDefaultData(true) // 筛选配置第六类
      this.resetAttrTwoDefaultData(true) // 筛选配置第二类
      this.HotWordsSearchValueFlag = '1'
      this.notHotWordsSearchValueFlag = '1'
      this.eventHappenValueFlag = '1'
      // this.eventLevelValue = ['高', '中', '低']
      this.eventLevelValue = []
      this.agsEventLevelValue = ['1', '2', '3', '4']
    },
    resetAttrTwoDefaultData (flag) { // 重置筛选配置第二类属性的值
      if (flag) {
        this.inputTypeNameValue = ''
        this.inputTypeNameQueryType = '1'
        this.inputTypeNameValueFlag = '1'
      }
    },
    resetAttrOneDefaultData (flag, selectFlag) { // 重置筛选配置第三类属性的值
      if (flag) {
        this.attrOneRadio = '' // 筛选配置第三类属性radio值
      }
      if (selectFlag) {
        this.standardSelectValue = '' // 筛选配置第三类属性中下拉框选中的值
      }
      this.standardMinValue = '' // 筛选配置第三类属性中输入框最小值
      this.standardMaxValue = '' // 筛选配置第三类属性中输入框最大值
    },
    resetAttrSixDefaultData (flag) { // 重置筛选配置第六类属性的值
      if (flag) {
        this.attrSixRadio = '' // 筛选配置第六类属性radio值
      }
      this.accordDayStartDate = '' // 筛选配置第六类属性中按天范围开始日期
      this.accordDayEndDate = '' // 筛选配置第六类属性中按天范围结束日期

      this.dataPointY = []
      this.dataPointM = []
      this.dataPointD = []
      this.dataPointH = []
      this.dataPointQ = []
      this.dataPointW = []
    },
    resetFilterTableConditionsData (rowId, obj, filterStr, flag) { // 重置筛选配置表格中的数据
      let tempTableData = []
      this.filterConfigTableData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.filterConfigTableDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      this.filterConfigTableData = tempTableData // 临时数组重新复制给表格数据
    },
    clearExportGroupCount () {
      this.form.exportGroupCount = ''
    },
    clearCurrentAxisData (type) { // 清空选中当前轴的数据
      this.currentAxisStyle = '' // 清除选中轴的信息
      if (type === 'one') {
        this.visualConfigAxisOneText = ''
        this.visualConfigAxisOneValue = ''
        this.visualConfigAxisOneSql = ''
        this.visualConfigAxisOneSqlValue = ''
        this.visualConfigAxisOneTableIndex = ''
        this.visualConfigAxisOneFormat = ''
        this.visualConfigAxisOneFormatData = ''
        this.visualConfigAxisOneDataSourceName = ''
        this.visualConfigAxisOneTreeType = ''
        this.visualConfigAxisOneColumnType = ''
        this.intervalNum = '10'
      } else if (type === 'two') {
        if (this.visualConfigAxisTwoFormat === 'decimalFormat') { // 如果轴2是数值，则清空时同时也清空聚合函数的值
          this.twoAggregation = ''
        }
        this.visualConfigAxisTwoText = ''
        this.visualConfigAxisTwoValue = ''
        this.visualConfigAxisTwoSql = ''
        this.visualConfigAxisTwoSqlValue = ''
        this.visualConfigAxisTwoTableIndex = ''
        this.visualConfigAxisTwoFormat = ''
        this.visualConfigAxisTwoFormatData = ''
        this.visualConfigAxisTwoDataSourceName = ''
        this.visualConfigAxisTwoTreeType = ''
        this.visualConfigAxisTwoColumnType = ''
      } else if (type === 'three') {
        this.visualConfigAxisThreeText = ''
        this.visualConfigAxisThreeValue = ''
        this.visualConfigAxisThreeSql = ''
        this.visualConfigAxisThreeSqlValue = ''
        this.visualConfigAxisThreeTableIndex = ''
        this.visualConfigAxisThreeFormat = ''
        this.visualConfigAxisThreeFormatData = ''
        this.visualConfigAxisThreeDataSourceName = ''
        this.visualConfigAxisThreeTreeType = ''
        this.visualConfigAxisThreeColumnType = ''
        this.twoAggregation = ''
      } else if (type === 'four') {
        this.classConfigAxisFourText = ''
      } else if (type === 'five') {
        this.classConfigAxisFiveText = ''
      }

      this.initVisualChart()
    },
    addThreeAxis () { // 可视化配置中添加第三轴
      if (this.isShowVisualConfigThreeAxis) {
        this.isShowVisualConfigThreeAxis = false
        this.clearCurrentAxisData('three')
      } else {
        this.isShowVisualConfigThreeAxis = true
        this.clearCurrentAxisData('three')
      }
      this.initVisualChart()
    },
    initVisualChart () {
      // 初始化可视化配置图表
      // 重置容器大小
      const elementVC = document.getElementById('visualChart')
      // const elementFVC = document.getElementsByClassName('file-visual-chart')[0]

      if (elementVC) {
        elementVC.style.width = document.getElementsByClassName('file-visual-chart')[0].offsetWidth + 'px'
        console.log(elementVC.style.width, elementVC.style.height)
      }
      // let pH = elementFVC.parentNode.offsetHeight
      // let nH = elementFVC.offsetHeight

      // elementVC.style.width.style.height = (pH - 150) + 'px'

      if (this.visualConfigCharts) {
        this.visualConfigCharts.dispose()
        console.log('销毁存在的echarts')
      }
      this.visualConfigCharts = this.$echarts.init(document.getElementById('visualChart'))
      if (this.isShowVisualConfigThreeAxis) {
        let serData = [[0, 0, 13], [0, 1, 6], [0, 2, 9]]
        this.visualConfigCharts.setOption({
          title: {
            show: true,
            text: this.visualConfigChartsName || '请输入图表名称',
            left: 'center',
            textStyle: {
              fontSize: 12
            }
          },
          tooltip: {},
          xAxis3D: {
            type: 'category',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisOneText
          },
          yAxis3D: {
            type: 'category',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisTwoText
          },
          zAxis3D: {
            type: 'value',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            name: this.visualConfigAxisThreeText
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            axisPointer: { show: false },
            light: {
              main: { intensity: 1.2 },
              ambient: { intensity: 0.3 }
            }
          },
          color: ['#588EE6'],
          series: [{
            type: 'bar3D',
            barSize: 15,
            data: serData.map(function (item) {
              return {value: [item[0], item[1], item[2]]}
            })
          }]
        })
      } else {
        this.visualConfigCharts.setOption({
          title: {
            show: true,
            text: this.visualConfigChartsName || '请输入图表名称',
            left: 'center',
            textStyle: {
              fontSize: 12
            }
          },
          xAxis: {
            name: this.visualConfigAxisOneText,
            nameLocation: 'center',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            },
            nameGap: 10,
            data: ['', '', '', '', '', '', '', '', '', '']
          },
          yAxis: {
            // name: 'Flights',
            name: this.visualConfigAxisTwoText,
            position: 'left',
            nameLocation: 'middle',
            nameTextStyle: {
              color: '#999999',
              fontSize: 12
            },
            nameGap: 40
          },
          series: [{
            type: 'bar',
            data: [12, 23, 34, 24, 43, 45, 67, 46, 54, 65]
          }],
          color: ['#588EE6']
        })
      }

      this.visualConfigCharts.on('click', function (params) {
        console.log('visualConfigCharts:', params)
        console.log('bar-name:' + params.name, 'bar-data:' + params.data)
      })
      // window.onresize = this.visualConfigCharts.resize()
      // window.onresize = this.visualConfigCharts.resize
    },
    changeVisualAxisValue () {
      // 可视化配置中轴1与轴2切换方法
      // 2018/12/18 轴1和轴2切换时，不进行为空校验
      let twoText = this.visualConfigAxisTwoText
      let twoValue = this.visualConfigAxisTwoValue
      let twoSql = this.visualConfigAxisTwoSql
      let twoSqlValue = this.visualConfigAxisTwoSqlValue
      let twoTableIndex = this.visualConfigAxisTwoTableIndex
      let twoFormat = this.visualConfigAxisTwoFormat
      let twoFormatData = this.visualConfigAxisTwoFormatData
      let twoDataSourceName = this.visualConfigAxisTwoDataSourceName
      let twoTreeType = this.visualConfigAxisTwoTreeType
      let twoColumnType = this.visualConfigAxisTwoColumnType

      let oneText = this.visualConfigAxisOneText
      let oneValue = this.visualConfigAxisOneValue
      let oneSql = this.visualConfigAxisOneSql
      let oneSqlValue = this.visualConfigAxisOneSqlValue
      let oneTableIndex = this.visualConfigAxisOneTableIndex
      let oneFormat = this.visualConfigAxisOneFormat
      let oneFormatData = this.visualConfigAxisOneFormatData
      let oneDataSourceName = this.visualConfigAxisOneDataSourceName
      let oneTreeType = this.visualConfigAxisOneTreeType
      let oneColumnType = this.visualConfigAxisOneColumnType

      this.visualConfigAxisTwoText = oneText
      this.visualConfigAxisTwoValue = oneValue
      this.visualConfigAxisTwoSql = oneSql
      this.visualConfigAxisTwoSqlValue = oneSqlValue
      this.visualConfigAxisTwoTableIndex = oneTableIndex
      this.visualConfigAxisTwoFormat = oneFormat
      this.visualConfigAxisTwoFormatData = oneFormatData
      this.visualConfigAxisTwoDataSourceName = oneDataSourceName
      this.visualConfigAxisTwoTreeType = oneTreeType
      this.visualConfigAxisTwoColumnType = oneColumnType

      this.visualConfigAxisOneText = twoText
      this.visualConfigAxisOneValue = twoValue
      this.visualConfigAxisOneSql = twoSql
      this.visualConfigAxisOneSqlValue = twoSqlValue
      this.visualConfigAxisOneTableIndex = twoTableIndex
      this.visualConfigAxisOneFormat = twoFormat
      this.visualConfigAxisOneFormatData = twoFormatData
      this.visualConfigAxisOneDataSourceName = twoDataSourceName
      this.visualConfigAxisOneTreeType = twoTreeType
      this.visualConfigAxisOneColumnType = twoColumnType

      // this.visualConfigCharts.setOption({xAxis: {name: twoText}, yAxis: {name: oneText}})

      if (this.visualConfigAxisOneFormat !== 'decimalFormat') { // 轴1不是数值类型时则清空区间数量的值
        this.intervalNum = '10'
      }

      if (this.visualConfigAxisTwoFormat !== 'decimalFormat') { // 轴2不是数值时则清空聚合函数的值
        this.twoAggregation = ''
      }
    },
    updateAxisDateArr (name, event) {
      if ((name === 'one' && this.visualConfigAxisOneText === '航班日期') ||
          (name === 'two' && this.visualConfigAxisTwoText === '航班日期') ||
          (name === 'three' && this.visualConfigAxisThreeText === '航班日期')
      ) {
        this.axisDateArr = this.axisDateArrDate
      } else {
        this.axisDateArr = this.axisDateArrDateTime
      }
    },
    selectCurrentAxis (name) { // 选中某个轴
      console.log(name)
      this.currentAxisStyle = name
    },
    addTableConfigRowData () { // 表格配置添加列名数据
      const tempRowObj = {
        tableConfigRowId: this.tableConfigData.length + 1, // 页面显示的序号
        id: '',
        name: '请在左侧数据库中选择列名',
        columnName: '',
        dataSourceName: '',
        resultColumnIndex: '',
        resultTableIndex: ''
      }
      this.currentTableConfigRowObj = tempRowObj // 新增后默认选中
      this.tableConfigData.push(tempRowObj)
    },
    tableConfigRowDelete (index, rows) { // 删除表格配置中的数据
      if (rows[index]['id'] !== '') {
        delete this.tableConfigDataObj[rows[index]['id']]
      }

      rows.splice(index, 1)
      this.tableConfigData = rows

      if (this.tableConfigData.length === 0) { // 表格配置无数据时清空默认数据
        this.tableConfigDataObj = {}
        this.currentTableConfigRowObj = {}
      } else if (this.tableConfigData.length > 0) {
        // this.currentTableConfigRowObj = this.tableConfigData[0]

        let tempTableConfigData = this.tableConfigData
        let tempTableConfigDataObj = this.tableConfigDataObj
        let tempTableData = []
        this.tableConfigData = []
        this.tableConfigDataObj = {}
        tempTableConfigData.forEach((item, index) => {
          item['tableConfigRowId'] = index + 1
          tempTableData.push(item)

          tempTableConfigDataObj[item['id']] = item

          if (item['name' === '请在左侧数据库中选择列名']) {
            this.currentTableConfigRowObj = item
          }
        })
        this.tableConfigData = tempTableData
        this.tableConfigDataObj = tempTableConfigDataObj
        this.currentTableConfigRowObj = {}
      }
    },
    tableConfigRowHandle (value) { // 表格配置中选中某行
      this.currentTableConfigRowObj = value
    },
    changeFileNewName (value) { // 筛选配置→属性→新建分析名称
      this.fileNewName = value
      // if (this.$util.isDefine(this.currentFilterConfigRowId)) { // 如果用户只选择一个筛选条件，且点击了筛选条件所在行
      //   this.filterConfigTableDataObj[this.currentFilterConfigRowId]['fileNewName'] = value
      // } else { // 如果用户只选择一个筛选条件，没有点击了筛选条件所在行，则取数据的第一条
      //   this.filterConfigTableDataObj[this.filterConfigTableData[0]['id']]['fileNewName'] = value
      // }
    },
    blurFileNewName (event) { // 新建分析名字失去焦点后校验
      // let reg = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$')
      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 ]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      let str = this.fileNewName // .replace(/(^\s*)|(\s*$)/g, '')
      if (!reg.test(str)) {
        this.alertTitleName = '新建分析的名字只含有汉字、数字、字母，前后不能有空格！'
        this.isSubmit = false
        return false
      } else if (!reg1.test(str)) {
        this.alertTitleName = '新建分析的名字不能有连续的空格！'
        this.isSubmit = false
        return false
      } else {
        this.alertTitleName = ''
        this.isSubmit = true
      }
    },
    dataViewPowerClick (value) {
      console.log(value)
    },
    changeInputTypeNameValue (value) { // 筛选配置→属性二→文本输入值
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = value
      let tempSqlStr = ''
      let isNotFlag = this.inputTypeNameValueFlag === '1' ? '' : 'not '

      if (this.inputTypeNameQueryType === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + value + '%\'' // 模糊查询
        if (this.inputTypeNameValueFlag !== '1') {
          tempStr = '(不包含)' + tempStr
        }
      } else if (this.inputTypeNameQueryType === '2') {
        if (this.inputTypeNameValueFlag === '1') {
          tempSqlStr = ' = \'' + value + '\'' // 包含
        } else {
          tempSqlStr = ' <> \'' + value + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValue = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeInputTypeNameQueryType (value) { // 筛选配置→属性二→文本输入值的查询类型单选框
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = this.inputTypeNameValue
      let tempSqlStr = ''
      let isNotFlag = this.inputTypeNameValueFlag === '1' ? '' : 'not '

      if (value === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + this.inputTypeNameValue + '%\'' // 模糊查询
      } else if (value === '2') {
        if (this.inputTypeNameValueFlag === '1') {
          tempSqlStr = ' = \'' + this.inputTypeNameValue + '\'' // 包含
          if (this.inputTypeNameValueFlag !== '1') {
            tempStr = '(不包含)' + tempStr
          }
        } else {
          tempSqlStr = ' <> \'' + this.inputTypeNameValue + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameQueryType = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeInputTypeNameValueFlag (value) { // 筛选配置→属性二→文本输入值的查询类型 是否包含筛选条件开关
      this.isSubmit = true // 恢复提交按钮的状态
      let tempStr = this.inputTypeNameValue
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      if (this.inputTypeNameQueryType === '1') {
        tempSqlStr = isNotFlag + 'like \'%' + this.inputTypeNameValue + '%\'' // 模糊查询
        if (value !== '1') {
          tempStr = '(不包含)' + tempStr
        }
      } else if (this.inputTypeNameQueryType === '2') {
        if (value === '1') {
          tempSqlStr = ' = \'' + this.inputTypeNameValue + '\'' // 包含
        } else {
          tempSqlStr = ' <> \'' + this.inputTypeNameValue + '\'' // 不包含
          tempStr = '(不包含)' + tempStr
        }
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValueFlag = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrOneRadio (value) { // 筛选配置→属性三
      let expressionId = this.expressionData['attrOneRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrOneRadio = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    changeStandardSelectValue (value) { // 筛选配置→属性三→标准→下拉框
      let expressionId = this.expressionData['attrOneRadio'][this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag']][value]
      this.resetAttrOneDefaultData(false, false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      if (value === '9999') {
        this.isSubmit = true
        this.alertTitle = ''

        let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
        let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
        let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
        let tempCName = ''
        if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
          tempCName = columnName
        } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
          tempCName = columnName
        } else {
          tempCName = 'g' + columnIndex
        }

        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempCName
        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = `length(${tempCName}) > 0`
        this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = '非空'
        this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '非空', true)
      } else {
        this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
      }
    },
    blurStandardMinValue (event) { // 筛选配置→属性三→标准→文本框最小值→失去焦点
      console.log('blurStandardMinValue', event)
      if (parseFloat(this.standardMinValue).toString() === 'NaN') {
        this.alertTitle = '参数1不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (parseInt(this.standardSelectValue) > 6) {
        this.blurStandardMaxValue(event)
      }
    },
    changeStandardMinValue (value) { // 筛选配置→属性三→标准→文本框最小值
      const minStrArr = ['等于', '不等于', '小于', '小于等于', '大于', '大于等于']
      const minSymbolArr = ['=', '!=', '<', '<=', '>', '>=']
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (parseInt(this.standardSelectValue) < 7) {
        if (value !== '') { // 每次选择下拉框时都会触发最大值和最小值的改变，在这里判断最小值不为空时显示条件值
          tempStr = minStrArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value) // 拼接过滤条件值
          tempSqlStr = 'cast(' + tempSqlType + ' as double) ' + minSymbolArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value)
        }
      } else if (this.standardMaxValue !== '') {
        if (this.standardSelectValue === '7') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '8') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9') {
          tempStr = 'x<=' + this.$util.dealInputNumValue(value) + '或x>=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '10') {
          tempStr = 'x<' + this.$util.dealInputNumValue(value) + '或x>' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '781') {
          tempStr = this.$util.dealInputNumValue(value) + '<x<=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '782') {
          tempStr = this.$util.dealInputNumValue(value) + '<x<' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9101') {
          tempStr = 'x<' + this.$util.dealInputNumValue(value) + '或x>=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9102') {
          tempStr = 'x<=' + this.$util.dealInputNumValue(value) + '或x>' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(this.standardMaxValue)
        }
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMaxValue (event) { // 筛选配置→属性三→标准→文本框最大值→失去焦点
      console.log('blurStandardMinValue', event)
      if (!this.$util.isDefine(this.standardMinValue)) {
        this.alertTitle = '请输入参数1'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (parseFloat(this.standardMaxValue).toString() === 'NaN') {
        this.alertTitle = '参数2不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.standardSelectValue === '7' || this.standardSelectValue === '8') {
        if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能等于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }

        if (this.$util.dealInputNumValue(this.standardMinValue) > this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能小于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
      if (this.standardSelectValue === '9' || this.standardSelectValue === '10') {
        // if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
        //   this.alertTitle = '参数2不能等于参数1'
        //   this.isSubmit = false
        //   return false
        // } else {
        //   this.isSubmit = true
        //   this.alertTitle = ''
        // }

        // if (this.$util.dealInputNumValue(this.standardMinValue) < this.$util.dealInputNumValue(this.standardMaxValue)) {
        //   this.alertTitle = '参数1不能小于参数2'
        //   this.isSubmit = false
        //   return false
        // } else {
        //   this.isSubmit = true
        //   this.alertTitle = ''
        // }
      }
    },
    changeStandardMaxValue (value) { // 筛选配置→属性三→标准→文本框最大值
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && !this.$util.isDefine(columnIndex)) {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (this.standardSelectValue === '7') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<=' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '8') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9') {
        tempStr = 'x<=' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>=' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '10') {
        tempStr = 'x<' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '781') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<x<=' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '782') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<x<' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' < cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9101') {
        tempStr = 'x<' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>=' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9102') {
        tempStr = 'x<=' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(value)
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeLogicalValue (value) { // 筛选配置→属性四
      console.log('changeLogicalValue@@@@~: ' + value)
      let tempStr = ''
      let tempSqlStr = ''
      if (value === 1 || value === '1') {
        tempSqlStr = '= 1'
        tempStr = '是'
      } else {
        tempSqlStr = '= 0'
        tempStr = '否'
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrFourRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventLevelValue51 (value) { // type === 51  事件
      // if (value.length === 0) {
      //   value = ['高', '中', '低']
      // }

      let tempStr = ''

      let _names = []
      let _vals = []
      this.notHotWordsSearchValue.forEach((item, index) => {
        _names.push(item.columnname.trim())
        _vals.push(item.value)
      })

      let levelName = value.map((item) => {
        return item.label
      })
      let levelValue = value.map((item) => {
        return item.value
      })

      tempStr = `已选事件: ${_names.join(',')}; 已选事件等级: ${levelName.join(',')}`

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = levelValue.join(',')
      // this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = JSON.stringify(this.notHotWordsSearchValue)

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueEvent51 (value) {
      let _names = []
      let _vals = []
      value.forEach((item, index) => {
        _names.push(item.columnname.trim())
        _vals.push(item.value)
      })

      let tempStr = ''

      let evLevel = this.eventLevelValue

      let levelName = evLevel.map((item) => {
        return item.label
      })
      let levelValue = evLevel.map((item) => {
        return item.value
      })

      // if (this.eventLevelValue.length === 0) {
      //   evLevel = ['高', '中', '低']
      // }

      tempStr = `已选事件: ${_names.join(',')}; 已选事件等级: ${levelName.join(',')}`

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '51'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = levelValue.join(',')
      // this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = JSON.stringify(value)

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = _vals.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changAgsEventLevelValue (value) {
      let tempStr = value.join(',')

      if (value.length === 0) {
        tempStr = `${['1', '2', '3', '4'].join(',')}`
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = this.hotWordsSearchValue.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValueEvent (value) { // 筛选配置→AGS事件
      // let _names = []
      // let _vals = []
      // value.forEach((item, index) => {
      //   _names.push(item.columnname.trim())
      //   _vals.push(item.PRO_NO)
      // })

      let tempStr = value.join(',')
      let tempSqlStr = value.join(',')

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '52'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueTwo'] = this.agsEventLevelValue.join(',')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventLevelValue (value) {
      let tempStr = value.join(',')
      let tempSqlStr = ''

      if (this.eventHappenValueFlag === '1') {
        tempStr = `已发生[${tempStr}]`
        tempSqlStr = value.join(',')

        // if (value.length === 0) {
        //   tempSqlStr = ['高', '中', '低'].join(',')
        //   tempStr = `已发生[${['高', '中', '低'].join(',')}]`
        // }
      } else {
        tempStr = '未发生'
        tempSqlStr = '0'
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changEventHappenValueFlag (value) { // 筛选配置→属性五
      let tempStr = ''
      let tempSqlStr = ''

      if (value === '1') {
        // this.eventLevelValue = ['高', '中', '低']
        tempStr = `已发生[${this.eventLevelValue.join(',')}]`
        tempSqlStr = this.eventLevelValue.join(',')
      } else {
        tempStr = '未发生'
        tempSqlStr = '0'
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = '5'
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrSixRadio (value) { // 筛选配置→属性六
    console.log(value, 'value----test')
      let expressionId = this.expressionData['attrSixRadio'][value]
      console.log(this.expressionData, 'this.expressionData---test')
      console.log(expressionId, 'expressionId---test')
      this.isSubmit = false // 设置禁止提交状态
      this.attrSixRadio = value
      this.resetAttrSixDefaultData(false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurAccordDayStartDate (event) { // 开始日期失去焦点校验
      console.log('blurAccordDayStartDate', event)
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

      if (!this.$util.isDefine(this.accordDayStartDate)) { // 点击开始日期后没有选择值
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.accordDayEndDate) { // 存在结束日期
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() && columnName !== 'FLIGHT_DATE') {
          this.alertTitle = '开始日期不能等于结束日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          this.alertTitle = '结束日期不能早于开始日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
    },
    changeAccordDayStartDate (value) { // 筛选配置→属性六→按天→开始日期
      let tempStr = ''
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

      if (columnName === 'FLIGHT_DATE') {
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      } else {
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() || new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      }

      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        if (columnName === 'FLIGHT_DATE') {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD')
        } else {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss') + '\''
      if (columnName === 'FLIGHT_DATE') {
        tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).add(1, 'days').format('YYYY-MM-DD') + '\''
      }

      this.accordDayStartDate = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') : this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurAccordDayEndDate (event) { // 结束日期失去焦点校验
      console.log('blurAccordDayEndDate', event)
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

      if (!this.$util.isDefine(this.accordDayStartDate)) { // 直接设置结束日期没有设置开始日期
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (!this.$util.isDefine(this.accordDayEndDate)) { // 点击开始日期但是没有选择值
        this.alertTitle = '请选择结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() && columnName !== 'FLIGHT_DATE') {
        this.alertTitle = '开始日期不能等于结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
        this.alertTitle = '结束日期不能早于开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
    },
    changeAccordDayEndDate (value) { // 筛选配置→属性六→按天→结束日期
      let tempStr = ''
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']

      if (columnName === 'FLIGHT_DATE') {
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      } else {
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime() || new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          return false
        }
      }

      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        if (columnName === 'FLIGHT_DATE') {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD')
        } else {
          tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss') + '\''
      if (columnName === 'FLIGHT_DATE') {
        tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).add(1, 'days').format('YYYY-MM-DD') + '\''
      }
      this.accordDayEndDate = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = columnName === 'FLIGHT_DATE' ? this.$moment(this.accordDayEndDate).format('YYYY-MM-DD') : this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeDataPointType () {
      this.isSubmit = true

      let years = this.dataPointY
      let months = this.dataPointM
      let dailys = this.dataPointD
      let hours = this.dataPointH
      let quarters = this.dataPointQ
      let weeks = this.dataPointW

      let dataPoinObj = {
        year: this.$util.isNotEmptyObject(years) ? years : [],
        month: this.$util.isNotEmptyObject(months) ? months : [],
        day: this.$util.isNotEmptyObject(dailys) ? dailys : [],
        hour: this.$util.isNotEmptyObject(hours) ? hours : [],
        quarter: this.$util.isNotEmptyObject(quarters) ? quarters : [],
        dayofweek: this.$util.isNotEmptyObject(weeks) ? weeks : []
      }

      let tempStr = []
      if (this.$util.isNotEmptyObject(years)) {
        tempStr.push('年：' + years.join(', '))
      }
      if (this.$util.isNotEmptyObject(months)) {
        tempStr.push('月：' + months.join(', '))
      }
      if (this.$util.isNotEmptyObject(dailys)) {
        tempStr.push('日：' + dailys.join(', '))
      }
      if (this.$util.isNotEmptyObject(hours)) {
        tempStr.push('时：' + hours.join(', '))
      }
      if (this.$util.isNotEmptyObject(quarters)) {
        tempStr.push('季度：' + quarters.join(', '))
      }
      if (this.$util.isNotEmptyObject(weeks)) {
        let wStr = []
        weeks.forEach((item, index) => {
          wStr.push(this.dataPointWObj[item])
        })
        tempStr.push('星期：' + wStr.join(', '))
      }

      let tt = JSON.stringify(dataPoinObj)

      console.log(JSON.stringify(dataPoinObj), ' ', tempStr.join('； '))
      console.log(tt.substring(1, tt.length - 1))

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = tempStr.join('； ')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = ''
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tt.substring(1, tt.length - 1)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr.join('； ')
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr.join('； '), true)
    },
    changeNotHotWordsSearchValue (value) { // 筛选配置→属性七→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.notHotWordsSearchValueFlag === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.notHotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueJD (value) {
      let _names = []
      let _vals = []
      value.forEach((item, index) => {
        _names.push(item.COLUMNNAME.trim())
        _vals.push(item.VALUE)
      })

      let tempStr = _names.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.notHotWordsSearchValueFlag === '1' ? '' : 'not '

      let sqls = []
      _vals.forEach((item, index) => {
        sqls.push('vw.FLIGHT_UNIT_CODE ' + isNotFlag + 'like \'' + item + '%\'')
      })
      tempSqlStr = '(' + sqls.join(' or ') + ')'

      if (this.notHotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValueFlag (value) { // 筛选配置→属性七→下拉框 是否包含筛选条件开关
      let tData = this.notHotWordsSearchValue
      let tempStr = tData.join(',')
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + tData.join("','") + "')"

      if (this.currentFilterConfigRowAttrName === 'FLIGHT_UNIT_NAME') {
        let _names = []
        let _vals = []
        this.notHotWordsSearchValue.forEach((item, index) => {
          _names.push(item.COLUMNNAME.trim())
          _vals.push(item.VALUE)
        })
        let sqls = []
        _vals.forEach((item, index) => {
          sqls.push('vw.FLIGHT_UNIT_CODE ' + isNotFlag + 'like \'' + item + '%\'')
        })
        tempSqlStr = '(' + sqls.join(' or ') + ')'
        tempStr = _names.join(',')
      }

      if (value !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValue (value) { // 筛选配置→属性八→下拉框
      let tempStr = value.join(',')
      let tempSqlStr = ''
      let isNotFlag = this.hotWordsSearchValueFlag === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + value.join("','") + "')"
      if (this.hotWordsSearchValueFlag !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeHotWordsSearchValueFlag (value) { // 筛选配置→属性八→下拉框 是否包含筛选条件开关
      let tData = this.hotWordsSearchValue
      let tempStr = tData.join(',')
      let tempSqlStr = ''
      let isNotFlag = value === '1' ? '' : 'not '

      tempSqlStr = isNotFlag + "in ('" + tData.join("','") + "')"
      if (value !== '1') {
        tempStr = '(不包含)' + tempStr
      }

      if (tempStr === '(不包含)') {
        tempSqlStr = ''
        tempStr = ''
      }

      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = tempStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    initNewFileParams (params) { // 初始化新建分析的参数
      console.log('initNewFileParams:', JSON.stringify(params))
      console.log(params)
      this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', null, null) // 修改头部显示效果,显示数据源头部
      this.filterConfigTableData = []
      this.filterConfigTableDataObj = {}
      if (this.$util.isNotEmptyObject(params)) {
        let axisOneName = params.axisOneName ? params.axisOneName : ''
        let axisOne = params.axisOne ? params.axisOne : ''
        let axisOneTableIndex = params.axisOneTableIndex ? params.axisOneTableIndex : ''
        let axisOneValue = params.axisOneValue ? params.axisOneValue : ''
        let axisOneTreeId = params.axisOneTreeId ? params.axisOneTreeId : ''
        let axisOneDataSourceName = params.axisOneDataSourceName ? params.axisOneDataSourceName : ''
        let axisOneTreeType = params.axisOneTreeType ? params.axisOneTreeType : ''
        let axisOneColumnType = params.axisOneColumnType ? params.axisOneColumnType : ''
        let axisOneFormat = params.oneFormat ? params.oneFormat : ''
        let axisOneFormatData = params.oneFormatData ? params.oneFormatData : ''
        let axisTwoName = params.axisTwoName ? params.axisTwoName : ''
        let axisTwo = params.axisTwo ? params.axisTwo : ''
        let axisTwoTableIndex = params.axisTwoTableIndex ? params.axisTwoTableIndex : ''
        let axisTwoValue = params.axisTwoValue ? params.axisTwoValue : ''
        let axisTwoTreeId = params.axisTwoTreeId ? params.axisTwoTreeId : ''
        let axisTwoDataSourceName = params.axisTwoDataSourceName ? params.axisTwoDataSourceName : ''
        let axisTwoTreeType = params.axisTwoTreeType ? params.axisTwoTreeType : ''
        let axisTwoColumnType = params.axisTwoColumnType ? params.axisTwoColumnType : ''
        let axisTwoFormat = params.twoFormat ? params.twoFormat : ''
        let axisTwoFormatData = params.twoFormatData ? params.twoFormatData : ''
        let axisThreeName = params.axisThreeName ? params.axisThreeName : ''
        let axisThree = params.axisThree ? params.axisThree : ''
        let axisThreeTableIndex = params.axisThreeTableIndex ? params.axisThreeTableIndex : ''
        let axisThreeValue = params.axisThreeValue ? params.axisThreeValue : ''
        let axisThreeTreeId = params.axisThreeTreeId ? params.axisThreeTreeId : ''
        let axisThreeDataSourceName = params.axisThreeDataSourceName ? params.axisThreeDataSourceName : ''
        let axisThreeTreeType = params.axisThreeTreeType ? params.axisThreeTreeType : ''
        let axisThreeColumnType = params.axisThreeColumnType ? params.axisThreeColumnType : ''
        let axisThreeFormat = params.threeFormat ? params.threeFormat : ''
        let axisThreeFormatData = params.threeFormatData ? params.threeFormatData : ''
        let filter = params.filter ? params.filter : []
        let fileNewName = params.fileNewName
        let intervalNum = params.intervalNum ? params.intervalNum : '10'
        let twoAggregation = params.twoAggregation ? params.twoAggregation : ''
        let isSort = params.isSort
        let sortNum = params.sortNum
        let sortType = params.sortType
        // let isGuide = params.isGuide
        let tableConfigData = params.tableConfig ? params.tableConfig : []
        let chartName = params.chartName ? params.chartName : ''
        let exportGroupObj = params.exportGroupObj ? params.exportGroupObj : ''
        let dhbParamObj = params.dhbParamObj ? params.dhbParamObj : {}
        if (exportGroupObj !== '') {
          this.classConfigAxisFourText = exportGroupObj.exportGroup.name
          this.classConfigAxisFourObj = exportGroupObj.exportGroup
          this.classConfigAxisFiveText = exportGroupObj.exportObj.name
          this.classConfigAxisFiveObj = exportGroupObj.exportObj
          if (exportGroupObj.exportGroup.type === '3') {
            this.isDecimal = true
            this.isDate = false
            this.form.exportGroupNum = exportGroupObj.exportGroupFormat
          } else if (exportGroupObj.exportGroup.type === '6') {
            this.isDecimal = false
            this.isDate = true
            this.form.exportGroupFormat = exportGroupObj.exportGroupFormat
          }
          this.form.exportSort = exportGroupObj.exportSort
          this.form.exportGroupCount = exportGroupObj.exportCount
          this.form.checkedTimeZone = exportGroupObj.timeZone
        }
        if (this.$util.isDefine(dhbParamObj) && this.$util.isNotEmptyObject(dhbParamObj)) {
          this.enginParamValue = dhbParamObj.gpID
          this.timePointValue = dhbParamObj.timePointID
          this.timeBeforeSecond = Math.abs(parseInt(dhbParamObj.offsetStart))
          this.timeAfterSecond = Math.abs(parseInt(dhbParamObj.offsetEnd))
          this.frames = dhbParamObj.frequency
          this.enginParamText = dhbParamObj.enginParamText
          this.timePointText = dhbParamObj.timePointText
          this.showAvgLine = dhbParamObj.avg
          this.showTantile25 = dhbParamObj.tantile25
          this.showTantile50 = dhbParamObj.tantile50
          this.showTantile75 = dhbParamObj.tantile75
        }

        if (this.$util.isDefine(axisOne) && this.$util.isDefine(axisOneName) && this.$util.isDefine(axisOneTreeId)) {
          this.selectCurrentAxis('one')
          this.visualConfigAxisOneText = axisOneName
          this.visualConfigAxisOneSql = axisOne
          this.visualConfigAxisOneTableIndex = axisOneTableIndex
          this.visualConfigAxisOneSqlValue = axisOneValue
          this.visualConfigAxisOneValue = axisOneTreeId
          this.visualConfigAxisOneDataSourceName = axisOneDataSourceName
          this.visualConfigAxisOneTreeType = axisOneTreeType
          this.visualConfigAxisOneColumnType = axisOneColumnType
          this.visualConfigAxisOneFormat = axisOneFormat

          if (axisOne === 'FLIGHT_DATE') {
            this.axisDateArr = this.axisDateArrDate
            // this.visualConfigAxisOneFormatData = 'YYYY/MM/dd'
            this.visualConfigAxisOneFormatData = axisOneFormatData
          } else {
            this.axisDateArr = this.axisDateArrDateTime
            this.visualConfigAxisOneFormatData = axisOneFormatData
          }
        } else {
          this.visualConfigAxisOneText = '在左侧数据库中选择参数'
          this.visualConfigAxisOneSql = ''
          this.visualConfigAxisOneTableIndex = ''
          this.visualConfigAxisOneSqlValue = ''
          this.visualConfigAxisOneValue = ''
          this.visualConfigAxisOneDataSourceName = ''
          this.visualConfigAxisOneTreeType = ''
          this.visualConfigAxisOneColumnType = ''
          this.visualConfigAxisOneFormat = ''
          this.visualConfigAxisOneFormatData = ''
        }
        if (this.$util.isDefine(axisTwo) && this.$util.isDefine(axisTwoName) && this.$util.isDefine(axisTwoTreeId)) {
          this.selectCurrentAxis('two')
          this.visualConfigAxisTwoText = axisTwoName
          this.visualConfigAxisTwoSql = axisTwo
          this.visualConfigAxisTwoTableIndex = axisTwoTableIndex
          this.visualConfigAxisTwoSqlValue = axisTwoValue
          this.visualConfigAxisTwoValue = axisTwoTreeId
          this.visualConfigAxisTwoDataSourceName = axisTwoDataSourceName
          this.visualConfigAxisTwoTreeType = axisTwoTreeType
          this.visualConfigAxisTwoColumnType = axisTwoColumnType
          this.visualConfigAxisTwoFormat = axisTwoFormat

          if (axisTwo === 'FLIGHT_DATE') {
            this.axisDateArr = this.axisDateArrDate
            // this.visualConfigAxisTwoFormatData = 'YYYY/MM/dd'
            this.visualConfigAxisTwoFormatData = axisTwoFormatData
          } else {
            this.axisDateArr = this.axisDateArrDateTime
            this.visualConfigAxisTwoFormatData = axisTwoFormatData
          }
        } else {
          this.visualConfigAxisTwoText = '在左侧数据库中选择参数'
          this.visualConfigAxisTwoSql = ''
          this.visualConfigAxisTwoTableIndex = ''
          this.visualConfigAxisTwoSqlValue = ''
          this.visualConfigAxisTwoValue = ''
          this.visualConfigAxisTwoDataSourceName = ''
          this.visualConfigAxisTwoTreeType = ''
          this.visualConfigAxisTwoColumnType = ''
          this.visualConfigAxisTwoFormat = ''
          this.visualConfigAxisTwoFormatData = ''
        }
        if ((this.$util.isDefine(axisThree) && this.$util.isDefine(axisThreeName) && this.$util.isDefine(axisThreeTreeId)) || (this.$util.isDefine(axisThree) && axisThree === '1')) {
          this.selectCurrentAxis('three')
          this.visualConfigAxisThreeText = axisThreeName
          this.visualConfigAxisThreeSql = axisThree
          this.visualConfigAxisThreeTableIndex = axisThreeTableIndex
          this.visualConfigAxisThreeSqlValue = axisThreeValue
          this.visualConfigAxisThreeValue = axisThreeTreeId
          this.visualConfigAxisThreeDataSourceName = axisThreeDataSourceName
          this.visualConfigAxisThreeTreeType = axisThreeTreeType
          this.visualConfigAxisThreeColumnType = axisThreeColumnType
          this.visualConfigAxisThreeFormat = axisThreeFormat
          this.visualConfigAxisThreeFormatData = axisThreeFormatData
          this.isShowVisualConfigThreeAxis = true
        } else {
          this.visualConfigAxisThreeText = '在左侧数据库中选择参数'
          this.visualConfigAxisThreeSql = ''
          this.visualConfigAxisThreeTableIndex = ''
          this.visualConfigAxisThreeSqlValue = ''
          this.visualConfigAxisThreeValue = ''
          this.visualConfigAxisThreeDataSourceName = ''
          this.visualConfigAxisThreeTreeType = ''
          this.visualConfigAxisThreeColumnType = ''
          this.visualConfigAxisThreeFormat = ''
          this.visualConfigAxisThreeFormatData = ''
          this.isShowVisualConfigThreeAxis = false
        }

        if (this.$util.isDefine(fileNewName)) {
          this.fileNewName = fileNewName
        }

        if (this.$util.isDefine(intervalNum)) {
          this.intervalNum = intervalNum
        }

        if (this.$util.isDefine(twoAggregation) && twoAggregation !== 'count') {
          this.twoAggregation = twoAggregation
        }

        if (this.$util.isDefine(isSort)) {
          this.sortChecked = isSort
        }
        if (this.$util.isDefine(sortNum)) {
          this.sortNum = sortNum
        }
        if (this.$util.isDefine(sortType)) {
          this.sortType = sortType
        }

        // isGuide === '1' &&
        if (filter.length < 1 && params.filterList && params.filterList.length > 0) {
          filter = params.filterList[0]
        }

        if (filter.length > 0) {
          let tempTableDataArr = []
          let tempTableDataObj = {}
          for (let i = 0; i < filter.length; i++) {
            let tempObj = this.setConfigAttrValue(filter[i])
            tempTableDataArr.push(tempObj)
            tempTableDataObj[tempObj.id] = tempObj
          }
          this.filterConfigTableData = tempTableDataArr
          this.filterConfigTableDataObj = tempTableDataObj
        }

        if (this.$util.isDefine(chartName)) {
          this.visualConfigChartsName = chartName
        }

        if (tableConfigData.length > 0) { // 表格配置初始化
          let tempTableConfigDataObj = {}
          console.log(tableConfigData)
          for (let t = 0; t < tableConfigData.length; t++) {
            if (this.$util.isDefine(tableConfigData[t]['id'])) {
              tempTableConfigDataObj[tableConfigData[t]['id']] = tableConfigData[t]
            }
          }
          this.tableConfigData = tableConfigData
          this.tableConfigDataObj = tempTableConfigDataObj
          this.currentTableConfigRowObj = {}
        }
      }
      if (this.$util.isDefine(this.viewPowerDataObj.name) && this.$util.isDefine(this.viewPowerDataObj.filter)) {
        this.filterConfigTableData.unshift(this.viewPowerDataObj)
      }
    },
    setConfigAttrValue (obj) { // 设置配置的属性值
      let operatordId = obj.operatordId
      let filterStr = ''
      this.currentFilterConfigRowId = obj.paramId
      if (operatordId === '1' || operatordId === '2' || operatordId === '3' || operatordId === '6') {
        filterStr = this.standardSelectArray[parseInt(operatordId) - 1] + obj.paramValueOne
        this.setAttrOneRadio(obj)
      } else if (operatordId === '5') {
        filterStr = obj.filterName
        if (filterStr === '已发生') {
          this.eventHappenValueFlag = '1'
        } else {
          this.eventHappenValueFlag = '0'
        }
      } else if (operatordId === '51') {
        filterStr = obj.filterName
      } else if (operatordId === '52') {
        filterStr = obj.filterName
      } else if (operatordId === '4') {
        filterStr = obj.filterName
        // this.setAttrOneRadio(obj)
      } else if (operatordId === '7') {
        filterStr = obj.paramValueOne + ' <= x <= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '8') {
        filterStr = obj.paramValueOne + ' <= x < ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '781') {
        filterStr = obj.paramValueOne + ' < x <= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '782') {
        filterStr = obj.paramValueOne + ' < x < ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9') {
        filterStr = 'x <= ' + obj.paramValueOne + ' 或 ' + ' x >= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '10') {
        filterStr = 'x < ' + obj.paramValueOne + ' 或 ' + ' x > ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9101') {
        filterStr = 'x < ' + obj.paramValueOne + ' 或 ' + ' x >= ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9102') {
        filterStr = 'x <= ' + obj.paramValueOne + ' 或 ' + ' x > ' + obj.paramValueTwo
        this.setAttrOneRadio(obj)
      } else if (operatordId === '9999') {
        filterStr = '非空'
        this.setAttrOneRadio(obj)
      } else if (operatordId === '11') { // 文本值
        filterStr = obj.paramValueOne
      } else if (operatordId === '12') { // 非热词搜索
        filterStr = obj.selectValueOne
      } else if (operatordId === '13') { // 热词搜索
        filterStr = obj.selectValueOne
      } else if (operatordId === '37') {
        this.attrSixRadio = obj.attrRadioFlag
        this.accordDayStartDate = obj.paramValueOne
        this.accordDayEndDate = obj.paramValueTwo
        if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
          filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD HH:mm:ss')
          if (obj.columnName === 'FLIGHT_DATE') {
            filterStr = this.$moment(obj.paramValueOne).format('YYYY-MM-DD') + '~' + this.$moment(obj.paramValueTwo).format('YYYY-MM-DD')
          }
        }
      } else if (operatordId === '38') {
        this.attrSixRadio = obj.attrRadioFlag

        filterStr = obj.paramValueOne
      }

      const tempObj = {
        id: obj.paramId,
        name: obj.paramName,
        type: obj.paramType,
        filter: filterStr,
        filterConditions: obj,
        resultColumnIndex: obj.resultColumnIndex,
        resultTableIndex: obj.resultTableIndex,
        columnName: obj.columnName,
        dataSourceName: obj.dataSourceNameValue
      }
      return tempObj
    },
    setAttrOneRadio (obj) { // 设置筛选配置中数值类型的值
      this.attrOneRadio = obj.attrRadioFlag
      this.standardSelectValue = obj.selectValueOne
      this.standardMinValue = obj.paramValueOne
      if (parseInt(obj.selectValueOne) > 6) {
        this.standardMaxValue = obj.paramValueTwo
      }
    },
    assemblyNewFileParams (type) { // 组装提交新建需要的参数
      const paramStr = {
        axisOne: '',
        axisOneValue: '',
        axisOneName: '',
        axisOneTreeId: '',
        axisOneTableIndex: '',
        axisOneDataSourceName: '',
        axisOneTreeType: '',
        axisOneColumnType: '',
        axisTwo: '',
        axisTwoValue: '',
        axisTwoName: '',
        axisTwoTreeId: '',
        axisTwoTableIndex: '',
        axisTwoDataSourceName: '',
        axisTwoTreeType: '',
        axisTwoColumnType: '',
        axisThree: '',
        axisThreeValue: '',
        axisThreeName: '',
        axisThreeTreeId: '',
        axisThreeTableIndex: '',
        axisThreeDataSourceName: '',
        axisThreeTreeType: '',
        axisThreeColumnType: '',
        notNull: '', // 筛选配置+轴
        tableIndex: '', // 筛选条件+轴
        fileNewName: '',
        pageNo: '', // 航班编号的页码
        pageUUID: '',
        filter: [],
        chartName: '',
        intervalNum: '10',
        oneFormat: '',
        oneFormatData: '',
        twoFormat: '',
        twoFormatData: '',
        threeFormat: '',
        threeFormatData: '',
        dataSourceName: '', // 筛选配置+轴
        twoAggregation: '',
        isSort: '',
        sortNum: '',
        sortType: '',
        tableDataIndex: '', // 筛选条件+表格配置
        tableDataSoucreName: '', // 筛选条件+表格配置
        tableColumnName: '',
        tableColumnZhName: '',
        tableConfig: [],
        tablePageSize: 0, // 分析结果中表格详情的当前页码
        tablePageNum: 100, // 分析结果中表格详情的每页显示数量
        xAsixDataList: '', // 添加辅助线专用，x轴数据集合
        isGuide: '', // 是否时添加辅助线调用的标识，1：表示是添加辅助线调用的，其他传空值
        event_profile: this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? this.$store.state.eventStoreData : {},
        dhbParamObj: {} // 多航班参数对比数据对象
      }

      let notNullArr = []
      let tableIndexArr = []
      let dataSourceNameArr = []
      let tempTableDataIndex = [] // 筛选条件+表格配置
      let tempTableDataSoucreName = [] // 筛选条件+表格配置

      if (this.visualConfigAxisOneValue === '' &&
        this.visualConfigAxisTwoValue === '' &&
        this.visualConfigAxisThreeValue === '' &&
        !this.$util.isNotEmptyObject(this.tableConfigDataObj) &&
        this.filterConfigTableData.length === 0 &&
        !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      if (this.filterConfigTableData.length === 0 && !this.$util.isNotEmptyObject(this.tableConfigDataObj) && !type) { // 如果存在表格配置数据则不需要验证
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }
      if (this.filterConfigTableData.length === 1 && (this.filterConfigTableData[0].type === 9999 || this.filterConfigTableData[0].type === '9999') && !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      if (!(this.visualConfigAxisOneValue === '' && this.visualConfigAxisTwoValue === '' && this.visualConfigAxisThreeValue === '') &&
        this.$util.isNotEmptyObject(this.tableConfigDataObj) &&
        this.filterConfigTableData.length === 0 &&
        !type) {
        this.$message({
          message: '请选择筛选配置',
          type: 'warning'
        })
        return false
      }

      if (this.contentType === 'analysis_dhbcsdb') {
        paramStr.dhbParamObj = {}

        // 处理多航班参数对比可视化数据
        if (!type && !this.$util.isDefine(this.timePointValue)) {
          this.$message({
            type: 'warning',
            message: '请选择时间点参数！'
          })
          return false
        }
        if (!type && !this.$util.isDefine(this.timeBeforeSecond)) {
          this.$message({
            type: 'warning',
            message: '请输入时间点偏移量！'
          })
          return false
        }
        if (!type && !this.$util.isDefine(this.timeAfterSecond)) {
          this.$message({
            type: 'warning',
            message: '请输入时间点偏移量！'
          })
          return false
        }

        if (!type && !(/(^[1-9]\d*$)/.test(this.timeBeforeSecond))) {
          this.$message({
            type: 'warning',
            message: '时间点偏移量应为正整数！'
          })
          return false
        }
        if (!type && !(/(^[1-9]\d*$)/.test(this.timeAfterSecond))) {
          this.$message({
            type: 'warning',
            message: '时间点偏移量应为正整数！'
          })
          return false
        }

        if (!type && !this.$util.isDefine(this.enginParamValue)) {
          this.$message({
            type: 'warning',
            message: '请选择工程参数！'
          })
          return false
        }
        if (!type) {
          if (this.frames === 1) {
            if ((this.timeBeforeSecond + this.timeAfterSecond) > 400) {
              this.$message({
                type: 'warning',
                message: '请确认时间点偏移总数不超过400！'
              })
              return false
            }
          } else if (this.frames === 2) {
            if ((this.timeBeforeSecond + this.timeAfterSecond) * 2 > 400) {
              this.$message({
                type: 'warning',
                message: '请确认时间点偏移总数不超过400！'
              })
              return false
            }
          } else if (this.frames === 4) {
            if ((this.timeBeforeSecond + this.timeAfterSecond) * 4 > 400) {
              this.$message({
                type: 'warning',
                message: '请确认时间点偏移总数不超过400！'
              })
              return false
            }
          } else if (this.frames === 8) {
            if ((this.timeBeforeSecond + this.timeAfterSecond) * 8 > 400) {
              this.$message({
                type: 'warning',
                message: '请确认时间点偏移总数不超过400！'
              })
              return false
            }
          }
        }

        paramStr.dhbParamObj = {
          gpID: this.enginParamValue,
          timePointID: this.timePointValue,
          offsetStart: '-' + this.timeBeforeSecond,
          offsetEnd: this.timeAfterSecond,
          frequency: this.frames,
          enginParamText: this.enginParamText,
          timePointText: this.timePointText,
          avg: this.showAvgLine,
          tantile25: this.showTantile25,
          tantile50: this.showTantile50,
          tantile75: this.showTantile75
        }
      } else {
        paramStr.axisOneName = this.visualConfigAxisOneText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisOneText
        paramStr.axisOne = this.visualConfigAxisOneSql
        paramStr.axisOneValue = this.visualConfigAxisOneSqlValue
        paramStr.axisOneTableIndex = this.visualConfigAxisOneTableIndex
        paramStr.axisOneTreeId = this.visualConfigAxisOneValue
        paramStr.axisOneDataSourceName = this.visualConfigAxisOneDataSourceName
        paramStr.axisOneTreeType = this.visualConfigAxisOneTreeType
        paramStr.axisOneColumnType = this.visualConfigAxisOneColumnType
        paramStr.axisTwoName = this.visualConfigAxisTwoText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisTwoText
        paramStr.axisTwo = this.visualConfigAxisTwoSql
        paramStr.axisTwoTableIndex = this.visualConfigAxisTwoTableIndex
        paramStr.axisTwoValue = this.visualConfigAxisTwoSqlValue
        paramStr.axisTwoTreeId = this.visualConfigAxisTwoValue
        paramStr.axisTwoDataSourceName = this.visualConfigAxisTwoDataSourceName
        paramStr.axisTwoTreeType = this.visualConfigAxisTwoTreeType
        paramStr.axisTwoColumnType = this.visualConfigAxisTwoColumnType
        paramStr.axisThreeName = this.visualConfigAxisThreeText === '在左侧数据库中选择参数' ? '' : this.visualConfigAxisThreeText
        paramStr.axisThree = this.visualConfigAxisThreeSql
        paramStr.axisThreeTableIndex = this.visualConfigAxisThreeTableIndex
        paramStr.axisThreeValue = this.visualConfigAxisThreeSqlValue
        paramStr.axisThreeTreeId = this.visualConfigAxisThreeValue
        paramStr.axisThreeDataSourceName = this.visualConfigAxisThreeDataSourceName
        paramStr.axisThreeTreeType = this.visualConfigAxisThreeTreeType
        paramStr.axisThreeColumnType = this.visualConfigAxisThreeColumnType
        paramStr.chartName = this.visualConfigChartsName
        paramStr.intervalNum = this.intervalNum
        paramStr.twoAggregation = this.twoAggregation ? this.twoAggregation : 'count'
        paramStr.isSort = this.sortChecked
        paramStr.sortNum = this.sortNum
        paramStr.sortType = this.sortType
        paramStr.oneFormat = this.visualConfigAxisOneFormat
        paramStr.oneFormatData = (this.visualConfigAxisOneFormat === 'textFormat' && this.visualConfigAxisOneFormatData === '1') ? 'like \'%' + this.visualConfigAxisOneFormatData + '%\'' : this.visualConfigAxisOneFormatData

        paramStr.twoFormat = this.visualConfigAxisTwoFormat
        if (this.isShowVisualConfigThreeAxis) {
          paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : this.visualConfigAxisTwoFormatData
        } else {
          if (this.twoAggregation) {
            paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : this.visualConfigAxisTwoFormatData
          } else {
            paramStr.twoFormatData = (this.visualConfigAxisTwoFormat === 'textFormat' && this.visualConfigAxisTwoFormatData === '1') ? 'like \'%' + this.visualConfigAxisTwoFormatData + '%\'' : ''
          }
        }

        paramStr.threeFormat = this.visualConfigAxisThreeFormat
        if (this.isShowVisualConfigThreeAxis) {
          if (this.twoAggregation) {
            paramStr.threeFormatData = (this.visualConfigAxisThreeFormat === 'textFormat' && this.visualConfigAxisThreeFormatData === '1') ? 'like \'%' + this.visualConfigAxisThreeFormatData + '%\'' : this.visualConfigAxisThreeFormatData
          } else {
            paramStr.threeFormatData = (this.visualConfigAxisThreeFormat === 'textFormat' && this.visualConfigAxisThreeFormatData === '1') ? 'like \'%' + this.visualConfigAxisThreeFormatData + '%\'' : ''
          }
        } else {
          paramStr.threeFormat = ''
          paramStr.threeFormatData = ''
        }

        // 轴1和轴2类型为数值，可以相同
        if (!type && this.visualConfigAxisOneFormat !== '' && this.visualConfigAxisTwoFormat !== '' && this.visualConfigAxisOneFormat === this.visualConfigAxisTwoFormat && this.visualConfigAxisOneFormat !== 'decimalFormat' && this.visualConfigAxisTwoFormat !== 'decimalFormat') {
          let tempMsg = this.visualConfigAxisOneTextName + '的轴类型和' + this.visualConfigAxisTwoTextName + '的轴类型相同，请重新选择'
          this.$message({
            message: tempMsg,
            type: 'warning'
          })
          return false
        }
        if (!type && this.visualConfigAxisTwoValue !== '' && this.visualConfigAxisTwoTextName === '测量' && this.visualConfigAxisTwoFormat !== 'decimalFormat') {
          this.$message({
            message: '测量轴的值必须是测量值，请重新选择！',
            type: 'warning'
          })
          return false
        }
        if (this.isShowVisualConfigThreeAxis && this.visualConfigAxisThreeValue === '') {
          paramStr.axisThree = '1' // 第三轴显示则值为空，提交时此参数设置为1
        }
        if (!type && this.visualConfigAxisThreeValue !== '' && this.visualConfigAxisThreeTextName === '测量' && this.visualConfigAxisThreeFormat !== 'decimalFormat') {
          this.$message({
            message: '测量轴的值必须是测量值，请重新选择！',
            type: 'warning'
          })
          return false
        }

        if (this.$util.isDefine(this.visualConfigAxisOneSql) && this.$util.isDefine(this.visualConfigAxisOneSqlValue)) {
          if (this.visualConfigAxisOneDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisOneDataSourceName)) {
            notNullArr.push(this.visualConfigAxisOneDataSourceName + '.' + this.visualConfigAxisOneSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisOneSqlValue)
          }
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoSql) && this.$util.isDefine(this.visualConfigAxisTwoSqlValue)) {
          if (this.visualConfigAxisTwoDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisTwoDataSourceName)) {
            notNullArr.push(this.visualConfigAxisTwoDataSourceName + '.' + this.visualConfigAxisTwoSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisTwoSqlValue)
          }
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeSql) && this.$util.isDefine(this.visualConfigAxisThreeSqlValue)) {
          if (this.visualConfigAxisThreeDataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(this.visualConfigAxisThreeDataSourceName)) {
            notNullArr.push(this.visualConfigAxisThreeDataSourceName + '.' + this.visualConfigAxisThreeSqlValue)
          } else {
            notNullArr.push(this.visualConfigAxisThreeSqlValue)
          }
        }

        if (this.$util.isDefine(this.visualConfigAxisOneTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisOneTableIndex)
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisTwoTableIndex)
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeTableIndex)) {
          tableIndexArr.push(this.visualConfigAxisThreeTableIndex)
        }

        if (this.$util.isDefine(this.visualConfigAxisOneDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisOneDataSourceName)
        }
        if (this.$util.isDefine(this.visualConfigAxisTwoDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisTwoDataSourceName)
        }
        if (this.$util.isDefine(this.visualConfigAxisThreeDataSourceName)) {
          dataSourceNameArr.push(this.visualConfigAxisThreeDataSourceName)
        }
      }

      this.filterConfigTableData.forEach((item, index) => { // 处理筛选配置参数
        if (item.type === 9999 || item.type === '9999') {
          return true
        }
        // item.type !== '4' &&
        if (this.$util.isNotEmptyObject(item.filterConditions)) {
          paramStr.filter.push(item.filterConditions)

          if (this.$util.isDefine(item.dataSourceName)) {
            dataSourceNameArr.push(item.dataSourceName)
            tempTableDataSoucreName.push(item.dataSourceName)
          }

          if (this.$util.isDefine(item.resultColumnIndex) && this.$util.isDefine(item.resultTableIndex)) { // 分析参数
            notNullArr.push('g' + item.resultColumnIndex)
            tableIndexArr.push(item.resultTableIndex)
            tempTableDataIndex.push(item.resultTableIndex)
          }

          if (this.$util.isDefine(item.columnName)) {
            // 如果节点的dataSourceName的值不为'hive_vw_snapshot_flight_info_parquet'，notNull的参数就是dataSourceName.columnName
            if (item.dataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(item.dataSourceName)) {
              notNullArr.push(item.dataSourceName + '.' + item.columnName)
            } else {
              notNullArr.push(item.columnName)
            }
          }

          if (!this.$util.isDefine(item.filter) && !type) {
            this.isSubmit = false // 只要参数条件有一个为空，则不能提交
            this.filterNames.push(item.name)
          }
        } else {
          if ((!this.$util.isDefine(item.filter) || !this.$util.isNotEmptyObject(item.filterConditions)) && !type) {
            this.isSubmit = false // 只要参数条件有一个为空，则不能提交
            this.filterNames.push(item.name)
          }
        }
      })
      console.log(this.tableConfigDataObj)
      if (this.$util.isNotEmptyObject(this.tableConfigDataObj)) { // 处理表格详情数据
        let tempTableColumnName = []
        let tempTableColumnZhName = []
        let tempTableConfig = []
        let tempTableConfigDataObj = this.tableConfigDataObj
        for (let i in tempTableConfigDataObj) {
          let item = tempTableConfigDataObj[i]
          if (item.resultTableIndex !== '') {
            tempTableDataIndex.push(item.resultTableIndex)
          }
          if (item.dataSourceName !== '') {
            tempTableDataSoucreName.push(item.dataSourceName)
          }
          if (item.columnName !== '' && item.resultColumnIndex === '') {
            tempTableColumnName.push(item.columnName)
          }
          if (item.resultColumnIndex !== '' && item.columnName === '') {
            tempTableColumnName.push('g' + item.resultColumnIndex)
          }
          if (item.name !== '') {
            tempTableColumnZhName.push(item.name)
          }
          console.log(item)
          tempTableConfig.push(item) // 临时存放有数据的行
        }

        paramStr.tableColumnName = tempTableColumnName.join(',')
        paramStr.tableColumnZhName = tempTableColumnZhName.join(',')
        console.log(tempTableConfig)
        paramStr.tableConfig = tempTableConfig
      }

      paramStr.notNull = this.$util.distinctArray(notNullArr).join(',')
      paramStr.tableIndex = this.$util.distinctArray(tableIndexArr).join(',')
      paramStr.dataSourceName = this.$util.distinctArray(dataSourceNameArr).join(',')

      paramStr.tableDataIndex = this.$util.distinctArray(tempTableDataIndex).join(',')
      paramStr.tableDataSoucreName = this.$util.distinctArray(tempTableDataSoucreName).join(',')

      paramStr.fileNewName = this.fileNewName

      let tempAnalysisParams = this.$store.state.analysisParams
      if (this.$util.isNotEmptyObject(tempAnalysisParams)) {
        if (this.$util.isDefine(tempAnalysisParams.ANALYSISCATEGORYID)) { // 初始化分析管理传来的分析参数数据
          let temParamStr = JSON.parse(JSON.stringify(tempAnalysisParams)).CONTENT

          if (temParamStr.isGuide === '1') {
            let filterList = temParamStr.filterList
            filterList.shift()
            filterList.unshift(paramStr.filter)

            paramStr.isGuide = '1'
            paramStr['filterList'] = filterList
            paramStr['sublineNameColor'] = temParamStr.sublineNameColor
            // paramStr.filter = []
          }
        }
      }
      console.log('assemblyNewFileParams:', JSON.stringify(paramStr))
      if (this.classConfigAxisFourText !== '' && this.classConfigAxisFourText !== '在左侧数据库中选择参数') {
          // let tempExportGroup = this.getTableConfigObj(this.classConfigAxisFourObj)
          // console.log(tempExportGroup)
          if (this.form.exportGroupNum === '' && this.isDecimal) {
            this.$message.warning('分类配置小数位数不能为空')
            return false
          }
          // else if (this.isDecimal) {
          //   let isFlag = new RegExp('^[1-9][0-9]*$').test(this.form.exportGroupNum)
          //   if (!isFlag) {
          //     this.$message.warning('分类配置小数位数请输入正整数！')
          //     return false
          //   }
          // }
          if (this.form.exportGroupFormat === '' && this.isDate) {
            this.$message.warning('分类配置日期类型不能为空')
            return false
          }
          if (this.classConfigAxisFiveText === '' && this.classConfigAxisFiveText !== '在左侧数据库中选择参数') {
            this.$message.warning('分类配置排序选择不能为空')
            return false
          }
          if (this.form.exportSort === '') {
            this.$message.warning('分类配置排序方式不能为空')
            return false
          } else {
            console.log(this.classConfigAxisFourObj)
            console.log(this.classConfigAxisFiveObj)
            console.log(this.classConfigAxisFourObj === this.classConfigAxisFiveObj)
            if (this.classConfigAxisFourObj.id === this.classConfigAxisFiveObj.id) {
              this.$message.warning('分组列和排序列不能相同！')
              return false
            }
          }
          if (this.form.exportGroupCount === '') {
            this.$message.warning('分类配置排序数量不能为空')
            return false
          } else {
            let isFlag = new RegExp('^[1-9][0-9]*$').test(this.form.exportGroupCount)
            if (!isFlag) {
              this.$message.warning('分类配置排序数量请输入正整数！')
              return false
            }
          }
          let tempExportGroupFormat = ''
          if (this.isDecimal) {
            tempExportGroupFormat = this.form.exportGroupNum
          } else if (this.isDate) {
            tempExportGroupFormat = this.form.exportGroupFormat
          }
          let exportGroupObj = {
            exportGroup: this.classConfigAxisFourObj,
            exportGroupFormat: tempExportGroupFormat,
            exportObj: this.classConfigAxisFiveObj,
            exportSort: this.form.exportSort,
            exportCount: this.form.exportGroupCount,
            timeZone: this.form.checkedTimeZone
          }
          paramStr.exportGroupObj = exportGroupObj
         }
      if (type === 'copy') {
        if (this.copySaveName === '') {
          this.$message({
            message: '请输入分析名字！',
            type: 'warning'
          })
          return false
        } else {
          let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
          let reg1 = new RegExp('^((?! {2,}).)+$')

          if (!reg.test(this.copySaveName)) {
            this.$message({
              message: '分析的名字只含有汉字、数字、字母，前后不能有空格！',
              type: 'warning'
            })
            return false
          } else if (!reg1.test(this.copySaveName)) {
            this.$message({
              message: '分析的名字不能有连续的空格！',
              type: 'warning'
            })
            return false
          }
        }
        if (this.csTreeNodeId === '') {
          this.$message({
            message: '请选择分析节点！',
            type: 'warning'
          })
          return false
        }
        paramStr.fileNewName = this.copySaveName
        this.copySaveAnalysisParams(paramStr)
        return false
      }

      if (type) { // 保存
        if (this.fileNewName === '') { // 分析名称校验
          this.$message({
            message: '请输入新建分析名字！',
            type: 'warning'
          })
          return false
        } else {
          // let reg = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$')
          let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
          let reg1 = new RegExp('^((?! {2,}).)+$')
          if (!reg.test(this.fileNewName)) {
            this.$message({
              message: '新建分析的名字只含有汉字、数字、字母，前后不能有空格！',
              type: 'warning'
            })
            return false
          } else if (!reg1.test(this.fileNewName)) {
            this.$message({
              message: '新建分析的名字不能有连续的空格！',
              type: 'warning'
            })
            return false
          }
        }
        this.addAnalysisParams(paramStr) // 添加分析参数数据
      }

      if (this.isSubmit) { // 是否允许提交或者保存
        if (!type) { // 提交
          if (this.contentType === 'analysis_dhbcsdb') {
            // this.submitFlightParam(paramStr)
            this.$bus.$emit('submitNewFileDataHandle', paramStr, 'newFileDhbComponent')
          } else {
            if (this.tabActiveResult[this.fileNewContentActiveName]) {
              this.$store.commit('SUBMIT_NEWFILE_TAB_ACTIVE', this.tabActiveResult[this.fileNewContentActiveName])
            } else {
              this.$store.commit('SUBMIT_NEWFILE_TAB_ACTIVE', 'analysis_view')
            }
            this.$bus.$emit('submitNewFileDataHandle', paramStr, 'newFileComponent') // 调用提交新建方法，此方法在Manager.vue中, 第三个参数表示从哪个功能提交的
          }
        }
      } else {
        if (!type) {
          if (this.filterNames.length > 0) {
            this.$message({
              message: '筛选条件[ ' + this.filterNames[0] + ' ]输入有误！',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '筛选条件输入有误！',
              // message: '请选择一行筛选条件！',
              type: 'warning'
            })
          }
          this.filterNames = []
          return false
        }
      }
    },
    getTableConfigObj (obj) {
      let tableConfig = this.$store.state.analysisResultAllData.submitAnalysisParams
      console.log(tableConfig)
      // let tempObj = {}
      // try {
      //   tableConfig.forEach(element => {
      //     if (element.name === obj.zhName) {
      //       tempObj = element
      //       // retrun false
      //       throw Error('结束循环')
      //     }
      //   })
      // } catch (error) {
      //   console.log(error.msg)
      // }
      // return tempObj

      return tableConfig.find(element => {
        return element.name === obj.zhName
      })
    },
    refreshCopySaveTreeData () {
      if (!this.$util.isDefine(this.copySaveTreeKeyword)) {
        this.getTreeData()
      }
    },
    getTreeData () { // 获取树节点数据
      this.managerTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/analysisRecordCategory/queryAnalysisRecordCategory',
        method: 'get',
        params: {
          likeContent: this.copySaveTreeKeyword
        }
      }).then(response => {
        console.log('QueryAnalysisRecordCategory~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            let tempUrl = ''
            if (resUrl.indexOf('7777') > -1) {
              tempUrl = resUrl
            } else {
              tempUrl = window.location.origin + resUrl
            }
            window.location.href = tempUrl
            return false
          }
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            this.managerTreeData = resultData
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.copyDefaultExpandedKeys.push(expandedKey)
          } else {
            this.copyDefaultExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        // this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    addAnalysisParams (params) { // 保存分析参数
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      // let paramsStr = JSON.stringify(params)
      this.$axios({
        url: '/analysisRecord/addAnalysisRecord',
        method: 'post',
        data: {
          name: this.fileNewName,
          analysisRecordCategoryId: this.$util.isDefine(this.$store.state.tempManagerTreeNodeId) ? this.$store.state.tempManagerTreeNodeId : this.$store.state.managerTreeNodeId,
          content: params,
          event_profile: this.$store.state.eventStoreData,
          id: this.$store.state.analysisParamsId
        },
        headers: {
          //'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('AddAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        if (response.data.status === '0') {
          this.$message({
            type: 'success',
            message: '数据保存成功!'
          })
          this.$bus.$emit('updateAnalysisTabDataFun', this.fileNewName, 'analysis_file_new', 'analysis_file', 'title')
          this.$store.commit('ANALYSIS_PARAMS_ID', response.data.id) // 保存生成的编号，fdv图表显示查询使用
          this.$store.commit('ANALYSIS_PARAMS', {
            ANALYSISCATEGORYID: response.data.id,
            CONTENT: params,
            EVENT_PROFILE: this.$store.state.eventStoreData,
            ID: this.$store.state.analysisParamsId,
            NAME: this.fileNewName
          })

          // this.$store.commit('ANALYSIS_RESULT_ALL_DATA', tempAnalysisResultAllDataObj)

          this.$bus.$emit('reloadGetAnalysisRecord') // 重新查询分析管理页面分析子集数据，更新表格数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    editAnalysisRecord (params) { // 编辑分析子集数据
      this.$store.commit('SHOW_LOADING', '正在提交数据，请稍等！')
      // let paramsStr = JSON.stringify(params)
      this.$axios({
        url: '/analysisRecord/editAnalysisRecord',
        method: 'post',
        data: {
          name: this.fileNewName,
          analysisRecordCategoryId: this.$store.state.analysisParams.ANALYSISCATEGORYID,
          content: params,
          event_profile: this.$store.state.eventStoreData,
          id: this.$store.state.analysisParams.ID
        },
        headers: {
          // 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('EditAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        if (response.data.status === '0') {
          this.$message({
            type: 'success',
            message: '数据保存成功!'
          })
          this.$store.commit('ANALYSIS_PARAMS_ID', response.data.id) // 保存生成的编号，fdv图表显示查询使用
          this.$bus.$emit('reloadGetAnalysisRecord') // 重新查询分析管理页面分析子集数据，更新表格数据
          this.$bus.$emit('updateAnalysisTabDataFun', this.fileNewName, 'analysis_file_new', 'analysis_file', 'title')
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    openCopySaveDialog () {
      this.dialogCopySaveVisible = true
      this.copySaveTreeKeyword = ''
      this.copySaveName = this.fileNewName
      this.getTreeData()
    },
    copySaveAnalysisParams (params) { // 另存为分析
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/analysisRecord/addAsAnalysisRecord',
        method: 'post',
        data: {
          name: this.copySaveName,
          analysisRecordCategoryId: this.csTreeNodeId,
          content: params,
          event_profile: this.$store.state.eventStoreData,
          id: '',
          oldId: this.$store.state.analysisParamsId
        },
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('AddAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        if (response.data.status === '0') {
          this.$message({
            type: 'success',
            message: '数据保存成功!'
          })
          this.fileNewName = this.copySaveName

          console.log(this.fileNewName)
          this.$store.commit('ANALYSIS_PARAMS_ID', response.data.id)

          if (this.contentType === 'analysis_dhbcsdb') {
            this.$bus.$emit('updateAnalysisTabDataFun', this.fileNewName, 'analysis_dhbcsdb', 'analysis_file', 'title')
          } else if (this.contentType === 'analysis_event_file_new') {
            this.$bus.$emit('updateAnalysisTabDataFun', this.fileNewName, 'analysis_event_file_new', 'analysis_file', 'title')
          } else {
            this.$bus.$emit('updateAnalysisTabDataFun', this.fileNewName, 'analysis_file_new', 'analysis_file', 'title')
          }

          this.dialogCopySaveVisible = false
          this.$bus.$emit('reloadGetAnalysisRecord') // 重新查询分析管理页面分析子集数据，更新表格数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    managerTreeNodeHandleClick (data, node, nodeCommpent) { // 树节点点击事件
      if (!data.CHILDREN && !data.isAdd && !data.status) { // 如果不是目录,且节点不在编辑中，则点击节点时候获取分析子集数据
        console.log(JSON.stringify(data))
        this.csTreeNodeId = data.ID
      } else {
        this.csTreeNodeId = ''
      }
    },

    getTimeTree () { // 获取左侧树状数据
      this.fpcTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTimepointTree',
        method: 'get',
        params: {
          likeContent: this.timeTreeKeyword
        }
      }).then(response => {
        console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          let data = response.data.result.data
          if (data.length > 0) {
            this.fpcTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
            this.fpcTreeData = []
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultTimeExpandedKeys.push(expandedKey)
          } else {
            this.defaultTimeExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    getGcTree () { // 获取左侧树状数据
      this.fpcGcTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getGpTree',
        method: 'get',
        params: {
          likeContent: this.gcTreeKeyword
        }
      }).then(response => {
        console.log('getGcTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          let data = response.data.result.data
          if (data.length > 0) {
            this.fpcGcTreeData = data
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
            this.fpcGcTreeData = []
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultGcExpandedKeys.push(expandedKey)
          } else {
            this.defaultGcExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    renderFpcContent (h, {node, data, store}) { // tree自定义方法
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法

        }
      })
    },
    refreshTimeTreeData () {
      if (!this.$util.isDefine(this.timeTreeKeyword)) {
        this.searchTimeTreeData()
      }
    },
    refreshGcTreeData () {
      if (!this.$util.isDefine(this.gcTreeKeyword)) {
        this.searchGcTreeData()
      }
    },
    searchTimeTreeData (flag) { // 关键字搜索树节点
      this.timeTreeNodeDesc = ''
      this.getTimeTree()
    },

    searchGcTreeData () {
      this.gcTreeNodeDesc = ''
      this.getGcTree()
    },

    fpcNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      console.log('FPC@fpcNodeClick:', data)

      if (data.DESCRIPTION) {
        this.timeTreeNodeDesc = data.DESCRIPTION
      } else {
        this.timeTreeNodeDesc = ''
      }

      if (!data.CHILDREN) {
        this.timePointValue = data.ID
        this.timePointText = data.NAME
      }
    },

    fpcGcNodeClick (data) {
      console.log('FPC@fpcGcNodeClick:', data)

      if (data.DESCRIPTION) {
        this.gcTreeNodeDesc = data.DESCRIPTION
      } else {
        this.gcTreeNodeDesc = ''
      }

      if (!data.CHILDREN) {
        this.enginParamValue = data.ID
        this.enginParamText = data.NAME
      }
    },

    toggleTreeType (type) {
      this.showTreeType = type
    },

    tabFpContent () {
      let that = this
      this.$nextTick(() => {
        that.initFpcVisualChat() // 初始化可视化配置中图表数据
      })
    },

    initFpcVisualChat () {
      // 初始化可视化配置图表
      document.getElementById('fpcVisualChat').style.width = document.getElementsByClassName('fpc-visual-chart')[0].offsetWidth + 'px'
      console.log(document.getElementById('fpcVisualChat').style.width, document.getElementById('fpcVisualChat').style.height)
      if (this.visualConfigCharts) {
        this.visualConfigCharts.dispose()
        console.log('销毁存在的echarts')
      }
      this.visualConfigCharts = this.$echarts.init(document.getElementById('fpcVisualChat'))

      this.visualConfigCharts.setOption({
        title: {
          show: false,
          // text: '图表名称',
          left: 'center'
        },
        xAxis: {
          // name: '',
          nameLocation: 'center',
          nameTextStyle: {
            color: '#999999',
            fontSize: 14
          },
          axisLabel: {
            show: true
          },
          axisTick: {
            show: false
          },
          nameGap: 10,
          data: ['', '', '', '', '', '', '', '', '', '']
        },
        yAxis: {
          // name: 'Flights',
          position: 'left',
          nameLocation: 'middle',
          nameTextStyle: {
            color: '#999999',
            fontSize: 14
          },
          nameGap: 40
        },
        series: [{
          type: 'line',
          smooth: true,
          // step: 'middle', // start | middle | end
          data: [12, 23, 34, 24, 43, 45, 67, 46, 54, 65]
        }],
        color: ['#588EE6']
      })

      this.visualConfigCharts.on('click', function (params) {
        console.log('visualConfigCharts:', params)
        console.log('bar-name:' + params.name, 'bar-data:' + params.data)
      })
      // window.onresize = this.visualConfigCharts.resize
    },

    getEventLevelData (params, filterConditions) {
      const that = this
      let tempEventLevelValue = []

      this.eventLevelData = []

      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')

      if (params.length > 32) {
        params = params.substring(params.length - 32)
      }
      this.$axios({
        url: '/apm/getProfileEventLevel',
        method: 'get',
        params: {
          id: params
        }
      }).then(response => {
        console.log('getEventLevelData~~~:', response)
        let resData = response.data

        if (resData.length > 0) {
          resData.forEach((item, index) => {
            that.eventLevelData.push({
              value: item.EVENT_LEVEL,
              label: item.EVENT_CAPTION
            })

            tempEventLevelValue.push({
              value: item.EVENT_LEVEL,
              label: item.EVENT_CAPTION
            })
          })

          if (that.$util.isDefine(filterConditions.filterName)) {
            let tempLevName = filterConditions.filterName.substr(filterConditions.filterName.indexOf('; 已选事件等级: ') + 10)
            let alist = tempLevName.split(',')
            let blist = filterConditions.selectValueTwo.split(',')
            let clist = []

            if (tempLevName.length > 1 && alist.length > 0) {
              alist.forEach((item, i) => {
                clist.push({
                  label: item,
                  value: blist[i]
                })
              })

              if (clist.length > 0) {
                // setTimeout(() => {
                  that.eventLevelValue = clist
                // }, 500)
              } else {
                // setTimeout(() => {
                  that.eventLevelValue = tempEventLevelValue
                // }, 500)
              }
            }
          } else {
            // setTimeout(() => {
              that.eventLevelValue = tempEventLevelValue
            // }, 500)
          }
        }

        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    getEventTreeData () {
      this.eventTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/apm/getEventProfileTree',
        method: 'get',
        params: {
          parentId: 0,
          searchContent: this.eventTreeKeyword
        }
      }).then(response => {
        console.log('getEventTreeData~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框

        let resultData = response.data.data
        if (resultData.length > 0) {
          this.eventTreeData = resultData
        }

        let expandedKey = response.data['defaultNode']
        if (this.$util.isDefine(expandedKey)) {
          this.eventDefaultExpandedKeys.push(expandedKey)
        } else {
          this.eventDefaultExpandedKeys = []
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    openEventDialog (parentNode, childNode) {
      this.dialogEventVisible = true

      // this.resetEventDialog()

      this.getEventTreeData()
    },

    closeEventDialog () {
      this.dialogEventVisible = false

      // this.resetEventDialog()
    },

    toggleEventParams () {
      if (!this.$util.isDefine(this.eventStoreObj.ID)) {
        return false
      }

      this.eventName = this.eventStoreObj.NAME
      this.$store.commit('EVENT_STORE_DATA', this.eventStoreObj)
      this.dialogEventVisible = false

      this.getTree()

      if (this.visualConfigAxisOneTreeType === 'event') {
        this.clearCurrentAxisData('one')
      }

      if (this.visualConfigAxisTwoTreeType === 'event') {
        this.clearCurrentAxisData('two')
      }

      let len = this.filterConfigTableData.length
      if (len > 0) {
        while (len--) {
          if (this.filterConfigTableData[len].type === '51') {
            this.filterConfigTableData.splice(len, 1)
          }
        }
      }
    },

    resetEventDialog () {
      this.eventName = ''
      this.eventStoreObj = {}
      this.eventTreeKeyword = ''
    },

    renderEventContent (h, {node, data, store}) {
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: false, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
        }
      })
    },

    eventTreeNodeHandleClick (data) {
      if (!data.CHILDREN) {
        this.eventStoreObj = data
        // this.$store.state.eventStoreData
      }
    }
  }
}
</script>
<style>
.description_text .el-form-item__content {
  margin-left: 20px !important;
  font-size: 8px;
  line-height: 16px !important;
  color: #606266b8;
}
.description_text {
  position: absolute;
  bottom: 0px;
}
.el-date-picker {
  width: 290px;
}
.el-date-picker__header {
  margin: 6px;
}
.el-picker-panel__content {
  margin: 8px;
}
.el-date-picker .el-picker-panel__content {
  width: 265px;
}
.el-time-panel {
  left:unset;
  right: -6px;
}
.dialog-footer .el-button--mini{
  padding: 10px 30px;
}
.classConfig_zone .el-form-item__content{
  margin-left: 20px !important;
  line-height: 10px !important;
}
.classConfig .el-form-item__content {
  line-height: 32px;
}
.classConfig .el-form-item__label {
  line-height: 32px;
}
.classConfig .el-input__icon {
  line-height: 32px;
}
.export_quantity .el-form-item__content{
  width: 193px;
}
</style>
<style scoped>
.hide {
  display: none !important;
}
.file-new-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-new-left {
  width: 20%;
  height: 100%;
  padding-top: 15px;
  /* border-right: 1px solid #DDDDDD; */
}
.df >>> .el-date-editor.el-input,
.df >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.file-new-left-tree >>> .el-tree__empty-text {
  left: 15px !important;
}
.tree-head-icon {
  margin: -5px 10px 10px;
}
.tree-desc {
  width: 100%;
  height: 85px;
  word-break: break-word;
  border-top: 1px solid #DDDDDD;
}
.tree-desc .content {
  margin: 8px 0 0 8px;
  height: 60px;
  overflow: auto;
}
.tree-desc .view-table-btn-info {
  margin: 8px 0 0 8px;
  height: 60px;
  overflow: auto;
}
.tree-desc .view-table-btn-info span:first-child {
  color: #666666;
  font-size: 12px;
  line-height: 14px;
}
.tree-desc .view-table-btn-info span:last-child {
  color: #333333;
  font-size: 12px;
  line-height: 16px;
}

.file-new-left-tree {
  overflow: auto;
}
.file-new-left-tree::-webkit-scrollbar{
   width: 8px;
  height: 8px;
}
.file-new-left-tree::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cccccc;
}
.file-new-middle {
  width: 80%;
  height: 100%;
}
.flex-new-top {
  border-bottom: 1px solid #DDDDDD;
}
.file-new-content {
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
  border-left: 1px solid #DDDDDD;
}
.file-new-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.file-new-content >>> .el-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
/* .file-new-content >>> .el-tabs__header.is-top {
  height: 50px;
} */
.file-new-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.file-new-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.filter-config-table {
  display: flex;
  flex: 1;
}
.filter-config-table >>> .el-table::before {
  height: 0;
}
.filter-config-pagination{
    padding: 24px 10px 24px 0;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.file-new-right{
  width: 30%;
  height: 100%;
  overflow: auto;
}
.file-new-bottom {
  width: 100%;
  height: 70px;
}

.file-new-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}
.row-icon-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.filter-config-table .row-icon-group{
  display: none;
}
.standardRadio {
  width: 240px;
}
.standardRadio > .el-select {
  display: block;
}
.test-value {
  padding: 15px 0 10px 0;
}
.attr-tip{
  font-size: 12px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 18px;
}
.search-key-str {
  font-size: 12px;
  color: #555555;
  letter-spacing: 0;
}
.filter-attr-input {
  width: 240px;
}
.filter-attr-input-small {
  width: 110px;
}
.filter-attr-input-line{
  font-size:12px;
  color:#DDDDDD;
  line-height:14px;
  width:16px;
  height:14px;
  margin: 0 1px;
  text-align:center;
}
.attr-edit {
  position: absolute;
  margin: 0;
  top: 35px;
  right: -30px;
}
.add-zhou-c {
  color: #437ACF;
}
.add-zhou-g {
  color: #DDDDDD;
}
.file-visual-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  max-height: 72%;
  flex: 1;
  overflow: hidden;
}
.file-visual-chart #visualChart {
  height: 100% !important;
}
.file-visual-chart span {
  position: relative;
  top: 10px;
  left: 10px;
  color: #555555;
}
.class-axis-text {
  border: 1px solid #DDDDDD;
  padding: 5px 0 5px 10px;
  color: #9B9B9B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  margin-left: 0px;
  flex: auto;
}
.visual-axis-text {
  border: 1px solid #DDDDDD;
  padding: 5px 0 5px 10px;
  color: #9B9B9B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  margin-left: 13px;
  flex: auto;
}
.visual-axis-text:focus, .visual-axis-text:hover {
  border-color: #3A6BB9;
  color: #555555;
}
.visual-axis-line {
  width: 28px;
  height: 11px;
}
.visual-axis-line-up {
  border-top-right-radius: 5px;
  border-top: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-axis-line-down {
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-icon-exchange {
  position: relative;
  right: -98%;
}
.visualConfig-axis {
  width: 100%;
  height: 130px;
}
.file-name {
  width: 80px;
  /*
  display: inline-block;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines; */
}
.chart-name {
  width: 90px;
}
.alert-info {
  position: relative;
  top: -15px;
}
.alert-info >>> .el-alert--error {
  background-color: #FFFFFF;
}

.hot-words >>> .el-select{
  width: 100%;
}

/* 表格配置样式开始 */
.file-table-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  height: 185px;
}
.tableConfig-axis {
  width: 100%;
}
/*!* 窗口高度大于800px *!
@media screen and (min-height: 800px) {
  .file-table-chart {
    min-height: 100px;
    max-height: 419px;
  }
  .tableConfig-axis {
    height: 290px;
  }
}
!* 窗口高度小于800px *!
@media screen and (max-height: 800px) {
  .file-table-chart {
    min-height: 100px;
    max-height: 212px;
  }
  .tableConfig-axis {
    height: 200px;
  }
}*/
.table-config-empty {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.view-power >>> .el-tree {
  width: 100%;
}

.data-point1 {
  /* 要创建一个 flex 容器，只需要将一个 display: flex 属性添加到一个元素上。
     默认情况下，所有的直接子元素都被认为是 flex 项，并从左到右依次排列在一行中。
     如果 flex 项的宽度总和大于容器，那么 flex 项将按比例缩小，直到它们适应 flex 容器宽度 */
  display: flex;

  /* flex-direction 决定主轴的方向 row(默认)|row-reverse|column|column-reverse*/
  /* flex-direction: row; */

  /* flex-wrap决定当排列不下时是否换行以及换行的方式,nowrap(默认)|wrap|wrap-reverse */
  /* flex-wrap:wrap; */

  /* flex-flow是lex-direction和flex-wrap的简写形式，如：row wrap|column wrap-reverse等。默认值为row nowrap，即横向排列 不换行 */
  flex-flow: row wrap;

  /* !当主轴沿水平方向时!justify-content,决定item在主轴上的对齐方式，可能的值有flex-start（默认），flex-end，center，space-between，space-around */
  justify-content: start;
  /* !主轴水平时!决定了item在交叉轴上的对齐方式，可能的值有flex-start|flex-end|center|baseline|stretch */
  align-items: flex-start;
}
.data-point >>> .el-select {
  /*width: 80px;*/
  /*margin-right: 4px;*/
  margin-top: 6px;
}
.data-point .dynamic_time li {
  list-style: none;
}
.data-point .dynamic_time li .el-input {
  width: 80px;
  margin-right: 5px;
}
/* ========================= */
.tree-content {
  position: relative;
  margin: 15px auto;
  border: 0px solid red;
  height: 280px;
  overflow: auto;
}

.file-table-chart >>> .el-table::before,
.tableConfig-axis >>> .el-table::before {
  height: 0;
}

.fpc-content {
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
}
.fpc-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fpc-content >>> .el-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
/* .fpc-content >>> .el-tabs__header.is-top {
  height: 50px;
} */
.fpc-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fpc-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}

.fpc-left-tree {
  overflow: auto;
}

.fpc-left-tree >>> .el-tree__empty-text {
  left: 15px !important;
}

.fpc-visual-chart {
  border: 1px solid #DDDDDD;
  margin: 10px;
  width: 100%;
  max-height: 72%;
  flex: 1;
  overflow: hidden;
}
.fpc-visual-chart #fpcVisualChat {
  height: 100% !important;
}
.fpc-visual-chart span {
  position: relative;
  top: 10px;
  left: 10px;
  color: #555555;
}
.visual-axis-text {
  border: 1px solid #DDDDDD;
  margin: 0 14px 0 0;
  padding: 5px 0 5px 10px;
  color: #9B9B9B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  margin-left: 13px;
  flex: auto;
}
.visual-axis-text:focus, .visual-axis-text:hover {
  border-color: #3A6BB9;
  color: #555555;
}
.visual-axis-line {
  width: 28px;
  height: 11px;
}
.visual-axis-line-up {
  border-top-right-radius: 5px;
  border-top: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-axis-line-down {
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #DDDDDD;
  border-right: 1px solid #DDDDDD;
}
.visual-icon-exchange {
  position: relative;
  right: -98%;
}
.visualConfig-axis {
  width: 100%;
  height: 130px;
}
.visualConfig-axis .header {
  width: 60px;
}
.visualConfig-axis >>> .el-button--primary {
  height: 32px;
}

.fpc-name {
  width: 50px;
}
.chart-name {
  width: 90px;
}

.fpc-table-chart >>> .el-table::before,
.tableConfig-axis >>> .el-table::before {
  height: 0;
}

.visualConfig-axis >>> .el-input-group__append,
.visualConfig-axis >>> .el-input-group__prepend {
  padding: 0 8px;
}

.visualConfig-axis >>> .el-input__inner {
  padding: 0 4px;
  text-align: center;
}
.df-f123{
  width: 90px;
}

.cm-cl{
  margin-right: 27px;
}
.cm .el-input__icon{
  right: 53px !important;
}
/* 页面布局格式统一调整 */
/* 左右 */
.cm_tab_file_new_left{
  width: 20% !important;
}
.cm_tab_file_new_main{
  width: 805 !important;
}
.cm_main_content{
  width: 70% !important;
}
.cm_main_attr{
  width: 30% !important;
}
/* 左中右 */
.classConfig .el-form-item {
  margin-bottom: 12px !important;
}
.classConfig {
  position: relative;
}
</style>

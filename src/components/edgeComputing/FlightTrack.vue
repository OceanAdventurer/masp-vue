<template>
  <div class="flight_box">
    <div id="mapbox" />
    <div class="select_btn">
      <div class="flight_box">
        <el-button
          type="text"
          class="flight_procedure"
          @click="dialogProcedure = true"
          >飞行程序（线）</el-button
        >
        <el-dialog
          title="请选择以下选项"
          :visible.sync="dialogProcedure"
          width="650px"
          :modal="false"
          class="left_conditions"
        >
          <div>
            <el-form
              ref="flight_procedure"
              class="left_conditions_form"
              :model="flight_procedure"
              :rules="Program_warning"
              label-position
            >
              <!-- 机场 -->
              <el-form-item label="机场" prop="airport_value">
                <el-select v-model="flight_procedure.airport_value" filterable placeholder="请输机场名称">
                  <el-option
                    v-for="item in restaurants"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 飞行程序 -->
              <el-form-item label="飞行程序" prop="procedure_type">
                <el-checkbox-group v-model="flight_procedure.procedure_type">
                  <el-checkbox label="STAR" name="type">进场</el-checkbox>
                  <el-checkbox label="SID" name="type">离场</el-checkbox>
                  <el-checkbox label="APP" name="type">进近</el-checkbox>
                  <el-button
                    type="primary"
                    style="margin-left: 20px"
                    @click="onSubmit('flight_procedure')"
                    v-loading.fullscreen.lock="flight_procedureLoading"
                    >飞行程序查询</el-button
                  >
                </el-checkbox-group>
              </el-form-item>
              <!-- 跑道 -->
              <el-form-item label="跑道">
                <el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="track_track"
                  v-loading.fullscreen.lock="track_track_procedureLoading"
                  >跑道查询
                </el-button>
                <!-- 重置 -->
                <el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="resettingRunway"
                  >重置跑道
                </el-button>
              </el-form-item>
              <!-- 进场跑道 -->
              <el-form-item label="进场跑道">
                <el-checkbox
                  v-model="checkAll_STAR"
                  :indeterminate="isIndeterminate_STAR"
                  @change="handleCheckAllChange_STAR"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="flight_list.track_list.STAR"
                  @change="handleCheckedCitiesChange_STAR"
                >
                  <el-checkbox
                    v-for="city in flight_procedure.track_list.STAR"
                    :key="city"
                    :label="city"
                    >{{ city }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- 离场跑道 -->
              <el-form-item label="离场跑道">
                <el-checkbox
                  v-model="checkAll_SID"
                  :indeterminate="isIndeterminate_SID"
                  @change="handleCheckAllChange_SID"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="flight_list.track_list.SID"
                  @change="handleCheckedCitiesChange_SID"
                >
                  <el-checkbox
                    v-for="city in flight_procedure.track_list.SID"
                    :key="city"
                    :label="city"
                    >{{ city }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="进近跑道">
                <el-checkbox
                  v-model="checkAll_APP"
                  :indeterminate="isIndeterminate_APP"
                  @change="handleCheckAllChange_APP"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="flight_list.track_list.APP"
                  @change="handleCheckedCitiesChange_APP"
                >
                  <el-checkbox
                    v-for="city in flight_procedure.track_list.APP"
                    :key="city"
                    :label="city"
                  >
                    {{ city }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="程序选择" />
              <el-form-item label="进场程序 ↓:" class="threshold_box">
                <div
                  style="
                    width: 40px;
                    height: 6px;
                    background-color: #009bf2;
                    border-radius: 6px;
                  "
                />
              </el-form-item>
              <el-form-item
                :label="item.name + ':'"
                v-for="(item, index) in STAR_list"
                :key="index"
              >
                <el-checkbox
                  v-model="item.all_value_STAR"
                  :indeterminate="item.STAR_whole_indeterminate"
                  @change="the_arena_all_STAR(index)"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="item.STAR_group"
                  @change="the_arena_STAR(index)"
                >
                  <el-checkbox
                    v-for="_item in item.STAR_LIST"
                    :key="_item"
                    :label="_item"
                  >
                    {{ _item }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="离场程序 ↓:">
                <div
                  style="
                    width: 40px;
                    height: 6px;
                    background-color: #0fb900;
                    border-radius: 6px;
                  "
                />
              </el-form-item>
              <el-form-item
                :label="item.name + ':'"
                v-for="(item, index) in SID_list"
                :key="index"
              >
                <el-checkbox
                  v-model="item.all_value_SID"
                  :indeterminate="item.SID_whole_indeterminate"
                  @change="the_arena_all_SID(index)"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="item.SID_group"
                  @change="the_arena_SID(index)"
                >
                  <el-checkbox
                    v-for="_item in item.SID_LIST"
                    :key="_item"
                    :label="_item"
                  >
                    {{ _item }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="进近程序 ↓:">
                <div
                  style="
                    width: 40px;
                    height: 6px;
                    background-color: #bc9e60;
                    border-radius: 6px;
                  "
                />
              </el-form-item>
              <el-form-item
                :label="item.name + ':'"
                v-for="(item, index) in APP_list"
                :key="index"
              >
                <el-checkbox
                  v-model="item.all_value_APP"
                  :indeterminate="item.APP_whole_indeterminate"
                  @change="the_arena_all_APP(index)"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="item.APP_group"
                  @change="the_arena_APP(index)"
                >
                  <el-checkbox
                    v-for="_item in item.APP_LIST"
                    :key="_item"
                    :label="_item"
                  >
                    {{ _item }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onthreshold" v-loading.fullscreen.lock="onthreshold_procedureLoading">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <!-- 机场图层 -->
      <div class="airport_coverage">
        <el-button
          type="text"
          class="coverage_btn"
          @click="dialogAirport = true"
          >飞行程序（图片）</el-button
        >
        <el-dialog
          title="机场图层"
          :visible.sync="dialogAirport"
          :modal="false"
          width="800px"
        >
          <div class="Tracking_information">
            <div>
              <el-form
                ref="ruleForm"
                :inline="true"
                :model="ruleForm"
                :rules="rules"
                class="Tracking_box"
                label-position="top"
              >
                <!-- 机场 -->
                <el-form-item label="机场" prop="airport">
                  <el-select v-model="ruleForm.airport" filterable placeholder="请输机场名称" clearable>
                    <el-option
                      style="width: 200px"
                      v-for="item in restaurants"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- 飞行程序 -->
                <el-form-item
                  label="飞行程序"
                  prop="fileType"
                  style="margin-left: 40px"
                >
                  <el-radio-group v-model="ruleForm.fileType">
                    <el-radio :label="1">进近</el-radio>
                    <el-radio :label="2">进场</el-radio>
                    <el-radio :label="3">离场</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div class="remove_title">请先移除图片后在进行下一步操作</div>
            <div class="irportTable">
              <el-table
                :data="airport_data"
                style="width: 760px"
                max-height="250"
                height="250"
                highlight-current-row
                v-loading="irportTableloading"
              >
                <el-table-column type="index" width="50" />
                <el-table-column prop="uploadTime" label="日期" width="150" />
                <el-table-column prop="airport" label="机场" width="120" />
                <el-table-column
                  prop="fileName"
                  label="文件名称"
                  width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="fileType"
                  label="飞行程序"
                  :formatter="formatter"
                  width="120"
                />
                <el-table-column
                  prop="latLon"
                  label="经度/纬度"
                  width="120"
                  show-overflow-tooltip
                />
                <el-table-column fixed="right" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="handleClick(scope.row)"
                      >查看
                    </el-button>
                    <el-button
                      v-show="scope.row.compile"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)"
                      >更新</el-button
                    >
                    <el-button
                      v-show="scope.row.shift_out"
                      type="text"
                      @click="shiftout(scope.row)"
                      >移除图片</el-button
                    >
                    <el-button
                      style="color: #ff0000"
                      type="text"
                      @click="delAirportFile(scope.row)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="information_bottom">
              <el-button type="primary" @click="submitForm('ruleForm')"
                >查询</el-button
              >
              <el-button type="success" @click="coverage_cancel"
                >取消</el-button
              >
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 飞行航段飞行 -->
      <div class="flight_procedure_right" v-show="flight_procedure_right">
        <div class="menuBar">
          <input
            type="button"
            value="开始"
            class="startClick"
            style="background-color: #409eff"
            @click="startClick"
          />
          <input
            type="button"
            value="暂停"
            class="pauseClick"
            style="background-color: #5ac2a7"
            @click="pauseClick"
          />
          <input
            type="button"
            value="回放"
            class="stopClick"
            style="background-color: #ffa048"
            @click="stopClick"
          />
          <span id="hangjiInfo">航班号：{{ flightNo_list[0] }} ~ 航班号：{{ flightNo_list[1] }}</span>
          <img :src="image1" alt="" @click="menuBar_btn1">
        </div>
      </div>
      <!-- 天气情况 -->
      <div class="weather">
        <el-dialog
          title="机场气象信息"
          :visible.sync="dialogweather"
          class="weather_box"
        >
          <div class="weather_center">
            <div v-if="takeoff_weather.APTLCAO_CODE" class="weather_left">
              <div>
                <div style="color: #033a97">
                  {{ takeoff_weather.APTLCAO_CODE }}
                </div>
                <div style="color: #ff8a00">起飞</div>
                <div style="color: #033a97">
                  {{ takeoff_weather.WEATHER_TYPE }}
                </div>
              </div>
              <div class="weather_text">
                <div class="weather_text_top">
                  <div>
                    {{ takeoff_weather.MSG_TIME }}UTC发布{{
                      takeoff_weather.APTLCAO_CODE
                    }}例行天气报告：
                  </div>
                </div>
                <div class="weather_text_bottom">
                  <div v-if="takeoff_weather.WIND_DIRECTION">
                    ·风向{{ takeoff_weather.WIND_DIRECTION }}度
                  </div>
                  <div v-if="takeoff_weather.WIND_SPEED">
                    ·风速{{ takeoff_weather.WIND_SPEED }}米/秒
                  </div>
                  <div v-if="takeoff_weather.GUST_SPEED">
                    ·阵风速{{ takeoff_weather.GUST_SPEED }}米/秒
                  </div>
                  <div v-if="takeoff_weather.WIND_DIRECTION_N">
                    ·顺时风向{{ takeoff_weather.WIND_DIRECTION_N }}至{{
                      takeoff_weather.WIND_DIRECTION_X
                    }}
                  </div>
                  <div v-if="takeoff_weather.TEMPERATURE">
                    ·温度{{ takeoff_weather.TEMPERATURE }}度
                  </div>
                  <div v-if="takeoff_weather.DEW_POINT">
                    ·露点{{ takeoff_weather.DEW_POINT }}度
                  </div>
                  <div v-if="takeoff_weather.BAROMETRIC">
                    ·高度表拨正值{{ takeoff_weather.BAROMETRIC }}
                  </div>
                  <div v-if="takeoff_weather.WEATHER_TREND">
                    ·{{ takeoff_weather.WEATHER_TREND }}
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!takeoff_weather.APTLCAO_CODE" class="weather_left">
              <div style="text-align: center">暂无数据</div>
            </div>

            <div v-if="arrival_weather.APTLCAO_CODE" class="weather_left">
              <div>
                <div style="color: #033a97">
                  {{ arrival_weather.APTLCAO_CODE }}
                </div>
                <div style="color: #ff8a00">到达</div>
                <div style="color: #033a97">
                  {{ arrival_weather.WEATHER_TYPE }}
                </div>
              </div>
              <div class="weather_text">
                <div class="weather_text_top">
                  <div>
                    {{ arrival_weather.MSG_TIME }}UTC发布{{
                      arrival_weather.APTLCAO_CODE
                    }}例行天气报告：
                  </div>
                </div>
                <div class="weather_text_bottom">
                  <div v-if="arrival_weather.WIND_DIRECTION">
                    ·风向{{ arrival_weather.WIND_DIRECTION }}度
                  </div>
                  <div v-if="arrival_weather.WIND_SPEED">
                    ·风速{{ arrival_weather.WIND_SPEED }}米/秒
                  </div>
                  <div v-if="arrival_weather.GUST_SPEED">
                    ·阵风速{{ arrival_weather.GUST_SPEED }}米/秒
                  </div>
                  <div v-if="arrival_weather.WIND_DIRECTION_N">
                    ·顺时风向{{ arrival_weather.WIND_DIRECTION_N }}至{{
                      arrival_weather.WIND_DIRECTION_X
                    }}
                  </div>
                  <div v-if="arrival_weather.TEMPERATURE">
                    ·温度{{ arrival_weather.TEMPERATURE }}度
                  </div>
                  <div v-if="arrival_weather.DEW_POINT">
                    ·露点{{ arrival_weather.DEW_POINT }}度
                  </div>
                  <div v-if="arrival_weather.BAROMETRIC">
                    ·高度表拨正值{{ arrival_weather.BAROMETRIC }}
                  </div>
                  <div v-if="arrival_weather.WEATHER_TREND">
                    ·{{ arrival_weather.WEATHER_TREND }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!arrival_weather.APTLCAO_CODE" class="weather_left">
              <div style="text-align: center">暂无数据</div>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 上传图片 -->
      <div class="Mount_the_image">
        <el-button
          type="text"
          class="upload_pictures"
          @click="dialogUploading = true"
          >图片上传</el-button
        >
        <el-dialog
          title="飞行程序"
          :visible.sync="dialogUploading"
          width="450px"
          :modal="false"
        >
          <el-form
            ref="save"
            :model="save"
            :rules="rules"
            class="popup_Mount"
            label-position="left"
            label-width="80px"
          >
            <!-- 图片上传 -->
            <el-form-item class="upload_img" prop="fileUrl">
              <el-upload
                class="upload-demo"
                :action=" PathImage + proxyUri +'/api/file/attachment/upload' "
                accept=".png"
                :on-success="handleAvatarSuccess"
                :data="{ bizType: 'casts-approach_figure' }"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">图片上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传png文件</div>
              </el-upload>
            </el-form-item>
            <!-- 机场名称 -->
            <el-form-item label="机场" prop="airport" class="graph_flex">
              <el-select v-model="save.airport" filterable placeholder="请输入机场名称" clearable>
                <el-option
                  v-for="item in restaurants"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 图片描述 -->
            <el-form-item label="文件名称" prop="fileName" class="graph_flex">
              <el-input v-model="save.fileName" clearable placeholder="请输入文件名称" />
            </el-form-item>
            <!-- 飞行程序 -->
            <el-form-item label="飞行程序" prop="fileType">
              <el-radio-group v-model="save.fileType">
                <el-radio :label="1">进近</el-radio>
                <el-radio :label="2">进场</el-radio>
                <el-radio :label="3">离场</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 位置点 -->
            <el-form-item label="位置点:" required class="value_point">
              <el-col :span="11">
                <el-form-item prop="long">
                  <el-input
                    v-model="save.long"
                    style="width: 100%"
                    placeholder="经度"
                    clearable
                    oninput=""
                  />
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center"
                >-</el-col
              >
              <el-col :span="11">
                <el-form-item prop="lat">
                  <el-input
                    v-model="save.lat"
                    style="width: 100%"
                    placeholder="纬度"
                    clearable
                    oninput=""
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 底部按钮 -->
            <el-form-item>
              <div class="popup_button">
                <el-button class="preview" @click="preview_btn('save')"
                  >预览</el-button
                >
                <el-button
                  class="Cancel_the_preview"
                  type="primary"
                  @click="Cancel_the_preview_btn"
                >
                  撤销预览</el-button
                >
                <el-button class="save" type="success" @click="save_btn('save')"
                  >上传</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- kml航迹查询 -->
      <div class="Track_the_query">
        <el-button type="text" class="track_btn" @click="dialogTrack = true"
          >航迹查询</el-button
        >
        <el-dialog
          title="飞行程序"
          :visible.sync="dialogTrack"
          :modal="false"
          width="900px"
        >
          <div class="Tracking_information">
            <!-- 查询条件 -->
            <el-form
              ref="form_track"
              :inline="true"
              :rules="track_warn"
              :model="form_track"
              label-width="80px"
            >
              <el-form-item label="机号" prop="">
                <el-input
                  v-model="form_track.model.acTail"
                  placeholder="请输入飞机编号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="起飞机场" prop="">
                <el-select v-model="form_track.model.departureAirport" filterable placeholder="请输起飞机场名称" clearable>
                  <el-option
                    v-for="item in restaurants"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="到达机场" prop="">
                <el-select v-model="form_track.model.arrivalAirport" filterable placeholder="请输入到达机场名称" clearable>
                  <el-option
                    v-for="item in restaurants"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="航班号" prop="">
                <el-input
                  v-model="form_track.model.flightNo"
                  placeholder="请输入航班编号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="时间" prop="">
                <el-date-picker
                  v-model="form_track.time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="getKmlFileList_init('form_track')"
                  >查询
                </el-button>
              </el-form-item>
            </el-form>
            <!-- 查询内容 -->
            <div class="irportTable">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                highlight-current-row
                max-height="250"
                @selection-change="handleSelectionChange"
                class="multipleTableClass"
                v-loading.fullscreen.lock="fullscreenLoading"
              >
                <el-table-column type="index" width="50" />
                <el-table-column label="修正状态" width="120">
                  <template slot-scope="scope">{{ scope.row.state == null || scope.row.state == '' || scope.row.state == undefined ? '未修正' : scope.row.stateName  }}</template>
                </el-table-column>
                <el-table-column label="飞机编号" width="120">
                  <template slot-scope="scope">{{ scope.row.acTail }}</template>
                </el-table-column>
                <el-table-column label="航班号" width="120">
                  <template slot-scope="scope">{{ scope.row.flightNo }}</template>
                </el-table-column>
                <el-table-column prop="name" label="起飞机场" width="120">
                  <template slot-scope="scope">{{
                    scope.row.departureAirport
                  }}</template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="到达机场"
                  width="120"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">{{
                    scope.row.arrivalAirport
                  }}</template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="起飞时间"
                  width="150"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">{{
                    scope.row.takeoffDateTime
                  }}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="280">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="Track_the_query(scope.row)"
                      >查看
                    </el-button>
                    <el-button
                      v-show=" scope.row.stateName === '修正成功' ? false:true"
                      type="text"
                      @click="Track_correction(scope.row)"
                      >修正航迹
                    </el-button>
                    <el-button
                      v-show="scope.row.weather"
                      type="text"
                      @click="edit_session(scope.row)"
                      >编辑时间
                    </el-button>
                    <el-button
                      v-show="scope.row.weather"
                      type="text"
                      @click="weather_btn(scope.row)"
                    >
                      天气情况
                    </el-button>
                    <el-button
                      v-show="scope.row.eliminate"
                      type="text"
                      @click="Track_is_deleted(scope.row)"
                      >清除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="flight-weather-table-pagination df df-jc-fe df-ai-c">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form_track.current"
                :page-size="form_track.size"
                layout="prev, pager, next, total"
                :total="total">
              </el-pagination>
            </div>
            <div>
              <el-dialog
                title="编辑起飞时间"
                :visible.sync="take_off_dialog"
                width="30%"
                :modal="false"
              >
                <el-date-picker
                  v-model="timertext"
                  type="datetime"
                  placeholder="选择日期时间"
                  :default-value="YTD"
                  :default-time="hour"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                />
              </el-dialog>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 测距 -->
      <div class="ranging" @click="ranging()">
        {{ ranging_T ? "结束测距" : "开启测距" }}
      </div>
      <!-- 总距离 -->
      <div id="distance" class="distance-container" />
      <!-- 恢复默认 -->
      <div class="eliminate">
        <el-button type="primary" class="eliminate_btn" @click="eliminate_btn">
          清除
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import $ from 'jquery'
import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'
import image0 from '@/assets/images/feiji.png'
import image1 from '@/assets/images/delete.png'
import 'mapbox-gl/dist/mapbox-gl.css'
// sm2加密
const sm2 = require('sm-crypto').sm2
// 1 - C1C3C2，0 - C1C2C3，默认为1
const cipherMode = 0

// 比例尺
var scale = new mapboxgl.ScaleControl({
  maxWidth: 100,
  unit: 'metric'
})

var Buffer = require('safe-buffer').Buffer
var wkx = require('wkx')

export default {
  data () {
    return {
      PathImage: '/DSAP/',
      irportTableloading: false,
      flight_procedureLoading: false,
      track_track_procedureLoading: false,
      onthreshold_procedureLoading: false,
      image1,
      // keyName: 'CC-COOKIE',
        // keyValue: '080C07B89D30878A286368A08180187093F451634AB3DBBB3AD8CDA5F3E44CCE9301514A41C24CBD',
      proxyUri: '/air-route/proxy',
      // proxyUri: '/hky-api',
      proxyUriUpload: '/air-route/proxy-upload',
      proxyInd: '/api/indicators',
      // 飞行航段飞行显示与隐藏
      flight_procedure_right: false,
      fullscreenLoading: false,
      timertext: '',
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      obj_STAR: {},
      // STAR
      STAR_list: [],
      // SID
      SID_list: [],
      // APP
      APP_list: [],
      // 私钥
      prikeyHex:
        '620bde7247dae0f011746f02ec5d64e3204ee6f9747b1e3ee5db016a52dde9b9',
      // 公钥
      sm2Token:
        'ba445861979b2d86cb921d38a4a0546db866bcd1574aaaa748132938d6d546a34fdb60df4823cda21b529810eac5d1f0b558e759d9a0110b63549d79ad4fb453756bff215b4f343debd5fd6c16f89e754385d44754099412e39cac649c0acd6eefa64e7bf499c5c20713b64193ef41578917607fa7c8ca00554ba7c4ca2597ae841753370ac4958219383836f46ffb4bd173b20cd63c0db0f803f0b69f2a00a54b8a9954575bec102f6e523f00224c2b202443fed3055415',
      headers: {
        tenant: '0000',
        token: sessionStorage.getItem('token')
      }, // 增加请求头
      list: '',
      // 某个机场对应的文件地址
      // 飞行程序 对应的 数据 ↓
      restaurants: [],
      // 飞行程序 form表单
      flight_procedure: {
        // 机场
        airport_value: '',
        // 飞行程序
        procedure_type: [],
        // 跑道
        track_list: {
          STAR: [],
          SID: [],
          APP: []
        }
      },
      // 飞行程序 表单未选择警告
      Program_warning: {
        // 机场
        airport_value: [
          {
            required: true,
            message: '请输入机场名称',
            trigger: 'focus'
          }
        ],
        // 飞行程序
        procedure_type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个飞行程序',
            trigger: 'change'
          }
        ],
        track_list: {
          STAR: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个飞行程序',
              trigger: 'change'
            }
          ],
          SID: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个飞行程序',
              trigger: 'change'
            }
          ],
          APP: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个飞行程序',
              trigger: 'change'
            }
          ]
        }
      },
      // 飞行程序 选中数据
      flight_list: {
        // 跑道
        track_list: {
          STAR: [],
          SID: [],
          APP: []
        }
        // 程序
      },
      // 跑道选择
      // STAR
      isIndeterminate_STAR: false,
      checkAll_STAR: false,
      // SID
      isIndeterminate_SID: false,
      checkAll_SID: false,
      // APP
      isIndeterminate_APP: false,
      checkAll_APP: false,
      procedure_arr: [],
      Url_List: [],
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        threshold: [],
        list: {
          Star_type: [],
          Sid_type: [],
          App_type: []
        },
        track: []
      },

      map: null,
      threshold_list: {
        App: [],
        Sid: [],
        Star: []
      },
      menuBar_btn: true,
      colorlist: {
        app: '#009BF2',
        sid: '#BC9E60',
        star: '#0FB900'
      },
      runway_: [],
      End_runway: [],
      type_list: ['Star', 'App', 'Sid'],
      ranging_T: false,
      distanceContainer: {},
      geojson: {},
      linestring: {},
      // 进场程序
      enter: false,
      arena: [],
      Approach: false,
      ApproachArr: [false, false],
      // 离场
      departure: false,
      Departureprocedures: [],
      procedures: false,
      // 进近
      approach: false,
      Approach_program: [],
      program: false,
      fileList: [],
      // kml跑道数据展示
      tableData: [],
      // kml跑道选中的条数
      multipleSelection: [],
      canvas: null,
      coords: null,
      // 图片上传保存信息
      save: {
        // 机场
        airport: '',
        // 文件描述
        fileDesc: '',
        // 文件ID
        fileId: '',
        // 文件名称
        fileName: '',
        // 不传默认10
        fileStatus: 10,
        // 1-进近，2-进场，3-离场
        fileType: 1,
        // 文件地址
        fileUrl: '',
        // 经纬度
        latLon: '',
        long: '',
        lat: ''
      },
      // 查询文件
      // 机场图层
      ruleForm: {
        // 机场名称
        airport: '',
        // 飞行程序
        fileType: 1
      },
      rules: {
        // 机场名称
        airport: [
          {
            required: true,
            message: '请输入机场名称',
            trigger: 'focus'
          }
        ],
        // 文件名称
        fileName: [
          {
            required: true,
            message: '请输入文件名称',
            trigger: 'blur'
          }
        ],
        // 飞行程序
        fileType: [
          {
            required: true,
            message: '请选择飞行程序',
            trigger: 'change'
          }
        ],
        // 经度
        long: [
          {
            required: true,
            message: '请输入经度',
            trigger: 'blur'
          }
        ],
        // 纬度
        lat: [
          {
            required: true,
            message: '请输入纬度',
            trigger: 'blur'
          }
        ],
        // 图片上传
        fileUrl: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }
        ]
      },
      // 文件列表
      airport_data: [],
      // 保存机场图层当前选中的这一项，防止 重新渲染 图片在页面上而数据上不显示 “移除”按钮
      picture_fileId: [],
      // 保存航迹选择完成后删除
      track_fileId: [],
      // 航迹查询条件
      form_track: {
        'time': '',
        'current': 1,
        'map': {},
        'model': {
          'acTail': '',
          'arrivalAirport': '',
          'createTime': '',
          'createUser': 0,
          'departureAirport': '',
          'endDateTime': '',
          'flightNo': '',
          'id': 0,
          'startDateTime': '',
          'updateTime': '',
          'updateUser': 0
        },
        'order': 'descending',
        'size': 10,
        'sort': 'id'
      },
      // 总条数
      total: 0,
      track_warn: {
        acTail: [
          {
            required: true,
            message: '请输入飞机编号',
            trigger: 'blur'
          }
        ],
        arrivalAirport: [
          {
            required: true,
            message: '请输入到达机场',
            trigger: 'blur'
          }
        ],
        departureAirport: [
          {
            required: true,
            message: '请输入起飞机场',
            trigger: 'blur'
          }
        ],
        flightNo: [
          {
            required: true,
            message: '请输入航班号',
            trigger: 'blur'
          }
        ],
        time: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ]
      },
      // 飞行程序
      dialogProcedure: false,
      // 上传图片
      dialogUploading: false,
      // kml航迹弹框
      dialogTrack: false,
      // 机场图层
      dialogAirport: false,
      // 天气
      dialogweather: false,
      // 编辑起飞机场时间
      take_off_dialog: false,
      // 年月日
      YTD: '',
      // 时分秒
      hour: '',
      // 起飞机场天气
      takeoff_weather: {},
      // 降落机场天气
      arrival_weather: {},

      // kml航迹数据↓
      routeMap_list: {},
      // 选中之后的每条线的名字
      path_name: [],
      one_fileNoTemp: '',
      acTail_li: '',
      flightNo_list: [],
      // 航迹
      realRouteGeoJsonArr: {},
      // 航班点
      FlightPoints: {},
      routeMap: {}
    }
  },
  mounted () {
    this.getCookie()
    this.menuBar_btn1()
    this.MapBox()
  },
  methods: {
    // 初始化请求cookie接口
    async getCookie () {
      this.get_basic()
    },
    sada (value, key) {
      if (this.checkAll === true) {
        for (let I in this.obj_STAR) {
          if (I === key) {
            this.checkedCities = this.obj_STAR[I]
          }
        }
      } else {
        this.checkedCities = []
      }
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    get_basic () {
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/large-screen-monitor/basic/data?dataType=' + 3,
        method: 'get'
      }).then((res) => {
        if (res.data.code === 0) {
          var list = res.data.data
          if (list.length > 0) {
            this.restaurants = list
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    menuBar_btn1 () {
      this.flight_procedure_right = false
    },

    MapBox () {
      mapboxgl.accessToken = sm2.doDecrypt(
        this.sm2Token,
        this.prikeyHex,
        cipherMode
      )
      var mapSource = {
        BaseMapRasterCommonBlack: {
          type: 'raster',
          tiles: [
            'CastMapServer&BaseUrl=http://map.zy-cast.com:5038/api/CastMapServer&LayerName=GetBaseMapRasterCommonBlackTiles&X={x}&Y={y}&Z={z}'
          ],
          minzoom: 1,
          maxzoom: 13,
          scheme: 'tms'
        },

        Cast_AirRouteVector: {
          type: 'vector',
          tiles: [
            'CastMapServer&BaseUrl=http://map.zy-cast.com:5038/api/CastMapServer&LayerName=GetAirRouteVectorTiles&X={x}&Y={y}&Z={z}'
          ],
          minzoom: 1,
          maxzoom: 20,
          scheme: 'tms'
        },
        // 机场场面图

        Cast_AirportsRaster: {
          type: 'raster',
          tiles: [
            'CastMapServer1&BaseUrl=http://map.zy-cast.com:5038/api/CastMapServer&LayerName=GetAirportRasterTiles&X={x}&Y={y}&Z={z}'
          ],
          minzoom: 11,
          maxzoom: 20,
          scheme: 'tms'
        },
        Cast_AirportsVector: {
          type: 'vector',
          tiles: [
            'CastMapServer&BaseUrl=http://map.zy-cast.com:5038/api/CastMapServer&LayerName=GetAirportVectorTiles&X={x}&Y={y}&Z={z}'
          ],
          minzoom: 11,
          maxzoom: 20,
          scheme: 'tms'
        }
      }
      var mapLayer = [
        {
          id: 'background',
          type: 'background',
          layout: {
            visibility: 'none'
          }
        },
        {
          id: 'BaseMapRasterCommonBlackImageLayer',
          type: 'raster',
          source: 'BaseMapRasterCommonBlack',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'raster-opacity': 0.8,
            'raster-saturation': 0,
            'raster-contrast': -0.4,
            'raster-fade-duration': 0
          }
        },
        // 机场场面图-start
        {
          id: 'airportsRasterLayer',
          type: 'raster',
          source: 'Cast_AirportsRaster',
          minzoom: 11,
          paint: {
            'raster-opacity': 1
          }
        },
        {
          id: 'airports_TaxiwayLineLayer',
          type: 'line',
          source: 'Cast_AirportsVector',
          'source-layer': 'TAT_TaxiwayLine',
          minzoom: 11,
          // "maxzoom": 20,
          layout: {
            visibility: 'visible'
          },
          paint: {
            'line-width': {
              base: 1,
              stops: [
                [10, 0.5],
                [13, 1.5]
              ]
            },
            'line-color': '#FFAA00'
          }
        },
        {
          id: 'airports_StandsLayer',
          type: 'symbol',
          source: 'Cast_AirportsVector',
          'source-layer': 'TAT_Stands',
          minzoom: 11,
          layout: {
            visibility: 'visible',
            'text-field': '{StandName}',
            'text-font': ['Arial Unicode MS Regular'],
            'text-rotate': ['get', 'CO'],
            'text-ignore-placement': true,
            'text-allow-overlap': false
          },
          paint: {
            'text-color': '#DC143C',
            'text-halo-color': '#CCCCCC',
            'text-halo-width': 1
          }
        },
        // 机场场面图-end
        {
          id: 'BaseAirportLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TBMap_Base_Airport',
          minzoom: 3.5,
          maxzoom: 14,
          layout: {
            visibility: 'visible',
            'icon-image': 'Airport-jb-28',
            'icon-size': 1,
            'icon-allow-overlap': true
          },
          paint: {
            'icon-opacity': {
              base: 1,
              stops: [
                [3, 0.1],
                [6, 1]
              ]
            }
          }
        },
        {
          id: 'BaseAirportLabelLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TBMap_Base_Airport',
          minzoom: 7,
          maxzoom: 20,
          layout: {
            visibility: 'visible',
            'text-field':
              '{CHINESEFUL}' + '\n{ICAO_CODE}' + ' - ' + '{IATA_CODE}',
            'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
            'text-size': {
              base: 1,
              stops: [
                [10, 16],
                [12, 22]
              ]
            },
            'text-offset': [0, -4],
            'text-anchor': 'top',
            'text-letter-spacing': 0.3,
            'text-ignore-placement': true,
            'text-allow-overlap': true,
            'text-max-width': 60
          },
          paint: {
            'text-color': '#FFD700',
            'text-halo-color': '#372F04',
            'text-halo-width': 2,
            'text-opacity': {
              base: 1,
              stops: [
                [4.5, 0.6],
                [10, 0.8]
              ]
            }
          }
        },
        {
          id: 'BaseAirportLabelLayerIATA',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TBMap_Base_Airport',
          minzoom: 4,
          maxzoom: 7,
          layout: {
            visibility: 'visible',
            'text-field': '{IATA_CODE}',
            'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
            'text-size': {
              base: 1,
              stops: [
                [4, 12],
                [10, 15]
              ]
            },
            'text-offset': [0, -2.2],
            'text-anchor': 'top',
            'text-letter-spacing': 0.3,
            'text-max-width': 60
          },
          paint: {
            'text-color': '#889db3',
            'text-opacity': 1,
            'text-halo-color': '#3276bc',
            'text-halo-width': 1
          }
        },
        // 航路航线-start
        {
          id: 'NDBLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_NDB',
          minzoom: 5,
          layout: {
            'text-size': 12,
            'icon-image': 'ndb2-30-Silver',
            'symbol-avoid-edges': true,
            'text-justify': 'left',
            visibility: 'visible',
            'text-offset': [0, -1.5],
            'icon-size': 1,
            'text-anchor': 'bottom',
            'text-field': '{NDBName}',
            'icon-allow-overlap': true,
            'icon-padding': 5
          },
          paint: {
            'icon-opacity': 0.8,
            'text-color': 'hsl(0, 42%, 93%)'
          }
        },
        {
          id: 'AirwaysLayer',
          type: 'line',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_Enroute',
          minzoom: 1,
          layout: {
            visibility: 'visible',
            'line-miter-limit': 2
          },
          paint: {
            'line-color': '#343533', //
            'line-opacity': 0.5,
            'line-width': 2,
            'line-blur': 0.5
          }
        },
        {
          id: 'AirwaysLabel',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_Enroute',
          minzoom: 5,
          layout: {
            'text-line-height': 1,
            'text-size': {
              base: 1,
              stops: [
                [8, 10],
                [12, 16]
              ]
            },
            'symbol-avoid-edges': true,
            'text-allow-overlap': false,
            'text-max-angle': 90,
            'symbol-spacing': {
              base: 1,
              stops: [
                [7, 220],
                [9, 320]
              ]
            },
            'text-font': ['Call One OT Regular', 'Arial Unicode MS Regular'],
            'symbol-placement': 'line',
            visibility: 'visible',
            'text-anchor': 'bottom',
            'text-letter-spacing': 0.2,
            'text-field': '{RouteID}      {RouteDisFrom}KM'
          },
          paint: {
            'text-translate-anchor': 'viewport',
            'text-color': 'hsl(40, 52%, 40%)',
            'text-opacity': 1,
            'text-halo-blur': 2,
            'text-halo-color': 'hsla(162, 13%, 1%, 0)',
            'text-halo-width': 2
          }
        },
        {
          id: 'waypoint_TriLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_Waypoint',
          minzoom: 5,
          filter: ['==', 'MType', '0C'],
          layout: {
            'text-size': 10,
            'icon-image': 'triglek-20-Silver',
            'symbol-avoid-edges': true,
            'text-justify': 'left',
            visibility: 'visible',
            'text-offset': [-0.5, -0.4],
            'icon-size': {
              base: 1,
              stops: [
                [6, 0.4],
                [10, 1]
              ]
            },
            'text-anchor': 'bottom-right',
            'text-field': '{WaypointID}',
            'icon-allow-overlap': true,
            'icon-padding': 5
          },
          paint: {
            'icon-opacity': {
              base: 0.5,
              stops: [
                [5, 0.6],
                [8, 1]
              ]
            },
            'text-color': 'hsl(0, 8%, 79%)'
          }
        },
        {
          id: 'waypoint_SolidTriLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_Waypoint',
          minzoom: 6,
          filter: ['!=', 'MType', '0C'],
          layout: {
            'text-size': 11,
            'icon-image': 'trigle-20-Silver',
            'icon-allow-overlap': true,
            'icon-optional': true,
            'icon-keep-upright': true,
            'text-justify': 'left',
            visibility: 'visible',
            'text-offset': [-0.5, -0.2],
            'icon-size': {
              base: 1,
              stops: [
                [6, 0.4],
                [12, 1]
              ]
            },
            'icon-padding': 3,
            'text-anchor': 'bottom-right',
            'text-field': '{WaypointID}'
          },
          paint: {
            'icon-opacity': {
              base: 0.5,
              stops: [
                [3, 0.5],
                [6, 1]
              ]
            },
            'text-color': 'hsl(0, 6%, 74%)'
          }
        },
        {
          id: 'VOR-DMELayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_VOR',
          minzoom: 5.5,
          maxzoom: 18,
          filter: ['==', 'MType', 'VD'],
          layout: {
            visibility: 'visible',
            'icon-image': 'vordme-60-Silver',
            'icon-offset': [0, -8],
            'icon-size': 0.8,
            'icon-allow-overlap': true
          },
          paint: {
            'icon-opacity': {
              base: 0.5,
              stops: [
                [5, 0.5],
                [10, 1]
              ]
            }
          }
        },
        {
          id: 'DMELayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_VOR',
          minzoom: 6,
          maxzoom: 18,
          filter: ['==', 'MType', 'D'],
          layout: {
            visibility: 'visible',
            'icon-image': 'dme-15-Silver',
            'icon-size': {
              base: 1,
              stops: [
                [5, 0.2],
                [10, 1]
              ]
            },
            'icon-allow-overlap': {
              base: 1,
              stops: [
                [9, true],
                [11, true]
              ]
            }
          },
          paint: {
            'icon-opacity': {
              base: 1,
              stops: [
                [5, 0.6],
                [7, 1]
              ]
            }
          }
        },
        {
          id: 'VORLayer',
          type: 'symbol',
          source: 'Cast_AirRouteVector',
          'source-layer': 'TAT_VOR',
          minzoom: 6,
          maxzoom: 18,
          filter: ['==', 'MType', 'V'],
          layout: {
            visibility: 'visible',
            'icon-image': 'vor-grey-30-Silver',
            'icon-size': {
              base: 1,
              stops: [
                [5, 0.2],
                [10, 1.0]
              ]
            },
            'icon-allow-overlap': {
              base: 1,
              stops: [
                [9, true],
                [11, true]
              ]
            }
          },
          paint: {
            'icon-opacity': {
              base: 1,
              stops: [
                [5, 0.88],
                [7, 1]
              ]
            }
          }
        }
      ]

      this.map = new mapboxgl.Map({
        container: 'mapbox',
        maxZoom: 20,
        minZoom: 1,
        zoom: 3.7,
        center: [105, 37],
        style: {
          version: 8,
          sources: mapSource,
          sprite: 'http://map.zy-cast.com:5044/ADS-B/sprite/Common/sprite',
          glyphs:
            'http://map.zy-cast.com:5044/ADS-B/glyphs/{fontstack}/{range}.pbf',
          layers: mapLayer
        },
        trackResize: true,
        pitchWithRotate: false,
        dragRotate: false,
        fadeDuration: 0,
        crossSourceCollisions: true,
        refreshExpiredTiles: false,
        failIfMajorPerformanceCaveat: true,
        maxTileCacheSize: 64,
        collectResourceTiming: false,
        renderWorldCopies: true,
        doubleClickZoom: false,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Tile' && url.startsWith('CastMapServer')) {
            var qs = Qs
            let qsv = qs.parse(url)
            // let KeyNum = Math.floor(Math.random() * 100 + 1)
            let xyzQs = {
              X: parseInt(qsv.X),
              Y: parseInt(qsv.Y),
              Z: parseInt(qsv.Z),
              KN: 77,
              LN: qsv.LN
            }
            return {
              url: `${qsv.BaseUrl}/${qsv.LayerName}?TileKey=${xyzQs.X}_${xyzQs.Y}_${xyzQs.Z}_${xyzQs.KN}_${xyzQs.LN}`,
              headers: {
                'cache-control': 'max-age=3000000',
                connection: 'keep-alive'
              }
            }
          }
        }
      })

      var map = this.map

      // 比例尺
      map.addControl(scale, 'bottom-left')
      // 箭头-右
      var svgXML = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#E8652D"></path></svg>`
      var svgBase64 =
        'data:image/svg+xml;base64,' +
        window.btoa(unescape(encodeURIComponent(svgXML)))
      let arrowIcon = new Image(10, 10)
      arrowIcon.src = svgBase64
      arrowIcon.onload = function () {
        map.addImage('arrowIcon', arrowIcon)
        map.loadImage(image0, (error, image) => {
          if (error) throw error
          map.addImage('carIcon', image)
        })
      }

      let arrowIcon1 = new Image(10, 10)
      arrowIcon1.src = svgBase64
      arrowIcon1.onload = function () {
        map.addImage('arrowIcon1', arrowIcon1)
      }
    },
    // 条件查询
    onSubmit (formName) {
      var that = this
      var map = that.map
      // STAR
      that.STAR_list.forEach((item, index) => {
        if (item.STAR_LIST.length > 0) {
          item.STAR_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // SID
      that.SID_list.forEach((item, index) => {
        if (item.SID_LIST.length > 0) {
          item.SID_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // APP
      that.APP_list.forEach((item, index) => {
        if (item.APP_LIST.length > 0) {
          item.APP_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })

      // STAR
      that.STAR_list = []
      // SID
      that.SID_list = []
      // APP
      that.APP_list = []
      that.isIndeterminate_STAR = false
      that.checkAll_STAR = false
      // SID
      that.isIndeterminate_SID = false
      that.checkAll_SID = false
      // APP
      that.isIndeterminate_APP = false
      that.checkAll_APP = false
      that.flight_procedure.track_list = {
        STAR: [],
        SID: [],
        APP: []
      }

      that.threshold_list = {
        App: [],
        Sid: [],
        Star: []
      }

      // 进场程序
      that.enter = false
      that.Approach = false
      // 离场
      that.departure = false
      that.procedures = false
      // 进近
      that.approach = false
      that.program = false

      // 跑道
      that.flight_list.track_list = {
        STAR: [],
        SID: [],
        APP: []
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            'airport': this.flight_procedure.airport_value,
            'identList': [],
            'pidList': [],
            'typeList': this.flight_procedure.procedure_type
          }
          this.flight_procedureLoading = true
          this.$axios({
            url: this.proxyUri + this.proxyInd + '/airport-geometry/getPidList',
            method: 'post',
            data: data
          }).then((res) => {
            this.flight_procedureLoading = false
            that.flight_procedure.track_list = res.data.data
          })
        }
      })
    },
    // STAR
    handleCheckAllChange_STAR (val) {
      this.flight_list.track_list.STAR = val
        ? this.flight_procedure.track_list.STAR
        : []
      this.isIndeterminate_STAR = false
    },
    handleCheckedCitiesChange_STAR (value) {
      let checkedCount = value.length
      this.checkAll_STAR =
        checkedCount === this.flight_procedure.track_list.STAR.length
      this.isIndeterminate_STAR =
        checkedCount > 0 &&
        checkedCount < this.flight_procedure.track_list.STAR.length
    },
    // SID
    handleCheckAllChange_SID (val) {
      this.flight_list.track_list.SID = val
        ? this.flight_procedure.track_list.SID
        : []
      this.isIndeterminate_SID = false
    },
    handleCheckedCitiesChange_SID (value) {
      let checkedCount = value.length
      this.checkAll_SID =
        checkedCount === this.flight_procedure.track_list.SID.length
      this.isIndeterminate_SID =
        checkedCount > 0 &&
        checkedCount < this.flight_procedure.track_list.SID.length
    },
    // APP
    handleCheckAllChange_APP (val) {
      this.flight_list.track_list.APP = val
        ? this.flight_procedure.track_list.APP
        : []
      this.isIndeterminate_APP = false
    },
    handleCheckedCitiesChange_APP (value) {
      let checkedCount = value.length
      this.checkAll_APP =
        checkedCount === this.flight_procedure.track_list.APP.length
      this.isIndeterminate_APP =
        checkedCount > 0 &&
        checkedCount < this.flight_procedure.track_list.APP.length
    },
    // 待修改 ↓
    // 进场程序
    the_arena_all_STAR (index) {
      this.STAR_list[index].STAR_whole_indeterminate = false
      var starGroup = []
      if (this.STAR_list[index].all_value_STAR) {
        var STAR_LIST_ = this.STAR_list[index].STAR_LIST
        if (STAR_LIST_ && STAR_LIST_.length > 0) {
          STAR_LIST_.forEach((item) => {
            starGroup.push(item)
          })
        }
      }
      this.STAR_list[index].STAR_group = starGroup
    },
    the_arena_STAR (index) {
      var STAR_LIST_ = this.STAR_list[index].STAR_LIST
      var starGroup = this.STAR_list[index].STAR_group
      this.STAR_list[index].all_value_STAR =
        starGroup.length === STAR_LIST_.length
      this.STAR_list[index].STAR_whole_indeterminate =
        starGroup.length > 0 && starGroup.length < STAR_LIST_.length
    },
    // 离场程序
    the_arena_all_SID (index) {
      this.SID_list[index].SID_whole_indeterminate = false
      var sidGroup = []
      if (this.SID_list[index].all_value_SID) {
        var SID_LIST_ = this.SID_list[index].SID_LIST
        if (SID_LIST_ && SID_LIST_.length > 0) {
          SID_LIST_.forEach((item) => {
            sidGroup.push(item)
          })
        }
      }
      this.SID_list[index].SID_group = sidGroup
    },
    the_arena_SID (index) {
      var SID_LIST_ = this.SID_list[index].SID_LIST
      var sidGroup = this.SID_list[index].SID_group
      this.SID_list[index].all_value_SID = sidGroup.length === SID_LIST_.length
      this.SID_list[index].SID_whole_indeterminate =
        sidGroup.length > 0 && sidGroup.length < SID_LIST_.length
    },
    // 进近程序
    the_arena_all_APP (index) {
      this.APP_list[index].APP_whole_indeterminate = false
      var appGroup = []
      if (this.APP_list[index].all_value_APP) {
        var APP_LIST_ = this.APP_list[index].APP_LIST
        if (APP_LIST_ && APP_LIST_.length > 0) {
          APP_LIST_.forEach((item) => {
            appGroup.push(item)
          })
        }
      }
      this.APP_list[index].APP_group = appGroup
    },
    the_arena_APP (index) {
      var APP_LIST_ = this.APP_list[index].APP_LIST
      var appGroup = this.APP_list[index].APP_group
      this.APP_list[index].all_value_APP = appGroup.length === APP_LIST_.length
      this.APP_list[index].APP_whole_indeterminate =
        appGroup.length > 0 && appGroup.length < APP_LIST_.length
    },
    // 重置跑道
    resettingRunway () {
      var that = this
      var map = that.map
      // STAR
      that.STAR_list.forEach((item, index) => {
        if (item.STAR_LIST.length > 0) {
          item.STAR_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // SID
      that.SID_list.forEach((item, index) => {
        if (item.SID_LIST.length > 0) {
          item.SID_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // APP
      that.APP_list.forEach((item, index) => {
        if (item.APP_LIST.length > 0) {
          item.APP_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
    },

    // 进场程序重置
    reset_enter_the () {
      this.form.list.Star_type = []
      // 全选按钮为空
      this.enter = false
      // 所有渲染的内容
      var trackList = this.threshold_list.Star
      var map = this.map
      // 选中的内容
      var starType = this.form.list.Star_type

      trackList.forEach((runItem, runIndex) => {
        if (starType.indexOf(runItem) < 0 && map.getSource(runItem)) {
          map.removeImage(runItem + 'arrowIcon1')
          map.removeLayer(runItem + '_route')
          map.removeLayer(runItem + '_fileNoTemp')
          map.removeSource(runItem)
        }
      })
    },

    // 离场程序重置
    reset_departure () {
      this.form.list.Sid_type = []
      // 全选按钮为空
      this.departure = false
      // 所有渲染的内容
      var trackList = this.threshold_list.Sid
      var map = this.map
      // 选中的内容
      var sidType = this.form.list.Sid_type

      trackList.forEach((runItem, runIndex) => {
        if (sidType.indexOf(runItem) < 0 && map.getSource(runItem)) {
          map.removeImage(runItem + 'arrowIcon1')
          map.removeLayer(runItem + '_route')
          map.removeLayer(runItem + '_fileNoTemp')
          map.removeSource(runItem)
        }
      })
    },
    // 进近程序重置
    reset_approach_list () {
      this.form.list.App_type = []
      // 全选按钮为空
      this.approach = false
      // 所有渲染的内容
      var trackList = this.threshold_list.App
      var map = this.map
      // 选中的内容
      var appType = this.form.list.App_type

      trackList.forEach((runItem, runIndex) => {
        if (appType.indexOf(runItem) < 0 && map.getSource(runItem)) {
          map.removeImage(runItem + 'arrowIcon1')
          map.removeLayer(runItem + '_route')
          map.removeLayer(runItem + '_fileNoTemp')
          map.removeSource(runItem)
        }
      })
    },

    // 跑道信息查询
    track_track () {
      var that = this
      var map = that.map
      var procedureArr = that.procedure_arr
      if (procedureArr.length > 0) {
        var runwayProcedure = this.unique(procedureArr)
        runwayProcedure.forEach(runItem => {
          if (map.getSource(runItem)) {
            map.removeLayer(runItem + '_route')
            map.removeLayer(runItem + '_fileNoTemp')
            map.removeSource(runItem)
          }
        })
        that.procedure_arr = []
      }
      that.threshold_list = {
        App: [],
        Sid: [],
        Star: []
      }
      // 进场程序
      that.enter = false
      that.Approach = false
      // 离场
      that.departure = false
      that.procedures = false
      // 进近
      that.approach = false
      that.program = false
      var trackList = this.flight_list.track_list
      var identList = []
      identList = identList.concat(
        trackList.APP,
        trackList.SID,
        trackList.STAR
      )
      if (identList.length > 0) {
        var data = {
          'airport': that.flight_procedure.airport_value,
          'pidList': identList,
          'typeList': that.flight_procedure.procedure_type
        }
        this.track_track_procedureLoading = true
        this.$axios({
          url: this.proxyUri + this.proxyInd + '/airport-geometry/getIdentList',
          method: 'post',
          data: data
        }).then((res) => {
          if (res.data.code === 0) {
            var list = res.data.data
            var objStar = list.STAR
            var starList = []
            for (let key in objStar) {
              var STAR = {
                'name': key,
                'STAR_procedures': [],
                'all_value_STAR': false,
                'STAR_whole_indeterminate': false,
                'enter': false,
                'STAR_LIST': objStar[key],
                'STAR_group': []
              }
              starList.push(STAR)
            }
            that.STAR_list = starList
            // SID
            var objSid = list.SID
            var sidList = []
            for (let key in objSid) {
              var SID = {
                'name': key,
                'SID_procedures': [],
                'all_value_SID': false,
                'SID_whole_indeterminate': false,
                'enter': false,
                'SID_LIST': objSid[key],
                'SID_group': []
              }
              sidList.push(SID)
            }
            that.SID_list = sidList
            // APP
            var objApp = list.APP
            var appList = []
            for (let key in objApp) {
              var APP = {
                'name': key,
                'APP_procedures': [],
                'all_value_APP': false,
                'APP_whole_indeterminate': false,
                'enter': false,
                'APP_LIST': objApp[key],
                'APP_group': []
              }
              appList.push(APP)
            }
            that.APP_list = appList
          }
          this.track_track_procedureLoading = false
        })
      }
    },

    // 查询
    onthreshold () {
      var that = this
      var map = that.map
      // STAR
      var starProcedure = []
      that.STAR_list.forEach((item, index) => {
        if (item.STAR_LIST.length > 0) {
          item.STAR_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
        if (item.STAR_group.length > 0) {
          item.STAR_group.forEach((_item, _index) => {
            starProcedure.push(_item)
          })
        }
      })
      // SID
      var sidProcedure = []
      that.SID_list.forEach((item, index) => {
        if (item.SID_LIST.length > 0) {
          item.SID_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
        if (item.SID_group.length > 0) {
          item.SID_group.forEach((_item, _index) => {
            sidProcedure.push(_item)
          })
        }
      })
      // APP
      var appProcedure = []
      that.APP_list.forEach((item, index) => {
        if (item.APP_LIST.length > 0) {
          item.APP_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
        if (item.APP_group.length > 0) {
          item.APP_group.forEach((_item, _index) => {
            appProcedure.push(_item)
          })
        }
      })

      var trackList = that.flight_list.track_list
      var ALL_LIST = []
      ALL_LIST = ALL_LIST.concat(starProcedure, sidProcedure, appProcedure)

      if (ALL_LIST.length > 0) {
        var pidList = []
        pidList = pidList.concat(trackList.APP, trackList.SID, trackList.STAR)
        var data = {
          'airport': that.flight_procedure.airport_value,
          'identList': ALL_LIST,
          'pidList': pidList,
          'typeList': that.flight_procedure.procedure_type
        }
        // 跑道
        var STAR = trackList.STAR
        var SID = trackList.SID
        var APP = trackList.APP
        this.onthreshold_procedureLoading = true
        this.$axios({
          url: this.proxyUri + this.proxyInd + '/airport-geometry/getDataList',
          method: 'post',
          data: data
        }).then((res) => {
          var list = res.data.data
          if (STAR.length > 0) {
            var arr = []
            for (let key in list.STAR) {
              arr.push(list.STAR[key])
            }
            arr.forEach((item, index) => {
              for (var key in item) {
                that.procedure_arr.push(key)
                if (map.getSource(key)) {
                  map.removeLayer(key + '_route')
                  map.removeLayer(key + '_fileNoTemp')
                  map.removeSource(key)
                }
                var animatePointGeoJson = {
                  'type': 'FeatureCollection',
                  'features': []
                }
                item[key].forEach((_item, index) => {
                  let a = {
                    'type': 'Feature',
                    'geometry': that.getWkbBuffer(_item)
                  }
                  animatePointGeoJson.features.push(a)
                })
                that.flight_course(key, animatePointGeoJson, '#009BF2')
              }
            })
          }
          if (SID.length > 0) {
            that.threshold_list.Sid.forEach((item, index) => {
              if (map.getSource(item)) {
                map.removeLayer(item + '_route')
                map.removeLayer(item + '_fileNoTemp')
                map.removeSource(item)
              }
            })
            var arrData = []
            for (let key in list.SID) {
              arrData.push(list.SID[key])
            }
            arrData.forEach((item, index) => {
              for (var key in item) {
                that.procedure_arr.push(key)
                if (map.getSource(key)) {
                  map.removeLayer(key + '_route')
                  map.removeLayer(key + '_fileNoTemp')
                  map.removeSource(key)
                }
                var animatePointGeoJson = {
                  'type': 'FeatureCollection',
                  'features': []
                }
                item[key].forEach((_item, index) => {
                  let a = {
                    'type': 'Feature',
                    'geometry': that.getWkbBuffer(_item)
                  }
                  animatePointGeoJson.features.push(a)
                })
                that.flight_course(key, animatePointGeoJson, '#0FB900')
              }
            })
          }
          if (APP.length > 0) {
            that.threshold_list.App.forEach((item, index) => {
              if (map.getSource(item)) {
                map.removeLayer(item + '_route')
                map.removeLayer(item + '_fileNoTemp')
                map.removeSource(item)
              }
            })
            var arrList = []
            for (let key in list.APP) {
              arrList.push(list.APP[key])
            }
            arrList.forEach((item, index) => {
              for (var key in item) {
                that.procedure_arr.push(key)
                if (map.getSource(key)) {
                  map.removeLayer(key + '_route')
                  map.removeLayer(key + '_fileNoTemp')
                  map.removeSource(key)
                }
                var animatePointGeoJson = {
                  'type': 'FeatureCollection',
                  'features': []
                }
                item[key].forEach((_item, index) => {
                  let a = {
                    'type': 'Feature',
                    'geometry': that.getWkbBuffer(_item)
                  }
                  animatePointGeoJson.features.push(a)
                })
                that.flight_course(key, animatePointGeoJson, '#BC9E60')
              }
            })
          }
          this.onthreshold_procedureLoading = false
        })
      }
    },

    getWkbBuffer (system) {
      var wkbBuffer = new Buffer(system, 'hex')
      var geometry = wkx.Geometry.parse(wkbBuffer)
      return geometry.toGeoJSON()
    },
    flight_course (nam, animatePointGeoJson, color) {
      var map = this.map
      map.addSource(nam, {
        type: 'geojson',
        data: animatePointGeoJson
      })
      map.addLayer({
        id: nam + '_route',
        type: 'line',
        source: nam,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': color,
          'line-width': 3
        }
      })
      map.addLayer({
        id: nam + '_fileNoTemp',
        type: 'symbol',
        source: nam,
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 50, // 图标间隔，默认为250
          'icon-image': 'arrowIcon1', // 箭头图标
          'icon-size': 1
        }
      })
    },
    // 去重
    unique (arr) {
      var res = []
      var json = {}
      for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
          res.push(arr[i])
          json[arr[i]] = 1
        }
      }
      return res
    },
    hangXianMap (fileNo, departureAirport, flightNo, arrivalAirport, flightTime, acTail) {
      var _this = this
      var map = _this.map
      // 多条航线开始
      var routeGeoJsonArr = {}
      var realRouteGeoJsonArr = {}
      var animatePointGeoJsonArr = {}
      var newRouteGeoJsonArr = {}
      var routeMap = {}
      var isPlay = false
      var fileNoTemp = fileNo
      // 航班点
      var FlightPoints = {}
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/flight-track-data/track',
        method: 'get',
        params: {
          'fileNo': fileNo
        }
      }).then((res) => {
        if (res && res.data.data && res.data.data.length > 0) {
          var coordinates = []
          var _points = []
          var time = flightTime
          time = time.replace(new RegExp('-', 'gm'), '/')
          let timeM = (new Date(time)).getTime() // 得到毫秒数
          res.data.data.forEach((item, index) => {
            coordinates.push([item.lonp, item.latp])
            let AsData = new Date(timeM + (index * 1000))
            var year = AsData.getFullYear()
            var month = (AsData.getMonth() + 1) > 9 ? (AsData.getMonth() + 1) : '0' + (
              AsData.getMonth() + 1)
            var date = AsData.getDate() > 9 ? AsData.getDate() : '0' + AsData.getDate()
            var hour = AsData.getHours() > 9 ? AsData.getHours() : '0' + AsData.getHours()
            var minu = AsData.getMinutes() > 9 ? AsData.getMinutes() : '0' + AsData
              .getMinutes()
            var sec = AsData.getSeconds() > 9 ? AsData.getSeconds() : '0' + AsData
              .getSeconds()
            AsData = `${year}-${month}-${date} ${hour}:${minu}:${sec}`
            var wayPoint = {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [item.lonp, item.latp]
              },
              'properties': {
                // 当前点时间
                'flightTime': AsData,
                // 出发机场
                'departureAirport': departureAirport,
                // 航班号
                'flightNo': flightNo,
                // 降落机场
                'arrivalAirport': arrivalAirport
              }
            }
            _points.push(wayPoint)
          })
          var data = {
            'type': 'FeatureCollection',
            'features': _points
          }
          _this.timertext = ''
          FlightPoints[fileNoTemp] = data
          var xmlJson = {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              },
              'properties': {
                // 出发机场
                'departureAirport': departureAirport,
                // 航班号
                'flightNo': flightNo,
                // 降落机场
                'arrivalAirport': arrivalAirport,
                // 起飞时间
                'flightTime': flightTime,
                // 机号
                'acTail': acTail
              }
            }]
          }

          routeGeoJsonArr[fileNoTemp] = xmlJson
          realRouteGeoJsonArr[fileNoTemp] = {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': []
              }
            }]
          }
          animatePointGeoJsonArr[fileNoTemp] = {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Point',
                'coordinates': []
              }
            }]
          }
        } else {
          this.$message.error('暂无航迹')
          return
        }
        // 获取轨迹数据
        function setRouteDataArr () {
            var arrColor = ['#ADE459', '#2CCDA3', '#008461', '#0F4BCA', '#09A5FC', '#039B00', '#5D75F9', '#002C83', '#3DA47B', '#CD9B15']
            let color = Math.floor(Math.random() * arrColor.length)
            var counter = 0
            var steps = 0
            animatePointGeoJsonArr[fileNoTemp].features[0].geometry.coordinates = routeGeoJsonArr[fileNoTemp].features[0].geometry.coordinates[0]
            var aLength = routeGeoJsonArr[fileNoTemp].features[0].geometry.coordinates.length
            var newRouteGeoJson = resetRoute(routeGeoJsonArr[fileNoTemp].features[0], 1000,
              'kilometers', aLength)
            newRouteGeoJsonArr[fileNoTemp] = newRouteGeoJson
            steps = newRouteGeoJson.geometry.coordinates.length
            // 添加轨迹线图层
            map.addLayer({
              'id': 'routeLayer' + fileNoTemp,
              'type': 'line',
              'source': {
                'type': 'geojson',
                'lineMetrics': true,
                'data': routeGeoJsonArr[fileNoTemp]
              },
              'paint': {
                'line-width': 5,
                'line-color': arrColor[color]
              }
              // "minzoom": 3,
            })
            // 添加实时轨迹线图层
            map.addLayer({
              'id': 'realRouteLayer' + fileNoTemp,
              'type': 'line',
              'source': {
                'type': 'geojson',
                'lineMetrics': true,
                'data': realRouteGeoJsonArr[fileNoTemp]
              },
              'paint': {
                'line-width': 6,
                'line-color': arrColor[color]
              }
              // "minzoom":3,
            })
            // 添加箭头图层
            map.addLayer({
              'id': 'arrowLayer' + fileNoTemp,
              'type': 'symbol',
              'source': {
                'type': 'geojson',
                'data': routeGeoJsonArr[fileNoTemp] // 轨迹geojson格式数据
              },
              'layout': {
                'symbol-placement': 'line',
                'symbol-spacing': 50, // 图标间隔，默认为250
                'icon-image': 'arrowIcon', // 箭头图标
                'icon-size': 1
              }
              // "minzoom":3,
            })
            // 添加动态点图层
            map.addLayer({
              'id': 'animatePointLayer' + fileNoTemp,
              'type': 'symbol',
              'source': {
                'type': 'geojson',
                'data': animatePointGeoJsonArr[fileNoTemp]
              },
              'layout': {
                'icon-image': 'carIcon',
                'icon-size': 0.5,
                'icon-rotate': ['get', 'bearing'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
              }
              // "minzoom": 3,
            })
            // 航班点
            map.addSource('dot' + fileNoTemp, {
              'type': 'geojson',
              'data': FlightPoints[fileNoTemp]
            })
            map.addLayer({
              'id': 'markers' + fileNoTemp,
              'source': 'dot' + fileNoTemp,
              'type': 'circle',
              'paint': {
                'circle-radius': 6,
                'circle-color': '#FFA048'
              },
              'minzoom': 6
              // "maxzoom": 18,
            })
            routeMap[fileNoTemp] = {
              'counter': counter,
              'steps': steps,
              'newRouteGeoJson': newRouteGeoJson,
              'realRouteGeoJson': realRouteGeoJsonArr[fileNoTemp],
              'animatePointGeoJson': animatePointGeoJsonArr[fileNoTemp]
            }

            _animateAll()
          }

          _this.routeMap_list[fileNoTemp] = routeMap

          function _animateAll () {
            var _route = routeMap[fileNoTemp]
            if (_route.counter >= _route.steps) {
              // return
            } else {
              var startPnt, endPnt
              if (_route.counter === 0) {
                _route.realRouteGeoJson.features[0].geometry.coordinates = []
                startPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter]
                endPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter + 1]
              } else if (_route.counter !== 0) {
                startPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter - 1]
                endPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter]
              }
              _route.animatePointGeoJson.features[0].properties.bearing = turf.bearing(turf
                .point(startPnt), turf.point(endPnt)
              )
              _route.animatePointGeoJson.features[0].geometry.coordinates = _route
                .newRouteGeoJson.geometry.coordinates[_route.counter]
              _route.realRouteGeoJson.features[0].geometry.coordinates.push(_route
                .animatePointGeoJson.features[0].geometry.coordinates)

              map.getSource('animatePointLayer' + fileNoTemp).setData(_route.animatePointGeoJson)
              map.getSource('realRouteLayer' + fileNoTemp).setData(_route.realRouteGeoJson)
              var monument = startPnt
              var el = document.createElement('div')
              el.id = 'marker_list' + fileNoTemp
              el.style = 'width:120px;color: rgba(58, 0, 153, 0.97);text-shadow: 0px 0px 8px #6E12B7;top:-60px'
              el.innerHTML = '时间:' + routeGeoJsonArr[fileNoTemp].features[0].properties
                .flightTime + '</br>起飞机场:' + routeGeoJsonArr[fileNoTemp].features[0].properties
                .departureAirport + '</br>航班号:' + routeGeoJsonArr[fileNoTemp].features[0]
                .properties.flightNo + '</br>降落机场:' + routeGeoJsonArr[fileNoTemp].features[0]
                .properties.arrivalAirport + ' </br>机号:' + routeGeoJsonArr[fileNoTemp]
                .features[0].properties.acTail
              new mapboxgl.Marker(el).setLngLat(monument).addTo(map)
              if (isPlay) {
                _route.counter = _route.counter + 1
              }
            }
            if (isPlay) {
              requestAnimationFrame(_animateAll)
            }
          }
          // var one = null

          function resetRoute (route, nstep, units, aLength) {
            var newroute = {
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': []
              }
            }
            var lineDistance = turf.lineDistance(route)
            var nDistance = lineDistance / nstep
            for (let i = 0; i < aLength - 1; i++) {
              var from = turf.point(route.geometry.coordinates[i])
              var to = turf.point(route.geometry.coordinates[i + 1])
              let lDistance = turf.distance(from, to, {
                units: units
              })
              if (i === 0) {
                newroute.geometry.coordinates.push(route.geometry.coordinates[0])
              }
              if (lDistance > nDistance) {
                let rings = lineMore(from, to, lDistance, nDistance, units)
                newroute.geometry.coordinates = newroute.geometry.coordinates.concat(rings)
              } else {
                newroute.geometry.coordinates.push(route.geometry.coordinates[i + 1])
              }
            }
            return newroute
          }

          function lineMore (from, to, distance, splitLength, units) {
            var step = parseInt(distance / splitLength)
            var leftLength = distance - step * splitLength
            var rings = []
            var route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
            for (let i = 1; i <= step; i++) {
              let nlength = i * splitLength
              let pnt = turf.along(route, nlength, {
                units: units
              })
              rings.push(pnt.geometry.coordinates)
            }
            if (leftLength > 0) {
              rings.push(to.geometry.coordinates)
            }
            return rings
          }

          // 多条航线结束
          setRouteDataArr()

          map.on('click', 'routeLayer' + fileNoTemp, function (e) {
            _this.path_name.push(fileNoTemp)
            _this.flightNo_list.push(flightNo)

            $('.flight_procedure_right').show()
            // var name = _this.unique(_this.path_name)
            var flightNolist = _this.unique(_this.flightNo_list)
            var a = flightNolist.pop()
            var b = flightNolist.pop()
            if (b === undefined || b == null) {
              b = a
            }
            var c = _this.unique([a, b])
            if (c.length > 0) {
              _this.flightNo_list = c
            }

            var pathNameLi = _this.unique(_this.path_name)
            var a1 = pathNameLi.pop()
            var b1 = pathNameLi.pop()
            if (b1 === undefined || b1 == null) {
              b1 = a1
            }
            var c1 = _this.unique([a1, b1])
            if (c1.length > 0) {
              _this.path_name = c1
            }
          })
      })
    },
    startClick () {
      var that = this
      var pathName = that.unique(that.path_name)
      var a = pathName.pop()
      var b = pathName.pop()
      if (b === undefined || b == null) {
        b = a
      }
      var c = that.unique([a, b])
      if (c.length > 0) {
        c.forEach((item, _index) => {
          var isPlay = true
          that.one_fileNoTemp = item
          that.accumulation(item, isPlay)
        })
      }
    },
    // 暂停
    pauseClick () {
      var that = this
      that.one_fileNoTemp = null
    },
    // 回放
    stopClick () {
      var that = this
      var pathName = that.unique(that.path_name)
      if (pathName.length > 0) {
        pathName.forEach((pathName, _index) => {
          var isPlay = true
          that.one_fileNoTemp = pathName
          that.routeMap_list[pathName][pathName].counter = 0
          that.accumulation(pathName, isPlay)
        })
      }
    },
    // 航线循环飞行
    accumulation (fileNoTemp, isPlay) {
      var that = this
      var map = that.map
      var one = that.one_fileNoTemp
      if (!one) {
        return
      }
      var _route = that.routeMap_list[fileNoTemp][fileNoTemp]
      if (_route.counter >= _route.steps) {
        return
      }
      var startPnt, endPnt
      if (_route.counter === 0) {
        _route.realRouteGeoJson.features[0].geometry.coordinates = []
        startPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter]
        endPnt =
          _route.newRouteGeoJson.geometry.coordinates[_route.counter + 1]
      } else if (_route.counter !== 0) {
        startPnt =
          _route.newRouteGeoJson.geometry.coordinates[_route.counter - 1]
        endPnt = _route.newRouteGeoJson.geometry.coordinates[_route.counter]
      }
      _route.animatePointGeoJson.features[0].properties.bearing = turf.bearing(
        turf.point(startPnt),
        turf.point(endPnt)
      )
      _route.animatePointGeoJson.features[0].geometry.coordinates =
        _route.newRouteGeoJson.geometry.coordinates[_route.counter]
      _route.realRouteGeoJson.features[0].geometry.coordinates.push(
        _route.animatePointGeoJson.features[0].geometry.coordinates
      )

      map
        .getSource('animatePointLayer' + fileNoTemp)
        .setData(_route.animatePointGeoJson)
      map
        .getSource('realRouteLayer' + fileNoTemp)
        .setData(_route.realRouteGeoJson)
      if (isPlay) {
        _route.counter = _route.counter + 1
      }
      if (isPlay) {
        requestAnimationFrame(() => {
          that.accumulation(fileNoTemp, isPlay)
        })
      }
    },
    // 测距
    ranging () {
      this.ranging_T = !this.ranging_T
      var _this = this
      var map = this.map
      if (this.ranging_T) {
        _this.distanceContainer = document.getElementById('distance')
        _this.geojson = {
          type: 'FeatureCollection',
          features: []
        }
        _this.linestring = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }

        map.addSource('geojson', {
          type: 'geojson',
          data: _this.geojson
        })

        // Add styles to the map
        map.addLayer({
          id: 'measure-points',
          type: 'circle',
          source: 'geojson',
          paint: {
            'circle-radius': 5,
            /* circle半径，单位像素 */
            'circle-color': '#000' /* circle颜色 */
          },
          filter: ['in', '$type', 'Point'] /* 依据数据中type过滤 */
        })
        map.addLayer({
          id: 'measure-lines',
          type: 'line',
          source: 'geojson',
          layout: {
            'line-cap': 'round',
            /* 线条末端样式 */
            'line-join': 'round' /* 线条相交处样式 */
          },
          paint: {
            'line-color': '#000',
            /* 线条颜色 */
            'line-width': 2.5 /* 线条宽度 */
          },
          filter: ['in', '$type', 'LineString']
        })
        map.on('click', _this.lineSize)
        map.getCanvas().style.cursor = 'crosshair' /* 设置光标格式 */
      } else {
        map.off('click', _this.lineSize)
        // grab、grabbing、not-allowed、crosshair、pointer
        map.getCanvas().style.cursor = 'grab' /* 设置光标格式 */
        map.removeLayer('measure-lines')
        map.removeLayer('measure-points')
        map.removeSource('geojson')
        _this.distanceContainer.innerHTML = ''
      }
    },
    // 测距事件
    lineSize (e) {
      var _this = this
      var map = _this.map
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
      }) /* 返回满足查询条件参数的可视化GeoJSON特性对象数组 */
      // Remove the linestring from the group
      // So we can redraw it based on the points collection
      // if (geojson.features.length > 1) geojson.features.pop();
      // Clear the Distance container to populate it with a new value
      if (_this.geojson.features.length > 1) {
        _this.geojson.features = []
      }
      _this.distanceContainer.innerHTML = '' /* 清空html文本内容 */
      // If a feature was clicked, remove it from the map
      if (features.length) {
        var id = features[0].properties.id
        _this.geojson.features = _this.geojson.features.filter(function (
          point
        ) {
          /* array.filter(callback):根据callback过滤元素组成新的数组 */
          return point.properties.id !== id
        })
      } else {
        var point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [e.lngLat.lng, e.lngLat.lat]
          },
          properties: {
            id: String(new Date().getTime())
          }
        }
        _this.geojson.features.push(point) /* 新增元素 */
      }
      if (_this.geojson.features.length > 1) {
        _this.linestring.geometry.coordinates = _this.geojson.features.map(
          function (point) {
            /* array.map(callback) :根据callback对数组元素进行变换*/
            return point.geometry.coordinates
          }
        )
        _this.geojson.features.push(_this.linestring) /* 新增数组元素 */
        // Populate the distanceContainer with total distance
        /* pre 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。 */
        var value = document.createElement('pre')

        // 终点相对于起点的顺时针偏离角度
        var angle = turf.angle(
          _this.linestring.geometry.coordinates[0],
          _this.linestring.geometry.coordinates[1],
          _this.linestring.geometry.coordinates[1]
        )
        angle = angle.toFixed(2)
        /* .textContent设置文本内容,toLocaleString():把数组转换为本地字符串。turf.lineDistance(geojson):这里猜测应该是turf.js库的函数 */
        value.textContent =
          '总距离：' +
          turf.lineDistance(_this.linestring).toLocaleString() +
          'km，偏离角度：' +
          angle +
          '°'

        value.style = 'padding: 0 10px;margin: 0 !important;height: 36px;'
        _this.distanceContainer.appendChild(
          value
        ) /* appendChild() 向元素内的最后添加子元素 */
      }
      map
        .getSource('geojson')
        .setData(
          _this.geojson
        ) /* getSource(id):获取对应的source，setData(data)：设置source上的data数据 */
    },
    // 图片上传返回成功的钩子
    handleAvatarSuccess (res, file, fileList) {
      // 确保上传一张图片
      this.fileList = fileList.slice(-1)
      // 上传成功返回的图片对应的id
      this.save.fileId = res.data.id
      // 上传成功返回的图片地址
      this.save.fileUrl = res.data.url
      // 移除表单校验
      // this.$refs['uploadElement'].clearValidate();
    },
    // 图片信息上传按钮
    save_btn (formName) {
      var that = this
      var map = that.map
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = that.save
          if (map.getSource('point' + data.fileId)) {
            map.removeImage('gradient' + data.fileId)
            map.removeLayer('pointsbizId' + data.fileId)
            map.removeSource('point' + data.fileId)
          }
          this.$axios({
            url: this.proxyUri + this.proxyInd + '/airport/save',
            data: data,
            method: 'post'
          }).then((res) => {
            if (res.data.code === 0) {
              that.$message.success('上传' + res.data.msg)
              that.save = {
                // 机场
                'airport': '',
                // 文件描述
                'fileDesc': '',
                // 文件ID
                'fileId': 0,
                // 文件名称
                'fileName': '',
                // 不传默认10
                'fileStatus': 10,
                // 1-进近，2-进场，3-离场
                'fileType': 1,
                // 文件地址
                'fileUrl': '',
                // 经纬度
                'latLon': '',
                'long': '',
                'lat': ''
              }
              this.fileList = []
            }
          })
        } else {
          return false
        }
      })
    },
    createFilter_airport (queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect (item) {
      const coords = item.longitude + ',' + item.latitude
      this.save.latLon = coords
      this.save.lat = item.latitude
      this.save.long = item.longitude
    },
    // 预览图片
    preview_btn (formName) {
      var that = this
      var map = this.map
      var files = this.save
      that.$refs[formName].validate((valid) => {
        if (valid) {
          var upperLeft = []
          upperLeft.push(Number(files.long), Number(files.lat))
          this.save.latLon = files.long + ',' + files.lat
          map.loadImage(this.getCurrentDomainUrl(files.fileUrl), (error, image) => {
            if (error) throw error
            if (!map.hasImage('gradient' + files.fileId)) {
              map.addImage('gradient' + files.fileId, image)
              map.addSource('point' + files.fileId, {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: upperLeft
                      }
                    }
                  ]
                }
              })
              map.addLayer({
                id: 'pointsbizId' + files.fileId,
                type: 'symbol',
                source: 'point' + files.fileId,
                layout: {
                  'icon-image': 'gradient' + files.fileId
                },
                maxZoom: 20,
                minZoom: 1,
                paint: {
                  'icon-opacity': 0.6
                }
              })
            }
            const canvas = map.getCanvasContainer()
            const geojson = {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [0, 0]
                }
              }]
            }

            function onMove (e) {
              const coords = e.lngLat
              geojson.features[0].geometry.coordinates = [coords.lng, coords.lat]
              map.getSource('point' + files.fileId).setData(geojson)
            }

            function onUp (e) {
              const coords = e.lngLat.lng + ',' + e.lngLat.lat
              that.save.latLon = coords
              map.off('mousemove', onMove)
              map.off('touchmove', onMove)
            }
            map.on('mousedown', 'pointsbizId' + files.fileId, (e) => {
              e.preventDefault()
              canvas.style.cursor = 'grab'
              map.on('mousemove', onMove)
              map.once('mouseup', onUp)
            })
            map.on('touchstart', 'pointsbizId' + files.fileId, (e) => {
              if (e.points.length !== 1) return
              e.preventDefault()
              map.on('touchmove', onMove)
              map.once('touchend', onUp)
            })
          })
        } else {
          return false
        }
      })
    },
    // 撤销预览
    Cancel_the_preview_btn () {
      var map = this.map
      var save = this.save
      var data = this.save
      if (save.fileId) {
        if (map.getSource('point' + data.fileId)) {
          map.removeImage('gradient' + data.fileId)
          map.removeLayer('pointsbizId' + data.fileId)
          map.removeSource('point' + data.fileId)
        }
      }
    },
    // kml航迹查询
    getKmlFileList_init () {
      var that = this
      that.tableData = []
      var list = this.form_track
      // 结束时间
      if (!list.time) {
        // 结束时间
        list.model.endDateTime = ''
        // 开始时间
        list.model.startDateTime = ''
      } else {
        // 结束时间
        list.model.endDateTime = list.time + ' ' + '23:59:59'
        // 开始时间
        list.model.startDateTime = list.time + ' ' + '00:00:00'
      }
      this.fullscreenLoading = true
      this.getKmlFileList(list)
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.form_track.current = val
      this.getKmlFileList_init()
    },
    getKmlFileList (data) {
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/flight-track-data/flight',
        method: 'post',
        data: data
      }).then((res) => {
        if (res.data.code === 0) {
          let result = res.data.data
          var list = result.records
          this.fullscreenLoading = false
          if (list.length > 0) {
            list.forEach((item, index) => {
              item['eliminate'] = false
              item['weather'] = false
            })
            this.tableData = list
            this.form_track.current = Number(result.current)
            this.form_track.size = Number(result.size)
            this.total = Number(result.total)
          } else {
            this.tableData = list
            this.form_track.current = Number(result.current)
            this.form_track.size = Number(result.size)
            this.total = Number(result.total)
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 单个航迹查询
    Track_the_query (row) {
      var that = this
      var map = this.map
      var fileNo = row.fileNo
      var departureAirport = row.departureAirport
      var flightNo = row.flightNo
      var arrivalAirport = row.arrivalAirport
      var flightTime
      var acTail = row.acTail

      if (that.timertext === '' || that.timertext == null) {
        flightTime = row.takeoffDateTime
      } else {
        flightTime = that.timertext
      }

      that.tableData.forEach(item => {
        if (item.fileNo === fileNo) {
          item.eliminate = true
          item.weather = true
        }
      })
      $('#marker_list' + fileNo).remove()
      if (map.getLayer('animatePointLayer' + fileNo)) {
        map.removeLayer('animatePointLayer' + fileNo)
      }
      if (map.getLayer('routeLayer' + fileNo)) {
        map.removeLayer('routeLayer' + fileNo)
      }
      if (map.getLayer('realRouteLayer' + fileNo)) {
        map.removeLayer('realRouteLayer' + fileNo)
      }
      if (map.getLayer('arrowLayer' + fileNo)) {
        map.removeLayer('arrowLayer' + fileNo)
      }

      if (map.getLayer('markers' + fileNo)) {
        map.removeLayer('markers' + fileNo)
      }

      if (map.getLayer('overload' + fileNo)) {
        map.removeLayer('overload' + fileNo)
      }

      if (map.getSource('point' + fileNo)) {
        map.removeSource('point' + fileNo)
      }

      if (map.getSource('dot' + fileNo)) {
        map.removeSource('dot' + fileNo)
      }

      if (map.getSource('animatePointLayer' + fileNo)) {
        map.removeSource('animatePointLayer' + fileNo)
      }
      if (map.getSource('routeLayer' + fileNo)) {
        map.removeSource('routeLayer' + fileNo)
      }
      if (map.getSource('realRouteLayer' + fileNo)) {
        map.removeSource('realRouteLayer' + fileNo)
      }
      if (map.getSource('arrowLayer' + fileNo)) {
        map.removeSource('arrowLayer' + fileNo)
      }

      // 保存当前选择航迹的fileNo 以便删除使用
      that.track_fileId.push(fileNo)
      if (row.fileNo) {
        that.hangXianMap(
          fileNo,
            departureAirport,
            flightNo,
          arrivalAirport,
          flightTime,
          acTail
        )
        // 航班信息点
        map.on('click', 'markers' + fileNo, function (e) {
          if (document.getElementById('marker_list')) {
            document.getElementById('marker_list').remove()
          }
          var features = map.queryRenderedFeatures(e.point, {
            layers: ['markers' + fileNo]
          })
          if (features.length) {
            let properties = e.features[0].properties
            var clickPoint = e.lngLat // 获取点击的点坐标
            var clickPointTemp = clickPoint + ''
            var lngLatStrArr = clickPointTemp.split('(')
            var lngLatArr = lngLatStrArr[1].split(',')
            var lng = lngLatArr[0]
            var lat = lngLatArr[1].substring(0, lngLatArr[1].length - 1)
            var monument = [lng, lat]
            var popup = new mapboxgl.Popup({
              offset: 25
            }).setHTML(
              '时间:' +
                properties.flightTime +
                '</br>出发机场:' +
                properties.departureAirport +
                '</br>航班号:' +
                properties.flightNo +
                '</br>降落机场:' +
                properties.arrivalAirport
            )
            var el = document.createElement('div')
            el.id = 'marker_list'
            el.style = 'width:200px;height:100px;'
            new mapboxgl.Marker(el)
              .setLngLat(monument)
              .setPopup(popup)
              .addTo(map)
          }
        })
      }
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/flight/operation/mapbox/vertical-overload',
        method: 'post',
        data: {
          FILE_NO: fileNo
        }
      }).then((res) => {
        var data = res.data.data
        if (data.features.length > 0) {
          map.addSource('point' + fileNo, {
            'type': 'geojson',
            'data': data
          })
          map.addLayer({
            'id': 'overload' + fileNo,
            'source': 'point' + fileNo,
            'type': 'circle',
            'paint': {
              'circle-radius': 10,
              'circle-color': '#8B5DEC'
            }
          })
        }
      })
      map.on('click', 'overload' + fileNo, function (e) {
        if (document.getElementById('marker_list')) {
          document.getElementById('marker_list').remove()
        }
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['overload' + fileNo]
        })
        if (features.length) {
          var properties = features[0].properties
          var coordinates = JSON.parse(properties.coordinates)
          var popup = new mapboxgl.Popup({
            offset: 25
          }).setHTML(
            '经度:' +
              coordinates[0] +
              '</br>纬度:' +
              coordinates[1] +
              '</br>航班号:' +
              properties.name +
              '</br>垂直过载值:' +
              properties.vrtg
          )
          var el = document.createElement('div')
          el.id = 'marker_list'
          el.style = 'width:200px;height:100px;'
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map)
        }
      })
    },
    // 修正航迹
    Track_correction (row) {
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/flight-track-data/call-script',
        method: 'post',
        params: {
          'fileNo': row.fileNo
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.getKmlFileList_init()
        } else {
          this.$message.error('修正' + res.data.msg)
        }
      })
    },
    // 编辑时间
    edit_session (row) {
      var that = this
      var flightTime = row.takeoffDateTime
      var a = flightTime.split(' ')
      // 年月日
      that.YTD = a[0]
      // 时分秒
      that.hour = a[1]
      that.take_off_dialog = true
    },
    // 查看单个航迹天气
    weather_btn (row) {
      this.arrival_weather = {}
      this.takeoff_weather = {}
      var that = this
      var fileNo = row.fileNo
      // 起飞机场
      var departureAirport = row.departureAirport
      // 到达机场
      var arrivalAirport = row.arrivalAirport
      if (fileNo) {
        // 航班号
        this.$axios({
          url: this.proxyUri + this.proxyInd + '/flight-track-data/weather',
          method: 'post',
          data: {
            'FILE_NO': fileNo
          }
        }).then((res) => {
          if (res.data.code === 0) {
            that.dialogweather = true
            res.data.data.forEach(item => {
              if (item.APTLCAO_CODE === departureAirport) {
                this.arrival_weather = item
              } else if (item.APTLCAO_CODE === arrivalAirport) {
                this.takeoff_weather = item
              }
            })
          } else {
            that.$message.error(res.data.msg)
          }
        })
      }
    },
    // 删除单个航迹
    Track_is_deleted (row) {
      var that = this
      var map = this.map
      var fileNo = row.fileNo
      var pathName = that.unique(that.path_name)
      that.path_name = pathName
      pathName.forEach((item, index) => {
        if (item === fileNo) {
          let index = that.path_name.indexOf(item)
          that.path_name.splice(index, 1)
        }
      })

      if (this.tableData.length > 0) {
        this.tableData.forEach((item, index) => {
          if (item.fileNo === fileNo) {
            item.eliminate = false
            if (map.getLayer('animatePointLayer' + item.fileNo)) {
              map.removeLayer('animatePointLayer' + row.fileNo)
            }
            if (map.getLayer('routeLayer' + item.fileNo)) {
              map.removeLayer('routeLayer' + row.fileNo)
            }
            if (map.getLayer('realRouteLayer' + item.fileNo)) {
              map.removeLayer('realRouteLayer' + row.fileNo)
            }
            if (map.getLayer('arrowLayer' + item.fileNo)) {
              map.removeLayer('arrowLayer' + row.fileNo)
            }

            if (map.getLayer('markers' + item.fileNo)) {
              map.removeLayer('markers' + item.fileNo)
            }

            if (map.getLayer('overload' + item.fileNo)) {
              map.removeLayer('overload' + item.fileNo)
            }

            if (map.getSource('point' + item.fileNo)) {
              map.removeSource('point' + item.fileNo)
            }

            if (map.getSource('animatePointLayer' + item.fileNo)) {
              map.removeSource('animatePointLayer' + row.fileNo)
            }
            if (map.getSource('routeLayer' + item.fileNo)) {
              map.removeSource('routeLayer' + row.fileNo)
            }
            if (map.getSource('realRouteLayer' + item.fileNo)) {
              map.removeSource('realRouteLayer' + row.fileNo)
            }
            if (map.getSource('arrowLayer' + item.fileNo)) {
              map.removeSource('arrowLayer' + row.fileNo)
            }

            if (map.getSource('dot' + item.fileNo)) {
              map.removeSource('dot' + item.fileNo)
            }

            this.acTail_li = ''

            $('#marker_list' + item.fileNo).remove()
            $('.flight_procedure_right').hide()
            this.flight_procedure_right = false
          }
        })
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 飞行程序 单选
    ground_rule (e) {
      this.save.fileType = e
    },
    // 机场图层查询
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.airport_data = []
          this.irportTableloading = true
          this.get_ruleForm()
        } else {
          return false
        }
      })
    },
    // 机场图层取消按钮
    coverage_cancel () {
      this.ruleForm.airport = ''
      this.dialogAirport = false
    },
    // 机场图层数据查询
    get_ruleForm () {
      this.$axios({
        url: this.proxyUri + this.proxyInd + '/airport/getList',
        data: this.ruleForm,
        method: 'post'
      }).then((res) => {
        let result = res.data
        let code = result.code
        let data = result.data
        this.irportTableloading = false
        if (code === 0 && data.length > 0) {
          var airportData = []
          data.forEach((item, index) => {
            var a = {
              //
              'id': item.id,
              // 机场
              'airport': item.airport,
              // 图片名称
              'fileName': item.fileName,
              // 图片地址
              'fileUrl': item.fileUrl,
              // 经度纬度
              'latLon': item.latLon,
              // 上传时间
              'uploadTime': item.uploadTime,
              // 飞行程序
              'fileType': item.fileType,
              // 下标
              'index': index,
              // 隐藏移除按钮
              'shift_out': false,
              //
              'fileId': item.fileId,
              // 编辑
              'compile': false
            }
            airportData.push(a)
          })
          this.airport_data = airportData
        } else {
          this.$message.error('暂无数据')
        }
      })
    },
    // 飞行程序转换
    formatter (row, column) {
      if (row.fileType === 1) {
        return '进近'
      }

      if (row.fileType === 2) {
        return '进场'
      }

      if (row.fileType === 3) {
        return '离场'
      }
    },
    // 文件列表查看
    handleClick (row) {
      let that = this
      var map = that.map
      let files = row
      that.picture_fileId.push(files.fileId)
      let latLon = []
      let a = files.latLon.split(',')
      let rowIndex = row.index
      that.airport_data.forEach((item, index) => {
        if (item.index === rowIndex) {
          item.shift_out = true
          item.compile = true
        }
      })
      latLon.push(Number(a[0]), Number(a[1]))
      that.save.id = files.id
      that.save.latLon = files.latLon
      map.loadImage(that.getCurrentDomainUrl(files.fileUrl), (error, image) => {
        if (error) throw error
        if (!map.hasImage('gradient' + files.fileId)) {
          map.addImage('gradient' + files.fileId, image)
          map.addSource('point' + files.fileId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: latLon
                  }
                }
              ]
            }
          })
          map.addLayer({
            id: 'pointsbizId' + files.fileId,
            type: 'symbol',
            source: 'point' + files.fileId,
            layout: {
              'icon-image': 'gradient' + files.fileId
            },
            maxZoom: 20,
            minZoom: 1,
            paint: {
              'icon-opacity': 0.6
            }
          })
        }
      })
      const canvas = map.getCanvasContainer()
      const geojson = {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [0, 0]
          }
        }]
      }

      function onMove (e) {
        const coords = e.lngLat
        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat]
        map.getSource('point' + files.fileId).setData(geojson)
      }

      function onUp (e) {
        const coords = e.lngLat.lng + ',' + e.lngLat.lat
        if (coords) {
          that.save.latLon = coords
        } else {
          that.save.latLon = latLon
        }
        map.off('mousemove', onMove)
        map.off('touchmove', onMove)
      }
      map.on('mousedown', 'pointsbizId' + files.fileId, (e) => {
        e.preventDefault()
        canvas.style.cursor = 'grab'
        map.on('mousemove', onMove)
        map.once('mouseup', onUp)
      })
      map.on('touchstart', 'pointsbizId' + files.fileId, (e) => {
        if (e.points.length !== 1) return
        e.preventDefault()
        map.on('touchmove', onMove)
        map.once('touchend', onUp)
      })
    },
    getCurrentDomainUrl (url) {
      let domain = ''
      let reg = /^http(s)?:\/\/(.*?)\//
      if (!reg.test(url)) {
        return domain
      }
      let arr = url.match(reg)
      if (!arr || arr.length === 0) {
        return domain
      }
      domain = arr[0]
      if (domain.endsWith('/')) {
        domain = domain.substring(0, domain.length - 1)
      }
      return url.replaceAll(domain, this.PathImage + this.proxyUri)
    },
    // 文件更新
    handleEdit (index, row) {
      var that = this
      var map = that.map
      var save = that.save
      var rowIndex = row.index
      var data = row
      data.latLon = save.latLon
      if (!row || !row.fileId) {
        that.$message.error('操作失败，请刷新后重试')
      } else {
        that.$confirm('确定要保存该位置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (map.getSource('point' + row.fileId)) {
            map.removeImage('gradient' + row.fileId)
            map.removeLayer('pointsbizId' + row.fileId)
            map.removeSource('point' + row.fileId)
          }
          this.$axios({
            url: this.proxyUri + this.proxyInd + '/airport/save',
            data: data,
            method: 'post'
          }).then((res) => {
            if (res.data.code === 0) {
              that.$message.success('操作' + res.data.msg)
              that.save = {
                // 机场
                'airport': '',
                // 文件描述
                'fileDesc': '',
                // 文件ID
                'fileId': 0,
                // 文件名称
                'fileName': '',
                // 不传默认10
                'fileStatus': 10,
                // 1-进近，2-进场，3-离场
                'fileType': 1,
                // 文件地址
                'fileUrl': '',
                // 经纬度
                'latLon': '',
                'long': '',
                'lat': ''
              }
            }
          })
          that.airport_data.forEach((item, index) => {
            if (item.index === rowIndex) {
              item.shift_out = false
              item.compile = false
            }
          })
        })
      }
    },
    // 文件移除
    shiftout (row) {
      var map = this.map
      var rowIndex = row.index
      if (this.airport_data.length > 0) {
        this.airport_data.forEach((item, index) => {
          if (item.index === rowIndex) {
            item.shift_out = false
            item.compile = false
          }
        })
        if (map.getSource('point' + row.fileId)) {
          map.removeImage('gradient' + row.fileId)
          map.removeLayer('pointsbizId' + row.fileId)
          map.removeSource('point' + row.fileId)
        }
        this.save = {
          // 机场
          airport: '',
          // 文件描述
          fileDesc: '',
          // 文件ID
          fileId: 0,
          // 文件名称
          fileName: '',
          // 不传默认10
          fileStatus: 10,
          // 1-进近，2-进场，3-离场
          fileType: 1,
          // 文件地址
          fileUrl: '',
          // 经纬度
          latLon: '',
          long: '',
          lat: ''
        }
      }
    },
    // 文件列表删除
    delAirportFile (row) {
      var map = this.map
      let that = this
      if (!row || !row.fileId) {
        this.$message.error('操作失败，请刷新后重试')
      } else {
        this.$confirm('确定要执行该操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (map.getSource('point' + row.fileId)) {
            map.removeImage('gradient' + row.fileId)
            map.removeLayer('pointsbizId' + row.fileId)
            map.removeSource('point' + row.fileId)
          }
          that.$axios({
            url: that.proxyUri + that.proxyInd + '/airport/delete',
            data: {
              id: row.id
            },
            method: 'post'
          }).then((res) => {
            if (res.data.code === 0) {
              // 删除页面上的图片
              that.get_ruleForm()
              that.$message.success('删除成功')
            }
          })
        })
      }
    },
    // 清除页面 航迹和图片 飞行程序
    eliminate_btn () {
      var that = this
      var map = that.map
      // 图片清除
      var list = that.picture_fileId
      if (list.length > 0) {
        var newArr = []
        for (var i = 0; i < list.length; i++) {
          var items = list[i]
          // 判断元素是否存在于new_arr中，如果不存在则插入到new_ar中
          if ($.inArray(items, newArr) === -1) {
            newArr.push(items)
          }
        }
        newArr.forEach((item, index) => {
          if (map.getSource('point' + item)) {
            map.removeImage('gradient' + item)
            map.removeLayer('pointsbizId' + item)
            map.removeSource('point' + item)
            that.airport_data.forEach((_item, index) => {
              if (_item.fileId === item) {
                _item.shift_out = false
                _item.compile = false
              }
            })
            this.$message.success('清除成功')
            this.picture_fileId = []
          }
        })
      }
      // 航迹移除
      var trackFileId = this.track_fileId
      if (trackFileId.length > 0) {
        var newArrList = []
        for (var a = 0; a < trackFileId.length; a++) {
          var itemS = trackFileId[a]
          // 判断元素是否存在于new_arr中，如果不存在则插入到new_ar中
          if ($.inArray(itemS, newArrList) === -1) {
            newArrList.push(itemS)
          }
          newArrList.forEach((item, index) => {
            that.tableData.forEach((_item, index) => {
              if (_item.fileNo === item) {
                _item.eliminate = false
              }
            })
            $('#marker_list' + item).remove()
            if (map.getLayer('animatePointLayer' + item)) {
              map.removeLayer('animatePointLayer' + item)
            }
            if (map.getLayer('routeLayer' + item)) {
              map.removeLayer('routeLayer' + item)
            }
            if (map.getLayer('realRouteLayer' + item)) {
              map.removeLayer('realRouteLayer' + item)
            }
            if (map.getLayer('arrowLayer' + item)) {
              map.removeLayer('arrowLayer' + item)
            }

            if (map.getLayer('overload' + item)) {
              map.removeLayer('overload' + item)
            }

            if (map.getSource('point' + item)) {
              map.removeSource('point' + item)
            }

            if (map.getLayer('markers' + item)) {
              map.removeLayer('markers' + item)
            }

            if (map.getSource('dot' + item)) {
              map.removeSource('dot' + item)
            }

            if (map.getSource('animatePointLayer' + item)) {
              map.removeSource('animatePointLayer' + item)
            }
            if (map.getSource('routeLayer' + item)) {
              map.removeSource('routeLayer' + item)
            }
            if (map.getSource('realRouteLayer' + item)) {
              map.removeSource('realRouteLayer' + item)
            }
            if (map.getSource('arrowLayer' + item)) {
              map.removeSource('arrowLayer' + item)
            }

            if (map.getSource('dot' + item)) {
              map.removeSource('dot' + item)
            }

            if (map.getSource('dot' + item)) {
              map.removeSource('dot' + item)
            }

            that.one_fileNoTemp = null
            that.routeMap_list = {}
            that.path_name = []
            that.acTail_li = ''

            $('#marker_list' + item).remove()
            $('.flight_procedure_right').hide()
            this.flight_procedure_right = false
            this.$message.success('清除成功')
            this.track_fileId = []
          })
        }
      }
      that.STAR_list.forEach((item, index) => {
        if (item.STAR_LIST.length > 0) {
          item.STAR_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // SID
      that.SID_list.forEach((item, index) => {
        if (item.SID_LIST.length > 0) {
          item.SID_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // APP
      that.APP_list.forEach((item, index) => {
        if (item.APP_LIST.length > 0) {
          item.APP_LIST.forEach((_item, index) => {
            if (map.getSource(_item)) {
              map.removeLayer(_item + '_route')
              map.removeLayer(_item + '_fileNoTemp')
              map.removeSource(_item)
            }
          })
        }
      })
      // STAR
      that.STAR_list = []
      // SID
      that.SID_list = []
      // APP
      that.APP_list = []
      // STAR
      that.isIndeterminate_STAR = false
      that.checkAll_STAR = false
      // SID
      that.isIndeterminate_SID = false
      that.checkAll_SID = false
      // APP
      that.isIndeterminate_APP = false
      that.checkAll_APP = false
      that.flight_procedure.track_list = {
        STAR: [],
        SID: [],
        APP: []
      }
      that.threshold_list = {
        App: [],
        Sid: [],
        Star: []
      }
      // 进场程序
      that.enter = false
      that.Approach = false
      // 离场
      that.departure = false
      that.procedures = false
      // 进近
      that.approach = false
      that.program = false
      // 跑道
      that.flight_list.track_list = {
        STAR: [],
        SID: [],
        APP: []
      }
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    getMyDate (str) {
      var oDate = new Date(str)
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth() + 1
      var oDay = oDate.getDate()
      var oHour = oDate.getHours()
      var oMin = oDate.getMinutes()
      var oSen = oDate.getSeconds()
      var oTime =
        oYear +
        '-' +
        this.getzf(oMonth) +
        '-' +
        this.getzf(oDay) +
        ' ' +
        this.getzf(oHour) +
        ':' +
        this.getzf(oMin) +
        ':' +
        this.getzf(oSen) // 最后拼接时间
      return oTime
    },
    // 补0操作
    getzf (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    }
  }
}
</script>

<style lang="less" scoped>
.left-nav-index-publish {
  display: none !important;
}
.flight_box {
  height: 100%;
  position: relative;

  // 地图
  #mapbox {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  #myDiv,
  #myDivName {
    font-size: 14px;
  }

  #isNew {
    color: royalblue;
  }

  // 选择按钮
  .select_btn {
    padding-top: 20px;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;

    .flight_box {
      /deep/.el-dialog {
        margin-left: 10px !important;
      }

      // 飞行程序
      .flight_procedure {
        width: 100px;
        height: 40px;
        background-color: rgba(3, 58, 151, 0.88);
        border-radius: 6px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 10px;
        color: #fff;

        > div {
          color: #fff;
          font-size: 14px;
          border-right: 1px solid;
          position: relative;
          padding-right: 10px;
        }

        > div::before {
          content: "";
          // background-image: url('../../assets/images/Line32.png');
          width: 1px;
          height: 10px;
          position: absolute;
          right: 10px;
        }

        > img {
          width: 16px;
          height: 16px;
        }
      }
    }

    // 飞行程序 下拉框（待修改）
    .flight_procedure_right {
      height: 40px;
      background-color: rgba(3, 58, 151, 0.88);
      border-radius: 6px;
      padding: 0 12px 0 14px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 10px;
      z-index: 99;
      left: 140px;

      .menuBar {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        > input {
          border-radius: 2px;
          font-size: 14px;
          padding: 0 13px;
          line-height: 28px;
          border-radius: 2px;
          border: none;
          color: #ffffff;
          margin-right: 6px;
        }

        > img {
          width: 24px;
          height: 24px;
        }

        #hangjiInfo {
          color: #ffffff;
          line-height: 23px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }

    // 飞行程序下拉框 （待修改）
    .left_conditions {
      .left_conditions_form {
        .el-form {
          /deep/.el-form-item__label,
          .el-checkbox__label {
            color: #ffffff !important;
          }

          /deep/.el-checkbox__label {
            color: #ffffff !important;
          }

          .threshold_box_top {
            height: 350px;
            overflow-y: scroll;

            .threshold_box {
              /deep/.el-form-item__content {
                display: flex;
                flex-wrap: wrap;

                /deep/.el-checkbox {
                  margin-right: 10px;
                }
              }
            }
          }

          .runway_box {
            height: 70px !important;
            overflow-y: scroll !important;
          }
        }
      }
    }

    // 开始测距
    .ranging {
      height: 40px;
      background-color: rgba(3, 58, 151, 0.88);
      border-radius: 6px;
      padding: 0 6px;
      color: #fff;
      font-size: 14px;
      line-height: 40px;
      z-index: 10;
      margin-left: 10px;
    }

    // 天气情况
    .weather {
      .weather_box {
        /deep/.el-dialog {
          width: 800px;
          background: rgba(0, 0, 0, 0.88);
          border-radius: 12px;

          .el-dialog__header {
            .el-dialog__title {
              color: #fff;
            }

            .el-dialog__close {
              color: #fff;
            }
          }
        }

        .weather_title {
          color: #ffffff;
          height: 62px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .weather_title_top {
            display: flex;
            align-items: center;
            font-size: 16px;

            .weather_background {
              // background-image: url(../../assets/images/weather.png);
              width: 24px;
              height: 24px;
              margin-right: 10px;
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }

          .delete_X {
            // background-image: url(@/assets/images/delete.png);
            width: 30px;
            height: 30px;
            background-size: 100%;
            background-repeat: no-repeat;
          }
        }

        .weather_center {
          display: flex;
          color: #ffffff;
          border-top: 2px solid #ffffff;
          font-weight: bold;

          > div {
            width: 400px;
            padding: 28px 18px 28px 18px;
          }

          > div:first-child {
            border-right: 1px dashed #ffffff;
          }

          .weather_left {
            > div:first-child {
              display: flex;
              flex-wrap: wrap;

              > div {
                padding: 0 37px;
                height: 46px;
                text-align: center;
                line-height: 46px;
                background: #d7e7ff;
                border-radius: 4px;
                margin-right: 11px;
                margin-bottom: 16px;
              }
            }

            .weather_text {
              color: #ffffff;

              .weather_text_top {
                font-size: 14px;
                display: flex;

                > div:first-child {
                  color: red;
                }
              }

              .weather_text_bottom {
                display: flex;
                flex-wrap: wrap;

                > div {
                  padding: 0 10px;
                  line-height: 28px;
                }
              }
            }
          }
        }
      }
    }

    // 测距总距离
    .distance-container {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 11px;
      line-height: 36px;
      display: block;
      border-radius: 3px;
      z-index: 10;
      margin: 0 0 0 10px;
    }

    .distance-container > * {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 11px;
      line-height: 18px;
      display: block;
      margin: 0;
      padding: 5px 10px;
      border-radius: 3px;
    }

    // 上传图片
    .Mount_the_image {
      margin-left: 10px;

      .upload_pictures {
        height: 40px;
        background-color: rgba(3, 58, 151, 0.88);
        border-radius: 6px;
        padding: 0 6px;
        line-height: 40px;
        color: #fff;
        display: block;
      }

      .popup_Mount {
        border-radius: 6px;

        // 按钮
        .popup_button {
          display: flex;
          justify-content: end;
        }
      }
    }

    // kml航迹查询
    .Track_the_query {
      margin-left: 10px;

      .track_btn {
        height: 40px;
        background-color: rgba(3, 58, 151, 0.88);
        border-radius: 6px;
        padding: 0 6px;
        line-height: 40px;
        color: #fff;
        font-size: 14px;
        display: block;
      }
    }

    // 机场图层
    .airport_coverage {
      margin-left: 10px;

      .coverage_btn {
        height: 40px;
        background-color: rgba(3, 58, 151, 0.88);
        border-radius: 6px;
        padding: 0 6px;
        line-height: 40px;
        color: #fff;
        font-size: 14px;
        display: block;
      }

      .Tracking_information {
        .remove_title {
          line-height: 30px;
          color: red;
        }

        .information_bottom {
          height: 50px;
          display: flex;
          justify-content: end;
          align-items: center;

          button {
            height: 40px;
          }
        }

        .multipleTableClass{
          /deep/.el-button+.el-button{
            margin-left: 0 !important;
          }
        }
      }
    }

    // 恢复默认
    .eliminate {
      margin-left: 10px;

      .eliminate_btn {
        height: 40px;
        background-color: rgba(3, 58, 151, 0.88);
        border-radius: 6px;
        padding: 0 6px;
        line-height: 40px;
        color: #fff;
        font-size: 14px;
        display: block;
      }
    }
  }
}

#marker_list {
  background-color: rgba(3, 58, 151, 0.7) !important;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

// 比例尺
.mapboxgl-ctrl.mapboxgl-ctrl-scale {
  height: 10px;
  background-color: transparent;
  line-height: 10%;
  text-align: center;
}

// 隐藏 mapbox  logo
.mapboxgl-ctrl-bottom-left {
  .mapboxgl-ctrl:last-child {
    display: none !important;
  }
}

.mapboxgl-ctrl{
  display: none !important;
}

/deep/.el-loading-mask {
  display: none !important;
}

.irportTable{
  /deep/.el-table__body{
    background-color: #fff;
  }
  /deep/.el-button+.el-button{
    margin-left: 0 !important;
  }
}

.flight-weather-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}

</style>

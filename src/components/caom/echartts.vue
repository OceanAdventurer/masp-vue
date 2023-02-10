<template>
  <div class="cm_list">
    <!-- <div @click.left="mouseclickLeft()" @contextmenu.prevent="mouseclickRight()"> -->
    <a-dropdown :trigger="['contextmenu']">
      <a-table
        :scroll="{ x: 100, y: '55vh' }"
        size="small"
        :columns="columns"
        :data-source="data"
        :row-selection="{
          onSelect: onSelect,
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :defaultExpandAllRows="true"
        @expand="expanded"
        :expandedRowKeys="expandedRowKeys"
        :pagination="false"
        :customRow="customClick"
        bordered
      >
        <template
          v-for="col in [
            'aircraftType',
            'rotationId',
            'frequency',
            'flightNo1',
            'airport1',
            'departureTime1',
            'arrivalTime1',
            'crossDay1',
            'airport2',
            'departureTime2',
            'arrivalTime2',
            'crossDay2',
            'airport3',
            'remark',
            'standardTimeContrast',
            'groundTimeContrast',
            'flightType'
          ]"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col" class="cm_table">
            <!-- <div>{{ index }}</div> -->
            <div v-if="col == 'frequency'">
              <div>
                <a-button
                  :disabled="record.editable == 'false'"
                  size="small"
                  v-for="item in text.length"
                  :key="item"
                  @click="
                    changeDate(
                      item - 1,
                      text[item - 1],
                      record.key,
                      col,
                      record
                    )
                  "
                  type="button"
                  class="ant-btn"
                  style="width: 0; margin: 0 2px; width: 23px; text-align: center;"
                >
                  <span>{{ text[item - 1] }}</span>
                </a-button>
              </div>
            </div>
            <div v-else-if="col == 'flightType'">
              <a-input
                v-if="record.editable == 'true' && record.aircraftType == null"
                :value="text"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e => handlePressEnter(e.target.value, record.key, col, record)
                "
              />
              <template v-else>
                <span style="color: #1890ff" @click="airportDetail(text)">
                  {{ text }}
                </span>
              </template>
            </div>
            <div v-else-if="col == 'standardTimeContrast'">
              <div class="compulte">
                <div
                  v-for="(item, index) in text"
                  :key="index"
                  :class="item.status ? 'background2' : 'background1'"
                  style="display: inline-block; width: 32px; text-align: center;"
                >
                  {{ item.standardTimeContrast }}
                </div>
              </div>
            </div>
            <div v-else-if="col == 'groundTimeContrast'">
              <div class="compulte">
                <div
                  v-for="(item, index) in text"
                  :key="index"
                  :class="item < 0 ? 'background1' : 'background2'"
                  style="display: inline-block; text-align: center; width: 38px"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <div v-else-if="col == 'airport1'">
              <a-input
                v-if="record.editable == 'true' && record.aircraftType == null"
                :value="text"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e => handlePressEnter(e.target.value, record.key, col, record)
                "
              />
              <template v-else>
                <span style="color: #1890ff" @click="airportDetail(text)">
                  {{ text }}
                </span>
              </template>
            </div>
            <div v-else-if="col == 'airport2'">
              <a-input
                v-if="record.editable == 'true' && record.aircraftType == null"
                :value="text"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e => handlePressEnter(e.target.value, record.key, col, record)
                "
              />
              <template v-else>
                <span style="color: #1890ff" @click="airportDetail(text)">
                  {{ text }}
                </span>
              </template>
            </div>
            <div v-else-if="col == 'airport3'">
              <a-input
                v-if="record.editable == 'true' && record.aircraftType == null"
                :value="text"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e => handlePressEnter(e.target.value, record.key, col, record)
                "
              />
              <template v-else>
                <span style="color: #1890ff" @click="airportDetail(text)">
                  {{ text }}
                </span>
              </template>
            </div>
            <div v-else-if="col == 'aircraftType'">
              <a-input
                v-if="
                  (record.editable == 'true' || record.editable == 'other') &&
                    text !== null
                "
                style="width: 52px; padding: 0 0"
                :value="text"
                placeholder="必填"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e =>
                    handlePlanePressEnter(
                      e.target.value,
                      record.key,
                      col,
                      record
                    )
                "
              />
              <template v-else>
                <div style="width: 52px">
                  {{ text }}
                </div>
              </template>
            </div>
            <div v-else>
              <a-input
                v-if="record.editable == 'true' && record.aircraftType == null"
                :value="text"
                @change="
                  e => handleChange(e.target.value, record.key, col, record)
                "
                @pressEnter="
                  e => handlePressEnter(e.target.value, record.key, col, record)
                "
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable == 'true'">
              <a @click="() => save(record.rowId, record.editable)"
                ><i class="fa fa-unlock" aria-hidden="true"></i
              ></a>
            </span>
            <span v-else-if="record.editable == 'false'">
              <a @click="() => save(record.rowId, record.editable)"
                ><i class="fa fa-lock" aria-hidden="true"></i
              ></a>
            </span>
            <span v-else>
              <i class="fa fa-unlock-alt" aria-hidden="true"></i>
            </span>
          </div>
        </template>
      </a-table>
    </a-dropdown>
    <div style="margin-top: 20px"></div>
  </div>
</template>
<template>
  <div style="display:inline-block">
    <a-popconfirm placement="bottom" ok-text="是" cancel-text="否" @confirm="confirm">
      <template slot="title">
        确定删除该数据么?
      </template>
      <a-tag @click.stop="">
        <a-icon type="delete" />
        删除
      </a-tag>
    </a-popconfirm>
    <div>
      <a-tag @click.stop="showModal()">
        <a-icon type="sort-ascending" />
        排序
      </a-tag>
      <a-tag>
        <a-icon type="plus-circle" />
        列设置
      </a-tag>
      <a-tag>
        <a-icon type="plus-circle" />
        新增
      </a-tag>
      <a-tag>
        <a-icon type="form" />
        修改
      </a-tag>
      <a-tag>
        <a-icon type="delete" />
        删除
      </a-tag>
      <a-tag>
        <a-icon type="download" />
        导出
      </a-tag>
      <a-tag>
        <a-icon type="upload" />
        导入
      </a-tag>
    </div>
    <!-- 排序 -->
    <template>
      <div>
        <a-modal
          title="排序"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
          width="650px"
        >
          <a-form-model :model="form" ref="ruleForm" :layout="'inline'">
            <div v-for="(item, index) in form.domains" :key="index">
              <a-form-model-item
                label="字段"
                :prop="'domains.' + index + '.fieldName'"
                :rules="{
                  required: true,
                  message: '请选择字段'
                }"
              >
                <a-select v-model="item.fieldName" style="width: 160px" placeholder="请选择">
                  <a-select-option v-for="item in frequencyList" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="排序方式"
                :prop="'domains.' + index + '.sortingRule'"
                :rules="{
                  required: true,
                  message: '请选择排序方式',
                  trigger: 'blur'
                }"
              >
                <a-select v-model="item.sortingRule" style="width: 160px" placeholder="请选择">
                  <a-select-option v-for="item in sortTypeList" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-icon v-if="index == 0" type="plus-circle-o" @click="handleAdd()" />
                <a-icon v-if="index > 0" type="close-circle-o" @click="handleRemove(index)" />
              </a-form-model-item>
            </div>
          </a-form-model>
        </a-modal>
      </div>
    </template>
  </div>
</template>

<script>
import { getNewRoutingSortedParams } from '@/api/routingManage/workOrderRouting';

export default {
  name: 'general',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      form: {
        domains: [
          {
            fieldName: '',
            sortingRule: ''
          }
        ]
      },
      frequencyList: [],
      sortTypeList: [
        {
          key: 'ASC',
          value: '升序'
        },
        {
          key: 'DESC',
          value: '降序'
        }
      ]
    };
  },
  created() {
    this.getALLParams();
  },
  mounted() {},
  methods: {
    //获得所有下拉字段
    getALLParams() {
      getNewRoutingSortedParams().then(res => {
        console.log(res.data);
        if (res.data.success) {
          this.frequencyList = res.data.data;
          console.log(this.frequencyList);
          this.frequencyList = res.data.data.map(item => {
            return {
              key: item.value,
              value: item.label
            };
          });
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('submitSort', this.form)
          this.visible = false
        } else {
          return false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
    onSubmit() {},
    handleAdd() {
      this.form.domains.push({
        fieldName: '',
        sortingRule: ''
      });
    },
    handleRemove(num) {
      let lis = [];
      this.form.domains.filter((item, index) => {
        if (num !== index) {
          lis.push(item);
        }
      });
      this.form.domains = lis;
    },
    search() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.resetSpecList({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            specName: values.specName
          });
        }
      });
    },
    resetSpecList(params) {
      axios.get(`/api/schedule/spec/page`, { params }).then(res => {
        const { data } = res;
        if (data.success) {
          this.selectedRowKeys = [];
          this.specList = data.data.list.map(x => {
            x.isNumSpec = x.isNumSpec ? 'T' : 'F';
            x.isValid = x.isValid ? 'T' : 'F';
            return x;
          });
          this.total = data.data.total;
        } else {
          this.$message.error(data.msg || `获取列表失败`);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.record-list {
  display: inline-block;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  margin: 10px 0 0 10px;
  font-size: 15px;
  color: #444;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ccc;
  vertical-align: bottom;
  i {
    margin-left: 3px;
  }
}
.conflict-dom {
  width: 98%;
  margin: 0 1%;
  margin-top: -30px;
  height: 23vh;
  overflow: auto;
  .conflict-table {
    width: 100%;
    margin-top: 10px;
    color: #444;
    td {
      text-align: center;
      height: 30px;
      line-height: 30px;
      border: #ccc solid 1px;
    }
  }
}
</style>

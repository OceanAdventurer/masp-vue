<template>
  <div style="display:inline-block">
    <div>
      <a-tag @click.stop="download()">
        <a-icon type="form" />
        修改
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
          title="修改工厂"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
          width="650px"
        >
          <template>
            <div>
              <a-tabs default-active-key="1" @change="callback">
                <a-tab-pane key="1" tab="基本">
                  <template>
                    <a-form-model
                      ref="ruleForm"
                      :model="form"
                      :rules="rules"
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                    >
                      <a-form-model-item label="工厂代码" prop="plantCode">
                        <a-input v-model="form.plantCode" />
                      </a-form-model-item>
                      <a-form-model-item label="工厂名称">
                        <a-input v-model="form.plantName" />
                      </a-form-model-item>
                      <a-form-model-item label="工厂地址">
                        <a-input v-model="form.location" />
                      </a-form-model-item>
                      <a-form-model-item label="供应链层级顺序">
                        <a-input v-model="form.planningLevel" />
                      </a-form-model-item>
                      <a-form-model-item label="是否禁止">
                        <a-switch v-model="form.disabled" />
                      </a-form-model-item>
                      <a-form-model-item label="备注">
                        <a-input v-model="form.remark" />
                      </a-form-model-item>
                    </a-form-model>
                  </template>
                </a-tab-pane>
                <a-tab-pane key="2" tab="内部" force-render>
                  <template>
                    <a-form-model
                      ref="ruleForm"
                      :model="form"
                      :rules="rules"
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                    >
                      <a-form-model-item label="是否有效">
                        <a-switch v-model="form.isValid" />
                      </a-form-model-item>
                    </a-form-model>
                  </template>
                </a-tab-pane>
                <a-tab-pane key="3" tab="设置" force-render>
                  <template>
                    <a-form-model
                      ref="ruleForm"
                      :model="form"
                      :rules="rules"
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                    >
                      <a-form-model-item label="是否有效">
                        <a-switch v-model="form.isValid" />
                      </a-form-model-item>
                    </a-form-model>
                  </template>
                </a-tab-pane>
              </a-tabs>
            </div>
          </template>
        </a-modal>
      </div>
    </template>
  </div>
</template>

<script>
import { update } from '@/api/factory/factory';

export default {
  name: 'factoryColumnSetup',
  data() {
    return {
      key: '1',
      visible: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: {
        plantCode: '',
        plantName: '',
        location: '',
        planningLevel: '',
        remark: '',
        isValid: true,
        disabled: false
      },
      rules: {
        plantCode: [
          { required: true, message: '此为必填项', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不能超过50', trigger: 'blur' }
        ]
      }
    };
  },
  props: {
    editFactory: {
      default: {}
    },
    selectedRowKeys: {}
  },
  created() {},
  mounted() {},
  watch: {
    editFactory() {
      this.form = this.editFactory;
    }
  },
  methods: {
    download() {
      if (this.selectedRowKeys.length !== 1) {
        this.$message.warning('请选择一条你要修改的数据');
      } else {
        this.showModal();
      }
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('plantCode', this.form.plantCode);
          formData.append('plantName', this.form.plantName);
          formData.append('location', this.form.location);
          formData.append('planningLevel', this.form.planningLevel);
          formData.append('disabled', this.form.disabled);
          formData.append('remark', this.form.remark);
          formData.append('isValid', this.form.isValid);
          formData.append('plantId', this.form.plantId);
          update(formData)
            .then(res => {
              console.log(res);
              if (res.data.success) {
                this.$message.success(res.data.msg || '修改工厂成功');
                this.visible = false;
                this.$refs.ruleForm.resetFields();
                this.$emit('submitAdd')
              } else {
                this.$message.console.error();
                res.data.msg || '修改工厂失败';
              }
            })
            .catch(() => {
              this.$message.console.error();
              res.data.msg || '修改工厂失败';
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
    callback(key) {
      console.log(key);
      this.key = key;
    },
    submitSort(dataSort) {
      console.log(dataSort);
      this.form.baseInquireSortRules = dataSort.domains;
      this.form.sortType = true;
      this.onSubmit();
    },
    submitColumnSetup(selectedRowKeys) {
      let col = [];
      columns.forEach(item => {
        selectedRowKeys.forEach(val => {
          if (item.dataIndex === val) {
            col.push(item);
          }
        });
      });
      this.tableX = col.length * 117
      this.columns = col;
    },
    submitAdd() {
      this.onSubmit();
    }
  }
};
</script>
<style lang="scss" scoped>
#components-a-popconfirm-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
  .airlines {
    display: flex;
    .airlines-input {
      margin-right: 0.4vw;
      .el-form-item__content {
        margin-left: 0 !important;
        width: 100% !important;
      }
    }
    .addOrMin {
      margin-top: 6px;
      font-size: 22px;
      color: #999;
    }
  }
}
</style>

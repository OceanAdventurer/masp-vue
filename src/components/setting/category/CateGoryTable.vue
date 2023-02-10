<style scoped>

  .category-search {
    width: 100%;
    height: 45px;
  }

  .category-table {
    height: auto;
    width: 93%;
    margin-left: 50px;
    border: solid 1px #DDDDDD;

  }
  .table-header{
    background-color: #ebeef569;width: 100%; height: 38px;
    border-bottom: solid 1px #DDDDDD;
    box-sizing: border-box;
  }
  .table-td{
    width: 31%;height: 38px;float: left; line-height: 38px;padding-left: 10px;
  }
  .td-border{
    border-bottom: solid 1px #DDDDDD;
    box-sizing: border-box;
    width: calc(31% + 9px);
  }
  .cm-table::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }
  .cm-table::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #cccccc;
  }
</style>
<template>
    <div>
      <div class="category-search">
        <el-input v-model="keywords" placeholder="请输入关键字搜索" size="small"
                  @keyup.enter.native="searchTwoDimesional()"
                  style="float: right;margin: 8px 10px;width: 200px;font-size: 12px;">
          <i class="el-icon-search el-input__icon"
             slot="suffix"
             @click="searchTwoDimesional()">
          </i>
        </el-input>
      </div>
      <div class="category-table">
        <div class="table-header">
          <div class="table-td">
            操作    用户名
          </div>
          <div class="table-td">
            操作    用户名
          </div>
          <div class="table-td">
            操作    用户名
          </div>
        </div>
        <div class="cm-table" style="height: calc(78vh - 180px);overflow-y: auto;overflow-x: hidden">
          <el-checkbox-group v-model="checkedUserIds" @change="handleCheckedUserChange">
          <div  v-for="(item, index) in userData" :key="index" >
            <div class="table-td ">
              <el-checkbox   :label="item.ID"  >{{item.LOGIN_NAME}}</el-checkbox>
            </div>
<!--            <div class="table-td " v-if="item.status === '1'">-->

<!--              <el-checkbox class="table-td " checked="checked"><span style="margin-left: 10px;">{{item.LOGIN_NAME}}xxx{{item.status}}</span></el-checkbox>-->
<!--            </div>-->
<!--            <div class="table-td " v-else>-->
<!--              <el-checkbox class="table-td " ><span style="margin-left: 10px;">{{item.LOGIN_NAME}}{{item.status}}</span></el-checkbox>-->
<!--            </div>-->
            <span  v-if="(index + 1) % 3 === 0" >
                    <div  style="width: 100%;height: 38px; border-bottom: solid 1px #DDDDDD;box-sizing: border-box;"> </div>
                  </span>
            <span v-else-if="(index + 1 ) === userData.length">
                    <div  style="width: 100%;height: 38px; border-bottom: solid 1px #DDDDDD;box-sizing: border-box;"> </div>
                  </span>
          </div>
          </el-checkbox-group>
         </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'CateGoryTable',
  data () {
      return {
      }
    },
    watch: {
      // 搜索 后将值传到父组件
      keywords (v) {
        this.$emit('searchKeyWords', v)
      },
       filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    components: {
    },
    props: ['userData', 'checkedUserIds', 'keywords'],
    mounted () {
    },
    methods: {
      // 触发复选框 获取到选中的值
      handleCheckedUserChange (v) {
        this.$emit('checkedUserIds', v)
      }
    }
  }
</script>

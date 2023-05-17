<template>
  <div>
    <a-form layout="horizontal" :model="formState">
      <a-form-item label="业务编号">
        <a-input style="width: 400px" v-model="formState.businessId" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="来源标记">
        <a-input style="width: 400px" v-model="formState.from" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="限制资源">
        <a-input style="width: 400px" v-model="formState.limit" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="请求限流">
        <a-input style="width: 400px" v-model="formState.requestLimit" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="启用状态">
        <a-input style="width: 400px" v-model="formState.status" placeholder="请输入" />
      </a-form-item>
      <a-form-item>
        <div style="float: right; margin-right: 300px">
          <a-button type="primary" style="margin-right: 10px">
            <!-- <template #icon><img src="@/icons/svg/return.svg" /></template> -->
            取消
          </a-button>
          <a-button type="primary">提交</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formState: {
        businessId: 'AAA',
        from: 'BBB',
        limit: 'Ccc',
        requestLimit: 'dddd',
        status: 'ded'
      }
    };
  }
};
</script>

<style></style>

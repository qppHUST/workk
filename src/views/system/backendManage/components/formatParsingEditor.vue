<template>
  <div>
    <a-form layout="horizontal" :model="formState">
      <a-form-item label="文件格式">
        <a-input style="width: 400px" v-model="formState.file_ext" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="格式描述">
        <a-input style="width: 400px" v-model="formState.ext_desc" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="解析模板">
        <a-input style="width: 400px" v-model="formState.extract_type" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="修改时间">
        <a-input style="width: 400px" v-model="formState.modify_time" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="操作人">
        <a-input style="width: 400px" v-model="formState.userid" placeholder="请输入" />
      </a-form-item>
      <a-form-item>
        <div style="float: right; margin-right: 300px">
          <a-button type="primary" style="margin-right: 10px" @click="cancel"> 取消 </a-button>
          <a-button type="primary">提交</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['data'],
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
  },
  methods: {
    cancel() {
      this.$emit('cancel', '');
    }
  },
  created() {
    this.formState = { ...this.data };
    console.log(this.formState);
  }
};
</script>

<style></style>

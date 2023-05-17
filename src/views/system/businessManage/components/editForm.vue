<template>
  <div>
    <a-form layout="horizontal" :model="formState">
      <a-form-item label="队列名称">
        <a-input v-model="formState.task_name" style="width: 600px" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="队列描述">
        <a-input v-model="formState.task_desc" style="width: 600px" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="定义类型">
        <a-radio-group name="radioGroup" v-model="type" @change="onChangeType">
          <a-radio value="1">常规定义</a-radio>
          <a-radio value="2">高级定义</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="业务编号" v-if="isPrimary">
        <a-select v-model="formState.biz" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="提审场景" v-if="isPrimary">
        <a-select v-model="formState.scenes" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="操作入口" v-if="isPrimary">
        <a-select v-model="formState.entry" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="操作团队" v-if="isPrimary">
        <a-select v-model="formState.team" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="文件格式" v-if="isPrimary">
        <a-select v-model="formState.file_ext" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="工单来源" v-if="isPrimary">
        <a-select v-model="formState.task_source" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="预览状态" v-if="isPrimary">
        <a-select v-model="formState.type_view" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="可疑类型" v-if="isPrimary">
        <a-select v-model="formState.type_doubt" style="width: 600px" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="定义语法" v-if="!isPrimary">
        <a-input v-model="formState.task_sql" style="width: 600px" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item label="告警hook" v-if="!isPrimary">
        <a-input v-model="formState.alarm_hook" style="width: 600px" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item>
        <div style="float: right; margin-right: 200px">
          <a-button type="primary" style="margin-right: 10px" @click="cancel">
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
      type: '1',
      formState: {
        task_name: 'AAA',
        task_desc: 'BBB',
        biz: 'Ccc',
        scenes: 'dddd',
        entry: 'ded',
        team:"",
        
      },
      options: [{ value: '1' }, { value: '2' }, { value: '3' }],
      isPrimary: true
    };
  },
  methods: {
    onChangeType(val) {
      console.log(this.type);
      this.isPrimary = !this.isPrimary;
    },
    cancel() {
      this.$emit('cancel', '');
    }
  }
};
</script>

<style></style>

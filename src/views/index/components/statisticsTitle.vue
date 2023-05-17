<template>
  <div class="statistics-title flex justify-between">
    <slot name="title"></slot>
    <div class="statistics-tools">
      <a-button type="primary" style="margin-right: 20px">
        导出
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-select v-model:value="mode" style="width: 120px;margin-right: 20px">
        <a-select-option value="team">按团队统计</a-select-option>
        <a-select-option value="total">按总量统计</a-select-option>
      </a-select>
      <a-select v-model:value="range" style="width: 120px;margin-right: 10px">
        <a-select-option value="one-month">近一个月</a-select-option>
        <a-select-option value="three-month">近三个月</a-select-option>
        <a-select-option value="one-year">近一年</a-select-option>
      </a-select>
      <a-button type="link">
        查看监控
        <template #icon>
          <svg-icon icon="link" color="#1890ff" style="margin-right: 5px" />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DownloadOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import SvgIcon from '@/components/svgIcon/index.vue';
const mode = ref('team');
const range = ref('one-month');
</script>
<style lang="scss" scoped>
.statistics-title {
  height: 55px;
  line-height: 55px;
  padding: 0 60px 0 25px;
  box-sizing: border-box;
  font-size: 1.1rem;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .statistics-tools {
    height: 100%;
  }
}
</style>

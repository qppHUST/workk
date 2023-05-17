<template>
  <a-date-picker :value="dateString" @change="onDateSelected" />
</template>  
    
<script>
import moment from 'moment';

export default {
  data() {
    return {
      timestamp: 1684684800// 存储时间戳
    };
  },
  computed: {
    dateString() {
      // 将时间戳转换为日期字符串
      return moment.unix(this.timestamp).format('YYYY-MM-DD');
    }
  },
  methods: {
    onDateSelected(dateString) {
      // 将日期字符串转换为时间戳
      this.timestamp = moment(dateString, 'YYYY-MM-DD').unix();
      console.log('this.timestamp', this.timestamp);
    }
  }
};
</script> 
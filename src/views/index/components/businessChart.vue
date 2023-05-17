<template>
  <div style="width: 100%; height: 300px" ref="pieChart"></div>
  <div class="business-list">
    <div class="business-item">
      <span class="number"></span>
      <span class="name">云文档: 42人</span>
    </div>
    <div class="business-item">
      <span class="number"></span>
      <span class="name">表单: 30人</span>
    </div>
    <div class="business-item">
      <span class="number"></span>
      <span class="name">稻壳: 3人</span>
    </div>
  </div>
</template>

<script>
import resize from '@/mixins/resize';
import * as echarts from 'echarts';

const colorLost = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];
export default {
  name: 'businessChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  mixins: [resize],
  data() {
    return {
      business: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.pieChart);
      this.myChart.setOption(
        {
          color: colorLost,
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return params.marker + ' ' + params.name + '：' + params.value + ' (' + params.percent + '%)';
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          legend: {
            show: false
          },
          series: [
            {
              name: '消费类型',
              type: 'pie',
              icon: 'circle',
              radius: ['35%', '55%'],
              center: ['38%', '45%'],
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 1
                }
              },
              data: this.chartData,
              label: {},
              labelLine: {
                normal: {
                  show: true
                }
              }
            }
          ]
        },
        true
      );
    }
  },
  watch: {
    chartData: {
      handler(nl, ol) {
        this.initEchart();
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="scss">
.business-list {
  display: flex;
  position: absolute;
  right: 12%;
  bottom: 12%;
  flex-direction: column;
  .business-item {
    display: flex;
    align-items: center;
    line-height: 25px;
    .number {
      width: 12px;
      height: 12px;
      background-color: #6ad6fd;
      border-radius: 50%;
      margin-right: 12px;
    }
    .name {
      font-size: 13px;
    }
  }
}
</style>

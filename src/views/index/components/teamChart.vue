<template>
  <div style="width: 100%; height: 300px" ref="pieChart"></div>
</template>

<script>
import resize from '@/mixins/resize';
import * as echarts from 'echarts';

const colorLost = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];
export default {
  name: 'teamChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  mixins: [resize],
  data() {
    return {};
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
          legend: {
            icon: 'circle',
            show: true,
            type: 'scroll',
            data: this.chartData.map(item => item.name),
            orient: 'vertical',
            right: '10%',
            bottom: '10%'
          },
          series: [
            {
              name: '消费类型',
              type: 'pie',
              icon: 'circle',
              radius: '55%',
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

<template>
  <div class="table-wrapper">
    <a-card
      :hoverable="true"
      :bordered="false"
      style="width: 100%"
      :tab-list="tabList"
      :active-tab-key="key"
      @tabChange="key => onTabChange(key, 'key')"
    >
      <div class="flex flex-wrap mb20">
        <a-form ref="formRef" :model="formState" layout="inline">
          <a-form-item ref="name" label="时间" name="name">
            <!-- :valueFormat="'X'"  -->
            <a-date-picker :value="dateString" @change="handleDateChange" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" icon="search" class="select-bottom" style="margin-right: 16px" @click="search">
              查询
            </a-button>
            <a-button type="primary" icon="export" class="select-bottom" :loading="exportLoading" @click="handleExport">
              导出
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <standard-table
        :tableData="tableData"
        :tableHead="tableHead"
        :loading="loading"
        :scroll="{ y: 500 }"
        :pagination="{
          pageSize: filterList.limit,
          current: filterList.page,
          total: filterList.total,
          showTotal: total => `${filterList.total} 条`
        }"
        @changeCurrent="handleChangeCurrent"
      >
      </standard-table>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment';
import { getReportDelayHourData } from '@/api/statistic';
import standardTable from '@/components/standardTable/index';
import { formatJson } from '@/utils';
export default {
  name: 'tables',
  components: { standardTable },
  computed: {
    dateString() {
      // 将时间戳转换为日期字符串
      return moment.unix(this.formState.time).format('YYYY-MM-DD');
    }
  },
  data() {
    // const now = moment();

    return {
      tabList: [
        {
          key: 'drive_core',
          tab: '云文档',
          scopedSlots: { tab: 'customRender' }
        }
        // {
        //   key: 'kdocs_doc_watermark2',
        //   tab: '水印'
        // },
        // {
        //   key: 'aigc_gateway',
        //   tab: '网关大模型'
        // },
        // {
        //   key: 'airpageaigc',
        //   tab: 'WPS AI'
        // }
      ],
      key: 'drive_core',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      dateFormat: 'YYYY/MM/DD',
      formState: { time: moment().startOf('day').unix() },
      searchList: {},
      tableHead: [
        {
          title: '类别',
          dataIndex: 'hour'
        },
        {
          title: '全部文档时效',
          dataIndex: 'all_time'
        },
        {
          title: '全部文档拉单延时',
          dataIndex: 'all_delay_time'
        },
        {
          title: '全部文档人工时效',
          dataIndex: 'all_manual_cost'
        },
        {
          title: '紧急延迟时效',
          dataIndex: 'emergency_time'
        },
        {
          title: '紧急延迟拉单延时',
          dataIndex: 'emergency_delay_time'
        },
        {
          title: '紧急延迟人工时效',
          dataIndex: 'emergency_manual_cost'
        },
        {
          title: '普通文档时效',
          dataIndex: 'normal_time'
        },
        {
          title: '普通文档人工时效',
          dataIndex: 'normal_manual_cost'
        },
        {
          title: '普通文档拉单延时',
          dataIndex: 'emergency_delay_time'
        }
      ],
      tableData: [],
      loading: false,
      selectedRowKeys: [],
      selectValue: [],
      currentEdit: {},
      editShow: false,
      filterList: {
        supplier: 'Wuhan',
        start_time: null,
        biz: 'drive_core',
        user_id: 100347,
        type: 'all',
        limit: 20,
        page: 1,
        total: 0
      },
      deleteLoading: false,
      exportLoading: false
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    moment,
    handleDateChange(dateString) {
      this.formState.time = moment(dateString, 'YYYY-MM-DD').unix();
      // if (value) {
      //   const timestamp = moment(value).startOf('day').unix();
      //   console.log('');
      //   const momentObj = moment.unix(timestamp)
      //   this.formState.time = momentObj;
      // } else {
      //   this.formState.time = null;
      // }
    },
    onTabChange(key, type) {
      this[type] = key;
      this.filterList.biz = key;
      this.getReportDelayHour();
    },
    getReportDelayHour() {
      const { biz, user_id, start_time, supplier, type, page, limit } = this.filterList;
      this.loading = true;
      getReportDelayHourData({ biz, user_id, start_time, supplier, type, page: page - 1, limit }).then(res => {
        const data = res.data || {};
        this.filterList.total = data.count || 0;
        this.tableData = data.records || [];
        this.loading = false;
      });
    },

    handleChangeCurrent(val) {
      this.filterList.page = val;
      this.getReportDelayHour();
    },
    search() {
      this.filterList.page = 1;
      this.filterList.start_time = Number(this.formState.time);
      // this.filterList.end_time = Number(this.formState.time[1]);
      this.getReportDelayHour();
    },
    //导出
    handleExport() {
      //由于是前端导出，所以只能导出当前的页的15条数据
      this.exportLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const header = [],
          filterVal = [];
        this.tableHead.forEach(item => {
          if (item.title != '操作' && item.title != '序号') {
            header.push(item.title);
            filterVal.push(item.dataIndex);
          }
        });
        const data = formatJson(this.tableData, filterVal);

        excel.export_json_to_excel({
          header,
          data,
          filename: '表单统计'
        });
        this.exportLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .filter-wrapper {
    width: 230px;
    .label {
      min-width: 80px;
    }
    .select-width {
      width: 150px;
    }
  }
}
</style>
    
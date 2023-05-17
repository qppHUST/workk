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
            <a-range-picker v-model="formState.time" :format="dateFormat" :valueFormat="'X'" />
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
        <div slot="manual_times" slot-scope="{ text }">
          <a-button type="link" size="small" @click="toDay(text)"> {{text.manual_times}} </a-button>
        </div>
      </standard-table>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment';
import { getReportSummaryData } from '@/api/statistic';
import standardTable from '@/components/standardTable/index';
import { formatJson } from '@/utils';
export default {
  name: 'tables',
  components: { standardTable },
  data() {
    const end_time = moment();
    const start_time = end_time.clone().subtract(7, 'days');
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
      formState: { time: [start_time, end_time] },
      searchList: {},
      tableHead: [
        // {
        //   title: '序号',
        //   dataIndex: 'index',
        //   scopedSlots: { customRender: 'index' },
        //   width: 60
        // },
        {
          title: '日期',
          dataIndex: 'report_date',
          width: 120,
          customRender: (text, record) => moment.unix(record.report_date).format('YYYY/MM/DD')
        },
        {
          title: '分享用户数',
          dataIndex: 'user_count'
        },
        {
          title: '分享文档次数',
          dataIndex: 'share_times'
        },
        {
          title: '分享文档个数',
          dataIndex: 'share_count'
        },
        {
          title: '机器检测请求数',
          dataIndex: 'machine_query_times'
        },
        {
          title: '实际机审次数',
          dataIndex: 'machine_times'
        },
        {
          title: '实际机审个数',
          dataIndex: 'machine_count'
        },
        {
          title: '无法解析数',
          dataIndex: 'can_not_extract_times'
        },
        {
          title: '机器怀疑数',
          dataIndex: 'push_manual_count'
        },

        {
          title: '人工处理数',
          scopedSlots: { customRender: 'manual_times' }
        },
        {
          title: '人审文档个数',
          dataIndex: 'manual_count'
        },
        {
          title: '大文档人审次数',
          dataIndex: 'manual_big_file_times'
        },
        {
          title: '大文档人审个数',
          dataIndex: 'manual_big_file_count'
        },
        {
          title: '紧急延迟数',
          dataIndex: 'emergency_delay_count'
        },
        {
          title: '违规文档数',
          dataIndex: 'violation_count'
        },
        {
          title: '机器拒绝数',
          dataIndex: 'machine_forbid_count'
        },
        {
          title: '红头文件数',
          dataIndex: 'gov_count'
        },
        {
          title: '平均时效',
          dataIndex: 'avg_time'
        }
      ],
      tableData: [],
      loading: false,
      selectedRowKeys: [],
      selectValue: [],
      currentEdit: {},
      editShow: false,
      filterList: {
        start_time: null,
        end_time: null,
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
    toDay (row) {
      console.log('row', row);
      this.$router.push({
        path: '/statistic/comment/day'
      });
    },
    onTabChange(key, type) {
      this[type] = key;
      this.filterList.biz = key;
      this.getReportMonth();
    },
    getReportSummary() {
      const { biz, user_id, start_time, end_time, type, page, limit } = this.filterList;
      this.loading = true;
      getReportSummaryData({ biz, user_id, start_time, end_time, type, page: page - 1, limit }).then(res => {
        const data = res.data || {};
        this.filterList.total = data.count || 0;
        this.tableData = data.records || [];
        this.loading = false;
      });
    },

    handleChangeCurrent(val) {
      this.filterList.page = val;
      this.getReportMonth();
    },
    search() {
      this.filterList.page = 1;
      this.filterList.start_time = Number(this.formState.time[0]);
      this.filterList.end_time = Number(this.formState.time[1]);
      this.getReportSummary();
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
    
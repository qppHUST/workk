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
      <div class="flex flex-wrap mb20" >
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
import { getReportMonthData } from '@/api/statistic';
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
          key: 'kdocs_comment',
          tab: '评论',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'kdocs_doc_watermark2',
          tab: '水印'
        },
        // {
        //   key: 'aigc_gateway',
        //   tab: '网关大模型'
        // },
        // {
        //   key: 'airpageaigc',
        //   tab: 'WPS AI'
        // }
      ],
      key: 'kdocs_comment',
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
          customRender: (text, record) =>moment.unix(record.report_date).format("YYYY/MM/DD"),
          ellipsis: true
        },
        {
          title: '通过总数',
          dataIndex: 'pass_count'
        },
        {
          title: '拒绝总数',
          dataIndex: 'forbid_count'
        },
        {
          title: '机器拒绝数',
          dataIndex: 'machine.forbid_count',
          ellipsis: true
        },
        {
          title: '涉政',
          dataIndex: 'politics_count',
          ellipsis: true
        },
        {
          title: '色情',
          dataIndex: 'porn_count',
          ellipsis: true
        },
        {
          title: '广告',
          dataIndex: 'terror_count',
          ellipsis: true
        },
        {
          title: '非法',
          dataIndex: 'illegal_count',
          ellipsis: true
        },
        {
          title: '人审拒绝数',
          dataIndex: 'manual.forbid_count',
          ellipsis: true
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
        biz: 'kdocs_comment',
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
    onTabChange(key, type) {
      this[type] = key;
      this.filterList.biz = key;
      this.getReportMonth();
    },
    getReportMonth() {
      const { biz, user_id, start_time, end_time, type, page, limit } = this.filterList;
      this.loading = true;
      getReportMonthData({ biz, user_id, start_time, end_time, type, page: page - 1, limit }).then(res => {
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
      this.getReportMonth();
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
    
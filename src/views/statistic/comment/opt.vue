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
        :pagination="{
          pageSize: filterList.limit,
          current: filterList.page,
          total: filterList.total,
          showTotal: total => `${filterList.total} 条`
        }"
        @changeCurrent="handleChangeCurrent"
      >
        <!-- <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="money" slot-scope="{ text }">¥ {{ text }}</div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)"> 编辑 </a-button>
          <a-popconfirm title="你确定要删除当前列吗?" ok-text="是" cancel-text="否" @confirm="handleDelete(text)">
            <a-button type="danger" size="small" style="margin-left: 8px"> 删除 </a-button>
          </a-popconfirm>
        </div> -->
      </standard-table>
    </a-card>

    <!-- <a-modal
      title="编辑"
      :visible="editShow"
      okText="确认"
      cancelText="取消"
      :width="620"
      @ok="handleOk"
      @cancel="editShow = false"
    >
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" hideRequiredMark>
        <a-form-model-item prop="id" label="id">
          <a-input v-model="currentEdit.id" disabled />
        </a-form-model-item>
        <a-form-model-item prop="name" label="付款人">
          <a-input v-model="currentEdit.name" disabled />
        </a-form-model-item>
        <a-form-model-item prop="status" label="订单状态">
          <a-input v-model="currentEdit.status" disabled />
        </a-form-model-item>
        <a-form-model-item prop="date" label="下单时间">
          <a-input v-model="currentEdit.date" disabled />
        </a-form-model-item>
        <a-form-model-item prop="money" label="付款金额">
          <a-input v-model="currentEdit.money" disabled />
        </a-form-model-item>
        <a-form-model-item prop="text" label="备注">
          <a-input v-model="currentEdit.text" />
        </a-form-model-item>
      </a-form-model>
    </a-modal> -->
  </div>
</template>
  <script>
import moment from 'moment';
import { getReportMonthData } from '@/api/statistic';
import standardTable from '@/components/standardTable/index';
import { getTableData, deleteTable, batchDeleteTable, editTable } from '@/api/table';
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
        }
      ],
      key: 'kdocs_comment',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      dateFormat: 'YYYY/MM/DD',
      formState: { time: [start_time, end_time]},
      searchList: {},
      typeOption: [
        {
          key: '待付款',
          label: '待付款'
        },
        {
          key: '待发货',
          label: '待发货'
        },
        {
          key: '已发货',
          label: '已发货'
        },
        {
          key: '已收货',
          label: '已收货'
        },
        {
          key: '已评价',
          label: '已评价'
        }
      ],
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
          customRender: (text, record) => moment.unix(record.report_date).format('YYYY/MM/DD'),
          ellipsis: true
        },
        {
          title: '评论总数',
          dataIndex: 'total'
        },
        {
          title: '机审拒绝数',
          dataIndex: 'machine.forbid_count'
        },
        {
          title: '人审评论数',
          dataIndex: 'manual.total',
          ellipsis: true
        },
        {
          title: '人审通过数',
          dataIndex: 'manual.pass_count',
          ellipsis: true
        },
        {
          title: '人审拒绝数',
          dataIndex: 'manual.forbid_count',
          ellipsis: true
        },
        {
          title: '违规评论数',
          dataIndex: 'forbid_count',
          customRender: (text, record) =>
            record.manual.politics_count +
            record.manual.porn_count +
            record.manual.illegal_count +
            record.manual.terror_count +
            record.manual.vulgar_count +
            record.manual.underage_count,
          ellipsis: true
        },
        {
          title: '整体时效',
          customRender: (text, record) =>
            (parseFloat(record.manual.avg_delay_time) + parseFloat(record.manual.avg_manual_cost)).toFixed(4),
          // dataIndex: 'manual.avg_delay_time + manual.avg_manual_cost',
          ellipsis: true
        }
        // {
        //   title: '操作',
        //   scopedSlots: { customRender: 'action' },
        //   width: 140
        // }
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
    this.getReportMonth();
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key;
      this.filterList.biz = key;
      this.getReportMonth();
    },
    getReportMonth() {
      const { biz, user_id, start_time, end_time, type, page, limit } = this.filterList;
      // let params = {
      //   biz: 'kdocs_comment',
      //   user_id: 100347,
      //   type: 'all',
      //   start_time: 1682524800,
      //   end_time: 1683539263,
      //   page: 0,
      //   limit: 20
      // };
      this.loading = true;
      getReportMonthData({ biz, user_id, start_time, end_time, type, page: page - 1, limit }).then(res => {
        const data = res.data || {};
        this.filterList.total = data.count || 0;
        this.tableData = data.records || [];
        this.loading = false;
      });
    },

    handleChangeCurrent(val) {
      console.log('查看分页', val);
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
  
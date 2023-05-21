<template>
  <div class="roleManage-wrapper">
    <a-card :hoverable="true" :bordered="false" v-if="!isEdit">
      <div slot="title" class="flex flex-wrap">
        <div style="padding: 3px 10px; font-weight: 600">业务编号</div>
        <a-input v-model="value" style="width: 200px; margin-right: 5px" />
        <a-button type="primary" icon="search" class="select-bottom" @click="handleAdd"> 搜索 </a-button>
      </div>
      <standard-table :tableData="tableData" :tableHead="tableHead" :loading="loading" :pagination="pagination">
        <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)"> 查看 </a-button>
          <a-popconfirm
            title="你确定要禁用当前用户嘛?"
            ok-text="是"
            cancel-text="否"
            :disabled="text.role && text.role == 'admin'"
            @confirm="handleDelete(text)"
          >
            <a-button type="danger" size="small" style="margin-left: 8px" :disabled="text.role && text.role == 'admin'">
              禁用
            </a-button>
          </a-popconfirm>
        </div>
        <div slot="operator" slot-scope="{ text }">
          <span>{{ text.operator }}</span>
          <img style="width: 30px; margin-left: 5px" src="@/assets/img/avator.png" />
        </div>
      </standard-table>
    </a-card>
    <a-card v-else>
      <edit-form @cancel="cancel" :data="currentRow" />
    </a-card>
  </div>
</template>

<script>
import standardTable from '@/components/standardTable/index';
import EditForm from './components/editForm.vue';
const tableHead = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '业务编号',
    dataIndex: 'businessId',
    ellipsis: true
  },
  {
    title: '来源标记',
    dataIndex: 'from',
    ellipsis: true
  },
  {
    title: '限制资源',
    dataIndex: 'limit',
    ellipsis: true
  },
  {
    title: '请求限流',
    dataIndex: 'requestLimit',
    ellipsis: true
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    ellipsis: true
  },
  {
    title: '操作人',
    scopedSlots: { customRender: 'operator' },
    ellipsis: true
  },
  {
    title: '启用状态',
    dataIndex: 'status',
    ellipsis: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 140
  }
];
export default {
  name: 'roleManage',
  components: { standardTable, EditForm },
  data() {
    return {
      loading: false,
      isEdit: false,
      value: '',
      tableData: [],
      currentRow: null,
      dialogVisible: false,
      tableHead,
      pagination: {
        current: 0,
        pageSize: 6,
        total: 2
      }
    };
  },
  created() {
    this.getdata();
  },
  computed: {
    userInfo() {
      return this.$store.state.user.accountInfo;
    }
  },

  methods: {
    //新增
    cancel() {
      this.isEdit = false;
    },
    handleAdd() {
      this.currentRow = null;
      this.dialogVisible = true;
    },
    getdata() {
      this.tableData = [
        {
          index: '1',
          businessId: 'drive_core1',
          from: 'AFSXXXXXDDMDMDMDM',
          limit: '/api/audit/text',
          requestLimit: '50-S',
          updateTime: '2023-05-15 17:58:06',
          operator: 'ppq',
          status: 'on',
          id: '1'
        },
        {
          index: '2',
          businessIsd: 'drive_core2',
          from: 'AFSXXXXXDDMDMDMDM',
          limit: '/api/audit/text',
          requestLimit: '50-S',
          updateTime: '2023-05-15 17:58:06',
          operator: 'ppq',
          status: 'on',
          id: '2'
        }
      ];
    },
    handleEdit(text) {
      this.currentRow = text;
      this.isEdit = true;
    }
  }
};
</script>

<style></style>

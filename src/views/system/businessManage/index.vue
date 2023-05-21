<template>
  <div class="roleManage-wrapper">
    <a-card :hoverable="true" :bordered="false" v-if="!isEdit">
      <div slot="title" class="flex flex-wrap">
        <div style="padding: 3px 10px; font-weight: 600">业务编号</div>
        <a-input v-model="value" style="width: 200px; margin-right: 5px" />
        <a-button type="primary" icon="search" class="select-bottom" @click="handleSearch"> 搜索 </a-button>
      </div>
      <standard-table
        :tableData="tableData"
        :tableHead="tableHead"
        :loading="loading"
        :pagination="pagination"
        @changeCurrent="handleChange"
      >
        <!-- todo:两个slot  -->
        <div slot="operator" slot-scope="{ text }">
          <span>{{ text.userid }}</span>
          <img src="@/assets/img/avator.png" style="width: 30px; margin-left: 5px" />
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
      </standard-table>
    </a-card>
    <a-card v-else>
      <edit-form @cancel="cancel"></edit-form>
    </a-card>
  </div>
</template>

<script>
import standardTable from '@/components/standardTable/index';
import editForm from './/components/editForm.vue';
const tableHead = [
  {
    title: '队列名称',
    dataIndex: 'task_name'
  },
  {
    title: '队列描述',
    dataIndex: 'task_desc',
    ellipsis: true
  },
  {
    title: '修改时间',
    dataIndex: 'modify_time',
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
  created() {
    this.getData();
  },
  components: {
    standardTable,
    editForm
  },
  data() {
    return {
      loading: false,
      pagination: {
        current: 0,
        pageSize: 6,
        total: 9
      },
      isEdit: false,
      value: '',
      tableData: [],
      currentRow: null,
      dialogVisible: false,
      tableHead
    };
  },
  methods: {
    handleDelete(text) {
      console.log(text);
    },
    getData() {
      // getTasks({ pagenum: 0, pagesize: 10 })
      //   .then(resp => {
      //     console.log(resp);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.tableData = [
        {
          task_name: '1一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '2一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '3一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '4一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '5一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '6一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '7一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '8一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        },
        {
          task_name: '9一线待审',
          task_desc: '描述',
          modify_time: '2023-05-23 17:58:02',
          userid: 'ppq',
          status: 'on'
        }
      ];
    },
    handleEdit(text) {
      this.isEdit = true;
      console.log(text);
    },
    handleSearch() {},
    handleChange(val) {
      this.pagination.current = val;
    },
    cancel() {
      this.isEdit = false;
    }
  }
};
</script>

<style></style>

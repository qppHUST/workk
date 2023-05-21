<template>
  <div class="roleManage-wrapper">
    <a-card :hoverable="true" :bordered="false" v-if="!isEdit">
      <div slot="title" class="flex flex-wrap" style="justify-content: space-between">
        <div>
          <span style="padding: 3px 10px; font-weight: 600">文件格式</span>
          <a-input v-model="value" style="width: 200px; margin-right: 5px" />
          <a-button type="primary" icon="search" class="select-bottom" @click="handleAdd"> 搜索 </a-button>
        </div>
        <a-button icon="plus" type="primary" style="margin-right: 30px" @click="showModal">新增格式</a-button>
      </div>
      <standard-table :tableData="tableData" :tableHead="tableHead" :loading="loading" :pagination="pagination">
        <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)"> 编辑 </a-button>
          <a-popconfirm
            title="你确定要禁用当前用户嘛?"
            ok-text="是"
            cancel-text="否"
            :disabled="text.role && text.role == 'admin'"
            @confirm="handleDelete(text)"
          >
            <a-button type="danger" size="small" style="margin-left: 8px" :disabled="text.role && text.role == 'admin'">
              删除
            </a-button>
          </a-popconfirm>
        </div>
        <div slot="operator" slot-scope="{ text }">
          <span>{{ text.userid }}</span>
          <img style="width: 30px; margin-left: 5px" src="@/assets/img/avator.png" />
        </div>
      </standard-table>
    </a-card>
    <a-card v-else>
      <edit-form @cancel="cancel" :data="currentRow" />
    </a-card>
    <a-modal
      title="新增(编辑)"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="提交"
      cancel-text="取消"
    >
      <div>
        <span>新增格式</span>
        <a-input style="width: 300px; margin-left: 20px" />
      </div>
      <div style="margin-top: 30px">
        <span>解析模板</span>
        <a-select default-value="lucy" style="width: 300px; margin-left: 20px" @change="handleChange">
          <a-select-option value="jack"> Jack </a-select-option>
          <a-select-option value="lucy"> Lucy </a-select-option>
          <a-select-option value="Yiminghe"> yiminghe </a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>

<script>
import standardTable from '@/components/standardTable/index';
import EditForm from './components/formatParsingEditor.vue';
const tableHead = [
  {
    title: '序号',
    dataIndex: 'id'
  },
  {
    title: '文件格式',
    dataIndex: 'file_ext',
    ellipsis: true
  },
  {
    title: '格式描述',
    dataIndex: 'ext_desc',
    ellipsis: true
  },
  {
    title: '解析模板',
    dataIndex: 'extract_type',
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
      visible: false,
      confirmLoading: false,
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
    showModal() {
      this.visible = true;
    },
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
          id: '1',
          file_ext: 'drive_core1',
          ext_desc: 'AFSXXXXXDDMDMDMDM',
          extract_type: '/api/audit/text',
          modify_time: '2023-05-15 17:58:06',
          userid: 'ppq',
          status: 'on'
        },
        {
          id: '2',
          file_ext: 'drive_core1',
          ext_desc: 'AFSXXXXXDDMDMDMDM',
          extract_type: '/api/audit/text',
          modify_time: '2023-05-15 17:58:06',
          userid: 'ppq',
          status: 'on'
        }
      ];
    },
    handleEdit(text) {
      this.currentRow = text;
      this.isEdit = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    handleChange(val) {}
  }
};
</script>

<style></style>

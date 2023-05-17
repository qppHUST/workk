<template>
  <a-menu v-show="visible" class="contextmenu" :style="style" :selectedKeys="selectedKeys" @click="handleClick">
    <a-menu-item :key="item.key" v-for="item in itemList">
      <a-icon v-if="item.icon" :type="item.icon" />
      <span>{{ item.text }}</span>
    </a-menu-item>
  </a-menu>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      target: null,
      meta: null,
      selectedKeys: [],
      itemList: [
        { key: '1', icon: 'vertical-right', text: '关闭左侧' },
        { key: '2', icon: 'vertical-left', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其他' },
        { key: '4', icon: 'sync', text: '刷新页面' }
      ]
    };
  },
  computed: {
    style() {
      return {
        left: this.left + 'px',
        top: this.top + 'px'
      };
    }
  },
  created() {
    window.addEventListener('click', this.closeMenu);
    window.addEventListener('contextmenu', this.setPosition);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeMenu);
    window.removeEventListener('contextmenu', this.setPosition);
  },
  methods: {
     closeMenu () {
      this.$emit('update:visible', false)
    },
       setPosition (e) {
      this.left = e.clientX
      this.top = e.clientY
      this.target = e.target
      this.meta = e.meta
    },
    handleClick({key}) {
      this.$emit('select', key, this.target, this.meta)
      this.closeMenu()
    }
  }
};
</script>
<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  z-index: 1000;
  border-radius: 4px;
  // box-shadow: -4px 4px 16px 1px @shadow-color !important;
}
.ant-menu-item {
  margin: 0 !important; // 菜单项之间的缝隙会影响点击
}
</style>
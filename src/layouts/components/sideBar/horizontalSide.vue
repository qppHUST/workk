<template>
  <div class="horizontalSide-wrapper flex-sub">
    <logo class="horizontalSide-logo" :collapse="collapsed" v-if="layout == 'horizontal'" />
    <a-menu mode="horizontal" theme="dark" :selectedKeys="[$route.path]" class="side-main">
      <template v-for="item in menuData">
        <menu-item v-if="!item.children && !item.hidden" :key="item.path" :currentRoute="item" />
        <template v-else v-for="temp in item.children">
          <menu-item v-if="!temp.children" :key="temp.path" :currentRoute="temp" />
          <sub-menu v-else :key="temp.path" :currentRoute="temp"></sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'sideBar',
  components: { logo, subMenu, menuItem },
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    menuData: {
      type: Array,
      default: () => []
    },
    layoutType: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      layout: state => state.setting.layout
    }),
    ...mapGetters(['baseRoute'])
  }
};
</script>
<style lang="scss" scoped>
.horizontalSide-logo {
  height: 54px;
  line-height: 54px;
  width: 220px;
}
.side-main {
  width: calc(100% - 220px);
  padding-left: 20px;
  height: 54px;
  line-height: 54px;
  background: #293348;
  float: right;
}
</style>

<template>
  <div class="side-wrapper">
    <!-- <div style="background: #000"> -->
    <logo :collapse="collapsed" v-if="show"  />
    <!-- </div> -->
    <scroll-bar class="side-main">
      <a-menu
        :mode="mode"
        :inline-collapsed="!collapsed"
        theme="dark"
        :selectedKeys="[$route.path]"
        :open-keys="openKeys"
        @openChange="changeOpen"
      >
        <!-- <template v-for="item in baseRoute">
          <menu-item v-if="!item.children && !item.hidden" :key="item.path" :currentRoute="item" />
          <template v-else v-for="temp in item.children">
            <menu-item v-if="!temp.children" :key="temp.path" :currentRoute="temp" />
            <sub-menu v-else :key="temp.path" :currentRoute="temp"></sub-menu>
          </template>
        </template> -->
        <template v-for="item in menuData">
          <menu-item v-if="!item.children && !item.hidden" :key="item.path" :currentRoute="item" />
          <template v-else v-for="temp in item.children">
            <menu-item v-if="!temp.children" :key="temp.path" :currentRoute="temp" />
            <sub-menu v-else :key="temp.path" :currentRoute="temp"></sub-menu>
          </template>
        </template>
      </a-menu>
    </scroll-bar>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
import { mapGetters } from 'vuex';
export default {
  name: 'sideBar',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'inline'
    },
    menuData: {
      type: Array,
      default: () => []
    },
    layoutType: {
      type: String,
      default: 'inline'
    }
  },
  components: { logo, subMenu, menuItem },
  data() {
    return {
      openKeys: []
    };
  },
  computed: {
    ...mapGetters(['baseRoute'])
    // 混合导航时侧边栏计算
    // subMenu() {
    //   return function () {
    //     if (this.layoutType == 'mix') {
    //       let tempArr = JSON.parse(JSON.stringify(this.baseRoute));
    //       return tempArr.map(item => {
    //         if (item.children) {
    //           item.children.forEach(subItem => {
    //             delete subItem.children;
    //           });
    //         }
    //         return item;
    //       });
    //     } else {
    //       return this.baseRoute;
    //     }
    //   };
    // }
  },
  mounted() {
    let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
    if (matched.length > 1) {
      this.openKeys = matched.map(item => item.path);
    }
  },
  methods: {
    changeOpen(keys) {
      const currentOpenKey = keys.find(key => this.openKeys.indexOf(key) === -1);
      const children = this.baseRoute.filter(item => item.children);

      if (children[0].children.findIndex(item => item.path == currentOpenKey) === -1) {
        this.openKeys = keys;
      } else {
        this.openKeys = currentOpenKey ? [currentOpenKey] : [];
      }
    }
  }
};
</script>

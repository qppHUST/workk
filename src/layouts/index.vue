<template>
  <div class="all-container flex" :class="{ closeSide: !open, horizontal: horizontal }">
    <side-bar class="aside-container" :collapsed="open" v-if="!horizontal" :menuData="sideMenuData" />
    <div class="main-container" :class="{ hasTag: tagShow }">
      <div :class="{ 'fixed-header': fixHeader }">
        <nav-bar :collapsed="open" v-if="!horizontal && !mix" />
        <div v-else class="horizontal-nav flex" :class="{ 'mix-header': mix }">
          <horizontal-side :collapsed="open" :menuData="headMenuData" />
          <nav-bar :horizontal="horizontal || mix" class="nav-user"></nav-bar>
        </div>
        <tag-view v-if="tagShow" />
      </div>
      <div class="rightPanl fixed pointer" @click="changeVisivle">
        <a-icon type="setting" class="settingIcon" />
        <setting />
      </div>
      <div class="app-main">
        <router-view />
        <back-top />
      </div>
    </div>
  </div>
</template>

<script>
import { sideBar, navBar, tagView, setting, horizontalSide } from './components';
import backTop from '@/components/backTop/index';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'layout',
  components: { sideBar, navBar, tagView, setting, backTop, horizontalSide },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      open: state => state.setting.open,
      fixHeader: state => state.setting.fixHeader,
      tagShow: state => state.setting.tagShow,
      layout: state => state.setting.layout
    }),
    ...mapGetters(['baseRoute']),
    ...mapGetters('setting', ['firstMenu', 'subMenu']),
    headMenuData() {
      const { layout, baseRoute, firstMenu } = this;
      return layout === 'mix' ? firstMenu : baseRoute;
    },
    sideMenuData() {
      const { layout, baseRoute, subMenu } = this;
      return layout === 'mix' ? subMenu : baseRoute;
    },
    horizontal() {
      return this.layout == 'horizontal';
    },
    mix() {
      return this.layout == 'mix';
    }
  },
  methods: {
    ...mapMutations('setting', ['setActivatedFirst']),
    changeVisivle() {
      this.$store.dispatch('setting/changeVisible', true);
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched;
        matched = matched.slice(1);
        const { firstMenu } = this;
        for (let menu of firstMenu[0].children) {
          if (matched.findIndex(item => item.path === menu.path) !== -1) {
            this.setActivatedFirst(menu.path);
            break;
          }
        }
      }
    }
  },
  created() {
    this.setActivated(this.$route);
  },
  watch: {
    $route(val) {
      this.setActivated(val);
    },
    layout() {
      this.setActivated(this.$route);
    }
  }
};
</script>
<style lang="scss" scoped>
.aside-container {
  background: rgb(41, 51, 72);
  transition: width 0.28s;
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
}

.main-container {
  height: 100%;
  width: calc(100% - 220px);
  margin-left: 220px;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 996;
    transition: width 0.28s;
    width: calc(100% - 220px);
    & ~ .app-main {
      padding-top: 54px;
      min-height: 100vh;
    }
    .mix-header {
      margin-left: -220px;
    }
  }

  .paddingBox-container {
    min-height: calc(100vh - 54px);
  }
}
.hasTag {
  .fixed-header {
    & ~ .app-main {
      padding-top: 100px !important;
      min-height: 100vh;
    }
  }
  .paddingBox-container {
    min-height: calc(100vh - 100px);
  }
}

.closeSide {
  .aside-container {
    width: 80px;
  }
  .main-container {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  .fixed-header {
    width: calc(100% - 80px);
  }
}

.rightPanl {
  right: 1px;
  top: 300px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  color: #fff;
  background: #1890ff;
  border-radius: 6px 0 0 6px;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  z-index: 999;
}
.app-main {
  min-height: calc(100vh - 100px);
}

//水平布局
.horizontal {
  .aside-container {
    width: 0;
  }
  .horizontal-nav {
    background: #293348;
    color: #f1f1f1;
    height: 54px;
    line-height: 54px;
  }
  .main-container {
    width: 100%;
    margin-left: 0;
  }
  .fixed-header {
    width: 100%;
  }
  .nav-user {
    background: #293348;
  }
  .app-main {
    width: 100%;
    box-sizing: border-box;
    padding: 0 6%;
    background: #f0f2f5;
  }
}
</style>

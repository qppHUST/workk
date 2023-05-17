import { getCache, setCache } from '@/utils/session';
import { formatFullPath } from '@/utils/i18n'
const state = {
  open: true,
  fixHeader: getCache('FIX_HEARDER') == null ? true : getCache('FIX_HEARDER'),
  tagShow: getCache('TAG_SHOW') == null ? true : getCache('TAG_SHOW'),
  settingVisible: false,
  layout: getCache('LAYOUT') || 'mix',
  theme: getCache('THEME') || 'mixins',
  activatedFirst: undefined,
  firstMenu: [],
  subMenu: []
};

const mutations = {
  TOGGLE_OPEN(state) {
    state.open = !state.open;
  },
  CHANGE_SETTING(state, { key, value, cache }) {
    // eslint-disable-next-line
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      setCache(cache, value);
    }
  },
  CHANGE_VISIBLE(state, bool) {
    state.settingVisible = bool;
  },
  setActivatedFirst(state, activatedFirst) {
    state.activatedFirst = activatedFirst
  },
};
const getters = {
  firstMenu(state, getters, rootState) {
    const menuData = JSON.parse(JSON.stringify(rootState.permission.routes))
    return menuData.map(item => {
      if (item.children) {
        item.children.forEach(subItem => {
          delete subItem.children;
        });
      }
      return item;
    })
  },
  subMenu(state, getters, rootState) {
    const { activatedFirst } = state
    const menuData = rootState.permission.routes
    // if (menuData.length > 0 && !menuData[0].fullPath) {
    //   formatFullPath(menuData)
    // }
    // const current = menuData.find(menu => {
    //   console.log('menu', menu);
    //     console.log('？？？？？', menu);
    //     menu.children.forEach(subMenu => {
    //       console.log('爱情的猪', subMenu.path , activatedFirst, subMenu.path === activatedFirst);
    //       return subMenu.path === activatedFirst
    //     });
    // })

    const current = menuData[0].children.find(menu => menu.path === activatedFirst)
    return current && current.children || []
  }
}
const actions = {
  changeSetting({ commit }, setting) {
    commit('CHANGE_SETTING', setting);
  },
  changeVisible({ commit }, bool) {
    commit('CHANGE_VISIBLE', bool);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

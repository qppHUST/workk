const state = {
  tagList: [
    {
      path: '/index',
      meta: {
        title: '首页'
      }
    }
  ]
};

const mutations = {
  ADD_TAGS(state, route) {
    const index = state.tagList.findIndex(item => item.path == route.path);
    if (index == -1) {
      state.tagList.push({
        ...route
      });
    }
  },
  REMOVE_TAGS(state, path) {
    const index = state.tagList.findIndex(item => item.path == path);
    state.tagList.splice(index, 1);
  },
  CLEAR_RIGHT_TAGS(state, path) {
    const index = state.tagList.findIndex(item => item.path == path);
    state.tagList.splice(index + 1);
  },
  CLEAR_LEFT_TAGS(state, path) {
    const index = state.tagList.findIndex(item => item.path == path);
    state.tagList = state.tagList.splice(index);
  },
  CLEAR_OTHER_TAGS(state, path) {
    const index = state.tagList.findIndex(item => item.path == path);
    state.tagList = state.tagList.splice(index, 1);
  },
  CLEAR_TAGS(state) {
    state.tagList = [
      {
        path: '/index',
        meta: {
          title: '首页'
        }
      }
    ];
  }
};

const actions = {
  addTag({ commit }, route) {
    commit('ADD_TAGS', route);
  },
  removeTag({ state, commit }, path) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TAGS', path);
      resolve(state.tagList);
    });
  },
  clearRight({ state, commit }, path) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_RIGHT_TAGS', path);
      resolve(state.tagList);
    });
  },
  clearLeft({ state, commit }, path) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_LEFT_TAGS', path);
      resolve(state.tagList);
    });
  },
  clearOther({ state, commit }, path) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_OTHER_TAGS', path);
      resolve(state.tagList);
    });
  },
  clearTag({ commit }) {
    commit('CLEAR_TAGS');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

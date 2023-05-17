import router from './router';
import { getCache } from '@/utils/session';
import getPageTitle from '@/utils/getPageTitle';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { message } from 'ant-design-vue';
import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // document.title = getPageTitle(to.meta.title);
  // const isLogin = getCache('TOKEN');
  const isLogin = getCache('LOGIN_SUCCESS');
  if (to.path == '/login') {
    next();
    NProgress.done();
  } else {
    if (!isLogin) {
      console.log("没登陆,要去 ：",to)
      next('/login');
      // next()
    } else {
      const route = store.state.permission.routes;
      if (route.length > 0) {
        next();
        NProgress.done();
      } else {
        const userInfo = store.state.user.accountInfo;
        try {
          // const { roleIds } = userInfo;
          const roleIds =  '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36'
          const accountRoute = await store.dispatch('permission/getRoute', roleIds);
          router.addRoutes(accountRoute);
          if (from.path == '/login') {
            next(accountRoute[0].children[0].path);
          } else {
            next({ ...to, replace: true });
          }
          NProgress.done();
        } catch (error) {
          console.log(error);
          message.error('获取用户信息失败');
          next('/login');
          NProgress.done();
        }
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

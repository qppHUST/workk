import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layouts';
import mainLayout from '@/layouts/mainLayout';
import standardLayout from '@/layouts/standardLayout.vue';

//基础路由
export const baseRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error/500'),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index'),
        meta: {
          role: 1,
          title: '首页',
          icon: 'dashboard'
        }
      },

      // {
      //   name: 'icon',
      //   path: '/icon',
      //   component: () => import('@/views/icon/index'),
      //   meta: {
      //     role: 2,
      //     title: '图标',
      //     icon: 'icon'
      //   }
      // },
      {
        name: 'statistic',
        path: '/statistic',
        component: mainLayout,
        redirect: '/statistic/comment',
        meta: {
          role: 1,
          title: '数据管理'
        },
        children: [
          {
            name: 'comment',
            path: '/statistic/comment',
            component: () => import('@/views/statistic/index'),
            redirect: '/statistic/comment/opt',
            meta: {
              // role: 1,
              title: '评论',
              icon: 'dashboard'
            },
            children: [
              {
                name: 'opt',
                path: '/statistic/comment/opt',
                component: () => import('@/views/statistic/comment/opt'),
                meta: { title: '评论-操作概况（月）', role: 1 }
              },
              {
                name: 'violation',
                path: '/statistic/comment/violation',
                component: () => import('@/views/statistic/comment/violation'),
                meta: { title: '违规记录（月）', role: 1 }
              },
              {
                name: 'nickname',
                path: '/statistic/comment/nickname',
                component: () => import('@/views/statistic/comment/nickname'),
                meta: { title: '昵称处理（日）', role: 1 }
              },
              {
                name: 'ai',
                path: '/statistic/comment/ai',
                component: () => import('@/views/statistic/comment/ai'),
                meta: { title: 'AI报表', role: 1 }
              },
              {
                name: 'summary',
                path: '/statistic/comment/summary',
                component: () => import('@/views/statistic/comment/summary'),
                meta: { title: '操作概况（月）', role: 1 }
              },
              {
                name: 'day',
                path: '/statistic/comment/day',
                component: () => import('@/views/statistic/comment/day'),
                meta: { title: '操作概况（日）', role: 1 }
              },
              {
                name: 'efficiency',
                path: '/statistic/comment/efficiency',
                component: () => import('@/views/statistic/comment/efficiency'),
                meta: { title: '时效', role: 1 }
              },
              {
                name: 'test',
                path: '/statistic/comment/test',
                component: () => import('@/views/statistic/comment/test'),
                meta: { title: 'test', role: 1 }
              }
            ]
          }
        ]
      },

      // {
      //   name: 'drag',
      //   path: 'http://gist006.gitee.io/vue-visual-drag/#/',
      //   component:Layout,
      //   meta: {
      //     title: '可视化拖拽',
      //     icon: 'drag',
      //     role: 3,
      //   }
      // },
      // {
      //   name: 'vue3',
      //   path: 'https://gist006.gitee.io/vue3-bigdata/#/homepage',
      //   component:Layout,
      //   meta: {
      //     title: 'vue3大屏',
      //     icon: 'vue3',
      //     role: 3,
      //   }
      // },
      // {
      //   name: 'music',
      //   path: 'http://gist006.gitee.io/uni-music/#/',
      //   component:Layout,
      //   meta: {
      //     title: '听听音乐',
      //     icon: 'music',
      //     role: 3,
      //   }
      // },
      // {
      //   name: 'webGl',
      //   component: mainLayout,
      //   path: '/webGl',
      //   redirect: '/webGl/ArcGis',
      //   meta: {
      //     role: 4,
      //     title: '地图',
      //     icon: 'webGl'
      //   },
      //   children: [
      //     {
      //       name: 'ArcGis',
      //       path: '/webGl/ArcGis',
      //       component: () => import('@/views/webGl/ArcGis/index'),
      //       meta: { title: 'ArcGis', role: 5 }
      //     },
      //     {
      //       name: 'OpenLayers',
      //       path: '/webGl/OpenLayers',
      //       component: () => import('@/views/webGl/OpenLayers/index'),
      //       meta: { title: '插值分析图', role: 6 }
      //     }
      //   ]
      // },
      // echartRouter,
      // componentsRouter,
      // nestRouter,
      {
        name: 'error',
        path: '/error',
        component: mainLayout,
        redirect: '/error/403',
        meta: { title: '错误页面', icon: 'error', role: 7 },
        children: [
          {
            name: '403',
            path: '/error/403',
            component: () => import('@/views/error/403'),
            meta: { title: '403', role: 8 }
          },
          {
            name: '404',
            path: '/error/404',
            component: () => import('@/views/error/404'),
            meta: { title: '404', role: 9 }
          },
          {
            name: '500',
            path: '/error/500',
            component: () => import('@/views/error/500'),
            meta: { title: '500', role: 10 }
          }
        ]
      },
      {
        name: 'userSystem',
        component: mainLayout,
        path: '/userSystem',
        redirect: '/userSystem/userInfo',
        meta: { title: '个人设置', icon: 'user', role: 11 },
        children: [
          {
            name: 'userInfo',
            path: '/userSystem/userInfo',
            component: () => import('@/views/userSystem/userInfo/index'),
            meta: { title: '个人中心', role: 12 }
          },
          {
            name: 'setting',
            path: '/userSystem/setting',
            component: () => import('@/views/userSystem/setting/index'),
            meta: { title: '个人设置', role: 13 }
          }
        ]
      },
      {
        name: 'system',
        component: mainLayout,
        path: '/system',
        redirect: '/system/userManage',
        meta: {
          role: 14,
          title: '后台管理',
          icon: 'system'
        },
        children: [
          {
            name: 'userManage',
            path: '/system/userManage',
            component: () => import('@/views/system/userManage/index'),
            meta: { title: '用户管理', role: 15 }
          },
          {
            name: 'roleManage',
            path: '/system/roleManage',
            component: () => import('@/views/system/roleManage/index'),
            meta: { title: '角色管理', role: 16 }
          },
          {
            name: 'backendManage',
            path: '/system/backendManage',
            component: mainLayout,
            children: [
              {
                name: 'requestLimit',
                path: '/system/backendManage/requestLimit',
                component: standardLayout,
                meta: { title: '后台配置', role: 15 },
                children: [
                  {
                    name: 'requestLimit',
                    path: '/system/backendManage/requestLimit',
                    component: () => import('@/views/system/backendManage/index'),
                    meta: { title: '请求限流', role: 15 }
                  },
                  {
                    name: 'supplierManage',
                    path: '/system/backendManage/supplierManage',
                    component: () => import('@/views/system/backendManage/supplierManage'),
                    meta: { title: '供应商管理', role: 15 }
                  },
                  {
                    name: 'faultIsolation',
                    path: '/system/backendManage/faultIsolation',
                    component: () => import('@/views/system/backendManage/faultIsolation'),
                    meta: { title: '故障隔离', role: 15 }
                  },
                  {
                    name: 'resourceManage',
                    path: '/system/backendManage/resourceManage',
                    component: () => import('@/views/system/backendManage/resourceManage'),
                    meta: { title: '资源管理', role: 15 }
                  }
                ]
              }
            ]
          },
          {
            name: 'businessManage',
            path: '/system/businessManage',
            component: mainLayout,
            children: [
              {
                name: 'requestLimit',
                path: '/system/backendManage/requestLimit',
                component: standardLayout,
                meta: { title: '业务配置', role: 15 },
                children: [
                  {
                    name: 'queueDefinition',
                    path: '/system/businessManage/queueDefinition',
                    component: () => import('@/views/system/businessManage/index'),
                    meta: { title: '队列定义', role: 15 }
                  },
                  {
                    name: 'labelManage',
                    path: '/system/businessManage/labelManage',
                    component: () => import('@/views/system/businessManage/labelManage'),
                    meta: { title: '标签管理', role: 15 }
                  },
                  {
                    name: 'imageLabelMapping',
                    path: '/system/businessManage/imageLabelMapping',
                    component: () => import('@/views/system/businessManage/imageLabelMapping'),
                    meta: { title: '图片标签映射', role: 15 }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = function () {
  return new VueRouter({
    routes: baseRoute,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;

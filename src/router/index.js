/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import {
  IsTauri,
  IsElectron,
  IsMobileApp
} from '@/api/global.js'
// import { routes } from 'vue-router/auto-routes'

import ClientHome from '@/pages/client/home/index.vue';
import ClientTopics from '@/pages/client/topics/index.vue';
import ClientTopic from '@/pages/client/topic/index.vue';
import ClientQuestions from '@/pages/client/questions/index.vue';
import ClientQuestion from '@/pages/client/question/index-v1.vue';
import ClientArticles from '@/pages/client/articles/index.vue';
import ClientArticle from '@/pages/client/article/index-v1.vue';
import ClientUser from '@/pages/client/user/index.vue';
import ClientUsers from '@/pages/client/users/index.vue';
import ClientNotifications from '@/pages/client/notifications/index.vue';
import ClientNotificationsSetting from '@/pages/client/notifications/setting/index.vue';
import ClientLogin from '@/pages/client/login/index.vue';

import AdminHome from '@/pages/admin/index/index.vue';
import AdminTopics from '@/pages/admin/topics/index.vue';
import AdminQuestions from '@/pages/admin/questions/index.vue';
import AdminAnswers from '@/pages/admin/answers/index.vue';
import AdminArticles from '@/pages/admin/articles/index.vue';
import AdminComments from '@/pages/admin/comments/index.vue';
import AdminReplys from '@/pages/admin/replys/index.vue';
import AdminUserGroup from '@/pages/admin/user_groups/index.vue';
import AdminUsers from '@/pages/admin/users/index.vue';
import AdminReports from '@/pages/admin/reports/index.vue';
import AdminOptions from '@/pages/admin/options/index.vue';
import AdminOptionsInfo from '@/pages/admin/options/info.vue';
import AdminOptionsTheme from '@/pages/admin/options/theme.vue';
import AdminOptionsMail from '@/pages/admin/options/mail.vue';
import AdminOptionsOauth from '@/pages/admin/options/oauth.vue';

// const ClientHome = () => import('@/pages/client/home/index.vue');
// const ClientTopics = () => import('@/pages/client/topics/index.vue');
// const ClientTopic = () => import('@/pages/client/topic/index.vue');
// const ClientQuestions = () => import('@/pages/client/questions/index.vue');
// const ClientQuestion = () => import('@/pages/client/question/index-v1.vue');
// const ClientArticles = () => import('@/pages/client/articles/index.vue');
// const ClientArticle = () => import('@/pages/client/article/index-v1.vue');
// const ClientUser = () => import('@/pages/client/user/index.vue');
// const ClientUsers = () => import('@/pages/client/users/index.vue');
// const ClientNotifications = () => import('@/pages/client/notifications/index.vue');
// const ClientNotificationsSetting = () => import('@/pages/client/notifications/setting/index.vue');

// const AdminHome = () => import('@/pages/admin/index/index.vue');
// const AdminTopics = () => import('@/pages/admin/topics/index.vue');
// const AdminQuestions = () => import('@/pages/admin/questions/index.vue');
// const AdminAnswers = () => import('@/pages/admin/answers/index.vue');
// const AdminArticles = () => import('@/pages/admin/articles/index.vue');
// const AdminComments = () => import('@/pages/admin/comments/index.vue');
// const AdminReplys = () => import('@/pages/admin/replys/index.vue');
// const AdminUserGroup = () => import('@/pages/admin/user_groups/index.vue');
// const AdminUsers = () => import('@/pages/admin/users/index.vue');
// const AdminReports = () => import('@/pages/admin/reports/index.vue');
// const AdminOptions = () => import('@/pages/admin/options/index.vue');
// const AdminOptionsInfo = () => import('@/pages/admin/options/info.vue');
// const AdminOptionsTheme = () => import('@/pages/admin/options/theme.vue');
// const AdminOptionsMail = () => import('@/pages/admin/options/mail.vue');
// const AdminOptionsOauth = () => import('@/pages/admin/options/oauth.vue');

const Install = () => import('@/pages/new-install/index.vue')

import NotFound from '@/pages/404/index.vue';

import Test from '@/pages/test/index.vue';
import Badges from '@/pages/client/badges/index.vue';

const Info = () => import('@/pages/client/info/index.vue');
// import Xunzhang from '@/pages/test/xunzhang.vue';



// import MC from '@/components/mc/index.vue';

// import CarView from '@/components/asphalt/car-view.vue';
// import CarViewID from '@/components/asphalt/car-view-id.vue';
// import MapView from '@/components/asphalt/map-view.vue';

const routes = [
  // { path: '/mc', name: 'mc', component: MC },
  { path: '/test', name: 'test', component: Test },
  { path: '/badges', name: 'badges', component: Badges },
  { path: '/info', name: 'info', component: Info },
  { path: '/install', name: 'install', component: Install },
  // { path: '/xunzhang', name: 'xunzhang', component: Xunzhang },
  { path: '/', name: 'home', component: ClientHome, },
  { path: '/topics', name: 'topics', component: ClientTopics },
  { path: '/topics/:topic_id', name: 'topic', component: ClientTopic },
  { path: '/questions', name: 'questions', component: ClientQuestions },
  { path: '/questions/:question_id', name: 'question', component: ClientQuestion },
  { path: '/questions/:question_id/answers/:answer_id', name: 'question-answer', component: ClientQuestion },
  { path: '/articles', name: 'articles', component: ClientArticles },
  { path: '/articles/:article_id', name: 'article', component: ClientArticle },
  { path: '/users/:user_id', name: 'user', component: ClientUser },
  { path: '/users', name: 'users', component: ClientUsers },
  { path: '/notifications', name: 'notifications', component: ClientNotifications },
  { path: '/notifications/setting', name: 'notifications-setting', component: ClientNotificationsSetting },
  { path: '/login', name: 'login', component: ClientLogin },
  { path: '/:lang([a-z]{2}_[A-Z]{2})', name: 'lang-home', component: ClientHome, },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/topics', name: 'lang-topics', component: ClientTopics },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/topics/:topic_id', name: 'lang-topic', component: ClientTopic },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/questions', name: 'lang-questions', component: ClientQuestions },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/questions/:question_id', name: 'lang-question', component: ClientQuestion },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/questions/:question_id/answers/:answer_id', name: 'lang-question-answer', component: ClientQuestion },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/articles', name: 'lang-articles', component: ClientArticles },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/articles/:article_id', name: 'lang-article', component: ClientArticle },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/users/:user_id', name: 'lang-user', component: ClientUser },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/users', name: 'lang-users', component: ClientUsers },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/notifications', name: 'lang-notifications', component: ClientNotifications },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/notifications/setting', name: 'lang-notifications-setting', component: ClientNotificationsSetting },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/login', name: 'lang-login', component: ClientLogin },

  { path: '/', name: 'admin-home', component: AdminHome },
  { path: '/admin', name: 'admin-index', component: AdminHome },
  { path: '/admin/topics', name: 'admin-topics', component: AdminTopics },
  { path: '/admin/questions', name: 'admin-questions', component: AdminQuestions },
  { path: '/admin/answers', name: 'admin-answers', component: AdminAnswers },
  { path: '/admin/articles', name: 'admin-articles', component: AdminArticles },
  { path: '/admin/comments', name: 'admin-comments', component: AdminComments },
  { path: '/admin/replys', name: 'admin-replys', component: AdminReplys },
  { path: '/admin/usergroup', name: 'admin-usergroup', component: AdminUserGroup },
  { path: '/admin/users', name: 'admin-users', component: AdminUsers },
  { path: '/admin/reports', name: 'admin-reports', component: AdminReports },
  { path: '/admin/options', name: 'admin-options', component: AdminOptions },
  { path: '/admin/options/info', name: 'admin-options-info', component: AdminOptionsInfo },
  { path: '/admin/options/theme', name: 'admin-options-theme', component: AdminOptionsTheme },
  { path: '/admin/options/mail', name: 'admin-options-mail', component: AdminOptionsMail },
  { path: '/admin/options/oauth', name: 'admin-options-oauth', component: AdminOptionsOauth },
  { path: '/:lang([a-z]{2}_[A-Z]{2})', name: 'lang-admin-home', component: AdminHome },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin', name: 'lang-admin-index', component: AdminHome },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/topics', name: 'lang-admin-topics', component: AdminTopics },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/questions', name: 'lang-admin-questions', component: AdminQuestions },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/answers', name: 'lang-admin-answers', component: AdminAnswers },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/articles', name: 'lang-admin-articles', component: AdminArticles },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/comments', name: 'lang-admin-comments', component: AdminComments },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/replys', name: 'lang-admin-replys', component: AdminReplys },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/usergroup', name: 'lang-admin-usergroup', component: AdminUserGroup },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/users', name: 'lang-admin-users', component: AdminUsers },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/reports', name: 'lang-admin-reports', component: AdminReports },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/options', name: 'lang-admin-options', component: AdminOptions },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/options/info', name: 'lang-admin-options-info', component: AdminOptionsInfo },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/options/theme', name: 'lang-admin-options-theme', component: AdminOptionsTheme },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/options/mail', name: 'lang-admin-options-mail', component: AdminOptionsMail },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/admin/options/oauth', name: 'lang-admin-options-oauth', component: AdminOptionsOauth },

  // { path: '/asphalt/carview', name: 'asphalt-carview', component: CarView },
  // { path: '/asphalt/mapview', name: 'asphalt-mapview', component: MapView },
  // { path: '/asphalt/carview/:car_id', name: 'asphalt-carview-id', component: CarViewID },
  // { path: '/:lang([a-z]{2}_[A-Z]{2})/asphalt/carview', name: 'lang-asphalt-carview', component: CarView },
  // { path: '/:lang([a-z]{2}_[A-Z]{2})/asphalt/mapview', name: 'lang-asphalt-mapview', component: MapView },
  // { path: '/:lang([a-z]{2}_[A-Z]{2})/asphalt/carview/:car_id', name: 'lang-asphalt-carview-id', component: CarViewID },

  { path: '/:pathMatch(.*)*', name: '404', component: NotFound }
];

// const router = createRouter({
//   // 根据环境选择不同的路由配置
//   history: import.meta.env.MODE === 'development'
//     ? createWebHistory(import.meta.env.BASE_URL) // 开发环境使用 BASE_URL
//     : createWebHistory('/'), // 生产环境使用根路径
//   routes,
// })

const router = IsTauri() || IsElectron() || IsMobileApp() ? createRouter({
  history: import.meta.env.MODE === 'development'
    ? createWebHistory(import.meta.env.BASE_URL) // 开发环境使用 BASE_URL
    : createWebHashHistory('/'),
  // history: createWebHashHistory('/'),
  routes,
}) : createRouter({
  // 根据环境选择不同的路由配置
  history: import.meta.env.MODE === 'development'
    ? createWebHistory(import.meta.env.BASE_URL) // 开发环境使用 BASE_URL
    : createWebHistory('/'), // 生产环境使用根路径
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      // console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

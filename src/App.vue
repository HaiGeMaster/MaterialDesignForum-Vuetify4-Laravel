<template>
  <v-layout class="rounded rounded-md border v-application v-theme--blackguard">
    <UpdateBanner />
    <AppBar v-if="!PageIsInstall" />

    <!-- <CsdAppBar v-else-if="mainStore.getPageLayout == 'csd'" /> -->
    <NavigationDrawer v-if="!PageIsInstall" :admin="PageIsAdmin" />
    <!-- v-if="pageLayout == 'mdforum'" -->
    <v-main class="d-flex align-center justify-center">
      <SearchFabDialog />

      <NoAllowUse
        v-if="
          !AppIsCanUse() &&
          !$router.currentRoute.value.path.includes('admin/options')
        "
      />
      <router-view v-else v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>

      <AddFabButton />
      <ToTopFabButton />
    </v-main>

    <!-- <v-main v-else-if="mainStore.getPageLayout == 'csd'">
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <NavList />
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <SearchFabDialog />

            <NoAllowUse v-if="!AppIsCanUse() && !$router.currentRoute.value.path.includes('admin/options')" />
            <router-view v-else v-slot="{ Component }">
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </router-view>

            <AddFabButton />
            <ToTopFabButton />
          </v-sheet>
        </v-col>
      </v-row>
    </v-main> -->

    <!-- <CsdMain v-else-if="pageLayout == 'csd'" /> -->
    <SettingNavigationDrawer :admin="PageIsAdmin" />
    <!-- v-if="mainStore.mobile" -->
    <BottomNavigation
      v-if="!PageIsInstall && mainStore.getMobile"
      :show="mainStore.getScrollMode == 'up'"
      :admin="PageIsAdmin"
    />

    <!-- :persistent="PageIsAdmin&&!userStore.getIsLogin"  -->
    <LoginDialog />
    <RegisterDialog />
    <ResetDialog />
    <ReportDialog />
    <UsersDialog />
    <TopicDialog
      @add_topic="
        (topic) => {
          !PageIsAdmin
            ? $router.push(`${UrlHeaderLang()}/topics/${topic.topic_id}`)
            : null;
        }
      "
      @edit_topic="
        (topic) => {
          !PageIsAdmin
            ? updateStore.setTopicUpdate(topic)
            : updateStore.setDataTableUpdate(topic);
        }
      "
    />
    <CommentsDialogV1 />
    <EditInfoDialog />
    <CommentReplyEditDialog
      @edit_comment="
        (comment) => {
          !PageIsAdmin
            ? updateStore.setCommentUpdate(comment)
            : updateStore.setDataTableUpdate(comment);
        }
      "
      @edit_reply="
        (reply) => {
          !PageIsAdmin
            ? updateStore.setReplyUpdate(reply)
            : updateStore.setDataTableUpdate(reply);
        }
      "
    />
    <TopicSelectorDialog
      :pre_selected_topics="fabDialogStore.getEditorFabDialog.md_topics"
      @selector_topics="
        (selector_topics) => {
          fabDialogStore.setEditorFabDialog({
            md_topics: selector_topics,
          });
        }
      "
    />
    <DeleteDialog
      @delete_topic="
        (topic) => {
          !PageIsAdmin
            ? $router.push(`${UrlHeaderLang()}/topics`)
            : updateStore.setDataTableUpdate(topic);
        }
      "
      @delete_question="
        (question) => {
          !PageIsAdmin
            ? $router.push(`${UrlHeaderLang()}/questions`)
            : updateStore.setDataTableUpdate(question);
        }
      "
      @delete_article="
        (article) => {
          !PageIsAdmin
            ? $router.push(`${UrlHeaderLang()}/articles`)
            : updateStore.setDataTableUpdate(article);
        }
      "
      @delete_answer="
        (answer) => {
          !PageIsAdmin
            ? updateStore.setAnswerUpdate(answer)
            : updateStore.setDataTableUpdate(answer);
        }
      "
      @delete_comment="
        (comment) => {
          !PageIsAdmin
            ? updateStore.setCommentUpdate(comment)
            : updateStore.setDataTableUpdate(comment);
        }
      "
      @delete_reply="
        (reply) => {
          !PageIsAdmin
            ? updateStore.setReplyUpdate(reply)
            : updateStore.setDataTableUpdate(reply);
        }
      "
      @delete_user="
        (user) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(user);
        }
      "
      @delete_report="
        (report) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(report);
        }
      "
      @delete_user_group="
        (user_group) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(user_group);
        }
      "
      @delete_topics="
        (topics) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(topics);
        }
      "
      @delete_questions="
        (questions) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(questions);
        }
      "
      @delete_articles="
        (articles) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(articles);
        }
      "
      @delete_answers="
        (answers) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(answers);
        }
      "
      @delete_comments="
        (comments) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(comments);
        }
      "
      @delete_users="
        (users) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(users);
        }
      "
      @delete_replys="
        (replys) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(replys);
        }
      "
      @delete_reports="
        (reports) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(reports);
        }
      "
      @delete_user_groups="
        (user_groups) => {
          !PageIsAdmin ? null : updateStore.setDataTableUpdate(user_groups);
        }
      "
    />
    <!-- <MdEditor
      @add_article="article => {
      !PageIsAdmin ? $router.push(`${UrlHeaderLang()}/articles/${article.article_id}`) : updateStore.setDataTableUpdate(article)
    }" @add_question="question => {
      !PageIsAdmin ? $router.push(`${UrlHeaderLang()}/questions/${question.question_id}`) : updateStore.setDataTableUpdate(question)
    }" @add_answer="answer => {
      !PageIsAdmin ? updateStore.setAnswerUpdate(answer) : updateStore.setDataTableUpdate(answer)
    }" @edit_article="article => {
      !PageIsAdmin ? updateStore.setArticleUpdate(article) : updateStore.setDataTableUpdate(article)
    }" @edit_question="question => {
      !PageIsAdmin ? updateStore.setQuestionUpdate(question) : updateStore.setDataTableUpdate(question)
    }" @edit_answer="answer => {
      !PageIsAdmin ? updateStore.setAnswerUpdate(answer) : updateStore.setDataTableUpdate(answer)
    }" /> -->
    <UserGroupEditDialog
      v-if="PageIsAdmin"
      @add_user_group="
        (user_group) => {
          updateStore.setDataTableUpdate(user_group);
        }
      "
      @edit_user_group="
        (user_group) => {
          updateStore.setDataTableUpdate(user_group);
        }
      "
    />
    <UserGroupSwitchDialog
      v-if="PageIsAdmin"
      @select="
        (val) => {
          updateStore.setDataTableUpdate(val);
        }
      "
    />
    <SnackbarQueue />
    <UseCookieDialog />
    <ShareBottomSheet />

    <CommentReplyBottomSheetV1 />

    <NewEditorFabDialog
      @add_article="
        (article) => {
          !PageIsAdmin
            ? $router.push(`${UrlHeaderLang()}/articles/${article.article_id}`)
            : updateStore.setDataTableUpdate(article);
        }
      "
      @add_question="
        (question) => {
          !PageIsAdmin
            ? $router.push(
                `${UrlHeaderLang()}/questions/${question.question_id}`,
              )
            : updateStore.setDataTableUpdate(question);
        }
      "
      @add_answer="
        (answer) => {
          !PageIsAdmin
            ? updateStore.setAnswerUpdate(answer)
            : updateStore.setDataTableUpdate(answer);
        }
      "
      @edit_article="
        (article) => {
          !PageIsAdmin
            ? updateStore.setArticleUpdate(article)
            : updateStore.setDataTableUpdate(article);
        }
      "
      @edit_question="
        (question) => {
          !PageIsAdmin
            ? updateStore.setQuestionUpdate(question)
            : updateStore.setDataTableUpdate(question);
        }
      "
      @edit_answer="
        (answer) => {
          !PageIsAdmin
            ? updateStore.setAnswerUpdate(answer)
            : updateStore.setDataTableUpdate(answer);
        }
      "
    />
  </v-layout>
</template>
<script>
import {
  GetUserToken,
  IsTauri,
  IsElectron,
  IsMobileApp,
  AddActivity,
  // AddClarityScript,
  // GetThemeSettingColor,
} from "@/api/global.js";

import AppBar from "@/components/appbar/index.vue";
import NavigationDrawer from "@/components/navigation-drawer/index.vue";
import BottomNavigation from "@/components/bottom-navigation/index.vue";

// import MdEditor from '@/components/md-editor/index.vue'

import AddFabButton from "@/components/add-fab-button/index.vue";
import CommentReplyBottomSheetV1 from "@/components/comments-v1/components/comment-reply-bottom-sheet/sheet.vue";
import NoAllowUse from "@/components/no-allow-use/index.vue";
import SettingNavigationDrawer from "@/components/setting-navigation-drawer/index.vue";
import ShareBottomSheet from "@/components/share-bottom-sheet/index.vue";
import SnackbarQueue from "@/components/snackbar-queue/index.vue";
import ToTopFabButton from "@/components/to-top-fab/index.vue";
import UpdateBanner from "@/components/update-banner/index.vue";

import CommentsDialogV1 from "@/components/comments-v1/dialog.vue";
import CommentReplyEditDialog from "@/components/dialog/comment-reply-edit-dialog/index.vue";
import DeleteDialog from "@/components/dialog/delete-dialog/index.vue";
import EditInfoDialog from "@/components/dialog/edit-info-dialog/index.vue";
import ReportDialog from "@/components/dialog/report-dialog/index.vue";
import TopicDialog from "@/components/dialog/topic-dialog/index.vue";
import UseCookieDialog from "@/components/dialog/use-cookie-dialog/index.vue";
import UserGroupEditDialog from "@/components/dialog/user-group-edit-dialog/index.vue";
import UserGroupSwitchDialog from "@/components/dialog/usergroup-switch-dialog/index.vue";
import NewEditorFabDialog from "@/components/fab-dialog/editor-fab-dialog/index.vue";
import SearchFabDialog from "@/components/fab-dialog/search-fab-dialog/new-index.vue";
import TopicSelectorDialog from "@/components/md-editor/components/topic-selector-dialog/index.vue";
import UsersDialog from "@/components/users-dialog/index.vue";
import LoginDialog from "@/components/account/login.vue";
import RegisterDialog from "@/components/account/register.vue";
import ResetDialog from "@/components/account/reset.vue";

// const CommentsDialogV1 = defineAsyncComponent(() => import("@/components/comments-v1/dialog.vue"));
// const CommentReplyEditDialog = defineAsyncComponent(() => import("@/components/dialog/comment-reply-edit-dialog/index.vue"));
// const DeleteDialog = defineAsyncComponent(() => import("@/components/dialog/delete-dialog/index.vue"));
// const EditInfoDialog = defineAsyncComponent(() => import("@/components/dialog/edit-info-dialog/index.vue"));
// const ReportDialog = defineAsyncComponent(() => import("@/components/dialog/report-dialog/index.vue"));
// const TopicDialog = defineAsyncComponent(() => import("@/components/dialog/topic-dialog/index.vue"));
// const UseCookieDialog = defineAsyncComponent(() => import("@/components/dialog/use-cookie-dialog/index.vue"));
// const UserGroupEditDialog = defineAsyncComponent(() => import("@/components/dialog/user-group-edit-dialog/index.vue"));
// const UserGroupSwitchDialog = defineAsyncComponent(() => import("@/components/dialog/usergroup-switch-dialog/index.vue"));
// const NewEditorFabDialog = defineAsyncComponent(() => import("@/components/fab-dialog/editor-fab-dialog/index.vue"));
// const SearchFabDialog = defineAsyncComponent(() => import("@/components/fab-dialog/search-fab-dialog/new-index.vue"));
// const TopicSelectorDialog = defineAsyncComponent(() => import("@/components/md-editor/components/topic-selector-dialog/index.vue"));
// const UsersDialog = defineAsyncComponent(() => import("@/components/users-dialog/index.vue"));
// const LoginDialog = defineAsyncComponent(() => import("@/components/account/login.vue"));
// const RegisterDialog = defineAsyncComponent(() => import("@/components/account/register.vue"));
// const ResetDialog = defineAsyncComponent(() => import("@/components/account/reset.vue"));

import { useMainStore } from "@/stores/main";
import { useUserStore } from "@/stores/user";
import { useUpdateStore } from "@/stores/update";
import { useDialogStore } from "@/stores/dialog";
import { useFabDialogStore } from "@/stores/fab-dialog";
import { useSnackbarStore } from "@/stores/snackbar";

import { useTheme } from "vuetify";
export default {
  name: "App",
  components: {
    // MdEditor,
    AddFabButton,
    AppBar,
    BottomNavigation,
    CommentReplyBottomSheetV1,
    CommentReplyEditDialog,
    CommentsDialogV1,
    DeleteDialog,
    EditInfoDialog,
    LoginDialog,
    NavigationDrawer,
    NewEditorFabDialog,
    NoAllowUse,
    RegisterDialog,
    ReportDialog,
    ResetDialog,
    SearchFabDialog,
    SettingNavigationDrawer,
    ShareBottomSheet,
    SnackbarQueue,
    ToTopFabButton,
    TopicDialog,
    TopicSelectorDialog,
    UpdateBanner,
    UseCookieDialog,
    UserGroupEditDialog,
    UserGroupSwitchDialog,
    UsersDialog,
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      updateStore: useUpdateStore(),
      dialogStore: useDialogStore(),
      fabDialogStore: useFabDialogStore(),
      snackbarStore: useSnackbarStore(),
      theme: useTheme(),
      display: null,
      isTauri: IsTauri(),
    };
  },
  computed: {
    name() {
      return this.$vuetify.display.name;
    },
    PageIsAdmin() {
      return this.$route.path.includes("/admin");
    },
    PageIsInstall() {
      return this.$route.path.includes("/install");
    },
    ReturnGetAppBaseInfo() {
      return this.mainStore.getAppBaseInfo;
    },
  },
  methods: {
    openFancybox(src) {
      // 手动调用 Fancybox 打开图片
      this.$Fancybox.show([
        {
          src,
          type: "image",
          caption: "图片预览", // 可选标题
        },
      ]);
    },
    onStart() {
      var a = this.GetDeviceType();
      if (a == "desktop") {
        this.mainStore.setDrawer(true);
      }
    },
    //将时间：2026-06-18T08:06:45.000000Z转换为时间戳178177000的方法
    GetTimeStamp(time) {
      return Math.floor(new Date(time).getTime() / 1000);
    },
    /**
     * @description: 获取设备类型 必须在此页面写死
     * @return {String} mobile | tablet | desktop
     */
    GetDeviceType() {
      var a = "";
      switch (this.name) {
        case "xs":
          a = "mobile";
          this.mainStore.setMobile(true);
          break;
        case "sm":
        case "md":
          a = "tablet";
          this.mainStore.setTablet(true);
          break;
        case "lg":
        case "xl":
        case "xxl":
          if (this.GetDeviceTypeString() == "tablet") {
            a = "tablet";
            this.mainStore.setTablet(true);
          } else {
            a = "desktop";
            this.mainStore.setDesktop(true);
          }
          break;
      }
      return a;
    },
    /**
     * @description: 获取设备类型字符串 必须在此页面写死
     * @return {String} mobile | pad | pc
     */
    GetDeviceTypeString() {
      var userAgent = navigator.userAgent.toLowerCase();
      var type = "";
      if (userAgent.match(/mobile/i)) {
        type = "mobile";
      } else if (
        userAgent.match(/ipad/i) ||
        userAgent.match(/android/i) ||
        userAgent.match(/pad/i) ||
        userAgent.match(/tablet/i)
      ) {
        type = "tablet";
      } else {
        type = "desktop";
      }
      return type;
    },
    /**
     * @description: 设置滚动监听器 必须在此页面写死
     * @return {void}
     */
    SetScrollListener() {
      var _this = this;
      const updateScrollValue = () => {
        var scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var scrollPercent = (scrollTop / scrollHeight) * 100;
        var a = parseInt(scrollPercent.toFixed(2));
        // _this.$store.commit('SetScrollValue', a === 99 ? 100 : a);

        //确定进度是增加还是减少
        if (
          a > _this.mainStore.getScrollValue &&
          _this.mainStore.getScrollValue != a
        ) {
          _this.mainStore.setScrollMode("down");
        } else if (
          a < _this.mainStore.getScrollValue &&
          _this.mainStore.getScrollValue != a
        ) {
          _this.mainStore.setScrollMode("up");
        }

        _this.mainStore.setScrollValue(a === 99 ? 100 : a);
      };
      document.addEventListener("scroll", updateScrollValue);
      // this.$once('hook:beforeDestroy', () => {
      //   document.removeEventListener('scroll', updateScrollValue);
      // });

      //once不再使用
      //
    },
    /**
     * @description: 获取url头部语言 必须在此页面写死
     * @return {String} /zh | /en
     */
    UrlHeaderLang() {
      return this.$route.params.lang ? `/${this.$route.params.lang}` : "";
    },
    /**
     * @description: 路由文本替换 必须在此页面写死
     * @param {String} route
     * @return {String}
     */
    RouteText(route) {
      if (route.indexOf("%user_id") != -1) {
        return route.replace("%user_id", this.$G_GetUserID());
      }
      return route;
    },
    /**
     * @description: 获取用户token 必须在此页面写死
     * @return {String}
     */
    GetUserToken() {
      var token = this.userStore.getUserToken || GetUserToken();
      return token;
    },
    /**
     * @description: 跨域处理 必须在此页面写死
     * @return {String}
     */
    CrossDomain() {
      return this.$axios.defaults.baseURL == undefined
        ? ""
        : this.$axios.defaults.baseURL;
      // return GetBaseUrl()
    },
    /**
     * @description: 图片处理 必须在此页面写死
     * @param {String} url
     * @return {String}
     */
    ImgHandle(url) {
      //如果url以/public开头，去掉/public。兼容laravel的public目录。
      if (url.indexOf("/public") == 0) {
        url = url.replace("/public", "");
      }

      return `${this.CrossDomain()}${url}`;
    },
    /**
     * @description: 是否有效 必须在此页面写死
     * @param {String} value
     * @return {Boolean}
     */
    IsVaild(value) {
      return value != undefined && value != null && value != "";
    },
    /**
     * @description: 过滤相同项 必须在此页面写死
     * @param {String} name
     * @param {Array} source_item
     * @param {Array} items
     * @return {Array}
     */
    FilterSameItems(name, source_item, items) {
      var cache = source_item;
      items.forEach((item, index) => {
        var index = source_item.findIndex(
          (item2) => item2[name] === item[name],
        );
        var isExist = index !== -1;
        if (!isExist) {
          cache.push(item);
        }
      });
      return cache;
    },
    /**
     * @description: 用户端智能判断时间戳 必须在此页面写死
     * @param {Number} timestamp
     * @return {String}
     */
    UserTimeStampToDateTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();

      // 计算时间差（秒）
      const diffSeconds = Math.floor((now - date) / 1000);

      // 1小时内显示分钟前
      if (diffSeconds < 3600) {
        return diffSeconds < 60
          ? this.$t("Message.App.Just")
          : this.$t("Message.App.NMinutesAgo", {
              value: Math.floor(diffSeconds / 60),
            });
        // `${Math.floor(diffSeconds / 60)}分钟前`;
      }

      // 今天（精确到时分秒）
      // if (date.toDateString() === now.toDateString()) {
      //   return [
      //     String(date.getHours()).padStart(2, '0'),
      //     String(date.getMinutes()).padStart(2, '0'),
      //     String(date.getSeconds()).padStart(2, '0')
      //   ].join(':');
      // }
      // 今天（精确到时分）
      if (date.toDateString() === now.toDateString()) {
        return [
          String(date.getHours()).padStart(2, "0"),
          String(date.getMinutes()).padStart(2, "0"),
        ].join(":");
      }

      // 昨天
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return this.$t("Message.App.Yesterday");
      }

      // 今年（月/日）
      if (date.getFullYear() === now.getFullYear()) {
        return [
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("/");
      }

      // 去年（月-日）
      if (date.getFullYear() === now.getFullYear() - 1) {
        return [
          this.$t("Message.App.LastYear"),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-");
      }

      // 更早（年-月-日）
      return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");
    },
    /**
     * @description: 管理端时间戳转日期时间 必须在此页面写死
     * @param {Number} timestamp
     * @return {String}
     */
    AdminTimeStampToDateTime(timestamp) {
      var date = new Date(timestamp);
      var now = new Date();
      var yearDiff = now.getFullYear() - date.getFullYear();
      var monthDiff = now.getMonth() - date.getMonth();
      var dayDiff = now.getDate() - date.getDate();
      //如果是今天，则返回时分秒
      if (yearDiff === 0 && monthDiff === 0 && dayDiff === 0) {
        return date.toLocaleTimeString();
      }
      //如果是今年，则返回月/日 时分秒
      else if (yearDiff === 0 && monthDiff === 0) {
        var formattedDate =
          date.getMonth() +
          1 +
          "-" +
          date.getDate() +
          " " +
          date.toLocaleTimeString();
        return formattedDate;
      }
      //如果不是今年，则返回 年-月-日 时分秒
      else {
        var formattedDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.toLocaleTimeString();
        return formattedDate;
      }
    },
    /**
     * @description: 更新网页标题和应用栏副标题 必须在此页面写死
     * @param {String} title 网页的 左边标题 - 网站名称
     * @param {String} appbar_subtitle 应用栏的副标题
     * @return {void}
     */
    UpdateWebTitleAndAppbarSubTitle(title, appbar_subtitle = "") {
      const titlehtml = document.querySelector("title");
      // this.$store.dispatch('Set_AppbarSubtitle', appbar_subtitle || this.$store.getters.GetAppbarSubtitle)
      // this.$store.dispatch('Set_CacheWebLeftTitle', title || this.$store.getters.GetCacheWebLeftTitle)

      // titlehtml.innerHTML = `${title} - ${this.$store.getters.GetTitle}`
    },
    GetUserID() {
      if (this.userStore.isLogin) {
        return this.userStore.user.user_id;
      } else {
        return 0;
      }
    },
    AppIsCanUse() {
      // return true

      // return this.$store.getters.GetAppAllowUse && this.$store.getters.GetAppVersionExpirationTime > Math.round(new Date().getTime() / 1000)

      return (
        this.mainStore.getAppAllowUse &&
        this.mainStore.getAppVersionExpirationTime >
          Math.round(new Date().getTime() / 1000)
      );
    },
    AppCardRounded() {
      return this.mainStore.getUiConfig.appCardRounded;
    },

    async AddActivity() {
      var domain = window.location.host; //或者定制域名
      if (IsElectron() || IsMobileApp()) {
        //打包专属app时使用
        domain = "www.xbedrock.com";
      }
      var base64 = btoa(domain);
      // console.log('AddActivity-base64',base64)
      const response = await AddActivity({
        domain_name_base64: base64,
      });
      if (response.success) {
        var value = parseInt(atob(response.data.v));
        var time = atob(response.data.t);
        var lang = JSON.parse(atob(response.data.l));
        // this.$store.dispatch('Set_AppVersionExpirationTime',time)
        // this.$store.dispatch('Set_AppAllowUseLangpack',lang)
        this.mainStore.setAppVersionExpirationTime(time);
        this.mainStore.setAppAllowUseLangpack(lang);
        // console.log(lang)
        var now_time = Math.round(new Date().getTime() / 1000);
        if (value == 1) {
          // this.$store.dispatch('Set_AppAllowUse',true)
          this.mainStore.setAppAllowUse(true);
        } else {
          // this.$store.dispatch('Set_AppAllowUse',false)
          this.mainStore.setAppAllowUse(false);
        }
      }
    },

    ViewIsAdmin() {
      return this.PageIsAdmin;
    },

    Rounded() {
      return this.mainStore.getMobile ? "0" : "lg";
    },

    PageIsAdminThread() {
      if (!this.userStore.getIsLogin) {
        this.mainStore.setDrawer(false);
        this.$router.push({ name: 'login' })
        // this.$router.push(`${$G_UrlHeaderLang()}/login`)
        // this.dialogStore.setLoginDialog(false);
        // console.log(this.dialogStore.getLoginDialog)
        // this.dialogStore.setLoginDialog(true);
        // console.log(this.dialogStore.getLoginDialog)
      }
      return;
      // if (!this.userStore.getUser.user_group.is_admin) {
      if (!this.userStore.getUser.user_group.ability_admin_login) {
        this.mainStore.setDrawer(false);
        this.dialogStore.setLoginDialog(true);

        // 路由回退到首页
        // this.$router.push({ name: 'home' })
      }
      // }
    },
  },
  watch: {
    PageIsAdmin(newVal, oldVal) {
      if (newVal) {
        this.PageIsAdminThread();
      }
    },
    name() {
      this.onStart();
    },
    ReturnGetAppBaseInfo() {
      let themes = this.theme.themes;
      // themes = Object.assign({}, themes, response.data.theme_color)
      themes = Object.assign(
        {},
        themes,
        this.mainStore.getAppBaseInfo.theme_color,
      );
      this.theme.themes = themes;
      // console.log(this.theme.themes)
    },
  },
  mounted() {
    // 初始化 Fancybox（必须！）
    this.$Fancybox.bind("[data-fancybox]", {
      // 可选配置项
      infinite: true,
      keyboard: true,
      Carousel: {
        Toolbar: {
          display: {
            left: ["counter", "download"],
            middle: [
              "zoomIn",
              "zoomOut",
              "toggle1to1",
              "toggleFull",
              "iterateZoom",
              "moveLeft",
              "moveRight",
              "moveUp",
              "moveDown",
              "rotateCCW",
              "rotateCW",
              "flipX",
              "flipY",
              "reset",
              "toggleFS",
            ],
            right: ["autoplay", "thumbs", "close"],
          },
        },
      },
    });
    this.onStart();

    if (this.PageIsAdmin) {
      this.PageIsAdminThread();
    }
  },

  created() {
    // console.log(window.location.href)
    // this.GetInfo()
    //获取当前实例来挂载全局方法
    const instance = getCurrentInstance();
    if (instance) {
      instance.appContext.config.globalProperties.$G_UrlHeaderLang =
        this.UrlHeaderLang;
      instance.appContext.config.globalProperties.$G_RouteText = this.RouteText;
      instance.appContext.config.globalProperties.$G_GetUserToken =
        this.GetUserToken;
      instance.appContext.config.globalProperties.$G_CrossDomain =
        this.CrossDomain;
      instance.appContext.config.globalProperties.$G_ImgHandle = this.ImgHandle;
      instance.appContext.config.globalProperties.$G_IsVaild = this.IsVaild;
      instance.appContext.config.globalProperties.$G_FilterSameItems =
        this.FilterSameItems;
      instance.appContext.config.globalProperties.$G_UserTimeStampToDateTime =
        this.UserTimeStampToDateTime;
      instance.appContext.config.globalProperties.$G_AdminTimeStampToDateTime =
        this.AdminTimeStampToDateTime;
      instance.appContext.config.globalProperties.$G_UpdateWebTitleAndAppbarSubTitle =
        this.UpdateWebTitleAndAppbarSubTitle;
      instance.appContext.config.globalProperties.$G_GetUserID = this.GetUserID;
      instance.appContext.config.globalProperties.$G_AppIsCanUse =
        this.AppIsCanUse;
      instance.appContext.config.globalProperties.$G_AppCardRounded =
        this.AppCardRounded;
      instance.appContext.config.globalProperties.$G_ViewIsAdmin =
        this.ViewIsAdmin;
      instance.appContext.config.globalProperties.$G_Rounded = this.Rounded;
      instance.appContext.config.globalProperties.$G_GetTimeStamp =
        this.GetTimeStamp;

      // console.log('instance')
    }
    this.SetScrollListener();

    // this.AddActivity()

    // axios 响应拦截器：自动处理后端返回的 snackbar 消息
    this.$axios.interceptors.response.use(
      (response) => {
        if (response.data && response.data.snackbar) {
          const snack = this.$t(response.data.snackbar);
          this.snackbarStore.addMessage({
            text: snack,
          });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // AddClarityScript()

    // //添加远程script
    // const script = document.createElement('script');
    // script.src = 'https://www.xbedrock.com/mdui2.js';
    // script.async = true;
    // document.head.appendChild(script);

    //从<style>中删除指定样式button,input,optgroup,select,textarea {font: inherit}
    // const styles = document.querySelectorAll('style');
    // styles.forEach(style => {
    //   const rules = style.sheet.rules;
    //   rules.forEach(rule => {
    //     if (rule.selectorText === 'button, input, optgroup, select, textarea') {
    //       rule.remove();
    //     }
    //   });
    // });
  },
};
</script>
<style lang="less">
// 注册自定义字体 — 必须放在 App.vue 全局样式中，settings.scss 里的 @font-face 不会被 vite-plugin-vuetify 输出
// @font-face {
//   font-family: 'EAVarietySimplified-Regular';
//   src: url('@/assets/font/EAVarietySimplified-Regular.ttf') format('truetype');
//   font-weight: normal;
//   font-style: normal;
//   font-display: swap;
// }

// @font-face {
//   font-family: 'EAVarietySimplified-Bold';
//   src: url('@/assets/font/EAVarietySimplified-Bold.ttf') format('truetype');
//   font-weight: normal;
//   font-style: normal;
//   font-display: swap;
// }

@font-face {
  font-family: "Poppins-Regular";
  src: url("@/assets/font/Poppins-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  font-family: "Poppins-Regular" !important;
  // font-family: 'Poppins Regular' !important;
}

//.v-btn {
//  font-size: var(--v-btn-size);
//}
</style>

// stores/main.js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    drawer: false, // 控制抽屉的响应式变量
    rightDrawer: false, // 控制右侧抽屉的响应式变量
    mobile: false, // 控制移动端的响应式变量
    tablet: false, // 控制平板端的响应式变量
    desktop: false, // 控制桌面端的响应式变量
    breakpointName: '', // 控制当前断点名称的响应式变量
    scrollValue: 0, // 控制滚动值的响应式变量
    scrollMode: 'up', //up down
    infoData: {
      // site_name: "Material Design Forum",
      // site_description: "基于 Vuetify与MDUI2 的 Material Design 样式的社区;A community based on Vuetify And MDUI2 for Material Design styles",
      // site_keywords: "Material Design Forum,Vuetify,MDUI,MDForum,质感设计论坛,论坛",
      // site_icp_beian: "",
      // site_gongan_beian: "",
      // default_language: "zh_CN"
      site_name: '',
      site_description: '',
      site_keywords: '',
      site_icp_beian: '',
      site_gongan_beian: '',
      default_language: 'en_US',
    },
    isDark: null,
    uiConfig: {
      appCardRounded: 'lg',
    },
    // appBaseInfo:null,
    appBaseInfo: {
      lang_locale_list: null,
      option_list: null,
      theme_color: null,
      theme_list: null,
      oauth_list: null,
    },
    appVersion: __BUILD_VERSION__,
    appAllowUse: true,
    appAllowUseLangpack: [
      'zh_CN',
      'en_US',
      'zh_TW',
      'en_GB',
      'ru_RU',
      'fr_FR',
      'de_DE',
      'ja_JP',
      'ko_KR',
    ], //[],//
    appVersionExpirationTime: 253402271999,
    langMessages: {},
    pageLayout: 'default', //default csd

    readTitle: '',
    appbarSubtitle: '',
  }),
  getters: {
    getAppVersion: (state) => state.appVersion,
    getDrawer: (state) => state.drawer,
    getRightDrawer: (state) => state.rightDrawer,
    getMobile: (state) => state.mobile,
    getTablet: (state) => state.tablet,
    getDesktop: (state) => state.desktop,
    getBreakpointName: (state) => state.breakpointName,
    getScrollValue: (state) => state.scrollValue,
    getScrollMode: (state) => state.scrollMode,
    getInfoData: (state) => state.infoData,
    getIsDark: (state) => state.isDark,
    getUiConfig: (state) => state.uiConfig,
    getAppBaseInfo: (state) => state.appBaseInfo,
    getAppAllowUse: (state) => state.appAllowUse,
    getAppAllowUseLangpack: (state) => state.appAllowUseLangpack,
    getAppVersionExpirationTime: (state) => state.appVersionExpirationTime,
    getLangMessages: (state) => state.langMessages,
    getPageLayout: (state) => state.pageLayout,
    getReadTitle: (state) => state.readTitle,
    getAppbarSubtitle: (state) => state.appbarSubtitle,
  },
  actions: {
    setAppVersion(version) {
      this.appVersion = version
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    setDrawer(drawer) {
      this.drawer = drawer
    },
    setRightDrawer(rightDrawer) {
      this.rightDrawer = rightDrawer
    },
    setMobile(mobile) {
      this.mobile = mobile
      this.tablet = false
      this.desktop = false
      this.breakpointName = 'mobile'
    },
    setTablet(tablet) {
      this.tablet = tablet
      this.mobile = false
      this.desktop = false
      this.breakpointName = 'tablet'
    },
    setDesktop(desktop) {
      this.desktop = desktop
      this.mobile = false
      this.tablet = false
      this.breakpointName = 'desktop'
    },
    setBreakpointName(breakpointName) {
      this.breakpointName = breakpointName
    },
    setScrollValue(scrollValue) {
      // console.log(scrollValue)
      this.scrollValue = scrollValue
    },
    setScrollMode(scrollMode) {
      // console.log(scrollMode)
      if (scrollMode === 'up' || scrollMode === 'down') {
        this.scrollMode = scrollMode
      } else {
        // console.log('scrollMode is not up or down')
        this.scrollMode = ''
      }
    },
    setInfoData({
      site_name,
      site_description,
      site_keywords,
      site_icp_beian,
      site_gongan_beian,
      default_language,
    }) {
      this.infoData = {
        site_name,
        site_description,
        site_keywords,
        site_icp_beian,
        site_gongan_beian,
        default_language,
      }
      // console.log(this.infoData)
    },
    setIsDark(val) {
      this.isDark = val
    },
    setUiConfig(uiConfig) {
      this.uiConfig = uiConfig
    },
    setAppBaseInfo(appBaseInfo) {
      this.appBaseInfo = appBaseInfo
    },
    setAppAllowUse(appAllowUse) {
      this.appAllowUse = appAllowUse
    },
    setAppAllowUseLangpack(appAllowUseLangpack) {
      // console.log('appAllowUseLangpack',appAllowUseLangpack)
      this.appAllowUseLangpack = appAllowUseLangpack
    },
    setAppVersionExpirationTime(appVersionExpirationTime) {
      this.appVersionExpirationTime = appVersionExpirationTime
    },
    setLangMessages(langMessages) {
      this.langMessages = langMessages
    },
    setPageLayout(pageLayout) {
      this.pageLayout = pageLayout
    },
    setReadTitle(readTitle) {
      this.readTitle = readTitle
    },
    setAppbarSubtitle(appbarSubtitle) {
      this.appbarSubtitle = appbarSubtitle
    },
  },
})

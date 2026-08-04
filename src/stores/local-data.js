
import { defineStore } from 'pinia'

export const useLocalDataStore = defineStore('localData', {
  state: () => ({
    answerCache: null,
    articleCache: null,
    questionCache: null,
    cookiePreferences: null,
    lang: '',//en_US
    themeColor: 'system',
    appbarShowLanguageButton: true,
    appbarShowThemeButton: true,
  }),
  getters: {
    getAnswerCache: (state) => state.answerCache,
    getArticleCache: (state) => state.articleCache,
    getQuestionCache: (state) => state.questionCache,
    getCookiePreferences: (state) => state.cookiePreferences,
    getLang: (state) => state.lang,
    getThemeColor: (state) => state.themeColor,
    getAppbarShowLanguageButton: (state) => state.appbarShowLanguageButton,
    getAppbarShowThemeButton: (state) => state.appbarShowThemeButton,
  },
  actions: {
    setAnswerCache(val) {
      this.answerCache = val
    },
    setArticleCache(val) {
      this.articleCache = val
    },
    setQuestionCache(val) {
      this.questionCache = val
    },
    setCookiePreferences(val) {
      this.cookiePreferences = val
    },
    setLang(val) {
      this.lang = val
    },
    setThemeColor(val) {
      this.themeColor = val
    },
    setAppbarShowLanguageButton(val) {
      this.appbarShowLanguageButton = val
    },
    setAppbarShowThemeButton(val) {
      this.appbarShowThemeButton = val
    },
  },
  persist: {
    key: 'local_data',
    storage: localStorage,// 本地存储
  }
})
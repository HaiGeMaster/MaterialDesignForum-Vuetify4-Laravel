<template>

  <v-tabs style="-webkit-app-region: no-drag;" color="primary" v-if="tab === 'topics'" align-tabs="center" show-arrows
    fixed-tabs grow v-model="topics_tabs">
    <v-tab value="following">{{ $t('Message.Components.Appbar.Tabbars.TopicsItems.Following') }}</v-tab>
    <v-tab value="recommended">{{ $t('Message.Components.Appbar.Tabbars.TopicsItems.Recommended') }}</v-tab>
  </v-tabs>

  <v-tabs style="-webkit-app-region: no-drag;" color="primary" v-else-if="tab === 'questions'" align-tabs="center"
    show-arrows fixed-tabs grow v-model="questions_tabs">
    <v-tab value="recent">{{ $t('Message.Components.Appbar.Tabbars.QuestionsItems.Recent') }}</v-tab>
    <v-tab value="popular">{{ $t('Message.Components.Appbar.Tabbars.QuestionsItems.Popular') }}</v-tab>
    <v-tab value="following" v-if="userStore.getIsLogin">{{
      $t('Message.Components.Appbar.Tabbars.QuestionsItems.Following') }}</v-tab>
  </v-tabs>

  <v-tabs style="-webkit-app-region: no-drag;" color="primary" v-else-if="tab === 'articles'" align-tabs="center"
    show-arrows fixed-tabs grow v-model="articles_tabs">
    <v-tab value="recent">{{ $t('Message.Components.Appbar.Tabbars.ArticlesItems.Recent') }}</v-tab>
    <v-tab value="popular">{{ $t('Message.Components.Appbar.Tabbars.ArticlesItems.Popular') }}</v-tab>
    <v-tab value="following" v-if="userStore.getIsLogin">{{
      $t('Message.Components.Appbar.Tabbars.ArticlesItems.Following') }}</v-tab>
  </v-tabs>

  <v-tabs style="-webkit-app-region: no-drag;" color="primary" v-else-if="tab === 'users'" align-tabs="center"
    show-arrows fixed-tabs grow v-model="users_tabs">
    <v-tab value="followees">{{ $t('Message.Components.Appbar.Tabbars.UsersItems.Followees') }}</v-tab>
    <v-tab value="followers">{{ $t('Message.Components.Appbar.Tabbars.UsersItems.Followers') }}</v-tab>
    <v-tab value="recommended">{{ $t('Message.Components.Appbar.Tabbars.UsersItems.Recommended') }}</v-tab>
  </v-tabs>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
export default {
  name: 'ExtTabs',
  data() {
    return {
      tabs: '',
      tab: '',
      topics_tabs: 'following',
      questions_tabs: 'recent',
      articles_tabs: 'recent',
      users_tabs: 'followees',
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    mainStore() {
      return useMainStore()
    },
  },
  created() {
    //初始化时根据当前路由路径设置tab
    const currentTab = this.$route.name
    this.getCurrentTab(currentTab)
  },
  mounted() {
    //根据路由哈希设置当前选中的tab
    const currentTab = this.$route.name
    this.getCurrentTab(currentTab)
  },
  methods: {
    getCurrentTab(currentTab) {
      // const currentTab = this.$route.path.split('/')[1]
      //获取当前哈希值
      const hash = this.$route.hash.replace('#', '')
      switch (currentTab) {
        case 'topics':
        case 'lang-topics':
          this.tab = 'topics'
          if (this.userStore.getIsLogin && (hash === 'following' || hash === '')) {
            this.topics_tabs = 'following'
          } else {
            this.topics_tabs = 'recommended'
          }
          break
        case 'questions':
        case 'lang-questions':
          this.tab = 'questions'
          if (hash === 'recent' || hash === '') {
            this.questions_tabs = 'recent'
          } else if (hash === 'popular') {
            this.questions_tabs = 'popular'
          } else if (this.userStore.getIsLogin && hash === 'following') {
            this.questions_tabs = 'following'
          }
          break
        case 'articles':
        case 'lang-articles':
          this.tab = 'articles'
          if (hash === 'recent' || hash === '') {
            this.articles_tabs = 'recent'
          } else if (hash === 'popular') {
            this.articles_tabs = 'popular'
          } else if (this.userStore.getIsLogin && hash === 'following') {
            this.articles_tabs = 'following'
          }
          break
        case 'users':
        case 'lang-users':
          this.tab = 'users'
          if (hash === 'followees' || hash === '') {
            this.users_tabs = 'followees'
          } else if (hash === 'followers') {
            this.users_tabs = 'followers'
          } else if (hash === 'recommended') {
            this.users_tabs = 'recommended'
          }
          break
        default:
          this.tab = ''
          break
      }
    },
  },
  watch: {
    //监听路由路径变化
    '$route'(to, from) {
      //根据路由路径设置当前选中的tab
      // const currentTab = to.path.split('/')[1]
      const currentTab = to.name
      this.getCurrentTab(currentTab)
    },
    topics_tabs(newVal, oldVal) {
      this.$router.push({
        hash: `#${newVal}`,
      })
    },
    questions_tabs(newVal, oldVal) {
      this.$router.push({
        hash: `#${newVal}`,
      })
    },
    articles_tabs(newVal, oldVal) {
      this.$router.push({
        hash: `#${newVal}`,
      })
    },
    users_tabs(newVal, oldVal) {
      this.$router.push({
        hash: `#${newVal}`,
      })
    },
    tab(newVal, oldVal) {
      // console.log('newVal', newVal)
    },
  }
}
</script>

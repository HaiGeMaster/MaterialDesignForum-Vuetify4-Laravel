<template>
  <v-container id="page-articles">
    <!-- <v-card rounded="lg" variant="outlined" elevation="0" color="surface-variant"> -->
      <v-tabs-window v-model="tab_item">
        <v-tabs-window-item value="#recent" >
          <v-card rounded="lg" v-show="recent_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>

              <template v-for="(item, index) in recent_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="articles" :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Article.NComment', {
                    value: item.comment_count,
                  })" />
              </template>
            </v-list>
          </v-card>  
          <Loading :empty="recent_data == null" :loading="recent_loading" :pagination="recent_pagination"
            @autoload="GetArticlesRecent" />
        </v-tabs-window-item>
        <v-tabs-window-item value="#popular">
          <v-card rounded="lg" v-show="popular_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>
              <template v-for="(item, index) in popular_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="articles" :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Article.NComment', {
                    value: item.comment_count,
                  })" />
              </template>
            </v-list>
          </v-card>  
          <Loading :empty="popular_data == null" :loading="popular_loading" :pagination="popular_pagination"
            @autoload="GetArticlesPopular" />
        </v-tabs-window-item>
        <v-tabs-window-item value="#following" v-if="userStore.getIsLogin">
          <v-card rounded="lg" v-show="following_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>
              <template v-for="(item, index) in following_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="articles" :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Article.NComment', {
                    value: item.comment_count,
                  })" />
              </template>
            </v-list>
          </v-card>  
          <Loading :empty="following_data == null" :loading="following_loading" :pagination="following_pagination"
            @autoload="GetArticlesFollowing" />
        </v-tabs-window-item>
      </v-tabs-window>
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {
  GetArticles,
  Get_G_ARTICLES_RECENT,
  Get_G_ARTICLES_POPULAR,
} from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
import TopicItem from '@/components/topic-item/index.vue'
import Loading from '@/components/loading/index.vue'

export default {
  components: {
    ListItem,
    // ListItemSkeleton,
    TopicItem,
    Loading,
  },
  computed: {
    tab_item: {
      get() {
        return this.$route.hash||'#recent'
      },
      set(val) {
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    },
    // ReturnUserIsLogin(val) {
    //   return this.userStore.getIsLogin
    // }
  },
  data: () => ({
    userStore: useUserStore(),
    // tab_item: 'recent',
    recent_loading: false,
    recent_data: null,
    recent_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    popular_loading: false,
    popular_data: null,
    popular_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    following_loading: false,
    following_data: null,
    following_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'articles' || val.name == 'lang-articles') {
        if (this.userStore.getIsLogin && val.hash == '#following') {
          this.tab_item = '#following'
          this.GetArticlesFollowing()
        } else if (val.hash == '#recent' || val.hash == '') {
          this.tab_item = '#recent'
          this.GetArticlesRecent()
        } else if (val.hash == '#popular') {
          this.tab_item = '#popular'
          this.GetArticlesPopular()
        }
      }
    },
    async GetArticlesRecent() {
      const ARTICLES_RECENT = Get_G_ARTICLES_RECENT()
      // console.log('ARTICLES_RECENT', ARTICLES_RECENT)
      if (ARTICLES_RECENT !== null) {
        this.recent_data = ARTICLES_RECENT.data
        this.recent_pagination = ARTICLES_RECENT.pagination
        return
      }

      if (this.recent_loading) {
        return
      }
      this.recent_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.recent_pagination.next,
        per_page: this.recent_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.recent_data == null ? this.recent_data = response.data.data : this.$G_FilterSameItems(keys, this.recent_data, response.data.data)
        this.recent_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.recent_loading = false
    },
    async GetArticlesPopular() {
      const ARTICLES_POPULAR = Get_G_ARTICLES_POPULAR()
      // console.log('ARTICLES_POPULAR', ARTICLES_POPULAR)
      if (ARTICLES_POPULAR !== null) {
        this.popular_data = ARTICLES_POPULAR.data
        this.popular_pagination = ARTICLES_POPULAR.pagination
        return
      }

      if (this.popular_loading) {
        return
      }
      this.popular_loading = true
      const response = await GetArticles({
        order: '-follower_count',
        page: this.popular_pagination.next,
        per_page: this.popular_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.popular_data == null ? this.popular_data = response.data.data : this.$G_FilterSameItems(keys, this.popular_data, response.data.data)
        this.popular_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.popular_loading = false
    },
    async GetArticlesFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.following_data == null ? this.following_data = response.data.data : this.$G_FilterSameItems(keys, this.following_data, response.data.data)
        this.following_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.following_loading = false
    },
  },
  created() {
    this.UpdateTabItems(this.$route)
  },
  watch: {
    '$route'(val) {
      this.UpdateTabItems(val)
    },
    '$i18n.locale'(val) {
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
      }
    }
  },
};
</script>
<style scoped>
/* .v-container {
  max-width: 830px;
} */

@import "../questions/index.less";
</style>
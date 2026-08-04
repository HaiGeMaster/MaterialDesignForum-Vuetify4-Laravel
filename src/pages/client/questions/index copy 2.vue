<template>
  <v-container id="page-questions">
    <!-- <v-card rounded="lg" variant="outlined" elevation="0" color="surface-variant"> -->
      <v-tabs-window v-model="tab_item">
        <v-tabs-window-item value="#recent">

          <v-card rounded="lg" v-show="recent_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>
              <template v-for="(item, index) in recent_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
            </v-list>
          </v-card>

          <Loading :empty="recent_data == null" :loading="recent_loading" :pagination="recent_pagination"
            @autoload="GetQuestionsRecent" />
        </v-tabs-window-item>
        <v-tabs-window-item value="#popular">
          <v-card rounded="lg" v-show="popular_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>
              <template v-for="(item, index) in popular_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
            </v-list>
          </v-card>
          <Loading :empty="popular_data == null" :loading="popular_loading" :pagination="popular_pagination"
            @autoload="GetQuestionsPopular" />
        </v-tabs-window-item>
        <v-tabs-window-item value="#following" v-if="userStore.getIsLogin">
          <v-card rounded="lg" v-show="following_data" class="items-wrapper" variant="outlined" elevation="0" color="surface-variant">
            <v-list rounded="lg" item-props lines="one" selectable>
              <template v-for="(item, index) in following_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
            </v-list>
          </v-card>
          <Loading :empty="following_data == null" :loading="following_loading" :pagination="following_pagination"
            @autoload="GetQuestionsFollowing" />
        </v-tabs-window-item>
      </v-tabs-window>
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {
  GetQuestions,
  Get_G_QUESTIONS_RECENT,
  Get_G_QUESTIONS_POPULAR,
} from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
import Loading from '@/components/loading/index.vue'
export default {
  components: {
    ListItem,
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
    }
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
      if (val.name == 'questions' || val.name == 'lang-questions') {
        if (this.userStore.getIsLogin && val.hash == '#following') {
          this.tab_item = '#following'
          this.GetQuestionsFollowing()
        } else if (val.hash == '#recent' || val.hash == '') {
          this.tab_item = '#recent'
          this.GetQuestionsRecent()
        } else if (val.hash == '#popular') {
          this.tab_item = '#popular'
          this.GetQuestionsPopular()
        }
      }
    },
    async GetQuestionsRecent() {
      const QUESTIONS_RECENT = Get_G_QUESTIONS_RECENT()
      // console.log('QUESTIONS_RECENT', QUESTIONS_RECENT)
      if (QUESTIONS_RECENT !== null) {
        this.recent_data = QUESTIONS_RECENT.data
        this.recent_pagination = QUESTIONS_RECENT.pagination
        return
      }

      if (this.recent_loading) {
        return
      }
      this.recent_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.recent_pagination.next,
        per_page: this.recent_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.recent_data == null ? this.recent_data = response.data.data : this.$G_FilterSameItems(keys, this.recent_data, response.data.data)
        this.recent_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.recent_loading = false
    },
    async GetQuestionsPopular() {
      const QUESTIONS_POPULAR = Get_G_QUESTIONS_POPULAR()
      // console.log('QUESTIONS_POPULAR', QUESTIONS_POPULAR)
      if (QUESTIONS_POPULAR !== null) {
        this.popular_data = QUESTIONS_POPULAR.data
        this.popular_pagination = QUESTIONS_POPULAR.pagination
        return
      }

      if (this.popular_loading) {
        return
      }
      this.popular_loading = true
      const response = await GetQuestions({
        order: '-follower_count',
        page: this.popular_pagination.next,
        per_page: this.popular_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.popular_data == null ? this.popular_data = response.data.data : this.$G_FilterSameItems(keys, this.popular_data, response.data.data)
        this.popular_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.popular_loading = false
    },
    async GetQuestionsFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
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
    }
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>

<!-- <style scoped>
.v-container {
  max-width: 830px;
}

::v-deep(.v-list-item:before) {
  display: block;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: rgb(var(--v-theme-primary));
  transition: width 0.3s ease;
}

::v-deep(.v-list-item.v-list-item--active:before) {
  width: 5px;
}
</style> -->
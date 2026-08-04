<template>
  <!-- color="surface-variant" variant="outlined" elevation="0"  -->
  <v-card :rounded="$G_Rounded()" style="margin-top: 20px;" >
    <!-- v-model="tab_item" -->
    <v-tabs color="primary" v-model="tab_item" :grow="mainStore.getMobile">
      <v-tab value="#questions">
        {{
          $t('Message.Client.Topic.Contexts.Questions')
        }}</v-tab>
      <v-tab value="#articles">
        {{
          $t('Message.Client.Topic.Contexts.Articles')
        }}</v-tab>
      <v-tab value="#following_questions">
        {{
          $t('Message.Client.Topic.Contexts.FollowingQuestions')
        }}</v-tab>
      <v-tab value="#following_articles">
        {{
          $t('Message.Client.Topic.Contexts.FollowingArticles')
        }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab_item">

      <v-tabs-window-item value="#questions">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>

            <template v-for="(item, index) in question_data">
              <v-divider v-if="index > 0"></v-divider>
              <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                :title="item.title" :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                  value: item.answer_count,
                })" />
            </template>
            <ListItemSkeleton v-if="question_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>

        <Loading :empty="question_data == null" v-if="tab_item == '#questions'" :loading="question_loading"
          :pagination="question_pagination" @autoload="GetQuestions" 
          :empty_title="$t('Message.Components.Empty.Question')"
          :empty_text="$t('Message.Components.Empty.NoContentInTopic')"
          />
      </v-tabs-window-item>

      <v-tabs-window-item value="#articles">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item, index) in article_data">
              <v-divider v-if="index > 0"></v-divider>
              <ListItem type="articles" :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`" :item="item"
                :title="item.title" :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Article.NComment', {
                  value: item.comment_count,
                })" />
            </template>
            <ListItemSkeleton v-if="article_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>

        <Loading :empty="article_data == null" v-if="tab_item == '#articles'" :loading="article_loading"
          :pagination="article_pagination" @autoload="GetArticles" 
          :empty_title="$t('Message.Components.Empty.Article')"
          :empty_text="$t('Message.Components.Empty.NoContentInTopic')"
          />
      </v-tabs-window-item>


      <v-tabs-window-item value="#following_questions">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item, index) in following_question_data">
              <v-divider v-if="index > 0"></v-divider>
              <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                :title="item.title" :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                  value: item.answer_count,
                })" />
            </template>
            <ListItemSkeleton v-if="following_question_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>

        <Loading :empty="following_question_data == null" v-if="tab_item == '#following_questions'"
          :loading="following_question_loading" :pagination="following_question_pagination"
          @autoload="GetFollowingQuestions" 
          :empty_title="$t('Message.Components.Empty.Question')"
          :empty_text="$t('Message.Components.Empty.FollowedQuestionsNotice')"
          />
      </v-tabs-window-item>


      <v-tabs-window-item value="#following_articles">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item, index) in following_article_data">
              <v-divider v-if="index > 0"></v-divider>
              <ListItem type="articles" :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`" :item="item"
                :title="item.title" :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Article.NComment', {
                  value: item.comment_count,
                })" />
            </template>
            <ListItemSkeleton v-if="following_article_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>

        <Loading :empty="following_article_data == null" v-if="tab_item == '#following_articles'"
          :loading="following_article_loading" :pagination="following_article_pagination"
          @autoload="GetFollowingArticles" 
          :empty_title="$t('Message.Components.Empty.Article')"
          :empty_text="$t('Message.Components.Empty.FollowedArticlesNotice')"
          />
      </v-tabs-window-item>

    </v-tabs-window>
  </v-card>
</template>

<script>
import {
  GetQuestions,
  GetArticles,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main.js'

import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item/skeleton.vue'
import Loading from '@/components/loading/index.vue'

import { useUserStore } from '@/stores/user.js'
export default {
  props: {
    topic: {
      type: Object,
      default: null
    }
  },
  components: {
    ListItem,
    ListItemSkeleton,
    Loading,
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    },
    tab_item: {
      get() {
        return this.$route.hash || '#questions'
      },
      set(val) {
        // console.log(val)
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    }
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      // tab_item: 'questions',
      question_loading: false,
      question_data: null,
      question_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      article_loading: false,
      article_data: null,
      article_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      following_question_loading: false,
      following_question_data: null,
      following_question_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      following_article_loading: false,
      following_article_data: null,
      following_article_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
    }
  },
  methods: {
    async GetQuestions() {
      if (this.question_loading) {
        return
      }
      this.question_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.question_pagination.next,
        per_page: this.question_pagination.per_page,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.question_data == null ? this.question_data = response.data.data : this.$G_FilterSameItems(keys, this.question_data, response.data.data)
        this.question_pagination = response.data.pagination
      }
      this.question_loading = false
    },
    async GetArticles() {
      if (this.article_loading) {
        return
      }
      this.article_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.article_pagination.next,
        per_page: this.article_pagination.per_page,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.article_data == null ? this.article_data = response.data.data : this.$G_FilterSameItems(keys, this.article_data, response.data.data)
        this.article_pagination = response.data.pagination
      }
      this.article_loading = false
    },
    async GetFollowingQuestions() {
      if (this.following_question_loading) {
        return
      }
      this.following_question_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.following_question_pagination.next,
        per_page: this.following_question_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.following_question_data == null ? this.following_question_data = response.data.data : this.$G_FilterSameItems(keys, this.following_question_data, response.data.data)
        this.following_question_pagination = response.data.pagination
      }
      this.following_question_loading = false
    },
    async GetFollowingArticles() {
      if (this.following_article_loading) {
        return
      }
      this.following_article_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.following_article_pagination.next,
        per_page: this.following_article_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.following_article_data == null ? this.following_article_data = response.data.data : this.$G_FilterSameItems(keys, this.following_article_data, response.data.data)
        this.following_article_pagination = response.data.pagination
      }
      this.following_article_loading = false
    },
    UpdateTabItems(val) {
      var hash = val.hash//.replace('#', '')
      // console.log(hash)
      if (hash == '') {
        this.tab_item = '#questions'
      } else {
        // hash = hash.replace('#', '')
        this.tab_item = hash
      }
    },
    ResetData() {
      this.tab_item = '#questions'
      this.question_loading = false
      this.question_data = null
      this.question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.article_loading = false
      this.article_data = null
      this.article_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.following_question_loading = false
      this.following_question_data = null
      this.following_question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.following_article_loading = false
      this.following_article_data = null
      this.following_article_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    }
  },
  created() {
    // this.UpdateTabItems(this.$route)
  },
  watch: {
    '$route'(val) {
      // console.log('路由变化', val)
      // this.UpdateTabItems(val)
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
      }
    },
    topic(val) {
      this.ResetData()
    },
  }
}
</script>
<style lang="less">
@import './index.less';
</style>
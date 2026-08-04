<template>
  <!-- color="surface-variant" variant="outlined" elevation="0" -->
  <v-card :rounded="$G_Rounded()"  style="margin-top: 20px;">

    <v-tabs v-model="tab_item" color="primary">
      <!-- 
      :to="`${$G_UrlHeaderLang()}/users/${user.user_id}#question`"
      :to="`${$G_UrlHeaderLang()}/users/${user.user_id}#answer`"
      :to="`${$G_UrlHeaderLang()}/users/${user.user_id}#article`"
        -->
      <v-tab  value="#question">{{ $t('Message.Client.User.Contexts.TabNAskingQuestions', {
        value: user ? user.question_count : 0
      }) }}</v-tab>
      <v-tab  value="#answer">{{ $t('Message.Client.User.Contexts.TabNAnswer', {
        value: user ? user.answer_count : 0
      }) }}</v-tab>
      <v-tab  value="#article">{{ $t('Message.Client.User.Contexts.TabNArticle', {
        value: user ? user.article_count : 0
      }) }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab_item">
      <v-tabs-window-item value="#question">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item,index) in question_data">
              <!-- <v-divider v-if="index>0"></v-divider> -->
              <ListItem type="questions"
                :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`"
                :item="item"
                :title="item.title"
                :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)"
                :action_subtitle="
                  $t('Message.Client.Question.NAnswers',{
                    value: item.answer_count,
                  })"
                />
            </template>
            <ListItemSkeleton v-if="question_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>
        <Loading :empty="question_data==null" :loading="question_loading" :pagination="question_pagination" @autoload="GetUserQuestions" 
          :need_margin_bottom="false"
          :empty_title="$t('Message.Components.Empty.Question')"
          :empty_text="$t('Message.Components.Empty.NoUserContent')"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="#answer">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item,index) in answer_data">
              <!-- <v-divider v-if="index>0"></v-divider> -->
              <ListItem type="answers"
                :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`"
                :item="item"
                :title="item.content_markdown"
                :subtitle="item.question_title"
                :action_time="`${$G_UserTimeStampToDateTime(item.create_time)}`"
                :action_subtitle="
                  $t('Message.Client.Article.NComment',{
                    value: item.comment_count,
                  })"
                />
            </template>
            <ListItemSkeleton v-if="answer_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>
        <Loading :empty="answer_data==null" :loading="answer_loading" :pagination="answer_pagination" @autoload="GetUserAnswers" 
          :need_margin_bottom="false"
          :empty_title="$t('Message.Components.Empty.Answer')"
          :empty_text="$t('Message.Components.Empty.NoUserContent')"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="#article">
        <div class="items-wrapper">
          <v-list rounded="lg" item-props lines="one" selectable>
            <template v-for="(item,index) in article_data">
              <!-- <v-divider v-if="index>0"></v-divider> -->
              <ListItem type="articles"
                :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`"
                :item="item"
                :title="item.title"
                :subtitle="item.content_markdown"
                :action_time="$G_UserTimeStampToDateTime(item.create_time)"
                :action_subtitle="
                  $t('Message.Client.Article.NComment',{
                    value: item.comment_count,
                  })"
                />
            </template>
            <ListItemSkeleton v-if="article_loading" v-for="i in 20" :key="i" />
          </v-list>
        </div>
        <Loading :empty="article_data==null" :loading="article_loading" :pagination="article_pagination" 
        @autoload="GetUserArticles" 
          :need_margin_bottom="false"
          :empty_title="$t('Message.Components.Empty.Article')"
          :empty_text="$t('Message.Components.Empty.NoUserContent')"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import {
  GetUserQuestions,
  GetUserAnswers,
  GetUserArticles,
  Get_G_USER_QUESTIONS,
  Get_G_USER_ANSWERS,
  Get_G_USER_ARTICLES,
} from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item/skeleton.vue'
import Loading from '@/components/loading/index.vue'
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    ListItemSkeleton,
    ListItem,
    Loading,
  },
  computed: {
    tab_item: {
      get() {
        return this.$route.hash || '#question'
      },
      set(val) {
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    }
  },
  data() {
    return {
      // tab_item: '#question',
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
      answer_loading: false,
      answer_data: null,
      answer_pagination: {
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
    }
  },
  methods: {
    async GetUserQuestions() {
      const USER_QUESTIONS = Get_G_USER_QUESTIONS()
      // console.log('USER_QUESTIONS', USER_QUESTIONS)
      if (USER_QUESTIONS !== null) {
        this.question_data = USER_QUESTIONS.data
        this.question_pagination = USER_QUESTIONS.pagination
        return
      }

      if (this.question_loading) return
      this.question_loading = true
      const response = await GetUserQuestions({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.question_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `question_id`
        this.question_data == null ? this.question_data = response.data.data : this.$G_FilterSameItems(keys, this.question_data, response.data.data)
        this.question_pagination = response.data.pagination
      }
      this.question_loading = false
    },
    async GetUserAnswers() {
      const USER_ANSWERS = Get_G_USER_ANSWERS()
      // console.log('USER_ANSWERS', USER_ANSWERS)
      if (USER_ANSWERS !== null) {
        this.answer_data = USER_ANSWERS.data
        this.answer_pagination = USER_ANSWERS.pagination
        return
      }

      if (this.answer_loading) return
      this.answer_loading = true
      const response = await GetUserAnswers({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.answer_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `answer_id`
        this.answer_data == null ? this.answer_data = response.data.data : this.$G_FilterSameItems(keys, this.answer_data, response.data.data)
        this.answer_pagination = response.data.pagination
      }
      this.answer_loading = false
    },
    async GetUserArticles() {
      const USER_ARTICLES = Get_G_USER_ARTICLES()
      // console.log('USER_ARTICLES', USER_ARTICLES)
      if (USER_ARTICLES !== null) {
        this.article_data = USER_ARTICLES.data
        this.article_pagination = USER_ARTICLES.pagination
        return
      }

      if (this.article_loading) return
      this.article_loading = true
      const response = await GetUserArticles({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.article_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `article_id`
        this.article_data == null ? this.article_data = response.data.data : this.$G_FilterSameItems(keys, this.article_data, response.data.data)
        this.article_pagination = response.data.pagination
      }
      this.article_loading = false
    },
    ResetData() {
      this.question_data = null
      this.question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.answer_data = null
      this.answer_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.article_data = null
      this.article_pagination = {
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
    // this.GetUserQuestions()
    // this.GetUserAnswers()
    // this.GetUserArticles()
  },
  watch: {
    user(val) {
      if (val != null) {
        this.ResetData()
        this.GetUserQuestions()
        this.GetUserAnswers()
        this.GetUserArticles()
      }
    }
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
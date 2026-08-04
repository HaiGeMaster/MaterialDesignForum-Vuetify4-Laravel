<template>
  <v-container id="page-article">
    <v-card rounded="lg" class="article" v-if="article">
      <h1 class="title">
        {{ article.title }}
      </h1>
      <UserLine :user="article.user" :time="$G_UserTimeStampToDateTime(article.create_time)" />
      <!-- <div class="content">
        {{ article.content_markdown }}
      </div> -->
      <TiptapEditor class="content" :editable="false" :content="article.content_rendered" />
      <TopicsBar :topics="article.topics" />
      <div class="actions">
         <VoteButton 
          :vote="article.vote"
          :vote_up_count="article.vote_up_count"
          :vote_down_count="article.vote_down_count"
        />
        <FollowButton followable_type="article"  :followable_id="article.article_id" :is_follow="article.is_follow" />
        <v-spacer />
        <OptionsButton type="article" :item="article" />
      </div>
    </v-card>

    <!-- <v-card rounded="lg" style="margin-top: 20px;" elevation="0" variant="outlined"> -->
    <CommentsPage v-if="article"
      :external_loading="false"
      :commentable_type="'article'"
      :commentable_id="article.article_id"
      :list_header_title="$t('Message.Client.Article.NComment',{
        value: article.comment_count
      })"
    />
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import {
  GetArticle,
  Get_G_ARTICLE,
} from '@/api/global.js'

// import ReturnButton from '@/components/return-button/index.vue'
import CommentsPage from '@/components/comments/page.vue'
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import TiptapEditor from '@/components/tiptap-editor/index.vue'
import UserLine from '@/components/user-line/index.vue'
// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
// import PrintButton from '@/components/print-button/index.vue'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
export default {
  components: {
    // ReturnButton,
    CommentsPage,
    FollowButton,
    OptionsButton,
    VoteButton,
    TiptapEditor,
    UserLine,
    // ListItemSkeleton,
    // PrintButton,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    article: null,
  }),
  computed: {
    ReturnUpdateGetArticleUpdate() {
      return this.updateStore.getArticleUpdate
    },
    ReturnGetScrollValue() {
      return this.mainStore.getScrollValue
    },
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'article' || val.name == 'lang-article') {
        this.GetArticle()
      }
    },
    async GetArticle() {
      this.article = null
      const ARTICLE = Get_G_ARTICLE()
      // console.log('ARTICLE', ARTICLE)
      if (ARTICLE !== null) {
        this.article = ARTICLE.article
        return
      }

      const response = await GetArticle({
        article_id: this.$route.params.article_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.article = response.data.article
        this.$forceUpdate()
      }
    }
  },
  created() {
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    this.GetArticle()
  },
  watch: {
    '$route'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
      // this.$store.dispatch('Set_ReadTitle', '');
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUpdateGetArticleUpdate(val) {
      this.article = val
    },
    ReturnGetScrollValue(val) {
      // console.log('GetScrollValue', val);
      const path = this.$route.name
      if (val >= 4 && (path == 'article' || path == 'lang-article')) {
        // this.$store.dispatch('Set_ReadTitle', this.article.title);
      } else {
        // this.$store.dispatch('Set_ReadTitle', '');
      }
    },
  },
};
</script>
<style lang="less">
@import './index.less';
// D:\Administrator\Documents\Vue\MaterialDesignForum-Vuetify4\src\components\answers\components\item\style.less
@import '@/components/answers/components/item/style.less';

// .v-list-item {
//   padding: 0 !important;
// }
</style>

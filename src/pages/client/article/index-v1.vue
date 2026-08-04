<template>
  <v-container id="page-article" style="padding: 0;max-width: 846px" >
    <v-container fluid :style="{
      padding: mainStore.getMobile ? '0' : '1rem',
    }" v-if="article">
      <v-card :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">


        <v-toolbar :title="article.title">
          <template v-slot:prepend>
            <v-btn @click="$router.back()" icon>

              <v-icon>
                mdi-arrow-left
              </v-icon>
              <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Back') }}</v-tooltip>
            </v-btn>
          </template>
          <template v-slot:append>
            <!-- <v-btn icon="mdi-share-variant-outline"></v-btn> -->
          <FollowButton followable_type="article" :followable_id="article.article_id" :is_follow="article.is_follow" btn_variant="text" />
          </template>

        </v-toolbar>

        <v-card-text class="py-2" :style="{
          paddingLeft: mainStore.getMobile ? '1rem' : '4rem',
          paddingRight: mainStore.getMobile ? '1rem' : '4rem',
        }">
          <v-list lines="two">
            <UserLineV1 :user="article.user" :time="$G_UserTimeStampToDateTime(article.create_time)" />
          </v-list>

          <!-- <p v-for="i in 15">{{ text }}</p> -->
          <TiptapEditor class="content" :editable="false" :content="article.content_rendered" />


          <TopicsBar :topics="article.topics" style="margin: 16px 0;" />
        </v-card-text>


        <v-card-actions class="bg-surface-light">
          <VoteButton :vote="article.vote" :vote_up_count="article.vote_up_count"
            :vote_down_count="article.vote_down_count" />
          <v-spacer></v-spacer>
          <OptionsButton type="article" :item="article" />
        </v-card-actions>
      </v-card>

        <!-- style="margin-bottom: 160px;"  -->
      <CommentsPageV1 
        v-if="article" 
        :external_loading="false"  style="margin-bottom: 64px;"
        :commentable_type="'article'"
        :commentable_id="article.article_id" 
        :list_header_title="$t('Message.Client.Article.NComment', {
          value: article.comment_count
        })" 
        />

        
          <!-- :label="$t(
            'Message.Components.Comments.NewCommentOrReply.WriteYourComment'
          )"
          @return_update_comments="
            (comment) => { 
              updateStore.setCommentUpdate(comment)
          }"
          :commentable_id="article.article_id"
          :commentable_type="'article'" -->
    </v-container>
  </v-container>
</template>
<script>
import {
  GetArticle,
  Get_G_ARTICLE,
} from '@/api/global.js'

// import ReturnButton from '@/components/return-button/index.vue'
import CommentsPageV1 from '@/components/comments-v1/page.vue'
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import TiptapEditor from '@/components/tiptap-editor/index.vue'
import UserLineV1 from '@/components/user-line/index-v1.vue'
// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
// import PrintButton from '@/components/print-button/index.vue'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
import { useSheetStore } from '@/stores/sheet';
export default {
  components: {
    // ReturnButton,
    CommentsPageV1,
    FollowButton,
    OptionsButton,
    VoteButton,
    TiptapEditor,
    UserLineV1,
    // ListItemSkeleton,
    // PrintButton,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    sheetStore: useSheetStore(),
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
        this.sheetStore.setCommentReplySheet({
        })
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
// @import './index.less';
// @import '@/components/answers/components/item/style.less';

// D:\Administrator\Documents\Vue\MaterialDesignForum-Vuetify4\src\components\answers\components\item\style.less


// .v-list-item {
//   padding: 0 !important;
// }
// 

</style>

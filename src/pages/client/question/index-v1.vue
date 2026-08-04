<template>
  <!-- <v-container id="page-question" style="padding: 0;">
    <v-container style="max-width: 846px" :style="{ -->
  <v-container id="page-question" style="padding: 0;max-width: 846px">
    <v-container fluid :style="{
      padding: mainStore.getMobile ? '0' : '1rem',
    }" v-if="question">
      <v-card :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">


        <v-toolbar :title="question.title">
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
            <FollowButton followable_type="question" :followable_id="question.question_id"
              :is_follow="question.is_follow" btn_variant="text" />
          </template>

        </v-toolbar>

        <v-card-text class="py-2" :style="{
          paddingLeft: mainStore.getMobile ? '1rem' : '4rem',
          paddingRight: mainStore.getMobile ? '1rem' : '4rem',
        }">
          <v-list lines="two">
            <UserLineV1 :user="question.user" :time="$G_UserTimeStampToDateTime(question.create_time)" />
          </v-list>

          <!-- <p v-for="i in 15">{{ text }}</p> -->
          <TiptapEditor class="content" :editable="false" :content="question.content_rendered" />


          <TopicsBar :topics="question.topics" style="margin: 16px 0;" />
        </v-card-text>


        <v-card-actions class="bg-surface-light">
          <CommentButton :count="question.comment_count" @comment_button_click="
            dialogStore.setCommentDialog({
              model: true,
              title: $t('Message.Client.Article.NComment', { value: question.comment_count }),
              commentable_id: question.question_id,
              commentable_type: 'question',
              comment_count: question.comment_count,
              return_update_comments: (comment) => {
                question.comment_count++
              }
            })
            " btn_variant="plain" />
          <v-spacer></v-spacer>
          <!-- <VoteButton :vote="question.vote" :vote_up_count="question.vote_up_count"
            :vote_down_count="question.vote_down_count" /> -->
          <OptionsButton type="question" :item="question" />
        </v-card-actions>
      </v-card>

      <AnswersPageV1 v-if="question != null" :question="question" />
    </v-container>
  </v-container>
</template>
<script>
import {
  GetQuestion,
  Get_G_QUESTION,
} from '@/api/global.js'
import UserLineV1 from '@/components/user-line/index-v1.vue'
import TopicsBar from '@/components/topics-bar/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
import CommentButton from './components/comment-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
// import AnswerItem from './components/answer-item/index.vue'
import AnswersPageV1 from '@/components/answers-v1/answers-page.vue'
// import CommentsDialogV1 from '@/components/comments-v1/dialog.vue'


import TiptapEditor from '@/components/tiptap-editor/index.vue'

import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useUpdateStore } from '@/stores/update'
export default {
  components: {
    // ReturnButton,
    FollowButton,
    OptionsButton,
    CommentButton,
    TiptapEditor,
    UserLineV1,
    // AnswersPage,
    // CommentsDialogV1,
    // ListItemSkeleton,
    // PrintButton,
    // AnswerItem,
    AnswersPageV1,
  },
  data: () => ({
    question: null,
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    dialogStore: useDialogStore(),
  }),
  computed: {
    ReturnUpdateGetQuestionUpdate() {
      return this.updateStore.getQuestionUpdate
    },
    ReturnGetScrollValue() {
      return this.mainStore.getScrollValue
    },
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'question' || val.name == 'lang-question' ||
        val.name == 'question-answer' || val.name == 'lang-question-answer'
      ) {
        this.GetQuestion()
      }
    },
    async GetQuestion() {
      const QUESTION = Get_G_QUESTION()
      // console.log('QUESTION', QUESTION)
      if (QUESTION !== null) {
        this.question = QUESTION.question
        return
      }

      const response = await GetQuestion({
        question_id: this.$route.params.question_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.question = response.data.question
        this.$forceUpdate()
      }
    },
  },
  created() {
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
      // this.$store.dispatch('Set_ReadTitle','');
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUpdateGetQuestionUpdate(val) {
      // this.question = val
      this.GetQuestion()
    },
    ReturnGetScrollValue(val) {
      // console.log('GetScrollValue', val);
      const path = this.$route.name
      if (val >= 4 && (path == 'question' || path == 'lang-question')) {
        // this.$store.dispatch('Set_ReadTitle',this.question.title);
      } else {
        // this.$store.dispatch('Set_ReadTitle','');
      }
    },
  },
};
</script>
<style lang="less">
//@import './index.less';


// .v-list-item {
//   padding: 0 !important;
// }
//
// </style>

<template>
  <v-container id="page-question">
    
    <v-card rounded="lg" class="question" v-if="question">
      <h1 class="title">
        {{ question.title }}
      </h1>
      <UserLine :user="question.user" :time="$G_UserTimeStampToDateTime(question.create_time)" />
      
      
      <TiptapEditor class="content" :editable="false" :content="question.content_rendered" />
      <TopicsBar :topics="question.topics" />
      <div class="actions">
        <FollowButton :followable_type="'question'" :followable_id="question.question_id" :is_follow="question.is_follow" />
        <CommentButton :count="question.comment_count" 
        @comment_button_click="
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
        " />
        <v-spacer />
      <OptionsButton type="question" :item="question" />
      </div>
    </v-card>

    

    <AnswersPage v-if="question != null" :question="question" />
    <!-- <CommentsDialogV1 /> -->
  </v-container>
</template>
<script>
import {
  GetQuestion,
  Get_G_QUESTION,
} from '@/api/global.js'
import UserLine from '@/components/user-line/index.vue'
import TopicsBar from '@/components/topics-bar/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
import CommentButton from './components/comment-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
// import AnswerItem from './components/answer-item/index.vue'
import AnswersPage from '@/components/answers/answers-page.vue'
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
    UserLine,
    // AnswersPage,
    // CommentsDialogV1,
    // ListItemSkeleton,
    // PrintButton,
    // AnswerItem,
    AnswersPage,
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
      this.question = val
    },
    ReturnGetScrollValue(val) {
      // console.log('GetScrollValue', val);
      const path = this.$route.name
      if(val>=4&&(path=='question'||path=='lang-question')){
        // this.$store.dispatch('Set_ReadTitle',this.question.title);
      }else{
        // this.$store.dispatch('Set_ReadTitle','');
      }
    },
  },
};
</script>
<style lang="less" >
@import './index.less';


// .v-list-item {
//   padding: 0 !important;
// }
</style>

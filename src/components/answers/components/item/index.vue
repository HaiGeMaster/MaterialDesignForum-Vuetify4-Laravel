<template>
  <div class="item">
    <UserLine :user="answer.user" :time="$G_UserTimeStampToDateTime(answer.update_time)" />
    <!-- <TipTapEditor class="content" :editable="false" :content="answer.content_rendered" /> -->
    <!-- <div class="content">
      {{ answer.content_rendered }}
    </div> -->
      <TiptapEditor class="content" :editable="false" :content="answer.content_rendered" />
    <div class="actions">
      <VoteButton :vote="answer.vote" :vote_up_count="answer.vote_up_count" :vote_down_count="answer.vote_down_count" />
      <div style="margin-left: 8px;"></div>
      <CommentButton v-if="answer.answer_id > 0" :count="answer.comment_count" @comment_button_click="
        OpenCommentsDialog()
        " />
      <v-spacer></v-spacer>
      <OptionsButton v-if="answer != null" type="answer" :item="answer" />
    </div>
  </div>
</template>
<script>
import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import CommentButton from '@/pages/client/question/components/comment-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import TipTapEditor from '@/components/tiptap-editor/index.vue'
// import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
export default {
  name: 'page-question-answer-item',
  components: {
    UserLine,
    VoteButton,
    CommentButton,
    OptionsButton,
    TipTapEditor,
  },
  props: {
    answer: {
      type: Object,
      default: null,
    },
    question: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      comments_dialog: false,
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    OpenCommentsDialog() {
      if (this.answer.answer_id == null ||
        this.answer.answer_id == 0 ||
        this.answer.answer_id == '0'
      ) {//防止加载时评论按钮点击，然后错误的拉取全部数据。
        return
      }

      this.dialogStore.setCommentDialog({
        model: true,
        title: this.$t('Message.Client.Article.NComment', { value: this.answer.comment_count }),
        commentable_id: this.answer.answer_id,
        commentable_type: 'answer',
        comment_count: this.answer.comment_count,
        return_update_comments: (comment) => {
          this.answer.comment_count++
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>
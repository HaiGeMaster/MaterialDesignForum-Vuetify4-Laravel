<template>
  
  <v-list-item rounded="lg" active-class="text-primary" class="py-3"
    @click="OpenCommentsDialog()" @mouseenter="listItemHover = i"
    @mouseleave="listItemHover = 0" >
    <template v-slot:prepend>
      <!-- <v-avatar color="grey-darken-3" :image="avatar"></v-avatar> -->
      <UserPopover :user="answer.user" />
    </template>

    <v-list-item-title>{{ answer.user.username }}</v-list-item-title>

    <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
      <TiptapEditor class="content" :editable="false" :content="answer.content_rendered" />
      
    </v-list-item-subtitle>

    <v-list-item-action>
      <v-list-item-subtitle class="text-high-emphasis">
        {{ $G_UserTimeStampToDateTime(answer.update_time) }}
        <!-- · {{ answer.user.location }} -->
         
        {{ 
        answer.user.last_login_location.trim() != ''
        ? ` · ${answer.user.last_login_location}`
        : ''
        }}
      </v-list-item-subtitle>


      <v-spacer></v-spacer>
      
      <CommentButton v-if="answer.answer_id > 0" :count="answer.comment_count" 
      btn_size="small"
      icon_size="small"
      btn_variant="plain"
      @comment_button_click="
        OpenCommentsDialog()
        " />

      <VoteButton :vote="answer.vote" :vote_up_count="answer.vote_up_count" :vote_down_count="answer.vote_down_count"
        style="margin-right: 4px" size="small" />

      <OptionsButton v-if="answer.answer_id != null" type="answer" :item="answer" size="small" />
    </v-list-item-action>
  </v-list-item>
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
      listItemHover: 0,
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
//@import "./style.less";
</style>
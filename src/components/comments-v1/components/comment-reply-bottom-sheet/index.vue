<template>
  <v-text-field color="primary" rounded="lg" class="mdui-textfield-input"
    :label="label || $t('Message.Components.Comments.NewCommentOrReply.WriteYourComment')" :variant="field_variant"
    hide-details="auto" v-model="SubmitText" @keydown="(e) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault()
        OnSubmit()
      }
    }
    " @focus="$emit('on_focus')" @blur="$emit('on_blur')" @click.stop="null">

    <template v-slot:append-inner>
      <v-btn rounded="lg" variant="flat" class="submit" color="primary" :loading="is_loading" @click="OnSubmit()">
        {{ Submitting ? $t('Message.Components.Comments.NewCommentOrReply.Publlishing') :
          $t('Message.Components.Comments.NewCommentOrReply.Publish') }}
      </v-btn>
    </template>
  </v-text-field>
</template>
<script>
import { useDialogStore } from '@/stores/dialog';
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main';
import { useSnackbarStore } from '@/stores/snackbar';
// import { useSheetStore } from '@/stores/sheet';
import {
  AddComment,
  AddReply
} from '@/api/global.js';
export default {
  name: 'comment-reply-text-field',

  props: {
    field_variant: {
      type: String,
      default: 'outlined',
    },
    label: {
      type: String,
      default: '',
    },
    commentable_type: {
      type: String,
      default: '',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    replyable_type: {
      type: String,
      default: '',
    },
    replyable_id: {
      type: Number,
      default: 0,
    },
    replyable_user_id: {
      type: Number,
      default: 0,
    },
    replyable_comment_id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialogStore: useDialogStore(),
      userStore: useUserStore(),
      mainStore: useMainStore(),
      snackbarStore: useSnackbarStore(),
      // sheetStore: useSheetStore(),
      SubmitText: '',
      Submitting: false,
      is_loading: false,

      // // sheet: true,
      // label: '',// 输入框标签
      // field_variant: 'outlined',// 输入框样式
      // commentable_id: '',// 评论目标ID
      // commentable_type: '',// 评论目标类型
      // replyable_id: 0,// 回复目标ID
      // replyable_type: '',// 回复目标类型
      // replyable_user_id: 0,// 回复目标用户ID
      // replyable_comment_id: 0,// 回复目标评论ID
    }
  },
  methods: {
    OnSubmit() {
      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      if (this.commentable_type == 'question' || this.commentable_type == 'answer' || this.commentable_type == 'article') {
        this.AddComment()
      } else if (this.replyable_type == 'comment' || this.replyable_type == 'reply') {
        this.AddReply()
      }
    },
    async AddComment() {
      this.is_loading = true
      const response = await AddComment({
        commentable_id: this.commentable_id,
        commentable_type: this.commentable_type,
        content: encodeURIComponent(this.SubmitText),
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_add == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Published') : this.$t('Message.Components.Snackbar.YouCommentHasBeenCreated'), color: 'success' })
        this.is_loading = false
        this.SubmitText = ''
        this.$emit('return_update_comments', response.data.comment)
      } else {
        this.is_loading = false
        this.IsEmpty = true
      }
    },
    async AddReply() {
      this.is_loading = true
      const response = await AddReply({
        replyable_id: this.replyable_id,
        replyable_type: this.replyable_type,
        content: encodeURIComponent(this.SubmitText),
        user_token: this.$G_GetUserToken(),
        replyable_user_id: this.replyable_user_id,
        replyable_comment_id: this.replyable_comment_id,
      })
      if (response.data.is_add == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Published') : this.$t('Message.Components.Snackbar.YouReplyHasBeenCreated'), color: 'success' })
        this.is_loading = false
        this.SubmitText = ''
        this.$emit('add_reply', response.data.reply)
      } else {
        this.is_loading = false
        this.IsEmpty = true
      }
    }
  }
}
</script>
<style lang="less">
//@import './index.less';</style>

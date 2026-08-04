<template>
  <!-- <v-card rounded="lg" :class="[
    'new-comment',
    {
      'rounded-xxl': dialog_mode && !mainStore.getMobile,
      'rounded-t-xxl': !dialog_mode && mainStore.getMobile,
      'rounded-0': mainStore.getMobile,
    }
  ]" elevation="0" v-show="show"> -->

    <v-text-field v-show="show" color="primary"  rounded="lg" class="mdui-textfield-input"
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

  <!-- </v-card> -->
</template>
<script>
import { useDialogStore } from '@/stores/dialog';
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main';
import { useSnackbarStore } from '@/stores/snackbar';
import {
  AddComment,
  AddReply
} from '@/api/global.js';
export default {
  name: 'new-comment-reply',
  props: {
    field_variant: {
      type: String,
      default: 'outlined',
    },
    show: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '',
    },
    new_comment_reply_need_glass_container: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_rounded_t_or_b: {
      type: String,
      default: 't',
    },
    new_comment_reply_elevation: {
      type: String,
      default: '0',
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
    dialog_mode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogStore: useDialogStore(),
      userStore: useUserStore(),
      mainStore: useMainStore(),
      snackbarStore: useSnackbarStore(),
      SubmitText: '',
      Submitting: false,
      is_loading: false,
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
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Published'):this.$t('Message.Components.Snackbar.YouCommentHasBeenCreated'), color: 'success' })
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
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Published'):this.$t('Message.Components.Snackbar.YouReplyHasBeenCreated'), color: 'success' })
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
//@import './index.less';
</style>

<template>
  <v-dialog v-model="model" max-width="500px">
    <v-card rounded="lg" :title="title">
      <v-card-text>
        <v-textarea v-model="content" color="primary" variant="outlined" rounded="lg" :auto-grow="true" counter="1000" maxlength="1000" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn rounded="lg"  variant="tonal" @click="model = false">{{
          $t('Message.Components.EditInfoDialog.Cancel') }}</v-btn>

        <v-btn rounded="lg"  variant="flat" color="primary" :disabled="content.length > 1000 || content.length == 0"
          @click="OnEdit()">{{
            $t('Message.Components.EditInfoDialog.Save') }}</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import { useDialogStore } from '@/stores/dialog';
import { useUpdateStore } from '@/stores/update'
import { useSnackbarStore } from '@/stores/snackbar'
import {
  EditReply,
  EditComment,
} from '@/api/global.js'
export default {
  name: 'text-edit-dialog',
  props: {
    // model: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {//编辑 评论 回复
    //   type: String,
    //   default: 'Message.Components.DataTable.Edit',
    // },
    // type: {
    //   type: String,
    //   default: 'reply',//comment reply
    // },
    // edit_id: {
    //   type: Number,
    //   default: 0,
    // },
    // content: {
    //   type: String,
    //   default: '',
    // },
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getCommentReplyEditDialog.model
      },
      set(val) {
        this.dialogStore.setCommentReplyEditDialog({
          model: val
        })
      }
    }
  },
  data: () => ({
    dialogStore: useDialogStore(),
    updateStore: useUpdateStore(),
    snackbarStore: useSnackbarStore(),
    // model: false,
    title: '',
    type: '',//comment reply
    edit_id: 0,
    content: '',
    loading: false,
  }),
  methods: {
    async OnEdit() {
      //如果字数大于1000
      if (this.content.length > 1000) {
        return
      }
      this.loading = true
      if (this.type == 'comment') {
        const response = await EditComment({
          comment_id: this.edit_id,
          content: this.content,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_edit) {
          this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Updated'):this.$t('Message.Components.Snackbar.YouCommentHasBeenEdited'), color: 'success' })
          this.$emit('edit_comment', response.data.comment)
          this.loading = false
          this.model = false
        } else {
          this.model = false
        }
      } else if (this.type == 'reply') {
        const response = await EditReply({
          reply_id: this.edit_id,
          content: this.content,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_edit) {
          this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Updated'):this.$t('Message.Components.Snackbar.YouReplyHasBeenEdited'), color: 'success' })
          this.$emit('edit_reply', response.data.reply)
          this.loading = false
          this.model = false
        } else {
          this.model = false
        }
      }
    },
  },
  watch: {
    model(val) {
      if (val) {
        // this.model = true
        var data = this.dialogStore.getCommentReplyEditDialog
        this.title = data.title
        this.type = data.type
        this.edit_id = data.edit_id
        this.content = data.content
      }
    },
    // model(val) {
    //   if (!val) {
    //     this.$emit('model', false)
    //   }
    // },
    content(val) {
      this.content = val
    },
  },
}
</script>
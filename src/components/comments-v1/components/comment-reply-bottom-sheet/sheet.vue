<template>
  <v-bottom-sheet v-model="sheet" inset max-width="750px">
    <v-card class="rounded-t-lg">
      <template v-slot:subtitle v-if="item">
        <v-list density="compact" lines="one" style="padding: 0;">
          <v-list-item >
            <template v-slot:prepend>
              <v-avatar>
                <v-img :src="$G_ImgHandle(subtitle.avatar)"></v-img>
              </v-avatar>
            </template>

            <v-list-item-title v-text="subtitle.username"></v-list-item-title>
            <v-list-item-subtitle v-text="subtitle.content"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
      <v-card-text>
        <CommentReplyTextField :label="label" :field_variant="field_variant" :commentable_id="commentable_id"
          :commentable_type="commentable_type" :replyable_id="replyable_id" :replyable_type="replyable_type"
          :replyable_user_id="replyable_user_id" :replyable_comment_id="replyable_comment_id" @return_update_comments="
            (comment) => {
              updateStore.setCommentUpdate(comment);
              sheetStore.getCommentReplySheet.callBack();
              sheetStore.setCommentReplySheet({
                model: false,
              });
            }" @add_reply="(reply) => {
            updateStore.setReplyUpdate(reply);
            // sheetStore.getCommentReplySheet.callBack();
            sheetStore.setCommentReplySheet({
              model: false,
            });
          }" />
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
import { useSheetStore } from '@/stores/sheet';
import { useUpdateStore } from '@/stores/update';

import CommentReplyTextField from './index.vue'
export default {
  name: 'comment-reply-bottom-sheet',
  components: {
    CommentReplyTextField,
  },
  data() {
    return {
      sheetStore: useSheetStore(),
      updateStore: useUpdateStore(),
      label: '',// 输入框标签
      field_variant: 'outlined',// 输入框样式
      commentable_id: '',// 评论目标ID
      commentable_type: '',// 评论目标类型
      replyable_id: 0,// 回复目标ID
      replyable_type: '',// 回复目标类型
      replyable_user_id: 0,// 回复目标用户ID
      replyable_comment_id: 0,// 回复目标评论ID
      item: null,// 评论或回复
      item_type: '',// 评论或回复类型

      subtitle: {
        avatar: '',
        username: '',
        content: '',
      }
    }
  },
  computed: {
    sheet: {
      get() {
        const commentReplySheet = this.sheetStore.getCommentReplySheet
        this.label = commentReplySheet.label
        this.field_variant = commentReplySheet.field_variant
        this.commentable_id = commentReplySheet.commentable_id
        this.commentable_type = commentReplySheet.commentable_type
        this.replyable_id = commentReplySheet.replyable_id
        this.replyable_type = commentReplySheet.replyable_type
        this.replyable_user_id = commentReplySheet.replyable_user_id
        this.replyable_comment_id = commentReplySheet.replyable_comment_id
        this.item = commentReplySheet.item
        this.item_type = commentReplySheet.item_type

        if(this.item_type=='comment'){
          this.subtitle.avatar = this.item.user.avatar.small
          this.subtitle.username = this.item.user.username
          this.subtitle.content = this.item.content
        }else if(this.item_type=='reply'){
          this.subtitle.avatar = this.item.user.avatar.small
          this.subtitle.username = this.item.user.username
          this.subtitle.content = this.item.content
        }

        return this.sheetStore.getCommentReplySheet.model
      },
      set(val) {
        this.sheetStore.setCommentReplySheet({
          model: false,
        })
      }
    }
  },
}
</script>

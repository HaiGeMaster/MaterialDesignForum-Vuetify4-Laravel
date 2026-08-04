<template>
  <v-dialog v-model="model" max-width="750px" scrollable :fullscreen="mainStore.getMobile" class="mc-comments-dialog">
    <!-- :class="[
      'mc-comments-dialog',
    ]"  -->
    <v-card rounded="lg" elevation="0">
      <ListHeaderV1 :show_close="mainStore.getMobile" :title="title" :total="comment_count" :show_total="true"
        type="topics" class="mc-list-header" @list_header_close_click="model = !model"
        @menu_order_item_select="menu_order_item_select" />

      <v-card-text style="padding: 0;">

        <!-- style="margin: 16px;overflow-y: auto;margin-bottom: 180px;" -->
        <CommentsV1 style="margin: 16px;overflow-y: auto;" :order="order" :dialog_mode="true"
          :need_glass_container="false" :need_rounded="false" :need_outlined="false" :commentable_id="commentable_id"
          :commentable_type="commentable_type" card_list_elevation="0" item_classes="layout-colourless"
          new_comment_reply_rounded_t_or_b="b" @list_header_close_click="model = false"
          @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" />
      </v-card-text>


      <v-card-actions class="bg-surface-light">

        <CommentReplyTextField 
          :commentable_type="commentable_type" :commentable_id="commentable_id"
          @return_update_comments="(comment) => { updateStore.setCommentUpdate(comment), updateStore.setQuestionUpdate(Math.random()) }" />

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CommentsV1 from './index.vue'
import ListHeaderV1 from '@/components/list-header/index-v1.vue'
// import NewCommentOrReplyV1 from './components/new-comment/index.vue'
import CommentReplyTextField from './components/comment-reply-bottom-sheet/index.vue'
import { useMainStore } from '@/stores/main';
import { useDialogStore } from '@/stores/dialog'
import { useUpdateStore } from '@/stores/update'
export default {
  name: 'comments-dialog-v1',
  components: {
    ListHeaderV1,
    CommentsV1,
    // NewCommentOrReplyV1,
    CommentReplyTextField,
  },
  // props: {
  //   model: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   title: {
  //     type: String,
  //     default: '',
  //   },
  //   commentable_type: {
  //     type: String,
  //     default: 'question', 
  //   },
  //   commentable_id: {
  //     type: Number,
  //     default: 0,
  //   },
  //   comment_count: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  data() {
    return {
      mainStore: useMainStore(),
      dialogStore: useDialogStore(),
      updateStore: useUpdateStore(),

      title: '',
      commentable_type: 'question',
      commentable_id: 0,
      comment_count: 0,

      // dialog: false,
      order: '-update_time',
      list_header: [
        {
          order: '-update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromLateToEarly',
        },
        {
          order: '+update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromEarlyToLate',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.Topic.Contexts.Hottest',
        },
      ],
    }
  },
  methods: {
    menu_order_item_select(item, order) {
      this.order = order
    },
  },
  computed: {
    model: {
      get() {
        this.title = this.dialogStore.getCommentDialog.title
        this.commentable_type = this.dialogStore.getCommentDialog.commentable_type
        this.commentable_id = this.dialogStore.getCommentDialog.commentable_id
        this.comment_count = this.dialogStore.getCommentDialog.comment_count
        return this.dialogStore.getCommentDialog.model
      },
      set(val) {
        this.dialogStore.setCommentDialog({
          model: val,
        })
      }
    }
  },
  watch: {
    model(val) {
      if (!val) {
        this.$emit('close_comments_dialog')
      } else {
      }
    },
    // model(val) {
    //   if (val) {
    //     this.dialog = val
    //   }
    // }
  }
}
</script>
<style lang="less">
//@import './dialog.less';</style>
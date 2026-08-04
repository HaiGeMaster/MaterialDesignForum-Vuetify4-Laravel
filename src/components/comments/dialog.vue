<template>
  <v-dialog v-model="model" max-width="750px" scrollable 
    :fullscreen="mainStore.getMobile" class="mc-comments-dialog">
    <!-- :class="[
      'mc-comments-dialog',
    ]"  -->
    <v-card rounded="lg" elevation="0" :rounded="$G_Rounded()" >
      <ListHeader style="margin: 8px;"
        :show_close="mainStore.getMobile"
        :title="title"
        :total="comment_count"
        :show_total="true"
        type="topics"
        class="mc-list-header"
        @list_header_close_click="model = !model"
        @menu_order_item_select="menu_order_item_select"
      />
      <Comments style="margin: 16px;overflow-y: auto;margin-bottom: 180px;"
        :order="order" 
        :dialog_mode="true"
        :need_glass_container="false"
        :need_rounded="false"
        :need_outlined="false"
        :commentable_id="commentable_id" 
        :commentable_type="commentable_type"
        card_list_elevation="0"
        item_classes="layout-colourless" 
        new_comment_reply_rounded_t_or_b="b" 
        @list_header_close_click="model = false" 
        @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" 
      />
    </v-card>
  </v-dialog>
</template>
<script>
import ListHeader from '@/components/list-header/index.vue'
import Comments from '@/components/comments/index.vue'
import { useMainStore } from '@/stores/main';
import { useDialogStore } from '@/stores/dialog'
export default {
  name: 'comments-dialog',
  components: {
    ListHeader,
    Comments,
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
    // model: {
    //   get() {
    //     return this.dialogStore.getCommentDialog.model
    //   },
    //   set(val) {
    //     this.dialogStore.setCommentDialog({
    //       model: val,
    //     })
    //   }
    // }
  },
  watch: {
    model(val) {
      if (!val) {
        this.$emit('close_comments_dialog')
      } else {
        this.title = this.dialogStore.getCommentDialog.title
        this.commentable_type = this.dialogStore.getCommentDialog.commentable_type
        this.commentable_id = this.dialogStore.getCommentDialog.commentable_id
        this.comment_count = this.dialogStore.getCommentDialog.comment_count
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
@import './dialog.less';
</style>
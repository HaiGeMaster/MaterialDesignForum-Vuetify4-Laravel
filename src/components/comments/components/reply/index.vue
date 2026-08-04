<template>
  <div class="item reply" v-if="reply != null">
    <UserLine :user="reply.user"
      :is_reply="reply.replyable_user != null && reply.replyable_type == 'reply'"
      :reply_user="reply.replyable_user" :time="$G_UserTimeStampToDateTime(reply.update_time)"
      :small_avatar="true" />
    <!-- <div class="content">{{ reply.content }}</div> -->
    
      <TiptapEditor class="content" :editable="false" :content="reply.content" />
    <div class="actions">
      <VoteButton :vote="reply.vote" :vote_up_count="reply.vote_up_count"
        :vote_down_count="reply.vote_down_count" />
      <IconButton icon="mdi-reply" :text="$t('Message.Components.Comments.Item.Reply')" :smalls="false"
        @icon_button_click="new_comment_or_reply_show = !new_comment_or_reply_show" />
      <v-spacer></v-spacer>
      <OptionsButton v-if="reply != null" type="reply" :item="reply" />
    </div>
    
    <v-expand-transition>
      <NewCommentOrReply v-if="reply != null" 
        :show="new_comment_or_reply_show"
        :new_comment_reply_need_glass_container="false" 
        :replyable_id="reply.reply_id"
        :replyable_type="reply.replyable_user != null || reply.replyable_type == 'comment' ? 'reply' : 'comment'"
        :replyable_user_id="reply.user.user_id"
        :replyable_comment_id="reply.replyable_type == 'comment' ? reply.replyable_id : comment.comment_id"
        :label="$t('Message.Components.Comments.Item.ReplyTo',
      { value: reply.user.username }
    )" @add_reply="add_reply" />
    </v-expand-transition>
  </div>
</template>
<script>
import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'

//回复-对-回复可能存在问题
import IconButton from '@/components/icon-button/index.vue'
import NewCommentOrReply from '@/components/comments/components/new-comment/index.vue'
import TipTapEditor from '@/components/tiptap-editor/index.vue'

import { useUpdateStore } from '@/stores/update'
//由于 回复对回复 回导致数据库逻辑太乱，所以不可以对回复进行回复
export default {
  name: 'comments-reply',
  components: {
    UserLine,
    VoteButton,
    OptionsButton,
    IconButton,
    NewCommentOrReply,
    TipTapEditor,
  },
  props: {
    reply: {
      type: Object,
      default: null
    },
    comment: {
      type: Object,
      default: null
    },
  },
  computed: {
    ReturnUpdateGetReplyUpdate() {
      return this.updateStore.getReplyUpdate
    }
  },
  data() {
    return {
      updateStore: useUpdateStore(),
      editDialog: false,
      editDialog_id: 0,
      editDialog_content: '',
      new_comment_or_reply_show: false,
      local_reply: null,
      local_comment: null
    }
  },
  methods: {
    // EditItem(item){
    //   this.editDialog_id = item.reply_id
    //   this.editDialog_content = item.content
    //   this.editDialog = true
    // },
    add_reply(reply) {
      this.new_comment_or_reply_show = false
      this.$emit('add_reply', reply)
    }
  },
  created() {
    // this.local_reply = this.reply
    // this.local_comment = this.comment
    //     this.$forceUpdate()
  },
  watch: {
    ReturnUpdateGetReplyUpdate(val) {
      if (val.reply_id == this.reply.reply_id) {
        // console.log('reply_id', val.reply_id)
        this.reply = val
        this.$forceUpdate()
      }
    },
    // //深度监听
    // reply: {
    //   handler(val) {
    //     this.local_reply = val
    //     this.$forceUpdate()
    //   },
    //   deep: true
    // },
    // comment: {
    //   handler(val) {
    //     this.local_comment = val
    //     this.$forceUpdate()
    //   },
    //   deep: true
    // }
  }
}
</script>
<style lang="less">
@import './index.less';
</style>

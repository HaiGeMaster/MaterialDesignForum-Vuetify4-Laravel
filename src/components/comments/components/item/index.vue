<template>
  <div class="item" v-if="comment != null">

    <UserLine v-if="comment != null" :user="comment.user" :time="$G_UserTimeStampToDateTime(comment.update_time)" />

    
      <TiptapEditor class="content" :editable="false" :content="comment.content" />

    <div class="actions">
      <VoteButton :vote="comment.vote" :vote_up_count="comment.vote_up_count"
        :vote_down_count="comment.vote_down_count" />

      

        
      <IconButton icon="mdi-reply" :text="$t('Message.Components.Comments.Item.Reply')" :smalls="false"
        @icon_button_click="new_comment_or_reply_show = !new_comment_or_reply_show" />
      <v-spacer></v-spacer>

      

      <OptionsButton v-if="comment != null" type="comment" :item="comment" />
    </div>

    <v-expand-transition>
      <NewCommentOrReply 
        :show="new_comment_or_reply_show" 
        :new_comment_reply_need_glass_container="false"
        :replyable_id="comment.comment_id" 
        replyable_type="comment" 
        :replyable_comment_id="comment.comment_id"
        :replyable_user_id="comment.user.user_id"
        :label="$t('Message.Components.Comments.NewCommentOrReply.WriteYourReply')" 
        @add_reply="add_reply" 
      />
    </v-expand-transition>

    <v-btn rounded="lg"  :loading="is_loading" variant="text" v-if="comment.reply_count > 0" :class="[
      'reply_count',
      {
        'show-replies': show_replies,
      }
    ]" @click="show_replies = !show_replies">
      <v-icon>mdi-menu-down</v-icon>
      <span>
        {{
          show_replies
          ? $t('Message.Components.Comments.Item.CollapseReply')
          : $t('Message.Components.Comments.Item.ViewNReplies',{value:comment.reply_count})
        }}
      </span>
    </v-btn>

    <v-expand-transition>
      <v-card rounded="lg" class="replies" elevation="0" v-if="show_replies">

        <template v-for="(item, index) in data">
        <div>
          <v-divider v-if="index != 0"></v-divider>
          <Reply :reply="item" @add_reply="add_reply" :comment="comment" />
        </div>
      </template>

      <v-btn rounded="lg"  :class="[ 'reply_more']" variant="text"  v-if="pagination.next != null" @click="GetReplys()">
        <v-icon>mdi-subdirectory-arrow-right</v-icon>
        <span v-if="data != null">
          {{ $t('Message.Components.Comments.Item.ShowMoreReplies') }}
          {{ `(${data.length}/${pagination.total})` }}
        </span>
      </v-btn>

      </v-card>
    </v-expand-transition>

  </div>
</template>
<script>
// import UserLine from '@/components/user-line/index.vue'
// import VoteButton from '@/components/vote-button/index.vue'
// import OptionsButton from '@/components/options-button/index.vue'
// import Reply from '@/components/comments/components/reply/index.vue'
// import NewCommentOrReply from '../new-comment/index.vue'

// import UserLine from '@/components/user-line/index.vue'
// import VoteButton from '@/components/vote-button/index.vue'
// import IconButton from '@/components/icon-button/index.vue'
// import OptionsButton from '@/components/options-button/index.vue'
// import Reply from '../reply/index.vue'
// // import NewCommentOrReply from '@/components/comments/components/new-comment-or-reply/index.vue'
// import {
//   GetReplys
// } from '@/api/global.js'

import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import IconButton from '@/components/icon-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import Reply from '@/components/comments/components/reply/index.vue'
import NewCommentOrReply from '@/components/comments/components/new-comment/index.vue'

import TipTapEditor from '@/components/tiptap-editor/index.vue'
import { useUpdateStore } from '@/stores/update'
import {
  GetReplys
} from '@/api/global.js'
export default {
  name: 'comments-item',
  props: {
    classes: {
      type: String,
      default: ''
    },
    comment: {
      type: Object,
      default: null,
    },
  },
  components: {
    UserLine,
    VoteButton,
    IconButton,
    OptionsButton,
    Reply,
    NewCommentOrReply,  
    TipTapEditor,
  },
  data() {
    return {
      // editDialog: false,
      // editDialog_id:0,
      // editDialog_content:'',
      updateStore: useUpdateStore(),
      show_replies: false,
      new_comment_or_reply_show: false,
      is_loading: false,
      data: null,
      pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      order: '-update_time',
    }
  },
  computed: {
    ReturnUpdateGetReplyUpdate() {
      return this.updateStore.getReplyUpdate
    }
  },
  methods: {
    // EditItem(item){
    //   this.editDialog_id = item.comment_id
    //   this.editDialog_content = item.content
    //   this.editDialog = true
    // },
    add_reply(reply) {
      this.new_comment_or_reply_show = false
      if (this.data == null) {
        this.GetReplys()
        this.show_replies = true
      } else {
        this.data.unshift(reply)
      }
      this.$emit('update_comment_reply_count', this.pagination.total)
      this.$forceUpdate()
    },
    async GetReplys() {
      this.is_loading = true
      const response = await GetReplys({
        replyable_comment_id: this.comment.comment_id,
        order: this.order,
        page: this.pagination.next,
        // commentable_type: '',//'comment',
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('comment_id', this.data, response.data.data)
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('reply_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        this.is_loading = false
      } else {
        this.is_loading = false
      }
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    },
  },
  watch: {
    show_replies(val) {
      if (val == true) {
        this.GetReplys()
      }else{
        this.ResetData()
      }
    },
    ReturnUpdateGetReplyUpdate(val) {
      // console.log('ReturnUpdateGetReplyUpdate', val)
      if (val.replyable_comment_id == this.comment.comment_id) {
        this.ResetData()
        this.GetReplys()
      }
    },
  }
}
</script>
<style lang="less">
@import './index.less';
</style>

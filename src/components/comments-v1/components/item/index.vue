<template>
  <!-- @click="show_replies = !show_replies" -->
  <v-list-item rounded="lg" active-class="text-primary" class="py-3" @click="listItemClick()"
    @mouseenter="listItemHover = i" @mouseleave="listItemHover = 0">
    <!-- :active="show_replies" -->
    <template v-slot:prepend>
      <!-- <v-avatar color="grey-darken-3" :image="avatar"></v-avatar> -->
      <UserPopover :user="comment.user" />
    </template>

    <v-list-item-title>{{ comment.user.username }}</v-list-item-title>

    <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
      <TiptapEditor class="content" :editable="false" :content="comment.content" />

      <!-- <v-expand-transition>
        <v-card rounded="lg" variant="flat" v-show="new_comment_or_reply_show">
          <v-card-text>
            <NewCommentOrReplyV1 :show="true" :new_comment_reply_need_glass_container="false"
              :replyable_id="comment.comment_id" replyable_type="comment" :replyable_comment_id="comment.comment_id"
              :replyable_user_id="comment.user.user_id"
              :label="$t('Message.Components.Comments.NewCommentOrReply.WriteYourReply')" @add_reply="add_reply" />
          </v-card-text>
        </v-card>
      </v-expand-transition> -->

      <v-expand-transition>
        <v-card rounded="lg" variant="flat" v-if="show_replies">
          <v-card-text v-show="data != null">
            <ReplyV1 v-for="(item, index) in data" :reply="item" @add_reply="add_reply" :comment="comment" />
          </v-card-text>

          <v-divider></v-divider>

          <!-- <v-card-actions>
            <NewCommentOrReplyV1 :show="true" :new_comment_reply_need_glass_container="false"
              :replyable_id="comment.comment_id" 
              replyable_type="comment" 
              :replyable_comment_id="comment.comment_id"
              :replyable_user_id="comment.user.user_id"
              :label="$t('Message.Components.Comments.NewCommentOrReply.WriteYourReply')" @add_reply="add_reply" />
          </v-card-actions> -->

        </v-card>
      </v-expand-transition>
    </v-list-item-subtitle>

    <!-- <v-expand-transition> -->
    <!-- v-show="listItemHover == i" -->
    <v-list-item-action>
      <v-list-item-subtitle class="text-high-emphasis">
        {{ $G_UserTimeStampToDateTime(comment.update_time) }}
        {{
          comment.user.last_login_location.trim() != ''
            ? ` · ${comment.user.last_login_location}`
            : ''
        }}
      </v-list-item-subtitle>

      <v-btn rounded="lg" size="small" variant="plain" v-show="comment.reply_count > 0" class="text-high-emphasis"
        style="margin-left: 8px" @click.stop="show_replies = !show_replies" :loading="is_loading">
        <v-icon>{{ show_replies ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        {{
          show_replies
            ? $t('Message.Components.Comments.Item.CollapseReply')
            : $t('Message.Components.Comments.Item.ViewNReplies', { value: comment.reply_count })
        }}
      </v-btn>

      <v-btn rounded="lg" variant="text" color="primary" v-if="data != null"
        v-show="pagination.next != null && comment.reply_count > 0 && show_replies" @click.stop="GetReplys()"
        size="small">
        <v-icon>mdi-subdirectory-arrow-right</v-icon>
        <!-- <span v-if="data != null"> -->
        {{ $t('Message.Components.Comments.Item.ShowMoreReplies') }}
        {{ `(${data.length}/${pagination.total})` }}
        <!-- </span> -->
      </v-btn>


      <v-spacer></v-spacer>
      <VoteButton :vote="comment.vote" :vote_up_count="comment.vote_up_count" :vote_down_count="comment.vote_down_count"
        size="small" />
      <!-- style="margin-right: 8px" -->
      <OptionsButton v-if="comment != null" type="comment" :item="comment" size="small" />
    </v-list-item-action>
    <!-- </v-expand-transition> -->
    <!--<v-divider></v-divider>-->
  </v-list-item>
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
import ReplyV1 from '../reply/index.vue'
import NewCommentOrReplyV1 from '../new-comment/index.vue'

import TipTapEditor from '@/components/tiptap-editor/index.vue'
import { useUpdateStore } from '@/stores/update'
import { useSheetStore } from '@/stores/sheet';
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
    ReplyV1,
    NewCommentOrReplyV1,
    TipTapEditor,
  },
  data() {
    return {
      listItemHover: 0,
      // editDialog: false,
      // editDialog_id:0,
      // editDialog_content:'',
      updateStore: useUpdateStore(),
      sheetStore: useSheetStore(),
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
    listItemClick() {
      this.sheetStore.setCommentReplySheet({
        model: true,
        label: this.$t('Message.Components.Comments.NewCommentOrReply.WriteYourReply'),
        replyable_id: this.comment.comment_id,
        replyable_type: 'comment',
        replyable_comment_id: this.comment.comment_id,
        replyable_user_id: this.comment.user.user_id,
        item: this.comment,
        item_type: 'comment',
        callBack: () => this.show_replies = true,
      })
    },
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
      } else {
        this.ResetData()
      }
    },
    ReturnUpdateGetReplyUpdate(val) {
      // console.log('ReturnUpdateGetReplyUpdate', val)
      if (val.replyable_comment_id == this.comment.comment_id) {
        this.ResetData()
        this.show_replies = true
        this.GetReplys()
      }
    },
  }
}
</script>
<style lang="less">
@import './index.less';
</style>

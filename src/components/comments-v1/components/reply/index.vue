<template>
  <!-- @click.stop="new_comment_or_reply_show = !new_comment_or_reply_show"  -->
  <v-list-item rounded="lg" active-class="text-primary" class="py-3"
    @click.stop="listItemClick()" @mouseenter="listItemHover = i"
    @mouseleave="listItemHover = 0" >
    <template v-slot:prepend>
      <UserPopover :user="reply.user" />
    </template>

    <!-- <v-list-item-title>
      {{
        (reply.replyable_user != null && reply.replyable_type == 'reply') ?
          `${reply.user.username} ${$t('Message.Components.Comments.Item.Reply')} ${reply.replyable_user.username}` :
          reply.user.username
      }}
      <span></span>
    </v-list-item-title> -->
    <v-list-item-title v-if="is_reply">
      {{
        `${reply.user.username}`
      }}
      <span class="text-grey"> {{ $t('Message.Components.Comments.Item.Reply')}} </span>

      <UserPopover :user="reply.replyable_user" :slotname="'chip'" :chip_variant="'text'" :chip_size="'small'" />



      <!-- <v-chip @click.stop="$router.push(`${$G_UrlHeaderLang()}/users/${reply.replyable_user.user_id}`)" variant="text" size="small">
        <v-avatar start > 
          <v-img :src="$G_ImgHandle(reply.replyable_user.avatar.small)">

            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
            </template>

          </v-img>
        </v-avatar>
        {{ reply.replyable_user.username }}
      </v-chip> -->

    </v-list-item-title>
    <v-list-item-title v-else>
      {{ reply.user.username }}
    </v-list-item-title>


    <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
      <TiptapEditor class="content" :editable="false" :content="reply.content" />

    <v-expand-transition>
      <NewCommentOrReplyV1 
        v-if="reply != null" 
        :show="new_comment_or_reply_show"
        :new_comment_reply_need_glass_container="false" 
        :replyable_id="reply.reply_id"
        :replyable_type="reply.replyable_user != null || reply.replyable_type == 'comment' ? 'reply' : 'comment'"
        :replyable_user_id="reply.user.user_id"
        :replyable_comment_id="reply.replyable_type == 'comment' ? reply.replyable_id : comment.comment_id" 
        :label="$t('Message.Components.Comments.Item.ReplyTo',
          { value: reply.user.username }
        )" 
        @add_reply="add_reply" 
        />
    </v-expand-transition>
    </v-list-item-subtitle>

    <v-list-item-action>
      <v-list-item-subtitle class="text-high-emphasis">
        {{ $G_UserTimeStampToDateTime(reply.update_time) }}
        <!-- · {{ reply.user.location }} -->
         
        {{ 
        reply.user.last_login_location.trim() != ''
        ? ` · ${reply.user.last_login_location}`
        : ''
        }}
      </v-list-item-subtitle>
      <!-- <IconButton icon="mdi-reply" :text="$t('Message.Components.Comments.Item.Reply')" :smalls="false"
        @icon_button_click="new_comment_or_reply_show = !new_comment_or_reply_show" /> -->
      <v-spacer></v-spacer>
      <VoteButton :vote="reply.vote" :vote_up_count="reply.vote_up_count" :vote_down_count="reply.vote_down_count"
        size="small" />
        <!-- style="margin-right: 8px"  -->
      <OptionsButton v-if="reply != null" type="reply" :item="reply" size="small"/>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'

//回复-对-回复可能存在问题
import IconButton from '@/components/icon-button/index.vue'
import NewCommentOrReplyV1 from '../new-comment/index.vue'
import TipTapEditor from '@/components/tiptap-editor/index.vue'
import UserPopover from '@/components/user-popover/index.vue'

import { useUpdateStore } from '@/stores/update'
import { useSheetStore } from '@/stores/sheet'
//由于 回复对回复 回导致数据库逻辑太乱，所以不可以对回复进行回复
export default {
  name: 'comments-reply',
  components: {
    UserLine,
    VoteButton,
    OptionsButton,
    IconButton,
    NewCommentOrReplyV1,
    UserPopover,
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
    },
    is_reply() {
      return this.reply.replyable_user != null && this.reply.replyable_type == 'reply'
    },
    reply_user() {
      return this.reply.replyable_user
    }
  },
  data() {
    return {
      listItemHover: 0,
      updateStore: useUpdateStore(),
      sheetStore: useSheetStore(),
      editDialog: false,
      editDialog_id: 0,
      editDialog_content: '',
      new_comment_or_reply_show: false,
      local_reply: null,
      local_comment: null
    }
  },
  methods: {
    listItemClick() {
      this.sheetStore.setCommentReplySheet({
        model: true,
        label: this.$t('Message.Components.Comments.Item.ReplyTo',
          { value: this.reply.user.username }
        ),
        replyable_id: this.reply.reply_id,
        replyable_type: (this.reply.replyable_user != null || this.reply.replyable_type == 'comment' ? 'reply' : 'comment'),
        replyable_comment_id: (this.reply.replyable_type == 'comment' ? this.reply.replyable_id : this.comment.comment_id),
        replyable_user_id: this.reply.user.user_id,
        item: this.reply,
        item_type: 'reply',
        // callBack: ()=>this.show_replies = true,
      })
    },
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

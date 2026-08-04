<template>
  <!-- color="surface-variant" variant="outlined"  -->
  <!-- <v-card rounded="lg" class="mx-auto "  variant="tonal" @mouseover="mouseover = true"
    @mouseleave="mouseover = false"> -->
    <v-list-item rounded="lg" :to="SpawnLink(item)" :title="item.sender_user.username" style="height: 64px;">
      <template v-slot:prepend>
        <UserPopover :user="item.sender_user" />
      </template>
      <template v-slot:subtitle="{ subtitle }">

        <div>
          {{
            $t(`Message.Client.Notifications.Type.${item.type}`,
              {
                value: '',
              }
            )
          }}
          <span style="font-weight: 800;" v-if="item.receiver_content">
            {{ item.receiver_content }}
          </span>
        </div>

        <!-- 最多一行显示 -->
        <span v-if="item.sender_content" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{ $t(item.sender_content) }}
        </span>
      </template>

      <template v-slot:append>
        <span style="font-size: 12px;margin-right: 8px;">
          {{ $G_UserTimeStampToDateTime(item.create_time) }}
        </span>

        <v-icon>
          {{ SpawnIcon(item) }}
        </v-icon>
      </template>

    </v-list-item>
  <!-- </v-card> -->
</template>
<script>
import UserPopover from '@/components/user-popover/index.vue'
export default {
  name: 'notification-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    UserPopover,
  },
  data: () => ({
    mouseover: false,
  }),
  methods: {
    SpawnLink(item) {
      switch (item.type) {
        case 'user_follow':
          return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
        case 'topic_follow':
        case 'topic_delete':
          return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
        case 'question_follow':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_comment':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_answer':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_delete':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'article_follow':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_comment':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_like':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_delete':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'answer_comment':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'answer_like':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'answer_delete':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'comment_like':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'comment_reply':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'comment_delete':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_like':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_reply':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_delete':
          // console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'follow_user_update':
          // return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
          if (item.article_id != 0) {
            return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
          } else if (item.question_id != 0) {
            return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
          } else {
            return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
          }
        case 'follow_topic_update':
          // return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
          if (item.article_id != 0) {
            return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
          } else if (item.question_id != 0) {
            return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
          } else {
            return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
          }
        case 'follow_question_update':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'follow_article_update':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
      }
    },
    SpawnIcon(item) {
      switch (item.type) {
        case 'user_follow':
          return 'mdi-account'
        case 'topic_follow':
        case 'topic_delete':
          return 'mdi-book-variant'
        case 'question_follow':
          return 'mdi-forum'
        case 'question_comment':
          return 'mdi-forum'
        case 'question_answer':
          return 'mdi-forum'
        case 'question_delete':
          return 'mdi-forum'
        case 'article_follow':
          return 'mdi-file-document'
        case 'article_comment':
          return 'mdi-file-document'
        case 'article_like':
          return 'mdi-thumb-up'
        case 'article_delete':
          return 'mdi-file-document'
        case 'answer_comment':
          return 'mdi-message-reply'
        case 'answer_like':
          return 'mdi-thumb-up'
        case 'answer_delete':
          return 'mdi-message-reply'
        case 'comment_like':
          return 'mdi-thumb-up'
        case 'comment_reply':
          return 'mdi-message-reply-text'
        case 'comment_delete':
          return 'mdi-message-reply-text'
        case 'reply_like':
          return 'mdi-thumb-up'
        case 'reply_reply':
          return 'mdi-reply-all'
        case 'reply_delete':
          return 'mdi-reply-all'
        case 'follow_user_update':
          return 'mdi-star'
        case 'follow_topic_update':
          return 'mdi-star'
        case 'follow_question_update':
          return 'mdi-star'
        case 'follow_article_update':
          return 'mdi-star'
      }
    },
  }
}
</script>
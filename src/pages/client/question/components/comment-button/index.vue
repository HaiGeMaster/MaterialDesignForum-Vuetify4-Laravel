<template>
  <!-- comment-multiple-outline -->
   <!-- mdi-message-reply-text -->
  <IconButton 
    icon="mdi-comment-multiple-outline" 
    :text="$t('Message.Client.Question.CommentButton.Comment')"
    :count="count"
    @icon_button_click="$emit('comment_button_click')"
    :btn_size="btn_size"
    :icon_size="icon_size"
    :btn_variant="btn_variant"
  />
</template>
<script>
import IconButton from '@/components/icon-button/index.vue'
export default {
  name: 'page-question-comment-button',
  props: {
    btn_variant: {
      type: String,
      default: 'tonal',
    },
    btn_size: {
      type: String,
      default: 'default',
    },
    icon_size: {
      type: String,
      default: 'small',
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  components: {
    IconButton,
  },
}
</script>
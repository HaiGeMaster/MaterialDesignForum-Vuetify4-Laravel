<template>
  <div class="mc-topic-item item-inner">
    <!-- surface-variant -->
    <v-card rounded="lg" variant="outlined" color="surface-variant" :to="`${$G_UrlHeaderLang()}/topics/${topic.topic_id}`"
      class="item" :style="{
        backgroundImage: `url(${$G_ImgHandle(topic.cover.small)})`,
      }">
      <div class="info">
        <div class="name">
          {{ topic.name }}
        </div>
      </div>
      <div class="actions">
        <FollowButton followable_type="topic" :followable_id="topic.topic_id" :is_follow="topic.is_follow" />
        <v-btn rounded="lg"  variant="text" class="followers" @click.prevent.stop="
          dialogStore.setUsersDialog({
            id: topic.topic_id,
            type: 'topic',
            modes: 'followers',
            model: true,
          })
          ">

          {{
            $t('Message.Components.TpoicItem.Followers', {
              value: topic.follower_count,
            })
          }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { useDialogStore } from '@/stores/dialog';
import FollowButton from '@/components/follow-button/index.vue'
export default {
  props: {
    topic: {
      required: false,
      type: Object,
      default: {
        cover: {
          small: 'https://www.xbedrock.com/public/static/upload/topic/covers/1749867054/middle/30c3af903df94cb3c6c35efc6347b477.png',
        },
        name: '话题',
        follower_count: 0,
        topic_id: 1,
      },
    },
  },
  data() {
    return {
      dialogStore: useDialogStore(),
    }
  },
  components: {
    FollowButton,
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
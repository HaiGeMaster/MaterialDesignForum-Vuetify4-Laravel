<template>
  <!-- style="width: 100%" -->
  <!-- <div class="topic-item"> -->
    <v-card rounded="lg" hover class="mx-auto" :to="`${$G_UrlHeaderLang()}/topics/${topic.topic_id}`">
      <!-- style="height: 164px" -->
      <v-img class="align-end text-white" style="height: 134px" :src="$G_ImgHandle(topic.cover.small)" cover>
        <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ topic.name }} </v-card-subtitle>

      <!-- <v-card-text>
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text> -->

      <v-card-actions>
        <!-- <v-btn variant="tonal" icon="mdi-star-outline"></v-btn> -->
        <FollowButton followable_type="topic" :followable_id="topic.topic_id" :is_follow="topic.is_follow" />
        <v-spacer></v-spacer>
        <!-- <v-btn variant="plain" text="0 人关注"></v-btn> -->
        <v-btn rounded="lg" variant="plain" class="followers" @click.prevent.stop="
          setUsersDialog()
          ">
          {{
            $t('Message.Components.TpoicItem.Followers', {
              value: topic.follower_count,
            })
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  <!-- </div> -->
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
  methods: {
    setUsersDialog() {
      this.dialogStore.setUsersDialog({
        id: this.topic.topic_id,
        type: 'topic',
        modes: 'followers',
        model: true,
      })
    }
  }
}
</script>
<style lang="less">
// @import './index.less';

</style>
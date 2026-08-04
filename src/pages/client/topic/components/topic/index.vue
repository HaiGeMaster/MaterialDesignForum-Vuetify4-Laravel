<template>
  <!-- color="surface-variant" variant="outlined" elevation="0"-->
  <v-card :rounded="$G_Rounded()" class="topic" elevation="2" >

    <div class="info">
      <div class="cover rounded-lg" :style="{
        backgroundImage: `url(${$G_ImgHandle(topic.cover.small)})`,
      }" 
     
      />
       <!-- data-fancybox="gallery" -->
      <!-- <v-img
        :src="$G_ImgHandle(topic.cover.small)"
        class="cover"
        fit="cover"
        height="200"
        data-fancybox="gallery"
      /> -->
      <div class="main">
        <div class="name">{{ topic.name }}</div>
        <div class="meta">
          <span>{{ $t('Message.Client.Topic.Topic.NQuestions', {
            value: topic.question_count,
          }) }}</span>
          <span>{{ $t('Message.Client.Topic.Topic.NArticles', {
            value: topic.article_count,
          }) }}</span>
        </div>
        <div class="description mdui-text-color-theme-secondary" v-text="topic.description" />
      </div>
    </div>
    <div class="actions">
      <FollowButton followable_type="topic" :followable_id="topic.topic_id" :is_follow="topic.is_follow" />

      <v-spacer />
      <OptionsButton type="topic" :item="topic" />
    </div>

  </v-card>
</template>

<script>
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
// import {useMainStore} from '@/stores/main'
export default {
  props: {
    topic: {
      required: false,
      type: Object,
      default: {
        cover: {
          small: 'https://www.xbedrock.com/public/static/upload/topic/covers/1749867054/middle/30c3af903df94cb3c6c35efc6347b477.png',
        },
        name: 'Material Design 3 主题',
        question_count: 0,
        article_count: 0,
        description: 'Material Design 3 主题',
        follower_count: 0,
        topic_id: 0,
      },
    },
    // loading: {
    //     required: false,
    //     type: Boolean,
    //     default: false,
    // },
    // actions: {
    //     required: false,
    //     type: Array,
    //     default: () => [],
    // },
  },
  components: {
    FollowButton,
    OptionsButton,
  },
  data() {
    return {
      // mainStore: useMainStore(),
    }
  },
}
</script>

<style lang="less">
@import './index.less';
</style>

<template>
  <div class="mc-topics-bar">
    <v-chip v-for="topic in topics" :key="topic.topic_id" :to="`${$G_UrlHeaderLang()}/topics/${topic.topic_id}`" style="margin-right: 8px;">
      <v-avatar start>
        <v-img :src="$G_ImgHandle(topic.cover.small)">

          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </template>

        </v-img>
      </v-avatar>
      {{ topic.name }}
    </v-chip>
  </div>
</template>
<script>
export default {
  name: 'TopicsBar',
  props: {
    topics: {
      required: false,
      type: Array,
      default: () => [
        {
          topic_id: 1,
          name: '话题1',
          cover: {
            small: 'https://img2.baidu.com/it/u=3522242222,2827289222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
          }
        },
      ]
    },
  },
  components: {
  }
}
</script>
<style lang="less">
@import './index.less';
</style>

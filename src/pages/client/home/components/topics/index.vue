<template>
  <div class="topics-wrapper">
    <div class="topics" ref="topics" >
      <TopicItem v-for="topic in data" :key="topic.topic_id" :topic="topic" />
    </div>
    <v-btn   v-show="topics_show_arrow_left" icon="mdi-chevron-left" class="arrow-left"
      @click="jumpTo('left')"></v-btn>
    <v-btn   v-show="topics_show_arrow_right" :loading="loading" icon="mdi-chevron-right" class="arrow-right"
      @click="jumpTo('right')"></v-btn>
    <!-- <Loading :show="state.topics_loading" /> -->
  </div>
</template>

<script>
import {
  scrollHorizontal,
  GetTopics,
  Get_G_INDEX_TOPICS,
} from '@/api/global.js'

import TopicItem from '@/components/topic-item/index.vue'
// import TopicItemSekeleton from '@/components/topic-item-skeleton/index.vue'
export default {
  props: {
    order: {
            required: false,
      type: String,
      default: '-update_time',
    },
    following: {
            required: false,
      type: Boolean,
      default: false,
    },
    get_type: {
            required: false,
      type: String,
      default: 'topics',
    },
  },
  components: {
    TopicItem,
    // TopicItemSekeleton,
  },
  data: () => ({
    loading: false,
    topics_show_arrow_left: false,
    topics_show_arrow_right: true,
    data: null,
    pagination: {
      page: 0,
      per_page: 5,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  methods: {
    jumpTo(position) {
      const element = this.$refs.topics;
      const isLeft = position === 'left';
      const offset = element.offsetWidth * (isLeft ? -1 : 1);
      const _this = this;
      if (position === 'right') {
        this.GetTopics();
      }else{
        this.topics_show_arrow_right = true;
      }
      scrollHorizontal(element, {
        offset,
        callback: () => {
          _this.jumpEnd(element,position);
        },
      });
    },
    jumpEnd(element,position) {
      this.topics_show_arrow_left = element.scrollLeft > 0;
      if(position === 'right'){
        this.topics_show_arrow_right = (element.scrollLeft + element.offsetWidth < element.scrollWidth)&&(this.pagination.next!=0&&this.pagination.next!=null);
      }
      else{
        this.topics_show_arrow_right = (element.scrollLeft + element.offsetWidth < element.scrollWidth);
      }
    },
    async GetTopics() {
      try {
        const TOPICS = Get_G_INDEX_TOPICS()
        // console.log('TOPICS', TOPICS)
        if (TOPICS !== null) {
          this.data = TOPICS.data
          this.pagination = TOPICS.pagination
          return
        }

        this.loading = true
        var token = this.$G_GetUserToken()
        // const response = await this.$axios.post(`/aepi/${this.get_type}/get`, {
        //   order: this.order,
        //   following: this.following,
        //   page: this.pagination.next,
        //   user_token:  token != '' ? token : '',
        // })
        const response = await GetTopics({
          order: this.order,
          following: this.following,
          page: this.pagination.next,
          user_token: token != '' ? token : '',
        })
        if (response.data.is_get == true) {
          if (this.data == null) {
            this.data = response.data.data
          } else {
            this.data = this.$G_FilterSameItems('topic_id', this.data, response.data.data)
          }
          this.pagination = response.data.pagination
          this.loading = false
        } else {
          this.loading = false
        }
      } catch (error) {
        this.loading = false
      }
    },
  },
  created() {
    if (window.G_INDEX_TOPICS != null) {
      this.data = window.G_INDEX_TOPICS.data
      this.pagination = window.G_INDEX_TOPICS.pagination
    } else {
      this.GetTopics()
    }
  },
};
</script>

<style>
@import './index.less';
</style>
<template>
  <v-container id="page-topics" style="max-width: 1080px;padding: 0;">
    <v-tabs-window v-model="tab_item">
      <v-tabs-window-item value="#following" v-if="userStore.getIsLogin">
        <!-- <div class="items-wrapper">
          <TopicItem v-for="i in following_data" :key="i.topic_id" :topic="i" />
        </div> -->
        <v-container class="pa-4" fluid>
          <v-row style="width: 100%" density="comfortable">
            <v-col v-for="(topic, index) in following_data" :key="topic.topic_id" cols="12" sm="6" md="4" lg="3">
              <TopicItemV1 :topic="topic" />
            </v-col>

            <v-col v-if="following_loading" v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
              <TopicSkeleton />
            </v-col>
          </v-row>
          
        <Loading :empty="following_data == null" :loading="following_loading" :pagination="following_pagination"
          @autoload="GetTopicsFollowing" 
          :empty_title="$t('Message.Components.Empty.NoFollowedTopics')"
          :empty_text="$t('Message.Components.Empty.FollowedTopicsNotice')"
          :empty_btn_text="$t('Message.Components.Empty.ViewFeaturedTopics')"
          @empty_btn_click="$router.push(`${this.$G_UrlHeaderLang()}/topics#recommended`)"
          />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="#recommended">
        <!-- <div class="items-wrapper">
          <TopicItem v-for="i in recommended_data" :key="i.topic_id" :topic="i" />
        </div> -->
        <v-container class="pa-4" fluid>
          <v-row style="width: 100%" density="comfortable">
            <v-col v-for="(topic, index) in recommended_data" :key="topic.topic_id" cols="12" sm="6" md="4" lg="3">
              <TopicItemV1 :topic="topic" />
            </v-col>
            <v-col v-if="recommended_loading" v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
              <TopicSkeleton />
            </v-col>
          </v-row>
          <Loading :empty="recommended_data == null" :loading="recommended_loading" :pagination="recommended_pagination"
          @autoload="GetTopicsRecommended" 
          :empty_title="$t('Message.Components.Empty.NoPublishedTopicsYet')"
          :empty_text="$t('Message.Components.Empty.TopicsWillShowAfterYet')"
          />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'

import {
  GetTopics,
  Get_G_TOPICS_RECOMMENDED,
} from '@/api/global.js'

import TopicItemV1 from '@/components/topic-item/index-v1.vue'
import TopicSkeleton from '@/components/topic-item/skeleton.vue'

export default {
  name: 'TopicsIndex',
  components: {
    TopicItemV1,
    TopicSkeleton,
  },
  computed: {
    tab_item: {
      get() {
        return this.$route.hash || (this.userStore.getIsLogin ? '#following' : '#recommended')
      },
      set(val) {
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    },
  },
  data() {
    return {
      // tab: 'recommended',
      userStore: useUserStore(),

      following_loading: false,
      following_data: null,
      following_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      recommended_loading: false,
      recommended_data: null,
      recommended_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
    }
  },
  created() {
    //根据路由哈希设置当前选中的tab
    // this.handleTabChange()
    // this.UpdateTabItems(this.$route)
  },
  methods: {
    //处理选择tab
    // handleTabChange() {
    //   const hash = this.$route.hash.split('#')[1]
    //   // console.log(hash)
    //   if (this.userStore.getIsLogin && (hash == undefined || hash == '' || hash == 'following')) {
    //     this.tab_item = '#following'
    //     this.GetTopicsFollowing()
    //   } else if (hash == undefined || hash == 'recommended' || hash == '') {
    //     this.tab_item = '#recommended'
    //     this.GetTopicsRecommended()
    //   }
    // },
    // UpdateTabItems(val) {
    //   if (val.name == 'topics' || val.name == 'lang-topics') {
    //     if (this.userStore.getIsLogin && (val.hash == '' || val.hash == '#following')) {
    //       this.tab_item = '#following'
    //       this.GetTopicsFollowing()
    //     } else if (val.hash == '#recommended' || val.hash == '') {
    //       this.tab_item = '#recommended'
    //       this.GetTopicsRecommended()
    //     }
    //   }
    // },
    async GetTopicsFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetTopics({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `topic_id`
        this.following_data == null ? this.following_data = response.data.data : this.$G_FilterSameItems(keys, this.following_data, response.data.data)
        this.following_pagination = response.data.pagination
      }
      this.following_loading = false
      this.$forceUpdate()
    },
    async GetTopicsRecommended() {
      const TOPICS_RECOMMENDED = Get_G_TOPICS_RECOMMENDED()
      // console.log('TOPICS_RECOMMENDED', TOPICS_RECOMMENDED)
      if (TOPICS_RECOMMENDED !== null) {
        this.recommended_data = TOPICS_RECOMMENDED.data
        this.recommended_pagination = TOPICS_RECOMMENDED.pagination
        return
      }

      if (this.recommended_loading) {
        return
      }
      this.recommended_loading = true
      const response = await GetTopics({
        order: '-create_time',
        page: this.recommended_pagination.next,
        per_page: this.recommended_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `topic_id`
        this.recommended_data == null ? this.recommended_data = response.data.data : this.$G_FilterSameItems(keys, this.recommended_data, response.data.data)
        this.recommended_pagination = response.data.pagination
      }
      this.recommended_loading = false
      this.$forceUpdate()
    },
    ResetData() {
      this.following_data = null
      this.following_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.recommended_data = null
      this.recommended_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    }
  },
  watch: {
    // ReturnUserIsLogin(val) {
    //   if (val) {
    //     this.UpdateTabItems(this.$route)
    //   }
    // },
    // $route(val) {
    //   this.UpdateTabItems(val)
    // }
  },
}
</script>
<style lang="less">
// @import './index.less';
// 
// 


</style>
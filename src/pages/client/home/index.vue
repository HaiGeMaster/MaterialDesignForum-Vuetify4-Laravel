<template>
  <!-- id="page-index" -->
  <v-container id="page-index">
    <!-- <SlideGroup /> -->
    <!-- v-if="mainStore.getPageLayout == 'default'" -->
    <!-- <div v-if="mainStore.getPageLayout == 'default'"> -->
      <!-- <div> -->

      <!-- <v-btn @click="fabDialogStore.setNewEditorFabDialog({ model: true })">编辑帖子</v-btn> -->
      <TextPlay />
      <CarouselV1 />
      <TopicsV1 />
      <div class="items-wrapper">
        <Items :title="$t('Message.Client.Index.LatestQuestions')" :type="'questions'" :order="'-update_time'"
          :title_url="`${$G_UrlHeaderLang()}/questions`" />
        <Items :title="$t('Message.Client.Index.RecentlyPopularQuestions')" :type="'questions'" :order="'-vote_count'"
          :title_url="`${$G_UrlHeaderLang()}/questions#popular`" />
      </div>
      <div class="items-wrapper">
        <Items :title="$t('Message.Client.Index.LatestArticles')" :type="'articles'" :order="'-update_time'"
          :title_url="`${$G_UrlHeaderLang()}/articles`" />
        <Items :title="$t('Message.Client.Index.RecentlyPopularArticles')" :type="'articles'" :order="'-vote_count'"
          :title_url="`${$G_UrlHeaderLang()}/articles#popular`" />
      </div>
      <div class="items-wrapper">
        <Items :title="$t('Message.Client.Index.NewlyJoinedPeople')" :type="'users'" :users_type="'recommended'"
          :order="'-create_time'" title_icon="mdi-new-box" title_icon_color="orange"
          :title_url="`${$G_UrlHeaderLang()}/users`" />
        <Items :title="$t('Message.Client.Index.TheMostPopularPerson')" :type="'users'" :users_type="'recommended'"
          :order="'-follower_count'" title_icon="mdi-fire" title_icon_color="red"
          :title_url="`${$G_UrlHeaderLang()}/users`" />
      </div>
    <!-- </div> -->

  </v-container>
</template>
<style lang="less">
@import './index.less';
</style>
<script>
// import SlideGroup from '@/components/slide-group/index.vue'
import TopicsV1 from './components/topics/index-v1.vue'
import Items from './components/items/index.vue'
import TextPlay from './components/text-play/index.vue'
import CarouselV1 from './components/carousel/carousel-v1.vue'
import { useMainStore } from '@/stores/main.js'
// import { useFabDialogStore } from '@/stores/fab-dialog.js'
// import NavList from '@/components/navigation-drawer/nav-list.vue'

export default {
  data() {
    return {
      mainStore: useMainStore(),
      // fabDialogStore: useFabDialogStore(),
    }
  },
  components: {
    TopicsV1,
    Items,
    TextPlay,
    CarouselV1,
    // NavList,
  }
}
</script>
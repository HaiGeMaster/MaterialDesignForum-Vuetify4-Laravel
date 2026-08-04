<template>
  <v-container id="page-questions">
    <v-tabs-window v-model="tab_item">
      <v-tabs-window-item value="#recent" class="tab-item">
        <v-container class="tab-content" fluid>

          <v-card rounded="lg" v-show="recent_data!=null||recent_loading" class="items-wrapper" color="surface-variant"
            :variant="mainStore.getMobile ? 'text' : 'elevated'">
            <v-list lines="one" selectable>

              <template v-for="(item, index) in recent_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
              <ListItemSkeleton v-if="recent_loading" v-for="i in 20" :key="i" />
            </v-list>
          </v-card>

          <!-- <v-card rounded="lg" class="items-wrapper" color="surface-variant"
            :variant="mainStore.getMobile ? 'text' : 'elevated'">
            <v-list lines="one" selectable>
              <ListItemSkeleton v-if="recent_loading" v-for="i in 20" :key="i" />
            </v-list>
          </v-card> -->
        </v-container>

        <Loading :empty="recent_data == null" :loading="recent_loading" :pagination="recent_pagination"
          @autoload="GetQuestionsRecent" :empty_title="$t('Message.Components.Empty.NoQuestionsPublished')"
          :empty_text="$t('Message.Components.Empty.RecentQuestionsPlaceholder')"
          :empty_btn_text="$t('Message.Components.Empty.PublishQuestion')" @empty_btn_click="
            OpenNewEditorFabDialog()
            " />
      </v-tabs-window-item>
      <v-tabs-window-item value="#popular">

        <v-container class="tab-content" fluid>

          <v-card rounded="lg" v-show="popular_data!=null||popular_loading" class="items-wrapper" color="surface-variant"
            :variant="mainStore.getMobile ? 'text' : 'elevated'">
            <v-list lines="one" selectable>
              <template v-for="(item, index) in popular_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
              <ListItemSkeleton v-if="popular_loading" v-for="i in 20" :key="i" />
            </v-list>
          </v-card>
        </v-container>
        <Loading :empty="popular_data == null" :loading="popular_loading" :pagination="popular_pagination"
          @autoload="GetQuestionsPopular" :empty_title="$t('Message.Components.Empty.NoHotQuestions')"
          :empty_text="$t('Message.Components.Empty.HotQuestionsPlaceholder')"
          :empty_btn_text="$t('Message.Components.Empty.ViewLatestQuestions')"
          @empty_btn_click="$router.push(`${this.$G_UrlHeaderLang()}/questions#recent`)" />
      </v-tabs-window-item>
      <v-tabs-window-item value="#following" v-if="userStore.getIsLogin">

        <v-container class="tab-content" fluid>

          <v-card rounded="lg" v-show="following_data!=null||following_loading" class="items-wrapper" color="surface-variant"
            :variant="mainStore.getMobile ? 'text' : 'elevated'">
            <v-list lines="one" selectable>
              <template v-for="(item, index) in following_data">
                <v-divider v-if="index > 0"></v-divider>
                <ListItem type="questions" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`" :item="item"
                  :title="item.title" :subtitle="item.content_markdown"
                  :action_time="$G_UserTimeStampToDateTime(item.create_time)" :action_subtitle="$t('Message.Client.Question.NAnswers', {
                    value: item.answer_count,
                  })" />
              </template>
              <ListItemSkeleton v-if="following_loading" v-for="i in 20" :key="i" />
            </v-list>
          </v-card>
        </v-container>
        <Loading :empty="following_data == null" :loading="following_loading" :pagination="following_pagination"
          @autoload="GetQuestionsFollowing" :empty_title="$t('Message.Components.Empty.NoFollowedQuestions')"
          :empty_text="$t('Message.Components.Empty.FollowedQuestionsNotice')"
          :empty_btn_text="$t('Message.Components.Empty.ViewHotQuestions')"
          @empty_btn_click="$router.push(`${this.$G_UrlHeaderLang()}/questions#popular`)" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog';
import { useFabDialogStore } from '@/stores/fab-dialog';
import { useSnackbarStore } from '@/stores/snackbar';
import {
  GetQuestions,
  Get_G_QUESTIONS_RECENT,
  Get_G_QUESTIONS_POPULAR,
} from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item/skeleton.vue'
import Loading from '@/components/loading/index.vue'
export default {
  components: {
    ListItem,
    ListItemSkeleton,
    Loading,
  },
  computed: {
    tab_item: {
      get() {
        return this.$route.hash || '#recent'
      },
      set(val) {
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    }
  },
  data: () => ({
    userStore: useUserStore(),
    mainStore: useMainStore(),
    fabDialogStore: useFabDialogStore(),
    dialogStore: useDialogStore(),
    snackbarStore: useSnackbarStore(),
    // tab_item: 'recent',
    recent_loading: false,
    recent_data: null,
    recent_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    popular_loading: false,
    popular_data: null,
    popular_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
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
  }),
  methods: {
    OpenNewEditorFabDialog() {
      if (!this.userStore.getIsLogin) {//如果没有登录
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      this.fabDialogStore.setNewEditorFabDialog({
        title: this.$t('Message.Components.Editor.NewQuestions'),
        icon: 'mdi-forum-plus-outline',
        showTitle: true,
        showTopics: true,
        submitText: this.$t('Message.Components.Editor.Release'),
        editType: 'question',
        editMode: 'new',
        editItem: null,
        mdTitle: '',
        mdTopics: [],
        mdContent: '',
        model: true,
        editItemId: 0,
      })
    },
    async GetQuestionsRecent() {
      const QUESTIONS_RECENT = Get_G_QUESTIONS_RECENT()
      // console.log('QUESTIONS_RECENT', QUESTIONS_RECENT)
      if (QUESTIONS_RECENT !== null) {
        this.recent_data = QUESTIONS_RECENT.data
        this.recent_pagination = QUESTIONS_RECENT.pagination
        return
      }

      if (this.recent_loading) {
        return
      }
      this.recent_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.recent_pagination.next,
        per_page: this.recent_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.recent_data == null ? this.recent_data = response.data.data : this.$G_FilterSameItems(keys, this.recent_data, response.data.data)
        this.recent_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.recent_loading = false
    },
    async GetQuestionsPopular() {
      const QUESTIONS_POPULAR = Get_G_QUESTIONS_POPULAR()
      // console.log('QUESTIONS_POPULAR', QUESTIONS_POPULAR)
      if (QUESTIONS_POPULAR !== null) {
        this.popular_data = QUESTIONS_POPULAR.data
        this.popular_pagination = QUESTIONS_POPULAR.pagination
        return
      }

      if (this.popular_loading) {
        return
      }
      this.popular_loading = true
      const response = await GetQuestions({
        order: '-follower_count',
        page: this.popular_pagination.next,
        per_page: this.popular_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.popular_data == null ? this.popular_data = response.data.data : this.$G_FilterSameItems(keys, this.popular_data, response.data.data)
        this.popular_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.popular_loading = false
    },
    async GetQuestionsFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.following_data == null ? this.following_data = response.data.data : this.$G_FilterSameItems(keys, this.following_data, response.data.data)
        this.following_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.following_loading = false
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>

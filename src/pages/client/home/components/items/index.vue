<template>
  <div class="items-container">
    <!-- variant="tonal" color="primary" surface-variant-->
     <!-- variant="outlined" color="surface-variant" -->
    <v-card rounded="lg"  class="items" hover>
      <Header :text="title" :url="title_url" :icon="title_icon" :icon_color="title_icon_color"
        :disabled="title_disabled" />
      <div class="content">
        <!-- <v-list rounded="lg" lines="one">
           <template v-for="i in data" :key="i">
            <v-divider></v-divider>
            <ListItem :user="i.user" :title="ListItemTitle(i)" :subtitle="ListItemSubtitle(i)" />
           </template>
</v-list> -->
        <v-list lines="one" style="padding: 0;">

          <template v-for="(item, index) in data">
            <v-divider v-if="index < show_count" />
            <ListItem :show="index < show_count" :title="ListItemTitle(item)" :subtitle="ListItemSubtitle(item)"
              :action_time="ListItemActionTime(item)" :action_subtitle="ListItemActionSubtitle(item)" :item="item"
              :type="type" :to="`${$G_UrlHeaderLang()}/${type}/${ListItemId(item)}`" />
          </template>
          <ListItemSkeleton v-if="loading" v-for="i in 5" :key="i" />
        </v-list>
      </div>
    </v-card>
  </div>
</template>
<script>
import {
  GetDatas,
  Get_G_INDEX_QUESTIONS_RECENT,
  Get_G_INDEX_QUESTIONS_POPULAR,
  Get_G_INDEX_ARTICLES_RECENT,
  Get_G_INDEX_ARTICLES_POPULAR,
  Get_G_INDEX_USERS_RECENT,
  Get_G_INDEX_USERS_POPULAR,
} from '@/api/global.js'

import Header from '../header/index.vue'
import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item/skeleton.vue'

// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    title_url: {
      type: String,
      default: ''
    },
    title_icon: {
      type: String,
      // default: 'mdi-arrow-right',
      default: 'mdi-chevron-right',
    },
    title_icon_color: {
      type: String,
      default: 'primary'
    },
    title_disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'questions'
    },
    order: {
      type: String,
      default: '-update_time'
    },
    users_type: {
      type: String,
      default: 'recommended'
    },
    show_count: {
      type: Number,
      default: 5
    },
  },
  components: {
    Header,
    ListItem,
    ListItemSkeleton,
  },
  data: () => ({
    loading: false,
    empty: false,
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  methods: {
    ListItemTitle(item) {
      switch (this.type) {
        case 'articles':
        case 'questions':
        case 'answers':
        case 'messages':
          return item.title
        case 'users':
          return item.username
        default:
          return ''
      }
    },
    ListItemSubtitle(item) {
      switch (this.type) {
        case 'articles':
        case 'questions':
        case 'answers':
        case 'messages':
          return item.content_markdown
        case 'users':
          return item.headline
        default:
          return ''
      }
    },
    ListItemActionTime(item) {
      switch (this.type) {
        case 'articles':
        case 'questions':
        case 'answers':
        case 'messages':
          return this.$G_UserTimeStampToDateTime(item.update_time)
        case 'users':
          if (this.order == '-create_time' && this.type == 'users') {
            return this.$t('Message.Components.UsersDialog.FollowersN', { value: item.follower_count })
          }
          return this.$G_UserTimeStampToDateTime(item.update_time)
        default:
          return ''
      }
    },
    ListItemActionSubtitle(item) {
      switch (this.type) {
        case 'articles':
          return this.$t('Message.Components.ListItem.NComment', { value: item.comment_count })
          break
        case 'questions':
          return this.$t('Message.Components.ListItem.NAnswers', { value: item.answer_count })
        case 'users':
          if (this.order == '-create_time' && this.type == 'users') {
            return this.$t('Message.Components.ListItem.JoinN', { value: this.$G_UserTimeStampToDateTime(item.create_time) })
          }
          return this.$t('Message.Components.UsersDialog.FollowersN', { value: item.follower_count })
        default:
          return ''
      }
    },
    ListItemId(item) {
      switch (this.type) {
        case 'articles':
          return item.article_id
        case 'questions':
          return item.question_id
        case 'answers':
          return item.answer_id
        case 'messages':
          return item.message_id
        case 'users':
          return item.user_id
        default:
          return 0
      }
    },
    async GetData() {
      switch (this.type) {
        case 'questions':
          if (this.order == '-update_time') {
            const QUESTIONS_RECENT = Get_G_INDEX_QUESTIONS_RECENT()
            // console.log('QUESTIONS_RECENT', QUESTIONS_RECENT)
            if (QUESTIONS_RECENT !== null) {
              this.data = QUESTIONS_RECENT.data
              this.pagination = QUESTIONS_RECENT.pagination
              return
            }
          } else if (this.order == '-vote_count') {
            const QUESTIONS_POPULAR = Get_G_INDEX_QUESTIONS_POPULAR()
            // console.log('QUESTIONS_POPULAR', QUESTIONS_POPULAR)
            if (QUESTIONS_POPULAR !== null) {
              this.data = QUESTIONS_POPULAR.data
              this.pagination = QUESTIONS_POPULAR.pagination
              return
            }
          }
          break
        case 'articles':
          if (this.order == '-update_time') {
            const ARTICLES_RECENT = Get_G_INDEX_ARTICLES_RECENT()
            // console.log('ARTICLES_RECENT', ARTICLES_RECENT)
            if (ARTICLES_RECENT !== null) {
              this.data = ARTICLES_RECENT.data
              this.pagination = ARTICLES_RECENT.pagination
              return
            }
          } else if (this.order == '-vote_count') {
            const ARTICLES_POPULAR = Get_G_INDEX_ARTICLES_POPULAR()
            // console.log('ARTICLES_POPULAR', ARTICLES_POPULAR)
            if (ARTICLES_POPULAR !== null) {
              this.data = ARTICLES_POPULAR.data
              this.pagination = ARTICLES_POPULAR.pagination
              return
            }
          }
          break
        case 'users':
          if (this.order == '-create_time') {
            const USERS_RECENT = Get_G_INDEX_USERS_RECENT()
            // console.log('USERS_RECENT', USERS_RECENT)
            if (USERS_RECENT !== null) {
              this.data = USERS_RECENT.data
              this.pagination = USERS_RECENT.pagination
              return
            }
          } else if (this.order == '-follower_count') {
            const USERS_POPULAR = Get_G_INDEX_USERS_POPULAR()
            // console.log('USERS_POPULAR', USERS_POPULAR)
            if (USERS_POPULAR !== null) {
              this.data = USERS_POPULAR.data
              this.pagination = USERS_POPULAR.pagination
              return
            }
          }
          break
      }
      try {
        this.loading = true
        const response = await GetDatas(this.type, {
          type: this.type,
          order: this.order,
          page: this.pagination.next,
          following: this.following,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_get == true) {
          var keys = `${this.type}_id`
          this.data == null ? this.data = response.data.data : this.$G_FilterSameItems(keys, this.data, response.data.data)
          this.pagination = response.data.pagination
          if (response.data.pagination.total == 0 || response.data.pagination.total == null) {
            this.empty = true
          } else {
            this.empty = false
          }
          this.loading = false
        } else {
          this.loading = false
          this.empty = true
        }
      } catch (error) {
        this.loading = false
      }
    },
  },
  created() {
    this.GetData()
  },
};
</script>
<style lang="less">
@import './index.less';
</style>
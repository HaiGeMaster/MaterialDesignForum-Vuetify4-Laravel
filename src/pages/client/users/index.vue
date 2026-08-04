<template>
  <!-- <v-container id="page-users"> -->
  <v-container id="page-users" style="padding: 0;max-width: 1080px">


    <!-- <div class="items-wrapper">
            <Item v-for="i in 20" />
        </div> -->

    <v-tabs-window v-model="tab_item">
      <v-tabs-window-item value="#followees" v-if="userStore.getIsLogin">
        <!-- <div class="items-wrapper">
          <UserItem v-for="(user, index) in followees_data" :key="'followees_'+index" :user="user" />
        </div> -->
        <v-container class="pa-4" fluid>
          <v-row style="width: 100%" density="comfortable">
            <v-col v-for="(user, index) in followees_data" cols="12" sm="6" md="4" lg="3">
              <UserItemV1 :user="user" />
            </v-col>
            <v-col v-if="followees_loading" v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
              <UserSkeleton :key="i" />
            </v-col>
          </v-row>
        </v-container>
        <Loading :empty="followees_data == null" :loading="followees_loading" :pagination="followees_pagination"
          @autoload="GetUsersFollowees" :empty_title="$t('Message.Components.Empty.NoFollowedUsersAgain')"
          :empty_text="$t('Message.Components.Empty.FollowedUsersNotice')"
          :empty_btn_text="$t('Message.Components.Empty.ViewRecommendedUsers')"
          @empty_btn_click="$router.push(`${this.$G_UrlHeaderLang()}/users#recommended`)" />
      </v-tabs-window-item>
      <v-tabs-window-item value="#followers" v-if="userStore.getIsLogin">
        <!-- <div class="items-wrapper">
          <UserItem v-for="(user, index) in followers_data" :key="'followers_'+index" :user="user" />
        </div> -->
        <v-container class="pa-4" fluid>
          <v-row style="width: 100%" density="comfortable">
            <v-col v-for="(user, index) in followers_data" cols="12" sm="6" md="4" lg="3">
              <UserItemV1 :user="user" />
            </v-col>
            <v-col v-if="followers_loading" v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
              <UserSkeleton :key="i" />
            </v-col>
          </v-row>
        </v-container>
        <Loading :empty="followers_data == null" :loading="followers_loading" :pagination="followers_pagination"
          @autoload="GetUsersFollowers" :empty_title="$t('Message.Components.Empty.NoFollowersForYou')"
          :empty_text="$t('Message.Components.Empty.YourFollowersNotice')" />
      </v-tabs-window-item>
      <v-tabs-window-item value="#recommended">
        <!-- <div class="items-wrapper">
          <UserItem v-for="(user, index) in recommended_data" :key="'recommended_'+index" :user="user" />
        </div> -->
        <v-container class="pa-4" fluid>
          <v-row style="width: 100%" density="comfortable">
            <v-col v-for="(user, index) in recommended_data" cols="12" sm="6" md="4" lg="3">
              <UserItemV1 :user="user" />
            </v-col>
            <v-col v-if="recommended_loading" v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
              <UserSkeleton :key="i" />
            </v-col>
          </v-row>
        </v-container>
        <Loading :empty="recommended_data == null" :loading="recommended_loading" :pagination="recommended_pagination"
          @autoload="GetUsersRecommended" />
      </v-tabs-window-item>
    </v-tabs-window>

  </v-container>


</template>

<script>
import { useUserStore } from '@/stores/user'
// import UserItem from './components/item/index.vue'
import UserItemV1 from '@/components/user-item/index-v1.vue'
import UserSkeleton from '@/components/user-item/skeleton.vue'

import {
  GetFollows,
  GetUsers,
  Get_G_USERS_RECOMMENDED,
} from '@/api/global.js'

import Loading from '@/components/loading/index.vue'
export default {
  components: {
    UserItemV1,
    UserSkeleton,
    Loading,
  },
  computed: {
    tab_item: {
      get() {
        return this.$route.hash || '#recommended'
      },
      set(val) {
        this.$router.push({
          path: this.$route.path,
          hash: val
        })
      }
    },
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  },
  data: () => ({
    userStore: useUserStore(),
    // tab_item: 'recommended',
    followees_loading: false,
    followees_data: null,
    followees_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    followers_loading: false,
    followers_data: null,
    followers_pagination: {
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
    has_seo: false,
  }),
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'users' || val.name == 'lang-users') {
        if (this.userStore.getIsLogin && (val.hash == '#followees' || val.hash == '')) {
          this.tab_item = '#followees'
        } else if (this.userStore.getIsLogin && val.hash == '#followers') {
          this.tab_item = '#followers'
        } else if (val.hash == '#recommended' || val.hash == '') {
          this.tab_item = '#recommended'
        }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'users' || val.name == 'lang-users') {
        // this.ResetData()
        if (this.userStore.getIsLogin && (val.hash == '#followees' || val.hash == '')) {
          this.ResetData()
          this.GetUsersFollowees()
        } else if (this.userStore.getIsLogin && val.hash == '#followers') {
          this.ResetData()
          this.GetUsersFollowers()
        } else if (val.hash == '#recommended' || val.hash == '') {
          if (!this.has_seo) {
            this.ResetData()
          }
          this.GetUsersRecommended()
        }
      }
    },
    async GetUsersFollowees() {
      if (this.followees_loading) {
        return
      }
      this.followees_loading = true
      // console.log(this.followees_pagination)
      const response = await GetFollows({
        modes: 'followees',
        followable_type: 'user',
        followable_id: this.$G_GetUserID(),
        page: this.followees_pagination.next,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.followees_data == null ? this.followees_data = response.data.data : this.$G_FilterSameItems(keys, this.followees_data, response.data.data)
        this.followees_pagination = response.data.pagination
      }
      this.followees_loading = false
    },
    async GetUsersFollowers() {
      if (this.followers_loading) {
        return
      }
      this.followers_loading = true
      // console.log(this.followers_pagination)
      const response = await GetFollows({
        modes: 'followers',
        followable_type: 'user',
        followable_id: this.$G_GetUserID(),
        page: this.followers_pagination.next,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.followers_data == null ? this.followers_data = response.data.data : this.$G_FilterSameItems(keys, this.followers_data, response.data.data)
        this.followers_pagination = response.data.pagination

        // console.log(this.followers_data)
      }
      this.followers_loading = false
    },
    async GetUsersRecommended() {
      const USERS_RECOMMENDED = Get_G_USERS_RECOMMENDED()
      // console.log('USERS_RECOMMENDED', USERS_RECOMMENDED)
      if (USERS_RECOMMENDED !== null) {
        this.recommended_data = USERS_RECOMMENDED.data
        this.recommended_pagination = USERS_RECOMMENDED.pagination
        this.has_seo = true
        return
      }

      if (this.recommended_loading) {
        return
      }
      this.recommended_loading = true
      const response = await GetUsers({
        order: '+user_id',
        page: this.recommended_pagination.next,
        per_page: this.recommended_pagination.per_page,
        type: 'recommended',
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.recommended_data == null ? this.recommended_data = response.data.data : this.$G_FilterSameItems(keys, this.recommended_data, response.data.data)
        this.recommended_pagination = response.data.pagination
      }
      this.recommended_loading = false
    },
    ResetData() {
      this.followees_data = null
      this.followees_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.followers_data = null
      this.followers_pagination = {
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
  created() {
    this.UpdateTabItems(this.$route)
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route'(val) {
      this.UpdateTabItems(val)
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
        this.UpdateWebTitleAndAppbarSubTitle(this.$route)
      }
    }
  },
};
</script>

<style lang="less">
//@import './index.less';
// </style>
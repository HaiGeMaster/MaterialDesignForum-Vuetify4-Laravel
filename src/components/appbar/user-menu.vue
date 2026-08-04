<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon style="-webkit-app-region: no-drag;">
        <!-- style="margin-right: 8px;" -->

        <!-- <v-badge location="top right" color="red" dot bordered :model-value="!isSignedToday"> -->
          <v-avatar>
            <v-img :alt="user.username" :src="$G_ImgHandle(user.avatar.middle)">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-avatar>
        <!-- </v-badge> -->

      </v-btn>
    </template>
    <v-card rounded="lg" class="mx-auto" :prepend-avatar="$G_ImgHandle(user.avatar.middle)"
      :subtitle="$t('Message.Components.Avatar.Mailbox') + '' + user.email" :title="user.username">
      <v-divider></v-divider>

      <template v-slot:append>
        <!-- <v-btn rounded="lg" color="primary" variant="outlined" >
          {{ $t('Message.Components.Avatar.SignIn') }}
        </v-btn> -->
        <v-btn rounded="lg" color="primary" variant="outlined"
          :to="`${$G_UrlHeaderLang()}/users/${userStore.getUser.user_id}`">
          {{ $t('Message.Components.Avatar.PersonalData') }}
        </v-btn>
      </template>

      <!-- <v-card-text> -->

      <!-- <v-btn rounded="lg" variant="text" :to="`${$G_UrlHeaderLang()}/users/${userStore.getUser.user_id}`">
          {{ $t('Message.Components.Avatar.PersonalData') }}
        </v-btn> -->

      <!-- <v-list>
          <v-list-item :to="`${$G_UrlHeaderLang()}/signin`"
          prepend-icon="mdi-calendar-check"
          append-icon="mdi-chevron-right">

            <v-list-item-title>
              {{ $t('Message.Components.Avatar.SignIn') }}
            </v-list-item-title>
          </v-list-item>
        </v-list> -->

      <!-- </v-card-text> -->

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn rounded="lg" prepend-icon="mdi-shield-crown" color="primary" variant="flat"
          :to="`${$G_UrlHeaderLang()}/admin`"
          v-if="userStore.getUser.user_group.ability_admin_login && !$route.path.includes('/admin')">
          {{ $t('Message.Components.Avatar.ManagementPanel') }}
        </v-btn>
        <v-btn rounded="lg" prepend-icon="mdi-account" color="primary" variant="flat" :href="`${$G_UrlHeaderLang()}/`"
          v-else-if="$route.path.includes('/admin')">
          {{ $t('Message.Components.Avatar.UserPanel') }}
        </v-btn>


        <v-btn icon @click="mainStore.setRightDrawer(!mainStore.getRightDrawer)">
          <v-icon>
            mdi-cog
          </v-icon>
          <!-- mdi-account-cog -->
          <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.DevDialog.Setting') }}</v-tooltip>
        </v-btn>


        <!-- <v-btn icon :to="`${$G_UrlHeaderLang()}/signin`">
          <v-badge location="top right" color="red" dot bordered :model-value="!isSignedToday">
            <v-icon>
              mdi-calendar-check
            </v-icon>
          </v-badge>
          <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Avatar.SignIn') }}</v-tooltip>
        </v-btn> -->


        <v-spacer></v-spacer>
        <v-btn rounded="lg" variant="tonal" @click="logout">
          {{ $t('Message.Components.Avatar.Logout') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import {
  RemoveUserToken,
  // AddUserSignIn,
  // GetUserSignIn
} from '@/api/global.js'

export default {
  name: 'UserMenu',
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      signInData: {
        consecutive_days: 0,//连续签到天数
        last_sign_in_time: '',//最后签到时间
        last_sign_in_date: '',//最后签到日期
        total_count: 0,//签到次数
        total_points: 0,//总签到点数
      },
    }
  },
  computed: {
    user() {
      return this.userStore.user
    },
    // 判断今天是否已签到
    isSignedToday() {
      const today = new Date().toISOString().split('T')[0]
      return this.signInData.last_sign_in_date === today
    },
  },
  created() {
    // this.GetUserSignIn()
  },
  methods: {
    async GetUserSignIn() {
      const response = await GetUserSignIn({
        user_token: this.userStore.userToken
      })
      // console.log(response)
      if (response.data.is_get) {
        this.signInData = response.data.data
        // console.log(this.signInData)
      }
    },
    logout() {
      // RemoveUserToken()
      // this.userStore.setIsLogin(false)
      // //然后刷新当前页面
      // this.$router.go(0)
      this.BackAndOutLogin()
    },
    BackAndOutLogin() {
      this.userStore.setIsLogin(false)
      this.userStore.setUserToken('')
      this.userStore.setUser(this.userStore.getDefaultUser)
      RemoveUserToken()

      if (this.$route.name == 'admin' || this.$route.name == 'lang-admin') {
        this.dialogStore.setLoginDialog(true)
        return
      }
      if (this.$route.path !== `${this.$G_UrlHeaderLang()}/`) {
        // 路由回退到首页
        this.$router.push(`${this.$G_UrlHeaderLang()}/`)
      }
    },
  },
  watch: {
    // isSignedToday(newVal, oldVal) {
    //   if (!newVal) {
    //     this.GetUserSignIn()
    //   }
    // }
  }
}
</script>

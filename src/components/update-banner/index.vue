<template>
  <v-expand-transition>
    <v-app-bar v-if="show && (is_update && userStore.getUser.user_group.is_admin && userStore.getIsLogin)"
      elevation="0" :image="updateBannerBgHero" height="88" style="border-bottom: 1px solid #80808080;" color="black">
      <v-list lines="three" style="background-color: transparent;width: 100%;">
        <v-list-item style="color: white;"
          :title="`${$t('Message.Components.UpdateBanner.UpdateBanner')}(${$t('Message.Components.UpdateBanner.OnlyAdminSee')})`"
          :subtitle="$t('Message.Components.UpdateBanner.HelloAdminUser') + ',' +
            userStore.getUser.username + ',' +
            $t('Message.Components.UpdateBanner.WeHaveNewVersionAvailable') + ',' +
            $t('Message.Components.UpdateBanner.CurrentVersion') + ':' + current_version + ',' +
            $t('Message.Components.UpdateBanner.LatestVersion') + ':' + new_version
            ">
          <template v-slot:prepend>
            <v-avatar color="red" icon="mdi-arrow-up-bold-hexagon-outline"></v-avatar>
          </template>
          <template v-slot:append>
            <!-- append-icon="mdi-open-in-new" -->
            <v-btn variant="flat" :href="download_url" target="_blank" :icon="mainStore.getMobile ? true : false">
              {{ !mainStore.getMobile ? $t('Message.Components.UpdateBanner.DownloadLatestVersion') : '' }}
              <v-icon :end="!mainStore.getMobile">
                mdi-open-in-new
              </v-icon>
              <v-tooltip v-if="mainStore.getMobile" activator="parent" location="start">{{
                $t('Message.Components.UpdateBanner.DownloadLatestVersion') }}</v-tooltip>
            </v-btn>

            <v-btn size="small" @click="show = false" style="margin-left: 16px;" icon>
              <v-icon>mdi-close</v-icon>
              <v-tooltip activator="parent" location="start">
                {{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <!-- <v-divider></v-divider> -->
    </v-app-bar>
  </v-expand-transition>
</template>

<script>
import {
  CheckUpdate,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';
import updateBannerBgHero from '@/assets/images/update-banner-bg-hero.svg'
export default {
  name: 'UpdateBanner',
  data() {
    return {
      updateBannerBgHero,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      is_update: false,
      new_version: null,
      current_version: '',
      download_url: '',
      show: true,
    }
  },
  methods: {
    async CheckUpdate() {
      const res = await CheckUpdate({
        user_token: this.$G_GetUserToken(),
      })
      if (res.data.is_update) {
        this.is_update = res.data.is_update
        this.new_version = res.data.new_version
        this.current_version = res.data.current_version
        this.download_url = res.data.download_url

        // console.log(show && (this.is_update && this.userStore.getUser.user_group.is_admin && this.userStore.getIsLogin))
      } else if (!res.data.is_update) {
        this.is_update = res.data.is_update
        this.new_version = res.data.new_version
        this.current_version = res.data.current_version
        this.download_url = res.data.download_url
      }
    },
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  },
  watch: {
    ReturnUserIsLogin(newVal, oldVal) {
      if (newVal == true && this.userStore.getUser.user_group.is_admin) {
        this.CheckUpdate()
      }
    }
  },
}
</script>
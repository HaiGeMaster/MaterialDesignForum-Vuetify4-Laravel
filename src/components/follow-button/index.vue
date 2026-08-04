<template>
  <v-btn  :variant="btn_variant" color="medium-emphasis" @click.stop.prevent="OnFollowClickCallback()" :loading="is_loading" icon class="mc-follow">
    <v-icon :color="IsFollow ? 'primary' : ''">{{ IsFollow ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
    
    <v-tooltip activator="parent" location="bottom">
      {{
      IsFollow ? $t('Message.Components.Follow.Unfollow') : $t('Message.Components.Follow.Follow')
      }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import {
  Follow,
} from '@/api/global.js';
import { useUserStore } from '@/stores/user'

import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'follow-button',
  props: {
    btn_variant: {
      type: String,
      default: 'tonal'
    },
    followable_type: String,
    followable_id: Number,
    is_follow: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    IsFollow: false,
    is_loading: false,
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
  }),
  created() {
    this.IsFollow = this.is_follow
  },
  methods: {
    async OnFollowClickCallback() {
      if (!this.userStore.getIsLogin) {
        // this.$store.dispatch('Dialog/Set_LoginDialog', true)
        // this.$store.dispatch('Snackbar/Show_Snackbar', {
        //   text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        // })
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'), color: 'error' })
        return
      }
      this.is_loading = true
      const response = await Follow({
        followable_type: this.followable_type,
        followable_id: this.followable_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_follow == true) {
        this.IsFollow = true
      } else {
        this.IsFollow = false
      }
      this.is_loading = false
      this.$forceUpdate()
    }
  }
}
</script>

<!-- <style scoped>
@import './index.less';
</style> -->
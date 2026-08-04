<template>
  <div class="item-inner">
    <!-- variant="outlined" color="surface-variant" elevation="0" -->
    <v-card rounded="lg"  class="item" hover
      :to="`${$G_UrlHeaderLang()}/users/${user.user_id}`">
      <div class="mdui-ripple info">
        <!-- <v-badge location="top right" :color="user.user_group.user_group_color || ''"
          :icon="user.user_group.user_group_icon || 'mdi-bell'"
          :model-value="user.user_group.user_group_icon_show || false" @click.prevent.stop=""> -->
        
          <!-- <div class="avatar" :style="{ backgroundImage: `url(${$G_ImgHandle(user.avatar.large)})` }" /> -->
        <!-- </v-badge> -->


        
        <div class="avatar" v-if="user!=null">
          <v-badge bordered :color="user.user_group.user_group_color" :icon="user.user_group.user_group_icon"
            :model-value="user.user_group.user_group_icon_show" overlap avatar  offset-x="8" offset-y="8">
            <v-avatar :size="mainStore.getMobile ? '80' : '96'
              ">
              <v-img :src="$G_ImgHandle(user.avatar.large)"></v-img>
            </v-avatar>
          </v-badge>
        </div>

        <div class="username mdui-text-color-theme-text">{{ user.username || 'username' }}</div>
        <div class="headline mdui-text-color-theme-secondary">
          {{ user.headline }}
        </div>
      </div>
      <div class="actions">
        <FollowButton v-if="$G_GetUserID() != user.user_id" followable_type="user" :followable_id="user.user_id" :is_follow="user.is_follow" />
        <div class="flex-grow" />
        <OptionsButton type="user" :item="user" />
      </div>
    </v-card>
  </div>
</template>
<script>
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import { useMainStore } from '@/stores/main'

export default {
  props: {
    user: {
      required: false,
      type: Object,
      default: {
        username: 'username',
        headline: 'headline',
        avatar: {
          large: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        // relationships: {
        //     is_me: false,
        // },
      }
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  components: {
    FollowButton,
    OptionsButton,
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
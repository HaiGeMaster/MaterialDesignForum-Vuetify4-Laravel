<template>
  <!-- 原来的卡片 -->
  <!-- style="width: 100%"  -->
  <v-card rounded="lg" hover class="mx-auto user-item" :to="`${$G_UrlHeaderLang()}/users/${user.user_id}`">
    <!-- 头像区域 -->
    <!-- height: 200px; -->
    <div style="
                  height: 170px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                ">
      <v-badge bordered location="top right" :model-value="user.user_group.user_group_icon_show"
        :color="user.user_group.user_group_color" :icon="user.user_group.user_group_icon" offset-x="8" offset-y="8">
        <!-- size="90"> -->
        <v-avatar color="surface-variant" size="80">
          <v-img :alt="user.username" :src="$G_ImgHandle(user.avatar.large)">

            <!-- <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
            </template> -->

          </v-img>
        </v-avatar>

        <v-tooltip :disabled="!user.user_group.user_group_icon_show" activator="parent" location="top">{{
          $t(user.user_group.user_group_name) }}</v-tooltip>

      </v-badge>
      <!-- class="mt-2" -->
      <v-card-title>{{ user.username }}</v-card-title>
      <v-card-subtitle>{{ user.headline || '&nbsp;' }}</v-card-subtitle>
    </div>

    <v-card-actions>
      <!-- <v-btn variant="tonal" icon="mdi-star-outline"></v-btn> -->
      <FollowButton v-if="$G_GetUserID() != user.user_id" followable_type="user" :followable_id="user.user_id"
        :is_follow="user.is_follow" />
      <v-spacer></v-spacer>
      <!-- <v-btn variant="plain" icon="mdi-dots-vertical"></v-btn> -->
      <OptionsButton type="user" :item="user" />
    </v-card-actions>
  </v-card>
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
<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">

    <template v-slot:activator="{ props }">

      <v-badge v-if="slotname == 'avatar'" bordered  location="top right" :color="user.user_group.user_group_color || ''"
        :icon="user.user_group.user_group_icon || 'mdi-bell'"
        :model-value="user.user_group.user_group_icon_show || false" v-bind="props" @click.prevent.stop="">
        <v-avatar>
          <v-img :src="$G_ImgHandle(user.avatar.middle)" :alt="user.username">

            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
            </template>

          </v-img>
        </v-avatar>
      </v-badge>

      <v-chip v-else-if="slotname == 'chip'" :variant="chip_variant" :size="chip_size" v-bind="props">
        <v-avatar start > 
          <v-img :src="$G_ImgHandle(user.avatar.small)">

            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
            </template>

          </v-img>
        </v-avatar>
        {{ user.username }}
      </v-chip>

    </template>

    <!-- color="surface-variant" variant="outlined" elevation="0"  -->
    <v-card rounded="lg" min-width="300">

      <v-img class="align-end text-white" height="160" :src="$G_ImgHandle(user.cover.middle)" :alt="user.username"
        cover>

        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </template>

      </v-img>
      <!-- <v-divider></v-divider> -->

      <v-list rounded="lg" lines="two">
        <!-- :prepend-avatar="$G_ImgHandle(user.avatar.middle)" -->
        <v-list-item :subtitle="user.headline" :title="user.username"
          :to="`${$G_UrlHeaderLang()}/users/${user.user_id}`">
          <template v-slot:prepend>
            <v-badge bordered location="top right" :color="user.user_group.user_group_color || ''"
              :icon="user.user_group.user_group_icon || 'mdi-bell'"
              :model-value="user.user_group.user_group_icon_show || false" @click.prevent.stop="">
              <v-avatar>
                <v-img :src="$G_ImgHandle(user.avatar.middle)" :alt="user.username">

                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>

                </v-img>
              </v-avatar>
            </v-badge>
          </template>
        </v-list-item>
      </v-list>

      <!-- <div style="margin: 0px 16px 0px 16px;padding: 8px;">
        <v-btn rounded="lg" -toggle variant="outlined" divided multiple style="height: 60px;margin: auto;">
          <v-btn rounded="lg" >
            文章 0
          </v-btn>

          <v-btn rounded="lg" >
            回答 0
          </v-btn>

          <v-btn rounded="lg" >
            关注者 0
          </v-btn>
        </v-btn-toggle>
      </div> -->

      <div class="stats" style="">
        <v-btn rounded="lg" variant="text" large style="flex-direction: column;height: 64px;"
          :to="`${$G_UrlHeaderLang()}/users/${user.user_id}#answers`">
          <label :class="[
            'grey--text',
            {
              'text--darken-1': !$vuetify.theme.dark,
              'text--lighten-1': $vuetify.theme.dark,
            }
          ]">
            {{
              $t('Message.Components.UserPopover.Answer')
            }}
          </label>
          <span>
            {{
              user.answer_count
            }}
          </span>
        </v-btn>
        <v-btn rounded="lg" variant="text" large style="flex-direction: column;height: 64px;"
          :to="`${$G_UrlHeaderLang()}/users/${user.user_id}#articles`">
          <label :class="[
            'grey--text',
            {
              'text--darken-1': !$vuetify.theme.dark,
              'text--lighten-1': $vuetify.theme.dark,
            }
          ]">{{
            $t('Message.Components.UserPopover.Article')
          }}</label>
          <span>
            {{
              user.article_count
            }}
          </span>
        </v-btn>
        <v-btn rounded="lg" variant="text" large style="flex-direction: column;height: 64px;" @click="dialogStore.setUsersDialog({
          id: user.user_id,
          type: 'user',
          modes: 'followers',
          model: true,
        })">
          <label :class="[
            'grey--text',
            {
              'text--darken-1': !$vuetify.theme.dark,
              'text--lighten-1': $vuetify.theme.dark,
            }
          ]">{{
            $t('Message.Components.UserPopover.Followers')
          }}</label>
          <span>
            {{
              user.follower_count
            }}
          </span>
        </v-btn>
      </div>

      <!-- <v-divider></v-divider> -->

      <v-card-actions>
        <FollowButton v-if="userStore.getUser.user_id != user.user_id" followable_type="user"
          :followable_id="user.user_id" :is_follow="user.is_follow" />
        <v-spacer></v-spacer>
        <OptionsButton type="user" :item="user" />
        <!-- item="item" type="user" -->
      </v-card-actions>

    </v-card>
  </v-menu>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog';
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'

export default {
  name: 'UserPopover',
  components: {
    FollowButton,
    OptionsButton
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        user_id: 0,
        username: '',
        headline: '',
        avatar: {
          middle: '',
        },
        answer_count: 0,
        article_count: 0,
        follower_count: 0,
      }),
    },
    slotname: {
      type: String,
      default: 'avatar',//chip
    },
    chip_size: {
      type: String,
      default: 'default',//small
    },
    chip_variant: {
      type: String,
      default: 'text',//outlined
    }
  },
  data() {
    return {
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      menu: false
    }
  }
}
</script>
<style>
.stats {
  display: flex;
  justify-content: space-around;
  /* 左右居中 */
  /* margin: auto; */
}

/* @import './index.less'; */
</style>

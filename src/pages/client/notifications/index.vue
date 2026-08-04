<template>
  <v-container id="page-notifications" style="padding: 0;max-width: 846px">
    <v-container fluid :style="{
      padding: mainStore.getMobile ? '0' : '1rem',
    }">

      <v-card :rounded="$G_Rounded()" class="mx-auto" v-if="userStore.getIsLogin">
        <v-toolbar>
          <!-- <template v-slot:prepend>
          <v-btn  icon @click="$router.back()">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.BackButton.Back') }}</v-tooltip>
          </v-btn>
        </template> -->
          <template v-slot:prepend>
            <v-btn @click="$router.back()" icon>

              <v-icon>
                mdi-arrow-left
              </v-icon>
              <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Back') }}</v-tooltip>
            </v-btn>
          </template>

          <v-toolbar-title :text="$t('Message.Client.Notification.WebSubTitle')"></v-toolbar-title>

          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props: menu }">
                <v-btn icon v-bind="menu">
                  <v-icon>mdi-dots-vertical</v-icon>
                  <v-tooltip activator="parent" location="left">{{ $t('Message.Client.Notification.More') }}</v-tooltip>
                </v-btn>
              </template>
              <v-list rounded="lg">
                <!-- prepend-icon="mdi-bell-remove" -->
                <v-list-item :disabled="notification_pagination.total == 0" @click="DeleteAllNotifications">
                  <v-list-item-title>{{ $t('Message.Client.Notification.ClearAllNotifications') }}</v-list-item-title>
                </v-list-item>

                <!-- prepend-icon="mdi-cog" -->
                <v-list-item :to="`${$G_UrlHeaderLang()}/notifications/setting`">
                  <v-list-item-title>{{ $t('Message.Client.Notification.NotificationSetting') }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-toolbar>

        <v-card-text>
          <!-- <div v-for="item in notification_data" :key="item.notification_id" class="mb-4"> -->
          <v-list lines="two">
            <!-- <NotificationItem v-for="item in notification_data" :item="item" /> -->

            <template v-for="(item, index) in notification_data" :key="item.notification_id">
              <v-divider inset v-if="index > 0" />
              <NotificationItem :item="item" />
            </template>
            <ListItemSkeleton v-if="notification_is_loading" v-for="i in 20" :key="i" />
          </v-list>
          <!-- </div> -->
          <Loading :empty="notification_data == null" :loading="notification_is_loading"
            :pagination="notification_pagination" @autoload="GetUserInteractionNotifications"
            :empty_title="$t('Message.Components.Empty.NoNotifications')"
            :empty_text="$t('Message.Components.Empty.AllNotificationsPlaceholder')" />

        </v-card-text>
      </v-card>


      <Empty v-else :title="$t('Message.Components.Empty.LoginToViewNotifications')"
        :text="$t('Message.Components.Empty.LoggedInNotificationsNotice')"
        :btn_text="$t('Message.Components.Empty.Login')" @btn_click="dialogStore.setLoginDialog(true)" />
    </v-container>

    <!-- <NeedLoginAccess v-else /> -->
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {
  GetUserInteractionNotifications,
  DeleteNotification,
  DeleteAllNotifications
} from '@/api/global'
import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item/skeleton.vue'
import Loading from '@/components/loading/index.vue'
import NotificationItem from '@/components/notification-item/index.vue'
// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
// import NeedLoginAccess from '@/components/need-login-access/index.vue'
import Empty from '@/components/empty/index.vue'

import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
export default {
  name: 'notifications-page',
  components: {
    ListItem,
    ListItemSkeleton,
    Loading,
    NotificationItem,
    // ListItemSkeleton,
    // NeedLoginAccess,
    Empty,
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    dialogStore: useDialogStore(),
    tab_item: 'system',
    notification_is_loading: false,
    notification_data: null,
    notification_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  computed: {
  },
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'notifications' || val.name == 'lang-notifications') {
        if (val.hash == '#system' || val.hash == '') {
          this.ResetData()
          this.GetUserInteractionNotifications()
          this.tab_item = 'system'
        } else if (val.hash == '#user_group') {
          this.tab_item = 'user_group'
        } else if (val.hash == '#private_message') {
          this.tab_item = 'private_message'
        }
      }
    },
    async GetUserInteractionNotifications() {
      this.notification_is_loading = true
      const response = await GetUserInteractionNotifications({
        user_token: this.$G_GetUserToken(),
        order: '-create_time',
        page: this.notification_pagination.next,
        per_page: this.notification_pagination.per_page,
      })
      // console.log('response', response.data)
      if (response.data.is_get) {
        this.notification_data == null ? this.notification_data = response.data.data : this.$G_FilterSameItems('notification_id', this.notification_data, response.data.data)
        // this.notification_data = response.data.data
        this.notification_pagination = response.data.pagination
        this.notification_is_loading = false
        // this.$forceUpdate()
      } else {
        this.notification_is_loading = false
      }
    },
    // async DeleteNotification(item) {
    //   const response = await DeleteNotification({
    //     user_token: this.$G_GetUserToken(),
    //     notification_id: item.notification_id,
    //   })
    //   // console.log('response', response.data)
    //   if (response.data.is_delete) {
    //     this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteSuccess'))
    //     this.$G_FilterSameItems('notification_id', this.notification_data, response.data.notification)
    //     this.$forceUpdate()
    //   } else {
    //     this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteFailed'))
    //   }
    // },
    async DeleteAllNotifications() {
      const response = await DeleteAllNotifications({
        user_token: this.$G_GetUserToken(),
      })
      // console.log('response', response.data)
      if (response.data.is_delete) {
        // this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteAllSuccess'))
        this.notification_data = null
        // this.$forceUpdate()
        this.ResetData()
        this.GetUserInteractionNotifications()
      } else {
        // this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteAllFailed'))
      }
    },
    ResetData() {
      this.notification_data = null
      this.notification_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      // this.$forceUpdate()
    }
  },
  created() {
    this.UpdateTabItems(this.$route)
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  },
  watch: {
    '$route'(val) {
      this.UpdateTabItems(this.$route)
    },
    '$i18n.locale'(val) {
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
      }
    }
  },
};
</script>

<style lang="less">
// @import "../questions/index.less";

#page-notifications {
  // padding: 0 8px 0 8px;
  //max-width: 800px;

}
</style>

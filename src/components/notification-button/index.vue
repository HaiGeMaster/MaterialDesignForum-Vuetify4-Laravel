
<template>
  <!-- :to="`${$G_UrlHeaderLang()}/notifications`"  -->
  <v-btn icon style="-webkit-app-region: no-drag;"
  class="notification-button" @click="handleClick">
    <v-badge bordered color="red" :content="formattedUnreadCount" :model-value="userStore.getUser.notification_unread != 0"
      offset-x="-8" offset-y="-8">
      <v-icon>mdi-bell</v-icon>
    </v-badge>
    <v-tooltip activator="parent" location="bottom">
      {{ `
      ${$t('Message.Components.NoticeButton.Notice')}(${userStore.getUser.notification_unread > 99 ? '99+' : userStore.getUser.notification_unread})
      ` }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data: () => ({
    userStore: useUserStore(),
    lastUnreadCount: 0,
    notificationPermission: Notification.permission
  }),

  computed: {
    formattedUnreadCount() {
      const count = this.userStore.getUser.notification_unread
      return count < 100 ? count : '99+'
    }
  },

  watch: {
    'userStore.getUser.notification_unread': {
      handler(newVal, oldVal) {
        // 仅当未读数量增加且大于0时发送通知
        if (newVal > oldVal && newVal > 0) {
          this.sendBrowserNotification(newVal)
        }
        this.lastUnreadCount = newVal
      },
      immediate: true
    }
  },

  mounted() {
    // 检查通知权限
    // this.checkNotificationPermission()
  },

  methods: {
    checkNotificationPermission() {
      if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notification')
        return
      }

      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          this.notificationPermission = permission
        })
      } else {
        this.notificationPermission = Notification.permission
      }
    },

    sendBrowserNotification(count) {
      if (this.notificationPermission !== 'granted') {
        this.requestNotificationPermission()
        return
      }

      try {
        const notification = new Notification(this.$t('Message.Client.Notifications.YouHaveNewNotifications'), {
          body: this.$t('Message.Components.ListItem.NMessage', { value: count }),
          icon: this.$G_CrossDomain() + "/public/themes/MaterialDesignForum-Vuetify4/favicon.png" //'/path/to/notification-icon.png' // 替换为实际图标路径
        })

        notification.onclick = () => {
          window.focus()
          this.$router.push(`${this.$G_UrlHeaderLang()}/notifications`)
        }
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    },

    requestNotificationPermission() {
      if (!('Notification' in window)) return

      Notification.requestPermission().then(permission => {
        this.notificationPermission = permission
        if (permission === 'granted') {
          this.sendBrowserNotification(this.userStore.getUser.notification_unread)
        }
      })
    },

    handleClick() {
      this.$router.push(`${this.$G_UrlHeaderLang()}/notifications`)
      // 点击时重置未读计数（根据实际业务逻辑可能需要调用API）
      // this.userStore.resetNotificationCount();
    }
  }
}
</script>

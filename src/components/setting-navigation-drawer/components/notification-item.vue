<template>
    <!-- prepend-icon="mdi-bell-cog" -->
    <v-list-item prepend-icon="mdi-bell-cog" :title="$t('Message.Components.SettingNaviagtionDrawer.NotificationsSetting')"
        :to="`${$G_UrlHeaderLang()}/notifications/setting`" append-icon="mdi-chevron-right">
    </v-list-item>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
    name: 'SettingNotificationItem',
    data() {
        return {
            userStore: useUserStore(),
        }
    }
}
</script>
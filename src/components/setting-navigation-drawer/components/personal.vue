<template>

    <v-list rounded="lg" >
      <v-list-subheader>{{ $t('Message.Components.SettingNaviagtionDrawer.Personal') }}</v-list-subheader>
      <!-- $t('Message.Client.User.User.EditProfile') -->
      <v-list-item prepend-icon="mdi-pencil" :disabled="!userStore.getUser.user_group.ability_edit_own_info"
        :title="$t('Message.Client.User.User.EditProfile')" @click="Set_EditInfoDialog"
        append-icon="mdi-dots-vertical"></v-list-item>
      <v-list-item prepend-icon="mdi-bell-cog"
        :title="$t('Message.Components.SettingNaviagtionDrawer.NotificationsSetting')"
        :to="`${$G_UrlHeaderLang()}/notifications/setting`" append-icon="mdi-chevron-right"></v-list-item>
      <!-- <NotificationItem></NotificationItem> -->
    </v-list>

</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'

export default {
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    Set_EditInfoDialog() {
      // if (!this.userStore.getUser.user_group.ability_edit_own_info) {
      //    return
      // }
      //  // console.log(this._user)
      this.dialogStore.setEditInfoDialog({
        model: true,
        user: this.userStore.getUser
      })
    }
  },
}
</script>
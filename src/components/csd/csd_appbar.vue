<template>
  <v-app-bar  :scroll-behavior="ScrollBehavior" class="app-bar">

    <!-- <v-app-bar-title @click="$router.push(`${$G_UrlHeaderLang()}/`)" style="cursor: pointer;">

      {{ mainStore.getInfoData.site_name }}
    </v-app-bar-title> -->
    <v-container class="mx-auto d-flex align-center justify-center">
      <!-- <v-avatar class="me-4 " color="grey-darken-1" size="32"></v-avatar> -->


      <UserMenu v-if="userStore.getIsLogin"></UserMenu>

      <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="160">
        <v-text-field color="primary"   density="compact" label="Search" rounded="lg" variant="solo-filled" flat hide-details
          single-line></v-text-field>

      </v-responsive>


      <v-btn rounded="lg" variant="flat" color="primary" class="login-btn" prepend-icon="mdi-login"
        style="-webkit-app-region: no-drag;" v-show="!mainStore.getMobile && !userStore.getIsLogin"
        @click="dialogStore.setLoginDialog(true)">
        {{
          $t('Message.Components.Account.Login')
        }}
      </v-btn>

      <v-btn rounded="lg" variant="tonal" color="primary" class="register-btn" prepend-icon="mdi-account-plus"
        style="-webkit-app-region: no-drag;" v-show="!mainStore.getMobile && !userStore.getIsLogin"
        @click="dialogStore.setRegisterDialog(true)">
        {{
          $t('Message.Components.Account.Register')
        }}
      </v-btn>

      
      <GuestMenu v-if="!userStore.getIsLogin"></GuestMenu>
    </v-container>
  </v-app-bar>
</template>


<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'
import UserMenu from '@/components/appbar/user-menu.vue'
import GuestMenu from '@/components/appbar/guest-menu.vue'
export default {
  components: {
    UserMenu,
    GuestMenu,
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    dialogStore: useDialogStore(),
    fabDialogStore: useFabDialogStore(),
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>
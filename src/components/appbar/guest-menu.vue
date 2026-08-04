<template>
  <!-- 桌面端：直接显示两个按钮 -->
  <template v-if="!mainStore.getMobile">
    <v-btn rounded="lg" variant="flat" color="primary" class="login-btn" prepend-icon="mdi-login"
      style="-webkit-app-region: no-drag;"
      @click="$router.push(`${$G_UrlHeaderLang()}/login`)">
      <!-- @click="dialogStore.setLoginDialog(true)"> -->
      {{ $t('Message.Components.Account.Login') }}
    </v-btn>

    <v-btn rounded="lg" variant="tonal" color="primary" class="register-btn" prepend-icon="mdi-account-plus"
      style="-webkit-app-region: no-drag;"
      @click="dialogStore.setRegisterDialog(true)">
      {{ $t('Message.Components.Account.Register') }}
    </v-btn>
  </template>

  <!-- 移动端：折叠到菜单中 -->
  <v-menu v-else>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" style="-webkit-app-region: no-drag;" icon="mdi-dots-vertical">
      </v-btn>
    </template>
    <v-list rounded="lg">
      <v-list-item prepend-icon="mdi-login" @click="dialogStore.setLoginDialog(true)">
        <v-list-item-title>{{ $t('Message.Components.Account.Login') }}</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-plus" @click="dialogStore.setRegisterDialog(true)">
        <v-list-item-title>{{ $t('Message.Components.Account.Register') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'

export default {
  name: 'GuestMenu',
  data() {
    return {
      mainStore: useMainStore(),
      dialogStore: useDialogStore(),
    }
  }
}
</script>

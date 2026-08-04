<template>
  <!-- color="primary" elevation="0" backdrop-filter: blur(10px);-->
  <v-app-bar v-show="mainStore.getMobile && fabDialogStore.getEditorFabDialog.model != 'close' ? false : true"
    :scroll-behavior="ScrollBehavior" class="app-bar"
    style="-webkit-app-region: drag;border-bottom: 1px solid #80808080;"
    >
    <!-- :extended="showTabs" -->
    <!-- scroll-behavior="hide" -->
    <template v-if="showTabs" v-slot:extension>
      <ExtTabs></ExtTabs>
    </template>
    <v-progress-linear color="primary" :active="router_loading" indeterminate absolute bottom></v-progress-linear>

    <v-app-bar-title @click="$router.push(`${$G_UrlHeaderLang()}/`)" style="cursor: pointer;">

      {{ mainStore.getInfoData.site_name }}
    </v-app-bar-title>
    <!-- <v-toolbar-title>Your Dashboard</v-toolbar-title> -->


    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer" style="-webkit-app-region: no-drag;">
        <v-icon>
          mdi-menu
        </v-icon>
        <v-tooltip activator="parent" location="end">{{ mainStore.getDrawer ?
          $t('Message.Components.Appbar.CollapseTheSideNavigationDrawer') :
          $t('Message.Components.Appbar.ShowSideNavigationDrawer')
        }}</v-tooltip>
      </v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <!-- <ThemeButton></ThemeButton> -->

      <v-text-field color="primary"   density="compact" hide-details="auto" v-if="mainStore.getDesktop"
        style="-webkit-app-region: no-drag;min-width: 320px;margin-right: 14px;"
        :label="$t('Message.Components.Search.SearchTooltop')" variant="outlined" single-line v-model="searchValue"
        append-inner-icon="mdi-magnify" rounded="pill">
      </v-text-field>

      <v-divider v-if="mainStore.getDesktop" inset class="mx-3" vertical
        style="margin:16px 4px 0 4px;height: 30px;"></v-divider>

      <v-btn style="-webkit-app-region: no-drag;" v-if="!$route.path.includes('/admin') && !mainStore.getDesktop" icon
        @click="fabDialogStore.setNewSearchFabDialog({ model: !fabDialogStore.getNewSearchFabDialog.model })">
        <v-icon>
          mdi-magnify
        </v-icon>
        <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Search.SearchTooltop') }}</v-tooltip>
      </v-btn>

      <ThemeButton v-if="!mainStore.getMobile && localDataStore.getAppbarShowThemeButton"></ThemeButton>

      <LanguageButton v-if="!mainStore.getMobile && localDataStore.getAppbarShowLanguageButton" slotname="icon"></LanguageButton>

       <!-- && !$route.path.includes('/admin') -->
      <NotificationButton 
        v-if="userStore.getIsLogin"></NotificationButton>

      <v-divider v-if="userStore.getIsLogin&&mainStore.getDesktop&&(localDataStore.getAppbarShowThemeButton||localDataStore.getAppbarShowLanguageButton)" inset class="mx-3" vertical
        style="margin:16px 16px 0 4px;height: 30px;"></v-divider>

      <UserMenu v-if="userStore.getIsLogin"></UserMenu>
      <GuestMenu v-else></GuestMenu>


      <v-btn v-show="isTauri" style="-webkit-app-region: no-drag;" variant="text" @click="top_window = !top_window"
        icon>
        <v-icon>
          {{ !top_window ? 'mdi-pin-outline' : 'mdi-pin' }}
        </v-icon>
        <v-tooltip activator="parent" location="bottom">{{ !top_window ? $t('Message.Components.SystemBar.TopWindow') :
          $t('Message.Components.SystemBar.CancelTopWindow')
        }}</v-tooltip>
      </v-btn>
      <v-btn v-show="isTauri" style="-webkit-app-region: no-drag;" variant="text" @click="_OnWindowOpen('window-min')"
        icon>
        <v-icon>
          mdi-minus
        </v-icon>
        <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.Minimize')
        }}</v-tooltip>
      </v-btn>
      <v-btn v-show="isTauri" style="-webkit-app-region: no-drag;" variant="text" @click="_OnWindowOpen('window-max')"
        icon>
        <v-icon>
          mdi-square-rounded-outline
        </v-icon>
        <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.Maximize')
        }}</v-tooltip>
      </v-btn>
      <v-btn v-show="isTauri" style="-webkit-app-region: no-drag;" variant="text" @click="_OnWindowOpen('window-close')"
        icon>
        <v-icon>
          mdi-window-close
        </v-icon>
        <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.Close')
        }}</v-tooltip>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'
import { useLocalDataStore } from '@/stores/local-data'
import ThemeButton from '@/components/theme-button/index.vue'
// import { RemoveUserToken } from '@/api/global.js'
import ExtTabs from '@/components/appbar/ext-tabs.vue'
import LanguageButton from '@/components/language-button/index.vue'
import NotificationButton from '@/components/notification-button/index.vue'
import UserMenu from './user-menu.vue'
import GuestMenu from './guest-menu.vue'

import {
  OnWindowOpen,
  IsTauri,
} from '@/api/global.js';
export default {
  name: 'AppBar',
  components: {
    ThemeButton,
    ExtTabs,
    LanguageButton,
    NotificationButton,
    UserMenu,
    GuestMenu,
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      fabDialogStore: useFabDialogStore(),
      localDataStore: useLocalDataStore(),
      isTauri: IsTauri(),
      top_window: false,
      router_loading: false,
      unregisterGuard: null // 用于保存卸载守卫的函数
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.fabDialogStore.getNewSearchFabDialog.value
      },
      set(val) {
        this.fabDialogStore.setNewSearchFabDialog({ model: true, value: val })
      }
    },
    user() {
      return this.userStore.user
    },
    ScrollBehavior() {
      // return this.showTabs ? 'hide' : 'elevate'
      var val = ''
      if (this.mainStore.getMobile) {
        val = 'hide elevate'
      } else {
        val = 'elevate'
      }
      return val
    },
    showTabs() {
      const currentTab = this.$route.name
      switch (currentTab) {
        case 'topics':
        case 'lang-topics':
          return this.userStore.getIsLogin
        case 'questions':
        case 'lang-questions':
        case 'articles':
        case 'lang-articles':
          return true
        case 'users':
        case 'lang-users':
          return this.userStore.getIsLogin
        default:
          return false
      }
    },
  },
  methods: {
    _OnWindowOpen(type) {
      OnWindowOpen(type);
    },
    toggleDrawer() {
      this.mainStore.toggleDrawer()
    }
  },
  watch: {
    top_window(val) {
      this._OnWindowOpen(val ? 'window-top' : 'window-top-cancel');
    },
  },
  // created() {
  //   this.$router.beforeEach((to, from, next) => {
  //     // this.router_loading = true
  //     if (!this.router_loading) {
  //       this.router_loading = true
  //     }
  //       // next(true)
  //     return true
  //   });
  //   this.$router.afterEach((to, from) => {
  //     this.router_loading = false
  //     // if (!this.router_loading) {
  //     //   this.router_loading = false
  //     //   next()
  //     // }
  //   });
  // },
  created() {
    // 注册全局前置守卫，并保存卸载函数
    this.unregisterGuard = this.$router.beforeEach((to, from) => {
      if (!this.router_loading) {
        this.router_loading = true
      }
      return true
    });

    this.$router.afterEach((to, from) => {
      this.router_loading = false
    });
  },
  beforeUnmount() {
    // 组件销毁前，移除全局守卫
    if (this.unregisterGuard) {
      this.unregisterGuard()
    }
  }
}
</script>

<style lang="less">
/** .notification-button {
  margin-right: 10px;
}*/

.register-btn {
  // margin-right: 10px;
  margin: 0 4px 0 4px;
}

.login-btn {
  // margin-left: 10px;
  margin: 0 4px 0 4px;
}

// .app-bar {
//   background-color: rgba(255, 255, 255, 0.8);
//   backdrop-filter: blur(16px);
// }

// .register-btn {
//   margin-right: 10px;
// }
// </style>
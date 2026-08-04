<template>
  <v-navigation-drawer location="right" temporary v-model="drawer" :width="400">
    <template v-slot:prepend>
      <v-toolbar :title="$t('Message.Components.DevDialog.Setting')">
        <template v-slot:append>
          <div class="d-flex ga-1">
            <!-- <v-btn  icon="mdi-magnify"></v-btn>
                        <v-btn  icon="mdi-dots-vertical"></v-btn> -->
            <v-btn icon="mdi-close" @click="drawer = false"></v-btn>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </div>
        </template>
      </v-toolbar>
    </template>


    <!-- <v-card variant="flat" rounded="lg">
      <v-card-text> -->

    <v-divider v-show="userStore.getIsLogin && !admin"></v-divider>
    <Personal v-if="userStore.getIsLogin && !admin"></Personal>

    <v-divider v-show="userStore.getIsLogin && !admin"></v-divider>
    <OauthList v-if="userStore.getIsLogin && !admin"></OauthList>

    
    <v-divider></v-divider>
    <v-list rounded="lg">

      <v-list-subheader>{{ $t('Message.Components.SettingNaviagtionDrawer.Client') }}</v-list-subheader>
      <ThemeItem></ThemeItem>
      <LanguageItem slotname="list"></LanguageItem>


      <!-- <v-list-item prepend-icon="mdi-account-group-outline" title="Users" ></v-list-item> -->

      <!-- <v-list-item prepend-icon="mdi-developer-board"></v-list-item> -->


      <!-- <v-list-subheader>实验性工具</v-list-subheader>

          <v-list-item prepend-icon="mdi-developer-board" append-icon="mdi-chevron-right"
            :to="`${$G_UrlHeaderLang()}/asphalt/carview`">
            狂野飙车9车辆视图
          </v-list-item>
          <v-list-item prepend-icon="mdi-developer-board" append-icon="mdi-chevron-right"
            :to="`${$G_UrlHeaderLang()}/asphalt/mapview`">
            狂野飙车9地图视图
          </v-list-item> -->


    </v-list>

    <v-divider></v-divider>
    <DevList></DevList>



  </v-navigation-drawer>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
// import { useDialogStore } from '@/stores/dialog'

import ThemeItem from './components/theme-item.vue'
// import LanguageItem from './components/language-item.vue'
import LanguageItem from '@/components/language-button/index.vue'
import Personal from './components/personal.vue'

import OauthList from './components/oauth-list.vue'
import DevList from './components/dev-list.vue'
// import NotificationItem from './components/notification-item.vue'
export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    ThemeItem,
    LanguageItem,
    Personal,
    OauthList,
    DevList,
    // NotificationItem,
  },
  data() {
    return {
      // drawer: true,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      // dialogStore: useDialogStore(),
      // delete_loading_id: null,

    }
  },
  computed: {
    csd_model: {
      get() {
        return this.mainStore.getPageLayout === 'csd'
      },
      set(val) {
        this.mainStore.pageLayout = val ? 'csd' : 'default'
      }
    },
    drawer: {
      get() {
        return this.mainStore.getRightDrawer
      },
      set(val) {
        this.mainStore.setRightDrawer(val)
      }
    },
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  }
}
</script>
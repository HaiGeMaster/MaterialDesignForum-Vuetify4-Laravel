<template>

  <v-list rounded="lg" lines="two">
    <v-list-subheader>{{ $t('Message.Components.SettingNaviagtionDrawer.ExperimentalFunction') }}</v-list-subheader>
    <!-- <v-list-item title="CSD布局" subtitle="切换主体布局样式" disabled>
      <template v-slot:prepend>
        <v-avatar>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-switch color="primary" v-model="csd_model" inset hide-details></v-switch>
      </template>
    </v-list-item> -->

    <v-list-item :title="$t('Message.Components.SettingNaviagtionDrawer.ThemeModeButton')" :subtitle="$t('Message.Components.SettingNaviagtionDrawer.DisplayInApplicationBarWhenScreenSizeIsAppropriate')">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-switch color="primary" v-model="appbarShowThemeButton" inset hide-details></v-switch>
      </template>
    </v-list-item>

    <v-list-item :title="$t('Message.Components.SettingNaviagtionDrawer.LanguageSelectionButton')" :subtitle="$t('Message.Components.SettingNaviagtionDrawer.DisplayInApplicationBarWhenScreenSizeIsAppropriate')">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon>mdi-translate</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-switch color="primary" v-model="appbarShowLanguageButton" inset hide-details></v-switch>
      </template>
    </v-list-item>

  </v-list>

</template>

<script>
import { useMainStore } from '@/stores/main'
import { useLocalDataStore } from '@/stores/local-data'
// import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      mainStore: useMainStore(),
      localDataStore: useLocalDataStore(),
      //   userStore: useUserStore(),
    }
  },
  computed: {
    appbarShowLanguageButton: {
      get() {
        return this.localDataStore.getAppbarShowLanguageButton
      },
      set(val) {
        this.localDataStore.setAppbarShowLanguageButton(val)
      }
    },
    appbarShowThemeButton: {
      get() {
        return this.localDataStore.getAppbarShowThemeButton
      },
      set(val) {
        this.localDataStore.setAppbarShowThemeButton(val)
      }
    },
    csd_model: {
      get() {
        return this.mainStore.getPageLayout === 'csd'
      },
      set(val) {
        this.mainStore.pageLayout = val ? 'csd' : 'default'
      }
    },
  }
}
</script>
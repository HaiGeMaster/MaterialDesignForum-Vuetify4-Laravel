<template>

  <v-container style="max-width: 830px;" v-if="userStore.getUser.user_group.ability_admin_manage_option">


    <v-card rounded="lg" class="mx-auto" v-if="userStore.getIsLogin">
      <v-toolbar :title="$t('Message.Admin.Options.SiteInfo')">
        <template v-slot:prepend>
          <v-btn icon @click="$router.back()">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.BackButton.Back') }}</v-tooltip>
          </v-btn>
        </template>

        <template v-slot:append>
          <v-btn icon variant="text" :loading="is_loading" @click="SetData()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>
      </v-toolbar>

      <v-card-text>
        <v-text-field color="primary"   v-model="form_data.site_name" :label="$t('Message.Admin.Options.SiteName')" />

        <v-text-field color="primary"   v-model="form_data.site_description" :label="$t('Message.Admin.Options.SiteDescription')" />

        <v-text-field color="primary"   v-model="form_data.site_keywords" :label="$t('Message.Admin.Options.SiteKeywords')"
          :hint="$t('Message.Admin.Options.SiteKeywordsHint')" persistent-hint />

        <v-text-field color="primary"   v-model="form_data.site_icp_beian" :label="$t('Message.Admin.Options.SiteICP')"
          :hint="$t('Message.Admin.Options.SiteICPHint')" persistent-hint />

        <v-text-field color="primary"   v-model="form_data.site_gongan_beian" :label="$t('Message.Admin.Options.SitePolice')"
          :hint="$t('Message.Admin.Options.SitePoliceHint')" persistent-hint />

        <v-select v-model="form_data.default_language" :items="LanguageList"
          :label="$t('Message.Admin.Options.DefaultLanguage') + ':' + form_data.default_language" item-value="locale"
          item-title="text">
        </v-select>
      </v-card-text>
    </v-card>

  </v-container>
</template>
<script>
// import "/node_modules/flag-icons/css/flag-icons.min.css";
// import ReturnButton from '@/components/return-button/index.vue'
// import messagesw from '@/assets/language/language.js'
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar.js'
import {
  // SetInfoData,
  // GetInfoData,
  // GetLocaleInfoList,
  SetAppBaseInfo,
} from '@/api/global.js'
export default {
  name: 'admin-page-options-info',
  components: {
    // ReturnButton,
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    LanguageList: [],
    form_data: {
      site_name: '',
      site_description: '',
      site_keywords: '',
      site_icp_beian: '',
      site_gongan_beian: '',
      default_language: '',
    },
    is_loading: false,
    // messagel: messagesw,
  }),
  methods: {
    async SetLanguageList() {
      // const messages = this.$store.getters.GetLangMessages
      // const res = await GetLocaleInfoList()
      // if (res.data) {
      //   const messages = res.data
      const messages = this.mainStore.getAppBaseInfo.lang_locale_list
        for (let langCode in messages) {
          if (messages[langCode].Message.langInfo.show) {
            const langName = messages[langCode].Message.langInfo.langname
            const usabilitys = messages[langCode].Message.langInfo.usability
            const flagicon = messages[langCode].Message.langInfo.flagicon
            this.LanguageList.push({ text: langName, locale: langCode, usability: usabilitys, flagicon: flagicon })
            // console.log('LanguageList', this.LanguageList)
          }
        }
      // }
    },
    async GetData() {
      // var user_token = this.$G_GetUserToken()
      // const res = await GetInfoData()
      // if (res.data.is_get) {
      //   this.form_data = res.data.form_data
      //   this.$forceUpdate()
      // }

      this.form_data = this.mainStore.getAppBaseInfo.option_list
    },
    async SetData() {
      this.is_loading = true
      var user_token = this.$G_GetUserToken()
      const res = await SetAppBaseInfo({
        app_base_info: {
          option_list: this.form_data,
        },
        user_token: user_token
      })
      if (res.data.is_set) {
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.Updated'), color: 'success' })
        this.is_loading = false
        this.GetData()
      } else {
        this.is_loading = false
      }
    }
  },
  created() {
    this.GetData()
    this.SetLanguageList()
  },
  watch: {
    form_data: {
      handler(val) {
        // console.log(val)
      },
      deep: true
    },
  }
}
</script>
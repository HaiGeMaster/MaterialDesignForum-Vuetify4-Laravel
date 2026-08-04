<template>
  <v-container style="max-width: 830px;" v-if="userStore.getUser.user_group.ability_admin_manage_option">

    <!-- <iframe src="https://afdian.com/leaflet?slug=HaiGeMaster" width="100%" height="200" scrolling="no" frameborder="0" style="padding-left: 16px;"></iframe>
    <br /> -->

    <v-card rounded="lg" outlined>
      <v-list rounded="lg" lines="two">

        <v-list-subheader>{{ $t('Message.Admin.Options.SystemSettings') }}</v-list-subheader>

        <v-divider></v-divider>

        <v-list-item :to="`${$G_UrlHeaderLang()}/admin/options/info`">
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>mdi-information-box-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ $t('Message.Admin.Options.SiteInfo') }}</v-list-item-title>
          <v-list-item-subtitle>
            {{
              $t('Message.Admin.Options.SiteName') + '、' +
              $t('Message.Admin.Options.SiteDescription') + '、' +
              $t('Message.Admin.Options.SiteKeywords') + '、' +
              $t('Message.Admin.Options.SiteICP') + '、' +
              $t('Message.Admin.Options.SitePolice') + '、' +
              $t('Message.Admin.Options.DefaultLanguage')
            }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="`${$G_UrlHeaderLang()}/admin/options/theme`">
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>mdi-palette-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ $t('Message.Admin.Options.Theme') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t(
            'Message.Admin.Options.EnableFrontEndPageToDisplayThemesWithDifferentStylesAndStylesDefaultToMaterialDesign'
          ) }}</v-list-item-subtitle>
          <template v-slot:append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="`${$G_UrlHeaderLang()}/admin/options/mail`">
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>mdi-email-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ $t('Message.Admin.Options.Mail') }}</v-list-item-title>
          <v-list-item-subtitle>
            {{
              $t('Message.Admin.Options.SmtpHost') + '、' +
              $t('Message.Admin.Options.SmtpUserName') + '、' +
              $t('Message.Admin.Options.SmtpPassword') + '、' +
              $t('Message.Admin.Options.SmtpProt') + '、' +
              $t('Message.Admin.Options.SmtpSecure') + '、' +
              $t('Message.Admin.Options.SmtpReplyTo') + '、' +
              $t('Message.Admin.Options.SmtpSendName')
            }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="`${$G_UrlHeaderLang()}/admin/options/oauth`">
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>mdi-account-network-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>
            {{ $t('Message.Admin.Options.Oauth') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('Message.Admin.Options.ThirdPartyLoginSettings') }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>


      </v-list>
    </v-card>

    <br />
    <v-card rounded="lg" outlined>
      <v-list rounded="lg" lines="two">

        <v-list-subheader>{{
          $t('Message.Admin.Options.AboutWebApplications')
        }}</v-list-subheader>

        <v-divider></v-divider>

        <v-list-item>
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>mdi-information-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ $t('Message.Admin.Options.About')
          }}
            <!-- <small>(V{{ $store.getters.GetAppVersion }})</small> -->

          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('Message.Admin.Options.AboutContent') }}
          </v-list-item-subtitle>

          <v-list-item-subtitle>
            <small>
              Vesion {{ CheckUpdate_data.current_version }} Copyright © 2022 - {{ new Date().getFullYear() }}
              HaiGeMaster.
              All Rights Reserved.
            </small>
          </v-list-item-subtitle>




          <!-- <template v-slot:append>

            </template> -->
          <template v-slot:append>
            <a href="https://afdian.com/a/HaiGeMaster">
              <img style="width: 120px;" src="https://pic1.afdiancdn.com/static/img/welcome/button-sponsorme.png"
                alt="">
            </a>
          </template>

        </v-list-item>

        <v-divider></v-divider>

        <!-- <v-list-item>
          <iframe src="https://afdian.com/leaflet?slug=HaiGeMaster" width="640" scrolling="no" height="200" frameborder="0"></iframe>
        </v-list-item>

        <v-divider></v-divider> -->

        <v-list-item @click="CheckUpdate" :disabled="CheckUpdate_loading">
          <template v-slot:prepend>
            <v-avatar>
              <!-- <v-icon>mdi-information-outline</v-icon> -->
              <v-progress-circular v-if="CheckUpdate_loading" indeterminate color="primary"></v-progress-circular>
              <v-icon v-else>mdi-arrow-up-bold-hexagon-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>
            {{ $t('Message.App.Version.CheckForUpdates') }}
            <!-- <small>(V{{ $store.getters.GetAppVersion }})</small> -->
          </v-list-item-title>
          <v-list-item-subtitle v-show="!CheckUpdate_loading">
            {{ `${$t('Message.App.Version.CurrentVersion')}:v${CheckUpdate_data.current_version}` }}
            {{ `${$t('Message.App.Version.LatestVersion')}:v${CheckUpdate_data.new_version}` }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider v-show="CheckUpdate_data.is_update"></v-divider>

        <v-list-item @click="DownloadZipLink" v-show="CheckUpdate_data.is_update">
          <template v-slot:prepend>
            <v-avatar>
              <v-icon color="secondary">
                mdi-download-box-outline
              </v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>
            <strong class="secondary--text">
              {{ $t('Message.App.Version.DownLoadLastestVersion') + 'v' + CheckUpdate_data.new_version }}
            </strong>
          </v-list-item-title>

        </v-list-item>

        <!-- 暂时取消在线更新 使用123非直链网盘 -->

        <!-- <v-divider v-show="CheckUpdate_data.is_update"></v-divider>

        <v-list-item @click="ServeUpdateInfo" v-show="CheckUpdate_data.is_update">
          <template v-slot:prepend>
            <v-progress-circular v-if="ServeUpdateInfo_loading" indeterminate color="accent"></v-progress-circular>
            <v-icon v-else color="accent">
              mdi-cloud-download-outline
            </v-icon>

          </template>
            <v-list-item-title>
              <strong class="accent--text">
                {{ `${$t('Message.App.Version.OnlineUpdate')}v${CheckUpdate_data.new_version}` }}
              </strong>
            </v-list-item-title>

        </v-list-item> -->

      </v-list>
    </v-card>

    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false" />
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import { useUserStore } from '@/stores/user'
import {
  // SetActivationKey,
  // GetActivationKey,
  RenewalDomain,
  CheckUpdate,
  // ServeUpdateInfo,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
export default {
  name: 'admin-page-options',
  components: {
    DataTable,
    Loading,
    // Confirm,
    // Cancel
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    ActivationDialog: false,
    ActivationKey: '',
    ActivationLoading: false,
    dialog: false,
    CheckUpdate_data: {
      is_update: false,
      new_version: null,
      current_version: '',
      download_url: '',
    },
    // ServeUpdateInfo_data: {
    //   is_update: '',
    //   new_version: null,
    //   current_version: '',
    // },
    CheckUpdate_loading: false,
    // ServeUpdateInfo_loading: false
  }),
  methods: {
    async Activation() {
      const domain_name = window.location.host
      const renewal_key = this.ActivationKey
      // console.log('Activation-domain_name', domain_name)
      // console.log('Activation-renewal_key', renewal_key)
      const user_email = this.userStore.getUser.email
      const response = await RenewalDomain({
        domain_name_base64: btoa(domain_name),
        renewal_key_base64: btoa(renewal_key),
        renewal_email_base64: btoa(user_email),
      })

      if (response.data.v) {
        var value = parseInt(atob(response.data.v))
        var time = atob(response.data.t)
        var lang = JSON.parse(atob(response.data.l))
        // this.$store.dispatch('Set_AppVersionExpirationTime', time)
        // this.$store.dispatch('Set_AppAllowUseLangpack', lang)
        var now_time = Math.round(new Date().getTime() / 1000)
        if (value == 1 && time > now_time) {
          // this.$store.dispatch('Set_AppAllowUse', true)
        } else {
          // this.$store.dispatch('Set_AppAllowUse', false)
        }
        this.ActivationDialog = false
        this.ActivationKey = ''
      }
      //刷新
      // this.$router.go(0)
      // window.location.reload()

      // this.ActivationLoading = true
      // const res = await SetActivationKey({
      //   user_token: this.$G_GetUserToken(),
      //   site_activation_key: this.ActivationKey,
      // })
      // if (res.data.is_set) {
      //   this.ActivationLoading = false
      //   this.ActivationDialog = false
      //   //刷新
      //   window.location.reload()
      // } else {
      //   this.ActivationLoading = false
      //   this.ActivationDialog = false
      // }
    },
    async GetServerActivationKey() {
      // const res = await GetActivationKey({
      //   user_token: this.$G_GetUserToken(),
      // })
      // if (res.data.is_get) {
      //   this.ActivationKey = atob(res.data.key)
      // }
    },
    async CheckUpdate() {
      this.CheckUpdate_loading = true
      const res = await CheckUpdate({
        user_token: this.$G_GetUserToken(),
      })
      if (res.data.is_update) {
        this.CheckUpdate_data.is_update = res.data.is_update
        this.CheckUpdate_data.new_version = res.data.new_version
        this.CheckUpdate_data.current_version = res.data.current_version
        this.CheckUpdate_data.download_url = res.data.download_url
        this.CheckUpdate_loading = false
      } else if (!res.data.is_update) {
        this.CheckUpdate_data.is_update = res.data.is_update
        this.CheckUpdate_data.new_version = res.data.new_version
        this.CheckUpdate_data.current_version = res.data.current_version
        this.CheckUpdate_data.download_url = res.data.download_url
        this.CheckUpdate_loading = false
      }
      this.CheckUpdate_loading = false
      this.$forceUpdate()
      // console.log(this.CheckUpdate_data)
    },
    // async ServeUpdateInfo() {
    //   this.ServeUpdateInfo_loading = true

    //   const res = await ServeUpdateInfo({
    //     user_token: this.$G_GetUserToken(),
    //   })
    //   if (res.data.is_update) {
    //     this.ServeUpdateInfo_data.is_update = res.data.is_update
    //     this.ServeUpdateInfo_data.new_version = res.data.new_version
    //     this.ServeUpdateInfo_data.current_version = res.data.current_version
    //     this.ServeUpdateInfo_loading = false

    //     //刷新
    //     window.location.reload()
    //   } else {
    //     this.ServeUpdateInfo_loading = false
    //   }

    // },
    DownloadZipLink() {
      // console.log('DownloadZipLink', this.CheckUpdate_data.download_url)
      if (this.CheckUpdate_data.download_url) {
        window.open(this.CheckUpdate_data.download_url, '_blank')
      } else {
        // this.$G_ShowMessage('error', this.$t('Message.App.Version.NoDownloadLink'))
      }
    },
  },
  watch: {
    //当ActivationKey超出29个字符时，截取前29个字符
    // ActivationKey(val){
    //   if(val.length>29){
    //     this.ActivationKey = val.substring(0,29)
    //   }
    // }
  },
  created() {
    // this.GetServerActivationKey()
    this.CheckUpdate()
  },
}
</script>
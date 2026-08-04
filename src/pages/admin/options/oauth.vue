<template>
  <v-container style="max-width: 830px;" v-if="userStore.getUser.user_group.ability_admin_manage_option">



    <v-card rounded="lg" class="mx-auto" v-if="userStore.getIsLogin">
      <v-toolbar :title="$t('Message.Admin.Options.ThirdPartyLoginSettings')">
        <template v-slot:prepend>
          <v-btn  icon @click="$router.back()">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.BackButton.Back') }}</v-tooltip>
          </v-btn>
        </template>

        <template v-slot:append>
          <v-btn  icon variant="text" :loading="is_loading" @click="SetData()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>
      </v-toolbar>

      <v-card-text>

        <v-card rounded="lg" elevation="0" :title="$t('Message.Components.Account.GithubAccount')">
          <template v-slot:prepend>
            <img :src="$G_ImgHandle('/assets/fixed_content/github.png')"
              style="width: 24px;height: 24px;margin-right: 4px;" />
          </template>
          <v-card-text>
            <v-text-field color="primary"   v-model="form_data.GITHUB_CLIENT_ID" :label="$t('Message.Admin.Options.ClientID')" />

            <v-text-field color="primary"   v-model="form_data.GITHUB_CLIENT_SECRET" :label="$t('Message.Admin.Options.ClientSecret')" />

          </v-card-text>
        </v-card>

        <v-divider></v-divider>

        <v-card rounded="lg" elevation="0" :title="$t('Message.Components.Account.GoogleAccount')">
          <template v-slot:prepend>
            <img :src="$G_ImgHandle('/assets/fixed_content/google.png')"
              style="width: 24px;height: 24px;margin-right: 4px;" />

          </template>
          <v-card-text>
            <v-text-field color="primary"   v-model="form_data.GOOGLE_CLIENT_ID" :label="$t('Message.Admin.Options.ClientID')" />

            <v-text-field color="primary"   v-model="form_data.GOOGLE_CLIENT_SECRET" :label="$t('Message.Admin.Options.ClientSecret')" />

          </v-card-text>
        </v-card>

        <v-divider></v-divider>

        <v-card rounded="lg" elevation="0" :title="$t('Message.Components.Account.MicrosoftAccount')">
          <template v-slot:prepend>
            <img :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')"
              style="width: 24px;height: 24px;margin-right: 4px;" />
          </template>
          <v-card-text>
            <v-text-field color="primary"   v-model="form_data.MICROSOFT_CLIENT_ID" :label="$t('Message.Admin.Options.ClientID')" />

            <v-text-field color="primary"   v-model="form_data.MICROSOFT_CLIENT_SECRET" :label="$t('Message.Admin.Options.ClientSecret')" />

          </v-card-text>
        </v-card>

        <!-- <v-divider></v-divider>

        <v-card rounded="lg" elevation="0" :title="$t('Message.Components.Account.SSOAccount')">
          <template v-slot:prepend>

            <img :src="$G_ImgHandle('/assets/fixed_content/sso.png')"
              style="width: 24px;height: 24px;margin-right: 4px;" />
          </template>
          <v-card-text>
            <v-text-field color="primary"   v-model="form_data.sso_client_main_url" :label="$t('Message.Admin.Options.SSOMainURL')" />

            <v-text-field color="primary"   v-model="form_data.sso_client_main_name" :label="$t('Message.Admin.Options.SSOMainName')" />

            <v-text-field color="primary"   v-model="form_data.sso_client_id" :label="$t('Message.Admin.Options.ClientID')" />

            <v-text-field color="primary"   v-model="form_data.sso_client_secret" :label="$t('Message.Admin.Options.ClientSecret')" />

          </v-card-text>
        </v-card> -->

      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
// import ReturnButton from '@/components/return-button/index.vue'
import {
  // GetOauthOptions,
  // SetOauthOptions,
  GetOauthConfig,
  SetOauthConfig,
} from '@/api/global.js'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar.js'
export default {
  name: 'admin-page-options-oauth',
  components: {
    // ReturnButton,
  },
  data: () => ({
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    form_data: {
      // github_client_id: '',
      // github_client_secret: '',
      // google_client_id: '',
      // google_client_secret: '',
      // microsoft_client_id: '',
      // microsoft_client_secret: '',

      GITHUB_CLIENT_ID: '',
      GITHUB_CLIENT_SECRET: '',
      GITHUB_REDIRECT_URI: '',
      MICROSOFT_CLIENT_ID: '',
      MICROSOFT_CLIENT_SECRET: '',
      MICROSOFT_REDIRECT_URI: '',
      GOOGLE_CLIENT_ID: '',
      GOOGLE_CLIENT_SECRET: '',
      GOOGLE_REDIRECT_URI: '',


    },
    is_loading: false,
    // GetLoading: false,
  }),
  methods: {
    async GetData() {
      // this.GetLoading = true
      var user_token = this.$G_GetUserToken()
      const res = await GetOauthConfig({
        user_token: user_token
      })
      if (res.data.is_get) {
        // this.GetLoading = false
        this.form_data = res.data.data
        this.$forceUpdate()
      } else {
        // this.GetLoading = false
      }
    },
    async SetData() {
      this.is_loading = true
      var user_token = this.$G_GetUserToken()
      const res = await SetOauthConfig({
        oauth_info: this.form_data,
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

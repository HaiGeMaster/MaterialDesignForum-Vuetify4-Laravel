<template>
  <v-list rounded="lg" lines="two">

    <v-list-subheader>{{ $t('Message.Components.Account.ThirdPartyAccounts') }}</v-list-subheader>

    <v-list-item v-if="userStore.getIsLogin  && oauthList.github"
      :href="oauths.github == null ? $G_CrossDomain() + '/auth/github/redirect' : ''" rel="noopener noreferrer">
      <template v-slot:prepend>
        <v-avatar>
          <img :src="$G_ImgHandle('/assets/fixed_content/github.png')" style="width: 24px;height: 24px;" />
        </v-avatar>
      </template>
      <v-list-item-title>
        {{ $t('Message.Components.Account.GithubAccount') }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="oauths.github == null">
        {{ $t('Message.Components.Account.SssociatedNLogin', {
          value: $t('Message.Components.Account.GithubAccount')
        }) }}</v-list-item-subtitle>
      <v-list-item-subtitle v-else>
        {{ $t('Message.Components.Account.AlreadySssociated') + oauths.github.oauth_user_email + '(' +
          oauths.github.oauth_user_name + ')' }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-icon v-if="oauths.github == null">mdi-open-in-new</v-icon>
        <v-btn v-else @click.stop="DeleteOauth(oauths.github.oauth_id)" color="pink" variant="text" icon
          :loading="delete_loading_id == oauths.github.oauth_id">
          <v-icon>mdi-link-off</v-icon>

          <v-tooltip activator="parent" location="left">{{ $t('Message.Components.Account.Disassociation')
          }}</v-tooltip>
        </v-btn>
      </template>
    </v-list-item>

    <v-list-item v-if="userStore.getIsLogin  && oauthList.microsoft"
      :href="oauths.microsoft == null ? $G_CrossDomain() + '/auth/microsoft/redirect' : ''" rel="noopener noreferrer">
      <template v-slot:prepend>
        <v-avatar>
          <img :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')" style="width: 24px;height: 24px;" />
        </v-avatar>
      </template>
      <v-list-item-title>
        {{ $t('Message.Components.Account.MicrosoftAccount') }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="oauths.microsoft == null">
        {{ $t('Message.Components.Account.SssociatedNLogin', {
          value: $t('Message.Components.Account.MicrosoftAccount')
        }) }}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else>
        {{ $t('Message.Components.Account.AlreadySssociated') + oauths.microsoft.oauth_user_email + '(' +
          oauths.microsoft.oauth_user_name + ')' }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-icon v-if="oauths.microsoft == null">mdi-open-in-new</v-icon>
        <v-btn v-else @click.stop="DeleteOauth(oauths.microsoft.oauth_id)" color="pink" variant="text" icon
          :loading="delete_loading_id == oauths.microsoft.oauth_id">
          <v-icon>mdi-link-off</v-icon>

          <v-tooltip activator="parent" location="left">{{ $t('Message.Components.Account.Disassociation')
          }}</v-tooltip>
        </v-btn>
      </template>
    </v-list-item>

    <v-list-item v-if="userStore.getIsLogin  && oauthList.google"
      :href="oauths.google == null ? $G_CrossDomain() + '/auth/google/redirect' : ''" rel="noopener noreferrer">
      <template v-slot:prepend>
        <v-avatar>
          <img :src="$G_ImgHandle('/assets/fixed_content/google.png')" style="width: 24px;height: 24px;" />
        </v-avatar>
      </template>
      <v-list-item-title>
        {{ $t('Message.Components.Account.GoogleAccount') }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="oauths.google == null">
        {{ $t('Message.Components.Account.SssociatedNLogin', {
          value: $t('Message.Components.Account.GoogleAccount')
        }) }}</v-list-item-subtitle>
      <v-list-item-subtitle v-else>
        {{ $t('Message.Components.Account.AlreadySssociated') + oauths.google.oauth_user_email + '(' +
          oauths.google.oauth_user_name + ')' }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-icon v-if="oauths.google == null">mdi-open-in-new</v-icon>
        <v-btn v-else @click.stop="DeleteOauth(oauths.google.oauth_id)" color="pink" variant="text" icon
          :loading="delete_loading_id == oauths.google.oauth_id">
          <v-icon>mdi-link-off</v-icon>

          <v-tooltip activator="parent" location="left">{{ $t('Message.Components.Account.Disassociation')
          }}</v-tooltip>
        </v-btn>
      </template>
    </v-list-item>

    <!-- <v-list-item v-if="userStore.getIsLogin "
      :href="oauths.sso == null ? $G_CrossDomain() + '/auth/sso/redirect' : ''"
      rel="noopener noreferrer">
      <template v-slot:prepend>
        <v-avatar>
          <img :src="$G_ImgHandle('/assets/fixed_content/sso.png')" style="width: 24px;height: 24px;" />
        </v-avatar>
      </template>
      <v-list-item-title>
        {{ sso_client_main_name ? $t('Message.Components.Account.ValueAccount', { value: sso_client_main_name })
          : $t('Message.Components.Account.SSOAccount') }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="oauths.sso == null">
        {{ $t('Message.Components.Account.SssociatedNLogin', {
          value: sso_client_main_name ? $t('Message.Components.Account.ValueAccount', {
            value:
              sso_client_main_name
          })
            : $t('Message.Components.Account.SSOAccount')
        }) }}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else>
        {{ $t('Message.Components.Account.AlreadySssociated') + oauths.sso.oauth_user_email + '(' +
          oauths.sso.oauth_user_name + ')' }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-icon v-if="oauths.sso == null">mdi-open-in-new</v-icon>
        <v-btn v-else @click.stop="DeleteOauth(oauths.sso.oauth_id)" color="pink" variant="text" icon
          :loading="delete_loading_id == oauths.sso.oauth_id">
          <v-icon>mdi-link-off</v-icon>

          <v-tooltip activator="parent" location="left">{{ $t('Message.Components.Account.Disassociation')
          }}</v-tooltip>
        </v-btn>
      </template>
    </v-list-item> -->
  </v-list>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
  SwitchClientTheme,
  // GetThemeData,
  GetUserOauthBindings,
  DeleteOauth,
  // GetOauthLink,
  AddBodyClass_UseGlassMorphism,
  AddBodyClass_UseGlassMorphismAppbar,
  AddBodyClass_UseGlassMorphismBottomNav,
} from '@/api/global.js'
export default {
  data() {
    return {
      // drawer: true,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      oauths: {
        github: null,
        microsoft: null,
        google: null,
        sso: null,
      },
      // oauths_link: {
      //   github: '',
      //   microsoft: '',
      //   google: '',
      //   sso: '',
      // },
      sso_client_main_name: '',
      delete_loading_id: null
    }
  },
  computed: {
    oauthList() {
      return this.mainStore.getAppBaseInfo?.oauth_list || {}
    },
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  },
  methods: {
    async GetUserOauthBindings() {

      // if (this.$route.name!='settings'||this.$route.name!='lang-settings') {
      //   return
      // }
      if (!this.userStore.getIsLogin) {
        return
      }

      // this.oauths_link.github = await GetOauthLink('github')
      // this.oauths_link.google = await GetOauthLink('google')
      // this.oauths_link.microsoft = await GetOauthLink('microsoft')
      // this.oauths_link.sso = await GetOauthLink('sso')


      var user_token = this.$G_GetUserToken()
      const res = await GetUserOauthBindings({
        user_token: user_token
      })
      if (res.data.is_get) {
        // this.oauths = res.data.data
        // this.oauths = res.data.data

        this.oauths.github = res.data.data.github ?? null
        this.oauths.microsoft = res.data.data.microsoft ?? null
        this.oauths.google = res.data.data.google ?? null
        this.oauths.sso = res.data.data.sso ?? null

        this.sso_client_main_name = res.data.data.sso_client_main_name
        this.$forceUpdate()
      }
    },
    async DeleteOauth(oauth_id) {
      this.delete_loading_id = oauth_id
      var user_token = this.$G_GetUserToken()
      const res = await DeleteOauth({
        user_token: user_token,
        oauth_id: oauth_id
      })
      if (res.data.is_delete) {
        this.delete_loading_id = null
        this.GetUserOauthBindings()
      } else {
        this.delete_loading_id = null
      }
    },
  },
  watch: {
    ReturnUserIsLogin(newVal, oldVal) {
      if (newVal) {
        this.GetUserOauthBindings()
      }
    }
  },
  mounted() {
    this.GetUserOauthBindings()
  }
}
</script>

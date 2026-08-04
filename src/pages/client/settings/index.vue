<template>
  <div id="page-settings">

    <v-card rounded="lg" elevation="0" style="margin: 16px;" 
      :title="$t('Message.Components.DevDialog.Setting')">

      <v-card v-show="false" rounded="lg" variant="outlined" :disabled="IsTauri">

        <v-list rounded="lg" line="three" >
          
          <v-list-subheader>
            {{ IsTauri ?
              `${$t('Message.Admin.Options.Theme')}(${$t('Message.App.TheCurrentEnvironmentIsUnavailable')})` :
              $t('Message.Admin.Options.Theme') }}
          </v-list-subheader>

          <v-list-item v-for="item in form_data" :key="item.name" :headline="item.name" :disabled="item.disabled"
            @click="SwitchClientTheme(item.name)">
            <template v-slot:prepend>
              <v-icon :color="item.icon_color">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.name }}(v{{ item.version }})</v-list-item-title>
            <v-list-item-subtitle>{{ item.author + ' - ' + item.description }}</v-list-item-subtitle>
          </v-list-item>

          <!-- <ListItemSkeleton v-if="loading" v-for="i in 2" :key="i" /> -->

        </v-list>
      </v-card>
      <br />

      <v-card v-show="false" rounded="lg" variant="outlined" :disabled="IsTauri"
        v-if="userStore.getIsLogin && (oauths_link.github || oauths_link.microsoft)" style="margin-bottom: 160px;">

        <v-list rounded="lg" line="three" >
          <v-list-subheader>
            <!-- {{ $t('Message.Components.Account.ThirdPartyAccounts') }} -->
            {{
              IsTauri ?
                `${$t('Message.Components.Account.ThirdPartyAccounts')}(${$t('Message.App.TheCurrentEnvironmentIsUnavailable')})` :
                $t('Message.Components.Account.ThirdPartyAccounts')
            }}
          </v-list-subheader>

          <v-list-item v-show="oauths_link.github" :href="oauths.github == null ? oauths_link.github : ''"
            rel="noopener noreferrer">
            <template v-slot:prepend size="40">
              <img :src="$G_ImgHandle('/assets/fixed_content/github.png')" style="width: 24px;height: 24px;margin-right: 30px;" />
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
              <v-btn rounded="lg"  v-else @click.stop="DeleteOauth(oauths.github.oauth_id)" color="pink" variant="outlined"
                :loading="delete_loading_id == oauths.github.oauth_id">
                <v-icon>mdi-link-off</v-icon>
                {{ $t('Message.Components.Account.Disassociation') }}
              </v-btn>
            </template>
          </v-list-item>

          <!-- v-show="oauths_link.google" -->
          <v-list-item v-show="oauths_link.google" :href="oauths.google == null ? oauths_link.google : ''"
            rel="noopener noreferrer">
            <template v-slot:prepend size="40">
              <img :src="$G_ImgHandle('/assets/fixed_content/google.png')" style="width: 24px;height: 24px;margin-right: 30px;" />
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
              <v-btn rounded="lg"  v-else @click.stop="DeleteOauth(oauths.google.oauth_id)" color="pink" variant="outlined"
                :loading="delete_loading_id == oauths.google.oauth_id">
                <v-icon>mdi-link-off</v-icon>
                {{ $t('Message.Components.Account.Disassociation') }}
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item v-show="oauths_link.microsoft" :href="oauths.microsoft == null ? oauths_link.microsoft : ''"
            rel="noopener noreferrer">
            <template v-slot:prepend size="40">
              <img :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')" style="width: 24px;height: 24px;margin-right: 30px;" />
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
              <v-btn rounded="lg"  v-else @click.stop="DeleteOauth(oauths.microsoft.oauth_id)" color="pink" variant="outlined"
                :loading="delete_loading_id == oauths.microsoft.oauth_id">
                <v-icon>mdi-link-off</v-icon>
                {{ $t('Message.Components.Account.Disassociation') }}
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item v-show="oauths_link.sso" :href="oauths.sso == null ? oauths_link.sso : ''"
            rel="noopener noreferrer">
            <template v-slot:prepend >
              <img :src="$G_ImgHandle('/assets/fixed_content/sso.png')" style="width: 24px;height: 24px;margin-right: 30px;" />
            </template>
            <v-list-item-title>
              {{ sso_client_main_name ? $t('Message.Components.Account.ValueAccount', { value: sso_client_main_name })
                : $t('Message.Components.Account.SSOAccount') }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="oauths.sso == null">
              {{ $t('Message.Components.Account.SssociatedNLogin', {
                value: sso_client_main_name ? $t('Message.Components.Account.ValueAccount', { value: sso_client_main_name })
                  : $t('Message.Components.Account.SSOAccount')
              }) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              {{ $t('Message.Components.Account.AlreadySssociated') + oauths.sso.oauth_user_email + '(' +
                oauths.sso.oauth_user_name + ')' }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <v-icon v-if="oauths.sso == null">mdi-open-in-new</v-icon>
              <v-btn rounded="lg"  v-else @click.stop="DeleteOauth(oauths.sso.oauth_id)" color="pink" variant="outlined"
                :loading="delete_loading_id == oauths.sso.oauth_id">
                <v-icon>mdi-link-off</v-icon>
                {{ $t('Message.Components.Account.Disassociation') }}
              </v-btn>
            </template>
          </v-list-item>

        </v-list>
      </v-card>

      <v-card-text>
        <p>设置选项已被移动至：右上角头像-设置。此页面将在后续被删除</p>
        <p>The option has been moved to: upper right corner avatar - Settings. This page will be deleted in the future</p>
      </v-card-text>

    </v-card>


  </div>
</template>
<script>
// import VConsole from 'vconsole';
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
  SwitchClientTheme,
  GetThemeData,
  GetUserOauthBindings,
  DeleteOauth,
  GetOauthLink,
  AddBodyClass_UseGlassMorphism,
  AddBodyClass_UseGlassMorphismAppbar,
  AddBodyClass_UseGlassMorphismBottomNav,
} from '@/api/global.js'
// import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'

import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';
export default {
  name: 'settings-page',
  components: {
    // ListItemSkeleton,
  },
  props: {
    model: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      userStore: useUserStore(),
      mainStore: useMainStore(),
      //GetOauthLink,
      form_data: null,
      vmodel: false,
      vconsole: null,
      client_form: {
        // global_galss_effect: false,
        // appbar_galss_effect: false,
        // bottom_nav_galss_effect: false,
        global_galss_effect: true,
        appbar_galss_effect: true,
        bottom_nav_galss_effect: true,
        vconsole: false,
      },
      // management_form: {
      // },
      loading: true,
      oauths: {
        github: null,
        microsoft: null,
        google: null,
        sso: null,
      },
      oauths_link: {
        github: '',
        microsoft: '',
        google: '',
        sso: '',
      },
      sso_client_main_name: '',
      delete_loading_id: null,
    }
  },
  methods: {
    async GetThemeData() {
      this.loading = true
      var user_token = this.$G_GetUserToken()
      const res = await GetThemeData({
        user_token: user_token
      })
      if (res.data.is_get) {
        this.form_data = res.data.form_data
        this.$forceUpdate()
        this.loading = false
      } else {
        this.loading = false
      }
    },
    async GetUserOauthBindings() {

      // if (this.$route.name!='settings'||this.$route.name!='lang-settings') {
      //   return
      // }
      if (!this.userStore.getIsLogin) {
        return
      }

      this.oauths_link.github = await GetOauthLink('github')
      this.oauths_link.google = await GetOauthLink('google')
      this.oauths_link.microsoft = await GetOauthLink('microsoft')
      this.oauths_link.sso = await GetOauthLink('sso')


      var user_token = this.$G_GetUserToken()
      const res = await GetUserOauthBindings({
        user_token: user_token
      })
      if (res.data.is_get) {
        this.oauths = res.data.data
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
    SwitchClientTheme(val) {
      if (SwitchClientTheme(val)) {
        //刷新页面
        window.location.reload()
      }
    },
    // AddBodyClass_UseGlassMorphism(val) {
    //   if (val) {
    //     document.body.classList.add('use-glass-morphism')
    //   } else {
    //     document.body.classList.remove('use-glass-morphism')
    //   }
    // },
    // AddBodyClass_UseGlassMorphismAppbar(val) {
    //   if (this.client_form.global_galss_effect) {
    //     return
    //   }
    //   if (val) {
    //     document.body.classList.add('use-glass-morphism-app-bar')
    //   } else {
    //     document.body.classList.remove('use-glass-morphism-app-bar')
    //   }
    // },
    // AddBodyClass_UseGlassMorphismBottomNav(val) {
    //   if (this.client_form.global_galss_effect) {
    //     return
    //   }
    //   if (val) {
    //     document.body.classList.add('use-glass-morphism-bottom-navigation')
    //   } else {
    //     document.body.classList.remove('use-glass-morphism-bottom-navigation')
    //   }
    // },
    AddVconsole(val) {
      if (val) {
        this.vconsole = new VConsole();
      } else if (this.vconsole) {
        this.v// console.destroy();
      }
    },
    SaveToLocalStorage() {
      localStorage.setItem('theme_client_form', JSON.stringify(this.client_form))
      // localStorage.setItem('theme-management_form', JSON.stringify(this.management_form))
    },
    ReadFromLocalStorage() {
      const client_form = JSON.parse(localStorage.getItem('theme_client_form'))
      // const management_form = JSON.parse(localStorage.getItem('theme-management_form'))
      if (client_form) {
        this.client_form = client_form
      } else {
        this.UseClientFromLocalStorage(this.client_form)
      }
      // if (management_form) {
      //   this.management_form = management_form
      // } else {
      //   // this.UseClientFromLocalStorage(val)
      // }
      this.$forceUpdate()
    },
    UseClientFromLocalStorage(val) {
      // if(this.IsMobileApp){
      //   // this.AddBodyClass_UseGlassMorphism(true)
      // }else if(this.IsElectron){//默认启用毛玻璃
      //   this.AddBodyClass_UseGlassMorphism(true)
      // }else{
      //   this.AddBodyClass_UseGlassMorphism(val.global_galss_effect)
      //   this.AddBodyClass_UseGlassMorphismAppbar(val.appbar_galss_effect)
      //   this.AddBodyClass_UseGlassMorphismBottomNav(val.bottom_nav_galss_effect)
      // }

      // this.AddBodyClass_UseGlassMorphism(val.global_galss_effect)
      // this.AddBodyClass_UseGlassMorphismAppbar(val.appbar_galss_effect)
      // this.AddBodyClass_UseGlassMorphismBottomNav(val.bottom_nav_galss_effect)

      AddBodyClass_UseGlassMorphism(val.global_galss_effect)
      AddBodyClass_UseGlassMorphismAppbar(val.appbar_galss_effect)
      AddBodyClass_UseGlassMorphismBottomNav(val.bottom_nav_galss_effect)

      // this.AddVconsole(val.vconsole)

      this.SaveToLocalStorage()
      this.$forceUpdate()
    },
  },
  mounted() {
    // this.ReadFromLocalStorage()
    this.mainStore.setRightDrawer(true)
  },
  computed: {
    RouteIsAdmin() {
      //如果路由包含admin
      return this.$route.path.includes('admin')
    },
    IsTauri() {
      return IsTauri()
    },
    IsElectron() {
      return IsElectron()
    },
    IsMobileApp() {
      return IsMobileApp()
    },
    ReturnGetIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  watch: {
    model(val) {
      this.vmodel = val
      this.ReadFromLocalStorage()
    },
    vmodel(val) {
      this.SaveToLocalStorage()
      this.$emit('model', val)
    },
    client_form: {
      handler(val) {
        this.UseClientFromLocalStorage(val)
      },
      deep: true
    },
    ReturnGetIsLogin(val) {
      if (val) {
        this.GetUserOauthBindings()
      } else {
        this.oauths = {
          github: null,
          google: null,
          microsoft: null,
          sso: null,
        }
      }
    },
  }
}
</script>
<style lang="less">
#page-settings {
  max-width: 800px;
  margin: auto;
}
</style>
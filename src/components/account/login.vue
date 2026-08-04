<template>
  <v-dialog v-model="model" scrollable max-width="380px" :persistent="persistent" id="login-dialog">
    <v-card rounded="lg" elevation="0" :title="$t('Message.Components.Account.Login')">

      <!-- <v-card-title>
        {{ $t('Message.Components.Account.Login') }}
        <v-spacer></v-spacer>
        <SsoButton />
        <GithubButton />
        <GoogleButton />
        <MicrosoftButton />
      </v-card-title> -->

      <template v-slot:append>
        <!-- <SsoButtonV1 /> -->
        <GithubButtonV1 v-if="mainStore.getAppBaseInfo.oauth_list.github"/>
        <GoogleButtonV1 v-if="mainStore.getAppBaseInfo.oauth_list.google"/>
        <MicrosoftButtonV1 v-if="mainStore.getAppBaseInfo.oauth_list.microsoft"/>
      </template>

      <v-card-text>
        <v-form ref="form">
          <FieldName :label="$t('Message.Components.Account.UserNameOrEMail')"
            @inputv="(val) => { UserNameOrEMail = val }" />
          <FieldPassword :label="$t('Message.Components.Account.Password')" @inputv="(val) => { Password = val }" />
          <FieldCaptcha :label="$t('Message.Components.Account.ImageCode')" v-if="ErrorCount >= 3"
            @inputv="(val) => { Captcha = val }" />
          <!-- <v-checkbox v-model="CanUseCookie"
            :label="$t('Message.Components.Account.AgreeToUseCookieToKeepLoggedIn')"></v-checkbox> 使用Cookie对话框替代了选项 -->
          <!-- :disabled="!CanUseCookie" -->
          <Submit :text="$t('Message.Components.Account.Login')" :loading="is_loading" @submit_click="OnSubmit" />

          <br v-if="!persistent" />
          <FieldMore v-if="!persistent" :dialog="model" :items="FieldMoreItems" @item_select="item_select" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import FieldName from '@/components/account/components/field-name.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldCaptcha from '@/components/account/components/field-captcha.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import GithubButtonV1 from './components/oauth-v1/github-button.vue'
import GoogleButtonV1 from './components/oauth-v1/google-button.vue'
import MicrosoftButtonV1 from './components/oauth-v1/microsoft-button.vue'
// import SsoButtonV1 from './components/oauth-v1/sso-button.vue'

import {
  Login,
  SetUserToken,
  GetUserToken,
  RemoveUserToken,
  Auto_Login,
} from '@/api/global.js';

import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: "login-dialog",
  props: {
    hide_overlay: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    },
    // show_field_more: {
    //   type: Boolean,
    //   default: true
    // },
    is_admin: {
      type: Boolean,
      default: false
    },
  },
  components: {
    FieldName,
    FieldPassword,
    FieldCaptcha,
    FieldMore,
    Submit,
    GithubButtonV1,
    GoogleButtonV1,
    MicrosoftButtonV1,
    // SsoButtonV1,
  },
  data: () => ({
    mainStore: useMainStore(),
    snackbarStore: useSnackbarStore(),
    dialogStore: useDialogStore(),
    userStore: useUserStore(),
    CanUseCookie: false,
    UserNameOrEMail: "",
    Password: "",
    Captcha: "",
    ErrorCount: 0,
    is_loading: false,
    FieldMoreItems: [
      {
        text: "Message.Components.Account.ForgetPassword",
        value: "ForgetPassword"
      },
      {
        text: "Message.Components.Account.Register",
        value: "Register"
      }
    ],
    // model: false,
  }),
  methods: {
    item_select(value) {
      if (this.persistent && !this.userStore.getIsLogin) {
        return
      }
      this.dialogStore.setLoginDialog(false)
      switch (value) {
        case "ForgetPassword":
          this.dialogStore.setResetDialog(true)
          break;
        case "Register":
          this.dialogStore.setRegisterDialog(true)
          break;
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    async OnSubmit() {
      RemoveUserToken()
      if (this.validate()) {
        this.is_loading = true
        const response = await Login(
          {
            username_or_email: this.UserNameOrEMail,
            password: this.Password,
            image_capthca: this.Captcha,
          }
        )
        if (response.data.is_login == true) {
          this.is_loading = false
          SetUserToken(response.data.token)
          this.Auto_Login()
        } else {
          this.is_loading = false
          this.ErrorCount++
        }
      }
    },
    BackAndOutLogin() {
      this.userStore.setIsLogin(false)
      this.userStore.setUserToken('')
      this.userStore.setUser(this.userStore.getDefaultUser)
      RemoveUserToken()

      if (this.$route.name == 'admin' || this.$route.name == 'lang-admin') {
        this.dialogStore.setLoginDialog(true)
        return
      }
      if (this.$route.path !== `${this.$G_UrlHeaderLang()}/`) {
        // 路由回退到首页
        this.$router.push(`${this.$G_UrlHeaderLang()}/`)
      }
    },
    async Auto_Login() {

      // if(this.is_admin&&!this.$store.getters['User/GetUser'].user_group.ability_admin_login){
      //   // this.BackAndOutLogin()
      //   window.location.href = this.$G_UrlHeaderLang() + '/'
      //   return
      // }

      var token = GetUserToken()
      // console.log('Auto_Login', token)
      if (token != null && token != '') {
        this.is_loading = true
        const response = await Auto_Login(token)

        // console.log('Auto_Login', response)
        if (response.data.is_login == true) {
          this.userStore.setIsLogin(true)
          this.userStore.setUserToken(token)
          this.userStore.setUser(response.data.user)
          this.snackbarStore.addMessage({
            text: this.$t('Message.Components.Account.XWelcomeBack', {
              value: response.data.user.username,
            })
          })

          this.ErrorCount = 0
          this.Captcha = ''
          this.is_loading = false
          this.dialogStore.setLoginDialog(false)

          if (this.is_admin && !this.userStore.getUser.user_group.ability_admin_login) {
            window.location.href = this.$G_UrlHeaderLang() + '/'
            return
          }
        } else {
          this.is_loading = false
          // console.log('Auto_Login failed')
          this.BackAndOutLogin()
        }
      }
    },
    async GetLoginData() {
      if (!this.userStore.getIsLogin) {
        return
      }
      if (GetUserToken() == '') {
        return
      }
      const response = await Auto_Login(GetUserToken())
      if (response.data.is_login == true) {
        var user = response.data.user
        if (user == null) {
          // console.log('GetLoginData failed')
          this.BackAndOutLogin()
          return
        }
        // for (var key in this.userStore.getUser) {
        //   if (this.userStore.getUser[key] != user[key]) {
        //     this.userStore.setUser(user)
        //   }
        // }

        this.userStore.setUser(user)
      } else {
        this.BackAndOutLogin()

        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.UserNotLogin'),
          color: 'error',
        })
      }
    },
  },
  created() {
    if (this.persistent) {
      this.dialogStore.setLoginDialog(true)
    }
  },
  mounted() {
    this.Auto_Login()
  },
  computed: {
    // Store_Dialog_LoginDialog() {
    //   return this.dialogStore.getLoginDialog
    // },
    model: {
      get() {
        return this.dialogStore.getLoginDialog
      },
      set(val) {
        this.dialogStore.setLoginDialog(val)
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.GetLoginData()
    },
    // Store_Dialog_LoginDialog(val) {
    //   // console.log(val)
    //   this.model = val
    // },
    model(val) {
      if (!val) {
        this.dialogStore.setLoginDialog(false)
      }
    },
  }
}
</script>
<style lang="less"></style>

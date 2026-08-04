<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Logo / 品牌区 -->
      <div class="login-brand">
        <img src="/favicon.png" alt="Logo" class="login-logo" />
        <h1 class="login-title">
          {{ $t('Message.Components.Account.Login') }}
          <!-- {{ mainStore.getInfoData.site_name }} -->
        </h1>
        <!-- <p class="login-subtitle" v-if="mainStore.getInfoData.site_name">
          {{ $t('Message.Components.Account.XWelcomeBack', { value: mainStore.getInfoData.site_name }) }}
        </p> -->
      </div>

      <!-- 表单区 -->
      <v-form ref="form" @submit.prevent="OnSubmit">
        <FieldName
          :label="$t('Message.Components.Account.UserNameOrEMail')"
          @inputv="(val) => { UserNameOrEMail = val }"
        />

        <div class="login-field-gap" />

        <FieldPassword
          :label="$t('Message.Components.Account.Password')"
          @inputv="(val) => { Password = val }"
        />

        <div v-if="ErrorCount >= 3" class="login-field-gap" />

        <FieldCaptcha
          v-if="ErrorCount >= 3"
          :label="$t('Message.Components.Account.ImageCode')"
          @inputv="(val) => { Captcha = val }"
        />

        <div class="login-field-gap" />
        <div class="login-field-gap" />

        <v-btn
          rounded="lg"
          color="primary"
          size="x-large"
          block
          elevation="0"
          :loading="is_loading"
          @click="OnSubmit"
          class="login-submit"
        >
          {{ $t('Message.Components.Account.Login') }}
        </v-btn>
      </v-form>

      <!-- 底部链接 -->
      <div class="login-links">
        <v-btn variant="plain" @click="dialogStore.setResetDialog(true)" rounded="lg" >
          {{ $t('Message.Components.Account.ForgetPassword') }}
        </v-btn>
        <v-btn variant="plain"  @click="dialogStore.setRegisterDialog(true)" rounded="lg">
          {{ $t('Message.Components.Account.Register') }}
        </v-btn>
      </div>

      <!-- OAuth 区域 -->
      <div class="login-oauth" v-if="hasOauth">
        <div class="login-divider">
          <v-divider />
          <span class="login-divider-text">{{ $t('Message.Components.Account.ThirdPartyAccounts') }}</span>
          <v-divider />
        </div>
        <div class="login-oauth-buttons">
          <GithubButtonV1 v-if="oauthList.github==true" />
          <GoogleButtonV1 v-if="oauthList.google==true" />
          <MicrosoftButtonV1 v-if="oauthList.microsoft==true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'
import { useDialogStore } from '@/stores/dialog'
import FieldName from '@/components/account/components/field-name.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldCaptcha from '@/components/account/components/field-captcha.vue'
import GithubButtonV1 from '@/components/account/components/oauth-v1/github-button.vue'
import GoogleButtonV1 from '@/components/account/components/oauth-v1/google-button.vue'
import MicrosoftButtonV1 from '@/components/account/components/oauth-v1/microsoft-button.vue'
import { Login, SetUserToken, GetUserToken, RemoveUserToken, Auto_Login } from '@/api/global.js'

export default {
  name: 'LoginPage',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromPath = from?.path || ''
    })
  },
  components: {
    FieldName,
    FieldPassword,
    FieldCaptcha,
    GithubButtonV1,
    GoogleButtonV1,
    MicrosoftButtonV1,
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      snackbarStore: useSnackbarStore(),
      dialogStore: useDialogStore(),
      UserNameOrEMail: '',
      Password: '',
      Captcha: '',
      fromPath: '',
      ErrorCount: 0,
      is_loading: false,
    }
  },
  computed: {
    oauthList() {
      return this.mainStore.getAppBaseInfo?.oauth_list || {}
    },
    hasOauth() {
      return this.oauthList.github || this.oauthList.google || this.oauthList.microsoft
    },
  },
  methods: {
    validate() {
      return (
        this.UserNameOrEMail !== '' &&
        this.Password !== '' &&
        (this.ErrorCount < 3 || this.Captcha !== '')
      )
    },
    async OnSubmit() {
      RemoveUserToken()
      if (!this.validate()) return
      this.is_loading = true
      const response = await Login({
        username_or_email: this.UserNameOrEMail,
        password: this.Password,
        image_capthca: this.Captcha,
      })
      if (response.data.is_login == true) {
        this.is_loading = false
        SetUserToken(response.data.token)
        this.Auto_Login()
      } else {
        this.is_loading = false
        this.ErrorCount++
      }
    },
    async Auto_Login() {
      const token = GetUserToken()
      if (!token) {
        this.is_loading = false
        return
      }
      this.is_loading = true
      const response = await Auto_Login(token)
      if (response.data.is_login == true) {
        this.userStore.setIsLogin(true)
        this.userStore.setUserToken(token)
        this.userStore.setUser(response.data.user)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.XWelcomeBack', {
            value: response.data.user.username,
          }),
        })
        this.is_loading = false
        const targetPath = this.fromPath?.includes('admin')
          ? this.$G_UrlHeaderLang() + '/admin'
          : this.$G_UrlHeaderLang() + '/'
        this.$router.push(targetPath)
      } else {
        this.is_loading = false
        this.userStore.setIsLogin(false)
        this.userStore.setUserToken('')
        this.userStore.setUser(this.userStore.getDefaultUser)
        RemoveUserToken()
      }
    },
  },
  mounted() {
    this.Auto_Login()
  },
  watch: {
    $route(to) {
      if (to.name === 'login' || to.name === 'lang-login') {
        this.mainStore.setDrawer(false)
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 94vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 480px;
  padding: 48px 40px 36px;
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 28px;
}

/* 品牌区 */
.login-brand {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
}

.login-title {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 8px;
  /* color: rgba(var(--v-theme-on-surface), 0.87); */
}

.login-subtitle {
  font-size: 16px;
  margin: 0;
  /* color: rgba(var(--v-theme-on-surface), 0.6); */
}

/* 表单间距 */
.login-field-gap {
  height: 16px;
}

.login-submit {
  margin-bottom: 16px;
}

/* 底部链接 */
.login-links {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

/* OAuth */
.login-oauth {
  text-align: center;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.login-divider :deep(.v-divider) {
  flex: 1;
}

.login-divider-text {
  font-size: 13px;
  /* color: rgba(var(--v-theme-on-surface), 0.6); */
  white-space: nowrap;
}

.login-oauth-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .login-card {
    padding: 32px 24px 24px;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>

<template>
  <v-dialog v-model="model" scrollable max-width="380px">
    <v-card rounded="lg"  elevation="0"
    :title="$t('Message.Components.Account.Register')"
    >
      <!-- <v-card-title>
        {{ $t('Message.Components.Account.Register') }}
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
          <FieldEMail :show="!NextStep" key="Register-FieldEMail" :label="$t('Message.Components.Account.EMail')"
            @inputv="(val) => { EMail = val }" />
          <FieldPassword :show="!NextStep" key="Register-Password" :label="$t('Message.Components.Account.Password')"
            @inputv="(val) => { Password = val }" />
          <FieldEmailCode :show="!NextStep" :email="EMail" @inputv="(val) => { EmailCode = val }" :label="$t('Message.Components.Account.EMailCode')"/>
          <FieldName v-if="NextStep" key="Register-FieldName" :label="$t('Message.Components.Account.UserName')"
            @inputv="(val) => { UserName = val }" />
          <Submit  :text="$t('Message.Components.Account.NextStep')" :show="!NextStep" colors="secondary"
            @submit_click="OnNextStep" />
          <Submit :text="$t('Message.Components.Account.BackStep')" :show="NextStep" classes="more-option" :is_text="true"
            colors="secondary" @submit_click="NextStep = !NextStep" />
            
          <br v-show="NextStep" />
          <Submit :text="$t('Message.Components.Account.Register')" :show="NextStep" colors="secondary" 
          @submit_click="OnSubmit"
            :loading="is_loading" />
          <br />
          <!-- <br /> -->
          <FieldMore :items="FieldMoreItems" :dialog="model" :show="!NextStep" @item_select="item_select" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import FieldName from '@/components/account/components/field-name.vue'
import FieldEMail from '@/components/account/components/field-email.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldEmailCode from '@/components/account/components/field-email-code.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import GithubButtonV1 from './components/oauth-v1/github-button.vue'
import GoogleButtonV1 from './components/oauth-v1/google-button.vue'
import MicrosoftButtonV1 from './components/oauth-v1/microsoft-button.vue'
// import SsoButtonV1 from './components/oauth-v1/sso-button.vue'
import {
  AddUser,
} from '@/api/global.js';

// import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
// import { useSnackbarStore } from '@/stores/snackbar'
import { useMainStore } from '@/stores/main'
export default {
  name: "register-dialog",
  components: {
    FieldName,
    FieldEMail,
    FieldPassword,
    FieldEmailCode,
    FieldMore,
    Submit,
    // SsoButtonV1,
    GithubButtonV1,
    GoogleButtonV1,
    MicrosoftButtonV1,
  },
  data: () => ({
    is_loading: false,
    NextStep: false,
    EMail: "",
    UserName: "",
    Password: "",
    EmailCode: "",
    FieldMoreItems: [
      {
        text: "Message.Components.Account.ForgetPassword",
        value: "ForgetPassword"
      },
      {
        text: "Message.Components.Account.Login",
        value: "Login"
      }
    ],
    CookieServer: false,
    dialogStore: useDialogStore(),
    mainStore: useMainStore(),
    // model: false,
  }),
  methods: {
    item_select(value) {
      this.dialogStore.setRegisterDialog(false)
      switch (value) {
        case "ForgetPassword":
          this.dialogStore.setResetDialog(true)
          break;
        case "Login":
          this.dialogStore.setLoginDialog(true)
          break;
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    OnNextStep() {
      if (!this.validate()) {
        return
      }
      this.NextStep = true
    },
    async OnSubmit() {
      const response = await AddUser(
        {
          email: this.EMail,
          password: this.Password,
          email_captcha: this.EmailCode,
          username: this.UserName,
          language: this.$i18n.locale,
        }
      )
      // if(response.data.snackbar){
      //   this.$store.dispatch('Snackbar/Show_Snackbar', {
      //     text: response.data.snackbar
      //   })
      // }
      if(response.data.is_add == true) {
        this.loading = false
        this.dialogStore.SetRegisterDialog(false)
      }else{
        this.loading = false
      }
    },
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getRegisterDialog
      },
      set(val) {
        this.dialogStore.setRegisterDialog(val)
      }
    }
  },
}
</script>
<style lang="less"></style>
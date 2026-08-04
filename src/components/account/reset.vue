<template>
  <v-dialog v-model="model" scrollable max-width="380px" elevation="0">
    <v-card rounded="lg"  elevation="0" 
    :title="$t('Message.Components.Account.ForgetPassword')"
    >
      <!-- <v-card-title class="h5">{{ $t('Message.Components.Account.ForgetPassword') }}</v-card-title> -->
      <v-card-text>
        <v-form ref="form">
          <FieldEMail :show="!NextStep" key="Reset-FieldEMail" @inputv="(val) => { EMail = val }" :label="$t('Message.Components.Account.EMail')"/>
          <FieldEmailCode :email="EMail" :show="!NextStep" key="Reset-FieldEmailCode"
            @inputv="(val) => { EmailCode = val }" :label="$t('Message.Components.Account.EMailCode')"/>
          <FieldPassword v-if="NextStep" :label="$t('Message.Components.Account.Password')" key="Reset-FieldPassword" @inputv="(val) => { Password = val }" />
          <Submit :text="$t('Message.Components.Account.NextStep')" :show="!NextStep" colors="red"
            @submit_click="OnNextStep" />
          <Submit :text="$t('Message.Components.Account.BackStep')" :show="NextStep" classes="more-option" :is_text="true"
            colors="red" @submit_click="NextStep = !NextStep" />
          <br v-if="NextStep"/>
          <Submit :text="$t('Message.Components.Account.Reset')" :show="NextStep" colors="red" 
            @submit_click="OnSubmit"
            :loading="is_loading" />
          <br />
          <FieldMore :items="FieldMoreItems" :show="!NextStep" @item_select="item_select" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import FieldEMail from '@/components/account/components/field-email.vue'
import FieldEmailCode from '@/components/account/components/field-email-code.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import {
  Reset
} from '@/api/global.js'
import { useDialogStore } from '@/stores/dialog'
export default {
  name: "reset-dialog",
  data: () => ({
    is_loading: false,
    EMail: "",
    Password: "",
    EmailCode: "",
    NextStep: false,
    FieldMoreItems: [
      {
        text: "Message.Components.Account.Login",
        value: "Login"
      },
      {
        text: "Message.Components.Account.Register",
        value: "Register"
      }
    ],
    // model: false,
  }),
  components: {
    FieldEMail,
    FieldEmailCode,
    FieldPassword,
    FieldMore,
    Submit,
  },
  methods: {
    item_select(value) {
      useDialogStore().setResetDialog(false)
      switch (value) {
        case "Login":
          useDialogStore().setLoginDialog(true)
          break;
        case "Register":
          useDialogStore().setRegisterDialog(true)
          break;
      }
    },
    OnNextStep() {
      if (!this.validate()) {
        return
      }
      this.NextStep = true
    },
    async OnSubmit() {
      // console.log('OnSubmit')
      if (!this.validate()) {
        // console.log('validate failed')
        return
      }
      this.is_loading = true
      const response = await Reset({
        email: this.EMail,
        password: this.Password,
        email_captcha: this.EmailCode,
      })
      if (response.data.is_reset == true) {
        this.loading = false
        useDialogStore().setResetDialog(false)
      }else{
        this.loading = false
      }
      this.loading = false
    },
    validate() {
      // return this.$refs.form.validate()
      // return this.EMail != '' && this.EmailCode != '' && this.Password != ''
      if(!this.NextStep){
        return this.$refs.form.validate()
      }
      return this.EMail != '' && this.EmailCode != '' && this.Password != ''
    },
  },
  computed: {
    model: {
      get(){
        return useDialogStore().getResetDialog
      },
      set(val){
        useDialogStore().setResetDialog(val)
      }
    }
  },
}
</script>
<style lang="less"></style>
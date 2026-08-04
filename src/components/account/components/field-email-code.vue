<template>
  <div class="send-email-field" v-show="show">
    <v-text-field color="primary"    :label="label||$t('Message.Components.Account.EMailCode')" :required="required" type="text" class="captcha-field" :rules="[
      v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
      v => (v || '').length <= 6 || $t('Message.Components.Account.MaxLengthExceeded')
    ]" v-model="value">

      <template v-slot:append-inner>
        <v-btn rounded="lg"  :loading="is_loading" class="send-email" variant="outlined"
        @click="OnSendEmailClick()"
        :disabled="Loading_Time>0||!TestMail"
        >
          <!-- {{ $t('Message.Components.Account.SendEMailCode') }}
          <template v-slot:loader>
            <span>{{ Loading_Time }}</span>
          </template> -->

          {{ 
          Loading_Time>0?Loading_Time:$t('Message.Components.Account.SendEMailCode')
          }}
        </v-btn>
      </template>

    </v-text-field>
  </div>
</template>
<script>
import {
  GetEmailCaptcha,
} from '@/api/global.js';
export default {
  name: "common-account-field-email-code",
  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    email: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    value: "",
    show_resend_countdown: false,
    is_loading: false,
    Loading_Time: 0,
  }),
  computed: {
    TestMail() {
      // console.log(this.email)
      return /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(this.email)
    }
  },
  methods: {
    async OnSendEmailClick() {
      // //必须验证邮箱格式
      // if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      //   return
      // }

      this.is_loading = true
      this.Loading_Time = 60
      const response = await GetEmailCaptcha({
        email:this.email, 
        lang:this.$i18n.locale
      })
      if (response.data.is_send == true) {
        this.is_loading = false
        // this.Loading_Time = 60
      } else {
        this.is_loading = false
        this.Loading_Time = 0
      }
    }
  },
  watch: {
    value: function (val) {
      this.$emit("inputv", val);
    },
    Loading_Time: function (val) {
      // if (!this.is_loading) {
      //   this.Loading_Time = 0
      //   return
      // }
      if (val != 0) {
        // if (!this.is_loading) {
        //   this.Loading_Time = 0
        //   return
        // }
        setTimeout(() => {
          this.Loading_Time = val - 1
        }, 1000);
      } else {
        this.is_loading = false
      }
    }
  }
}
</script>
<style></style>
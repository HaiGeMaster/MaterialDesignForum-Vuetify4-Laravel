<template>
  <v-container style="max-width: 830px;" v-if="userStore.getUser.user_group.ability_admin_manage_option">

    <v-card rounded="lg" class="mx-auto" v-if="userStore.getIsLogin">
      <v-toolbar :title="$t('Message.Admin.Options.Mail')">
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
        <v-text-field color="primary" v-model="form_data.MAIL_HOST" :label="$t('Message.Admin.Options.SmtpHost')" />

        <v-text-field color="primary" v-model="form_data.MAIL_USERNAME"
          :label="$t('Message.Admin.Options.SmtpUserName')" />

        <v-text-field color="primary" v-model="form_data.MAIL_PASSWORD"
          :label="$t('Message.Admin.Options.SmtpPassword')" />

        <v-text-field color="primary" v-model="form_data.MAIL_PORT" :label="$t('Message.Admin.Options.SmtpProt')" />

        <v-select v-model="form_data.MAIL_ENCRYPTION" :items="[
          {
            text: 'NULL',
            value: ''
          },
          {
            text: 'SSL',
            value: 'ssl'
          },
          {
            text: 'TLS',
            value: 'tls'
          }
        ]" :label="$t('Message.Admin.Options.SmtpSecure')" item-value="value" item-title="text"></v-select>

        <v-text-field color="primary" v-model="form_data.MAIL_FROM_ADDRESS"
          :label="$t('Message.Admin.Options.SmtpReplyTo')" />

        <v-text-field color="primary" v-model="form_data.MAIL_FROM_NAME"
          :label="$t('Message.Admin.Options.SmtpSendName')" />
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script>
// import ReturnButton from '@/components/return-button/index.vue'


import {
  // GetMailData,
  // SetMailData,
  GetMailConfig,
  SetMailConfig,
} from '@/api/global.js'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar.js'
export default {
  name: 'admin-page-options-mail',
  components: {
    // ReturnButton,
  },
  data: () => ({
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    form_data: {
      // smtp_host: '',
      // smtp_username: '',
      // smtp_password: '',
      // smtp_port: '',
      // smtp_secure: '',
      // smtp_reply_to: '',
      // smtp_send_name: '',
      MAIL_MAILER: '',
      MAIL_HOST: '',
      MAIL_PORT: '',
      MAIL_ENCRYPTION: '',
      MAIL_USERNAME: '',
      MAIL_PASSWORD: '',
      MAIL_FROM_ADDRESS: '',
      MAIL_FROM_NAME: '',
      

// # ==========================================
// # 邮件配置（SMTP）
// # ==========================================
// # 邮件驱动（smtp/sendmail/mailgun/log/array）
// MAIL_MAILER=smtp
// # SMTP 服务器地址
// MAIL_HOST=smtp.qq.com
// # SMTP 端口（25/465-SSL/587-TLS）
// MAIL_PORT=465
// # 加密方式（ssl/tls/null）
// MAIL_ENCRYPTION=ssl
// # 发件邮箱账号
// MAIL_USERNAME=xbedrock@foxmail.com
// # 邮箱授权码（非登录密码）
// MAIL_PASSWORD=
// # 发件人地址
// MAIL_FROM_ADDRESS=xbedrock@foxmail.com
// # 发件人名称
// MAIL_FROM_NAME=MaterialDesignForum
    },
    is_loading: false,
  }),
  methods: {
    async GetData() {
      var user_token = this.$G_GetUserToken()
      const res = await GetMailConfig({
        user_token: user_token
      })
      // console.log(res.data.data)
      
      if (res.data.is_get) {
        // this.form_data = res.data.data
        this.form_data = res.data.data
               // console.log(this.form_data)
        this.$forceUpdate()
      }
    },
    async SetData() {
      this.is_loading = true
      var user_token = this.$G_GetUserToken()
      const res = await SetMailConfig({
        mail_info: this.form_data,
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
  mounted() {
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
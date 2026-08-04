<template>
  <v-card outlined>

    <v-card-text>
      <v-form ref="form" v-model="form" lazy-validation>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_host" :label="$t('Message.Install.SMTPServerAddress')"></v-text-field>

        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_port" :label="$t('Message.Install.SMTPServerPort')"></v-text-field>

        <!-- <v-text-field color="primary"   :label="$t('Message.Install.SMTPServerSecurity')"></v-text-field> -->
        <v-select :disabled="disabled" v-model="form_data.smtp_secure" :items="[
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
        ]" :label="$t('Message.Install.SMTPServerSecurity')" item-value="value" item-text="text"></v-select>

        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_send_name" :label="$t('Message.Install.SMTPServerSendName')"></v-text-field>

        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_username" :label="$t('Message.Install.SMTPServerUsername')"></v-text-field>

        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_password" :label="$t('Message.Install.SMTPServerPassword')"></v-text-field>

        <v-divider></v-divider>

        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.smtp_email" :label="$t('Message.Install.TestEMail')"></v-text-field>

      </v-form>
      <v-btn rounded="lg"  :disabled="disabled" :color="SMTP_OK
          ? 'primary'
          : 'accent'
        " @click="SMTP_OK ? SetSqlMail() : TestMail()"
        :loading="is_loading"
        >
        {{
          !SMTP_OK
          ? $t('Message.Install.SMTPServerConnectionTest')
          : $t('Message.Install.Continue')
        }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  TestMail,
  SetMail
} from '@/api/global.js'
export default {
  name: 'Install-index-2',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: false,
      SMTP_OK: false,
      // form_data: {
      //   smtp_host: 'smtp.qq.com',
      //   smtp_port: '465',
      //   smtp_secure: 'ssl',
      //   smtp_send_name: 'MDF',
      //   smtp_username: '2652549974@qq.com',
      //   smtp_password: 'jjnmvhcholleecgj',
      //   smtp_email: '2652549974@qq.com',
      // },
      form_data: {
        smtp_host: '',
        smtp_port: '',
        smtp_secure: '',
        smtp_username: '',
        smtp_password: '',
        smtp_email: '',
      },
      is_loading: false,
    }
  },
  methods: {
    async TestMail() {
      if (this.$refs.form.validate()) {
        this.is_loading = true
        const res = await TestMail({
          smtp_host: this.form_data.smtp_host,
          smtp_port: this.form_data.smtp_port,
          smtp_secure: this.form_data.smtp_secure,
          smtp_send_name: this.form_data.smtp_send_name,
          smtp_username: this.form_data.smtp_username,
          smtp_password: this.form_data.smtp_password,
          smtp_email: this.form_data.smtp_email,
        })
        if (res.data.mail) {
          this.SMTP_OK = true
          this.is_loading = false
        } else {
          this.SMTP_OK = false
          this.is_loading = false
        }
      }
    },
    async SetSqlMail() {
      this.is_loading = true
      const res = await SetMail({
        smtp_host: this.form_data.smtp_host,
        smtp_port: this.form_data.smtp_port,
        smtp_secure: this.form_data.smtp_secure,
        smtp_send_name: this.form_data.smtp_send_name,
        smtp_username: this.form_data.smtp_username,
        smtp_password: this.form_data.smtp_password,
      })
      if (res.data.mail) {
        this.is_loading = false
        this.$emit('OnContinue')
      } else {
        this.is_loading = false
      }
    }
  }
}
</script>
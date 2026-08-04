<template>
  <v-card outlined>

    <v-card-text>
      <small>{{ $t('Message.Install.PleaseEnsureThatYouHaveImportedTheDatabaseDemotableSQLFileToMySQL') }}</small>
      <v-form ref="form" v-model="form" lazy-validation>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.database_name" :label="$t('Message.Install.DatabaseName')"></v-text-field>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.database_username" :label="$t('Message.Install.DatabaseUserName')"></v-text-field>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.database_password" :label="$t('Message.Install.DatabasePassword')"></v-text-field>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.database_address" :label="$t('Message.Install.DatabaseAddress')"></v-text-field>
        <!-- <v-text-field color="primary"   v-model="form_data.database_prefix" :label="$t('Message.Install.DatabasePrefix')"></v-text-field> -->
      </v-form>
      <v-btn rounded="lg"  :disabled="button_disabled" color="primary" :loading="is_loading" @click="OnSubmit()">
        {{ $t('Message.Install.Continue') }}
      </v-btn>
      <br v-show="show_error">
      <small v-show="show_error" class="red--text">{{ $t('Message.Install.IfTheFormSettingsAreUnsuccessfulItIsRecommendedToManuallyConfigureYourDatabaseInformationInConfigConfigPhp') }}</small>
        
    </v-card-text>
  </v-card>
</template>
<script>
import {
  SetInstallConfig
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
      // form_data: {
      //   database_name: 'demo',
      //   database_username: 'root',
      //   database_password: 'root',
      //   database_address: 'localhost',
      //   database_prefix: 'mdf_',
      // },
      form_data: {
        database_name: '',
        database_username: '',
        database_password: '',
        database_address: '',
        // database_name: 'demo',
        // database_username: 'root',
        // database_password: 'root',
        // database_address: 'localhost',
        database_prefix: '',
      },
      is_loading: false,
      // button_disabled: t,
      show_error: true,
    }
  },
  computed: {
    button_disabled() {
      // || this.form_data.database_address === ''
      return this.form_data.database_name === '' || this.form_data.database_username === '' || this.form_data.database_password === ''
    }
  },
  methods: {
    async OnSubmit() {
      if (this.$refs.form.validate()) {
        this.is_loading = true
        const res = await SetInstallConfig({
          mysql_database: this.form_data.database_name,
          mysql_username: this.form_data.database_username,
          mysql_password: this.form_data.database_password,
          mysql_hostname: this.form_data.database_address,
          mysql_prefix: this.form_data.database_prefix,
        })
        if (res.data.is_install) {
          this.is_loading = false
          this.$emit('OnContinue')
        } else {
          this.show_error = true
          this.is_loading = false
        }
      }
    },
  }
}
</script>
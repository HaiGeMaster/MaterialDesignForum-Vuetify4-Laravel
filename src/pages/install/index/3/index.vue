<template>
  <v-card outlined>

    <v-card-text>
      <v-form ref="form" v-model="form" lazy-validation>
        <v-text-field color="primary"   :disabled="disabled" v-model="form_data.site_name" :label="$t('Message.Install.WebName')"></v-text-field>
        <v-select :disabled="disabled" v-model="form_data.default_language" :items="LanguageList"
          :label="$t('Message.Admin.Options.DefaultLanguage') + ':' + form_data.default_language" item-value="value"
          item-text="text"></v-select>
      </v-form>
      <v-btn rounded="lg"  :disabled="disabled" color="primary" :loading="is_loading" @click="OnSubmit()">
        {{ $t('Message.Install.Continue') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  SetWebInfo
} from '@/api/global.js'
//import messages from '@/assets/language/language.js'
export default {
  name: 'Install-index-3',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      LanguageList: [],
      form: false,
      form_data: {
        site_name: 'Material Design Forum',
        default_language: 'zh_CN',
      },
      // form_data: {
      //   site_name: '',
      //   default_language: '',
      // },
      is_loading: false,
    }
  },
  computed: {
    ReturnGetLangMessages() {
      return this.$store.getters.GetLangMessages
    },
  },
  methods: {
    SetLanguageList() {
      const messages = this.$store.getters.GetLangMessages
      // console.log(messages)
      for (let langCode in messages) {
        if (messages[langCode].Message.langInfo.show) {
          const langName = messages[langCode].Message.langInfo.langname
          const usabilitys = messages[langCode].Message.langInfo.usability
          this.LanguageList.push({ text: langName, value: langCode, disabled: !usabilitys })
        }
      }
    },
    async OnSubmit() {
      if (this.$refs.form.validate()) {
        this.is_loading = true
        const res = await SetWebInfo({
          site_name: this.form_data.site_name,
          default_language: this.form_data.default_language,
        })
        if (res.data.web) {
          this.is_loading = false
          this.$emit('OnContinue')
        } else {
          this.is_loading = false
        }
      }
    }
  },
  // created() {
  //   this.SetLanguageList()
  // },
  watch: {
    ReturnGetLangMessages(newVal, oldVal) {
      this.SetLanguageList()
    }
  }
}
</script>
<template>
  <v-container fluid style="max-width:830px">
    <v-stepper v-model="model" vertical >

      <v-stepper-step :complete="model > 1" step="1">
        {{ $t('Message.Install.DatabaseInformation') }}
      </v-stepper-step>

      <v-stepper-content step="1">

        <Step1 :disabled="disabled" @OnContinue="model = 2" />

      </v-stepper-content>

      <v-stepper-step :complete="model > 2" step="2">
        {{ $t('Message.Install.SetSystemEmailInformation') }}
      </v-stepper-step>

      <v-stepper-content step="2">
        <Step2 :disabled="disabled" @OnContinue="model = 3" />
      </v-stepper-content>

      <v-stepper-step :complete="model > 3" step="3">
        {{ $t('Message.Install.SetWebsiteInformation') }}
      </v-stepper-step>

      <v-stepper-content step="3">
        <Step3 :disabled="disabled" @OnContinue="model = 4" />
      </v-stepper-content>

      <v-stepper-step :complete="model > 3" step="4">
        {{ $t('Message.Install.Start') }}
      </v-stepper-step>

      <v-stepper-content step="4">
        <Step4 :disabled="disabled" />
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import Step1 from './1/index.vue'
import Step2 from './2/index.vue'
import Step3 from './3/index.vue'
import Step4 from './4/index.vue'
import {
  GetInstallInfoJson
} from '@/api/global.js'
export default {
  name: 'Install-index',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  data() {
    return {
      model: 1,
      sql_form_valid: false,
      disabled: false,
    }
  },
  methods: {
    async GetInstallInfoJson() {
      const res = await GetInstallInfoJson()
      if (res.data.step != null) {
        if (res.data.step == 1 || res.data.step == 2 || res.data.step == 3 || res.data.step == 4) {
          this.model = res.data.step
        }
      }else{
        this.disabled = true
      }

    }
  },
  created() {
    this.GetInstallInfoJson()
  }
}
</script>
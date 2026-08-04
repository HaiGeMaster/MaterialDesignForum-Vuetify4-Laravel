<template>
  <v-card outlined
  :style="disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'
    " :color="disabled ? ($vuetify.theme.dark ? '#474747' : '#e0e0e0') : 'primary'
    " @click="OnSubmit()">

    <v-card-text>

      <h1>
        <v-icon size="80">mdi-selection-ellipse-arrow-inside</v-icon>{{ $t('Message.Install.Start') }}
      </h1>
      <br />
      <small>{{ $t('Message.Install.TheFirstRegisteredUserInTheStepWillBecomeAnAdministrator') }}</small>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  SetWebChange
} from '@/api/global.js'
export default {
  name: 'Install-index-4',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      is_loading: false,
    }
  },
  methods: {
    async OnSubmit() {

      //if (this.$refs.form.validate()) {
      this.is_loading = true
      const res = await SetWebChange()
      if (res.data.web) {
        // this.$cookies.remove('lang')
        localStorage.removeItem('lang')
        localStorage.removeItem('theme')
        this.is_loading = false
        //this.$emit('OnContinue')

        // 路由回退到首页
        // this.$router.push('/')

        window.location.href = '/'
      } else {
        this.is_loading = false
      }
      //}
    }
  },
}
</script>

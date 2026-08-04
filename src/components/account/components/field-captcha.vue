<template>
  <div class="captcha-field" v-show="show">
    <v-text-field color="primary"   
    :label="label||$t('Message.Components.Account.ImageCode')" 
    :required="required" 
    type="text" 
    :loading="is_loading"
    :hint="$t('Message.Components.Account.WeSuspectYouAreABot')"
    :rules="[
      v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
      v => (v || '').length <= 6 || $t('Message.Components.Account.MaxLengthExceeded')
    ]" 
    v-model="value">
      <template v-slot:append-inner>
        <!-- `${$G_ImgHandle('/api/user/image_captcha/')}${img_time}` -->
        <img class="captcha-image" 
          :src="`${$G_ImgHandle('/user/image_captcha/')}${img_time}`" 
          @click="OnImgClick" :title="$t('Message.Components.Account.RefreshImageCode')" />
      </template>
    </v-text-field>
  </div>
</template>
<script>
// import {
//   GetImageCaptcha
// } from '@/api/global.js';
export default {
  name: "common-account-field-captcha",
  props:{
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
  },
  data: () => ({
    value: "",
    img: "",
    img_time:0,
    is_loading:false,
  }),
  methods:{
    async OnImgClick(){
      this.is_loading = true
      // this.img = GetImageCaptcha()
      // this.img = this.$axios.defaults.baseURL + '/api/user/image_captcha/' + new Date().getTime();
      this.img_time = new Date().getTime()
      setTimeout(() => {
        this.is_loading = false
      }, 5000);
    },
    // GetImageCaptchaString(){
    //   return GetImageCaptcha()
    // }
  },
  watch: {
    value: function (val) {
      this.$emit("inputv", val);
    }
  }
}
</script>
<style>

</style>
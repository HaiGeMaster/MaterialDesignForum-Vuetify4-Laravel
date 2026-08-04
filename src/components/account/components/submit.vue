<template>
  <v-btn rounded="lg"   v-show="show" :class="[classes]" :color="colors" :text="is_text" :disabled="disabled"
     :loading="loading" size="x-large" block elevation="0" @click="$emit('submit_click')">
    {{ text || $t('Message.Components.Account.Login') }}
  </v-btn>
</template>
<script>
// import { GetOauthLink } from '@/api/global.js';
export default {
  name: "common-account-dialog-action-btn",
  props: {
    // oauth_button: {
    //   type: Boolean,
    //   default: false
    // },
    text: {
      type: String,
      default: '',
    },
    colors: {
      type: String,
      default: "primary"
    },
    is_text: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: "action-btn"
    },
    show: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      // oauths_link: {
      //   github: '',
      //   microsoft: '',
      // },
    };
  },
  methods: {
    // async GetOauthLink() {
    //   if(!this.oauth_button){
    //     return
    //   }
    //   this.oauths_link.github = await GetOauthLink('github')
    //   this.oauths_link.microsoft = await GetOauthLink('microsoft')
    //   this.$forceUpdate();
    // }
  },
  created(){
    // this.GetOauthLink();
  },
}
</script>
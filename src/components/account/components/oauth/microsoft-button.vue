<template>
  <v-btn  v-show="oauths_link" variant="text" icon @click="Onclick"  >
    <img :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')" style="width: 24px;height: 24px;" />

    <v-tooltip activator="parent" location="top">
      {{
        DisabledRule ? $t('Message.App.TheCurrentEnvironmentIsUnavailable') :
          $t('Message.Components.Account.LoginWithMicrosoft')
      }}
    </v-tooltip>

  </v-btn>

</template>
<script>
import {
  GetOauthLink,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js';
export default {
  name: "common-account-components-oauth-microsoft-button",
  data: () => ({
    oauths_link: '',
  }),
  computed: {
    DisabledRule() {
      return IsTauri() || IsElectron() || IsMobileApp()
    }
  },
  methods: {
    async GetOauthLink() {
      this.oauths_link = await GetOauthLink('microsoft')
      this.$forceUpdate();
    },
    Onclick() {
      if (this.DisabledRule) {
        return;
      }
      window.open(this.oauths_link, '_blank');
    }
  },
  created() {
    this.GetOauthLink();
  }
}
</script>
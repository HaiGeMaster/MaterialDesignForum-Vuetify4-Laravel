<template>
  <v-btn  variant="text" icon @click="Onclick"  >
    <!-- <img :src="$G_ImgHandle('/assets/fixed_content/sso.png')" style="width: 24px;height: 24px;" /> -->
    <!-- <strong>SSO</strong> -->
    <v-img
      :src="$G_ImgHandle('/assets/fixed_content/sso.png')"
      style="width: 24px; height: 24px"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-tooltip activator="parent" location="top">
      {{
        DisabledRule ? $t('Message.App.TheCurrentEnvironmentIsUnavailable') :
          $t('Message.Components.Account.LoginWithSSO')
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
  name: "common-account-components-oauth-v1-sso-button",
  data: () => ({
    oauths_link: '',
    sso_client_main_name: '',
  }),
  computed: {
    DisabledRule() {
      return IsTauri() || IsElectron() || IsMobileApp()
    }
  },
  methods: {
    async GetOauthLink() {
      this.oauths_link = await GetOauthLink('sso')
      this.sso_client_main_name = window.sso_client_main_name;
      // console.log(this.sso_client_main_name);
      this.$forceUpdate();
    },
    Onclick() {
      if (this.DisabledRule) {
        return;
      }
      window.open(this.oauths_link);
    }
  },
  created() {
    this.GetOauthLink();
  }
}
</script>

<template>
  <v-btn variant="text" icon @click="Onclick">
    <img :src="$G_ImgHandle('/assets/fixed_content/github.png')" style="width: 24px;height: 24px;" />

    <v-tooltip activator="parent" location="top">
      {{
        $t('Message.Components.Account.LoginWithGithub')
      }}
    </v-tooltip>

  </v-btn>
</template>
<script>
export default {
  name: "common-account-components-oauth-v1-github-button",
  methods: {
    Onclick() {
      window.open(this.$G_CrossDomain() + '/auth/github/redirect');
    }
  },
}
</script>
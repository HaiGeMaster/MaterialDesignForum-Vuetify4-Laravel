<template>
  <v-btn variant="text" icon @click="Onclick">
    <v-img
      :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')"
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

        $t('Message.Components.Account.LoginWithMicrosoft')
      }}
    </v-tooltip>

  </v-btn>

</template>
<script>
export default {
  name: "common-account-components-oauth-v1-microsoft-button",
  methods: {
    Onclick() {
      window.open(this.$G_CrossDomain() + '/auth/microsoft/redirect');
    }
  },
}
</script>

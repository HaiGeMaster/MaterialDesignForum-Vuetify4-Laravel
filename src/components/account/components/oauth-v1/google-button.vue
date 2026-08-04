<template>
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <!-- -->
  <v-btn  variant="text" icon @click="Onclick" >
    <img :src="$G_ImgHandle('/assets/fixed_content/google.png')" style="width: 24px;height: 24px;" />

    <v-tooltip activator="parent" location="top">
      {{
          $t('Message.Components.Account.LoginWithGoogle')
      }}
    </v-tooltip>

  </v-btn>

</template>
<script>
export default {
  name: "common-account-components-oauth-v1-google-button",
  methods: {
    Onclick() {
      window.open(this.$G_CrossDomain() + '/auth/google/redirect');
    }
  },
}
</script>
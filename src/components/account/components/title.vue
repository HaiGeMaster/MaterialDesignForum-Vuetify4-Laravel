<template>
  <div class="dialog-title" v-show="show">
    <v-btn rounded="lg"   icon class="close">
      <v-icon color="white">{{ icon }}</v-icon>
    </v-btn>
    {{ text || $t('Message.Components.Account.Login') }}
  </div>
</template>
<script>
export default {
  name: "common-account-dialog-title",
  props: {
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "mdi-close"
    },
    mode_class: {
      type: String,
      default: "login"
    },
    show: {
      type: Boolean,
      default: true
    },
  }
}
</script>
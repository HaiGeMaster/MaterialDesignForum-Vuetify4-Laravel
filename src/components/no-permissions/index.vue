<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="secondary" v-bind="attrs" v-on="on">
        {{ icon }}
      </v-icon>
    </template>
    <span>{{ message || $t('Message.App.InsufficientPermissions') }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "no-permissions",
  props: {
    icon: {
      type: String,
      default: "mdi-shield-alert"
    },
    message: {
      type: String,
      default: ""
    }
  }
}
</script>
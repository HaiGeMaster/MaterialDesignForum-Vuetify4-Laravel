<template>
  <v-text-field color="primary"    
  v-show="show" autocomplete="current-password"
  :label="label||$t('Message.Components.Account.Password')"
  :required="required"
  :append-inner-icon="showt ? 'mdi-eye' : 'mdi-eye-off'"
  @click:append-inner="showt = !showt"
  :type="showt ? 'text' : 'password'"
  :rules="[
    v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
    v => (v || '').length <= 30 || $t('Message.Components.Account.MaxLengthExceeded')
  ]"
  v-model="value"
      name="password"
  >
  </v-text-field>
</template>
<script>
export default {
  name: "common-account-field-password",
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
    showt: false,
  }),
  watch: {
    value: function (val) {
            this.$emit("inputv", val);
    }
  }
}
</script>
<style></style>

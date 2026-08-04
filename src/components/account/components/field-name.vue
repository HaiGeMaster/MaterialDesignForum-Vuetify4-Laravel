<template>
  <v-text-field color="primary"    
  v-show="show" autocomplete="username"
  :label="label||$t('Message.Components.Account.EMail')"
  :required="required"
  type="text"
  :rules="[
    v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
    v => (v || '').length <= 50 || $t('Message.Components.Account.MaxLengthExceeded')
  ]"
  v-model="value"
      name="username"
  >
  </v-text-field>
</template>
<script>
export default {
  name: "common-account-field-name",
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
  }),
  watch: {
    value: function (val) {
      this.$emit("inputv", val);
    }
  }
}
</script>
<style></style>
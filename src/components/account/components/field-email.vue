<template>
  <!-- variant="outlined" rounded="lg"  -->
  <v-text-field color="primary"    :label="label||$t('Message.Components.Account.EMail')" :required="required" v-show="show"
  :rules="[
    v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
    v => /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(v) || $t('Message.Components.Account.EMailError'),
    v => (v || '').length <= 100 || $t('Message.Components.Account.MaxLengthExceeded')
  ]"
  v-model="value"
      name="mail">
  </v-text-field>
</template>
<script>
export default {
  name: "common-account-field-email",
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
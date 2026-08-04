<template>
  <v-menu top>
    <template v-slot:activator="{ props }">
      <!-- v-if="!oauth_button" -->
      <v-btn rounded="lg"  color="surface-variant" v-bind="props" class="more-option" v-show="show" block size="x-large" elevation="0" variant="outlined">
        {{ $t('Message.Components.Account.MoreOption') }}
      </v-btn>

    </template>
    <v-list rounded="lg">
      <v-list-item v-for="(item, index) in items" :key="`common-account-field-more-${index}`"
        @click="$emit('item_select', item.value)" :title="$t(item.text)">
        <!-- <v-list-item-title>{{  }}</v-list-item-title> -->
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "common-account-field-more",
  props: {
    items: Array,
    show: {
      type: Boolean,
      default: true
    },
    dialog: {
      type: Boolean,
      default: false
    },
  },
}
</script>
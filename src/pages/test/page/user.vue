<template>
  <v-container style="max-width: 846px" :style="{
    padding: mainStore.getMobile ? '0' : '1rem',
  }">

  </v-container>
</template>


<script>
import { useMainStore } from '@/stores/main';
export default {
  data: () => ({
    mainStore: useMainStore(),
  }),
}
</script>

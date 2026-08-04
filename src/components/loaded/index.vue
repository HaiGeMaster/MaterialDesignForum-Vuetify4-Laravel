<template>
  <div v-show="show" class="mc-loaded" key="mc-loaded">
    {{ $t('Message.Components.Loaded.AllDataHasBeenLoaded') }}
  </div>
</template>
<script>
export default {
  name: 'loaded',
  props:{
    show: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="less">
.mc-loaded {
    padding: 8px;
  border-radius: 8px;
  font-size: 13px;
  letter-spacing: .5px;
  text-align: center;
  opacity: .54;
  color: gray;
    width: fit-content;
    margin: 0 auto;
  .theme--dark & {
    color: gray;
  }
}
</style>
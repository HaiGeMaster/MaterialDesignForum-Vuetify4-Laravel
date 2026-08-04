<template>
  <!-- <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      
    </template>
<span>{{ text }}</span>
</v-tooltip> -->

  <v-btn :size="btn_size" icon :variant="btn_variant"  
    @click.stop.prevent="$emit('icon_button_click')" style="margin-left: 4px;margin-right: 4px;">


    <v-badge bordered :color="badge_color" :content="Count" :model-value="count != 0" offset-x="-8" offset-y="-8">
      <!-- color="grey darken-1" -->
      <v-icon :size="icon_size">
        {{ icon }}
      </v-icon>
    </v-badge>
    <v-tooltip activator="parent" location="top">{{ text }}</v-tooltip>

  </v-btn>

</template>
<script>
export default {
  name: 'icon-button',
  props: {
    icon: String,
    text: String,
    count: {
      type: Number,
      default: 0,
    },
    smalls: {
      type: Boolean,
      default: true
    },
    badge_color: {
      type: String,
      default: 'primary',
    },
    btn_variant: {
      type: String,
      default: 'tonal',
    },
    btn_size: {
      type: String,
      default: 'default',
    },
    icon_size: {
      type: String,
      default: 'small',
    },
  },
  computed: {
    Count() {
      if (this.count > 99) {
        return '99+'
      } else if (this.count < 0) {
        return '0'
      } else {
        return `${this.count}`
      }
    }
  },
}
</script>
<style lang="less"></style>
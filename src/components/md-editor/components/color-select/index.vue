<template>

  <!-- <v-tooltip bottom>
    <template v-slot:activator="{ on: on1, attrs: attrs1 }">
      <v-menu offset-y transition="scroll-y-transition">
        <template v-slot:activator="{ on: on2, attrs: attrs2 }">
          <v-btn rounded="lg"  text :title="$t('Message.Components.Editor.Color')" v-bind="Object.assign({}, attrs1, attrs2)"
            v-on="Object.assign({}, on1, on2)" :small="button_small" icon>
            <v-icon :size="icon_small">mdi-palette-outline</v-icon>
          </v-btn>
        </template>
<v-card>
  <v-card-title>
    {{ $t('Message.Components.Editor.Color') }}
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
                <v-btn rounded="lg"  icon @click="$emit('clear')" v-bind="attrs" v-on="on">
                  <v-icon>mdi-invert-colors-off</v-icon>
                </v-btn>

              </template>
      <span>{{ $t('Message.Components.Editor.ClearColor') }}</span>
    </v-tooltip>
  </v-card-title>
  <v-card-text>
    <v-color-picker show-swatches v-model="color"></v-color-picker>
  </v-card-text>
</v-card>
</v-menu>
</template>
<span>{{ $t('Message.Components.Editor.Color') }}</span>
</v-tooltip> -->



  <v-menu offset-y max-width="350" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <!-- style="margin-right: 8px;" -->
      <v-btn  icon :size="button_small" variant="text" :title="$t('Message.Components.Editor.Color')" v-bind="props">
        <v-icon>mdi-palette-outline</v-icon>
        <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.Color') }}</v-tooltip>
      </v-btn>
    </template>
    <v-card rounded="lg" :title="$t('Message.Components.Editor.Color')">
      <!-- <v-card-title>
        {{ $t('Message.Components.Editor.Color') }}
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ props }">
            <v-btn rounded="lg"  icon :size="button_small" variant="text"  @click="$emit('clear')" v-bind="props">
              <v-icon>mdi-invert-colors-off</v-icon>
            </v-btn>

          </template>
          <span>{{ $t('Message.Components.Editor.ClearColor') }}</span>
        </v-tooltip>
      </v-card-title> -->

      <template v-slot:append>
        <v-btn rounded="lg"  icon :size="button_small" variant="text" @click="$emit('clear')">
          <v-icon>mdi-invert-colors-off</v-icon>
          <v-tooltip activator="parent" location="top">{{ $t('Message.Components.Editor.ClearColor')
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card-text>
        <v-color-picker show-swatches v-model="color" variant="text" elevation="0"></v-color-picker>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    // model: {
    //   type: String,
    //   default: 'maximize',
    // },
    button_small: {
      type: String,
      default: 'small',
    },
    icon_small: {
      type: String,
      default: 'small',
    },
  },
  data: () => ({
    // types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
    type: 'hex',
    hex: '#FF00FF',
    hexa: '#FF00FFFF',
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 },
  }),

  computed: {
    color: {
      get() {
        return this[this.type]
      },
      set(v) {
        this[this.type] = v
      },
    },
    showColor() {
      if (typeof this.color === 'string') return this.color

      return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
        color[key] = Number(this.color[key].toFixed(2))
        return color
      }, {}), null, 2)
    },
  },
  watch: {
    showColor(v) {
      this.$emit('color', v)
    },
  },
}
</script>
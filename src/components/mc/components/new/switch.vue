<template>
  <input 
    type="checkbox" 
    class="minecraft-switch" 
    v-model="isChecked"
    @change="handleChange"
  >
</template>

<script>
export default {
  name: 'MinecraftSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: this.value
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.isChecked)
      this.$emit('change', this.isChecked)
    }
  },
  watch: {
    value(newVal) {
      this.isChecked = newVal
    }
  }
}
</script>

<style lang="less">
@wood-color: #97989b;
@wood-border: #000000;
@green-color: #3c8527;
@light-green: #ffffff;
@gray-color: #D3D3D3;

.minecraft-switch {
  -webkit-appearance: none;
  appearance: none;
  width: 60px;
  height: 30px;
  position: relative;
  background-color: @wood-color;
  border: 3px solid @wood-border;
//   box-shadow: 
//     inset 0 2px 0 rgba(255,255,255,0.2),
//     0 4px 0 @wood-border;
  cursor: pointer;
  transition: background-color 0.4s;

  &:checked {
    background-color: @green-color;
  }

  &:before {
    content: "";
    position: absolute;
    left: -3px;
    width: 26px;
    height: 24px;
    // left: 4px;
    bottom: 1px;
    background-color: @gray-color;
    border-left: 3px solid @wood-border;
    border-top: 3px solid @wood-border;
    border-bottom: 4px solid #58585a;
    border-right: 3px solid @wood-border;
    // box-shadow: 
    //   inset 0 2px 0 rgba(255,255,255,0.3),
    //   0 3px 0 @wood-border;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 0 @wood-border,
      0 6px 8px rgba(0, 0, 0, 0.3);
    transition: .4s;
  }

  &:checked:before {
    transform: translateX(30px);
    background-color: @light-green;

    &:hover {
      background: lighten(#cfd0d3, 10%);
    }
  }

  &:after {
    content: "O";
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: bold;
    font-size: 24px;
    text-shadow: 2px 2px 0 @wood-border;
    font-family: 'Courier New', monospace;
  }

  &:checked:after {
    content: "I";
    left: 8px;
    right: auto;
  }
}
</style>

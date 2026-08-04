<template>
  <div class="minecraft-slider">
    <div class="minecraft-slider-label">滑动条</div>
    <input type="range" min="0" max="100" v-model="brightness" class="minecraft" @input="updateBrightness">
    <!-- <div class="slider-value">{{ brightness }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'MinecraftSlider',
  data() {
    return {
      brightness: 50,
      volume: 75,
      difficulty: 1
    }
  },
  methods: {
    updateBrightness() {
      // console.log('亮度更新:', this.brightness); // ✅ 这里 this.brightness 已经是数值
      this.$emit('input', this.brightness); // ✅ 直接传当前值
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../new-global.less";
@range-color: #50A154;
@range-border: #181818;

.minecraft-slider {
  // height: 60px;
  width: 300px;
  margin: 20px 0;
}

.minecraft-slider-label {
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input.minecraft {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 0;
  outline: none;
  cursor: pointer;

  background: linear-gradient(to bottom, #75a655, #4e8426, #5b8c3a);
  border: 3px solid @range-border;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border-left: 3px solid @range-border;
    border-top: 3px solid @range-border;
    border-bottom: 4px solid #5a5a5c;
    border-right: 3px solid @range-border;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 0 @range-border,
      0 6px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      background: lighten(#cfd0d3, 10%);
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    border-left: 2px solid @range-border;
    border-top: 2px solid @range-border;
    border-bottom: 3px solid #5a5a5c;
    border-right: 2px solid @range-border;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 0 @range-border,
      0 6px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      background: lighten(#cfd0d3, 10%);
    }
  }
}
</style>

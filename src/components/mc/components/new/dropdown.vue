<template>
  <div class="minecraft-dropdown">
    <label v-if="label" class="dropdown-label">{{ label }}</label>
    <select 
      class="dropdown-select"
      :value="modelValue"
      @change="handleChange"
      @click="playSelectSound"
    >
      <option value="">-- {{ placeholder }} --</option>
      <option 
        v-for="(option, index) in options" 
        :key="index"
        :value="option.value"
        class="dropdown-option"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MinecraftDropdown',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => [
        { value: '1', text: '选项1' },
        { value: '2', text: '选项2' },
        { value: '3', text: '选项3' },
      ]
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
      this.playSelectSound();
    },
    playSelectSound() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // console.log('音效播放失败');
      }
    }
  }
}
</script>

<style lang="less">

.minecraft-dropdown {
  margin-bottom: 25px;

  .dropdown-label {
    display: block;
    margin-bottom: 12px;
    color: #fff;
    font-size: 14px;
    text-shadow: 2px 2px 0 #000;
    font-family: 'Press Start 2P', cursive;
  }

  .dropdown-select {
    width: 100%;
    padding: 12px;
    border: 3px solid #000;
    border-radius: 0;
    font-family: 'Press Start 2P', cursive;
    font-size: 14px;
    background-color: #8b8b8b;
    color: #fff;
    cursor: pointer;
    box-shadow: inset 4px 4px 0 #6b6b6b;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='square'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;

    &:focus {
      outline: none;
      border-color: #55ff55;
      box-shadow: inset 4px 4px 0 #4caf50;
    }
  }

  .dropdown-option {
    background-color: #3c3c3c;
    color: #fff;
    padding: 12px;
    font-family: 'Press Start 2P', cursive;

    &:hover {
      background-color: #55ff55 !important;
      color: #000 !important;
    }
  }
}
</style>

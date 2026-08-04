<template>
    <input type="text" class="minecraft" v-model="_value"/>
</template>
<script>
export default {
    name: 'mc-text-field',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            _value: '6666'
        }
    },
    watch: {
        value(newVal, oldVal) {
            // console.log('值从', oldVal, '更新到', newVal);
            this._value = newVal
        },
        _value(newVal, oldVal) {
            this.$emit('input', newVal)
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../new-global.less";
@mc-theme-color: #50A154;
@mc-theme-border: #181818;

input.minecraft {
  color: #ffffff;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  min-width: 50px;
  padding: 5px;
  // background: rgba(255,255,255,0.7);
  background-color: #313233;
  border-top: 3px solid @mc-theme-border;
  border-left: 2px solid @mc-theme-border;
  border-bottom: 2px solid @mc-theme-border;
  border-right: 2px solid @mc-theme-border;

  //聚焦时
  &:focus {
    outline: none;
    border-color: #ffffff;
  }
}
</style>
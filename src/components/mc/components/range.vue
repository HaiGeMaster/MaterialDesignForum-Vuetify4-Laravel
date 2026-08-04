<template>
    <label class="minecraft">
        <label class="minecraft">
            <slot>
                <span>
                    滑动条 {{ value }}
                </span>
            </slot>
        </label>
        <input type="range" class="minecraft" v-model="value">
        
        <!-- <div :style="
          {
            width: `${value}%`,
            height: '100%',
            backgroundColor: '#4A8631',
            position: 'absolute',
          }
        ">
6
        </div> -->
    </label>
</template>


<script>
export default {
    name: 'mc-range',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },

    },
    data() {
        return {
            value: 0
        }
    },
    watch: {
        value(newValue, oldValue) {
            // console.log(`值从 ${oldValue} 变更为 ${newValue}`);
            //设置css变量
            this.$el.style.setProperty('--slider-value', `${newValue}%`);
        }
    }
}
</script>

<style lang="less" scoped>
@import "../global.less";
// =========================
// 滑块样式
// =========================

@slider-value: 0;



label.minecraft {

    // label {
    //     font-size: 14px;
    // }

    >[type="range"],
    [type="range"].minecraft {
        position: relative;
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
        outline: 0;
        background-color: transparent;
        width: 100%;

        &::before {
            content: "";
            display: block;
            position: absolute;
            background-color: #000;
            width: 2px;
            height: 10px;
            // top: 6px;
        }

        &:hover::before {
            background-color: #fff;
        }

        &::-webkit-slider-runnable-track {
            height: 11.5px;
            background: #404040;
            border: 2px solid #000;
        }

        &:hover::-webkit-slider-runnable-track {
            background: #007100;
            border: 2px solid #fff;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 15px;
            height: 23px;
            background-image: url(../Minecraft_ui_image/slider-thumb/slider-thumb.jpg);
            image-rendering: pixelated;
            background-size: cover;
            border: 1px solid transparent;
            margin-top: -8px;
            // border-image: linear-gradient(#808080,#808080) 0 fill / 8 15 8 0 / 0px 0px 0 2000px;
            z-index: 3;
        }

        &:hover::-webkit-slider-thumb {
            background-image: url(../Minecraft_ui_image/slider-thumb/slider-thumb_hover.jpg);
            // border-image: linear-gradient(#4A8631, #4A8631) 0 fill / 8 15 8 0 / 0px 0px 0 2000px;
        }
    }
}
</style>
<template>

    <label class="minecraft">
        <label>
            <slot>
                复选框{{ value ? '已选中' : '未选中' }}
            </slot>
        </label>
        <input type="checkbox" class="minecraft" v-model="value" :disabled="disabled">
    </label>
</template>

<script>
export default {
    name: 'mc-checkbox',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: null
        }
    },
}
</script>

<style lang="less" scoped>
@import "../global.less";
// 复选框样式
// =========================

label.minecraft {
    >input[type=checkbox] {
        display: block;
        width: 100%;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        outline: none;
        position: relative;
        height: 24px;

        //如果有disabled，则半透明
        &:disabled {
            opacity: 0.5;
        }

        &::after {
            display: inline-block;
            background-image: url(../Minecraft_ui_image/toggle/toggle_off.png);
            image-rendering: pixelated;
            content: '';
            height: 24px;
            width: 45px;
            background-size: 45px;
        }

        &:checked::after {
            background-image: url(../Minecraft_ui_image/toggle/toggle_on.png);
        }

        &:not(:disabled):checked:hover::after {
            background-image: url(../Minecraft_ui_image/toggle/toggle_on_hover.png);
        }

        &:not(:disabled):hover::after {
            background-image: url(../Minecraft_ui_image/toggle/toggle_off_hover.png);
        }
    }

    >label,
    .minecraft {
        font-family: @minecraft-font;
        display: block;
        margin-bottom: 3px;
        // padding-left: 4px;
        // font-size: 13px;
    }

    &.dark>label,
    .minecraft.dark {
        color: #FFFFFF;
    }
}
</style>
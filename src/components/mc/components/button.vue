<template>
    <button class="minecraft" :disabled="disabled" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'mc-button',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
@import "../global.less";
// =========================
// 按钮样式
// =========================

button.minecraft {
    background-color: @color-light-bg;
    border-top: 1.5px solid @color-light-border-top;
    border-left: 1.5px solid @color-light-border-left;
    border-bottom: 1.5px solid @color-dark-border-bottom;
    border-right: 1.5px solid @color-dark-border-right;
    // border-top: 3px solid #ffffff80;
    // border-left: 3px solid #ffffff80;
    // border-bottom: 3px solid #ffffff80;
    // border-right: 3px solid #ffffff80;
    color: @color-text;
    outline: 1.5px solid #131313;
    vertical-align: middle;
    line-height: 100%;
    height: @button-height;
    width: @button-width;
    font-size: @button-font-size;
    margin-bottom: 5px;
    position: relative;

    &:hover {
        background-color: @color-hover-bg;
        border-top: 1.5px solid @color-hover-border-top;
        border-left: 1.5px solid @color-hover-border-left;
        border-bottom: 1.5px solid @color-hover-border-bottom;
        border-right: 1.5px solid @color-hover-border-right;
        outline: 1.5px solid #FFFFFF;
        color: @color-hover-text;

        &::after,
        &::before {
            display: block;
            content: '';
            position: absolute;
        }

        &::after {
            height: 1.3px;
            width: 1.3px;
            top: -1.3px;
            right: -1.3px;
            background-color: @color-hover-bg;
        }

        &::before {
            height: 1.5px;
            width: 1.5px;
            left: -1.5px;
            bottom: -1.5px;
            background-color: #BFBFBF;
        }
    }

    &:active {
        background-color: @color-active-bg;
        border-top: 1.5px solid @color-active-border-top;
        border-left: 1.5px solid @color-active-border-left;
        border-bottom: 1.5px solid @color-active-border-bottom;
        border-right: 1.5px solid @color-active-border-right;
        outline: 1.5px solid #FFFFFF;
        color: @color-hover-text;
        padding-top: 5px;
    }

    &:disabled,
    .v-theme--dark &:disabled {
        background-color: @color-disabled-bg;
        border: none;
        outline: 1.5px solid #131313;
        color: @color-text;
        position: relative;
        padding-top: 0;

        &::after {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 9.75px;
            height: 15px;
            line-height: 12px;
            image-rendering: pixelated;
            content: url(../Minecraft_ui_image/Glyph/ErrorGlyph.png);
        }

        &::before {
            display: none;
        }
    }

    .v-theme--dark & {

        background-color: @color-dark-bg;
        border-top: 1.5px solid @color-dark-border-top;
        border-left: 1.5px solid @color-dark-border-left;
        border-bottom: 1.5px solid @color-dark-border-bottom;
        border-right: 1.5px solid @color-dark-border-right;
        color: @color-dark-text;
        outline: 1.5px solid #131313;

        &:hover:not(:disabled) {
            background-color: @color-dark-hover-bg;
            border-top: 1.5px solid @color-dark-hover-border-top;
            border-left: 1.5px solid @color-dark-hover-border-left;
            border-bottom: 1.5px solid @color-dark-hover-border-bottom;
            border-right: 1.5px solid @color-dark-hover-border-right;
            outline: 1.5px solid #FFFFFF;
            color: @color-hover-text;
        }

        &:active:not(:disabled) {
            background-color: @color-dark-active-bg;
            border-top: 1.5px solid @color-dark-active-border-top;
            border-left: 1.5px solid @color-dark-active-border-left;
            border-bottom: 1.5px solid @color-dark-active-border-bottom;
            border-right: 1.5px solid @color-dark-active-border-right;
            outline: 1.5px solid #FFFFFF;
            color: @color-hover-text;
            padding-top: 5px;
        }

        &:not(:disabled)::after {
            background-color: #373737;
        }

        &:not(:disabled)::before {  
            background-color: #373737;
        }

        &:hover:not(:disabled)::before {
            background-color: #007305;
        }

        &:hover:not(:disabled)::after { 
            background-color: #007305;
        }
    }

    // 伪元素定位
    &::before {
        height: 1.5px;
        width: 1.5px;
        left: -1.5px;
        bottom: -1.5px;
        background-color: #BFBFBF;
    }

    &::after {
        height: 1.5px;
        width: 1.5px;
        top: -1.5px;
        right: -1.5px;
        background-color: #BFBFBF;
    }
}
</style>
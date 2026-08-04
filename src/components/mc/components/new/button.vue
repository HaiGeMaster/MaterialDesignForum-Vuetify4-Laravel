<template>
    <button class="minecraft" @click="$emit('click')" :disabled="disabled">
        <slot></slot>
    </button>
</template>

    <!-- "os:default", -->
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
@import "../../new-global.less";
@button-color: #3c8527;
@button-border: #181818;

button.minecraft {
    background-color: @button-color;
    color: white;
    border: 3px solid @button-border;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    //   font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 4px 0 @button-border,
        0 6px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.1s ease;

    &:hover {
        background-color: lighten(@button-color, 10%);
        transform: translateY(1px);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 3px 0 @button-border,
            0 5px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
        background-color: darken(@button-color, 10%);
        transform: translateY(3px);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 0 darken(@button-border, 10%),
            0 2px 4px rgba(0, 0, 0, 0.3);
    }
}
</style>
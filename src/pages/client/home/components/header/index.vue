<template>
    <v-btn rounded="lg"  class="header" :to="url" block style="border-radius: 0;" variant="text">
        {{ text }}
        <v-spacer></v-spacer>
        <template v-slot:append>
            <v-icon :color="icon_color">{{ icon }}</v-icon>
        </template>
    </v-btn>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: 'Text',
        },
        icon: {
            type: String,
            // default: 'mdi-arrow-right',
            default: 'mdi-chevron-right',
        },
        icon_color: {
            type: String,
            default: 'primary',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            default: '/',
        },
    },
}
</script>
<style lang="less">
@import './index.less';
</style>
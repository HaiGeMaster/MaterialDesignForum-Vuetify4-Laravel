<template>
    <v-btn rounded="lg"  icon="mdi-close" :variant="variant" @click="$emit('close')">
        {{ icon ? '' : text }}
    </v-btn>
</template>
<script>
export default {
    name: 'CloseButton',
    // emits: ['close'],
    props: {
        variant: {
            type: String,
            default: 'text'
        },
        icon: {
            type: String,
            default: 'mdi-close'
        },
        text: {
            type: String,
            default: 'close'
        }
    }
}
</script>
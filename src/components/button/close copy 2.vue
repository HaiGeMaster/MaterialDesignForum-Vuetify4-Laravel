<template>
    <v-btn rounded="lg"  icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
</template>
<script>
export default {
    name: 'CloseButton',
    // emits: ['close'],
}
</script>
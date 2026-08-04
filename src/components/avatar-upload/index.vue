<template>
    <div class="mc-avatar-upload">
        <v-btn rounded="lg"  variant="text" icon="mdi-camera" class="upload-btn" @click="handleFileSelectAvatar"
          :loading="upload_avatar_loading">
        </v-btn>
        <input type="file" title=" " accept="image/jpeg,image/png" />
    </div>
</template>

<script>
export default {
    props: {
        user: {
            required: false,
            type: Object,
            default: () => {},
        },
    },
}
</script>

<style lang="less">
@import './index.less';
</style>
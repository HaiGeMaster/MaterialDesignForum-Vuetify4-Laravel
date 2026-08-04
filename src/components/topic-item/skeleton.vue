<template>

    <v-card rounded="lg" hover class="mx-auto">
        <v-skeleton-loader rounded="lg" type="image" style="height: 134px"></v-skeleton-loader>

        <v-skeleton-loader rounded="lg" type="subtitle"></v-skeleton-loader>

        <div style="padding: 0;display: flex;">
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
            <v-spacer></v-spacer>
            <v-skeleton-loader class="rounded-lg" type="button" style="width: 100px;"></v-skeleton-loader>
        </div>
    </v-card>

</template>
<!-- <style scoped lang="less">
.v-skeleton-loader__avatar {
    margin: 0 !important;
}
</style> -->
<template>

    <v-card rounded="lg" hover class="mx-auto user-item">
        <div style="
                  height: 170px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                ">

            <!-- <v-skeleton-loader rounded="lg" type="avatar" 
            height="80px"
            width="80px"
            ></v-skeleton-loader> -->
            <v-avatar color="surface-variant" size="80" >
                <v-skeleton-loader height="80" width="80" type="image" ></v-skeleton-loader>
            </v-avatar>
            <!-- style="height: 34px;" -->
            <v-card-title  class="mx-auto">
                <v-skeleton-loader class="mx-auto" rounded="lg" type="text" width="120" height="20"></v-skeleton-loader>
            </v-card-title>
            <v-card-subtitle class="mx-auto">
                <v-skeleton-loader class="mx-auto" rounded="lg" type="text" width="140" height="28"></v-skeleton-loader>
            </v-card-subtitle>
        </div>



        <!-- <div style="padding: 0;display: flex;"> -->
            <v-card-actions style="padding: 0;">
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
            <v-spacer></v-spacer>
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
            </v-card-actions>
        <!-- </div> -->
    </v-card>

</template>
<style scoped lang="less">
// .v-skeleton-loader__avatar {
//     margin: 0 !important;
// }
</style>
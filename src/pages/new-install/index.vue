<template>
<!-- container -->
    <v-card style="width: 100%;" elevation="0">

        <v-toolbar color="primary" extended flat>
            <template v-slot:prepend>
                <v-btn icon="mdi-menu"></v-btn>
            </template>
        </v-toolbar>

        <v-card
            class="mx-auto mt-n16 mb-4"
            elevation="2"
            style="max-width: 1080px; width: 90%"
            height="100%"
        >
            <v-toolbar>
                <v-toolbar-title text="INSTALL"></v-toolbar-title>

                <template v-slot:append>
                    <div class="d-flex ga-1">
                        <v-btn icon="mdi-magnify"></v-btn>

                        <v-btn icon="mdi-apps"></v-btn>

                        <v-btn icon="mdi-dots-vertical"></v-btn>
                    </div>
                </template>
            </v-toolbar>

            <v-divider></v-divider>

            <!-- <v-card-text> -->
                <v-stepper-vertical elevation="0"
                    :items="['检查Laravel所需要的运行环境', '配置连接并初始化您的数据库', '配置邮件发送系统', '创建第一个管理员用户', '完成']"
                ></v-stepper-vertical>
            <!-- </v-card-text> -->
        </v-card>
        <!-- <v-footer class="justify-center text-body-small" color="surface-variant">
            © 2022 - {{ new Date().getFullYear() }} -
            <strong>Material Design Forum</strong>
        </v-footer> -->
    </v-card>
</template>

<script>
export default {
    data: () => ({

    })
}
</script>
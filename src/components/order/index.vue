<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn rounded="lg"  variant="text" v-bind="props" append-icon="mdi-menu-down">
                {{ items[selected].name }}

                <!-- <template v-slot:append>
                    <v-icon color="warning"></v-icon>
                </template> -->
            </v-btn>
        </template>
        <v-list rounded="lg" v-model="selected">
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="selected = index">
                <v-list-item-title>
                    {{ item.name }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            selected: 0,
            items: [
                {
                    order: 'create_time',
                    name: '发布时间（从早到晚）',
                },
                {
                    order: '-create_time',
                    name: '发布时间（从晚到早）',
                },
                {
                    order: '-vote_count',
                    name: '最热门',
                }
            ]
        }
    },
}
</script>
<template>
    <v-list-item color="primary" :to="to" v-show="show" @mouseover="mouseover = true" @mouseleave="mouseover = false" style="height: 64px;">
        <template v-slot:prepend>
            <UserPopover :user="UserPopoverUser" />
        </template>

        <v-list-item-title>{{ title }}</v-list-item-title>
        <v-list-item-subtitle class="text-high-emphasis">{{ subtitle }}</v-list-item-subtitle>

        <template v-slot:append>
            <v-list-item-action class="flex-column align-end">
                <small class="mb-2 text-high-emphasis opacity-60" v-show="mouseover">{{ action_time }}</small>

                <v-spacer></v-spacer>

                <small class="mb-2 text-high-emphasis opacity-60">{{ action_subtitle }}</small>
            </v-list-item-action>
        </template>
    </v-list-item>
</template>
<script>
import { useMainStore } from '@/stores/main'
import UserPopover from '@/components/user-popover/index.vue'
export default {
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
        action_time: {
            type: String,
            default: '2024-5-9',
        },
        action_subtitle: {
            type: String,
            default: '',
        },
        item: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            default: 'questions',
        },
        to: {
            type: String,
            default: '/',
        },
    },
    components: {
        UserPopover,
    },
    data: () => ({
        mouseover: false,
    }),
    computed: {
        UserPopoverUser() {
            return this.type == 'users' ? this.item : this.item.user;
        },
        mainStore() {
            return useMainStore()
        }
    },
};
</script>
<style scoped></style>

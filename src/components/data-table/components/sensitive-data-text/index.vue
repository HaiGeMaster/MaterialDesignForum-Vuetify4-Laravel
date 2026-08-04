<template>
    <v-btn rounded="lg"  variant="outlined" @click="SwitchEyeSensitiveData()">
        <!-- <v-icon>{{ eye_sensitive_data ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon> -->

        <!-- {{ eye_sensitive_data ? ($store.getters['User/GetUser'].user_group.is_admin?text:$t('Message.App.InsufficientPermissions')) : textLen }} -->

        <NoPermissions v-if="!userStore.getUser.user_group.is_admin" />
        <span v-else>
            <!-- <v-expand-x-transition> -->
                {{ eye_sensitive_data ? text : textLen }}
            <!-- </v-expand-x-transition> -->
        </span>
    </v-btn>
</template>
<!--  -->
<script>
import NoPermissions from '@/components/no-permissions/index.vue'
import { useUserStore } from '@/stores/user';
export default {
    name: 'sensitive-data-text',
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    components: {
        NoPermissions
    },
    data() {
        return {
            userStore: useUserStore(),
            eye_sensitive_data: false,
        }
    },
    computed: {
        textLen() {
            if (this.text === '') {
                return '';
            } else {
                // const length = this.text.length;
                // return '*'.repeat(length); // 根据长度生成对应数量的星号
                return '*'.repeat(6); // 根据长度生成对应数量的星号
            }
        }
    },
    methods: {
        // 这里可以添加其他方法
        SwitchEyeSensitiveData() {
            // if(this.$store.getters['User/GetUser'].user_group.is_admin) {
            //     this.eye_sensitive_data = !this.eye_sensitive_data;
            // } else {
            //     this.$store.dispatch('User/SetUser', { user_group: { is_admin: true } });
            // }
            this.eye_sensitive_data = !this.eye_sensitive_data;
        }
    }
}
</script>

<style scoped>
/* 添加样式，如果需要的话 */
</style>

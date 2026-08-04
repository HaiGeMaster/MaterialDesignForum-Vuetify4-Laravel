<template>
    <!-- closable collapsed closable
    close-text="" rounded="pill"-->
    <v-snackbar-queue v-model="messages" :total-visible="5"  collapsed
    ></v-snackbar-queue>
</template>
<script>
import { useSnackbarStore } from '@/stores/snackbar'
export default {
    data() {
        return {
            snackbarStore: useSnackbarStore(),
            // messages: [],
        }
    },
    computed: {
        messages: {
            get() {
                return this.snackbarStore.getMessages
            },
            set(value) {
                // 当消息被关闭时从 store 中删除
                this.snackbarStore.setMessages(value)
            }
        }
    },
    methods: {
        // addMessage(text, color) {
        //     const id = ++messageCount
        //     messages.value.push({
        //         text,
        //         color,
        //         onDismiss(reason) {
        //             // logs.value.unshift(`Message #${id}: Closed (${reason})`)
        //         },
        //     })
        // }
    }
}
</script>
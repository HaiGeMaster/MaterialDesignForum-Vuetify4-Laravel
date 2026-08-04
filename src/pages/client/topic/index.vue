<template>
    <v-container id="page-topic">
        
        <Topic v-if="topic" :topic="topic"/>
        <Contexts v-if="topic" :topic="topic"/>
    </v-container>
</template>
<script>

import {
    GetTopic,
    Get_G_TOPIC,
} from '@/api/global.js';

import Topic from './components/topic/index.vue'
import Contexts from './components/contexts/index.vue'
import { useUpdateStore } from '@/stores/update'
export default {
    components: {
        Topic,
        Contexts,
    },
    data: () => ({
        topic: null,
        updateStore: useUpdateStore(),
    }),
    computed: {
        ReturnUpdateGetTopicUpdate() {
            return this.updateStore.getTopicUpdate
        },
    },
    methods: {
        async GetTopic() {
            // console.log('this.$route.params.topic_id', this.$route.params.topic_id)
            this.topic = null
            const TOPIC = Get_G_TOPIC()
            // console.log('TOPIC', TOPIC)
            if (TOPIC !== null) {
                this.topic = TOPIC.topic
                return
            }

            const response = await GetTopic({
                topic_id: this.$route.params.topic_id,
                user_token: this.$G_GetUserToken(),
            })
            if (response.data.is_get) {
                this.topic = response.data.topic
            }
        },
    },
    watch: {
        '$route'(val) {
            if(this.$route.params.topic_id!=this.topic?.topic_id){
                this.GetTopic()
            }
        },
        ReturnUpdateGetTopicUpdate(val) {
            // if(val){
                this.GetTopic()
            // }
        },
    },
    created() {
        if(this.$route.params.topic_id){
            this.GetTopic()
        }
    },
}
</script>
<style lang="less">
@import './index.less';
</style>

<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_topic">

    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable  v-if="$G_AppIsCanUse()&&userStore.getIsLogin" 
        :headers="headers" 
        type="topics"
        @edit_item="OnEdit"
        />
    <!-- </v-card> -->
      <NoAllowUse v-else/>
      <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false"/>
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import { useUserStore } from '@/stores/user'
import {
  
} from '@/api/global.js'
export default {
  name: 'admin-page-topics',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
  }),
  computed: {
    headers() {
      return [
        {
          title: this.$t('Message.Admin.Topics.TopicID'),
          align: 'start',
          key: 'topic_id',
        },
        {
          title: this.$t('Message.Admin.Topics.User'),
          key: 'user',
        },
        {
          title: this.$t('Message.Admin.Topics.Name'),
          key: 'name',
        },
        {
          title: this.$t('Message.Admin.Topics.Description'),
          key: 'description',
        },
        {
          title: this.$t('Message.Admin.Topics.ArticleCount'),
          key: 'article_count',
        },
        {
          title: this.$t('Message.Admin.Topics.QuestionCount'),
          key: 'question_count',
        },
        {
          title: this.$t('Message.Admin.Topics.FollowerCount'),
          key: 'follower_count',
        },
        {
          title: this.$t('Message.Admin.Topics.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Topics.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.Topics.DeleteTime'),
        //   key: 'delete_time',
        // },
      ]
    },
  },
  methods: {
    OnEdit(item) {
      // this.topic = item
      this.$store.dispatch('Dialog/Set_TopicDialog', {
        mode: 'edit',
        edit_topic: item,
        model: true,
      })
    },
  }
}
</script>
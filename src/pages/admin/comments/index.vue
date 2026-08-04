<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_comment">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin" 
        :headers="headers"
        type="comments"
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
export default {
  name: 'admin-page-comments',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
    dialog: false,
  }),
  computed:{
    headers(){
      return [
        {
          title: this.$t('Message.Admin.Comments.CommentID'),
          align: 'start',
          key: 'comment_id',
        },
        {
          title: this.$t('Message.Admin.Comments.CommentableID'),
          key: 'commentable_id',
        },
        {
          title: this.$t('Message.Admin.Comments.CommentableType'),
          key: 'commentable_type',
        },
        // {
        //   title: this.$t('Message.Admin.Comments.UserID'),
        //   key: 'user_id',
        // },
        {
          title: this.$t('Message.Admin.Comments.User'),
          key: 'user',
        },
        {
          title: this.$t('Message.Admin.Comments.Content'),
          key: 'content',
        },
        {
          title: this.$t('Message.Admin.Comments.ReplyCount'),
          key: 'reply_count',
        },
        {
          title: this.$t('Message.Admin.Comments.VoteCount'),
          key: 'vote_count',
        },
        {
          title: this.$t('Message.Admin.Comments.VoteUpCount'),
          key: 'vote_up_count',
        },
        {
          title: this.$t('Message.Admin.Comments.VoteDownCount'),
          key: 'vote_down_count',
        },
        {
          title: this.$t('Message.Admin.Comments.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Comments.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.Comments.DeleteTime'),
        //   key: 'delete_time',
        // },
      ]
    },
  },
}
</script>
<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_reply">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin" 
        :headers="headers"
        type="replys"
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
  name: 'admin-page-replys',
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
          title: this.$t('Message.Admin.Replys.ReplyID'),
          align: 'start',
          key: 'reply_id',
        },
        {
          title: this.$t('Message.Admin.Replys.ReplyableID'),
          key: 'replyable_id',
        },
        {
          title: this.$t('Message.Admin.Replys.ReplyableType'),
          key: 'replyable_type',
        },
        // {
        //   title: this.$t('Message.Admin.Replys.ReplyableUserID'),
        //   key: 'replyable_user_id',
        // },
        {
          title: this.$t('Message.Admin.Replys.ReplyableUser'),
          key: 'replyable_user',
        },
        {
          title: this.$t('Message.Admin.Replys.ReplyableCommentID'),
          key: 'replyable_comment_id',
        },
        // {
        //   title: this.$t('Message.Admin.Replys.UserID'),
        //   key: 'user_id',
        // },
        {
          title: this.$t('Message.Admin.Replys.User'),
          key: 'user',
        },
        {
          title: this.$t('Message.Admin.Replys.Content'),
          key: 'content',
        },
        {
          title: this.$t('Message.Admin.Replys.ReplyCount'),
          key: 'reply_count',
        },
        {
          title: this.$t('Message.Admin.Replys.VoteCount'),
          key: 'vote_count',
        },
        {
          title: this.$t('Message.Admin.Replys.VoteUpCount'),
          key: 'vote_up_count',
        },
        {
          title: this.$t('Message.Admin.Replys.VoteDownCount'),
          key: 'vote_down_count',
        },
        {
          title: this.$t('Message.Admin.Replys.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Replys.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.Replys.DeleteTime'),
        //   key: 'delete_time',
        // },
      ]
    }
  }
}
</script>
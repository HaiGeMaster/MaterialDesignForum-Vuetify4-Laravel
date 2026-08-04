<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_user">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile">
      <DataTable v-if="userStore.getIsLogin"  :headers="headers" type="users" @edit_item="OnEdit" />
    </v-card> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin"  :headers="headers" type="users" @edit_item="OnEdit" />
      <NoAllowUse v-else/>
    <EditInfoDialog 
      :model="edit_user_dialog" 
      @model="edit_user_dialog = $event" 
      @edit_user="
        user=>{
          $store.dispatch('Update/Set_DataTableUpdate',user)
        }
      "
      :user="user" 
      :is_admin="true"
    />
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false" />
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import EditInfoDialog from '@/components/dialog/edit-info-dialog/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import { useUserStore } from '@/stores/user'
export default {
  name: 'admin-page-users',
  components: {
    DataTable,
    Loading,
    EditInfoDialog,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
    user: null,
    edit_user_dialog: false,
  }),
  computed: {
    headers() {
      var v = [
        {
          title: this.$t('Message.Admin.Users.UserID'),
          align: 'start',
          key: 'user_id',
        },
        {
          title: this.$t('Message.Admin.Users.UserGroupID'),
          key: 'user_group_id',
        },
        {
          title: this.$t('Message.Admin.Users.User'),//LocalUser
          key: 'localuser',
          // key: 'username',
        },
        // {
        //   title: this.$t('Message.Admin.Users.Username'),
        //   key: 'username',
        // },
        {
          title: this.$t('Message.Admin.Users.Email'),
          key: 'email',
        },
        // {
        //   title: this.$t('Message.Admin.Users.Avatar'),
        //   key: 'avatar',
        // },
        // {
        //   title: this.$t('Message.Admin.Users.Cover'),
        //   key: 'cover',
        // },
        // {
        //   title: this.$t('Message.Admin.Users.Password'),
        //   key: 'password',
        // },
        {
          title: this.$t('Message.Admin.Users.CreateIP'),
          key: 'create_ip',
        },
        {
          title: this.$t('Message.Admin.Users.CreateLocation'),
          key: 'create_location',
        },
        {
          title: this.$t('Message.Admin.Users.LastLoginTime'),
          key: 'last_login_time',
        },
        {
          title: this.$t('Message.Admin.Users.LastLoginIP'),
          key: 'last_login_ip',
        },
        {
          title: this.$t('Message.Admin.Users.LastLoginLocation'),
          key: 'last_login_location',
        },
        {
          title: this.$t('Message.Admin.Users.FollowerCount'),
          key: 'follower_count',
        },
        {
          title: this.$t('Message.Admin.Users.FolloweeCount'),
          key: 'followee_count',
        },
        {
          title: this.$t('Message.Admin.Users.FollowingTopicCount'),
          key: 'following_topic_count',
        },
        {
          title: this.$t('Message.Admin.Users.FollowingArticleCount'),
          key: 'following_article_count',
        },
        {
          title: this.$t('Message.Admin.Users.FollowingQuestionCount'),
          key: 'following_question_count',
        },
        {
          title: this.$t('Message.Admin.Users.ArticleCount'),
          key: 'article_count',
        },
        {
          title: this.$t('Message.Admin.Users.QuestionCount'),
          key: 'question_count',
        },
        {
          title: this.$t('Message.Admin.Users.AnswerCount'),
          key: 'answer_count',
        },
        {
          title: this.$t('Message.Admin.Users.CommentCount'),
          key: 'comment_count',
        },
        {
          title: this.$t('Message.Admin.Users.ReplyCount'),
          key: 'reply_count',
        },
        {
          title: this.$t('Message.Admin.Users.NotificationUnread'),
          key: 'notification_unread',
        },
        // {
        //   title: this.$t('Message.Admin.Users.InboxSystem'),
        //   key: 'inbox_system',
        // },
        // {
        //   title: this.$t('Message.Admin.Users.InboxUserGroup'),
        //   key: 'inbox_user_group',
        // },
        // {
        //   title: this.$t('Message.Admin.Users.InboxPrivateMessage'),
        //   key: 'inbox_private_message',
        // },
        {
          title: this.$t('Message.Admin.Users.Headline'),
          key: 'headline',
        },
        {
          title: this.$t('Message.Admin.Users.Bio'),
          key: 'bio',
        },
        {
          title: this.$t('Message.Admin.Users.Blog'),
          key: 'blog',
        },
        {
          title: this.$t('Message.Client.User.User.AffiliatedSchoolOrEnterprise'),//Message.Admin.Users.Company'),
          key: 'company',
        },
        {
          title: this.$t('Message.Admin.Users.Location'),
          key: 'location',
        },
        {
          title: this.$t('Message.Admin.Users.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Users.UpdateTime'),
          key: 'update_time',
        },
        {
          title: this.$t('Message.Admin.Users.DisableTime'),
          key: 'disable_time',
        },
      ]
      //如果G_GetAppVersionBool(4)==true
      // if (this.$G_GetAppVersionBool(4)) {
      //   //在数组的第二个位置插入一个元素
      //   v.splice(2, 0, {
      //     title: this.$t('Message.Admin.Users.UserGroupID'),
      //     key: 'user_group_id',
      //   },)
      // }
      return v
    }
  },
  methods: {
    OnEdit(user) {
      this.user = user
      this.edit_user_dialog = true
    }
  },
  // watch: {
  //   '$store.getters.app.components.dialog.edit_info'(val) {
  //     this.edit_user_dialog = val
  //   }
  // }
}
</script>
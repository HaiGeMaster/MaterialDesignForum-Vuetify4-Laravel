<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_user_group">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable  v-if="$G_AppIsCanUse()&&userStore.getIsLogin"  
      :headers="headers" type="user_groups" order="+user_group_id" @edit_item="OnEdit" />
    <!-- </v-card> -->
      <NoAllowUse v-else/>
    <!-- <UserGroupEditDialog :model="user_group_dialog" :item="item"
    :mode="user_group_mode"
    @model="user_group_dialog = $event" />
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false" /> -->

  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import { useUserStore } from '@/stores/user'
// import UserGroupEditDialog from '@/components/dialog/user-group-edit-dialog/index.vue'
export default {
  name: 'admin-page-user_groups',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
    // UserGroupEditDialog,
  },
  data: () => ({
    userStore: useUserStore(),
  }),
  computed: {
    headers() {
      return [
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupID'),
          align: 'start',
          key: 'user_group_id',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupName'),
          key: 'user_group_name',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupDescription'),
          key: 'user_group_description',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupIcon'),
          key: 'user_group_icon',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupIconShow'),
          key: 'user_group_icon_show',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupColor'),
          key: 'user_group_color',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UserGroupUserCount'),
          key: 'user_group_user_count',
        },
        {
          title: this.$t('Message.Admin.UserGroups.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.UserGroups.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.UserGroups.DeleteTime'),
        //   key: 'delete_time',
        // },
        {
          title: this.$t('Message.Admin.UserGroups.IsAdmin'),
          key: 'is_admin',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityNormalLogin'),
          key: 'ability_normal_login',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminLogin'),
          key: 'ability_admin_login',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageUserGroup'),
          key: 'ability_admin_manage_user_group',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageUser'),
          key: 'ability_admin_manage_user',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageTopic'),
          key: 'ability_admin_manage_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageQuestion'),
          key: 'ability_admin_manage_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageArticle'),
          key: 'ability_admin_manage_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageComment'),
          key: 'ability_admin_manage_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageAnswer'),
          key: 'ability_admin_manage_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageReply'),
          key: 'ability_admin_manage_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageReport'),
          key: 'ability_admin_manage_report',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityAdminManageSetting'),
          key: 'ability_admin_manage_option',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateArticle'),
          key: 'ability_create_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateQuestion'),
          key: 'ability_create_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateAnswer'),
          key: 'ability_create_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateComment'),
          key: 'ability_create_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateReply'),
          key: 'ability_create_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityCreateTopic'),
          key: 'ability_create_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnArticle'),
          key: 'ability_edit_own_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnQuestion'),
          key: 'ability_edit_own_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnAnswer'),
          key: 'ability_edit_own_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnComment'),
          key: 'ability_edit_own_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnReply'),
          key: 'ability_edit_own_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnTopic'),
          key: 'ability_edit_own_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnArticle'),
          key: 'ability_delete_own_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnQuestion'),
          key: 'ability_delete_own_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnAnswer'),
          key: 'ability_delete_own_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnComment'),
          key: 'ability_delete_own_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnReply'),
          key: 'ability_delete_own_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteOwnTopic'),
          key: 'ability_delete_own_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditArticle'),
          key: 'time_before_edit_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditQuestion'),
          key: 'time_before_edit_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditAnswer'),
          key: 'time_before_edit_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditComment'),
          key: 'time_before_edit_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditReply'),
          key: 'time_before_edit_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeEditTopic'),
          key: 'time_before_edit_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteArticle'),
          key: 'time_before_delete_article',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteQuestion'),
          key: 'time_before_delete_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteAnswer'),
          key: 'time_before_delete_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteComment'),
          key: 'time_before_delete_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteReply'),
          key: 'time_before_delete_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.TimeBeforeDeleteTopic'),
          key: 'time_before_delete_topic',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditArticleOnlyNoComment'),
          key: 'ability_edit_article_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditQuestionOnlyNoAnswer'),
          key: 'ability_edit_question_only_no_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditAnswerOnlyNoComment'),
          key: 'ability_edit_answer_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditQuestionOnlyNoComment'),
          key: 'ability_edit_question_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditCommentOnlyNoReply'),
          key: 'ability_edit_comment_only_no_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditReplyOnlyNoReply'),
          key: 'ability_edit_reply_only_no_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditTopicOnlyNoArticleOrQuestion'),
          key: 'ability_edit_topic_only_no_article_or_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteArticleOnlyNoComment'),
          key: 'ability_delete_article_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteQuestionOnlyNoAnswer'),
          key: 'ability_delete_question_only_no_answer',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteAnswerOnlyNoComment'),
          key: 'ability_delete_answer_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteQuestionOnlyNoComment'),
          key: 'ability_delete_question_only_no_comment',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteCommentOnlyNoReply'),
          key: 'ability_delete_comment_only_no_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteReplyOnlyNoReply'),
          key: 'ability_delete_reply_only_no_reply',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityDeleteTopicOnlyNoArticleOrQuestion'),
          key: 'ability_delete_topic_only_no_article_or_question',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityEditOwnInfo'),
          key: 'ability_edit_own_info',
        },
        {
          title: this.$t('Message.Admin.UserGroups.AbilityVote'),
          key: 'ability_vote',
        },
      ]
    }
  },
  methods: {
    OnEdit(item) {
      // console.log(item)
      // this.item = item
      // this.user_group_mode = 'edit'
      // this.user_group_dialog = true
      this.$store.dispatch('Dialog/Set_UserGroupEditDialog', {
        edit_user_group:item,
        mode:'edit',
        model:true,
      })
    },
    // OnAdd() {
    //   this.user_group_mode = 'new'
    //   this.user_group_dialog = true
    // },
  },
  watch:{
    // '$store.getters.app.components.dialog.add_user_group': function(val) {
    //   this.OnAdd()
    // },
  }
}
</script>
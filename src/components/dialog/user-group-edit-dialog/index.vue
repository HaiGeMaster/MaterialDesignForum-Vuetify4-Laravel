<template>
  <v-dialog v-model="model" :fullscreen="mainStore.getMobile" max-width="1080px" scrollable>
    <v-card rounded="lg" >
      <v-toolbar :title="mode == 'edit'
        ? $t('Message.Admin.UserGroups.UserGroupEditN', {
          value: $t(fillable.user_group_name)
        })
        : $t('Message.Admin.UserGroups.CreateNewUserGroup')">


        <template v-slot:prepend>
          <v-btn  icon @click="model = !model">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>
        </template>


        <template v-slot:append>
          <v-btn  icon variant="text" :loading="is_loading" @click="OnConfirm()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>

      </v-toolbar>

      <v-card-text>

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   v-model="fillable.user_group_name" :label="$t('Message.Admin.UserGroups.UserGroupName')"
              :hint="$t(fillable.user_group_name)">
              <template v-slot:append>
                <v-tooltip top>
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>{{ $t('Message.Admin.UserGroups.TextOrMessageDotText') }}</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   v-model="fillable.user_group_description"
              :label="$t('Message.Admin.UserGroups.UserGroupDescription')" :hint="$t(fillable.user_group_description)">
              <template v-slot:append>
                <v-tooltip top>
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>{{ $t('Message.Admin.UserGroups.TextOrMessageDotText') }}</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   v-model="fillable.user_group_icon" :label="$t('Message.Admin.UserGroups.UserGroupIcon')"
              append-icon="mdi-help-circle-outline" @click:append="OpenLink('https://pictogrammers.com/library/mdi/')"
              hint="mdi-xxx">
              <template v-slot:prepend-inner>
                <v-btn  variant="text"  icon>
                  <v-icon>{{ fillable.user_group_icon }}</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   v-model="fillable.user_group_color" :label="$t('Message.Admin.UserGroups.UserGroupColor')"
              append-icon="mdi-help-circle-outline"
              @click:append="OpenLink('https://vuetifyjs.com/zh-Hans/styles/colors')"
              :color="fillable.user_group_color">
              <template v-slot:prepend-inner>
                <ColorSelect @color="color => {
                  fillable.user_group_color = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.user_group_icon_show"
              :label="$t('Message.Admin.UserGroups.UserGroupIconShow')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.is_admin"
              :label="$t('Message.Admin.UserGroups.IsAdmin')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_normal_login"
              :label="$t('Message.Admin.UserGroups.AbilityNormalLogin')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_login"
              :label="$t('Message.Admin.UserGroups.AbilityAdminLogin')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_topic"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageTopic')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_question"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_article"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageArticle')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_comment"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_answer"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_reply"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageReply')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_report"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageReport')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_user_group"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageUserGroup')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_user"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageUser')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_admin_manage_option"
              :label="$t('Message.Admin.UserGroups.AbilityAdminManageSetting')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_topic"
              :label="$t('Message.Admin.UserGroups.AbilityCreateTopic')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_article"
              :label="$t('Message.Admin.UserGroups.AbilityCreateArticle')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_question"
              :label="$t('Message.Admin.UserGroups.AbilityCreateQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_answer"
              :label="$t('Message.Admin.UserGroups.AbilityCreateAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_comment"
              :label="$t('Message.Admin.UserGroups.AbilityCreateComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_create_reply"
              :label="$t('Message.Admin.UserGroups.AbilityCreateReply')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_topic"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnTopic')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_article"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnArticle')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_question"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_answer"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_comment"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_reply"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnReply')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_topic"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnTopic')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_article"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnArticle')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_question"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_answer"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_comment"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_own_reply"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteOwnReply')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_topic_only_no_article_or_question"
              :label="$t('Message.Admin.UserGroups.AbilityEditTopicOnlyNoArticleOrQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_article_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityEditArticleOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_question_only_no_answer"
              :label="$t('Message.Admin.UserGroups.AbilityEditQuestionOnlyNoAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_answer_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityEditAnswerOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_question_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityEditQuestionOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_comment_only_no_reply"
              :label="$t('Message.Admin.UserGroups.AbilityEditCommentOnlyNoReply')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_reply_only_no_reply"
              :label="$t('Message.Admin.UserGroups.AbilityEditReplyOnlyNoReply')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_topic_only_no_article_or_question"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteTopicOnlyNoArticleOrQuestion')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_article_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteArticleOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_question_only_no_answer"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteQuestionOnlyNoAnswer')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_answer_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteAnswerOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_question_only_no_comment"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteQuestionOnlyNoComment')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_comment_only_no_reply"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteCommentOnlyNoReply')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_delete_reply_only_no_reply"
              :label="$t('Message.Admin.UserGroups.AbilityDeleteReplyOnlyNoReply')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_edit_own_info"
              :label="$t('Message.Admin.UserGroups.AbilityEditOwnInfo')"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" inset v-model="fillable.ability_vote"
              :label="$t('Message.Admin.UserGroups.AbilityVote')"></v-switch>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_article"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditArticle')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_question"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditQuestion')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_answer"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditAnswer')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_comment"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditComment')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_reply"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditReply')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_edit_topic"
              :label="$t('Message.Admin.UserGroups.TimeBeforeEditTopic')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_article"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteArticle')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_question"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteQuestion')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_answer"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteAnswer')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_comment"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteComment')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_reply"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteReply')"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-combobox color="primary" variant="underlined" :items="timelists"
              v-model="fillable.time_before_delete_topic"
              :label="$t('Message.Admin.UserGroups.TimeBeforeDeleteTopic')"></v-combobox>
          </v-col>

        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>
<script>
// import CommonDialog from '@/components/dialog/common-dialog/index.vue'
import ColorSelect from '@/components/md-editor/components/color-select/index.vue'

// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import {
  AddUserGroup,
  EditUserGroup,
} from '@/api/global.js'
import { useDialogStore } from '@/stores/dialog.js'
import { useMainStore } from '@/stores/main.js';
export default {
  name: 'user-group-edit-dialog',
  components: {
    // CommonDialog,
    ColorSelect,
    // Confirm,
    // Cancel
  },
  props: {
    // model: {
    //   type: Boolean,
    //   default: false,
    // },
    // edit_user_group: {
    //   type: Object,
    //   default: null,
    // },
    // mode: {
    //   type: String,
    //   default: 'edit',//edit new
    // }
  },
  computed: {
    model: {
      get() {
        // this.mode = this.dialogStore.getUserGroupEditDialog.mode
        // this.edit_user_group = this.dialogStore.getUserGroupEditDialog.edit_user_group
        return this.dialogStore.getUserGroupEditDialog.model
      },
      set(val) {
        this.dialogStore.setUserGroupEditDialog({ model: val })
      }
    }
  },
  data: () => ({
    dialogStore: useDialogStore(),
    mainStore: useMainStore(),

    timelists: [0, 1, 5, 10, 30, 45, 60],
    // model: false,
    mode: 'new',//edit new
    edit_user_group: null,
    is_loading: false,
    fillable: {
      user_group_name: '',
      user_group_description: '',
      user_group_icon: '',
      user_group_icon_show: false,
      user_group_color: '',
      is_admin: false,
      ability_normal_login: false,
      ability_admin_login: false,
      ability_admin_manage_user_group: false,
      ability_admin_manage_user: false,
      ability_admin_manage_topic: false,
      ability_admin_manage_question: false,
      ability_admin_manage_article: false,
      ability_admin_manage_comment: false,
      ability_admin_manage_answer: false,
      ability_admin_manage_reply: false,
      ability_admin_manage_report: false,
      ability_admin_manage_option: false,
      ability_create_article: false,
      ability_create_question: false,
      ability_create_answer: false,
      ability_create_comment: false,
      ability_create_reply: false,
      ability_create_topic: false,
      ability_edit_own_article: false,
      ability_edit_own_question: false,
      ability_edit_own_answer: false,
      ability_edit_own_comment: false,
      ability_edit_own_reply: false,
      ability_edit_own_topic: false,
      ability_delete_own_article: false,
      ability_delete_own_question: false,
      ability_delete_own_answer: false,
      ability_delete_own_comment: false,
      ability_delete_own_reply: false,
      ability_delete_own_topic: false,
      time_before_edit_article: 0,
      time_before_edit_question: 0,
      time_before_edit_answer: 0,
      time_before_edit_comment: 0,
      time_before_edit_reply: 0,
      time_before_edit_topic: 0,
      time_before_delete_article: 0,
      time_before_delete_question: 0,
      time_before_delete_answer: 0,
      time_before_delete_comment: 0,
      time_before_delete_reply: 0,
      time_before_delete_topic: 0,
      ability_edit_article_only_no_comment: false,
      ability_edit_question_only_no_answer: false,
      ability_edit_answer_only_no_comment: false,
      ability_edit_question_only_no_comment: false,
      ability_edit_comment_only_no_reply: false,
      ability_edit_topic_only_no_article_or_question: false,
      ability_edit_reply_only_no_reply: false,
      ability_delete_article_only_no_comment: false,
      ability_delete_question_only_no_answer: false,
      ability_delete_answer_only_no_comment: false,
      ability_delete_question_only_no_comment: false,
      ability_delete_comment_only_no_reply: false,
      ability_delete_reply_only_no_reply: false,
      ability_delete_topic_only_no_article_or_question: false,
      ability_edit_own_info: false,
      ability_vote: false,
    },
    default_fillable: {
      user_group_name: 'Message.Admin.UserGroups.User',
      user_group_description: 'Message.Admin.UserGroups.User',
      user_group_icon: 'mdi-account',
      user_group_icon_show: false,
      user_group_color: '#2196F3',
      is_admin: false,
      ability_normal_login: false,
      ability_admin_login: false,
      ability_admin_manage_user_group: false,
      ability_admin_manage_user: false,
      ability_admin_manage_topic: false,
      ability_admin_manage_question: false,
      ability_admin_manage_article: false,
      ability_admin_manage_comment: false,
      ability_admin_manage_answer: false,
      ability_admin_manage_reply: false,
      ability_admin_manage_report: false,
      ability_admin_manage_option: false,
      ability_create_article: false,
      ability_create_question: false,
      ability_create_answer: false,
      ability_create_comment: false,
      ability_create_reply: false,
      ability_create_topic: false,
      ability_edit_own_article: false,
      ability_edit_own_question: false,
      ability_edit_own_answer: false,
      ability_edit_own_comment: false,
      ability_edit_own_reply: false,
      ability_edit_own_topic: false,
      ability_delete_own_article: false,
      ability_delete_own_question: false,
      ability_delete_own_answer: false,
      ability_delete_own_comment: false,
      ability_delete_own_reply: false,
      ability_delete_own_topic: false,
      time_before_edit_article: 0,
      time_before_edit_question: 0,
      time_before_edit_answer: 0,
      time_before_edit_comment: 0,
      time_before_edit_reply: 0,
      time_before_edit_topic: 0,
      time_before_delete_article: 0,
      time_before_delete_question: 0,
      time_before_delete_answer: 0,
      time_before_delete_comment: 0,
      time_before_delete_reply: 0,
      time_before_delete_topic: 0,
      ability_edit_article_only_no_comment: false,
      ability_edit_question_only_no_answer: false,
      ability_edit_answer_only_no_comment: false,
      ability_edit_question_only_no_comment: false,
      ability_edit_comment_only_no_reply: false,
      ability_edit_topic_only_no_article_or_question: false,
      ability_edit_reply_only_no_reply: false,
      ability_delete_article_only_no_comment: false,
      ability_delete_question_only_no_answer: false,
      ability_delete_answer_only_no_comment: false,
      ability_delete_question_only_no_comment: false,
      ability_delete_comment_only_no_reply: false,
      ability_delete_reply_only_no_reply: false,
      ability_delete_topic_only_no_article_or_question: false,
      ability_edit_own_info: false,
      ability_vote: false,
    }
  }),
  methods: {
    OpenLink(val) {
      window.open(val, '_blank')
    },
    OnConfirm() {
      // this.model = false
      this.OnSubmit()
      //this.$emit('OnConfirm')
    },
    OnCancel() {
      this.model = false
      //this.$emit('OnCancel')

    },
    async OnSubmit() {
      var user_token = this.$G_GetUserToken()
      this.$forceUpdate()
      this.is_loading = true
      if (this.mode == 'edit') {
        const res = await EditUserGroup(
          {
            user_group_id: this.edit_user_group.user_group_id,
            user_group_data: this.fillable,
            user_token: user_token,
          }
        )
        if (res.data.is_edit) {
          // console.log(res.data)
          this.snackbarStore.addMessage({ text: this.$t(`Message.Components.Snackbar.Created`), color: 'success' })
          this.$emit('edit_user_group', res.data.user_group)
          this.is_loading = false
          this.model = false
        } else {
          this.snackbarStore.addMessage({ text: this.$t(`Message.Components.Snackbar.Bad`), color: 'warning' })
          this.is_loading = false
          this.model = false
        }
      } else if (this.mode == 'new') {
        const res = await AddUserGroup(
          {
            user_group_data: this.fillable,
            user_token: user_token,
          }
        )
        if (res.data.is_add) {
          // console.log(res.data)
          this.$emit('add_user_group', res.data.user_group)
          this.model = false
          this.is_loading = false
        } else {
          this.model = false
          this.is_loading = false
        }
      }
    },
  },
  watch: {
    model(val) {
      // console.log(val)
      // if (val) {
      //   this.model = val
      // }


      this.mode = this.dialogStore.getUserGroupEditDialog.mode
      this.edit_user_group = this.dialogStore.getUserGroupEditDialog.edit_user_group
    },
    // model(val) {
    //   if (!val) {
    //     this.$emit('model', val)
    //   }
    // },
    edit_user_group(val) {
      if (val != null && this.mode == 'edit') {
        //this.fillable = val
        //遍历this.fillable赋值
        for (var key in this.fillable) {
          this.fillable[key] = val[key]
        }
        // this.$forceUpdate()
        // console.log(this.fillable)

        //以下是将填充的值转换为语言
        // if (this.fillable.user_group_name.indexOf('Message') != -1) {
        //   this.fillable.user_group_name = this.$t(this.fillable.user_group_name)
        // }
        // if (this.fillable.user_group_description.indexOf('Message') != -1) {
        //   this.fillable.user_group_description = this.$t(this.fillable.user_group_description)
        // }

        this.$forceUpdate()
      } else {
        // for (var key in this.fillable) {
        //   this.fillable[key] = ''
        // }
        this.fillable = this.default_fillable
        this.$forceUpdate()
      }
    },
  },
}
</script>
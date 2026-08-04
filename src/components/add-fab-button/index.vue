<template>
  <!-- <v-tooltip :text="AddFabText" :disabled="!mainStore.getMobile">
    <template v-slot:activator="{ props }"> -->
  <v-fab-transition>
    <v-fab v-show="AddFabShow" @click=" on_click()" color="primary" :extended="!mainStore.getMobile"
      :disabled="AddFabDisabled" :icon="mainStore.getMobile ? true : false"
      :size="!mainStore.getMobile ? 'large' : 'x-large'" style="position: fixed; bottom: 16px; right: 16px;" :style="{
        'transform': mainStore.getMobile
          ?
          mainStore.getScrollValue > 1
            ?
            'translateY(-56px) translateX(-80px)'
            :
            'translateY(-56px)'
          :
          mainStore.getScrollValue > 1
            ?
            (mainStore.getMobile ? 'translateX(-80px)' : 'translateX(-70px)')
            :
            mainStore.getMobile
              ? 'translateY(-56px)'
              : ''
        ,
      }">
      <template v-slot:prepend v-if="!mainStore.getMobile">
        <v-icon :style="{
          'transform': mainStore.getScrollValue > 1
            ? mainStore.getMobile
              ? 'rotate(-360deg)'
              : ''
            : mainStore.getMobile
              ? 'rotate(0deg)'
              : ''
        }">{{ AddFabIcon }}</v-icon>
      </template>
      <v-icon v-if="mainStore.getMobile" :style="{
        'transform': mainStore.getScrollValue > 1
          ? mainStore.getMobile
            ? 'rotate(-360deg)'
            : ''
          : mainStore.getMobile
            ? 'rotate(0deg)'
            : ''
      }">{{ AddFabIcon }}</v-icon>
      <!-- <v-icon>{{ AddFabIcon }}</v-icon> -->
      {{ !mainStore.getMobile ? AddFabText : '' }}

      <v-tooltip activator="parent" location="top" :disabled="!mainStore.getMobile">{{ AddFabText }}</v-tooltip>
    </v-fab>
  </v-fab-transition>
  <!-- </template>
  </v-tooltip> -->
  <!-- <v-tooltip top :disabled="!mainStore.getMobile" transition="scroll-y-transition">
    <template v-slot:activator="{ props }">
      <v-fab-transition>
        <v-btn rounded="lg"  :disabled="AddFabDisabled" :rounded="!mainStore.getMobile" v-show="AddFabShow" elevation="4" :style="{
          'transform': mainStore.getMobile
            ?
            mainStore.getScrollValue > 1
              ?
              'translateY(-56px) translateX(-80px)'
              :
              'translateY(-56px)'
            :
            mainStore.getScrollValue > 1
              ?
              (mainStore.getMobile ? 'translateX(-80px)' : 'translateX(-70px)')
              :
              mainStore.getMobile
                ? 'translateY(-56px)'
                : ''
          ,
        }" :x-large="!mainStore.getMobile" :fab="mainStore.getMobile" fixed large bottom right color="accent"
          v-bind="props" @click="
            on_click()
            ">


          <v-icon :left="!mainStore.getMobile" :style="{
            'transform': mainStore.getScrollValue > 1
              ? mainStore.getMobile
                ? 'rotate(-360deg)'
                : ''
              : mainStore.getMobile
                ? 'rotate(0deg)'
                : ''
          }">
            {{ AddFabIcon }}
          </v-icon>
          <span v-show="!mainStore.getMobile">{{
            AddFabText
          }}</span>
        </v-btn>
      </v-fab-transition>
    </template>
    <span>{{
      AddFabText
    }}</span>
  </v-tooltip> -->
</template>
<script>
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';
import { useDialogStore } from '@/stores/dialog';
import { useFabDialogStore } from '@/stores/fab-dialog';
import { useSnackbarStore } from '@/stores/snackbar';
import { useSheetStore } from '@/stores/sheet';
export default {
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    dialogStore: useDialogStore(),
    fabDialogStore: useFabDialogStore(),
    snackbarStore: useSnackbarStore(),
    sheetStore: useSheetStore(),
    AddFabText: '',
    AddFabIcon: '',
    AddFabShow: false,
    AddFabDisabled: false,
    AddFabFunction: () => { null },
  }),
  methods: {
    RoutePathObject() {
      return {
        is_usergroup: this.$route.name == 'admin-usergroup' || this.$route.name == 'lang-admin-usergroup',
        is_topics: this.$route.name == 'topics' || this.$route.name == 'lang-topics' || this.$route.name == 'admin-topics' || this.$route.name == 'lang-admin-topics',
        is_questions: this.$route.name == 'questions' || this.$route.name == 'lang-questions' || this.$route.name == 'admin-questions' || this.$route.name == 'lang-admin-questions',
        is_articles: this.$route.name == 'articles' || this.$route.name == 'lang-articles' || this.$route.name == 'admin-articles' || this.$route.name == 'lang-admin-articles',
        is_article: this.$route.name == 'article' || this.$route.name == 'lang-article',
        is_question: this.$route.name == 'question' || this.$route.name == 'lang-question',
        topic_is_questions: ((this.$route.name == 'topic' || this.$route.name == 'lang-topic') && (this.$route.hash == '' || this.$route.hash == '#questions')) || this.$route.hash == '#following_questions',
        topic_is_articles: ((this.$route.name == 'topic' || this.$route.name == 'lang-topic') && this.$route.hash == '#articles') || this.$route.hash == '#following_articles',
      }
    },
    AddFabButtonUpdate(val) {
      this.AddFabShow = false
      const name = val.name
      const hash = val.hash
      const is_usergroup = this.RoutePathObject().is_usergroup
      const is_topics = this.RoutePathObject().is_topics
      const is_questions = this.RoutePathObject().is_questions
      const is_articles = this.RoutePathObject().is_articles
      const is_question = this.RoutePathObject().is_question
      const is_article = this.RoutePathObject().is_article
      const topic_is_questions = this.RoutePathObject().topic_is_questions
      const topic_is_articles = this.RoutePathObject().topic_is_articles

      const user_group = this.userStore.getUser.user_group

      if (is_usergroup) {
        this.AddFabDisabled = false
        // this.AddFabShow = !this.userStore.getIsLogin?true:user_group.ability_admin_manage_user_group
        // this.AddFabShow = !this.userStore.getIsLogin?false:(user_group.ability_admin_manage_user_group&&user_group.is_admin)
        this.AddFabShow = !this.userStore.getIsLogin ? false : user_group.ability_admin_manage_user_group
        this.AddFabIcon = 'mdi-account-multiple-plus'
        this.AddFabText = this.$t('Message.Admin.UserGroups.CreateNewUserGroup')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          this.dialogStore.setUserGroupEditDialog({
            mode: 'new',
            model: true,
          })
        }
      } else if (is_topics) {
        this.AddFabDisabled = false
        // this.AddFabShow = !this.userStore.getIsLogin ? true : user_group.ability_create_topic
        this.AddFabShow = !this.userStore.getIsLogin ? false : user_group.ability_create_topic
        this.AddFabIcon = 'mdi-book-plus-outline'
        this.AddFabText = this.$t('Message.Components.AddFabButton.NewTopic')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          this.dialogStore.setTopicDialog({
            model: true,
            mode: 'new',
          })
        }
      } else if (is_questions || topic_is_questions) {
        this.AddFabDisabled = false
        this.AddFabShow = !this.userStore.getIsLogin ? true : user_group.ability_create_question
        this.AddFabIcon = 'mdi-forum-plus-outline'
        this.AddFabText = this.$t('Message.Components.AddFabButton.WriteAskAQuestion')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.NewQuestions'),
          //   icon: 'mdi-forum-plus-outline',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'question',
          //   edit_mode: 'new',
          //   model: 'moderate',
          //   md_topics: [],
          // })
          
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.NewQuestions'),
            icon: 'mdi-forum-plus-outline',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'question',
            editMode: 'new',
            editItem: null,
            mdTitle: '',
            mdTopics: [],
            mdContent: '',
            model: true,
            editItemId: 0,
          })
        }
      } else if (is_articles || topic_is_articles) {
        this.AddFabDisabled = false
        this.AddFabShow = !this.userStore.getIsLogin ? true : user_group.ability_create_article
        this.AddFabIcon = 'mdi-file-document-plus-outline'
        this.AddFabText = this.$t('Message.Components.AddFabButton.WriteAnArticle')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.NewArticles'),
          //   icon: 'mdi-file-document-plus-outline',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'article',
          //   edit_mode: 'new',
          //   model: 'moderate',
          //   md_topics: [],
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.NewArticles'),
            icon: 'mdi-file-document-plus-outline',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'article',
            editMode: 'new',
            editItem: null,
            mdTitle: '',
            mdTopics: [],
            mdContent: '',
            model: true,
            editItemId: 0,
          })
        }
      } else if (is_question) {
        this.AddFabDisabled = false
        this.AddFabShow = !this.userStore.getIsLogin ? true : user_group.ability_create_answer
        this.AddFabIcon = 'mdi-comment-plus-outline'
        this.AddFabText = this.$t('Message.Components.AddFabButton.WriteAnAnswer')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.WriteAnAnswer'),
          //   icon: 'mdi-comment-plus-outline',
          //   has_title: false,
          //   has_topic: false,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'answer',
          //   edit_mode: 'new',
          //   answer_to_question_id: parseInt(this.$route.params.question_id),
          //   model: 'moderate',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.WriteAnAnswer'),
            icon: 'mdi-comment-plus-outline',
            showTitle: false,
            showTopics: false,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'answer',
            editMode: 'new',
            answerToQuestionId: parseInt(this.$route.params.question_id),
            model: true,
            editItemId: 0,
          })
        }
      } else if (is_article) {
        this.AddFabDisabled = false
        this.AddFabShow = !this.userStore.getIsLogin ? true : user_group.ability_create_article
        this.AddFabIcon = 'mdi-comment-plus-outline'
        this.AddFabText = this.$t('Message.Components.AddFabButton.WriteAnComment')
        this.AddFabFunction = () => {
          this.AddFabShow = false
          this.sheetStore.setCommentReplySheet({
            model: true,
            label: this.$t('Message.Components.Comments.NewCommentOrReply.WriteYourComment'),
            commentable_id: parseInt(this.$route.params.article_id),
            commentable_type: 'article',
          })
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.WriteAnAnswer'),
          //   icon: 'mdi-comment-plus-outline',
          //   has_title: false,
          //   has_topic: false,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'answer',
          //   edit_mode: 'new',
          //   answer_to_question_id: parseInt(this.$route.params.question_id),
          //   model: 'moderate',
          // })
        }
      } else {
        this.AddFabDisabled = false
        this.AddFabShow = false
      }

      if (!this.$G_AppIsCanUse()) {
        this.AddFabDisabled = true
      } else {
        this.AddFabDisabled = false
      }
    },
    on_click() {
      const is_usergroup = this.RoutePathObject().is_usergroup
      const user_group = this.userStore.getUser.user_group
      const is_admin = user_group.ability_admin_manage_user_group && user_group.is_admin
      if (!this.userStore.getIsLogin) {//如果没有登录
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      if (is_usergroup && !is_admin) {//如果是用户组页面，且不是管理员
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouNeedAdminPermissionToUseThisFeature'),
        })
        return
      }
      this.AddFabFunction()
    }
  },
  computed: {
    ReturnEditorFabDialog() {
      // return this.fabDialogStore.getEditorFabDialog.model
      return this.fabDialogStore.getNewEditorFabDialog.model
    },
    ReturnTopicDialog() {
      return this.dialogStore.getTopicDialog.model
    },
    ReturnUserGroupEditDialog() {
      return this.dialogStore.getUserGroupEditDialog.model
    },
    ReturnCommentReplySheet() {
      return this.sheetStore.commentReplySheet.model
    },
    ReturnGetIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  created() {
  },
  watch: {
    '$route'(val) {
      this.AddFabButtonUpdate(this.$route)
    },
    '$i18n.locale': {
      handler(val) {
        this.AddFabButtonUpdate(this.$route)
      },
      immediate: true,
    },
    ReturnEditorFabDialog(val) {
      const is_usergroup = this.RoutePathObject().is_usergroup
      const is_topics = this.RoutePathObject().is_topics
      const is_questions = this.RoutePathObject().is_questions
      const is_articles = this.RoutePathObject().is_articles
      const is_question = this.RoutePathObject().is_question
      const is_article = this.RoutePathObject().is_article
      const topic_is_questions = this.RoutePathObject().topic_is_questions
      const topic_is_articles = this.RoutePathObject().topic_is_articles
      if (val == false) {
        this.AddFabShow = is_usergroup || is_topics || is_questions || topic_is_questions || is_articles || topic_is_articles || is_article || is_question;
      }
    },
    ReturnTopicDialog(val) {
      if (val == false) {
        this.AddFabShow = true
      }
    },
    ReturnUserGroupEditDialog(val) {
      if (val == false) {
        this.AddFabShow = true
      }
    },
    ReturnCommentReplySheet(val) {
      if (val == false) {
        this.AddFabShow = true
      }
    },
    ReturnGetIsLogin(val) {
      this.AddFabButtonUpdate(this.$route)
    },
  }
}
</script>
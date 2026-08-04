<template>
  <!-- <v-btn rounded="lg"   variant="text" color="medium-emphasis" icon="mdi-dots-vertical" class="mc-options-button"></v-btn> -->


  <v-menu transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn :size="size" v-bind="props" variant="plain" color="medium-emphasis" @click.prevent.stop="" icon="mdi-dots-vertical"
        class="mc-options-button" :disabled="!LookButtonShowRule"
        ></v-btn>
        <!-- :disabled="!LookButtonShowRule" -->
    </template>

    <v-list rounded="lg" >
      <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

      <v-list-item v-if="LookCopyShowRule" @click="SpawnCopyLink()"
      :title="$t('Message.Client.Topic.Topic.CopyLink')">
        <template v-slot:prepend>
          <!-- content-copy link -->
          <v-icon icon="mdi-content-copy"></v-icon>
        </template>
      </v-list-item>

      <v-list-item v-if="LookFollowersShowRule" 
        @click="
        dialogStore.setUsersDialog({
            id:GetItemID(),
          type:type,
          modes:'followers',
            model: true,
          })
        "
        :title="$t('Message.Client.Topic.Topic.LookFollowers',{value:FollowCount})">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-star"></v-icon>
        </template>
      </v-list-item>

      <v-list-item v-if="LookCopyShowRule" @click="CallShareBottomSheet()"
      :title="$t('Message.Components.ShareBottomSheet.Share')">
        <template v-slot:prepend>
          <v-icon icon="mdi-share-variant"></v-icon>
        </template>
      </v-list-item>

      <v-list-item v-if="LookReportDialogShowRule" @click="AddReport()"
      :title="$t('Message.Components.OptionsButton.Report')">
        <template v-slot:prepend>
          <v-icon icon="mdi-flag"></v-icon>
        </template>
      </v-list-item>
      
      <v-list-item v-if="LookEditShowRule" @click="EditItem()"
      :title="EditText">
        <template v-slot:prepend>
          <v-icon icon="mdi-pencil"></v-icon>
        </template>
      </v-list-item>
      
      <v-list-item v-if="LookDeleteShowRule" @click="DeleteItem()"
      :title="DeleteText">
        <template v-slot:prepend>
          <v-icon icon="mdi-delete"></v-icon>
        </template>
      </v-list-item>
      
      <v-list-item v-if="LookResetCoverShowRule" @click="ResetCover()"
      :title="$t('Message.Components.OptionsButton.ResetCover')">
        <template v-slot:prepend>
          <v-icon icon="mdi-image-edit-outline"></v-icon>
        </template>
      </v-list-item>
      
      <v-list-item v-if="LookResetAvatarShowRule" @click="ResetAvatar()"
      :title="$t('Message.Components.OptionsButton.ResetAvatar')">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-edit-outline"></v-icon>
        </template>
      </v-list-item>
      

    </v-list>

  </v-menu>

</template>

<script>
import copy from 'copy-to-clipboard';
import {
  ResetAvatar,
  ResetCover,
  IsTauri,
  IsElectron,
  IsMobileApp,
  GetBaseUrl,
} from '@/api/global.js'

import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog';
import { useSnackbarStore } from '@/stores/snackbar'
import { useSheetStore } from '@/stores/sheet.js'
export default {
  name: 'options-button',
  props: {
    type: {
      type: String,
      default: 'topic',//user,topic,question,article,answer,comment,reply
    },
    item: {
      type: Object,
      default: null
    },
    is_admin: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  data: () => ({
    delete_preview_text: '',
    report_preview_text: '',
    editDialog: true,
    userStore: useUserStore(),
    dialogStore: useDialogStore(),
    snackbarStore: useSnackbarStore(),
    fabDialogStore: useFabDialogStore(),
    sheetStore: useSheetStore(),
  }),
  methods: {
    GetItemID() {
      var a = 0
      switch (this.type) {
        case 'topic':
          a = this.item.topic_id
          break
        case 'question':
          a = this.item.question_id
          break
        case 'article':
          a = this.item.article_id
          break
        case 'answer':
          a = this.item.answer_id
          break
        case 'comment':
          a = this.item.comment_id
          break
        case 'reply':
          a = this.item.reply_id
          break
      }
      return a
    },
    SpawnCopyLink() {
      var text = ''
      var origin = ''
      if (IsTauri() || IsElectron() || IsMobileApp()) {
        origin = GetBaseUrl()
      } else {
        origin = window.location.origin
      }
      switch (this.type) {
        case 'answer':
          text = `${origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}/answers/${this.item.answer_id}`
          break
        case 'topic':
          text = `${origin}${this.$G_UrlHeaderLang()}/topics/${this.item.topic_id}`
          break
        case 'user':
          text = `${origin}${this.$G_UrlHeaderLang()}/users/${this.item.user_id}`
          break
        case 'article':
          text = `${origin}${this.$G_UrlHeaderLang()}/articles/${this.item.article_id}`
          break
        case 'question':
          text = `${origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}`
          break
      }
      if (copy(text)) {
        // alert(text)
        // this.$store.dispatch('Snackbar/Show_Snackbar', {
        //   text: this.$t('Message.Client.Topic.Topic.Copied') + ' ' + text,
        // })

        this.snackbarStore.addMessage({ text: this.$t('Message.Client.Topic.Topic.Copied') + ' ' + text })
      }
    },
    CallShareBottomSheet() {
      
      var link = ''
      var title = ''
      var desc = ''
      var origin = ''
      if (IsTauri() || IsElectron() || IsMobileApp()) {
        origin = GetBaseUrl()
      } else {
        origin = window.location.origin
      }
      switch (this.type) {
        case 'answer':
          link = `${origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}/answers/${this.item.answer_id}`
          title = this.item.content_markdown
          desc = this.item.content_markdown
          break
        case 'topic':
          link = `${origin}${this.$G_UrlHeaderLang()}/topics/${this.item.topic_id}`
          title = this.item.name
          desc = this.item.description
          break
        case 'user':
          link = `${origin}${this.$G_UrlHeaderLang()}/users/${this.item.user_id}`
          title = this.item.username
          desc = this.item.bio
          break
        case 'article':
          link = `${origin}${this.$G_UrlHeaderLang()}/articles/${this.item.article_id}`
          title = this.item.title
          desc = this.item.content_markdown
          break
        case 'question':
          link = `${origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}`
          title = this.item.title
          desc = this.item.content_markdown
          break
      }
      // console.log('link', link)
      // console.log('title', title)
      // console.log('desc', desc)
      // console.log('this.$i18n.locale', this.$i18n.locale)
      const International = this.$i18n.locale != 'zh_CN'
      // console.log('International', International)
      this.sheetStore.setShareSheet({
        shareUrl: link,
        shareTitle: title,
        shareDesc: desc,
        // showInternational: International,
        // showChinese: !International||International,
        showInternational: true,
        showChinese: true,
        model: true,
      })
    },
    AddReport() {
      // console.log('this.userStore.getIsLogin', this.userStore.getIsLogin)
      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
          color: 'error',
        })
        return
      }
      switch (this.type) {
        case 'topic':
          this.report_preview_text = this.item.name
          break
        case 'question':
          this.report_preview_text = this.item.title
          break
        case 'article':
          this.report_preview_text = this.item.title
          break
        case 'answer':
          this.report_preview_text = this.item.content_markdown
          break
        case 'comment':
          this.report_preview_text = this.item.content
          break
        case 'reply':
          this.report_preview_text = this.item.content
          break
        case 'user':
          this.report_preview_text = this.item.username
          break
      }
      // this.$store.dispatch('Dialog/Set_ReportDialog', {
      //   type: this.type,
      //   item: this.item,
      //   report_preview_text: this.report_preview_text,
      //   model: true,
      // })

      this.dialogStore.setReportDialog({
        type: this.type,
        item: this.item,
        report_preview_text: this.report_preview_text,
        model: true,
      })
    },
    EditItem() {
      const item = this.item

      if (IsTauri() || IsMobileApp()) {//适配
        //把 item.content_rendered 里面的GetBaseUrl() + '/public/static/'替换为 /public/static/
        const regex = '/public/static/';
        const newBaseUrl = GetBaseUrl() + '/public/static/';
        // 执行替换
        item.content_rendered = item.content_rendered.replaceAll(regex, newBaseUrl);
        // console.log('item.content_rendered', item.content_rendered)
      }

      switch (this.type) {
        case 'topic':
          this.dialogStore.setTopicDialog({
            mode: 'edit',
            edit_topic: item,
            model: true,
          })
          break
        case 'answer':
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.EditAnswer'),
          //   icon: 'mdi-comment-plus-outline',
          //   has_title: false,
          //   has_topic: false,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'answer',
          //   edit_mode: 'edit',
          //   edit_mode_id: item.answer_id,
          //   md_content: item.content_rendered,
          //   model: 'moderate',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditAnswer'),
            icon: 'mdi-comment-plus-outline',
            showTitle: false,
            showTopics: false,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'answer',
            editMode: 'edit',
            editItem: item,
            editItemId: item.answer_id,
            mdContent: item.content_rendered,
            model: true,
          })
          break
        case 'question':
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.EditQuestion'),
          //   icon: 'mdi-forum',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'question',
          //   edit_mode: 'edit',
          //   edit_mode_id: item.question_id,
          //   md_title: item.title,
          //   md_topics: item.topics,
          //   md_content: item.content_rendered,
          //   model: 'moderate',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditQuestion'),
            icon: 'mdi-forum',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'question',
            editMode: 'edit',
            editItem: item,
            editItemId: item.question_id,
            mdTitle: item.title,
            mdTopics: item.topics,
            mdContent: item.content_rendered,
            model: true,
          })
          break
        case 'article':
          // this.fabDialogStore.setEditorFabDialog({
          //   title: this.$t('Message.Components.Editor.EditArticle'),
          //   icon: 'mdi-file-document',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'article',
          //   edit_mode: 'edit',
          //   edit_mode_id: item.article_id,
          //   md_title: item.title,
          //   md_topics: item.topics,
          //   md_content: item.content_rendered,
          //   model: 'moderate',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditArticle'),
            icon: 'mdi-file-document',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'article',
            editMode: 'edit',
            editItem: item,
            editItemId: item.article_id,
            mdTitle: item.title,
            mdTopics: item.topics,
            mdContent: item.content_rendered,
            model: true,
          })
          break
        case 'comment':
          this.dialogStore.setCommentReplyEditDialog({
            title: this.$t('Message.Components.OptionsButton.EditComment'),
            type: 'comment',
            edit_id: item.comment_id,
            content: item.content,
            model: true,
          })
          break
        case 'reply':
          this.dialogStore.setCommentReplyEditDialog({
            title: this.$t('Message.Components.OptionsButton.EditReply'),
            type: 'reply',
            edit_id: item.reply_id,
            content: item.content,
            model: true,
          })
          break
        default:
          this.snackbarStore.addMessage({
            text: '暂不支持的编辑类型',
            color: 'error',
          })
          break
      }
    },
    async ResetAvatar() {
      const response = await ResetAvatar({
        user_id: this.item.user_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_reset == true) {
        this.$emit('reset_avatar', response.data.user)
      } else {
      }
    },
    async ResetCover() {
      const response = await ResetCover({
        user_id: this.item.user_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_reset == true) {
        this.$emit('reset_cover', response.data.user)
      } else {
      }
    },
    async DeleteItem() {
      switch (this.type) {
        case 'topic':
          this.delete_preview_text = this.item.name
          break
        case 'question':
          this.delete_preview_text = this.item.title
          break
        case 'article':
          this.delete_preview_text = this.item.title
          break
        case 'answer':
          this.delete_preview_text = this.item.content_markdown
          break
        case 'comment':
          this.delete_preview_text = this.item.content
          break
        case 'reply':
          this.delete_preview_text = this.item.content
          break
      }
      this.dialogStore.setDeleteDialog({
        type: this.type,
        item: this.item,
        item_ids: [this.GetItemID()],
        delete_preview_text: this.delete_preview_text,
        model: true,
      })
    },
  },
  computed: {
    LookButtonShowRule() {//显示按钮规则
      var a = false
      switch (this.type) {
        case 'topic':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule || this.LookFollowersShowRule || this.LookCopyShowRule
          break
        case 'question':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule || this.LookCopyShowRule
          break
        case 'article':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule || this.LookCopyShowRule
          break
        case 'answer':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule || this.LookCopyShowRule
          break
        case 'comment':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule
          break
        case 'reply':
          a = this.LookEditShowRule || this.LookDeleteShowRule || this.LookReportDialogShowRule
          break
        case 'user':
          a = this.LookResetAvatarShowRule || this.LookResetCoverShowRule || this.LookReportDialogShowRule || this.LookCopyShowRule
          break
      }
      return a
    },
    EditText() {//编辑按钮文本实时计算
      var a = ''
      switch (this.type) {
        case 'topic':
          a = this.$t('Message.Components.OptionsButton.EditTopic')
          break
        case 'question':
          a = this.$t('Message.Components.OptionsButton.EditQuestion')
          break
        case 'article':
          a = this.$t('Message.Components.OptionsButton.EditArticle')
          break
        case 'answer':
          a = this.$t('Message.Components.OptionsButton.EditAnswer')
          break
        case 'comment':
          a = this.$t('Message.Components.OptionsButton.EditComment')
          break
        case 'reply':
          a = this.$t('Message.Components.OptionsButton.EditReply')
          break
      }
      return a
    },
    DeleteText() {//删除按钮文本实时计算
      var a = ''
      switch (this.type) {
        case 'topic':
          a = this.$t('Message.Components.OptionsButton.DeleteTopic')
          break
        case 'question':
          a = this.$t('Message.Components.OptionsButton.DeleteQuestion')
          break
        case 'article':
          a = this.$t('Message.Components.OptionsButton.DeleteArticle')
          break
        case 'answer':
          a = this.$t('Message.Components.OptionsButton.DeleteAnswer')
          break
        case 'comment':
          a = this.$t('Message.Components.OptionsButton.DeleteComment')
          break
        case 'reply':
          a = this.$t('Message.Components.OptionsButton.DeleteReply')
          break
      }
      return a
    },
    FollowCount() {//关注数量实时计算
      var a = 0
      switch (this.type) {
        case 'topic':
          a = this.item.follower_count
          break
        case 'question':
          a = this.item.follower_count
          break
        case 'article':
          a = this.item.follower_count
          break
      }
      return a
    },
    LookEditShowRule() {//显示编辑按钮规则
      var a = false
      try {
        switch (this.type) {
          case 'topic':
            if (
              this.userStore.getUser.user_group.ability_edit_own_topic &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_topic_only_no_article_or_question) {
                if (this.item.article_count == 0 && this.item.question_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_topic;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_topic;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'question':
            if (
              this.userStore.getUser.user_group.ability_edit_own_question &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_question_only_no_answer) {
                if (this.item.answer_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_question;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_question;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
              if (this.userStore.getUser.user_group.ability_edit_question_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_question;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_question;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'article':
            if (
              this.userStore.getUser.user_group.ability_edit_own_article &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_article_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_article;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_article;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'answer':
            if (
              this.userStore.getUser.user_group.ability_edit_own_answer &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_answer_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_answer;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_answer;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'comment':
            if (
              this.userStore.getUser.user_group.ability_edit_own_comment &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_comment_only_no_reply) {
                if (this.item.reply_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_comment;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_comment;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'reply':
            if (
              this.userStore.getUser.user_group.ability_edit_own_reply &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_edit_reply_only_no_reply) {
                if (this.item.reply_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_edit_reply;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_edit_reply;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
        }
      } catch (e) {
      }
      return a
    },
    LookCopyShowRule() {//显示复制链接规则
      var a = false
      switch (this.type) {
        case 'user':
          if (!this.is_admin) {
            a = true
          }
          break
        case 'topic':
        case 'question':
        case 'article':
        case 'answer':
          a = true
          break
      }
      return a
    },
    LookDeleteShowRule() {//显示删除按钮规则
      var a = false
      try {
        switch (this.type) {
          case 'topic':
            if (
              this.userStore.getUser.user_group.ability_delete_own_topic &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_topic_only_no_article_or_question) {
                if (this.item.article_count == 0 && this.item.question_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_topic;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_topic;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'question':
            if (
              this.userStore.getUser.user_group.ability_delete_own_question &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_question_only_no_answer) {
                if (this.item.answer_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_question;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_question;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
              if (this.userStore.getUser.user_group.ability_delete_question_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_question;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_question;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'article':
            if (
              this.userStore.getUser.user_group.ability_delete_own_article &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_article_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_article;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_article;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'answer':
            if (
              this.userStore.getUser.user_group.ability_delete_own_answer &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_answer_only_no_comment) {
                if (this.item.comment_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_answer;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_answer;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'comment':
            // a=true;
            // break;
            if (
              this.userStore.getUser.user_group.ability_delete_own_comment &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_comment_only_no_reply) {
                if (this.item.reply_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_comment;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                // console.log(this.userStore.getUser.user_group.time_before_delete_comment)
                let time = this.userStore.getUser.user_group.time_before_delete_comment;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'reply':
            if (
              this.userStore.getUser.user_group.ability_delete_own_reply &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.userStore.getUser.user_group.ability_delete_reply_only_no_reply) {
                if (this.item.reply_count == 0) {
                  let time = this.userStore.getUser.user_group.time_before_delete_reply;
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60;
                    const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                    if (time1 < time) {
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.userStore.getUser.user_group.time_before_delete_reply;
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60;
                  const time1 = Math.floor(Date.now() / 1000) - this.$G_GetTimeStamp(this.item.create_time);
                  if (time1 < time) {
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
        }
      } catch (e) {
      }
      return a
    },
    LookFollowersShowRule() {//显示关注按钮规则
      var a = false
      switch (this.type) {
        case 'topic':
          a = true
          break
        case 'question':
          a = true
          break
        case 'article':
          a = true
          break
      }
      if (this.FollowCount == 0) {
        a = false
      }
      return a
    },
    LookResetCoverShowRule() {//显示重置封面按钮规则
      return (this.is_admin) || (
        this.type == 'user' && this.item.user_id == this.$G_GetUserID() && (this.$route.name == 'user' || this.$route.name == 'lang-user'))
    },
    LookResetAvatarShowRule() {//显示重置头像按钮规则
      return (this.is_admin) || (
        this.type == 'user' && this.item.user_id == this.$G_GetUserID() && (this.$route.name == 'user' || this.$route.name == 'lang-user'))
    },
    LookReportDialogShowRule() {//显示举报对话框按钮规则
      if (!this.is_admin) {
        // return true
        return this.item.user_id != this.$G_GetUserID()
      } else {
        return false
      }
    },
  },
}
</script>

<!-- <style scoped>
@import './index.less';
</style> -->
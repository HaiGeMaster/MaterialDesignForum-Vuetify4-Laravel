// stores/main.js
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    loginDialog: false, // 控制登录弹窗的响应式变量
    registerDialog: false, // 控制注册弹窗的响应式变量
    resetDialog: false, // 控制重置密码弹窗的响应式变量
    commentDialog: {
      title: 'title',
      model: false,
      external_loading: false,
      commentable_id: 0,
      commentable_type: 'answer',
      comment_count: 0,
      close_comments_dialog: null,
      return_update_comments: null,
    },
    usersDialog: {
      id: 1,
      model: false,
      type: 'users',
      modes: 'followers',
    },
    editInfoDialog: {
      model: false,
      user: null,
    },
    topicDialog: {
      model: false,
      mode: 'new',
      edit_topic: null,
    },
    topicSelectorDialog: false,
    commentReplyEditdialog: {
      model: false,
      title: 'Message.Components.DataTable.Edit',
      type: 'comment',
      edit_id: 0,
      content: '',
    },
    userGroupEditDialog: {
      model: false,
      mode: 'new',
      edit_user_group: null,
    },
    userGroupSwitchDialog: {
      model: false,
      user_ids: [],
      user_group_id: null,
    },
    cookieUseDialog: false,
    reportDialog: {
      model: false,
      item: null,
      type: '',
      report_preview_text: '',
    },
    deleteDialog: {
      model: false,
      item: null,
      type: '',
      item_ids: [],
      delete_preview_text: '',
      delete_time: 0,
    },
  }),
  getters: {
    getLoginDialog: (state) => state.loginDialog, 
    getRegisterDialog: (state) => state.registerDialog, 
    getResetDialog: (state) => state.resetDialog, 
    getCommentDialog: (state) => state.commentDialog, 
    getUsersDialog: (state) => state.usersDialog, 
    getEditInfoDialog: (state) => state.editInfoDialog, 
    getTopicDialog: (state) => state.topicDialog, 
    getTopicSelectorDialog: (state) => state.topicSelectorDialog,
    getCommentReplyEditDialog: (state) => state.commentReplyEditdialog, 
    getUserGroupEditDialog: (state) => state.userGroupEditDialog, 
    getUserGroupSwitchDialog: (state) => state.userGroupSwitchDialog, 
    getCookieUseDialog: (state) => state.cookieUseDialog, 
    getReportDialog: (state) => state.reportDialog, 
    getDeleteDialog: (state) => state.deleteDialog, 
  },
  actions: {
    setLoginDialog(value) {
      this.loginDialog = value
    },
    setRegisterDialog(value) {
      this.registerDialog = value
    },
    setResetDialog(value) {
      this.resetDialog = value
    },
    setCommentDialog({ title, model, external_loading, commentable_id, commentable_type, comment_count, close_comments_dialog, return_update_comments }) {
      this.commentDialog = { title, model, external_loading, commentable_id, commentable_type, comment_count, close_comments_dialog, return_update_comments }
    },
    setUsersDialog({ id, type, modes, model }) {
      this.usersDialog = { id, type, modes, model }
    },
    setEditInfoDialog({ model, user }) {
      this.editInfoDialog = { model, user }
    },
    setTopicDialog({ model, mode, edit_topic }) {
      this.topicDialog = { model, mode, edit_topic }
    },
    setTopicSelectorDialog(value) {
      this.topicSelectorDialog = value
    },
    setCommentReplyEditDialog({ model, title, type, edit_id, content }) {
      this.commentReplyEditdialog = { model, title, type, edit_id, content }
    },
    setUserGroupEditDialog({ model, mode, edit_user_group }) {
      this.userGroupEditDialog = { model, mode, edit_user_group }
    },
    setUserGroupSwitchDialog({ model, user_ids, user_group_id }) {
      this.userGroupSwitchDialog = { model, user_ids, user_group_id }
    },
    setCookieUseDialog(value) {
      this.cookieUseDialog = value
    },
    setReportDialog({ model, item, type, report_preview_text }) {
      this.reportDialog = { model, item, type, report_preview_text }
    },
    setDeleteDialog({ model, item, type, item_ids, delete_preview_text }) {
      this.deleteDialog = { model, item, type, item_ids, delete_preview_text }
    },
  },
})
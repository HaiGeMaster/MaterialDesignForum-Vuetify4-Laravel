
import { defineStore } from 'pinia'

export const useSheetStore = defineStore('sheet', {
  state: () => ({
    shareSheet: {
      model: false,
      shareUrl: '',// 分享链接
      shareTitle: '',// 分享标题
      shareDesc: '',// 分享描述
      shareImage: '',// 分享图片
      // title: '分享至',//// 面板标题
      showInternational: false,// 是否显示国际平台
      showChinese: false,// 是否显示中国平台
      customPlatforms: [],// 自定义平台列表（可选）
      onShareComplete: null,// 分享完成回调函数
    },
    commentReplySheet: {
      model: false,
      label: '',// 输入框标签
      field_variant: 'outlined',// 输入框样式
      commentable_id: '',// 评论目标ID  article_id, question_id, answer_id
      commentable_type: '',// 评论目标类型  article, question, answer
      replyable_id: 0,// 回复目标ID  comment_id reply_id
      replyable_type: '',// 回复目标类型  comment, reply
      replyable_user_id: 0,// 回复目标用户ID
      replyable_comment_id: 0,// 回复目标评论ID
      item: null,// 评论项
      item_type: '',// 评论项类型  comment, reply
      callBack: null,// 回调函数
    },
  }),
  getters: {
    getShareSheet: (state) => state.shareSheet,
    getCommentReplySheet: (state) => state.commentReplySheet,
  },
  actions: {
    setShareSheet({
      model,
      shareUrl = '',
      shareTitle = '',
      shareDesc = '',
      shareImage = '',
      // title = '分享至',
      showInternational = false,
      showChinese = false,
      customPlatforms = [],
      onShareComplete = null,
    }) {
      // console.log('showInternational', showInternational)
      // console.log('showChinese', showChinese)
      this.shareSheet = {
        model,
        shareUrl,
        shareTitle,
        shareDesc,
        shareImage,
        // title,
        showInternational,
        showChinese,
        customPlatforms,
        onShareComplete,
      }
    },
    setCommentReplySheet({
      model,
      label = '',
      field_variant = 'outlined',
      commentable_id = 0,
      commentable_type = '',
      replyable_id = 0,
      replyable_type = '',
      replyable_user_id = 0,
      replyable_comment_id = 0,
      item = null,
      item_type = '',
      callBack = null,
    }) {
      this.commentReplySheet = {
        model,
        label,
        field_variant,
        commentable_id,
        commentable_type,
        replyable_id,
        replyable_type,
        replyable_user_id,
        replyable_comment_id,
        item,
        item_type,
        callBack,
      }
      // console.log(this.commentReplySheet)
    },
  }
})
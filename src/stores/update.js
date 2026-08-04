
import { defineStore } from 'pinia'

export const useUpdateStore = defineStore('update', {
  state: () => ({
    answerUpdate: 0,
    questionUpdate: 0,
    articleUpdate: 0,
    topicUpdate: 0,
    commentUpdate: 0,
    replyUpdate: 0,
    userUpdate: 0,
    dataTableUpdate: 0,
  }),
  getters: {
    getAnswerUpdate: (state) => state.answerUpdate,
    getQuestionUpdate: (state) => state.questionUpdate,
    getArticleUpdate: (state) => state.articleUpdate,
    getTopicUpdate: (state) => state.topicUpdate,
    getCommentUpdate: (state) => state.commentUpdate,
    getReplyUpdate: (state) => state.replyUpdate,
    getUserUpdate: (state) => state.userUpdate,
    getDataTableUpdate: (state) => state.dataTableUpdate,
  },
  actions: {
    setAnswerUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.answerUpdate = val
    },
    setQuestionUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.questionUpdate = val
    },
    setArticleUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.articleUpdate = val
    },
    setTopicUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.topicUpdate = val
    },
    setCommentUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.commentUpdate = val
    },
    setReplyUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.replyUpdate = val
    },
    setUserUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.userUpdate = val
    },
    setDataTableUpdate(val = 0) {
      if (val == 0) {
        val++
      }
      this.dataTableUpdate = val
    },
  }
})
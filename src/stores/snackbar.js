import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    messages: [], //里面将包含多条消息
  }),
  getters: {
    getMessages: (state) => state.messages, // 可选，如果你需要 getter
  },
  actions: {
    // closeText = ''
    /**
     * 添加消息
     * @param {string} text - 消息文本
     * @param {string} color - 消息颜色，默认 ''，success, info, error,warning
     */
    addMessage({ text, color }) {
      this.messages.push({
        text,
        color,
        // closeText: closeText,
        onDismiss(reason) {
          // logs.value.unshift(`Message #${id}: Closed (${reason})`)
        },
      })
    },
    setMessages(messages) {
      this.messages = messages
    },
    deleteMessage(index = 0) {
      this.messages.splice(index, 1)
    },
  },
})

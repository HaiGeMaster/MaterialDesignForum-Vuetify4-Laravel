<template>
  <v-container id="page-notifications-setting">
    <v-card rounded="lg" class="mx-auto" v-if="userStore.getIsLogin" >
      <v-toolbar>
        <template v-slot:prepend>
          <v-btn  icon @click="$router.back()">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.BackButton.Back') }}</v-tooltip>
          </v-btn>
        </template>

        <v-toolbar-title :text="$t('Message.Client.Notification.NotificationSetting')"></v-toolbar-title>

        <template v-slot:append>
          <v-btn  icon variant="text" :loading="loading"  @click="SetUserOption()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>
      </v-toolbar>

      <v-card-text>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('Message.Client.Notification.NotificationItem') }}
              </th>
              <th class="text-left">
                {{ $t('Message.Client.Notification.SiteNotification') }}
              </th>
              <th class="text-left">
                {{ $t('Message.Client.Notification.EmailNotification') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in desserts" :key="item.name">
              <td>{{ $t(`Message.Client.Notification.NotificationType.${item.name}`) }}</td>
              <td>
                <!-- <v-switch inset v-model="item.web_message"></v-switch> -->
                <v-checkbox v-model="item.web_message" color="primary" :disabled="loading">
                  <v-tooltip activator="parent" location="start">
                    {{ $t(`Message.Client.Notification.SiteNotification`) }}
                  </v-tooltip>
                </v-checkbox>
              </td>
              <td>
                <!-- <v-switch inset v-model="item.email_message"></v-switch> -->
                <v-checkbox v-model="item.email_message" color="primary" :disabled="loading">
                  <v-tooltip activator="parent" location="start">
                    {{ $t(`Message.Client.Notification.EmailNotification`) }}
                  </v-tooltip>
                </v-checkbox>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
<!-- Message.Client.Notification.Category.follows → "关注" / "Follows"
Message.Client.Notification.Category.interactions → "互动" / "Interactions"
Message.Client.Notification.Category.likes → "点赞" / "Likes"
Message.Client.Notification.Category.deletes → "删除" / "Deletes"
Message.Client.Notification.Category.updates → "更新" / "Updates" -->


    <Empty v-else 
    :text="$t('Message.App.YouNeedToLogInToAccessThisPage')"
    :title="$t('Message.Client.YouDoNotHavePermissionToAccessThisPage')"
    :btn_text="$t('Message.Components.Empty.Login')" @btn_click="dialogStore.setLoginDialog(true)"
    />

    <!-- <NeedLoginAccess v-else /> -->
  </v-container>
</template>
<script>
// import ReturnButton from '@/components/return-button/index.vue';
// import NeedLoginAccess from '@/components/need-login-access/index.vue'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'
import { useDialogStore } from '@/stores/dialog'
import Empty from '@/components/empty/index.vue'

import {
  SetUserOption,
  GetUserOption,
} from '@/api/global.js'
export default {
  name: 'notifications-page-setting',
  components: {
    // ReturnButton,
    // NeedLoginAccess,
    Empty
  },
  data() {
    return {
      userStore: useUserStore(),
      snackbarStore: useSnackbarStore(),
      dialogStore: useDialogStore(),
      loading: false,
      web_message_all: false, // 全部站内通知开关
      email_message_all: false, // 全部邮件通知开关
      desserts: [
        { name: 'user_follow', web_message: true, email_message: false },
        { name: 'topic_follow', web_message: true, email_message: false },
        { name: 'topic_delete', web_message: true, email_message: false },
        { name: 'question_follow', web_message: true, email_message: false },
        { name: 'question_comment', web_message: true, email_message: false },
        { name: 'question_answer', web_message: true, email_message: false },
        { name: 'question_delete', web_message: true, email_message: false },
        { name: 'article_follow', web_message: true, email_message: false },
        { name: 'article_comment', web_message: true, email_message: false },
        { name: 'article_like', web_message: true, email_message: false },
        { name: 'article_delete', web_message: true, email_message: false },
        { name: 'answer_comment', web_message: true, email_message: false },
        { name: 'answer_like', web_message: true, email_message: false },
        { name: 'answer_delete', web_message: true, email_message: false },
        { name: 'comment_like', web_message: true, email_message: false },
        { name: 'comment_reply', web_message: true, email_message: false },
        { name: 'comment_delete', web_message: true, email_message: false },
        { name: 'reply_like', web_message: true, email_message: false },
        { name: 'reply_reply', web_message: true, email_message: false },
        { name: 'reply_delete', web_message: true, email_message: false },
        { name: 'follow_user_update', web_message: true, email_message: false },
        { name: 'follow_topic_update', web_message: true, email_message: false },
        { name: 'follow_question_update', web_message: true, email_message: false },
        { name: 'follow_article_update', web_message: true, email_message: false },
      ],
    };
  },
  methods: {
    async SetUserOption() {
      this.loading = true
      // console.log(this.desserts)
      const res = await SetUserOption({
        user_token: this.$G_GetUserToken(),
        name: 'notifications',
        value: this.desserts
      })
      if (res.data.is_set) {
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.YouNotificationSettingsSaved'),color:'success' })
        this.loading = false
      } else {
        this.loading = false
      }

    },
    async GetUserOption() {
      this.loading = true
      const res = await GetUserOption({
        user_token: this.$G_GetUserToken(),
        name: 'notifications'
      })
      if (res.data.is_get) {
        // this.desserts = []
        this.$forceUpdate()
        //先将res.data.data.value里的对象的"false"和"true"转为布尔值
        for (let i = 0; i < res.data.data.value.length; i++) {
          res.data.data.value[i].web_message = res.data.data.value[i].web_message === 'true'
          res.data.data.value[i].email_message = res.data.data.value[i].email_message === 'true'
        }
        const server_data = res.data.data.value
        //对比server_data和this.desserts，根据name作为判断值，如果name相同，就用server_data的对象替换this.desserts的对象
        //这样子就解决了客户端新增的通知类型，服务端没有的问题
        for (let i = 0; i < server_data.length; i++) {
          for (let j = 0; j < this.desserts.length; j++) {
            if (server_data[i].name === this.desserts[j].name) {
              this.desserts[j] = server_data[i]
            }
          }
        }
        this.loading = false
        this.$forceUpdate()
        // console.log(this.desserts)
      } else {
        this.loading = false
      }
    },
  },
  created() {
    this.GetUserOption()
  },
  watch: {
    desserts: {
      handler(newValue) {
        // console.log('新值:', newValue);
        // this.SetUserOption()
      },
      deep: true // 深度监听
    },
  }

}
</script>
<style lang="less">
#page-notifications-setting {
  max-width: 800px;
  margin: auto;
}
</style>
<template>
  <v-dialog v-model="vmodel" max-width="400px" max-height="200px" :title="$t('Message.Components.DataTable.Delete')">
    <v-card rounded="lg" >
      <!-- <v-card-title class="headline">
        {{
          $t('Message.Components.DataTable.Delete')
        }}
      </v-card-title> -->
      <v-card-text>
        {{
          $t('Message.Components.DataTable.AreYouSureYouWantToDeleteIt')
        }}
        <!-- <br v-show="vdelete_preview_text!=null">
        <code v-show="vdelete_preview_text!=null">{{ delete_preview_text }}</code> -->
        <template v-for="(item, index) in vdelete_preview_text">
          <!-- <br>
          <code>{{ item }}</code> -->

          <div class="text-decoration-underline">
            {{ item }}
          </div>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded="lg"  variant="tonal" @click="vmodel = false">{{
          $t('Message.Components.DataTable.Cancel') }}</v-btn>
        <v-btn rounded="lg"  variant="flat" color="warning" :loading="is_loading" @click="DeleteItem()">{{
          $t('Message.Components.DataTable.Confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'

import { useDialogStore } from '@/stores/dialog'
import { useSnackbarStore } from '@/stores/snackbar'
import {
  DeleteDatas,
} from '@/api/global.js'
export default {
  name: 'delete-dialog',
  components: {
    // Confirm,
    // Cancel
  },
  props: {
    // model: {
    //   type: Boolean,
    //   default: false,
    // },
    // item: {
    //   type: Object,
    //   default: null,
    // },
    // type: {
    //   type: String,
    //   default: '',
    // },
    // item_ids: {
    //   type: Array,
    //   default: () => [],
    // },
    // delete_preview_text: {
    //   type: [String, Array],
    //   default: null,
    // },
    // delete_time: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      dialogStore: useDialogStore(),
      snackbarStore: useSnackbarStore(),
      // vmodel: false,
      item: null,
      type: '',
      item_ids: [],
      // delete_preview_text: null,
      delete_time: 0,
      // delete_preview_text: '',
      vdelete_preview_text: null,
      ids: [],
      is_loading: false,
    };
  },
  methods: {
    async DeleteItem() {
      // this.OnAxiosDelete([this.GetItemID()])
      this.ids = this.item_ids
      // console.log('this.ids', this.ids)
      var user_token = this.$G_GetUserToken()
      var data = null
      var snackbar_text = ''
      switch (this.type) {
        case 'topic':
          data = {
            topic_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouTopicHasBeenDeleted'
          break;
        case 'article':
          data = {
            article_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouArticleHasBeenDeleted'
          break;
        case 'question':
          data = {
            question_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouQuestionHasBeenDeleted'
          break;
        case 'answer':
          data = {
            answer_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouAnswerHasBeenDeleted'
          break;
        case 'comment':
          data = {
            comment_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouCommentHasBeenDeleted'
          break;
        // case 'user':
        //   data = {
        //     disable_time: this.delete_time,
        //     user_ids: this.ids,
        //     user_token: user_token
        //   }
        //   break;
        case 'reply':
          data = {
            reply_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouReplyHasBeenDeleted'
          break;
        case 'report':
          data = {
            report_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouReportHasBeenDeleted'
          break;
        case 'user_group':
          data = {
            user_group_ids: this.ids,
            user_token: user_token
          }
          snackbar_text = 'YouUserGroupHasBeenDeleted'
          break;
      }

      //如果是管理员
      if(this.$G_ViewIsAdmin()){
        snackbar_text = 'Deleted'
      }

      this.is_loading = true
      const response = await DeleteDatas(`${this.type}s`, data)
      if (response.data.is_delete == true) {
        this.snackbarStore.addMessage({
          text: this.$t(`Message.Components.Snackbar.${snackbar_text}`),
          color: 'warning',
         })
        this.is_loading = false
        //delete_topic、delete_question、delete_article、delete_answer、delete_comment、delete_reply、delete_user、delete_report、delete_user_group
        //确认response.data.data是否为数组
        if (Array.isArray(response.data.data)) {
          // this.$emit(`delete_${this.type}`, response.data.data)
          //如果数组只有一个元素
          if (response.data.data.length == 1) {
            this.$emit(`delete_${this.type}`, response.data.data[0])
          } else {
            this.$emit(`delete_${this.type}s`, response.data.data)
          }
        }
        this.vmodel = false
      } else {
        this.is_loading = false
      }
    },
  },
  computed: {
    vmodel: {
      get() {
        const data = this.dialogStore.getDeleteDialog
        this.item = data.item
        this.type = data.type
        this.item_ids = data.item_ids
        this.vdelete_preview_text = data.delete_preview_text
        return this.dialogStore.getDeleteDialog.model
      },
      set(val) {
        this.dialogStore.setDeleteDialog(val)
      }
    }
  },
  watch: {
    // model(val) {
    //   // console.log('model', val)
    //   if(val==true){
    //     this.vmodel = val
    //   }
    // },
    vmodel(val) {
      if (val == false) {
        this.$emit('model', val)
      }
    },
    vdelete_preview_text(val) {
      //如果是数组
      if (Array.isArray(val)) {
        this.vdelete_preview_text = val
      } else {
        this.vdelete_preview_text = [val]
      }
    },
  },
};
</script>
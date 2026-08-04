<template>
  <v-dialog v-model="model" max-width="500">
    <v-card rounded="lg" :title="$t('Message.Components.OptionsButton.Report')">
      <!-- <v-card-title class="text-h5">
        {{ $t('Message.Components.OptionsButton.Report') }}
      </v-card-title> -->
      <v-divider></v-divider>
      <v-card-text>
        <code>{{ dialogStore.getReportDialog.report_preview_text }}</code>
        <v-radio-group v-model="radio_group">
          <v-radio color="primary" v-for="n in radio_group_item" :key="n.value" :label="$t(n.text)"
            :value="n.value"></v-radio>
        </v-radio-group>
        <v-text-field color="primary"    v-model="other_reasons"
          v-if="radio_group == 'Message.Components.OptionsButton.OtherReasons'"
          :label="$t('Message.Components.OptionsButton.OtherReasons')"></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <Cancel @cancel="model = false" :text="$t('Message.Components.OptionsButton.Cancel')" />

        <Confirm @confirm="AddReport" :disabled="radio_group == null"
          :text="$t('Message.Components.OptionsButton.Submit')" /> -->


        <v-btn rounded="lg" @click="model = false" color="primary" variant="tonal"
          :text="$t('Message.Components.OptionsButton.Cancel')" />

        <v-btn rounded="lg" @click="AddReport" :loading="loading"
          :disabled="radio_group == null || (radio_group == 'Message.Components.OptionsButton.OtherReasons' && other_reasons == '')"
          color="primary" variant="flat" :text="$t('Message.Components.OptionsButton.Submit')" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import {
  AddReport,
} from '@/api/global.js'
import { useDialogStore } from '@/stores/dialog'
import { useSnackbarStore } from '@/stores/snackbar'
import { useUserStore } from '@/stores/user'
// import { useUpdateStore } from '@/stores/update'

export default {
  name: 'report-dialog',
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
    // report_preview_text: {
    //   type: String,
    //   default: '',
    // },
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getReportDialog.model
      },
      set(val) {
        this.dialogStore.setReportDialog({
          model: val,
        })
      }
    }
  },
  data() {
    return {
      dialogStore: useDialogStore(),
      snackbarStore: useSnackbarStore(),
      userStore: useUserStore(),
      // updateStore: useUpdateStore(),
      // model: false,
      radio_group: null,
      radio_group_item: [
        {
          text: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
          value: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
        },
        {
          text: 'Message.Components.OptionsButton.UnfriendlyBehavior',
          value: 'Message.Components.OptionsButton.UnfriendlyBehavior',
        },
        {
          text: 'Message.Components.OptionsButton.HarmfulInformation',
          value: 'Message.Components.OptionsButton.HarmfulInformation',
        },
        {
          text: 'Message.Components.OptionsButton.SuspectedInfringement',
          value: 'Message.Components.OptionsButton.SuspectedInfringement',
        },
        {
          text: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
          value: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
        },
        {
          text: 'Message.Components.OptionsButton.OtherReasons',
          value: 'Message.Components.OptionsButton.OtherReasons',
        },
      ],
      other_reasons: '',
      loading: false,
    };
  },
  methods: {
    AddReport() {
      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      this.StartAddReport()
    },
    async StartAddReport() {
      // console.log('StartAddReport')
      var user_token = this.$G_GetUserToken()
      var type = this.dialogStore.getReportDialog.type
      var item = this.dialogStore.getReportDialog.item
      var reportable_id = (
        type == 'topic' ? item.topic_id :
          type == 'question' ? item.question_id :
            type == 'article' ? item.article_id :
              type == 'answer' ? item.answer_id :
                type == 'comment' ? item.comment_id :
                  type == 'reply' ? item.reply_id :
                    type == 'user' ? item.user_id : 0)
      this.loading = true
      const response = await AddReport({
        user_token: user_token,
        reportable_type: type,
        reportable_id: reportable_id,
        reason: this.other_reasons || this.radio_group,
      })
      if (response.data.is_add == true) {
        this.loading = false
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.YouReportIsSubmitted'),color:'success' })
        this.model = false
      } else {
        this.loading = false
      }
    },
  },
  watch: {
    // model(val) {
    //   if (val == true) {
    //     this.model = val
    //   }
    // },
    model(val) {
      if (val == false) {
        // this.$emit('model', val)
      }
    },
  },
};
</script>
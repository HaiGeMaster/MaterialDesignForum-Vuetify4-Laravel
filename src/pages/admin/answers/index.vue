<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_answer">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin"  :headers="headers" type="answers" @edit_item="OnEdit" />
    <!-- </v-card> -->
      <NoAllowUse v-else/>
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false" />
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'

import { useUserStore } from '@/stores/user'
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
  GetBaseUrl,
} from '@/api/global.js'
export default {
  name: 'admin-page-answers',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
    dialog: false,
  }),
  computed: {
    headers() {
      return [
        {
          title: this.$t('Message.Admin.Answers.AnswerID'),
          align: 'start',
          key: 'answer_id',
        },
        {
          title: this.$t('Message.Admin.Answers.QuestionID'),
          key: 'question_id',
        },
        // {
        //   title: this.$t('Message.Admin.Answers.UserID'),
        //   key: 'user_id',
        // },
        {
          title: this.$t('Message.Admin.Answers.User'),
          key: 'user',
        },
        {
          title: this.$t('Message.Admin.Answers.ContentMarkdown'),
          key: 'content_markdown',
        },
        // {
        //   title: this.$t('Message.Admin.Answers.ContentRendered'),
        //   key: 'content_rendered',
        // },
        {
          title: this.$t('Message.Admin.Answers.CommentCount'),
          key: 'comment_count',
        },
        {
          title: this.$t('Message.Admin.Answers.VoteCount'),
          key: 'vote_count',
        },
        {
          title: this.$t('Message.Admin.Answers.VoteUpCount'),
          key: 'vote_up_count',
        },
        {
          title: this.$t('Message.Admin.Answers.VoteDownCount'),
          key: 'vote_down_count',
        },
        {
          title: this.$t('Message.Admin.Answers.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Answers.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.Answers.DeleteTime'),
        //   key: 'delete_time',
        // },
      ]
    }
  },
  methods: {
    OnEdit(item) {

      if(IsTauri()||IsMobileApp()){//适配
        //把 item.content_rendered 里面的GetBaseUrl() + '/public/static/'替换为 /public/static/
          const regex = '/public/static/';
          const newBaseUrl = GetBaseUrl() + '/public/static/';
          // 执行替换
          item.content_rendered = item.content_rendered.replaceAll(regex, newBaseUrl);
        // console.log('item.content_rendered', item.content_rendered)
      }

      this.$store.dispatch('FabDialog/Set_EditorFabDialog', {
        md_content:item.content_rendered,
        edit_mode_id:item.answer_id,
        title:this.$t('Message.Components.Editor.EditAnswer'),
        icon:'mdi-message-reply',
        has_title:false,
        has_topic:false,
        submit_text:this.$t('Message.Components.Editor.Release'),
        edit_type:'answer',
        edit_mode:'edit',
        answer_to_question_id:0,
        model:'maximize',
      })
      
      // console.log(item)
      // this.$G_CallEditorEdit(
      //   'maximize',
      //   'Message.Components.Editor.EditAnswer',
      //   false,
      //   false,
      //   'Message.Components.Editor.EditAnswer',
      //   'answer',
      //   'mdi-message-reply',
      //   item.answer_id,
      //   null,
      //   null,
      //   item.content_rendered
      // )
    },
  },
}
</script>